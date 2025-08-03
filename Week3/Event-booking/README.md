
# 🎟️ Event Booking API
A Node.js + Express + MongoDB backend API for booking events with secure JWT authentication. Supports role-based access, event management, and booking functionality.

> 🚀 **Live API**: [https://backendzairza.onrender.com](https://backendzairza.onrender.com)

## 📦 Features

- ✅ User registration & login
- ✅ JWT authentication
- ✅ Role-based access (`user` & `admin`)
- ✅ Create, update, delete, and view events
- ✅ Book and cancel event bookings
- ✅ MongoDB Atlas integration
- ✅ Deployed on Render.com

## 📁 Folder Structure

```
week3/
└── event-booking/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── .env
    ├── server.js
```

## 🔧 Installation & Setup (Local)

1. **Clone repo**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/event-booking-api.git
   cd week3/event-booking
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file**:
   ```env
   PORT=3000
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_secret_key
   ```

4. **Run locally**:
   ```bash
   npx nodemon server.js
   ```

## 🧪 API Usage (via Postman)

### ✅ Register
```
POST /api/auth/register
```

**Body (JSON)**:
```json
{
  "name": "Adya",
  "email": "adya@example.com",
  "password": "123456"
}
```

### ✅ Login
```
POST /api/auth/login
```
**Body (JSON)**:
```json
{
  "email": "adya@example.com",
  "password": "123456"
}
```

> ✅ Response: `{ "token": "your-jwt-token" }`

### 🔐 Authenticated Requests
Send the token in the headers:
```
Authorization: Bearer <your-token>
```

## 🎤 Events API
### View all events
```
GET /api/events
```

### Create event *(admin only)*
```
POST /api/events
```

**Body (JSON)**:
```json
{
  "name": "React Conf 2025",
  "date": "2025-12-01",
  "location": "Bangalore",
  "capacity": 150
}
```

### Update event
```
PUT /api/events/:id
```

### Delete event
```
DELETE /api/events/:id
```

## 🎫 Bookings API

### Book an event
```
POST /api/bookings/:eventId
```

### Cancel a booking
```
DELETE /api/bookings/:eventId
```

## 🌍 Deployment (Render)

- Project is deployed at:
  👉 [https://backendzairza.onrender.com](https://backendzairza.onrender.com)
- Render auto-deploys when changes are pushed to the connected GitHub repo.


## 🔐 Environment Variables

Create a `.env` file in your root directory:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/eventBooking?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

## 🧾 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas (via Mongoose)
- JWT for Auth
- bcrypt for password hashing
- CORS for frontend integration

## 🙋 Contact
If you need help using the API, feel free to reach out!
