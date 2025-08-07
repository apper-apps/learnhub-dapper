import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import CurriculumUploadModal from "@/components/organisms/CurriculumUploadModal";
import { videoService } from "@/services/api/videoService";
import ApperIcon from "@/components/ApperIcon";
import VideoThumbnail from "@/components/molecules/VideoThumbnail";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
const VideoGallery = ({ category, title }) => {
const [videos, setVideos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [showCurriculumModal, setShowCurriculumModal] = useState(false);
const navigate = useNavigate();

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await videoService.getByCategory(category);
      setVideos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
}, [category]);

  const handleUpload = () => {
    setShowCurriculumModal(true);
  };

  const handleEdit = (videoId) => {
    navigate(`/edit-video/${videoId}`);
  };

  const handlePin = async (videoId) => {
    try {
      await videoService.togglePin(videoId);
      toast.success("영상이 고정/해제되었습니다");
      loadVideos();
    } catch (err) {
      toast.error("작업 중 오류가 발생했습니다");
    }
  };

  const handleDelete = async (videoId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await videoService.delete(videoId);
        toast.success("영상이 삭제되었습니다");
        loadVideos();
      } catch (err) {
        toast.error("삭제 중 오류가 발생했습니다");
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadVideos} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-2">
            전문가가 엄선한 {category === "membership" ? "멤버십" : "마스터"} 강의들을 만나보세요
          </p>
        </div>
        <Button
          onClick={handleUpload}
          className="shrink-0"
          size="lg"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          강의 업로드
        </Button>
      </div>

      {/* Video Grid */}
      {videos.length === 0 ? (
        <Empty
          title="아직 강의가 없습니다"
          message={`첫 번째 ${category === "membership" ? "멤버십" : "마스터"} 강의를 업로드해보세요!`}
          action={{
            label: "강의 업로드",
            icon: "Plus",
            onClick: handleUpload
          }}
        />
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {videos.map((video) => (
            <motion.div
              key={video.Id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <VideoThumbnail
                video={video}
                onEdit={handleEdit}
                onPin={handlePin}
                onDelete={handleDelete}
                showActions={true}
              />
            </motion.div>
          ))}
</motion.div>
      )}

      <CurriculumUploadModal
        isOpen={showCurriculumModal}
        onClose={() => setShowCurriculumModal(false)}
        category={category}
        onSuccess={() => {
          setShowCurriculumModal(false);
          loadVideos();
        }}
      />
    </div>
  );
};

export default VideoGallery;