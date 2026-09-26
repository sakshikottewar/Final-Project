-- =========================================================
-- SMART FACILITY MANAGEMENT SYSTEM
-- Complete MySQL Database
-- =========================================================

-- Remove old database
DROP DATABASE IF EXISTS smart_facility;

-- Create database
CREATE DATABASE smart_facility;

-- Select database
USE smart_facility;


-- =========================================================
-- 1. DEPARTMENTS
-- =========================================================

CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);


-- =========================================================
-- 2. USERS
-- =========================================================

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    department_id INT NULL,

    CONSTRAINT fk_users_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);


-- =========================================================
-- 3. FACILITIES
-- =========================================================

CREATE TABLE facilities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(150) NOT NULL,
    facility_type VARCHAR(80) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Active',
    department_id INT NULL,

    CONSTRAINT fk_facilities_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);


-- =========================================================
-- 4. INSPECTIONS
-- =========================================================

CREATE TABLE inspections (
    id INT PRIMARY KEY AUTO_INCREMENT,

    facility_id INT NOT NULL,

    inspector_id INT NULL,

    inspection_date DATE NOT NULL,

    score DECIMAL(5,2) NOT NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'Completed',

    notes TEXT,

    CONSTRAINT chk_inspection_score
        CHECK (score >= 0 AND score <= 100),

    CONSTRAINT fk_inspections_facility
        FOREIGN KEY (facility_id)
        REFERENCES facilities(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_inspections_inspector
        FOREIGN KEY (inspector_id)
        REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);


-- =========================================================
-- 5. COMPLAINTS
-- =========================================================

CREATE TABLE complaints (
    id INT PRIMARY KEY AUTO_INCREMENT,

    facility_id INT NOT NULL,

    reported_by INT NULL,

    title VARCHAR(200) NOT NULL,

    description TEXT,

    priority VARCHAR(20) NOT NULL DEFAULT 'Medium',

    status VARCHAR(30) NOT NULL DEFAULT 'Open',

    CONSTRAINT fk_complaints_facility
        FOREIGN KEY (facility_id)
        REFERENCES facilities(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_complaints_user
        FOREIGN KEY (reported_by)
        REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);


-- =========================================================
-- INSERT DEPARTMENTS
-- =========================================================

INSERT INTO departments (name)
VALUES
('Facility Management'),
('IT Department'),
('Maintenance Department'),
('Administration');


-- =========================================================
-- INSERT USERS / INSPECTORS
-- =========================================================

INSERT INTO users
(name, email, department_id)
VALUES
('Admin User', 'admin@smartfacility.com', 1),

('Inspector One', 'inspector1@smartfacility.com', 1),

('Inspector Two', 'inspector2@smartfacility.com', 3),

('IT Manager', 'itmanager@smartfacility.com', 2),

('Maintenance Officer', 'maintenance@smartfacility.com', 3);


-- =========================================================
-- INSERT FACILITIES
-- =========================================================

INSERT INTO facilities
(name, location, facility_type, status, department_id)
VALUES
(
    'Main Office',
    'Amravati',
    'Office',
    'Active',
    1
),

(
    'College Building',
    'Badnera',
    'Educational',
    'Active',
    1
),

(
    'Computer Laboratory',
    'Amravati',
    'Laboratory',
    'Active',
    2
),

(
    'Maintenance Building',
    'Badnera',
    'Maintenance',
    'Active',
    3
),

(
    'Administrative Block',
    'Amravati',
    'Administration',
    'Active',
    4
);


-- =========================================================
-- INSERT INSPECTIONS
-- =========================================================

INSERT INTO inspections
(
    facility_id,
    inspector_id,
    inspection_date,
    score,
    status,
    notes
)
VALUES
(
    1,
    2,
    '2026-09-20',
    88.00,
    'Completed',
    'Facility is in good condition.'
),

(
    2,
    2,
    '2026-09-21',
    92.00,
    'Completed',
    'All major facilities are working properly.'
),

(
    3,
    3,
    '2026-09-22',
    76.00,
    'Completed',
    'Some computers require maintenance.'
),

(
    4,
    3,
    '2026-09-23',
    84.00,
    'Completed',
    'Maintenance equipment checked.'
);


-- =========================================================
-- INSERT COMPLAINTS
-- =========================================================

INSERT INTO complaints
(
    facility_id,
    reported_by,
    title,
    description,
    priority,
    status
)
VALUES
(
    1,
    1,
    'Water Leakage',
    'Water leakage reported near the first floor.',
    'High',
    'Open'
),

(
    2,
    1,
    'Fan Not Working',
    'Ceiling fan is not working in classroom 204.',
    'Medium',
    'In Progress'
),

(
    3,
    4,
    'Computer Problem',
    'Computer systems are running slowly.',
    'Medium',
    'Open'
),

(
    4,
    5,
    'Equipment Maintenance',
    'Maintenance equipment requires servicing.',
    'Low',
    'Resolved'
);


-- =========================================================
-- VERIFY DATABASE
-- =========================================================

SHOW TABLES;


-- Departments
SELECT * FROM departments;


-- Users
SELECT * FROM users;


-- Facilities
SELECT * FROM facilities;


-- Inspections
SELECT * FROM inspections;


-- Complaints
SELECT * FROM complaints;