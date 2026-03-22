"use client";

import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface PersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender: string | undefined;
  children: React.ReactNode;
}

export function PersonModal({
  isOpen,
  onClose,
  gender,
  children,
}: PersonModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`bg-card text-card-foreground border-t-[0.3em] p-[0.5em] rounded-xl md:rounded-lg w-full h-full max-h-full relative shadow-xl overflow-y-auto overflow-x-hidden ${gender === "MALE" ? "border-t-male" : gender === "FEMALE" ? "border-t-female" : "border-t-card"} `}
    >
      <Button
        onClick={onClose}
        className="absolute top-[0.3em] right-[0.3em] bg-transparent text-card-foreground hover:bg-secondary rounded-full w-[1.4em] h-[1.4em] p-0 z-10"
      >
        <X className="w-[0.9em] h-[0.9em]" />
      </Button>
      <div className="px-[1.5em] pb-[0.5em]">{children}</div>
    </div>
  );
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-md">
      <div className="bg-card text-card-foreground p-6 rounded-lg max-w-md relative min-w-full md:min-w-md">
        {children}
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 bg-transparent text-card-foreground hover:bg-secondary rounded-full w-6 h-6 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}