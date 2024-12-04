"use client";

import { useState } from "react";
import { X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { type ProblemOrderSelectorProps } from "@/lib/types";

export default function ProblemOrderSelector(props: ProblemOrderSelectorProps) {
  const {
    options,
    name,
    renderProps: { onChange, value },
  } = props;

  const [availableItems, setAvailableItems] = useState(options);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelectItem = (itemID: string) => {
    const processedID = parseInt(itemID);
    onChange([...value, processedID]);
  };

  // Watch out for this as it should be removing all instances vs just one 
  const handleRemoveItem = (itemID: number) => {
    onChange(value.filter((f) => f !== itemID));
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={handleSelectItem}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`Select from ${name}`} />
        </SelectTrigger>
        <SelectContent>
          {availableItems.map((item) => (
            <SelectItem key={item.id} value={`${item.id}`} >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-wrap gap-2">
        {value.map((item) => (
          <Badge key={item} variant="secondary">
            {options.find((f) => f.id === item)?.name}
            <Button
              variant="ghost"
              size="sm"
              className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
              onClick={() => handleRemoveItem(item)}>
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
