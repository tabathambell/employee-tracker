INSERT INTO company.department(name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO company.role(title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 1250000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO company.employee(first_name, last_name, role_id, manager_id)
VALUES
('Ashley', 'Rodriguez', 3, NULL),
('Malia', 'Brown', 5, NULL),
('Sarah', 'Lourd', 6, NULL),
('Kevin', 'Tupik', 4, 3),
('Christian', 'Eckenrode', 3, 2),
('John', 'Doe', 1, 3),
('Mike', 'Chan', 2, 1),
('Tom', 'Allen', 7, 7);