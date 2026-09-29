"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto w-[min(460px,calc(100vw-2rem))] rounded-2xl p-0 text-ink shadow-2xl backdrop:bg-ink/40"
    >
      <div className="flex flex-col gap-4 p-6">
        <h2 id={titleId} className="text-lg font-bold">
          {title}
        </h2>
        {children}
      </div>
    </dialog>
  );
}
