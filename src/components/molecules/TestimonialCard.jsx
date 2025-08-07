import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const TestimonialCard = ({ testimonial, onEdit, onDelete, showActions = false }) => {
  const timeAgo = formatDistanceToNow(new Date(testimonial.createdAt), { 
    addSuffix: true, 
    locale: ko 
  });

  const handleAction = (action) => {
    action();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <img
          src={testimonial.userAvatar}
          alt={testimonial.userName}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900 text-sm">
                {testimonial.userName}
              </h4>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">{timeAgo}</span>
            </div>
            
            {showActions && (
              <div className="flex gap-1">
                <button
                  onClick={() => handleAction(() => onEdit(testimonial.Id))}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  title="수정"
                >
                  <ApperIcon name="Edit" className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => handleAction(() => onDelete(testimonial.Id))}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  title="삭제"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4 text-red-400" />
                </button>
              </div>
            )}
          </div>
          
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {testimonial.content}
          </p>
          
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
            <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
              <ApperIcon name="Heart" className="w-4 h-4" />
              <span className="text-xs">좋아요</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
              <ApperIcon name="MessageCircle" className="w-4 h-4" />
              <span className="text-xs">댓글</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
              <ApperIcon name="Share" className="w-4 h-4" />
              <span className="text-xs">공유</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;