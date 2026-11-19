-- ============================================================================
-- CLINICAL INTELLIGENCE: DOCTOR DASHBOARD DATABASE SCHEMA & SAMPLE DATA
-- Compatible with: PostgreSQL, MySQL 8+, SQLite, and SQL Server
-- ============================================================================

-- Drop existing tables in reverse dependency order
DROP TABLE IF EXISTS clinical_alerts;
DROP TABLE IF EXISTS satisfaction_surveys;
DROP TABLE IF EXISTS care_plans;
DROP TABLE IF EXISTS patient_conditions;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS doctors;

-- ============================================================================
-- 1. TABLE DEFINITIONS
-- ============================================================================

-- Doctors / Physicians Table
CREATE TABLE doctors (
    doctor_id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    credentials VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    department VARCHAR(100) NOT NULL,
    clinic_suite VARCHAR(50) NOT NULL,
    hospital VARCHAR(150) NOT NULL,
    shift_start TIME NOT NULL,
    shift_end TIME NOT NULL,
    is_on_duty BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients Table
CREATE TABLE patients (
    patient_id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    avatar_url VARCHAR(500),
    contact_phone VARCHAR(50),
    contact_email VARCHAR(150),
    emergency_contact VARCHAR(150),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments / Consultations Table (Powers "Patients Visited" & Live Triage)
CREATE TABLE appointments (
    appointment_id VARCHAR(50) PRIMARY KEY,
    doctor_id VARCHAR(50) NOT NULL,
    patient_id VARCHAR(50) NOT NULL,
    scheduled_time TIMESTAMP NOT NULL,
    appointment_type VARCHAR(50) NOT NULL, -- 'New Patient', 'Follow-up', 'Routine Checkup', 'Urgent Consult'
    chief_complaint TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,          -- 'Scheduled', 'Waiting', 'In Consultation', 'Completed', 'Cancelled'
    wait_time_minutes INT DEFAULT 0,
    consultation_duration_minutes INT DEFAULT 0,
    bp_reading VARCHAR(20),               -- e.g. '128/82'
    heart_rate_bpm INT,                   -- e.g. 72
    spo2_percentage INT,                  -- e.g. 99
    temp_fahrenheit DECIMAL(4, 1),        -- e.g. 98.6
    doctor_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

-- Patient Satisfaction Surveys Table (Powers "Patients Satisfied" & Dimension Charts)
CREATE TABLE satisfaction_surveys (
    survey_id VARCHAR(50) PRIMARY KEY,
    appointment_id VARCHAR(50) NOT NULL,
    doctor_id VARCHAR(50) NOT NULL,
    patient_id VARCHAR(50) NOT NULL,
    overall_rating DECIMAL(2, 1) NOT NULL, -- 1.0 to 5.0 scale
    is_satisfied BOOLEAN NOT NULL,         -- True if rating >= 4.0
    communication_score INT NOT NULL,      -- 0 to 100
    treatment_clarity_score INT NOT NULL,  -- 0 to 100
    nursing_staff_score INT NOT NULL,      -- 0 to 100
    followup_care_score INT NOT NULL,      -- 0 to 100
    wait_time_score INT NOT NULL,          -- 0 to 100
    feedback_comment TEXT,
    sentiment VARCHAR(20) DEFAULT 'Positive',
    survey_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

-- Clinical Alerts Table (Powers Clinical Priority Action Feed)
CREATE TABLE clinical_alerts (
    alert_id VARCHAR(50) PRIMARY KEY,
    doctor_id VARCHAR(50) NOT NULL,
    patient_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    severity VARCHAR(20) NOT NULL,        -- 'critical', 'warning', 'info'
    action_label VARCHAR(100) NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

-- Clinical Diagnoses / Case Mix Breakdown Table
CREATE TABLE patient_conditions (
    condition_id VARCHAR(50) PRIMARY KEY,
    patient_id VARCHAR(50) NOT NULL,
    doctor_id VARCHAR(50) NOT NULL,
    category_name VARCHAR(100) NOT NULL,  -- 'Cardiovascular & Hypertension', 'Metabolic & Diabetes', etc.
    icd10_code VARCHAR(20),
    diagnosis_name VARCHAR(255) NOT NULL,
    diagnosed_date DATE NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
);

-- Care Plans & Treatment Compliance Table (Powers "Care Plan Adherence" KPI)
CREATE TABLE care_plans (
    plan_id VARCHAR(50) PRIMARY KEY,
    patient_id VARCHAR(50) NOT NULL,
    doctor_id VARCHAR(50) NOT NULL,
    prescription_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    medication_adherent BOOLEAN DEFAULT TRUE,
    followup_scheduled_date DATE,
    followup_attended BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
);

-- Create Indexes for Optimal Query Performance
CREATE INDEX idx_appointments_doctor_date ON appointments(doctor_id, scheduled_time);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_surveys_doctor ON satisfaction_surveys(doctor_id);
CREATE INDEX idx_alerts_unresolved ON clinical_alerts(doctor_id, is_resolved);

-- ============================================================================
-- 2. SAMPLE DATA INSERTION (Matches Dashboard Data)
-- ============================================================================

-- Insert Doctor Profile
INSERT INTO doctors (
    doctor_id, full_name, credentials, title, department, clinic_suite, 
    hospital, shift_start, shift_end, is_on_duty
) VALUES (
    'DOC-BENNETT',
    'Dr. Sarah Bennett',
    'MD, FACP',
    'Lead Consultant Physician & Cardiologist',
    'Department of Internal Medicine',
    'Clinic Suite 402',
    'Metro General Hospital',
    '08:00:00',
    '17:00:00',
    TRUE
);

-- Insert Patients
INSERT INTO patients (patient_id, full_name, age, gender, avatar_url, contact_phone, contact_email) VALUES
('PAT-1082', 'Eleanor Vance', 54, 'Female', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', '+1-555-0101', 'eleanor.v@example.com'),
('PAT-1083', 'David Chen', 42, 'Male', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', '+1-555-0102', 'david.c@example.com'),
('PAT-1084', 'Sarah Jenkins', 29, 'Female', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', '+1-555-0103', 'sarah.j@example.com'),
('PAT-1085', 'Marcus Brody', 61, 'Male', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', '+1-555-0104', 'marcus.b@example.com'),
('PAT-1086', 'Amina Al-Mansoor', 38, 'Female', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2', '+1-555-0105', 'amina.m@example.com'),
('PAT-1087', 'Liam O''Connor', 47, 'Male', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61', '+1-555-0106', 'liam.o@example.com'),
('PAT-1088', 'Elena Rostova', 65, 'Female', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', '+1-555-0107', 'elena.r@example.com'),
('PAT-1089', 'Jonathan Kim', 34, 'Male', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6', '+1-555-0108', 'jonathan.k@example.com');

-- Insert Today's Appointments (Consultation Schedule & Triage Queue)
INSERT INTO appointments (
    appointment_id, doctor_id, patient_id, scheduled_time, appointment_type, 
    chief_complaint, status, wait_time_minutes, consultation_duration_minutes, 
    bp_reading, heart_rate_bpm, spo2_percentage, temp_fahrenheit
) VALUES
('APP-2001', 'DOC-BENNETT', 'PAT-1082', '2026-11-19 08:30:00', 'Follow-up', 'Hypertension Review & Lipid Profile', 'Completed', 8, 18, '128/82', 72, 99, 98.6),
('APP-2002', 'DOC-BENNETT', 'PAT-1083', '2026-11-19 09:15:00', 'New Patient', 'Atypical Chest Pain & Stress Screening', 'Completed', 11, 24, '134/86', 84, 98, 98.4),
('APP-2003', 'DOC-BENNETT', 'PAT-1084', '2026-11-19 10:00:00', 'Routine Checkup', 'Annual Executive Physical & Lab Panel', 'Completed', 6, 15, '116/74', 68, 100, 98.7),
('APP-2004', 'DOC-BENNETT', 'PAT-1085', '2026-11-19 10:45:00', 'Urgent Consult', 'Post-Cardiac Stent Follow-up & Dyspnea', 'In Consultation', 14, 20, '142/90', 91, 96, 99.1),
('APP-2005', 'DOC-BENNETT', 'PAT-1086', '2026-11-19 11:30:00', 'Follow-up', 'Thyroid Profile & Hormone Titration', 'Waiting', 12, 0, '120/78', 75, 99, 98.5),
('APP-2006', 'DOC-BENNETT', 'PAT-1087', '2026-11-19 13:15:00', 'New Patient', 'Type 2 Diabetes Screening & Neuropathy', 'Scheduled', 0, 0, NULL, NULL, NULL, NULL),
('APP-2007', 'DOC-BENNETT', 'PAT-1088', '2026-11-19 14:00:00', 'Follow-up', 'Anticoagulation Monitoring & INR Check', 'Scheduled', 0, 0, NULL, NULL, NULL, NULL),
('APP-2008', 'DOC-BENNETT', 'PAT-1089', '2026-11-19 14:45:00', 'Routine Checkup', 'Preventive Cardiology & Exercise Tolerance', 'Scheduled', 0, 0, NULL, NULL, NULL, NULL);

-- Insert Satisfaction Surveys (Evaluates Care Dimensions & Feedback)
INSERT INTO satisfaction_surveys (
    survey_id, appointment_id, doctor_id, patient_id, overall_rating, is_satisfied,
    communication_score, treatment_clarity_score, nursing_staff_score, 
    followup_care_score, wait_time_score, feedback_comment, sentiment
) VALUES
('SRV-901', 'APP-2001', 'DOC-BENNETT', 'PAT-1082', 5.0, TRUE, 98, 97, 95, 94, 92, 'Dr. Bennett thoroughly explained my ECG test results and adjusted my blood pressure medication with great care.', 'Positive'),
('SRV-902', 'APP-2002', 'DOC-BENNETT', 'PAT-1083', 5.0, TRUE, 100, 96, 96, 92, 90, 'Minimal waiting time and exceptionally attentive consultation. Felt very reassured regarding my chest tightness symptoms.', 'Positive'),
('SRV-903', 'APP-2003', 'DOC-BENNETT', 'PAT-1084', 4.8, TRUE, 96, 95, 94, 90, 86, 'Very detailed care plan. The electronic prescription was delivered directly to my pharmacy within minutes.', 'Positive');

-- Insert Clinical Priority Action Alerts
INSERT INTO clinical_alerts (alert_id, doctor_id, patient_id, title, severity, action_label, is_resolved) VALUES
('ALT-301', 'DOC-BENNETT', 'PAT-1085', 'Elevated Troponin-I (0.09 ng/mL) - Cardiology Review', 'critical', 'Review Lab Panel', FALSE),
('ALT-302', 'DOC-BENNETT', 'PAT-1088', 'INR Out of Range (3.8) - Warfarin Dosage Adjustment', 'warning', 'Adjust Dosage', FALSE),
('ALT-303', 'DOC-BENNETT', 'PAT-1082', 'Pharmacy Refill Request: Amlodipine 5mg (90 days)', 'info', 'Authorize Refill', FALSE);

-- Insert Patient Diagnostic Case Mix Conditions
INSERT INTO patient_conditions (condition_id, patient_id, doctor_id, category_name, icd10_code, diagnosis_name, diagnosed_date) VALUES
('CND-501', 'PAT-1082', 'DOC-BENNETT', 'Cardiovascular & Hypertension', 'I10', 'Essential Primary Hypertension', '2026-01-10'),
('CND-502', 'PAT-1085', 'DOC-BENNETT', 'Cardiovascular & Hypertension', 'I25.1', 'Atherosclerotic Heart Disease', '2026-02-15'),
('CND-503', 'PAT-1087', 'DOC-BENNETT', 'Metabolic & Diabetes Management', 'E11.9', 'Type 2 Diabetes Mellitus', '2026-03-20'),
('CND-504', 'PAT-1084', 'DOC-BENNETT', 'Preventive & Routine Checkups', 'Z00.0', 'General Adult Medical Examination', '2026-04-05'),
('CND-505', 'PAT-1086', 'DOC-BENNETT', 'Endocrinology & Thyroid', 'E03.9', 'Hypothyroidism', '2026-05-12');

-- Insert Care Plan Follow-up Adherence Records
INSERT INTO care_plans (plan_id, patient_id, doctor_id, prescription_name, dosage, medication_adherent, followup_scheduled_date, followup_attended) VALUES
('CP-101', 'PAT-1082', 'DOC-BENNETT', 'Amlodipine Besylate', '5mg once daily', TRUE, '2026-11-19', TRUE),
('CP-102', 'PAT-1083', 'DOC-BENNETT', 'Metoprolol Tartrate', '25mg twice daily', TRUE, '2026-11-26', TRUE),
('CP-103', 'PAT-1084', 'DOC-BENNETT', 'Multivitamin & Vitamin D3', '2000 IU daily', TRUE, '2026-12-15', TRUE),
('CP-104', 'PAT-1085', 'DOC-BENNETT', 'Atorvastatin & Clopidogrel', '80mg / 75mg daily', TRUE, '2026-11-19', TRUE),
('CP-105', 'PAT-1086', 'DOC-BENNETT', 'Levothyroxine', '50mcg once daily', FALSE, '2026-11-19', TRUE);

-- ============================================================================
-- 3. ANALYTICAL QUERIES (Exact SQL Powering Dashboard KPIs & Bar Charts)
-- ============================================================================

-- Query 1: Total Patients Visited This Month & Scheduled Today (KPI 1)
SELECT 
    COUNT(*) AS total_patients_visited_month,
    SUM(CASE WHEN DATE(scheduled_time) = CURRENT_DATE THEN 1 ELSE 0 END) AS scheduled_today,
    SUM(CASE WHEN DATE(scheduled_time) = CURRENT_DATE AND status = 'Completed' THEN 1 ELSE 0 END) AS completed_today
FROM appointments
WHERE doctor_id = 'DOC-BENNETT'
  AND status = 'Completed';

-- Query 2: Patient Satisfaction Rate (CSAT %) & Average Star Rating (KPI 2)
SELECT 
    COUNT(*) AS total_reviews,
    ROUND(AVG(overall_rating), 1) AS average_star_rating,
    ROUND((SUM(CASE WHEN is_satisfied THEN 1 ELSE 0 END) * 100.0) / COUNT(*), 1) AS csat_satisfaction_percentage
FROM satisfaction_surveys
WHERE doctor_id = 'DOC-BENNETT';

-- Query 3: Average Patient Wait Time (KPI 3)
SELECT 
    ROUND(AVG(wait_time_minutes), 1) AS avg_patient_wait_time_mins,
    ROUND(AVG(consultation_duration_minutes), 1) AS avg_consultation_duration_mins
FROM appointments
WHERE doctor_id = 'DOC-BENNETT' 
  AND status = 'Completed';

-- Query 4: Care Plan Adherence Percentage (KPI 4)
SELECT 
    ROUND((SUM(CASE WHEN medication_adherent = TRUE THEN 1 ELSE 0 END) * 100.0) / COUNT(*), 1) AS medication_adherence_rate,
    ROUND((SUM(CASE WHEN followup_attended = TRUE THEN 1 ELSE 0 END) * 100.0) / COUNT(*), 1) AS followup_adherence_rate
FROM care_plans
WHERE doctor_id = 'DOC-BENNETT';

-- Query 5: Visits Bar Chart Data (Weekly Breakdown: New vs. Returning Patients)
SELECT 
    CASE 
        WHEN EXTRACT(DOW FROM scheduled_time) = 1 THEN 'Mon'
        WHEN EXTRACT(DOW FROM scheduled_time) = 2 THEN 'Tue'
        WHEN EXTRACT(DOW FROM scheduled_time) = 3 THEN 'Wed'
        WHEN EXTRACT(DOW FROM scheduled_time) = 4 THEN 'Thu'
        WHEN EXTRACT(DOW FROM scheduled_time) = 5 THEN 'Fri'
        WHEN EXTRACT(DOW FROM scheduled_time) = 6 THEN 'Sat'
        ELSE 'Sun'
    END AS day_of_week,
    SUM(CASE WHEN appointment_type = 'New Patient' THEN 1 ELSE 0 END) AS new_patients,
    SUM(CASE WHEN appointment_type <> 'New Patient' THEN 1 ELSE 0 END) AS returning_patients,
    COUNT(*) AS total_visits
FROM appointments
WHERE doctor_id = 'DOC-BENNETT'
GROUP BY EXTRACT(DOW FROM scheduled_time)
ORDER BY EXTRACT(DOW FROM scheduled_time);

-- Query 6: Patient Satisfaction By Clinical Dimension (Horizontal Bar Chart)
SELECT 
    'Doctor Communication & Empathy' AS dimension, ROUND(AVG(communication_score), 0) AS score FROM satisfaction_surveys WHERE doctor_id = 'DOC-BENNETT'
UNION ALL
SELECT 
    'Diagnosis & Treatment Clarity', ROUND(AVG(treatment_clarity_score), 0) FROM satisfaction_surveys WHERE doctor_id = 'DOC-BENNETT'
UNION ALL
SELECT 
    'Staff & Nursing Care', ROUND(AVG(nursing_staff_score), 0) FROM satisfaction_surveys WHERE doctor_id = 'DOC-BENNETT'
UNION ALL
SELECT 
    'Post-Consultation Follow-Up', ROUND(AVG(followup_care_score), 0) FROM satisfaction_surveys WHERE doctor_id = 'DOC-BENNETT'
UNION ALL
SELECT 
    'Wait Time & Scheduling', ROUND(AVG(wait_time_score), 0) FROM satisfaction_surveys WHERE doctor_id = 'DOC-BENNETT';

-- Query 7: Today's Consultation Queue & Triage Table
SELECT 
    a.appointment_id,
    p.full_name AS patient_name,
    p.age,
    p.gender,
    TIME(a.scheduled_time) AS appointment_time,
    a.appointment_type,
    a.chief_complaint,
    a.wait_time_minutes,
    a.status,
    s.overall_rating AS satisfaction_score
FROM appointments a
JOIN patients p ON a.patient_id = p.patient_id
LEFT JOIN satisfaction_surveys s ON a.appointment_id = s.appointment_id
WHERE a.doctor_id = 'DOC-BENNETT'
  AND DATE(a.scheduled_time) = CURRENT_DATE
ORDER BY a.scheduled_time ASC;
