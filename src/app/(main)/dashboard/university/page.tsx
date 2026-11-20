import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "University Analytics Dashboard",
  description: "Comprehensive university student analytics: KPIs, program demand, alumni placement, at-risk students, and more — powered by Supabase.",
};

export default function UniversityDashboardPage() {
  return (
    <div className="relative -mx-4 -mt-4 h-[calc(100vh-3.5rem)] overflow-hidden md:-mx-6 md:-mt-6">
      <iframe
        src="/university-dashboard.html"
        title="University Student Analytics Dashboard"
        className="h-full w-full border-0"
        style={{ minHeight: "100vh" }}
      />
    </div>
  );
}
