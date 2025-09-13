"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";


interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  placeholder?: string;
  options: Option[];
  onChange: (value: string) => void;
  value?: string | null;
  className?: string;
}

export const CustomSelect = ({
  placeholder,
  options,
  onChange,
  value,
  className,
}: CustomSelectProps) => {
  return <Select onValueChange={onChange} value={value ?? ""}>
  <SelectTrigger className={cn("w-full", className)}>
    <SelectValue placeholder={placeholder} />
  </SelectTrigger>
  <SelectContent>
    {
        options.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))
    }
  </SelectContent>
</Select>;
};
