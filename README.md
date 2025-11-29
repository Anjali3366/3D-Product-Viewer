# 🎨 3D Product Viewer - MERN + Three.js

A full-stack 3D product viewer application built with MERN stack and Three.js, featuring interactive 3D model rendering, customization controls, and persistent settings storage.

## 🌟 Features

- ✅ **3D Model Upload** - Support for GLB/GLTF formats
- ✅ **Interactive Controls** - Rotate, zoom, and pan 3D models
- ✅ **Customization** - Change background color and toggle wireframe mode
- ✅ **Persistence** - Save and load viewer settings
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Professional Lighting** - HDRI environment with ambient and directional lights

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Helper components for R3F
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload middleware

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18.0.0
MongoDB (local or Atlas)
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Anjali3366/3D-Product-Viewer.git
cd 3d-product-viewer
```

2. **Setup Backend**

```bash
cd backend
pnpm install
```

Create `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/3d-viewer
PORT=5000
```

3. **Setup Frontend**

```bash
cd ../frontend
pnpm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Open browser: `http://localhost:3000`

## 📁 Project Structure

```
3d-product-viewer/
├── backend/
│   ├── models/
│   │   └── ViewerSettings.model.js       # MongoDB schema
│   ├── routes/
│   │   └── api.route.js                  # API endpoints
│   ├── uploads/                    # Uploaded models storage
│   ├── server.js                   # Express server
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Viewer3D.jsx        # 3D viewer component
    │   │   ├── Controls.jsx        # Control panel
    │   │   └── FileUpload.jsx      # File upload UI
    │   ├── services/
    │   │   └── api.js              # API client
    │   ├── App.jsx                 # Main app
    │   └── main.jsx                # Entry point
    ├── package.json
    └── .env
```

## 🔌 API Endpoints

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| POST   | `/api/upload`       | Upload 3D model file |
| POST   | `/api/settings`     | Save viewer settings |
| GET    | `/api/settings`     | Get latest settings  |
| GET    | `/api/settings/all` | Get settings history |

## 🎮 Usage

1. **Upload Model**: Click "Choose 3D Model" and select a .glb or .gltf file
2. **Interact**:
   - Left click + drag to rotate
   - Right click + drag to pan
   - Scroll to zoom in/out
3. **Customize**: Use color picker to change background
4. **Wireframe**: Toggle wireframe mode checkbox
5. **Save/Load**: Save your settings or load previous configurations

## 🌐 Deployment

### Backend (Render.com)

1. Create new Web Service
2. Connect GitHub repository
3. Add environment variable: `MONGODB_URI`
4. Deploy

### Frontend (Vercel)

1. Import GitHub repository
2. Add environment variable: `VITE_API_URL`
3. Deploy

### MongoDB (Atlas)

1. Create free cluster
2. Create database user
3. Allow network access (0.0.0.0/0)
4. Get connection string

## 📦 Sample Models

Test with free GLB models:

- [glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models)
- [Sketchfab](https://sketchfab.com/features/gltf)

## 🎯 Features Implemented

### Mandatory Requirements

- [x] 3D viewer with GLB/GLTF support
- [x] Rotate, zoom, pan controls
- [x] Ambient + directional lighting
- [x] Upload 3D model functionality
- [x] Background color picker
- [x] Wireframe toggle
- [x] Model upload API
- [x] Save settings API
- [x] Fetch settings API
- [x] MongoDB integration

### Bonus Features

- [x] HDRI environment lighting
- [x] Responsive UI design
- [x] Loading states and error handling
- [x] Settings history
- [x] Professional styling

## 📊 Architecture

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   React UI   │  HTTP   │   Express    │  CRUD   │   MongoDB    │
│   (Vercel)   │ ◄─────► │   (Render)   │ ◄─────► │   (Atlas)    │
└──────────────┘         └──────────────┘         └──────────────┘
       │
    Three.js
  (3D Rendering)
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Anjali Tomar - Full Stack Developer

## 🙏 Acknowledgments

- Three.js community
- React Three Fiber team
- MongoDB documentation
- glTF Sample Models

## 📸 Screenshots

### Main Interface

![Main Interface](screenshots/main.png)

### 3D Model View

![3D View](screenshots/model.png)

### Wireframe Mode

![Wireframe](screenshots/wireframe.png)

---

**Live Demo**: [Your Vercel URL]

**Backend API**: [Your Render URL]

