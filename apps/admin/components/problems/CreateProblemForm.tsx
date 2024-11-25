'use client'
import {type ProblemCategoryType} from "@cooked/db/types"
import { useAction } from "next-safe-action/hooks";
import { useForm} from  "react-hook-form"
import { createProblemAction } from "@/actions/admin";
import { createProblemSchema } from "@cooked/db/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { type CreateProblemType } from "@cooked/db/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import c from "@cooked/config";
import { useEffect } from "react";
import MultipleChoiceController from "./MultipleChoiceController";


export default function CreateProblemForm({
  categories,
}: {
  categories: ProblemCategoryType[];
}) {
  const { push} = useRouter();
  const {execute:runCreateProblemAction,isExecuting} = useAction(createProblemAction,{
    onSuccess:()=>{
      alert("Problem created successfully! Redirecting...");
      push('/problems');
    },
    onError:(e)=>{
      console.log(e);
      alert("Something went wrong :(")
    }
  });

   const form = useForm<CreateProblemType>({
     resolver: zodResolver(createProblemSchema),
     defaultValues: {
       categoryID:-1,
       correctAnswer:"",
       problemContent:"",
       problemType:"",
       prompt:"",
     },
   });

   function handleSubmit(data:CreateProblemType){
    runCreateProblemAction({
      ...data,
      correctAnswer:JSON.stringify(data.correctAnswer),
    })
   }

  return (
    <Form {...form}>
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full max-w-[75%] items-center justify-center">
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 px-5 py-5 border rounded-lg w-1/2 2xl:w-[40%]">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Input placeholder="How do you butter a bun?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Come back and redesign this to handle different types of questions */}
            <div className="flex flex-row gap-x-4 items-center justify-between w-full">
              <FormField
                control={form.control}
                name="categoryID"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const categoryID = parseInt(value, 10);
                        form.setValue("categoryID", categoryID);
                      }}
                      >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.categoryID}
                            value={`${category.categoryID}`}>
                            {category.categoryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="problemType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Problem Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={`${field.value}`}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(c.problemTypes).map((problemType) => (
                          <SelectItem
                            key={problemType[0]}
                            value={problemType[0]}>
                            {problemType[1].name}
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
              name="problemContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <MultipleChoiceController {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correctAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Answer</FormLabel>
                  <FormControl>
                    <Input placeholder="With butter!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isExecuting}>
              {isExecuting ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </Form>
  );
}