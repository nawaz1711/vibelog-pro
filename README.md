# 🚀 VibeLog Pro - Creator & Freelancer Hub

A full-stack MERN application that combines **blogging/vlogging** with **freelancing marketplace** functionality. Built with React, Node.js, Express, MongoDB, and Tailwind CSS.

![VibeLog Pro](https://img.shields.io/badge/VibeLog-Pro-blue)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-ISC-yellow)

---

## 💡 Project Overview

**VibeLog Pro** is a dual-purpose platform that allows:
- **Content Creators** to publish blogs and vlogs, grow their audience
- **Freelancers** to offer services (writing, video editing, social media marketing)
- **Clients** to hire talented professionals

---

## ⚙️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React.js + Vite + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | JWT + bcrypt |
| **File Upload** | Cloudinary |
| **Payment** | Razorpay/Stripe (optional) |

---

## 🧩 Key Features

### ✅ User Module
- Register as Creator/Client/Admin
- JWT-based secure authentication
- Profile management
- Follow/unfollow functionality

### ✅ Blogging Module
- Create, edit, delete blogs & vlogs
- Rich text editing
- Tags, categories, search
- Likes, comments, shares
- Trending posts
- Analytics (views, likes)

### ✅ Freelancing Module
- Create service listings (gigs)
- Pricing tiers (Basic/Standard/Premium)
- Portfolio showcase
- Browse by category
- Ratings & reviews

### ✅ Project Management
- Hire creators for projects
- Track project status
- Client-Creator messaging
- Payment integration ready

### ✅ Admin Dashboard
- Manage users, posts, services
- Analytics & reports
- Content moderation

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd vibelog-pro/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables in .env
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# CLOUDINARY_*=your_cloudinary_credentials

# Start development server
npm run dev

# Or production server
npm start
```

### Frontend Setup

```bash
cd vibelog-pro/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🗃️ Environment Variables

Create a `.env` file in the `backend` folder:

```env
MONGO_URI=mongodb://localhost:27017/vibelog-pro
JWT_SECRET=your_super_secret_key
PORT=5000
CLIENT_URL=http://localhost:3000

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payment Gateway (Optional)
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
```

---

## 🧠 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/follow/:userId` - Follow user
- `POST /api/auth/unfollow/:userId` - Unfollow user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/trending` - Get trending posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create post (auth required)
- `PUT /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)
- `POST /api/posts/:id/like` - Like/unlike post (auth required)
- `POST /api/posts/:id/comment` - Add comment (auth required)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/featured` - Get featured services
- `GET /api/services/category/:category` - Get by category
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (auth required)
- `PUT /api/services/:id` - Update service (auth required)
- `DELETE /api/services/:id` - Delete service (auth required)

### Projects
- `GET /api/projects` - Get user's projects (auth required)
- `POST /api/projects` - Create project (auth required)
- `GET /api/projects/:id` - Get project by ID (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `POST /api/projects/:id/complete` - Complete project (auth required)

---

## 🎨 Frontend Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with trending posts & featured services |
| `/blogs` | Browse all blog posts |
| `/blog/:id` | View individual blog post |
| `/freelancers` | Browse freelancers & services |
| `/service/:id` | View service details |
| `/profile/:id` | User profile |
| `/dashboard` | User dashboard |
| `/admin` | Admin panel |

---

## 🗂️ Project Structure

```
vibelog-pro/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Service.js
│   │   ├── Project.js
│   │   ├── Payment.js
│   │   └── Notification.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   ├── serviceController.js
│   │   └── projectController.js
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend (Render/Railway)
```bash
# Set environment variables in your hosting platform
# Deploy to Render, Railway, or Heroku
```

---

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Role-based access control
- CORS configuration
- Input validation
- SQL injection prevention (MongoDB)

---

## 📈 Future Enhancements

- [ ] Real-time chat with Socket.io
- [ ] Payment integration (Razorpay/Stripe)
- [ ] Email notifications
- [ ] AI-powered content suggestions
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Dark mode toggle
- [ ] Multi-language support

---

## 👥 Contributing

Contributions are welcome! Please fork the repository and create a pull request.

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

Built with ❤️ for content creators and freelancers worldwide.

---

## 📞 Contact

For questions or support, feel free to reach out!

**Happy Creating! 🚀**


