'use client'
import {type ProblemCategoryType} from "@cooked/db/types"
import { useAction } from "next-safe-action/hooks";
import { useForm} from  "react-hook-form"
import { createProblem } from "@/actions/admin";
export default function CreateProblemForm({
  categories,
}: {
  categories: ProblemCategoryType[];
}) {

  


  return <></>;
}