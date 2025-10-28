# 🚀 Getting Started with VibeLog Pro

Welcome to **VibeLog Pro**! This guide will help you set up and run the project locally.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

---

## 📦 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vibelog-pro.git
cd vibelog-pro
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configurations
# You can use nano, vim, or any text editor
nano .env
```

### 3. Configure Environment Variables

Open the `.env` file in the backend folder and configure:

```env
# MongoDB Connection (Local)
MONGO_URI=mongodb://localhost:27017/vibelog-pro

# Or use MongoDB Atlas (Cloud)
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/vibelog-pro

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:3000

# Cloudinary (Optional - for image uploads)
# Sign up at https://cloudinary.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payment Gateway (Optional)
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
```

### 4. Install Backend Dependencies (if not already)

```bash
npm install bcryptjs cloudinary cors dotenv express jsonwebtoken mongoose multer nodemon
```

### 5. Frontend Setup

```bash
# Open a new terminal and navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Install required packages
npm install react react-dom react-router-dom axios
```

### 6. Start MongoDB

**If using local MongoDB:**

```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**OR** use MongoDB Atlas (Cloud) - No local installation needed!

---

## 🚀 Running the Project

### Start Backend Server

```bash
cd backend

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Start Frontend Server

```bash
# Open a new terminal
cd frontend

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

---

## ✅ Verify Installation

1. **Backend Health Check:**
   - Visit `http://localhost:5000/health`
   - You should see: `{"status": "ok", "message": "VibeLog Pro API is running"}`

2. **Frontend:**
   - Visit `http://localhost:3000`
   - You should see the VibeLog Pro homepage

---

## 🧪 Testing the APIs

### Using Postman or Thunder Client

1. **Register a User:**
   ```
   POST http://localhost:5000/api/auth/register
   Body: {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123",
     "role": "creator"
   }
   ```

2. **Login:**
   ```
   POST http://localhost:5000/api/auth/login
   Body: {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Get Trending Posts:**
   ```
   GET http://localhost:5000/api/posts/trending
   ```

4. **Get Featured Services:**
   ```
   GET http://localhost:5000/api/services/featured
   ```

---

## 🗃️ Database Collections

The app will automatically create these collections in MongoDB:

- **users** - User accounts
- **posts** - Blog/vlog posts
- **services** - Freelancer services
- **projects** - Project bookings
- **payments** - Payment records
- **notifications** - User notifications
- **comments** - Post comments

---

## 🐛 Troubleshooting

### Port Already in Use

If port 5000 or 3000 is already in use:

```bash
# Find and kill the process
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill
```

### MongoDB Connection Issues

1. Verify MongoDB is running: `mongod --version`
2. Check connection string in `.env`
3. For MongoDB Atlas, ensure your IP is whitelisted

### Frontend Build Errors

```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Backend Errors

```bash
# Clear cache and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Project Structure

```
vibelog-pro/
├── backend/
│   ├── config/         # Database & Cloudinary config
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── App.jsx      # Main app
│   └── index.html
└── README.md
```

---

## 🎯 Next Steps

1. ✅ Backend is running
2. ✅ Frontend is running
3. ✅ Database is connected
4. 🎨 Customize the UI
5. 📝 Create your first blog post
6. 💼 Post a freelancer service
7. 🚀 Deploy to production

---

## 📞 Need Help?

- Check the main [README.md](./README.md)
- Review the API documentation
- Check GitHub Issues
- Contact the development team

---

**Happy Coding! 🚀**


