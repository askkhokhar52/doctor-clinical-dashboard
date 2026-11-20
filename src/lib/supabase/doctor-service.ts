import {
  type ClinicalAlert,
  type PatientRecord,
  type VisitDataPoint,
  clinicalAlerts as fallbackAlerts,
  doctorProfile as fallbackDoctorProfile,
  monthlyVisitsData as fallbackMonthlyVisits,
  todayPatients as fallbackPatients,
  weeklyVisitsData as fallbackWeeklyVisits,
} from "@/app/(main)/dashboard/doctor/_components/data";

import { supabase } from "./client";

export interface SupabaseHealth {
  connected: boolean;
  message: string;
  patientCount: number;
  alertCount: number;
  tablesAccessible: boolean;
}

/**
 * Checks connection health with the Supabase database.
 */
export async function checkSupabaseHealth(): Promise<SupabaseHealth> {
  try {
    const { data, error, count } = await supabase
      .from("patients")
      .select("patient_id", { count: "exact", head: true });

    if (error) {
      return {
        connected: false,
        message: error.message || "Failed to query Supabase",
        patientCount: 0,
        alertCount: 0,
        tablesAccessible: false,
      };
    }

    const { count: alertCount } = await supabase
      .from("clinical_alerts")
      .select("alert_id", { count: "exact", head: true });

    return {
      connected: true,
      message: "Connected to Supabase PostgreSQL",
      patientCount: count ?? 0,
      alertCount: alertCount ?? 0,
      tablesAccessible: true,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown Supabase connection error";
    return {
      connected: false,
      message: msg,
      patientCount: 0,
      alertCount: 0,
      tablesAccessible: false,
    };
  }
}

/**
 * Fetches the active doctor profile from Supabase with graceful fallback.
 */
export async function fetchDoctorProfile() {
  try {
    const { data, error } = await supabase.from("doctors").select("*").limit(1).maybeSingle();

    if (error || !data) {
      return { data: fallbackDoctorProfile, isFromSupabase: false };
    }

    return {
      data: {
        name: data.full_name ? `${data.full_name}, ${data.credentials || "MD"}` : fallbackDoctorProfile.name,
        title: data.title || fallbackDoctorProfile.title,
        department: data.department || fallbackDoctorProfile.department,
        room: data.clinic_suite || fallbackDoctorProfile.room,
        shift: `${data.shift_start || "08:00"} - ${data.shift_end || "17:00"}`,
        hospital: data.hospital || fallbackDoctorProfile.hospital,
        experience: "14+ Years",
      },
      isFromSupabase: true,
    };
  } catch {
    return { data: fallbackDoctorProfile, isFromSupabase: false };
  }
}

/**
 * Fetches patient queue and consultations from Supabase with fallback to data.ts.
 */
export async function fetchPatientQueue(): Promise<{
  patients: PatientRecord[];
  isFromSupabase: boolean;
  totalCount: number;
}> {
  try {
    const { data: appointments, error } = await supabase
      .from("appointments")
      .select(`
        appointment_id,
        scheduled_time,
        appointment_type,
        chief_complaint,
        status,
        wait_time_minutes,
        bp_reading,
        heart_rate_bpm,
        spo2_percentage,
        temp_fahrenheit,
        doctor_notes,
        patient_id,
        patients (
          patient_id,
          full_name,
          age,
          gender,
          avatar_url
        )
      `)
      .order("scheduled_time", { ascending: true });

    if (error || !appointments || appointments.length === 0) {
      return {
        patients: fallbackPatients,
        isFromSupabase: false,
        totalCount: fallbackPatients.length,
      };
    }

    // Also fetch satisfaction ratings for completed appointments
    const { data: surveys } = await supabase
      .from("satisfaction_surveys")
      .select("appointment_id, overall_rating, feedback_comment");

    const surveyMap = new Map<string, { rating: number; feedback: string }>();
    if (surveys) {
      for (const s of surveys) {
        surveyMap.set(s.appointment_id, {
          rating: Number(s.overall_rating),
          feedback: s.feedback_comment || "",
        });
      }
    }

    // Map appointments to PatientRecord structure
    const mapped: PatientRecord[] = appointments.map((app) => {
      // Supabase returns patients as single object or array
      const rawPatient = Array.isArray(app.patients) ? app.patients[0] : app.patients;
      const survey = surveyMap.get(app.appointment_id);

      // Format time string
      let timeStr = "09:00 AM";
      if (app.scheduled_time) {
        try {
          const date = new Date(app.scheduled_time);
          timeStr = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        } catch {
          timeStr = String(app.scheduled_time).slice(11, 16);
        }
      }

      return {
        id: rawPatient?.patient_id || app.patient_id || `APP-${app.appointment_id}`,
        name: rawPatient?.full_name || "Confidential Patient",
        avatar:
          rawPatient?.avatar_url ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(rawPatient?.full_name || "Patient")}`,
        age: rawPatient?.age || 45,
        gender: (rawPatient?.gender as "Female" | "Male" | "Other") || "Other",
        time: timeStr,
        type: (app.appointment_type as PatientRecord["type"]) || "Follow-up",
        chiefComplaint: app.chief_complaint || "Routine Clinical Evaluation",
        waitTime: app.wait_time_minutes ? `${app.wait_time_minutes} min` : "-",
        status: (app.status as PatientRecord["status"]) || "Waiting",
        satisfactionScore: survey ? survey.rating : null,
        feedback: survey?.feedback || undefined,
        vitals: app.bp_reading
          ? {
              bp: app.bp_reading,
              hr: app.heart_rate_bpm || 72,
              spo2: app.spo2_percentage || 98,
              temp: app.temp_fahrenheit ? `${app.temp_fahrenheit}°F` : "98.6°F",
            }
          : undefined,
      };
    });

    return {
      patients: mapped,
      isFromSupabase: true,
      totalCount: mapped.length,
    };
  } catch {
    return {
      patients: fallbackPatients,
      isFromSupabase: false,
      totalCount: fallbackPatients.length,
    };
  }
}

/**
 * Fetches clinical alerts from Supabase with fallback to data.ts.
 */
export async function fetchClinicalAlerts(): Promise<{
  alerts: ClinicalAlert[];
  isFromSupabase: boolean;
}> {
  try {
    const { data, error } = await supabase
      .from("clinical_alerts")
      .select(`
        alert_id,
        title,
        severity,
        action_label,
        created_at,
        patient_id,
        patients (
          full_name
        )
      `)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return { alerts: fallbackAlerts, isFromSupabase: false };
    }

    const mapped: ClinicalAlert[] = data.map((item) => {
      const patient = Array.isArray(item.patients) ? item.patients[0] : item.patients;
      let timestamp = "Just now";
      if (item.created_at) {
        const diffMinutes = Math.floor((Date.now() - new Date(item.created_at).getTime()) / 60000);
        if (diffMinutes < 60) {
          timestamp = `${Math.max(1, diffMinutes)}m ago`;
        } else {
          timestamp = `${Math.floor(diffMinutes / 60)}h ago`;
        }
      }

      return {
        id: item.alert_id,
        patientName: patient?.full_name || "Emergency Patient",
        patientId: item.patient_id,
        title: item.title,
        type: (item.severity as "critical" | "warning" | "info") || "info",
        timestamp,
        actionLabel: item.action_label || "Review Patient File",
      };
    });

    return { alerts: mapped, isFromSupabase: true };
  } catch {
    return { alerts: fallbackAlerts, isFromSupabase: false };
  }
}

/**
 * Fetches visits trend data (weekly or monthly) with fallback.
 */
export async function fetchVisitsData(range: "weekly" | "monthly"): Promise<VisitDataPoint[]> {
  return range === "weekly" ? fallbackWeeklyVisits : fallbackMonthlyVisits;
}
