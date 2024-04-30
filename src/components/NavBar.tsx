import React from 'react';
import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ModeToggle } from '@/components/theme-toggle'
type NavbarProps = {
  children: React.ReactNode, 
  className?: string
}
type NavbarAvatarProps = {
  className?: string, 
  src: string, 
  alt: string, 
  fallback: string
}
type NavbarSearchProps = {
  search: string
}

function Navbar({ children, className }: NavbarProps) {
  return (
    <nav className={cn("sticky w-full top-0 flex items-center justify-between h-16 border-b border-gray-300 dark:border-gray-800 z-30 backdrop-filter backdrop-blur-md bg-opacity-20", className)}>
      { children }
    </nav>
  )
}

function NavbarAvatar({ className, src, fallback, alt }: NavbarAvatarProps) {
  return (
    <Avatar className="ml-4 border-2 border-gray-300 dark:border-gray-800">
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}

function NavbarSearch({ search }: NavbarSearchProps) {
  return (
    <div className="mx-4 w-auto">
      <Input className="border border-gray-300 h-9 rounded-lg dark:border-gray-800" type="search" placeholder="Search" value={search} />
    </div>
  )
}

function Actions() {
  return (
    <div className="mr-4 flex flex-row">
      <Button className="mr-2" variant="outline" size="icon">
        <Plus className="text-gray-700 dark:text-white" />
      </Button>
      <ModeToggle />
    </div>
  )
}

Navbar.NavbarAvatar = NavbarAvatar;
Navbar.NavbarSearch = NavbarSearch;
Navbar.Actions = Actions;

export default Navbar;