"use client";

import { CalendarIcon, GroupIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGrouping, useTimeRange } from "@/providers/filters";

export const Filters = () => {
  const [timeRange, setTimeRange] = useTimeRange();
  const [grouping, setGrouping] = useGrouping();

  return (
    <div className="flex gap-2">
      <Select onValueChange={setTimeRange} value={timeRange}>
        <SelectTrigger className="w-40 bg-background [&>span]:flex-1">
          <CalendarIcon className="size-4" />
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="last-week">Last week</SelectItem>
          <SelectItem value="last-month">Last month</SelectItem>
          <SelectItem value="last-year">Last year</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setGrouping} value={grouping}>
        <SelectTrigger className="w-40 bg-background [&>span]:flex-1">
          <GroupIcon className="size-4" />
          <SelectValue placeholder="Select grouping" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">By day</SelectItem>
          <SelectItem value="week">By week</SelectItem>
          <SelectItem value="month">By month</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
