"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SearchSelectProps } from '@/types/ui'
import { ScrollArea } from "./scroll-area";

export default function Select({
  options,
  placeholder = "اختر",
  onSelect,
  selected = null,
  className,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring flex items-center justify-between ${className ?? ""}`}
          aria-expanded={open}
        >
          <ChevronsUpDown className="mr-2 h-4 w-4 text-muted-foreground justify-end" />
          {selected ? selected.value : placeholder}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 z-55" side="bottom" avoidCollisions={false}>
        <Command>
          <CommandEmpty>لا توجد نتائج.</CommandEmpty>
          <ScrollArea className="h-64">
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.value}
                  onSelect={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                  className="justify-between"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.id === option.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
    </div>
  );
}
