-- ============================================================================
-- SQL SCRIPT: INSERT 10 STUDENT RECORDS INTO 'students' TABLE
-- Compatible with: PostgreSQL / Supabase
-- Project ID: qbhfwfyrffmrconfvmiz
-- Run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/qbhfwfyrffmrconfvmiz/sql
-- ============================================================================

-- If your table uses an auto-incrementing/IDENTITY ID column:
INSERT INTO students (
    program_id,
    intake_year,
    gender,
    status,
    exit_year,
    years_to_graduate,
    leave_reason,
    cgpa,
    attendance_pct,
    fees_unpaid,
    has_scholarship,
    province
)
VALUES
    -- 1. High-performing active CS student with scholarship
    (
        COALESCE((SELECT id FROM programs WHERE name ILIKE '%Computer Science%' AND level = 'BS' LIMIT 1), 1),
        2022,
        'Female',
        'Active',
        NULL,
        NULL,
        NULL,
        3.88,
        96.5,
        FALSE,
        TRUE,
        'Punjab'
    ),

    -- 2. Active Software Engineering student, self-financed
    (
        COALESCE((SELECT id FROM programs WHERE name ILIKE '%Software Engineering%' LIMIT 1), 2),
        2023,
        'Male',
        'Active',
        NULL,
        NULL,
        NULL,
        3.42,
        89.0,
        FALSE,
        FALSE,
        'Sindh'
    ),

    -- 3. AI student on Dean's Honor Roll
    (
        COALESCE((SELECT id FROM programs WHERE name ILIKE '%Artificial Intelligence%' LIMIT 1), 3),
        2023,
        'Male',
        'Active',
        NULL,
        NULL,
        NULL,
        3.75,
        94.0,
        FALSE,
        TRUE,
        'Islamabad (ICT)'
    ),

    -- 4. BBA active student, high attendance
    (
        COALESCE((SELECT id FROM programs WHERE name ILIKE '%Business%' LIMIT 1), 4),
        2022,
        'Female',
        'Active',
        NULL,
        NULL,
        NULL,
        3.28,
        91.5,
        FALSE,
        FALSE,
        'Punjab'
    ),

    -- 5. Data Science active student with merit scholarship
    (
        COALESCE((SELECT id FROM programs WHERE name ILIKE '%Data Science%' LIMIT 1), 5),
        2024,
        'Female',
        'Active',
        NULL,
        NULL,
        NULL,
        3.65,
        93.0,
        FALSE,
        TRUE,
        'Khyber Pakhtunkhwa (KPK)'
    ),

    -- 6. Early Warning At-Risk Student: Low CGPA & Unpaid Fees
    (
        COALESCE((SELECT id FROM programs WHERE name ILIKE '%Electrical Engineering%' LIMIT 1), 6),
        2022,
        'Male',
        'Active',
        NULL,
        NULL,
        NULL,
        1.94,
        61.5,
        TRUE,
        FALSE,
        'Balochistan'
    ),

    -- 7. At-Risk Student with Low Attendance
    (
        COALESCE((SELECT id FROM programs WHERE name ILIKE '%Computer Science%' AND level = 'BS' LIMIT 1), 1),
        2023,
        'Male',
        'Active',
        NULL,
        NULL,
        NULL,
        2.15,
        58.0,
        TRUE,
        FALSE,
        'Sindh'
    ),

    -- 8. Graduated Honor Student
    (
        COALESCE((SELECT id FROM programs WHERE name ILIKE '%Computer Science%' AND level = 'BS' LIMIT 1), 1),
        2020,
        'Female',
        'Graduated',
        2024,
        4,
        NULL,
        3.82,
        95.0,
        FALSE,
        TRUE,
        'Punjab'
    ),

    -- 9. Dropped Out due to Financial Constraints
    (
        COALESCE((SELECT id FROM programs WHERE name ILIKE '%Business%' LIMIT 1), 4),
        2021,
        'Male',
        'Dropped Out',
        2023,
        2,
        'Financial Constraints',
        2.40,
        70.0,
        TRUE,
        FALSE,
        'Khyber Pakhtunkhwa (KPK)'
    ),

    -- 10. Student On Temporary Leave / Frozen Semester
    (
        COALESCE((SELECT id FROM programs WHERE name ILIKE '%Computer Science%' AND level = 'MS' LIMIT 1), 7),
        2023,
        'Female',
        'On Leave',
        NULL,
        NULL,
        'Relocation & Family Issues',
        3.50,
        84.0,
        FALSE,
        FALSE,
        'Gilgit-Baltistan & AJK'
    );

-- Verify the 10 newly inserted rows
SELECT 
    s.id,
    p.name AS program_name,
    s.intake_year,
    s.gender,
    s.status,
    s.cgpa,
    s.attendance_pct,
    s.fees_unpaid,
    s.has_scholarship,
    s.province,
    s.created_at
FROM students s
LEFT JOIN programs p ON p.id = s.program_id
ORDER BY s.created_at DESC, s.id DESC
LIMIT 10;
