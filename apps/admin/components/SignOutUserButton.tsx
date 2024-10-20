'use client'
import { DoorOpen } from "lucide-react";
import { DropdownMenuLabel } from "./ui/dropdown-menu";
import { signUserOutAction } from "@/actions/clerk";

export default function SignOutUserButton() {
  return (
    <DropdownMenuLabel
      className="flex flex-row w-full items-center justify-between"
      onClick={async () => {
        await signUserOutAction();
      }}>
      <h3 className="text-red-600">Sign Out</h3>
      <DoorOpen />
    </DropdownMenuLabel>
  );
}