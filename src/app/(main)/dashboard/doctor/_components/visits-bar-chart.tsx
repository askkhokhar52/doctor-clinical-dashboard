"use client";

import * as React from "react";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { monthlyVisitsData, weeklyVisitsData } from "./data";

const chartConfig = {
  newPatients: {
    label: "New Patients",
    color: "var(--primary)",
  },
  returningPatients: {
    label: "Returning Patients",
    color: "color-mix(in srgb, var(--primary) 35%, var(--muted-foreground))",
  },
} satisfies ChartConfig;

export function VisitsBarChart() {
  const [timeRange, setTimeRange] = React.useState<"weekly" | "monthly">("weekly");

  const activeData = timeRange === "weekly" ? weeklyVisitsData : monthlyVisitsData;

  const totalPeriodVisits = activeData.reduce((acc, curr) => acc + curr.total, 0);
  const avgVisits = Math.round(totalPeriodVisits / activeData.length);
  const totalNew = activeData.reduce((acc, curr) => acc + curr.newPatients, 0);
  const totalReturning = activeData.reduce((acc, curr) => acc + curr.returningPatients, 0);

  return (
    <Card className="shadow-xs xl:col-span-8">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">Patients Visited Breakdown</CardTitle>
            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-xs">
              <TrendingUp className="mr-1 size-3" />
              +14% Growth
            </Badge>
          </div>
          <CardDescription>Comparative analysis of new consultations vs. returning follow-up patients.</CardDescription>
        </div>

        <div className="flex items-center gap-1.5 self-start rounded-lg border bg-muted/40 p-1">
          <Button
            variant={timeRange === "weekly" ? "default" : "ghost"}
            size="xs"
            onClick={() => setTimeRange("weekly")}
            className="text-xs h-7 px-2.5"
          >
            Weekly
          </Button>
          <Button
            variant={timeRange === "monthly" ? "default" : "ghost"}
            size="xs"
            onClick={() => setTimeRange("monthly")}
            className="text-xs h-7 px-2.5"
          >
            Monthly
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Metric summary strip */}
        <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/20 p-3 sm:grid-cols-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground text-xs">Total Consultations</span>
            <span className="text-foreground text-xl font-semibold tabular-nums">{totalPeriodVisits}</span>
            <span className="text-muted-foreground text-[11px]">
              {timeRange === "weekly" ? "This week" : "Year to date"}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground text-xs">Daily / Period Avg</span>
            <span className="text-foreground text-xl font-semibold tabular-nums">{avgVisits}</span>
            <span className="text-muted-foreground text-[11px]">Patients / slot</span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground text-xs">New Inflow</span>
            <span className="text-primary text-xl font-semibold tabular-nums">{totalNew}</span>
            <span className="text-muted-foreground text-[11px]">
              {Math.round((totalNew / totalPeriodVisits) * 100)}% of total
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground text-xs">Returning Care</span>
            <span className="text-foreground text-xl font-semibold tabular-nums">{totalReturning}</span>
            <span className="text-muted-foreground text-[11px]">
              {Math.round((totalReturning / totalPeriodVisits) * 100)}% retention
            </span>
          </div>
        </div>

        {/* Bar Chart Container */}
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <BarChart data={activeData} margin={{ top: 12, right: 12, left: -16, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              className="text-xs text-muted-foreground"
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-xs text-muted-foreground" />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.3 }}
              content={
                <ChartTooltipContent
                  indicator="dashed"
                  labelFormatter={(value) => `${timeRange === "weekly" ? "Day" : "Month"}: ${value}`}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="newPatients" fill="var(--color-newPatients)" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar
              dataKey="returningPatients"
              fill="var(--color-returningPatients)"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
