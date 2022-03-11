INSERT INTO departments
(dept_name)
VALUES
('Fishing'),
('Camping'),
('Hiking'),
('Clothing');

INSERT INTO roles
(title, salary, department_id)
VALUES
('Chocolate Beer Specialist', 80000.00, 1),
('Shredded Cheese Expert', 120000.00, 2),
('Pork Rind Officianado', 45000.00, 3),
('Sourdough Scientist', 60000.00, 4);

INSERT INTO employees
(first_name, last_name, role_id, manager_id)
VALUES
('Joe', 'King', 2, NULL),
('Ben', 'Dover', 3, 1),
('Holly', 'Wood', 1, NULL),
('Dinah', 'Mite', 4, 3),
('Ima', 'Hogg', 4, 3);
