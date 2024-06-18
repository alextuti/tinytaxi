"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateSearchParams } from "@/lib/hooks/use-update-search-params";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export const FilterSelect = ({
  options,
  filterKey,
  label,
  defaultValue,
  className,
}: {
  options: { label: string; value: string }[];
  filterKey: string;
  label: string;
  defaultValue: string;
  className?: string;
}) => {
  const updateSearchParams = useUpdateSearchParams();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get(filterKey) ?? defaultValue;

  const handleSortByChange = (value: string) => {
    updateSearchParams({ [filterKey]: value });
  };

  return (
    <Select value={orderBy} onValueChange={handleSortByChange}>
      <SelectTrigger className={cn("flex gap-x-1", className)}>
        <span>
          {label && <span className="font-semibold">{label}: </span>}
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
