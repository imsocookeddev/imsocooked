'use client';
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { type CreateLessonFormProps, CreateLessonType, SelectCountriesType } from "@cooked/db/types";
import { createLessonAction } from "@/actions/admin";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLessonSchema } from "@cooked/db/zod";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect,useState } from "react";
import ProblemOrderSelector from "./ProblemOrderSelector";
export default function CreateLessonForm(props:CreateLessonFormProps){
  const { push} = useRouter();
  const { cuisinesWithCountries, categories } = props;
  
  const {execute:runCreateLessonAction,isExecuting} = useAction(createLessonAction,{
    onSuccess:()=>{
      alert("Lesson created successfully! Redirecting...");
      push('/lessons');
    },
    onError:(e)=>{
      console.log(e);
      alert("Something went wrong :(")
    }
  });
  
  const defaultCuisine = cuisinesWithCountries[0];
  const cuisinesMap = new Map<string, SelectCountriesType>();

  const form = useForm<CreateLessonType>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      title: "",
      lessonDescription: "",
      cuisineID: defaultCuisine!.cuisineID,
      countryID: defaultCuisine!.countriesToCuisines[0]!.countryID,
      problemOrder: [],
      recipeUrl: "",
    },
  });

  const currentCuisine = form.watch("cuisineID");
  const currentCountry = form.watch("countryID");
  // finish logic later
  useEffect(() => {
    form.setValue("countryID", cuisinesMap.get(currentCuisine)![0]!.countryID);
    console.log("Current country id is: ", form.getValues("countryID"));
},[currentCuisine]);

useEffect(() => {
  console.log("Current country id is: ", currentCountry);
}
,[currentCountry]);

  return (
    <Form {...form}>
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full max-w-[75%] items-center justify-center">
          <form
            onSubmit={form.handleSubmit(runCreateLessonAction)}
            className="flex flex-col w-1/3 space-y-8 px-5 py-5 border rounded-lg">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Burger 101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lessonDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link to Recipe (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row w-full justify-between items-center gap-x-4">
              <FormField
                control={form.control}
                name="cuisineID"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Cuisine</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Cuisine" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cuisinesWithCountries.map((cuisine) => {
                          cuisinesMap.set(
                            cuisine.cuisineID,
                            cuisine.countriesToCuisines.map((c) => c.country)
                          );
                          return (
                            <SelectItem
                              key={cuisine.cuisineID}
                              value={cuisine.cuisineID}>
                              {cuisine.cuisineName}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="countryID"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Select Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cuisinesMap.get(currentCuisine)!.map((cuisine) => (
                          <SelectItem
                            key={cuisine.countryID}
                            value={cuisine.countryID}>
                            {cuisine.countryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="problemOrder"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Problem Category Order</FormLabel>
                  <FormControl>
                    <ProblemOrderSelector
                      renderProps={field}
                      options={categories}
                      name="Problem Categories"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="max-w-[50%]">
              {isExecuting ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </Form>
  );

  
}