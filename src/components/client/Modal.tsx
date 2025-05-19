'use client';

import React from 'react';

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
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className={`bg-white dark:bg-[#dae0fa] dark:text-[#212226] border-t-5 dark:border-t-5 p-6 rounded-lg max-w-md w-full relative ${gender === "MALE" ? "border-t-[#60B5FF] dark:border-t-[#60B5FF]" : (gender === "FEMALE" ? "border-t-[#EC7FA9] dark:border-t-[#EC7FA9]" : "")} `}>
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:cursor-pointer hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-[#dae0fa] dark:text-[#212226] border-t-5 dark:border-t-5 p-6 rounded-lg max-w-md w-full relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:cursor-pointer hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
