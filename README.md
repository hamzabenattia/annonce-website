# Annonce Website (Tayara Clone)

A full-stack classified ads website built with React (frontend) and Node.js/Express (backend). This application allows users to post, browse, and manage classified advertisements with features like user authentication, email verification, image uploads, and admin panel.

## 🚀 Features

- **User Authentication**: JWT-based authentication with email verification
- **Ads Management**: Create, edit, delete, and browse classified ads
- **Image Uploads**: Cloudinary integration for image storage
- **Email Notifications**: Automated email confirmations and password resets
- **Admin Panel**: Administrative controls for managing users and ads
- **Responsive Design**: Mobile-friendly interface with Material-UI and Tailwind CSS
- **Categories**: Organized ad categories for better browsing

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image hosting
- **Nodemailer** - Email service

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Material-UI** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Quill** - Rich text editor
- **React Slick** - Carousel component

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/annonce-website.git
cd annonce-website
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install
```

## ⚙️ Environment Configuration

### Backend (.env file)

Edit the `backend/.env` file with your configuration:

```env
# Database Configuration
MONGO_URL=mongodb://localhost:27017/your-database-name

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Server Configuration
PORT=1000

# Email Configuration (SMTP)
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_SERVICE=ethereal
SMTP_MAIL=ruthie48@ethereal.email
SMTP_PASSWORD=HPAWVSGm5ZdWH7C8fd

# Cloudinary Configuration (for image uploads)
Cloudinary_Name=your-cloudinary-cloud-name
Cloudinary_Key=your-cloudinary-api-key
Cloudinary_Secret=your-cloudinary-api-secret

# Frontend URL Configuration
FRONTEND_URL=http://localhost:3000
```

### Getting Email Credentials

For email functionality, you can use:
- **Ethereal Email** (for testing): Visit [https://ethereal.email](https://ethereal.email) to get test SMTP credentials
- **Gmail**: Enable less secure apps or use app passwords

### Getting Cloudinary Credentials

1. Sign up at [https://cloudinary.com](https://cloudinary.com)
2. Go to your Dashboard
3. Copy your Cloud Name, API Key, and API Secret

## 🚀 Running the Application

### Development Mode

You need to run both backend and frontend servers simultaneously.

#### Terminal 1: Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:1000` (or your configured PORT)

#### Terminal 2: Frontend Server

```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000`

### Create Admin Account

After setting up the backend, create an admin account:

```bash
cd backend
npm run create-admin
```

This will create an admin user with the following default credentials:
- **Email**: admin@admin.com
- **Password**: admin123

#### Custom Admin Credentials

You can also create an admin with custom credentials:

```bash
# Using npm script with custom parameters
node createAdmin.js --email myadmin@example.com --password securepassword --firstname John --lastname Doe

# Or directly with node
cd backend
node createAdmin.js -e myadmin@example.com -p securepassword -f John -l Doe
```

**Command-line options:**
- `-e, --email`: Admin email address
- `-p, --password`: Admin password
- `-f, --firstname`: Admin first name
- `-l, --lastname`: Admin last name
- `-h, --help`: Show help message

⚠️ **Important**: Change the password after first login for security!

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Backend (Production)

```bash
cd backend
npm start
```

The production build will be served from the backend.

## 📱 Usage

1. **Registration**: Create a new account and verify your email
2. **Login**: Sign in with your credentials
3. **Browse Ads**: View all available advertisements
4. **Post Ads**: Create new classified ads with images
5. **Manage Ads**: Edit or delete your own ads
6. **Admin Panel**: Access administrative features (admin accounts only)

### Admin Account

Use the admin account to manage users and ads:
- **Login** with admin credentials (admin@admin.com / admin123)
- **Approve/Reject** ads from the admin panel
- **Manage** user accounts and categories
- **View** system statistics and reports

## 🗂️ Project Structure

```
annonce-website/
├── backend/
│   ├── config/
│   │   └── DBConnection.js          # Database connection
│   ├── Controller/                  # Route controllers
│   ├── Middleware/                  # Custom middleware
│   ├── Models/                      # MongoDB schemas
│   ├── Routes/                      # API routes
│   ├── template/                    # Email templates
│   ├── utils/                       # Utility functions
│   ├── index.js                     # Main server file
│   ├── package.json
│   └── .example                     # Environment variables template
├── frontend/
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── Components/              # Reusable components
│   │   ├── Pages/                   # Page components
│   │   ├── Hooks/                   # Custom hooks
│   │   ├── constant/                # Constants
│   │   └── images/                  # Image assets
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Ads
- `GET /api/annonce` - Get all ads
- `POST /api/annonce` - Create new ad
- `GET /api/annonce/:id` - Get single ad
- `PUT /api/annonce/:id` - Update ad
- `DELETE /api/annonce/:id` - Delete ad

### Categories
- `GET /api/category` - Get all categories
- `POST /api/category` - Create category (admin)
- `PUT /api/category/:id` - Update category (admin)
- `DELETE /api/category/:id` - Delete category (admin)

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/ads` - Get all ads
- `PUT /api/admin/ads/:id/status` - Approve/reject ads

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or update MONGO_URL for cloud database
   - Check if the database name in MONGO_URL exists

2. **Email Not Sending**
   - Verify SMTP credentials in .env file
   - Check if you're using the correct SMTP service settings

3. **Image Upload Issues**
   - Verify Cloudinary credentials
   - Check your Cloudinary plan limits

4. **CORS Errors**
   - Ensure FRONTEND_URL in .env matches your frontend URL
   - Check if the backend CORS configuration includes your frontend URL

5. **Port Already in Use**
   - Change the PORT in .env file
   - Kill processes using the port: `npx kill-port 1000`

6. **Admin Creation Issues**
   - Ensure MongoDB is running and MONGO_URL is correct
   - Check if admin user already exists: `npm run create-admin` will show existing credentials
   - Verify .env file exists and is properly configured

### Development Tips

- Use environment-specific .env files (`.env.development`, `.env.production`)
- Enable debug logging by setting `DEBUG=*` in environment
- Use tools like Postman for API testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Happy coding! 🎉**
