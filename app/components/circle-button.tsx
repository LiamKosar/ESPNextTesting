"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CircularHighlightButtonProps<T> {
  isHighlighted: boolean;
  data: T;
  callback: (data: T) => undefined;
}

export default function CircularHighlightButton<T>({ data, isHighlighted, callback }: CircularHighlightButtonProps<T>) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("w-5 h-5 rounded-full", isHighlighted ? "bg-primary text-primary-foreground" : "bg-background")}
      onClick={() => callback(data)}
    >
      <span className="sr-only">{isHighlighted ? "Deactivate" : "Activate"}</span>
    </Button>
  );
}
