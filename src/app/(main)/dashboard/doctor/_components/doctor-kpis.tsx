import { Clock, HeartPulse, Smile, TrendingDown, TrendingUp, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DoctorKpis() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* KPI 1: Patients Visited */}
      <Card className="shadow-xs transition-shadow hover:shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex flex-col gap-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider">Patients Visited</CardDescription>
            <CardTitle className="text-3xl font-bold tracking-tight tabular-nums">1,428</CardTitle>
          </div>
          <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg border">
            <Users className="size-5" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1.5 pt-0">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 gap-1 text-[11px]"
            >
              <TrendingUp className="size-3" />
              +12.4%
            </Badge>
            <span className="text-muted-foreground text-xs">vs. last month</span>
          </div>
          <p className="text-muted-foreground text-xs">
            <span className="text-foreground font-medium">28 scheduled today</span> • 18 completed
          </p>
        </CardContent>
      </Card>

      {/* KPI 2: Patients Satisfied */}
      <Card className="shadow-xs transition-shadow hover:shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex flex-col gap-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider">
              Patients Satisfied
            </CardDescription>
            <CardTitle className="text-3xl font-bold tracking-tight tabular-nums">96.8%</CardTitle>
          </div>
          <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex size-10 shrink-0 items-center justify-center rounded-lg border">
            <Smile className="size-5" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1.5 pt-0">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 gap-1 text-[11px]"
            >
              <TrendingUp className="size-3" />
              +2.4%
            </Badge>
            <span className="text-muted-foreground text-xs">CSAT Score</span>
          </div>
          <p className="text-muted-foreground text-xs">
            <span className="text-foreground font-medium">4.9 / 5.0 ⭐</span> from 482 verified reviews
          </p>
        </CardContent>
      </Card>

      {/* KPI 3: Average Wait Time */}
      <Card className="shadow-xs transition-shadow hover:shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex flex-col gap-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider">
              Avg. Patient Wait Time
            </CardDescription>
            <CardTitle className="text-3xl font-bold tracking-tight tabular-nums">14.2 min</CardTitle>
          </div>
          <div className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex size-10 shrink-0 items-center justify-center rounded-lg border">
            <Clock className="size-5" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1.5 pt-0">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 gap-1 text-[11px]"
            >
              <TrendingDown className="size-3" />
              -3.8 min
            </Badge>
            <span className="text-muted-foreground text-xs">vs. clinic avg (18m)</span>
          </div>
          <p className="text-muted-foreground text-xs">Target: &lt; 20 min • Avg consult: 18.5m</p>
        </CardContent>
      </Card>

      {/* KPI 4: Care Plan Adherence */}
      <Card className="shadow-xs transition-shadow hover:shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex flex-col gap-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider">
              Care Plan Adherence
            </CardDescription>
            <CardTitle className="text-3xl font-bold tracking-tight tabular-nums">91.5%</CardTitle>
          </div>
          <div className="bg-violet-500/10 text-violet-600 dark:text-violet-400 flex size-10 shrink-0 items-center justify-center rounded-lg border">
            <HeartPulse className="size-5" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1.5 pt-0">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 gap-1 text-[11px]"
            >
              <TrendingUp className="size-3" />
              +4.6%
            </Badge>
            <span className="text-muted-foreground text-xs">follow-up rate</span>
          </div>
          <p className="text-muted-foreground text-xs">
            <span className="text-foreground font-medium">94.8%</span> medication compliance rate
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
