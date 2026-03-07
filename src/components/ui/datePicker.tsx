"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePopoverZoom } from "@/contexts/popoverZoom"

type DatePickerProps = {
  onSubmit: (date: Date | undefined) => void;
  selectedDate?: Date | undefined;
  className?: string;
  placeholder?: string
};

export default function DatePicker({ selectedDate, onSubmit, className, placeholder }: DatePickerProps) {
  const zoom = usePopoverZoom();
  return (
    <div className="flex gap-1">
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!selectedDate}
          className={`data-[empty=true]:text-muted-foreground justify-between text-left bg-background! font-normal w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-ring ${className ?? ""}`}
          style={zoom ? { fontSize: `${1 / zoom}em`, height: `${1 / zoom}em`} : undefined}
        >
          <CalendarIcon />
            {selectedDate ? format(selectedDate, "PPP") : <span>{placeholder ? placeholder : "Pick a date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-60">
        <Calendar mode="single" selected={selectedDate} onSelect={(date) => {onSubmit(date)}}             captionLayout="dropdown"/>
      </PopoverContent>
    </Popover>
    {selectedDate && (
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0"
        onClick={() => onSubmit(undefined)}
      >
        <X className="h-4 w-4" />
      </Button>
    )}
    </div>
  )
}