"use client";

import { Calendar, Clock, Download, FileText, Pill, Plus, Stethoscope } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { doctorProfile } from "./data";

export function DoctorHeader() {
  return (
    <div className="flex flex-col gap-4 border-b pb-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Doctor Identity & Status */}
        <div className="flex items-start gap-3 sm:items-center">
          <Avatar className="size-14 border-2 border-primary/20 shadow-xs sm:size-16">
            <AvatarImage
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=160&auto=format&fit=crop&q=80"
              alt={doctorProfile.name}
            />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">SB</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{doctorProfile.name}</h1>
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              >
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                On Duty
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {doctorProfile.room}
              </Badge>
            </div>

            <p className="text-muted-foreground text-xs sm:text-sm">
              {doctorProfile.title} • {doctorProfile.department}
            </p>

            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                Shift: {doctorProfile.shift}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Stethoscope className="size-3.5 text-primary" />
                Hospital: {doctorProfile.hospital}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 shadow-xs">
            <Download className="size-3.5" />
            <span className="hidden sm:inline">Export</span> Report
          </Button>

          <Button variant="outline" size="sm" className="gap-1.5 shadow-xs">
            <Pill className="size-3.5" />
            Prescribe
          </Button>

          <Button variant="outline" size="sm" className="gap-1.5 shadow-xs">
            <FileText className="size-3.5" />
            Clinical Notes
          </Button>

          <Button size="sm" className="gap-1.5 shadow-xs">
            <Plus className="size-3.5" />
            New Consult
          </Button>
        </div>
      </div>
    </div>
  );
}
