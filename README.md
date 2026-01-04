**Project Overview**
This appears to be a full-stack Portfolio Website application. It consists of a React frontend for the user interface and a Python FastAPI backend that handles data persistence and API logic.
Key features implemented in the backend include:
- Contact Form Handling: Endpoints to receive and store messages from visitors (/contact).
- Visitor Tracking: Functionality to track page views, capture user agents/IPs, and calculate visitor statistics (total, unique, and daily visitors) (/visitors/track, /visitors/count).
- Status Checks: A simple health check system (/status).
Technologies Used
**Backend (Python)**
- FastAPI: A modern, high-performance web framework for building the REST API.
- Motor: An asynchronous Python driver for MongoDB, used for non-blocking database operations.
- Pydantic: Used for data validation and defining the schema for API requests/responses (e.g., ContactEmailCreate, VisitorTrack).
- Uvicorn: An ASGI web server implementation to run the FastAPI application.
- Python-dotenv: For managing environment variables (likely for database credentials).
**Frontend (JavaScript/React)**
- React (v19): The library used for building the user interface.
- React Router: Handles client-side routing (e.g., navigating between pages).
- Lucide React: A library used for rendering icons.
- Create React App (React Scripts): The build tool and configuration setup for the React project.
**Database**
- MongoDB: The NoSQL database used to store contact form submissions (contact_emails), visitor logs (visitors), and status checks (status_checks).
