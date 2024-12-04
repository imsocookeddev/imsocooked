'use client'
import { Button } from "../ui/button"
import { useState } from "react"
import { Input } from "../ui/input";
import { useAction } from "next-safe-action/hooks";
import { createProblemCategoryAction } from "@/actions/admin";
import { LoaderCircle, Check } from "lucide-react";

export default function AddCategory() {
  const [addCategory, setAddCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const { execute: runCreateProblemCategoryAction, isExecuting: isCreating } = useAction(createProblemCategoryAction, {
    onSuccess: () => {
      alert("Category created successfully");
      setAddCategory(false);
      setCategoryName("");
    },
    onError: () => {
      alert("Failed to create category");
    },
  });

  function handleCreation() {
    if (!categoryName) {
      alert("Category name cannot be empty");
      return;
    }

    runCreateProblemCategoryAction({
      name: categoryName,
    });
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {addCategory ? (
        <div className="flex w-full flex-row gap-x-2">
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
            className="text-2xl"
          />
          <Button
            onClick={() => {
              handleCreation();
            }}
            disabled={isCreating}>
            {isCreating ? <LoaderCircle className="animate-spin" /> : <Check />}
          </Button>
        </div>
      ) : (
        <Button onClick={() => setAddCategory(true)}>Add Category</Button>
      )}
    </div>
  );
}