import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
export default function Header({
  back,
  className,
  title,
}: {
  back: string;
  className?: string;
  title: string;
}) {
  return (
    <nav
      className={cn(
        "sticky w-full top-0 flex items-center h-16 justify-between border-b border-gray-300 dark:border-gray-800 z-30 backdrop-filter backdrop-blur-md bg-opacity-20",
        className,
      )}
    >
      <div className="flex flex-row items-center">
        <Button variant="ghost" className="mx-4 p-0" asChild>
          <Link to={back}>
            <ChevronLeft className="text-gray-700 dark:text-white" />
          </Link>
        </Button>
        <h1 className="text-xl font-medium">{title}</h1>
      </div>
      <div className="mx-4">
        <ModeToggle />
      </div>
    </nav>
  );
}
