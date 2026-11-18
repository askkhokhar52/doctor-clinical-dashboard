import type { Metadata } from "next";

import { ClinicalInsights } from "./_components/clinical-insights";
import { DoctorHeader } from "./_components/doctor-header";
import { DoctorKpis } from "./_components/doctor-kpis";
import { PatientQueueTable } from "./_components/patient-queue-table";
import { SatisfactionBarChart } from "./_components/satisfaction-bar-chart";
import { VisitsBarChart } from "./_components/visits-bar-chart";

export const metadata: Metadata = {
  title: "Doctor Clinical Dashboard | Studio Admin",
  description:
    "Comprehensive doctor dashboard displaying patients visited, satisfaction metrics, clinical KPIs, bar charts, and patient queue triage.",
  alternates: {
    canonical: "/dashboard/doctor",
  },
};

export default function DoctorDashboardPage() {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {/* Doctor Profile & Shift Header */}
      <DoctorHeader />

      {/* Core Clinical & Operational KPIs */}
      <DoctorKpis />

      {/* Charts Section: Visits Volume & Patient Satisfaction Bar Charts */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <VisitsBarChart />
        <SatisfactionBarChart />
      </div>

      {/* Tables & Operational Section: Today's Consultation Queue & Clinical Alerts */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <PatientQueueTable />
        <ClinicalInsights />
      </div>
    </div>
  );
}
