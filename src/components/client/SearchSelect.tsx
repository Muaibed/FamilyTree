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

export default function SearchSelect({
  options,
  placeholder = "Select...",
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
          // className="w-[200px] justify-between border px-3 py-2 text-left text-sm border-input rounded-md flex items-center"
          className={className}
          aria-expanded={open}
        >
          {selected ? selected.value : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search...`} />
          <CommandEmpty>No match found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.id}
                value={option.value}
                onSelect={() => {
                  onSelect(option);
                  setOpen(false);
                }}
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
        </Command>
      </PopoverContent>
    </Popover>
    </div>
  );
}
