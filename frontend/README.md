# Green India - Eco Suggestions App

A modern React web application that helps users make eco-friendly choices by analyzing images and providing personalized sustainability suggestions.

## 🌱 Features

- **Image Upload**: Upload photos of waste items or everyday objects
- **AI Detection**: Backend ML service identifies objects in the uploaded image
- **Eco Suggestions**: Receive personalized recommendations for sustainable alternatives
- **User Feedback**: Rate suggestions as "Helpful" or "Not Helpful"
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with TailwindCSS for a clean, professional look

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **React Toastify** - Toast notifications

## 📁 Project Structure

```
green-india-frontend/
├── public/
│   └── manifest.json          # PWA manifest
├── src/
│   ├── api/
│   │   └── index.js           # API functions (uploadPhoto, sendFeedback)
│   ├── components/
│   │   ├── FileUpload.jsx     # Drag-and-drop file upload component
│   │   ├── Loader.jsx         # Loading spinner component
│   │   ├── Navbar.jsx         # Navigation bar
│   │   └── SuggestionCard.jsx # Suggestion card with feedback buttons
│   ├── pages/
│   │   ├── Home.jsx           # Upload page
│   │   └── Results.jsx        # Results page with suggestions
│   ├── App.jsx                # Main app component with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles with Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Backend server** running on `http://localhost:8080`

### Installation

1. **Clone the repository** (if not already done):
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### Build for Production

To create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` folder.

To preview the production build:

```bash
npm run preview
```

## 🔌 API Configuration

The frontend connects to the backend at `http://localhost:8080/api`.

**Backend Endpoints Used:**

- `POST /api/upload` - Upload image and get suggestions
  - Request: `multipart/form-data` with `file` and `userId`
  - Response: `{ photoId, detections, suggestions }`

- `POST /api/feedback` - Submit user feedback
  - Request: `{ photoId, suggestionId, userId, feedback }`
  - Response: Confirmation message

To change the API URL, edit `src/api/index.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## 🎨 UI Components

### Home Page
- Clean upload interface with drag-and-drop support
- Image preview before submission
- Loading state during upload
- Error handling with user-friendly messages

### Results Page
- Display detected objects with confidence scores
- Show suggestions in card layout
- Each card includes:
  - Title and description
  - Type badge (product/action/tip)
  - Impact score (star rating)
  - Feedback buttons (Helpful/Not Helpful)
- Navigation back to upload page

## 📱 Responsive Design

The app is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎯 Usage Flow

1. **Upload**: User uploads an image on the home page
2. **Analysis**: Backend ML service detects objects
3. **Suggestions**: App displays eco-friendly suggestions
4. **Feedback**: User can rate each suggestion
5. **Repeat**: Upload another image for more suggestions

## 🌈 Theme

The app uses a green color palette representing eco-friendliness:
- Primary: `#16a34a` (Green 600)
- Lighter shades for backgrounds
- Darker shades for hover states

## 🐛 Error Handling

The app handles various error scenarios:
- No file selected
- Backend server unreachable
- ML service errors
- Network failures

All errors display user-friendly toast notifications.

## 📝 Environment Variables

Currently, the API URL is hardcoded. For production, consider using environment variables:

1. Create `.env` file:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

2. Update `src/api/index.js`:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is part of the Green India initiative.

## 🙏 Acknowledgments

- Built with React and Vite
- Styled with TailwindCSS
- Icons from Heroicons
- Backend ML service integration

---

**Made with 💚 for a greener India**
