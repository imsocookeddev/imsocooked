import { currentUser } from "@clerk/nextjs/server";
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SignOutUserButton from "./SignOutUserButton";
import { Sign } from "crypto";


export default async function AdminUserButton() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const { firstName, lastName, imageUrl, primaryEmailAddress: email } = user;

  const hasFirstAndLastName = firstName && lastName;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={imageUrl} alt="userpfp" />
          <AvatarFallback>
            {hasFirstAndLastName ? `${firstName[0]}${lastName[0]}` : "NA"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Admin View</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{`${firstName ?? ""} ${lastName ?? ""}`}</DropdownMenuLabel>
        <DropdownMenuLabel className="text-muted-foreground text-sm">
          {email?.emailAddress ?? "Missing Email"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SignOutUserButton />
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
// onClick={()=>signUserOut}