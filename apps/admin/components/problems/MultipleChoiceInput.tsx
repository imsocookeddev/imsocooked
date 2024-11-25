'use client'
import { Input } from "../ui/input";


type MultipleChoiceInputProps = {
  index:number;
  value:string;
  onChange:(index:number,value:string)=>void;
}
export default function MultipleChoiceInput(props:MultipleChoiceInputProps){
  return (
    <Input
      value={props.value}
      onChange={(e) => props.onChange(props.index, e.target.value)}
      placeholder={`Choice ${props.index + 1}`}
      className="w-full"
    />
  );

}