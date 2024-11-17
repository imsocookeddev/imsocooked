"use client"
import { useForm } from "react-hook-form"
import { CreateCuisineProps } from "@cooked/db/types"
import { createCuisineSchema } from "@cooked/db/zod"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { upload } from "@vercel/blob/client"
import {useState} from "react"
import {
  updateCuisineImageAction as runUpdateCuisineImageAction,
  createCuisineAction as runCreateCuisineAction,
} from "@/actions/admin";
import { Loader2 } from "lucide-react"

export default function CreateCuisineForm(){
  const [isLoading,setIsLoading] = useState(false);
  const { push } = useRouter();
  const [cuisineImage,setCuisineImage] = useState<File | null>(null);
  const form = useForm<CreateCuisineProps>({
    resolver: zodResolver(createCuisineSchema),
    defaultValues:{
      cuisineDescription:'',
      cuisineName:'',
    }
  });

  const onSubmit = async (data:CreateCuisineProps) =>{
    setIsLoading(true);
    const res = await runCreateCuisineAction(data);

    if (!res?.data?.success) {
      setIsLoading(false);
      return alert("Failed to create cuisine :(");
    }
    const { id } = res.data;
    if (cuisineImage) {
      const { url } = await upload(cuisineImage.name, cuisineImage, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      const res = await runUpdateCuisineImageAction({
        id,
        imageUrl: url,
      });
      setIsLoading(false);
      if (!res?.data?.success) return alert("Failed to update image");
    }
    setIsLoading(false);
    alert("Cuisine created successfully! Redirecting...");
    push(`/cuisines/${id}`);
  }

  return (
    <Form {...form}>
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full max-w-[75%] items-center justify-center">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 px-5 py-5 border rounded-lg">
            <FormField
              control={form.control}
              name="cuisineName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Asian" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cuisineDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description of Cuisine here"
                      {...field}
                    />
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
                  <FormLabel>Image of Cuisine</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      {...field}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setCuisineImage(file);
                        form.setValue('imageUrl',undefined);
                      }
                      }
                    />
                  </FormControl>
                  <FormDescription className="text-yellow-400 text-sm">
                    Webpack is not currently accepted and will cause errors!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Create'
              )}
            </Button>
          </form>
        </div>
      </div>
    </Form>
  );
}