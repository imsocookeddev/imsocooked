'use client'
import { type ProblemCategoryType } from "@cooked/db/types";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Pencil,
  Check,
  MoreHorizontal,
  Trash,
  X,
  LoaderCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { updateProblemCategoryAction, deleteProblemCategoryAction } from "@/actions/admin";
import { useAction} from "next-safe-action/hooks"
import { is } from "@cooked/db";
import { set } from "zod";

export default function ModifyCategory(category:{category:ProblemCategoryType}){
  const [isEditing, setIsEditing] = useState(false);
  const [setConfirmDeletion, setSetConfirmDeletion] = useState(false);
  const { category: {
    categoryID, categoryName
  }} = category;
  const [value, setValue] = useState(categoryName);

  const { execute:runUpdateProblemCategoryAction, isExecuting:isUpdating} = useAction(updateProblemCategoryAction,{
    onSuccess:()=>{
      alert("Category updated successfully");
    },
    onError:()=>{
      setValue(categoryName);
      alert("Failed to update category");
    },
  });

  const { execute:runDeleteProblemCategoryAction, isExecuting:isDeleting} = useAction(deleteProblemCategoryAction,{
    onSuccess:() =>{
      alert("Category deleted successfully");
    },
    onError:()=>{
      alert("Failed to delete category");
    },
  });

  function handleUpdateItem(){
    if (!value){
      alert("Category name cannot be empty");
      setValue(categoryName);
      setIsEditing(false);
      return;
    }
    if (value === categoryName){
      alert("Category name is the same");
      setIsEditing(false);
      return;
    }
    setIsEditing(false);
    runUpdateProblemCategoryAction({ id: categoryID, name: value });
  }

  function handleDeleteItem(){  
    setSetConfirmDeletion(false);
    runDeleteProblemCategoryAction({ id: categoryID });
  }

  return (
    <div className="flex flex-row items-center">
      <Input
        key={categoryID}
        name={categoryName}
        value={setConfirmDeletion ? "Are you sure?" : value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!isEditing}
        className={`border-r-transparent rounded-r-none text-2xl focus:border-transparent ${setConfirmDeletion && "text-red-500"}`}
      />
      {(isEditing || setConfirmDeletion) && (
        <Check
          onClick={() => {
            isEditing ? handleUpdateItem() : handleDeleteItem();
          }}
          className="cursor-pointer border-y h-full"
        />
      )}
      {isUpdating || isDeleting ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`h-full w-8 p-0 rounded-none rounded-r-md border`}>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setSetConfirmDeletion(false);
                setIsEditing(!isEditing);
                if (isEditing) setValue(categoryName);
              }}
              className="flex flex-row items-center w-full justify-between">
              <span>{isEditing ? "Cancel" : "Edit"}</span>
              {isEditing ? <X size={20} /> : <Pencil size={20} />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsEditing(false);
                setSetConfirmDeletion(!setConfirmDeletion);
              }}
              className="flex flex-row items-center w-full justify-between">
              <span className="text-red-500">{setConfirmDeletion ? "Cancel":"Delete"}</span>
              {setConfirmDeletion ? <X size={20} /> : <Trash size={20} />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}