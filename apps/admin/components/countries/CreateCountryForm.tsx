"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { createCountrySchemaAction } from "@cooked/db/zod";
import { type CreateCountryActionProps } from "@cooked/db/types"; 
import { Input } from "../ui/input";
import { upload } from "@vercel/blob/client";
import { useState } from "react";
import {
  createCountryAction as runCreateCountryAction,
  updateCountryImageAction as runUpdateCountryImageAction,
} from "@/actions/admin";
import { Loader2 } from "lucide-react";
import GeneralSelector from "../shared/GeneralSelector";
import { GeneralDropDownType } from "@/lib/types";

export default function CreateCountryForm({ cuisines }: { cuisines: GeneralDropDownType[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const [countryImage, setCountryImage] = useState<File | null>(null);

  const form = useForm<CreateCountryActionProps>({
    resolver: zodResolver(createCountrySchemaAction),
    defaultValues: {
      countryName: "",
      cuisinesToCountry: [],
    },
  });

  const cuisinesCountriesValue = form.watch("cuisinesToCountry");

  // useEffect(() => {
  //   console.log("Value is: ", cuisinesCountriesValue);
  // }, [cuisinesCountriesValue]);

  const onSubmit = async (data: CreateCountryActionProps) => {
    setIsLoading(true);
    const res = await runCreateCountryAction(data);

    if (!res?.data?.success) {
      setIsLoading(false);
      return alert("Failed to create country :(");
    }
    const { id } = res.data;
    if (countryImage) {
      const { url } = await upload(countryImage.name, countryImage, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      const res = await runUpdateCountryImageAction({
        id,
        imageUrl: url,
      });
      setIsLoading(false);
      if (!res?.data?.success) return alert("Failed to update image");
    }
    setIsLoading(false);
    alert("Cuisine created successfully! Redirecting...");
    push(`/cuisines/${id}`);
  };

  // Add cuisines to associate the countries with
  return (
    <Form {...form}>
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full max-w-[75%] items-center justify-center">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 px-5 py-5 border rounded-lg">
            <FormField
              control={form.control}
              name="countryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Name</FormLabel>
                  <FormControl>
                    <Input placeholder="France" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      {...field}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setCountryImage(file);
                        form.setValue("imageUrl", undefined);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Typically, this is a flag of the country
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cuisinesToCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Country to Cuisines</FormLabel>
                  <FormControl>
                    <GeneralSelector
                      renderProps={field}
                      options={cuisines}
                      name="Cuisines"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </Form>
  );
}
