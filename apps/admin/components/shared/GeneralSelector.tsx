"use client";

import {useState} from "react";
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
import { type GeneralSelectorProps, GeneralDropDownType } from "@/lib/types";

export default function GeneralSelector(props:GeneralSelectorProps) {

  const { options, name, renderProps:{
    onChange,value
  } } =
    props;

  const [availableItems, setAvailableItems] = useState(options);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectItem = (itemID: string) => {
    onChange([...value, itemID]);
    setAvailableItems((prev) => prev.filter((f) => f.id !== itemID).sort((a,b) => a.name.localeCompare(b.name)));

  };

  const handleRemoveItem = (itemID: string) => {
    onChange(value.filter((f) => f !== itemID));
    setAvailableItems((prev) => [
      ...prev,
      options.find((f) => f.id === itemID)!,
    ].sort((a,b) => a.name.localeCompare(b.name)));
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={handleSelectItem}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`Select from ${name}`} />
        </SelectTrigger>
        <SelectContent>
            {availableItems.map((item) => (
              <SelectItem key={item.id} value={item.id}>
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
