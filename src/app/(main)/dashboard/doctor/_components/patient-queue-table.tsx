"use client";

import * as React from "react";

import { Activity, CheckCircle2, Clock, Eye, Search, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { type PatientRecord, todayPatients } from "./data";

export function PatientQueueTable() {
  const [filter, setFilter] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const filteredPatients = todayPatients.filter((patient) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && patient.status === "Completed") ||
      (filter === "In Consultation" && patient.status === "In Consultation") ||
      (filter === "Waiting" && patient.status === "Waiting") ||
      (filter === "Scheduled" && patient.status === "Scheduled");

    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: PatientRecord["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <Badge
            variant="outline"
            className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 gap-1"
          >
            <CheckCircle2 className="size-3" />
            Completed
          </Badge>
        );
      case "In Consultation":
        return (
          <Badge
            variant="outline"
            className="border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400 gap-1 animate-pulse"
          >
            <Activity className="size-3" />
            In Room 402
          </Badge>
        );
      case "Waiting":
        return (
          <Badge
            variant="outline"
            className="border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 gap-1"
          >
            <Clock className="size-3" />
            Waiting ({todayPatients.find((p) => p.status === "Waiting")?.waitTime || "10m"})
          </Badge>
        );
      case "Scheduled":
        return (
          <Badge variant="secondary" className="gap-1 text-muted-foreground">
            <Clock className="size-3" />
            Scheduled
          </Badge>
        );
    }
  };

  return (
    <Card className="shadow-xs xl:col-span-8">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">Today's Patient Schedule & Visits</CardTitle>
            <Badge variant="secondary" className="font-mono text-xs">
              {todayPatients.length} Patients
            </Badge>
          </div>
          <CardDescription>
            Live consultation queue, appointment triage, wait times, and satisfaction scores.
          </CardDescription>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-48">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-3.5" />
            <Input
              placeholder="Search patient or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 pl-8 text-xs"
            />
          </div>

          <div className="flex items-center gap-1 rounded-lg border bg-muted/30 p-0.5">
            {["All", "Waiting", "Completed"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "ghost"}
                size="xs"
                onClick={() => setFilter(status)}
                className="text-xs h-7 px-2"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[200px] text-xs">Patient</TableHead>
                <TableHead className="text-xs">Time & Type</TableHead>
                <TableHead className="text-xs">Chief Complaint</TableHead>
                <TableHead className="text-xs">Wait Time</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Satisfaction</TableHead>
                <TableHead className="text-right text-xs">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-xs text-muted-foreground">
                    No patient records found matching the criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-muted/30">
                    {/* Patient Info */}
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-8">
                          <AvatarImage src={patient.avatar} alt={patient.name} />
                          <AvatarFallback className="text-[10px]">
                            {patient.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-xs text-foreground leading-tight">{patient.name}</span>
                          <span className="text-muted-foreground text-[11px]">
                            {patient.age}y • {patient.gender} • <span className="font-mono">{patient.id}</span>
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Time & Type */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-foreground">{patient.time}</span>
                        <span className="text-muted-foreground text-[11px]">{patient.type}</span>
                      </div>
                    </TableCell>

                    {/* Chief Complaint */}
                    <TableCell>
                      <span className="text-xs text-foreground line-clamp-1 max-w-[180px]">
                        {patient.chiefComplaint}
                      </span>
                    </TableCell>

                    {/* Wait Time */}
                    <TableCell>
                      <span className="text-xs font-mono text-muted-foreground">{patient.waitTime}</span>
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>{getStatusBadge(patient.status)}</TableCell>

                    {/* Satisfaction Score */}
                    <TableCell>
                      {patient.satisfactionScore !== null ? (
                        <div className="flex items-center gap-1">
                          <Star className="size-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-medium text-foreground tabular-nums">
                            {patient.satisfactionScore.toFixed(1)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-[11px] italic">Pending</span>
                      )}
                    </TableCell>

                    {/* Action */}
                    <TableCell className="text-right">
                      <Button variant="outline" size="xs" className="h-7 text-xs gap-1">
                        <Eye className="size-3" />
                        EHR
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
