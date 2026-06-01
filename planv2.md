# Implementation Plan: Employee Task Management & Performance Module

## Phase 1: Core Definitions (Entities & Enums)
- [x] Define Enums (`TaskStatus`, `TaskPriority`)
- [x] Define Task Entity (`employee-tasks/domain/entities/EmployeeTask.ts`)
- [x] Define Comment Entity (`employee-tasks/domain/entities/EmployeeTaskComment.ts`)
- [x] Define Activity Log Entity (`employee-tasks/domain/entities/EmployeeTaskActivityLog.ts`)
- [x] Define Performance Review Entity (`employee-tasks/domain/entities/EmployeePerformanceReview.ts`)
- [x] Define KPI Entity (`employee-tasks/domain/entities/EmployeeKPI.ts`)

## Phase 2: Database Layer (Models & Repositories)
- [x] Create Mongoose Models for all 5 entities (`employee-tasks/infrastructure/models/*.ts`)
- [x] Define Repository Interfaces (`employee-tasks/domain/interfaces/*.ts`)
- [x] Implement Mongoose Repositories (`employee-tasks/infrastructure/repositories/*.ts`)

## Phase 3: Hierarchy & Authorization Services (Middlewares & Utilities)
- [x] Implement Hierarchy Validation Service (check if assigner is a manager/admin, cross-department checks)
- [x] Implement Task Authorization Middleware (employees access own, managers access subordinates, admin bypass)

## Phase 4: Data Transfer Objects (DTOs)
- [x] Create Request/Response DTOs for Tasks (Create, Update, Status, Reassign)
- [x] Create Request/Response DTOs for Performance (Create Review, Update Review, Assign KPI)

## Phase 5: Use Cases
- [x] Task Use Cases: CreateTask, UpdateTask, GetTaskById, GetTasks, GetEmployeeTasks, GetManagerTasks, UpdateTaskStatus, ReassignTask
- [x] Task Comments & Activity Use Cases: AddComment, GetComments, LogActivity (used internally)
- [x] Performance Use Cases: CreatePerformanceReview, UpdatePerformanceReview, AssignKPI, UpdateKPI

## Phase 6: Presentation Layer (Controllers & Routes)
- [x] Task Controllers & Routes
- [x] Performance Controllers & Routes
- [x] Setup Dependency Injection (`di/index.ts`) for `employee-tasks` module
- [x] Register `employee-tasks` router in the main application router (`src/routes/index.ts`)

## Phase 7: Testing & Verification
- [x] Compile and resolve any TypeScript errors
- [x] Test Endpoints (Tasks, Comments, Activity Logs, Performance, KPIs)

Execution Strategy:
We will execute each phase, compile/test using `npm run dev`, and move to the next.
