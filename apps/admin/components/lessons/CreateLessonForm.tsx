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
import { type SelectCountriesType,ProblemCategoryType,CreateLessonType, SelectCuisinesType } from "@cooked/db/types";
import { createLessonAction } from "@/actions/admin";
import { useRouter } from "next/navigation";

type CreateLessonFormProps = {
  categories: ProblemCategoryType[];
  countries: SelectCountriesType[];
  cuisines: SelectCuisinesType[];
};

export default function CreateLessonForm(props:CreateLessonFormProps){
  const { push} = useRouter();
  const { cuisines, countries, categories } = props;

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

  const form = useForm


  
}