import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import HomePage from "@/components/pages/HomePage"
import MembershipPage from "@/components/pages/MembershipPage"
import MasterPage from "@/components/pages/MasterPage"
import InsightsPage from "@/components/pages/InsightsPage"
import TestimonialsPage from "@/components/pages/TestimonialsPage"
import VideoPlayerPage from "@/components/pages/VideoPlayerPage"
import ArticleViewerPage from "@/components/pages/ArticleViewerPage"
import VideoUploadPage from "@/components/pages/VideoUploadPage"
import VideoEditPage from "@/components/pages/VideoEditPage"
import ArticleUploadPage from "@/components/pages/ArticleUploadPage"
import ArticleEditPage from "@/components/pages/ArticleEditPage"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/master" element={<MasterPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/video/:id" element={<VideoPlayerPage />} />
          <Route path="/article/:id" element={<ArticleViewerPage />} />
          <Route path="/upload-video/:category" element={<VideoUploadPage />} />
          <Route path="/edit-video/:id" element={<VideoEditPage />} />
          <Route path="/upload-article" element={<ArticleUploadPage />} />
          <Route path="/edit-article/:id" element={<ArticleEditPage />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{zIndex: 9999}}
      />
    </BrowserRouter>
  )
}

export default App