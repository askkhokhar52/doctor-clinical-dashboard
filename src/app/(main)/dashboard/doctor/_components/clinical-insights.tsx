import { ArrowRight, Bell, MessageSquareQuote, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { type ClinicalAlert, clinicalAlerts, conditionBreakdown, satisfactionSummary } from "./data";

function AlertBadge({ type }: { type: ClinicalAlert["type"] }) {
  if (type === "critical") {
    return (
      <Badge variant="destructive" className="h-4 px-1 text-[9px]">
        CRITICAL
      </Badge>
    );
  }

  if (type === "warning") {
    return (
      <Badge
        variant="outline"
        className="h-4 border-amber-500/40 bg-amber-500/10 px-1 text-[9px] text-amber-700 dark:text-amber-400"
      >
        WARNING
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="h-4 px-1 text-[9px]">
      INFO
    </Badge>
  );
}

export function ClinicalInsights() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:col-span-4">
      {/* Critical Clinical Alerts */}
      <Card className="shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg border bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Bell className="size-4" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Clinical Priority Action</CardTitle>
              <CardDescription className="text-xs">Items requiring your direct medical review.</CardDescription>
            </div>
          </div>
          <Badge variant="destructive" className="h-5 px-1.5 text-[10px]">
            {clinicalAlerts.length} Action Items
          </Badge>
        </CardHeader>

        <CardContent className="space-y-3 pt-0">
          {clinicalAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex flex-col gap-2 rounded-lg border bg-muted/20 p-3 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <AlertBadge type={alert.type} />
                  <span className="font-medium text-xs text-foreground">{alert.patientName}</span>
                </div>
                <span className="text-muted-foreground text-[10px]">{alert.timestamp}</span>
              </div>

              <p className="text-xs text-muted-foreground leading-tight">{alert.title}</p>

              <div className="flex items-center justify-end pt-1">
                <Button variant="ghost" size="xs" className="h-6 text-[11px] gap-1 text-primary hover:text-primary">
                  {alert.actionLabel}
                  <ArrowRight className="size-3" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Conditions Treated / Case Mix Breakdown */}
      <Card className="shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Conditions Treated (Case Mix)</CardTitle>
            <Badge variant="outline" className="text-[11px]">
              This Month
            </Badge>
          </div>
          <CardDescription className="text-xs">Diagnostic distribution across 1,428 patient visits.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3.5 pt-0">
          {conditionBreakdown.map((item) => (
            <div key={item.condition} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{item.condition}</span>
                <span className="font-medium text-foreground font-mono">
                  {item.percentage}% ({item.patients})
                </span>
              </div>
              <Progress value={item.percentage} className="h-1.5" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Verified Patient Feedback Quotes */}
      <Card className="shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg border bg-primary/10 text-primary">
                <MessageSquareQuote className="size-4" />
              </div>
              <CardTitle className="text-base font-semibold">Patient Comments</CardTitle>
            </div>
            <Badge variant="secondary" className="text-[11px]">
              ⭐ 4.9 Average
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pt-0">
          {satisfactionSummary.recentFeedback.slice(0, 2).map((feedback) => (
            <div key={feedback.patientName} className="rounded-lg border bg-muted/20 p-2.5 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">{feedback.patientName}</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  <span className="font-mono text-[11px] font-medium text-foreground">{feedback.rating}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed">"{feedback.comment}"</p>
              <div className="text-[10px] text-muted-foreground text-right">{feedback.date}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
