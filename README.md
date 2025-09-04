# Tax Records Manager

A full-stack sample application for managing personal tax records.
Built with **ASP.NET Core Web API** (back-end) and **Angular** (front-end), the app demonstrates clean architecture, CRUD operations, and a responsive UI.

## Features

* **Tax Record Management**
  Create, view, edit, and delete tax records with fields for title, year, income, deductions, and notes.
* **ASP.NET Core Web API**
  RESTful API using Entity Framework Core with an in-memory database (no external DB needed).
* **Angular Front-end**
  Standalone Angular application with routing, reactive forms, and client-side validation.
* **Filtering & Sorting**
  Easily filter records by year or search term and sort by year, income, or net income.
* **Dockerized Deployment**
  Comes with a `docker-compose.yml` to run both the API and UI together with a single command.
* **Swagger Documentation**
  Interactive API docs available at `/swagger`.

## Tech Stack

* **Backend:** .NET 8, ASP.NET Core Web API, Entity Framework Core (InMemory)
* **Frontend:** Angular, TypeScript, CSS
* **Containerization:** Docker & Docker Compose
* **Others:** Nginx (for serving Angular and proxying API requests)

