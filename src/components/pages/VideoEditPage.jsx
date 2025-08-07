import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import FormField from "@/components/molecules/FormField";
import RoleCheckboxes from "@/components/molecules/RoleCheckboxes";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { videoService } from "@/services/api/videoService";

const VideoEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    duration: "",
    allowedRoles: ["free"],
    isPinned: false
  });

  const loadVideo = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await videoService.getById(id);
      setVideo(data);
      setFormData({
        title: data.title,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl,
        videoUrl: data.videoUrl,
        duration: data.duration || "",
        allowedRoles: data.allowedRoles,
        isPinned: data.isPinned
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideo();
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.videoUrl.trim()) {
      toast.error("필수 항목을 모두 입력해주세요");
      return;
    }

    try {
      setIsSubmitting(true);
      await videoService.update(id, formData);
      
      toast.success("영상이 성공적으로 수정되었습니다");
      navigate(`/${video.category}`);
    } catch (err) {
      toast.error("수정 중 오류가 발생했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/${video?.category || "membership"}`);
  };

  if (loading) return <Loading type="player" />;
  if (error) return <Error message={error} onRetry={loadVideo} />;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 md:p-8"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            강의 수정
          </h1>
          <p className="text-gray-600">
            강의 정보를 수정하여 더 나은 학습 경험을 제공해보세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="강의 제목"
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="강의 제목을 입력해주세요"
            required
          />

          <FormField
            label="강의 설명"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="강의에 대한 상세한 설명을 입력해주세요"
            multiline
            rows={4}
            required
          />

          <FormField
            label="썸네일 이미지 URL"
            type="url"
            value={formData.thumbnailUrl}
            onChange={(e) => handleInputChange("thumbnailUrl", e.target.value)}
            placeholder="https://example.com/thumbnail.jpg"
          />

          <FormField
            label="동영상 URL"
            type="url"
            value={formData.videoUrl}
            onChange={(e) => handleInputChange("videoUrl", e.target.value)}
            placeholder="https://www.youtube.com/embed/VIDEO_ID"
            required
          />

          <FormField
            label="강의 시간"
            type="text"
            value={formData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
            placeholder="예: 2:30:45"
          />

          <RoleCheckboxes
            selectedRoles={formData.allowedRoles}
            onChange={(roles) => handleInputChange("allowedRoles", roles)}
          />

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isPinned"
              checked={formData.isPinned}
              onChange={(e) => handleInputChange("isPinned", e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="isPinned" className="text-sm font-medium text-gray-700">
              상단에 고정하기
            </label>
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                  수정 중...
                </>
              ) : (
                <>
                  <ApperIcon name="Save" className="w-4 h-4" />
                  수정 완료
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default VideoEditPage;