'use client'
import {type MultipleChoiceControllerProps }from "@/lib/types"
import MultipleChoiceInput from "./MultipleChoiceInput";
import { useEffect } from "react";
import { useState } from "react";
export default function MultipleChoiceController(props:MultipleChoiceControllerProps<any,string>){
  const choiceArray:string[] = new Array(4).fill("");
  const [choiceArrayState, setChoiceArrayState] = useState(choiceArray);

  useEffect(() => {
    props.onChange(JSON.stringify(choiceArrayState));
  }, [choiceArrayState]);

  const handleChoiceChange = (index:number,value:string) => {
    setChoiceArrayState((prev) => {
      prev[index] = value;
      return [...prev];
    });
    console.log("Choice Array State: ", choiceArrayState);
  };

  return (
    <div className="space-y-4">
      {choiceArrayState.map((choice,index) => (
        <MultipleChoiceInput
          key={index}
          index={index}
          value={choice}
          onChange={handleChoiceChange}
        />
      ))}
    </div>
  );

}
