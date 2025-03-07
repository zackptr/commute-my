"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "app/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "app/components/ui/popover";
import { Input } from "app/components/ui/input";
import React from "react";

export type ComboboxOption<T> = T & {
  id: string | number;
  label: string;
};

type SearchableComboboxProps<T> = {
  options: ComboboxOption<T>[];
  value?: string | number | null;
  onChange: (value: string | number | null, item?: ComboboxOption<T>) => void;
  placeholder?: string;
  emptyMessage?: string;
  renderItem?: (item: ComboboxOption<T>) => React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export function SearchableCombobox<T>({
  options,
  value,
  onChange,
  placeholder = "Search...",
  emptyMessage = "No results found.",
  renderItem,
  className,
  disabled = false,
}: SearchableComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const selectedItem = React.useMemo(
    () => options.find((option) => option.id === value),
    [options, value]
  );

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  // Update search query when a value is selected
  React.useEffect(() => {
    if (selectedItem) {
      setSearchQuery(selectedItem.label);
    }
  }, [selectedItem]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!open) setOpen(true);

    // If input is cleared, also clear the selected value
    if (e.target.value === "" && value) {
      onChange(null);
    }
  };

  // Handle click on the chevron icon
  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from affecting the input
    setOpen(!open);

    // If opening the dropdown, focus the input
    if (!open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        // If closing and we have a selected item, restore its label
        if (!isOpen && selectedItem) {
          setSearchQuery(selectedItem.label);
        }
      }}
    >
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={cn("pr-10", className)}
            onFocus={() => setOpen(true)}
            disabled={disabled}
            // Prevent the dropdown from closing when clicking the input
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={handleChevronClick}
          >
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        // Prevent closing when clicking inside the dropdown
        onInteractOutside={(e) => {
          if (inputRef.current?.contains(e.target as Node)) {
            e.preventDefault();
          }
        }}
      >
        <Command shouldFilter={false}>
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.id}
                  value={String(option.id)}
                  onSelect={() => {
                    onChange(option.id, option);
                    setSearchQuery(option.label);
                    setOpen(false);
                    // Return focus to the input after selection
                    setTimeout(() => {
                      inputRef.current?.focus();
                    }, 0);
                  }}
                >
                  <div className="flex w-full items-center">
                    {renderItem ? (
                      renderItem(option)
                    ) : (
                      <span>{option.label}</span>
                    )}
                    {option.id === value && (
                      <Check className="ml-auto h-4 w-4 flex-shrink-0" />
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
