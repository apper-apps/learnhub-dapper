import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import FormField from "@/components/molecules/FormField";
import RoleCheckboxes from "@/components/molecules/RoleCheckboxes";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { videoService } from "@/services/api/videoService";

const VideoUploadPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
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
      await videoService.create({
        ...formData,
        category,
        curriculumId: `${category}-${Date.now()}`,
        order: 1
      });
      
      toast.success("영상이 성공적으로 업로드되었습니다");
      navigate(`/${category}`);
    } catch (err) {
      toast.error("업로드 중 오류가 발생했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/${category}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 md:p-8"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {category === "membership" ? "멤버십" : "마스터"} 강의 업로드
          </h1>
          <p className="text-gray-600">
            새로운 강의를 업로드하여 학습자들과 지식을 공유해보세요
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
                  업로드 중...
                </>
              ) : (
                <>
                  <ApperIcon name="Upload" className="w-4 h-4" />
                  업로드
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default VideoUploadPage;