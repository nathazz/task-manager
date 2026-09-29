"use client";

import { useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";

interface TaskCardActionsProps {
  disabled: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCardActions({ disabled, onEdit, onDelete }: TaskCardActionsProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  function stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  if (isConfirming) {
    return (
      <div className="flex items-center gap-1" onClick={stopPropagation}>
        <span>Delete this task?</span>

        <Button variant="danger" size="sm" disabled={disabled} onClick={onDelete}>
          Delete
        </Button>

        <Button size="sm" variant="ghost" onClick={() => setIsConfirming(false)}>
          Keep
        </Button>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1 md:opacity-0 md:transition-opacity md:group-focus-within:opacity-100 md:group-hover:opacity-100"
      onClick={stopPropagation}
    >
      <Button variant="ghost" size="sm" disabled={disabled} onClick={onEdit}>
        Edit
      </Button>

      <Button
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={() => setIsConfirming(true)}
      >
        Delete
      </Button>
    </div>
  );
}
