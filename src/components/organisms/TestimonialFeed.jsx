import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/molecules/TestimonialCard";
import Button from "@/components/atoms/Button";
import Textarea from "@/components/atoms/Textarea";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { testimonialService } from "@/services/api/testimonialService";

const TestimonialFeed = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newContent, setNewContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const maxLength = 500;

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await testimonialService.getAll();
      setTestimonials(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleSubmit = async () => {
    if (!newContent.trim()) return;
    if (newContent.length > maxLength) return;

    try {
      setIsSubmitting(true);
      await testimonialService.create({
        userId: "current-user",
        userName: "김학습자",
        userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80",
        content: newContent.trim()
      });
      
      setNewContent("");
      toast.success("후기가 등록되었습니다");
      loadTestimonials();
    } catch (err) {
      toast.error("등록 중 오류가 발생했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (testimonialId) => {
    const testimonial = testimonials.find(t => t.Id === testimonialId);
    if (testimonial) {
      setEditingId(testimonialId);
      setEditContent(testimonial.content);
    }
  };

  const handleEditSubmit = async () => {
    if (!editContent.trim() || editContent.length > maxLength) return;

    try {
      await testimonialService.update(editingId, {
        content: editContent.trim()
      });
      
      setEditingId(null);
      setEditContent("");
      toast.success("후기가 수정되었습니다");
      loadTestimonials();
    } catch (err) {
      toast.error("수정 중 오류가 발생했습니다");
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditContent("");
  };

  const handleDelete = async (testimonialId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await testimonialService.delete(testimonialId);
        toast.success("후기가 삭제되었습니다");
        loadTestimonials();
      } catch (err) {
        toast.error("삭제 중 오류가 발생했습니다");
      }
    }
  };

  if (loading) return <Loading type="feed" />;
  if (error) return <Error message={error} onRetry={loadTestimonials} />;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* New Post Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
      >
        <div className="flex items-start gap-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <Textarea
              placeholder="도전 후기를 공유해주세요..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={3}
              className="resize-none border-0 focus:ring-0 text-lg placeholder:text-gray-400"
              maxLength={maxLength}
            />
            <div className="flex items-center justify-between mt-3">
              <span className={`text-sm ${newContent.length > maxLength * 0.9 ? 'text-red-500' : 'text-gray-500'}`}>
                {newContent.length}/{maxLength}
              </span>
              <Button
                onClick={handleSubmit}
                disabled={!newContent.trim() || newContent.length > maxLength || isSubmitting}
                size="sm"
              >
                {isSubmitting ? (
                  <>
                    <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                    게시 중...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Send" className="w-4 h-4" />
                    게시하기
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials */}
      {testimonials.length === 0 ? (
        <Empty
          title="아직 도전 후기가 없습니다"
          message="첫 번째 후기를 작성하여 다른 학습자들과 경험을 공유해보세요!"
          icon="MessageCircle"
        />
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.Id}>
              {editingId === testimonial.Id ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={testimonial.userAvatar}
                      alt={testimonial.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={3}
                        className="resize-none"
                        maxLength={maxLength}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-sm ${editContent.length > maxLength * 0.9 ? 'text-red-500' : 'text-gray-500'}`}>
                          {editContent.length}/{maxLength}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleEditCancel}
                          >
                            취소
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleEditSubmit}
                            disabled={!editContent.trim() || editContent.length > maxLength}
                          >
                            저장
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <TestimonialCard
                  testimonial={testimonial}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showActions={true}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialFeed;