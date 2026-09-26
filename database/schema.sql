CREATE DATABASE IF NOT EXISTS smart_facility;
USE smart_facility;

DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS inspections;
DROP TABLE IF EXISTS facilities;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE facilities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(150) NOT NULL,
    facility_type VARCHAR(80) NOT NULL,
    status ENUM('Active','Maintenance','Inactive') DEFAULT 'Active',
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE inspections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    facility_id INT NOT NULL,
    inspector_id INT,
    inspection_date DATE NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    status ENUM('Passed','Needs Attention','Failed') NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (facility_id) REFERENCES facilities(id) ON DELETE CASCADE,
    FOREIGN KEY (inspector_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE complaints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    facility_id INT NOT NULL,
    reported_by INT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    priority ENUM('Low','Medium','High') DEFAULT 'Medium',
    status ENUM('Open','In Progress','Resolved') DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (facility_id) REFERENCES facilities(id) ON DELETE CASCADE,
    FOREIGN KEY (reported_by) REFERENCES users(id) ON DELETE SET NULL
);

INSERT INTO departments (name) VALUES
('Administration'), ('Information Technology'), ('Maintenance');

INSERT INTO users (name, email, department_id) VALUES
('Admin User', 'admin@example.com', 1),
('IT Inspector', 'inspector@example.com', 2);

INSERT INTO facilities (name, location, facility_type, status, department_id) VALUES
('Main Engineering Building', 'Badnera', 'Academic', 'Active', 2),
('Computer Laboratory', 'Badnera', 'Laboratory', 'Active', 2),
('Library Building', 'Badnera', 'Library', 'Maintenance', 1),
('Sports Complex', 'Badnera', 'Sports', 'Active', 3);

INSERT INTO inspections (facility_id, inspector_id, inspection_date, score, status, notes) VALUES
(1, 2, CURDATE(), 92, 'Passed', 'Building is in good condition'),
(2, 2, CURDATE(), 78, 'Needs Attention', 'Some systems need maintenance');

INSERT INTO complaints (facility_id, reported_by, title, description, priority, status) VALUES
(2, 1, 'AC not working', 'Air conditioner needs service', 'High', 'Open'),
(3, 1, 'Library lighting', 'Two lights are not working', 'Medium', 'In Progress');
