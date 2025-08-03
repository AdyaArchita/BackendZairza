🔍 In-Depth Concept Explanations


2. JWT Authentication
JWT (JSON Web Tokens) are used to authenticate users.

After logging in, a token is generated and sent to the frontend.

This token is sent back in future requests (Authorization: Bearer <token>).

The token contains encoded user info (id, role) and is verified in middleware.
This ensures only logged-in users can book or cancel events.

3. Role-Based Access Control (RBAC)
RBAC restricts what a user can do based on their role.

Two roles: 'admin' and 'user'

Admins can: create, update, delete events

Users can: book or cancel events

The roleMiddleware checks req.user.role before allowing access to protected admin routes.

4. Middleware System
Middleware in Express allows custom logic between request and response.

authMiddleware: verifies JWT token and adds the user to req.user

roleMiddleware: restricts access based on user role
This keeps your code clean and routes protected.

5. MongoDB with Mongoose ODM
MongoDB is a document-based NoSQL database.

Mongoose provides an Object Data Modeling (ODM) layer:

Models define schemas and relationships.

Built-in validation (enum, unique)

Populating data (e.g., linking booking to user)

Relationships are created using ref.

6. Password Hashing with bcryptjs
Passwords are never stored as plain text:

bcrypt.hash() hashes the password before saving.

bcrypt.compare() is used during login to verify.

7. Error Handling
Uses try-catch blocks to prevent crashes

Returns appropriate HTTP status codes and messages:

400 – Bad request

401 – Unauthorized

403 – Forbidden

404 – Not found

500 – Server error

8. Environment Configuration
Sensitive values like DB URI and JWT secret are stored in a .env file and loaded using dotenv.

bash
Copy
Edit
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret_key
9. CORS (Cross-Origin Resource Sharing)
CORS middleware allows a frontend on a different domain or port (like React on localhost:3000) to access this backend.

10. Data Integrity
Prevents double bookings

Prevents bookings if capacity is full

Cancelling booking also removes the reference from the event

This logic is handled in bookingController.

11. Modular Structure
All logic is separated:

models/ → DB schemas

controllers/ → Route logic

middleware/ → Reusable auth/role protection

routes/ → Define API endpoints

config/ → DB setup

12. Scalability
The structure allows easy extension:

Add more roles, models, services

Supports frontend, mobile apps, or admin dashboards

# 🎟️ Event Booking System - Backend API

A RESTful API server for an Event Booking platform built using **Node.js**, **Express**, **MongoDB**, and **JWT Authentication** with **Role-Based Access Control** (RBAC). Users can register, login, book events, and admins can manage events.


## 📚 Key Concepts Implemented

### ✅ RESTful API
REST stands for Representational State Transfer. It uses standard HTTP methods.
Organizes routes using HTTP methods (GET, POST, PUT, DELETE) and clearly defined resources (`/users`, `/events`, `/bookings`).

GET: retrieve data (e.g., /api/events)

POST: create new data (e.g., /api/events)

PUT: update existing data (e.g., /api/events/:id)

DELETE: delete data (e.g., /api/events/:id)

### ✅ JWT Authentication
- Authenticated users get a token.
- This token must be sent in requests to access protected routes.

### ✅ Role-Based Access Control (RBAC)
- Admins can create/update/delete events.
- Users can view and book events.
- `roleMiddleware()` ensures route access.

### ✅ Middleware Architecture
- `authMiddleware`: verifies JWT
- `roleMiddleware`: protects admin routes

### ✅ MongoDB with Mongoose
- Models: `User`, `Event`, `Booking`
- Relationships between models via `ref`
- Schema validations and constraints

### ✅ Password Hashing
Passwords are securely hashed using `bcryptjs` before storing and compared during login.

### ✅ Error Handling
All routes use `try-catch` blocks and return meaningful error codes/messages.

### ✅ Environment Config
Uses `.env` and `dotenv` to manage environment variables like `MONGO_URI` and `JWT_SECRET`.

### ✅ Data Integrity
Prevents:
- Double booking
- Booking full events
- Deleting unbooked entries

### ✅ Scalable Code Structure
Follows MVC-style modular structure for clean, maintainable code.

---

## ⚙️ Technologies

- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing
- dotenv + cors middleware

---

## 🔐 Authentication & Authorization

- Users register and login using `/api/auth`
- JWT is issued and must be sent in the `Authorization` header
- Admins use token to manage events
- Users use token to book/cancel events

---

## 📦 Models

### 🧑‍💼 User
```js
{
  name,
  email,
  password,
  role: 'user' | 'admin'
}

📅 Event
js
Copy
Edit
{
  name,
  date,
  location,
  capacity,
  bookings: [Booking ObjectId]
}
📄 Booking
js
Copy
Edit
{
  user: User ObjectId,
  event: Event ObjectId,
  createdAt
}
🚀 API Routes
🛂 Auth (/api/auth)
Method	Route      	Access	Description      
POST  	/register  	Public	Register a user  
POST  	/login      	Public	Login & get token

📅 Events (/api/events)
Method	Route      	Access    	Description        
GET    	/          	Public    	List all events    
POST  	/          	Admin      	Create event        
PUT    	/:id        	Admin      	Update event        
DELETE	/:id        	Admin      	Delete event        

🎫 Bookings (/api/bookings)
Method	Route      	Access      	Description          
POST  	/:eventId  	Authenticated	Book an event        
DELETE	/:eventId  	Authenticated	Cancel a booking      

🧪 Setup Instructions
Clone the repo

bash
Copy
Edit
git clone https://github.com/yourusername/event-booking-backend.git
Install dependencies

bash
Copy
Edit
npm install
Setup .env

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
Run the server

bash
Copy
Edit
npm run dev
📮 Testing via Postman
POST /api/auth/register → Register a new user

POST /api/auth/login → Login and receive JWT

Use token in Authorization: Bearer <token> for protected routes

Test booking and event creation routes

🛰️ Deployment
This backend can be deployed to:

Render

Cyclic

Railway

Just connect your GitHub repo and set environment variables in the dashboard.