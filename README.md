# OMETS - Online Mechanical Engineering and Technology Services
<!-- Triggering fresh sync -->

OMETS is a comprehensive platform designed for mechanical engineers and technology enthusiasts. It provides a global space for learning, collaboration, expert consultation, and innovation.

## 🚀 Features

- **Courses & Workshops**: Access high-quality engineering courses and interactive workshops.
- **Expert Consultation**: Book sessions with industry experts for technical guidance.
- **Innovation Hub**: A dedicated space for research, development, and engineering breakthroughs.
- **Knowledge Base**: A library of technical documentation, guides, and research papers.
- **Community Forum**: Connect and collaborate with a global network of engineers.
- **User Dashboard**: Track your course progress, manage enrollments, and view your OMT token balance.
- **Authentication**: Secure login and registration using Firebase (Google and Email/Password).
- **Tokenomics**: Integrated OMT token system for platform interactions.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (Motion)
- **Backend/Database**: Firebase (Authentication, Firestore)
- **Icons**: Lucide React
- **Routing**: React Router 7

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/officialsmaj/Omets.git
   cd Omets
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your Firebase and API keys:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### GitHub Pages

The project is configured for deployment on GitHub Pages at the subpath `/Omets/`.

1. **Build the project**:
   ```bash
   npm run build
   ```
2. **Deploy**:
   Ensure your `vite.config.ts` has the correct `base` path:
   ```typescript
   base: '/Omets/'
   ```
   And `BrowserRouter` in `App.tsx` has the correct `basename`:
   ```tsx
   <BrowserRouter basename="/Omets">
   ```

## 📄 License

This project is licensed under the MIT License.

---
Developed by [officialsmaj](https://github.com/officialsmaj)
