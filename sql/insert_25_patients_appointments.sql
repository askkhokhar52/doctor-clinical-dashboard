-- ============================================================================
-- SQL SCRIPT: INSERT 25 CLINICAL RECORDS (PATIENTS, APPOINTMENTS & SURVEYS)
-- Target Doctor: Dr. Sarah Bennett ('DOC-BENNETT')
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. INSERT 25 NEW PATIENTS (PAT-1090 to PAT-1114)
-- ----------------------------------------------------------------------------
INSERT INTO patients (patient_id, full_name, age, gender, contact_phone, contact_email) VALUES
('PAT-1090', 'Robert Sterling', 63, 'Male', '+1-555-0201', 'r.sterling@example.com'),
('PAT-1091', 'Maria Garcia', 51, 'Female', '+1-555-0202', 'm.garcia@example.com'),
('PAT-1092', 'James Washington', 72, 'Male', '+1-555-0203', 'j.washington@example.com'),
('PAT-1093', 'Chloe Dubois', 34, 'Female', '+1-555-0204', 'c.dubois@example.com'),
('PAT-1094', 'William Miller', 45, 'Male', '+1-555-0205', 'w.miller@example.com'),
('PAT-1095', 'Sunita Sharma', 58, 'Female', '+1-555-0206', 's.sharma@example.com'),
('PAT-1096', 'Lucas Meyer', 29, 'Male', '+1-555-0207', 'l.meyer@example.com'),
('PAT-1097', 'Patricia Hayes', 67, 'Female', '+1-555-0208', 'p.hayes@example.com'),
('PAT-1098', 'Tariq Mansoor', 48, 'Male', '+1-555-0209', 't.mansoor@example.com'),
('PAT-1099', 'Grace Kim', 39, 'Female', '+1-555-0210', 'g.kim@example.com'),
('PAT-1100', 'Arthur Pendelton', 76, 'Male', '+1-555-0211', 'a.pendelton@example.com'),
('PAT-1101', 'Hannah Schmidt', 31, 'Female', '+1-555-0212', 'h.schmidt@example.com'),
('PAT-1102', 'Victor Santos', 55, 'Male', '+1-555-0213', 'v.santos@example.com'),
('PAT-1103', 'Zoe Petrov', 43, 'Female', '+1-555-0214', 'z.petrov@example.com'),
('PAT-1104', 'Derek O''Reilly', 60, 'Male', '+1-555-0215', 'd.oreilly@example.com'),
('PAT-1105', 'Fiona Gallagher', 49, 'Female', '+1-555-0216', 'f.gallagher@example.com'),
('PAT-1106', 'Kwame Nkrumah', 52, 'Male', '+1-555-0217', 'k.nkrumah@example.com'),
('PAT-1107', 'Rachel Adams', 26, 'Female', '+1-555-0218', 'r.adams@example.com'),
('PAT-1108', 'George Harrison', 68, 'Male', '+1-555-0219', 'g.harrison@example.com'),
('PAT-1109', 'Layla Al-Khatib', 41, 'Female', '+1-555-0220', 'l.alkhatib@example.com'),
('PAT-1110', 'Dmitri Volkov', 59, 'Male', '+1-555-0221', 'd.volkov@example.com'),
('PAT-1111', 'Simone Laurent', 37, 'Female', '+1-555-0222', 's.laurent@example.com'),
('PAT-1112', 'Brian Thorne', 64, 'Male', '+1-555-0223', 'b.thorne@example.com'),
('PAT-1113', 'Ananya Patel', 33, 'Female', '+1-555-0224', 'a.patel@example.com'),
('PAT-1114', 'Charles Montgomery', 70, 'Male', '+1-555-0225', 'c.montgomery@example.com');

-- ----------------------------------------------------------------------------
-- 2. INSERT 25 APPOINTMENTS / CONSULTATION VISITS (APP-2010 to APP-2034)
-- ----------------------------------------------------------------------------
INSERT INTO appointments (
    appointment_id, doctor_id, patient_id, scheduled_time, appointment_type, 
    chief_complaint, status, wait_time_minutes, consultation_duration_minutes, 
    bp_reading, heart_rate_bpm, spo2_percentage, temp_fahrenheit, doctor_notes
) VALUES
('APP-2010', 'DOC-BENNETT', 'PAT-1090', '2026-11-18 08:30:00', 'Follow-up', 'Coronary Artery Disease & Stent Follow-up', 'Completed', 10, 22, '132/84', 70, 98, 98.6, 'Stent patent. Continue dual antiplatelet therapy.'),
('APP-2011', 'DOC-BENNETT', 'PAT-1091', '2026-11-18 09:15:00', 'New Patient', 'Exertional Dyspnea & Intermittent Palpitations', 'Completed', 14, 25, '126/80', 88, 99, 98.4, 'Holter monitor prescribed for 48 hours.'),
('APP-2012', 'DOC-BENNETT', 'PAT-1092', '2026-11-18 10:00:00', 'Urgent Consult', 'Congestive Heart Failure Mild Exacerbation', 'Completed', 8, 28, '146/92', 78, 95, 98.7, 'Adjusted diuretic dosage. Echocardiogram scheduled.'),
('APP-2013', 'DOC-BENNETT', 'PAT-1093', '2026-11-18 10:45:00', 'Routine Checkup', 'Annual Preventive Cardiovascular Checkup', 'Completed', 7, 18, '114/72', 64, 100, 98.5, 'Normal baseline ECG. Excellent lipid profile.'),
('APP-2014', 'DOC-BENNETT', 'PAT-1094', '2026-11-18 11:30:00', 'Follow-up', 'Hypertension Stage 2 Medication Review', 'Completed', 12, 16, '138/88', 76, 98, 98.6, 'Added low-dose ACE inhibitor.'),
('APP-2015', 'DOC-BENNETT', 'PAT-1095', '2026-11-18 13:15:00', 'New Patient', 'Type 2 Diabetes with Neuropathy Consultation', 'Completed', 15, 24, '130/82', 74, 98, 98.3, 'HbA1c target set to < 7.0%. Dietitian referral.'),
('APP-2016', 'DOC-BENNETT', 'PAT-1096', '2026-11-18 14:00:00', 'Routine Checkup', 'Pre-Marathon Sports Cardiology Clearance', 'Completed', 9, 20, '118/74', 58, 100, 98.5, 'Athletic heart syndrome noted. Fully cleared for competition.'),
('APP-2017', 'DOC-BENNETT', 'PAT-1097', '2026-11-18 14:45:00', 'Follow-up', 'Atrial Fibrillation Rate Control Monitoring', 'Completed', 11, 19, '124/78', 72, 97, 98.4, 'Stable on beta-blockers and DOAC therapy.'),
('APP-2018', 'DOC-BENNETT', 'PAT-1098', '2026-11-18 15:30:00', 'Follow-up', 'Hyperlipidemia & Statin Tolerance Check', 'Completed', 6, 14, '122/76', 68, 99, 98.6, 'LDL reduced by 42%. No muscular aches reported.'),
('APP-2019', 'DOC-BENNETT', 'PAT-1099', '2026-11-18 16:15:00', 'Urgent Consult', 'Atypical Chest Tightness with Anxiety', 'Completed', 13, 26, '136/86', 96, 99, 98.8, 'Cardiac enzymes negative. Troponin levels normal.'),
('APP-2020', 'DOC-BENNETT', 'PAT-1100', '2026-11-19 08:30:00', 'Follow-up', 'Severe Aortic Stenosis Pre-TAVR Evaluation', 'Completed', 10, 30, '140/85', 66, 96, 98.7, 'Valve area 0.8 cm2. Multidisciplinary heart team meeting set.'),
('APP-2021', 'DOC-BENNETT', 'PAT-1101', '2026-11-19 09:15:00', 'New Patient', 'Post-COVID Dysautonomia and Tachycardia', 'Completed', 12, 22, '110/70', 102, 99, 98.5, 'Tilt table test ordered. Hydration protocol initiated.'),
('APP-2022', 'DOC-BENNETT', 'PAT-1102', '2026-11-19 10:00:00', 'Follow-up', 'Post-Myocardial Infarction 6-Month Review', 'Completed', 14, 25, '125/80', 65, 98, 98.6, 'Ejection fraction improved to 50%. Cardiac rehab completed.'),
('APP-2023', 'DOC-BENNETT', 'PAT-1103', '2026-11-19 10:45:00', 'Routine Checkup', 'Executive Cardiovascular Risk Stratification', 'Completed', 8, 18, '120/78', 72, 100, 98.4, 'CAC score 0. Low 10-year ASCVD risk (1.8%).'),
('APP-2024', 'DOC-BENNETT', 'PAT-1104', '2026-11-19 11:30:00', 'Follow-up', 'Peripheral Arterial Disease & Claudication', 'Completed', 16, 20, '144/88', 80, 97, 98.6, 'ABI index 0.72. Supervised walking therapy prescribed.'),
('APP-2025', 'DOC-BENNETT', 'PAT-1105', '2026-11-19 13:15:00', 'New Patient', 'Refractory Hypertension Evaluation', 'Completed', 15, 25, '158/98', 84, 98, 98.5, 'Screening for secondary hypertension & renal artery stenosis.'),
('APP-2026', 'DOC-BENNETT', 'PAT-1106', '2026-11-19 14:00:00', 'Follow-up', 'Non-Ischemic Dilated Cardiomyopathy', 'Completed', 11, 22, '118/76', 64, 98, 98.6, 'Volume status optimal. Serum potassium 4.4 mEq/L.'),
('APP-2027', 'DOC-BENNETT', 'PAT-1107', '2026-11-19 14:45:00', 'Routine Checkup', 'Family History of Early Myocardial Infarction', 'Completed', 7, 16, '112/70', 68, 100, 98.4, 'Lipoprotein(a) and ApoB testing ordered.'),
('APP-2028', 'DOC-BENNETT', 'PAT-1108', '2026-11-19 15:30:00', 'Urgent Consult', 'Post-Pacemaker Implantation Site Pain', 'Completed', 10, 20, '128/80', 60, 98, 98.9, 'No hematoma or signs of infection. Device interrogation normal.'),
('APP-2029', 'DOC-BENNETT', 'PAT-1109', '2026-11-19 16:15:00', 'New Patient', 'Recurrent Syncope & Lightheadedness', 'Completed', 13, 26, '116/72', 74, 99, 98.5, 'Suspected vasovagal syncope. Orthostatic vitals checked.'),
('APP-2030', 'DOC-BENNETT', 'PAT-1110', '2026-11-20 08:30:00', 'Follow-up', 'Obstructive Sleep Apnea Related Hypertension', 'In Consultation', 9, 15, '136/86', 78, 97, 98.6, 'CPAP adherence 85%. Daytime somnolence resolving.'),
('APP-2031', 'DOC-BENNETT', 'PAT-1111', '2026-11-20 09:15:00', 'Follow-up', 'Gestational Hypertension Post-Partum Review', 'Waiting', 8, 0, '124/82', 76, 99, 98.4, 'Vitals recorded by triage nurse.'),
('APP-2032', 'DOC-BENNETT', 'PAT-1112', '2026-11-20 10:00:00', 'New Patient', 'Chronic Angina Pectoris Evaluation', 'Scheduled', 0, 0, NULL, NULL, NULL, NULL, 'Upcoming scheduled consultation.'),
('APP-2033', 'DOC-BENNETT', 'PAT-1113', '2026-11-20 10:45:00', 'Routine Checkup', 'Cardiac Risk Assessment and Stress ECG', 'Scheduled', 0, 0, NULL, NULL, NULL, NULL, 'Upcoming scheduled consultation.'),
('APP-2034', 'DOC-BENNETT', 'PAT-1114', '2026-11-20 11:30:00', 'Urgent Consult', 'Sudden Ankle Edema and Shortness of Breath', 'Scheduled', 0, 0, NULL, NULL, NULL, NULL, 'Urgent same-day booking.');

-- ----------------------------------------------------------------------------
-- 3. INSERT SATISFACTION SURVEYS FOR COMPLETED VISITS
-- ----------------------------------------------------------------------------
INSERT INTO satisfaction_surveys (
    survey_id, appointment_id, doctor_id, patient_id, overall_rating, is_satisfied,
    communication_score, treatment_clarity_score, nursing_staff_score, 
    followup_care_score, wait_time_score, feedback_comment, sentiment
) VALUES
('SRV-910', 'APP-2010', 'DOC-BENNETT', 'PAT-1090', 5.0, TRUE, 99, 98, 96, 95, 90, 'Dr. Bennett took the time to review every millimeter of my stent angiogram. Remarkable physician.', 'Positive'),
('SRV-911', 'APP-2011', 'DOC-BENNETT', 'PAT-1091', 4.9, TRUE, 97, 96, 94, 91, 88, 'Prompt attention and felt very heard regarding my palpitations.', 'Positive'),
('SRV-912', 'APP-2012', 'DOC-BENNETT', 'PAT-1092', 4.8, TRUE, 95, 94, 95, 93, 89, 'Fast management of my fluid overload. Breathing is much better today.', 'Positive'),
('SRV-913', 'APP-2013', 'DOC-BENNETT', 'PAT-1093', 5.0, TRUE, 100, 99, 98, 95, 96, 'Hardly waited 5 minutes. The clinic runs like clockwork.', 'Positive'),
('SRV-914', 'APP-2014', 'DOC-BENNETT', 'PAT-1094', 4.7, TRUE, 94, 92, 91, 89, 87, 'Clear titration schedule for my blood pressure pills.', 'Positive'),
('SRV-915', 'APP-2015', 'DOC-BENNETT', 'PAT-1095', 4.8, TRUE, 96, 95, 92, 90, 85, 'Extremely knowledgeable regarding both heart health and diabetic management.', 'Positive'),
('SRV-916', 'APP-2016', 'DOC-BENNETT', 'PAT-1096', 5.0, TRUE, 98, 98, 96, 95, 93, 'Thorough sports cardiology assessment. Reassuring and motivating.', 'Positive'),
('SRV-917', 'APP-2017', 'DOC-BENNETT', 'PAT-1097', 4.9, TRUE, 98, 97, 95, 94, 91, 'Kept my AFib perfectly in rhythm. Highly recommended cardiologist.', 'Positive'),
('SRV-918', 'APP-2018', 'DOC-BENNETT', 'PAT-1098', 5.0, TRUE, 99, 98, 96, 96, 94, 'Great bedside manner and very practical advice.', 'Positive'),
('SRV-919', 'APP-2019', 'DOC-BENNETT', 'PAT-1099', 4.8, TRUE, 97, 95, 94, 91, 89, 'Relieved my immense anxiety by thoroughly ruling out acute cardiac issues.', 'Positive');

-- ----------------------------------------------------------------------------
-- 4. INSERT CORRESPONDING CARE PLANS & ADHERENCE
-- ----------------------------------------------------------------------------
INSERT INTO care_plans (plan_id, patient_id, doctor_id, prescription_name, dosage, medication_adherent, followup_scheduled_date, followup_attended) VALUES
('CP-110', 'PAT-1090', 'DOC-BENNETT', 'Aspirin & Ticagrelor', '81mg / 90mg BID', TRUE, '2026-12-18', TRUE),
('CP-111', 'PAT-1091', 'DOC-BENNETT', 'Bisoprolol Fumarate', '2.5mg daily', TRUE, '2026-12-02', TRUE),
('CP-112', 'PAT-1092', 'DOC-BENNETT', 'Furosemide & Spironolactone', '40mg / 25mg daily', TRUE, '2026-11-25', TRUE),
('CP-113', 'PAT-1093', 'DOC-BENNETT', 'Omega-3 Fatty Acids', '1000mg daily', TRUE, '2027-11-18', TRUE),
('CP-114', 'PAT-1094', 'DOC-BENNETT', 'Lisinopril & Hydrochlorothiazide', '20mg / 12.5mg daily', TRUE, '2026-12-16', TRUE),
('CP-115', 'PAT-1095', 'DOC-BENNETT', 'Empagliflozin & Metformin', '10mg / 1000mg daily', TRUE, '2026-12-20', TRUE),
('CP-116', 'PAT-1096', 'DOC-BENNETT', 'Electrolyte Rehydration Protocol', 'As directed during training', TRUE, '2027-05-18', TRUE),
('CP-117', 'PAT-1097', 'DOC-BENNETT', 'Apixaban (Eliquis)', '5mg BID', TRUE, '2026-12-22', TRUE),
('CP-118', 'PAT-1098', 'DOC-BENNETT', 'Rosuvastatin & Ezetimibe', '20mg / 10mg daily', TRUE, '2027-02-18', TRUE),
('CP-119', 'PAT-1099', 'DOC-BENNETT', 'Propranolol PRN', '10mg as needed for palpitations', TRUE, '2026-12-10', TRUE);

-- ============================================================================
-- VERIFICATION QUERY: Verify 25 New Appointments Added
-- ============================================================================
SELECT 
    COUNT(*) AS total_new_appointments_added,
    MIN(scheduled_time) AS earliest_visit,
    MAX(scheduled_time) AS latest_visit,
    ROUND(AVG(wait_time_minutes), 1) AS avg_wait_time_added
FROM appointments
WHERE appointment_id BETWEEN 'APP-2010' AND 'APP-2034';
