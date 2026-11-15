"use client";

import * as React from "react";

import { Star, ThumbsUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";

import { satisfactionAspects, satisfactionSummary } from "./data";

const satisfactionChartConfig = {
  score: {
    label: "Satisfaction Score (%)",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function SatisfactionBarChart() {
  return (
    <Card className="shadow-xs xl:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">Patient Satisfaction Index</CardTitle>
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs"
            >
              <ThumbsUp className="mr-1 size-3" />
              96.8% CSAT
            </Badge>
          </div>
          <CardDescription>Performance ratings across care dimensions from 482 survey responses.</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Rating Summary Card */}
        <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-3">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold tracking-tight text-foreground tabular-nums">
              {satisfactionSummary.averageStars}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-muted-foreground text-xs">
                {satisfactionSummary.totalReviews} verified patient reviews
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              NPS Score: +{satisfactionSummary.npsScore}
            </span>
            <span className="text-muted-foreground text-[11px]">Exceptional Care</span>
          </div>
        </div>

        {/* Horizontal Bar Chart for Dimensions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-muted-foreground">Clinical Dimension Ratings</span>
            <span className="text-primary font-semibold">Target: &gt;90%</span>
          </div>

          <ChartContainer config={satisfactionChartConfig} className="h-48 w-full">
            <BarChart layout="vertical" data={satisfactionAspects} margin={{ top: 0, right: 16, left: 10, bottom: 0 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" domain={[70, 100]} hide />
              <YAxis
                dataKey="category"
                type="category"
                tickLine={false}
                axisLine={false}
                width={130}
                className="text-[11px] text-muted-foreground"
                tickFormatter={(value) => value.split(" ")[0] + " " + (value.split(" ")[1] || "")}
              />
              <ChartTooltip
                cursor={{ fill: "var(--muted)", opacity: 0.3 }}
                content={
                  <ChartTooltipContent
                    formatter={(value) => <span className="font-semibold text-foreground">{value}% Approval</span>}
                  />
                }
              />
              <Bar dataKey="score" fill="var(--color-score)" radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ChartContainer>
        </div>

        {/* Rating Star Distribution */}
        <div className="space-y-2 pt-1 border-t">
          <span className="text-xs font-medium text-muted-foreground">Rating Distribution</span>
          <div className="space-y-1.5">
            {satisfactionSummary.starBreakdown.slice(0, 3).map((item) => (
              <div key={item.stars} className="flex items-center gap-2 text-xs">
                <span className="w-12 text-muted-foreground flex items-center gap-0.5">
                  {item.stars} <Star className="size-3 fill-amber-400 text-amber-400" />
                </span>
                <Progress value={item.percentage} className="h-1.5 flex-1" />
                <span className="w-8 text-right text-muted-foreground font-mono text-[11px]">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
