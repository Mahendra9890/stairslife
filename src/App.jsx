import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LandingPage } from './pages/LandingPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { ProjectsPage } from './pages/ProjectsPage.jsx'
import { ProjectDetailPage } from './pages/ProjectDetailPage.jsx'
import { StudentDashboardPage } from './pages/StudentDashboardPage.jsx'
import { BusinessDashboardPage } from './pages/BusinessDashboardPage.jsx'
import { PostProjectPage } from './pages/PostProjectPage.jsx'
import { VerificationPage } from './pages/VerificationPage.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/dashboard/student" element={<StudentDashboardPage />} />
          <Route path="/dashboard/business" element={<BusinessDashboardPage />} />
          <Route path="/post-project" element={<PostProjectPage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
