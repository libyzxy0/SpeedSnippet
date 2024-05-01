import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Plus } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
type NavbarProps = {
  children: React.ReactNode;
  className?: string;
};
type NavbarAvatarProps = {
  className?: string;
  src: string;
  alt: string;
  fallback: string;
  provider: string;
  name: string;
};
type NavbarSearchProps = {
  search: string;
};

function Navbar({ children, className }: NavbarProps) {
  return (
    <nav
      className={cn(
        "sticky w-full top-0 flex items-center justify-between h-16 border-b border-gray-300 dark:border-gray-800 z-30 backdrop-filter backdrop-blur-md bg-opacity-20",
        className,
      )}
    >
      {children}
    </nav>
  );
}

function LoginButton() {
  return (
    <Button variant="outline" className="ml-4" asChild>
      <Link to="/login">Sign In</Link>
    </Button>
  );
}

function NavbarAvatar({
  className,
  src,
  fallback,
  alt,
  provider,
  name,
}: NavbarAvatarProps) {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="ml-4 border-2 border-gray-300 dark:border-gray-800">
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="capitalize">
            {"Signed in " + provider}
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="bg-red-500 text-white"
            onClick={() => setOpen(true)}
          >
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open}>
        <AlertDialogContent className="bg-white dark:bg-gray-950 rounded-lg border border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                logout();
                setTimeout(() => setOpen(false), 2000);
              }}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function NavbarSearch({ search }: NavbarSearchProps) {
  return (
    <div className="mx-4 w-auto">
      <Input
        className="border border-gray-300 h-9 rounded-lg dark:border-gray-800"
        type="search"
        placeholder="Search"
        value={search}
      />
    </div>
  );
}

type ActionsProps = {
  onClick: () => void;
};

function Actions({ onClick }: ActionsProps) {
  return (
    <div className="mr-4 flex flex-row">
      <Button
        className="mr-2"
        variant="outline"
        size="icon"
        onClick={() => onClick()}
      >
        <Plus className="text-gray-700 dark:text-white" />
      </Button>
      <ModeToggle />
    </div>
  );
}

Navbar.NavbarAvatar = NavbarAvatar;
Navbar.LoginButton = LoginButton;
Navbar.NavbarSearch = NavbarSearch;
Navbar.Actions = Actions;

export default Navbar;
