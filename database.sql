-- ========================================================
-- Database Creation Script for Online Learning Platform (LMS)
-- Database: online_learning_platform
-- ========================================================

CREATE DATABASE IF NOT EXISTS online_learning_platform;
USE online_learning_platform;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS quiz_results;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS lesson_progress;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'STUDENT') NOT NULL DEFAULT 'STUDENT'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Courses Table
CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor VARCHAR(255),
    duration VARCHAR(100),
    image_url VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Enrollments Table
CREATE TABLE enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    enrollment_date DATE NOT NULL,
    progress INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_enrollments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_enrollments_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_course (user_id, course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Lessons Table
CREATE TABLE lessons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    lesson_order INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_lessons_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Lesson Progress Table
CREATE TABLE lesson_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    lesson_id BIGINT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_lesson_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_lesson_progress_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_lesson (user_id, lesson_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Quizzes Table
CREATE TABLE quizzes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    CONSTRAINT fk_quizzes_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Questions Table
CREATE TABLE questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quiz_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_answer VARCHAR(10) NOT NULL,
    CONSTRAINT fk_questions_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Quiz Results Table
CREATE TABLE quiz_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    quiz_id BIGINT NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    attempt_date DATETIME NOT NULL,
    CONSTRAINT fk_quiz_results_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_quiz_results_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- SAMPLE DATA INSERTION
-- admin123 -> $2a$10$7R86q7o6U1UsmbFz9hVvQex69WnZJv8iZl2MskqX4YIu67HjKkZq2
-- student123 -> $2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW
-- ========================================================

INSERT INTO users (id, name, email, password, role) VALUES
(1, 'Admin User', 'admin@lms.com', '$2a$10$7R86q7o6U1UsmbFz9hVvQex69WnZJv8iZl2MskqX4YIu67HjKkZq2', 'ADMIN'),
(2, 'Alice Johnson', 'alice@student.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'STUDENT'),
(3, 'Bob Smith', 'bob@student.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'STUDENT'),
(4, 'Carol Williams', 'carol@student.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'STUDENT'),
(5, 'David Brown', 'david@student.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'STUDENT'),
(6, 'Emma Davis', 'emma@student.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'STUDENT');

INSERT INTO courses (id, title, description, instructor, duration, image_url) VALUES
(1, 'Introduction to Java Programming', 'Learn Java from scratch. Covers variables, control structures, Object-Oriented Programming (OOP), exception handling, and collections. Perfect foundation for enterprise development.', 'Dr. James Wilson', '8 weeks', 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500'),
(2, 'Web Development with React', 'Master modern frontend development using React JS. Build single-page applications with Hooks, React Router DOM, state management, and seamless REST API integration.', 'Prof. Sarah Chen', '10 weeks', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500'),
(3, 'Database Management with MySQL', 'Gain deep knowledge in relational database design, normalization, complex SQL queries, stored procedures, transactions, indexing, and performance tuning.', 'Dr. Michael Brown', '6 weeks', 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500'),
(4, 'Python for Data Science', 'Explore data analysis, data manipulation with Pandas, scientific computing with NumPy, visualization with Matplotlib, and practical machine learning fundamentals.', 'Prof. Emily Davis', '12 weeks', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500'),
(5, 'Mobile App Development with Flutter', 'Build natively compiled, beautiful cross-platform applications for Android and iOS from a single codebase using Google Flutter framework and Dart language.', 'Dr. Robert Kim', '9 weeks', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500'),
(6, 'Cloud Computing with AWS', 'Understand cloud computing fundamentals, compute services (EC2), storage (S3), relational databases (RDS), serverless Lambda, IAM security, and cloud architecture.', 'Prof. Lisa Zhang', '8 weeks', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500');

INSERT INTO lessons (course_id, title, content, lesson_order) VALUES
(1, 'Course Introduction & Java Environment Setup', 'Welcome to Java Programming! In this lesson, we will install the Java Development Kit (JDK 17) and configure your IDE (IntelliJ or VS Code). You will write, compile, and run your first "Hello World" Java program.', 1),
(1, 'Java Syntax, Data Types & Operators', 'Explore the fundamental syntax of Java. Learn about primitive data types (int, double, boolean, char), reference types, arithmetic and relational operators, and variable declaration rules.', 2),
(1, 'Object-Oriented Programming (OOP) Principles', 'Dive into OOP principles: Encapsulation, Inheritance, Polymorphism, and Abstraction. Learn how to define classes, instantiate objects, write constructors, and use access modifiers.', 3),
(1, 'Exception Handling & Collections Framework', 'Learn robust error handling using try-catch-finally blocks and custom exceptions. Discover the Java Collections Framework including List, Set, and Map interfaces.', 4),

(2, 'Introduction to React & Project Setup', 'Understand what React is and why component-based architecture revolutionizes UI engineering. Learn how to scaffold modern React applications with Vite and create your first component.', 1),
(2, 'JSX, Props, and Component State', 'Learn how JSX combines HTML structure with JavaScript logic. Master passing data using props and handling component dynamic state using the useState hook.', 2),
(2, 'Side Effects & API Integration with Axios', 'Manage component lifecycle and side effects using useEffect. Learn how to consume backend REST APIs using Axios, handle async responses, loading states, and error messages.', 3),
(2, 'Routing & Single Page Applications with React Router', 'Implement multi-page navigation without page reloads using React Router DOM. Configure route parameters, navigate programmatically, and build protected routes for authorized users.', 4),

(3, 'Relational Database Concepts & Schema Design', 'Introduction to relational databases, tables, primary keys, and foreign key relationships. Learn database normalization from 1NF to 3NF to avoid data redundancy.', 1),
(3, 'SQL DDL & DML Commands', 'Practice creating, altering, and dropping tables with DDL. Perform CRUD operations with SELECT, INSERT, UPDATE, and DELETE statements with WHERE conditions.', 2),
(3, 'Advanced SQL Queries, Joins & Aggregations', 'Master INNER JOIN, LEFT JOIN, and RIGHT JOIN across relational entities. Use GROUP BY, HAVING, COUNT, SUM, AVG, and subqueries to extract rich reporting data.', 3),

(4, 'Python Essentials for Data Analysis', 'Quick review of Python lists, dictionaries, list comprehensions, lambda functions, and file I/O essential for data manipulation pipelines.', 1),
(4, 'Numerical Computing with NumPy & Pandas DataFrames', 'Work with multidimensional NumPy arrays and Pandas DataFrames. Learn filtering, indexing, grouping, and transforming real-world tabular datasets.', 2),
(4, 'Data Visualization & Exploratory Data Analysis (EDA)', 'Create informative charts and visualizations using Matplotlib and Seaborn. Identify correlations, handle missing data, and uncover data trends.', 3),

(5, 'Getting Started with Flutter & Dart Basics', 'Set up Flutter SDK and Android emulator. Explore Dart syntax including strongly typed variables, functions, and asynchronous programming with Futures.', 1),
(5, 'Building Responsive UIs with Flutter Widgets', 'Understand StatelessWidget vs StatefulWidget. Create responsive layouts using Row, Column, Container, ListView, and Scaffold widgets.', 2),
(5, 'Navigation, State Management & REST APIs', 'Implement Navigator 2.0 routing, pass data between screens, manage application state, and fetch backend REST API data using the http package.', 3),

(6, 'Cloud Computing Core Concepts & AWS Global Infrastructure', 'Introduction to cloud deployment models (IaaS, PaaS, SaaS) and AWS global infrastructure: Regions, Availability Zones, and Edge Locations.', 1),
(6, 'Compute & Storage: Amazon EC2 and Amazon S3', 'Launch and configure Linux virtual machines on EC2. Configure security groups, SSH keys, and create Amazon S3 buckets for object storage.', 2),
(6, 'Databases & Serverless: RDS & AWS Lambda', 'Provision managed relational databases with Amazon RDS (MySQL). Write and deploy serverless functions with AWS Lambda triggered by HTTP requests.', 3);

INSERT INTO quizzes (id, course_id, title) VALUES
(1, 1, 'Java Fundamentals Quiz'),
(2, 2, 'React Fundamentals Quiz');

INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES
(1, 'Which keyword is used to create a class in Java?', 'class', 'Class', 'new', 'object', 'A'),
(1, 'What is the default value of an int variable in Java?', 'null', 'undefined', '0', '-1', 'C'),
(1, 'Which method is the entry point of a Java application?', 'start()', 'run()', 'main()', 'init()', 'C'),
(1, 'What does OOP stand for?', 'Object Oriented Programming', 'Online Output Processing', 'Open Object Platform', 'Oriented Object Protocol', 'A'),
(1, 'Which of the following is NOT a primitive data type in Java?', 'int', 'String', 'boolean', 'double', 'B'),
(2, 'What is React JS primarily used for?', 'Database management', 'Building user interfaces', 'Server-side file hosting', 'Compiling desktop C++ binaries', 'B'),
(2, 'What does JSX stand for?', 'JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JS Express', 'A'),
(2, 'Which React Hook is used to handle local component state?', 'useEffect', 'useContext', 'useState', 'useRef', 'C'),
(2, 'How do you pass data from a parent to a child component in React?', 'Via local storage', 'Via props', 'Via window variables', 'Via DOM queries', 'B'),
(2, 'Which hook is used for performing side effects such as fetching API data?', 'useSideEffect', 'useFetch', 'useEffect', 'useReducer', 'C');

INSERT INTO enrollments (user_id, course_id, enrollment_date, progress) VALUES
(2, 1, '2026-10-15', 50),
(2, 2, '2026-10-18', 25),
(3, 1, '2026-10-20', 25),
(4, 2, '2026-10-22', 0),
(4, 3, '2026-10-25', 0);

INSERT INTO quiz_results (user_id, quiz_id, score, total_questions, attempt_date) VALUES
(2, 1, 5, 5, '2026-10-28 14:30:00'),
(3, 1, 4, 5, '2026-10-29 16:45:00');
