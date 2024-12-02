"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Device, Vehicle } from "../types/response-data";



export type SearchBoxItem<T> = {
    name: string,
    value: string,
    item: T
}
type SearchBoxProps<T> = {
    name: string,
    items: SearchBoxItem<T>[],
    searchFieldDefault: string,
    callback: (item: T) => undefined;
}


export function SearchBox<T,>({name, items, callback, searchFieldDefault}: SearchBoxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
   
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
         {value ? value : name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchFieldDefault} />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    setOpen(false);
                    setValue(item.name)
                    callback(item.item)
                  }}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
