# 🎓 EduPulse LMS — Online Learning Platform

A complete, functional full-stack **Learning Management System (LMS)** developed as a medium-level college academic project using **React JS** for the frontend, **Spring Boot 3 + Spring Security + Spring Data JPA** for the backend, and **MySQL** for relational persistence.

---

## 📋 Table of Contents
1. [Project Overview](#1-project-overview)
2. [Technologies Used](#2-technologies-used)
3. [Software Prerequisites](#3-software-prerequisites)
4. [MySQL Database Setup](#4-mysql-database-setup)
5. [Backend Setup & Run Instructions](#5-backend-setup--run-instructions)
6. [Frontend Setup & Run Instructions](#6-frontend-setup--run-instructions)
7. [Sample Credentials for Testing](#7-sample-credentials-for-testing)
8. [Comprehensive REST API Documentation](#8-comprehensive-rest-api-documentation)
9. [Project Directory Structure](#9-project-directory-structure)
10. [Key Features & Verification Checklist](#10-key-features--verification-checklist)

---

## 1. Project Overview

EduPulse LMS provides a streamlined environment for both **Students** and **Administrators**:
- **Students** can register, log in, browse and search technical courses, enroll with a single click, read through modular lecture notes, track completion progress on a live progress bar, take multiple-choice quizzes, and review quiz scores with complete answer keys.
- **Administrators** have exclusive access to an Admin Panel where they can monitor platform statistics, view student rosters, perform full CRUD operations on courses, manage modular lesson contents, and author evaluation quizzes with customizable option keys.

---

## 2. Technologies Used

### Frontend:
- **React JS (v18)** — Modern component-based single page UI architecture
- **React Router DOM (v6)** — Client-side routing with protected route guards
- **Axios** — HTTP client configured with cookie session credentials (`withCredentials: true`)
- **Bootstrap 5 & Bootstrap Icons** — Responsive layout, cards, modals, and iconography
- **Custom CSS (Plus Jakarta Sans font)** — Modern UI styling, progress gradients, stat cards

### Backend:
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring MVC** — Layered architecture (Controllers, Services, Repositories, DTOs, Entities)
- **Spring Data JPA & Hibernate** — ORM and query abstraction
- **Spring Security** — BCrypt password hashing, session management, and role-based authorization (`ROLE_ADMIN`, `ROLE_STUDENT`)
- **Lombok** — Boilerplate reduction for entities and DTOs

### Database:
- **MySQL 8.0+** — Relational schema with foreign key constraints, cascading deletions, and uniqueness validations

---

## 3. Software Prerequisites

Before starting the application, ensure you have installed:
1. **Java Development Kit (JDK 17 or higher)**
   - Verify: `java -version`
2. **Apache Maven (3.8+)**
   - Verify: `mvn -version`
3. **Node.js (18+ or 20+) & npm**
   - Verify: `node -v` and `npm -v`
4. **MySQL Server (8.0+)**
   - Running locally on port `3306`

---

## 4. MySQL Database Setup

1. Start your local MySQL service.
2. Log into MySQL client or MySQL Workbench:
   ```bash
   mysql -u root -p
   ```
3. Run the provided database initialization script located at `database.sql`:
   ```sql
   source database.sql;
   ```
   *(Alternatively, copy and paste the contents of `database.sql` directly into MySQL Workbench / phpMyAdmin).*

4. **Verify Database Configuration:**
   Check `backend/src/main/resources/application.properties` to ensure credentials match your local MySQL server:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/online_learning_platform?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.username=root
   spring.datasource.password=root
   ```
   *Note: If your MySQL password differs from `root`, update `spring.datasource.password` accordingly.*

---

## 5. Backend Setup & Run Instructions

### Option A: Using the Convenience Script (Windows)
Double-click `run-backend.bat` in the root folder.

### Option B: Using the Command Line
```bash
cd backend
mvn clean spring-boot:run
```
The Spring Boot backend will start on **`http://localhost:8080`**.
On startup, `DataInitializer.java` will automatically verify and seed sample courses, lessons, questions, and test accounts if the database is blank.

---

## 6. Frontend Setup & Run Instructions

### Option A: Using the Convenience Script (Windows)
Double-click `run-frontend.bat` in the root folder.

### Option B: Using the Command Line
```bash
cd frontend
npm install
npm run dev
```
The React frontend application will launch on **`http://localhost:3000`**.

---

## 7. Sample Credentials for Testing

The system is pre-populated with standard accounts for academic evaluation:

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@lms.com` | `admin123` | Full admin privileges: Add/edit/delete courses, manage lessons, create quizzes, view student enrollments & analytics. |
| **Student** | `alice@student.com` | `student123` | Student dashboard: Enrolled in 2 courses, progress tracking, quiz submissions. |
| **Student** | `bob@student.com` | `student123` | Fresh student profile for testing new course enrollments. |
| **New Student** | *(Self-register)* | *(Custom)* | Use the **Register** page to test student onboarding. |

---

## 8. Comprehensive REST API Documentation

Base URL: `http://localhost:8080/api`

### 8.1. Authentication APIs (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new student account | Public |
| `POST` | `/api/auth/login` | Authenticate with email & password | Public |
| `POST` | `/api/auth/logout` | Invalidate current session | Authenticated |
| `GET` | `/api/auth/me` | Fetch currently logged-in user profile | Authenticated |

### 8.2. Course APIs (`/api/courses`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/courses` | Retrieve all available courses | Public |
| `GET` | `/api/courses/{id}` | Get course details by ID | Public |
| `GET` | `/api/courses/search?title=...`| Search courses by keyword | Public |
| `POST` | `/api/courses` | Create a new course | Admin Only |
| `PUT` | `/api/courses/{id}` | Update course details | Admin Only |
| `DELETE`| `/api/courses/{id}` | Delete a course and its contents | Admin Only |

### 8.3. Enrollment APIs (`/api/enrollments`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/enrollments` | Enroll logged-in student in a course (`{ courseId }`) | Student |
| `GET` | `/api/enrollments/my` | Get all enrollments for logged-in student | Student |
| `GET` | `/api/enrollments/check/{courseId}`| Check if student is already enrolled | Authenticated |

### 8.4. Lesson APIs (`/api/lessons`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/lessons/course/{courseId}`| Get all lessons for a course | Public / Student |
| `POST` | `/api/lessons/course/{courseId}`| Add a new lesson to a course | Admin Only |
| `PUT` | `/api/lessons/{id}` | Update lesson content / title | Admin Only |
| `DELETE`| `/api/lessons/{id}` | Delete a lesson | Admin Only |
| `POST` | `/api/lessons/{id}/complete` | Mark lesson as completed and recalculate progress % | Student |

### 8.5. Quiz APIs (`/api/quizzes`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/quizzes` | List all quizzes | Admin Only |
| `GET` | `/api/quizzes/course/{courseId}`| Get quizzes attached to a course | Public / Student |
| `GET` | `/api/quizzes/{id}` | Get quiz questions (optionally hide answers) | Authenticated |
| `POST` | `/api/quizzes/course/{courseId}`| Create a new quiz for a course | Admin Only |
| `POST` | `/api/quizzes/{quizId}/questions`| Add a multiple-choice question to a quiz | Admin Only |
| `DELETE`| `/api/quizzes/{id}` | Delete a quiz | Admin Only |
| `DELETE`| `/api/quizzes/questions/{id}` | Delete an individual question | Admin Only |
| `POST` | `/api/quizzes/submit` | Submit answers and calculate test score | Student |
| `GET` | `/api/quizzes/history` | Get quiz attempt records for logged-in user | Student |

### 8.6. Admin Analytics APIs (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/stats` | Counters for total users, courses, enrollments, quizzes | Admin Only |
| `GET` | `/api/admin/users` | List all registered user accounts | Admin Only |
| `GET` | `/api/admin/enrollments` | List all student course enrollments platform-wide | Admin Only |

---

## 9. Project Directory Structure

```
online-learning-platform/
│
├── database.sql                     <-- Complete MySQL database DDL & sample data
├── run-backend.bat                  <-- Windows one-click backend launcher
├── run-frontend.bat                 <-- Windows one-click frontend launcher
├── README.md                        <-- Detailed project documentation
│
├── backend/                         <-- Spring Boot Application
│   ├── pom.xml
│   └── src/main/
│       ├── resources/
│       │   └── application.properties
│       └── java/com/lms/
│           ├── LmsApplication.java
│           ├── config/
│           │   ├── SecurityConfig.java
│           │   └── DataInitializer.java
│           ├── entity/
│           │   ├── User.java
│           │   ├── Course.java
│           │   ├── Enrollment.java
│           │   ├── Lesson.java
│           │   ├── LessonProgress.java
│           │   ├── Quiz.java
│           │   ├── Question.java
│           │   └── QuizResult.java
│           ├── dto/
│           │   ├── ApiResponse.java
│           │   ├── RegisterRequest.java
│           │   ├── LoginRequest.java
│           │   ├── UserDTO.java
│           │   ├── CourseDTO.java
│           │   ├── LessonDTO.java
│           │   ├── EnrollmentDTO.java
│           │   ├── QuizDTO.java
│           │   ├── QuestionDTO.java
│           │   ├── QuizSubmitRequest.java
│           │   ├── QuizResultDTO.java
│           │   └── DashboardStatsDTO.java
│           ├── repository/
│           │   ├── UserRepository.java
│           │   ├── CourseRepository.java
│           │   ├── EnrollmentRepository.java
│           │   ├── LessonRepository.java
│           │   ├── LessonProgressRepository.java
│           │   ├── QuizRepository.java
│           │   ├── QuestionRepository.java
│           │   └── QuizResultRepository.java
│           ├── service/
│           │   ├── CustomUserDetailsService.java
│           │   ├── UserService.java
│           │   ├── CourseService.java
│           │   ├── EnrollmentService.java
│           │   ├── LessonService.java
│           │   └── QuizService.java
│           ├── controller/
│           │   ├── AuthController.java
│           │   ├── CourseController.java
│           │   ├── EnrollmentController.java
│           │   ├── LessonController.java
│           │   ├── QuizController.java
│           │   └── AdminController.java
│           └── exception/
│               └── GlobalExceptionHandler.java
│
└── frontend/                        <-- React JS Application
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── context/
        │   └── AuthContext.jsx
        ├── services/
        │   ├── api.js
        │   ├── authService.js
        │   ├── courseService.js
        │   ├── enrollmentService.js
        │   ├── lessonService.js
        │   ├── quizService.js
        │   └── adminService.js
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── Sidebar.jsx
        │   ├── CourseCard.jsx
        │   ├── ProtectedRoute.jsx
        │   ├── AdminRoute.jsx
        │   ├── LoadingSpinner.jsx
        │   └── AlertMessage.jsx
        └── pages/
            ├── HomePage.jsx
            ├── LoginPage.jsx
            ├── RegisterPage.jsx
            ├── CourseListingPage.jsx
            ├── CourseDetailsPage.jsx
            ├── LearningPage.jsx
            ├── QuizPage.jsx
            ├── QuizResultsPage.jsx
            ├── student/
            │   ├── StudentDashboard.jsx
            │   └── MyCoursesPage.jsx
            └── admin/
                ├── AdminDashboard.jsx
                ├── CourseManagementPage.jsx
                ├── LessonManagementPage.jsx
                └── QuizManagementPage.jsx
```

---

## 10. Key Features & Verification Checklist

- [x] **Secure Authentication**: BCrypt hashed passwords, role-based session authorization (`ROLE_ADMIN` & `ROLE_STUDENT`).
- [x] **Student Registration & Login**: Interactive forms with validation and auto-login upon registration.
- [x] **Course Discovery & Search**: Responsive cards, real-time keyword search by title.
- [x] **One-Click Course Enrollment**: Duplicate prevention (`UniqueConstraint`), direct redirect to learning workspace.
- [x] **Interactive Learning Room**: Curriculum playlist sidebar, lesson reader, "Mark as Completed" button.
- [x] **Dynamic Progress Tracking**: Real-time progress bar recalculation based on completed lesson count.
- [x] **Assessment Quizzes**: Multiple choice question selector, instant score calculation, percentage evaluation, answer key breakdown.
- [x] **Student Dashboard**: Enrolled course overview, overall completion percentage, quiz attempt history.
- [x] **Admin Control Panel**: Analytical metric cards, registered student table, enrollment log.
- [x] **Full Admin CRUD**:
  - Course Creation, Editing, Deletion.
  - Lesson Creation, Content Modification, Order Assignment, Deletion.
  - Quiz Creation, Multiple-Choice Question additions with answer key assignment.
