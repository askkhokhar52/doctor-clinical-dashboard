export interface PatientRecord {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gender: "Female" | "Male" | "Other";
  time: string;
  type: "New Patient" | "Follow-up" | "Routine Checkup" | "Urgent Consult";
  chiefComplaint: string;
  waitTime: string;
  status: "Completed" | "In Consultation" | "Waiting" | "Scheduled";
  satisfactionScore: number | null; // 1 to 5, null if not yet completed
  feedback?: string;
  vitals?: {
    bp: string;
    hr: number;
    spo2: number;
    temp: string;
  };
}

export interface VisitMetric {
  title: string;
  value: string;
  subtext: string;
  change: string;
  trend: "up" | "down" | "neutral";
  isPositive: boolean;
}

export interface VisitDataPoint {
  period: string;
  newPatients: number;
  returningPatients: number;
  total: number;
  satisfiedPercentage: number;
}

export type WeeklyVisitData = VisitDataPoint;
export type MonthlyVisitData = VisitDataPoint;

export interface SatisfactionAspect {
  category: string;
  score: number; // 0 to 100
  benchmark: number;
}

export interface ClinicalAlert {
  id: string;
  patientName: string;
  patientId: string;
  title: string;
  type: "critical" | "warning" | "info";
  timestamp: string;
  actionLabel: string;
}

export const doctorProfile = {
  name: "Dr. Sarah Bennett, MD, FACP",
  title: "Lead Consultant Physician & Cardiologist",
  department: "Department of Internal Medicine",
  room: "Clinic Suite 402",
  shift: "08:00 - 17:00",
  hospital: "Metro General Hospital",
  experience: "14+ Years",
};

export const weeklyVisitsData: VisitDataPoint[] = [
  { period: "Mon", newPatients: 12, returningPatients: 18, total: 30, satisfiedPercentage: 97 },
  { period: "Tue", newPatients: 15, returningPatients: 19, total: 34, satisfiedPercentage: 95 },
  { period: "Wed", newPatients: 10, returningPatients: 22, total: 32, satisfiedPercentage: 98 },
  { period: "Thu", newPatients: 16, returningPatients: 20, total: 36, satisfiedPercentage: 96 },
  { period: "Fri", newPatients: 19, returningPatients: 23, total: 42, satisfiedPercentage: 98 },
  { period: "Sat", newPatients: 8, returningPatients: 14, total: 22, satisfiedPercentage: 99 },
  { period: "Sun", newPatients: 4, returningPatients: 6, total: 10, satisfiedPercentage: 94 },
];

export const monthlyVisitsData: VisitDataPoint[] = [
  { period: "Jan", newPatients: 110, returningPatients: 195, total: 305, satisfiedPercentage: 94 },
  { period: "Feb", newPatients: 118, returningPatients: 210, total: 328, satisfiedPercentage: 95 },
  { period: "Mar", newPatients: 132, returningPatients: 224, total: 356, satisfiedPercentage: 96 },
  { period: "Apr", newPatients: 126, returningPatients: 218, total: 344, satisfiedPercentage: 95 },
  { period: "May", newPatients: 142, returningPatients: 238, total: 380, satisfiedPercentage: 97 },
  { period: "Jun", newPatients: 138, returningPatients: 242, total: 380, satisfiedPercentage: 96 },
  { period: "Jul", newPatients: 145, returningPatients: 250, total: 395, satisfiedPercentage: 97 },
  { period: "Aug", newPatients: 139, returningPatients: 246, total: 385, satisfiedPercentage: 96 },
  { period: "Sep", newPatients: 152, returningPatients: 260, total: 412, satisfiedPercentage: 98 },
  { period: "Oct", newPatients: 168, returningPatients: 274, total: 442, satisfiedPercentage: 97 },
];

export const satisfactionAspects: SatisfactionAspect[] = [
  { category: "Doctor Communication & Empathy", score: 98, benchmark: 90 },
  { category: "Diagnosis & Treatment Clarity", score: 96, benchmark: 88 },
  { category: "Staff & Nursing Care", score: 95, benchmark: 89 },
  { category: "Post-Consultation Follow-Up", score: 92, benchmark: 85 },
  { category: "Wait Time & Scheduling", score: 89, benchmark: 82 },
];

export const satisfactionSummary = {
  overallPercentage: 96.8,
  averageStars: 4.9,
  totalReviews: 482,
  npsScore: 78,
  starBreakdown: [
    { stars: 5, percentage: 86, count: 414 },
    { stars: 4, percentage: 11, count: 53 },
    { stars: 3, percentage: 2, count: 10 },
    { stars: 2, percentage: 0.6, count: 3 },
    { stars: 1, percentage: 0.4, count: 2 },
  ],
  recentFeedback: [
    {
      patientName: "Eleanor V.",
      date: "Today, 10:15 AM",
      rating: 5,
      comment:
        "Dr. Bennett thoroughly explained my ECG test results and adjusted my blood pressure medication with great care.",
      sentiment: "Positive",
    },
    {
      patientName: "David C.",
      date: "Today, 11:00 AM",
      rating: 5,
      comment:
        "Minimal waiting time and exceptionally attentive consultation. Felt very reassured regarding my chest tightness symptoms.",
      sentiment: "Positive",
    },
    {
      patientName: "Amina M.",
      date: "Yesterday",
      rating: 4.5,
      comment:
        "Very detailed care plan. The electronic prescription was delivered directly to my pharmacy within minutes.",
      sentiment: "Positive",
    },
  ],
};

export const conditionBreakdown = [
  { condition: "Cardiovascular & Hypertension", patients: 486, percentage: 34 },
  { condition: "Metabolic & Diabetes Management", patients: 371, percentage: 26 },
  { condition: "Preventive & Routine Checkups", patients: 285, percentage: 20 },
  { condition: "Respiratory Conditions", patients: 172, percentage: 12 },
  { condition: "Musculoskeletal & General", patients: 114, percentage: 8 },
];

export const todayPatients: PatientRecord[] = [
  {
    id: "PAT-1082",
    name: "Eleanor Vance",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    age: 54,
    gender: "Female",
    time: "08:30 AM",
    type: "Follow-up",
    chiefComplaint: "Hypertension Review & Lipid Profile",
    waitTime: "8 min",
    status: "Completed",
    satisfactionScore: 5.0,
    feedback: "Thorough explanation of test results.",
    vitals: { bp: "128/82", hr: 72, spo2: 99, temp: "98.6°F" },
  },
  {
    id: "PAT-1083",
    name: "David Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    age: 42,
    gender: "Male",
    time: "09:15 AM",
    type: "New Patient",
    chiefComplaint: "Atypical Chest Pain & Stress Screening",
    waitTime: "11 min",
    status: "Completed",
    satisfactionScore: 5.0,
    feedback: "Doctor put me immediately at ease.",
    vitals: { bp: "134/86", hr: 84, spo2: 98, temp: "98.4°F" },
  },
  {
    id: "PAT-1084",
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    age: 29,
    gender: "Female",
    time: "10:00 AM",
    type: "Routine Checkup",
    chiefComplaint: "Annual Executive Physical & Lab Panel",
    waitTime: "6 min",
    status: "Completed",
    satisfactionScore: 4.8,
    feedback: "Prompt and very professional.",
    vitals: { bp: "116/74", hr: 68, spo2: 100, temp: "98.7°F" },
  },
  {
    id: "PAT-1085",
    name: "Marcus Brody",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    age: 61,
    gender: "Male",
    time: "10:45 AM",
    type: "Urgent Consult",
    chiefComplaint: "Post-Cardiac Stent Follow-up & Dyspnea",
    waitTime: "14 min",
    status: "In Consultation",
    satisfactionScore: null,
    vitals: { bp: "142/90", hr: 91, spo2: 96, temp: "99.1°F" },
  },
  {
    id: "PAT-1086",
    name: "Amina Al-Mansoor",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    age: 38,
    gender: "Female",
    time: "11:30 AM",
    type: "Follow-up",
    chiefComplaint: "Thyroid Profile & Hormone Titration",
    waitTime: "12 min",
    status: "Waiting",
    satisfactionScore: null,
    vitals: { bp: "120/78", hr: 75, spo2: 99, temp: "98.5°F" },
  },
  {
    id: "PAT-1087",
    name: "Liam O'Connor",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    age: 47,
    gender: "Male",
    time: "01:15 PM",
    type: "New Patient",
    chiefComplaint: "Type 2 Diabetes Screening & Neuropathy",
    waitTime: "-",
    status: "Scheduled",
    satisfactionScore: null,
  },
  {
    id: "PAT-1088",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    age: 65,
    gender: "Female",
    time: "02:00 PM",
    type: "Follow-up",
    chiefComplaint: "Anticoagulation Monitoring & INR Check",
    waitTime: "-",
    status: "Scheduled",
    satisfactionScore: null,
  },
  {
    id: "PAT-1089",
    name: "Jonathan Kim",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
    age: 34,
    gender: "Male",
    time: "02:45 PM",
    type: "Routine Checkup",
    chiefComplaint: "Preventive Cardiology & Exercise Tolerance",
    waitTime: "-",
    status: "Scheduled",
    satisfactionScore: null,
  },
];

export const clinicalAlerts: ClinicalAlert[] = [
  {
    id: "ALT-301",
    patientName: "Marcus Brody",
    patientId: "PAT-1085",
    title: "Elevated Troponin-I (0.09 ng/mL) - Cardiology Review",
    type: "critical",
    timestamp: "12m ago",
    actionLabel: "Review Lab Panel",
  },
  {
    id: "ALT-302",
    patientName: "Elena Rostova",
    patientId: "PAT-1088",
    title: "INR Out of Range (3.8) - Warfarin Dosage Adjustment",
    type: "warning",
    timestamp: "35m ago",
    actionLabel: "Adjust Dosage",
  },
  {
    id: "ALT-303",
    patientName: "Eleanor Vance",
    patientId: "PAT-1082",
    title: "Pharmacy Refill Request: Amlodipine 5mg (90 days)",
    type: "info",
    timestamp: "1h ago",
    actionLabel: "Authorize Refill",
  },
];
