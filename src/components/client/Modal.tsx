'use client';

import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

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

export function PersonModal({ isOpen, onClose, gender, children }: PersonModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute z-50 inset-0 flex items-center-safe justify-center-safe w-full h-screen shadow-md"
    >
      <div className={`bg-card text-card-foreground border-t-5 p-6 rounded-lg max-w-md w-full relative ${gender === "MALE" ? "border-t-male" : (gender === "FEMALE" ? "border-t-female" : "border-t-card")} `}>
        {children}
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 bg-transparent text-card-foreground hover:bg-secondary rounded-full w-6 h-6 p-0"
        >
          <Image src="/icons/close.png" alt="X" width={512} height={512} className="w-4 block dark:hidden" />
          <Image src="/icons/white-close.png" alt="X" width={512} height={512} className="w-4 hidden dark:block" />
        </Button>
      </div>
    </div>
  );
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 shadow-md"
    >
      <div className="bg-card text-card-foreground p-6 rounded-lg max-w-md relative">
        {children}
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 bg-transparent text-card-foreground hover:bg-secondary rounded-full w-6 h-6 p-0"
        >
          <Image src="/icons/close.png" alt="X" width={512} height={512} className="w-4 block dark:hidden" />
          <Image src="/icons/white-close.png" alt="X" width={512} height={512} className="w-4 hidden dark:block" />
        </Button>
      </div>
    </div>
  );
}
