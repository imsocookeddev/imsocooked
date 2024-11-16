"use client";
import { DoorOpen, LoaderCircle } from "lucide-react";
import { DropdownMenuLabel } from "./ui/dropdown-menu";
import { signUserOutAction } from "@/actions/clerk";
import { useState } from "react";

export default function SignOutUserButton() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <DropdownMenuLabel
      className="flex flex-row w-full items-center justify-between cursor-pointer hover:bg-muted"
      onClick={async () => {
        setIsClicked(true);
        await signUserOutAction();
      }}>
      <h3 className="text-red-600">Sign Out</h3>
      {isClicked ? <LoaderCircle className="animate-spin" /> : <DoorOpen />}
    </DropdownMenuLabel>
  );
}
