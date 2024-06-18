"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateSearchParams } from "@/lib/hooks/use-update-search-params";
import { useSearchParams } from "next/navigation";

export const OrderBySelect = () => {
  const updateSearchParams = useUpdateSearchParams();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("order_by") ?? "trip_distance+DESC";

  const handleSortByChange = (orderBy: string) => {
    updateSearchParams({ order_by: orderBy });
  };

  return (
    <Select value={orderBy} onValueChange={handleSortByChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="trip_distance+DESC">Trip distance: desc</SelectItem>
        <SelectItem value="trip_distance+ASC">Trip distance: asc</SelectItem>
        <SelectItem value="total_amount+DESC">Total amount: desc</SelectItem>
        <SelectItem value="total_amount+ASC">Total amount: asc</SelectItem>
      </SelectContent>
    </Select>
  );
};
