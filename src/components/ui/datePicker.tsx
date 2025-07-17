"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
  onSubmit: (date: Date | undefined) => void;
  selectedDate?: Date | undefined;
  className?: string;
  placeholder?: string
};

export default function DatePicker({ selectedDate, onSubmit, className, placeholder }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!selectedDate}
          className={`data-[empty=true]:text-muted-foreground justify-start text-left bg-background! font-normal w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-ring ${className ?? ""}`}
        >
          <CalendarIcon />
          {selectedDate ? format(selectedDate, "PPP") : <span>{placeholder ? placeholder : "Pick a date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-60">
        <Calendar mode="single" selected={selectedDate} onSelect={(date) => {onSubmit(date)}} />
      </PopoverContent>
    </Popover>
  )
}