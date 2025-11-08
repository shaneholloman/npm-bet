"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive area chart";

const chartConfig = {
  downloads: {
    label: "Downloads",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type ChartAreaInteractiveProps = {
  data: {
    start: string;
    end: string;
    package: string;
    downloads: {
      downloads: number;
      day: string;
    }[];
  };
};

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const [timeRange, setTimeRange] = useState("90d");

  const chartData = data.downloads.map((item) => ({
    date: item.day,
    downloads: item.downloads,
  }));

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const endDate = new Date(data.end);
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="size-full shadow-none">
      <CardContent className="size-full">
        <ChartContainer className="size-full" config={chartConfig}>
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDownloads" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-downloads)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-downloads)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="date"
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
              }
              cursor={false}
            />
            <Area
              dataKey="downloads"
              fill="url(#fillDownloads)"
              stroke="var(--color-downloads)"
              type="natural"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
