import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import ApperIcon from "@/components/ApperIcon";
import { curriculumService } from "@/services/api/curriculumService";
import { videoService } from "@/services/api/videoService";

const CurriculumUploadModal = ({ isOpen, onClose, category, onSuccess }) => {
  const [step, setStep] = useState("select"); // select, create, manage
  const [curricula, setCurricula] = useState([]);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [curriculumVideos, setCurriculumVideos] = useState([]);
  const [newCurriculumName, setNewCurriculumName] = useState("");
  const [loading, setLoading] = useState(false);
  const [draggedVideo, setDraggedVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      loadCurricula();
    }
  }, [isOpen, category]);

  const loadCurricula = async () => {
    try {
      const data = await curriculumService.getByCategory(category);
      setCurricula(data);
    } catch (err) {
      toast.error("커리큘럼 목록을 불러오는데 실패했습니다");
    }
  };

  const loadCurriculumVideos = async (curriculumId) => {
    try {
      const videos = await videoService.getByCurriculum(curriculumId);
      setCurriculumVideos(videos);
    } catch (err) {
      toast.error("커리큘럼 영상을 불러오는데 실패했습니다");
    }
  };

  const handleCreateCurriculum = async () => {
    if (!newCurriculumName.trim()) {
      toast.error("커리큘럼 이름을 입력해주세요");
      return;
    }

    try {
      setLoading(true);
      const curriculum = await curriculumService.create({
        name: newCurriculumName,
        category,
        description: `${newCurriculumName} 커리큘럼`
      });
      
      setSelectedCurriculum(curriculum);
      setNewCurriculumName("");
      setStep("manage");
      toast.success("커리큘럼이 생성되었습니다");
      loadCurricula();
    } catch (err) {
      toast.error("커리큘럼 생성에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCurriculum = async (curriculum) => {
    setSelectedCurriculum(curriculum);
    await loadCurriculumVideos(curriculum.Id);
    setStep("manage");
  };

  const handleAddVideo = () => {
    navigate(`/upload-video/${category}?curriculumId=${selectedCurriculum.Id}`);
    onClose();
  };

  const handleDragStart = (e, video) => {
    setDraggedVideo(video);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, targetVideo) => {
    e.preventDefault();
    if (!draggedVideo || draggedVideo.Id === targetVideo.Id) return;

    try {
      const newOrder = targetVideo.order;
      await videoService.updateOrder(draggedVideo.Id, newOrder, selectedCurriculum.Id);
      await loadCurriculumVideos(selectedCurriculum.Id);
      toast.success("영상 순서가 변경되었습니다");
    } catch (err) {
      toast.error("순서 변경에 실패했습니다");
    } finally {
      setDraggedVideo(null);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("이 영상을 삭제하시겠습니까?")) return;

    try {
      await videoService.delete(videoId);
      await loadCurriculumVideos(selectedCurriculum.Id);
      toast.success("영상이 삭제되었습니다");
    } catch (err) {
      toast.error("영상 삭제에 실패했습니다");
    }
  };

  const renderSelectStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">커리큘럼 선택 또는 생성</h3>
        
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>새 커리큘럼 만들기</Label>
            <div className="flex gap-2">
              <Input
                placeholder="커리큘럼 이름을 입력하세요"
                value={newCurriculumName}
                onChange={(e) => setNewCurriculumName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCreateCurriculum()}
              />
              <Button 
                onClick={handleCreateCurriculum}
                disabled={loading || !newCurriculumName.trim()}
              >
                생성
              </Button>
            </div>
          </div>

          {curricula.length > 0 && (
            <div className="space-y-2">
              <Label>기존 커리큘럼 선택</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {curricula.map((curriculum) => (
                  <motion.div
                    key={curriculum.Id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSelectCurriculum(curriculum)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{curriculum.name}</h4>
                        <p className="text-sm text-gray-600">{curriculum.description}</p>
                      </div>
                      <ApperIcon name="ChevronRight" size={20} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderManageStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{selectedCurriculum.name}</h3>
          <p className="text-sm text-gray-600">{selectedCurriculum.description}</p>
        </div>
        <Button onClick={() => setStep("select")} variant="ghost">
          <ApperIcon name="ArrowLeft" size={16} />
          뒤로
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">영상 목록 ({curriculumVideos.length}개)</h4>
          <Button onClick={handleAddVideo}>
            <ApperIcon name="Plus" size={16} />
            영상 추가
          </Button>
        </div>

        {curriculumVideos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ApperIcon name="Video" size={48} className="mx-auto mb-2 opacity-50" />
            <p>아직 추가된 영상이 없습니다</p>
            <p className="text-sm">영상을 추가하여 커리큘럼을 구성해보세요</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {curriculumVideos.map((video, index) => (
              <motion.div
                key={video.Id}
                draggable
                onDragStart={(e) => handleDragStart(e, video)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, video)}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:shadow-md"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <ApperIcon name="GripVertical" size={16} className="text-gray-400" />
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-sm truncate">{video.title}</h5>
                    <p className="text-xs text-gray-500 truncate">{video.duration}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/edit-video/${video.Id}`)}
                  >
                    <ApperIcon name="Edit2" size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteVideo(video.Id)}
                  >
                    <ApperIcon name="Trash2" size={14} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold">커리큘럼 관리</h2>
              <p className="text-sm text-gray-600">
                {category === "membership" ? "멤버십" : "마스터"} 강의 커리큘럼
              </p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <ApperIcon name="X" size={20} />
            </Button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {step === "select" && renderSelectStep()}
            {step === "manage" && renderManageStep()}
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose}>
                닫기
              </Button>
              {step === "manage" && (
                <Button onClick={onSuccess}>
                  완료
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CurriculumUploadModal;