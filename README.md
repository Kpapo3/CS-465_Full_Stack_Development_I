# CS-465 - Module Eight Journal

## Travlr Getaways Application
### Project Overview

* Travlr Getaways is a MEAN stack application with a customer-facing site (read-only in this submission) and an admin SPA for secure trip management (login, create, update, delete).
* The frontend is Angular, the backend is Node/Express with a REST API, and data is persisted in MongoDB via Mongoose. Admin endpoints are protected with JWT authentication.

### Architecture

QUESTION:
Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).

* Express HTML/JavaScript renders full pages on the server; each interaction typically triggers a new request and page reload. The Angular SPA renders in the browser, uses client-side routing, and updates only parts of the page, which feels faster and more interactive.
* The SPA separates presentation from the server by consuming JSON APIs, while server-rendered pages couple UI to server templates.


QUESTION:
Why did the backend use a NoSQL MongoDB database?

* Trip data fits naturally in flexible JSON-like documents, and schema changes are easier to evolve without heavy migrations.
* MongoDB with Mongoose provides fast development, good performance for read-heavy lists, and straightforward mapping between API JSON and database documents.

### Functionality

QUESTION:
How is JSON different from JavaScript and how does JSON tie together the frontend and backend development pieces?

* JSON is a strict data format (not executable code) for representing objects, arrays, numbers, strings, booleans, and null; JavaScript is a programming language.
* The Angular app sends and receives JSON to/from the Express API, which makes it the shared contract that ties the UI state to the server’s data and logic.


QUESTION:
Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

* I centralized HTTP logic in a TripData service and introduced typed models (Trip, User, AuthResponse) to reduce duplication and improve type safety. I also extracted a TripCard component so the same UI is reused across listing and future views.
* Reusable components improve consistency, speed up development, and make changes safer because fixes and enhancements happen in one place.

### Testing

QUESTION:
Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

* Each endpoint maps to an HTTP method with clear intent: GET for reads, POST for creates, PUT for updates, and DELETE for removals. I verified responses and status codes with Postman/curl and confirmed database changes in MongoDB.
* With security enabled, protected routes require a valid JWT; I tested both authorized and unauthorized cases to ensure the interceptor attaches tokens and the server enforces access correctly.

### Reflection

QUESTION:
How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

* I delivered an end-to-end MEAN application, strengthening skills in Angular components/services, Express routing/middleware, Mongoose models, and JWT-based auth.
* I also improved testing and debugging workflows (Postman, devtools network tracing) and learned to structure code for maintainability with reusable components and typed models, all of which make me more competitive for full stack roles.

