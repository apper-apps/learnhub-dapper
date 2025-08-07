import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const VideoThumbnail = ({ video, onEdit, onPin, onDelete, showActions = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video.Id}`);
  };

  const formatDuration = (duration) => {
    return duration || "00:00";
  };

  const getRoleBadgeColor = (roles) => {
    if (roles.includes("free")) return "success";
    if (roles.includes("master")) return "primary";
    if (roles.includes("member")) return "secondary";
    return "default";
  };

  const handleAction = (e, action) => {
    e.stopPropagation();
    action();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative group">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              className="bg-white bg-opacity-90 rounded-full p-3"
            >
              <ApperIcon name="Play" className="w-8 h-8 text-primary" />
            </motion.div>
          </div>
        </div>
        
        <div className="absolute top-3 right-3 flex gap-2">
          {video.isPinned && (
            <Badge variant="warning" className="text-xs">
              <ApperIcon name="Pin" className="w-3 h-3 mr-1" />
              고정
            </Badge>
          )}
          <Badge variant={getRoleBadgeColor(video.allowedRoles)} className="text-xs">
            {video.allowedRoles.includes("free") ? "무료" : 
             video.allowedRoles.includes("master") ? "마스터" : "멤버"}
          </Badge>
        </div>

        <div className="absolute bottom-3 right-3">
          <Badge variant="default" className="bg-black bg-opacity-70 text-white text-xs">
            {formatDuration(video.duration)}
          </Badge>
        </div>

        {showActions && (
          <div className="absolute top-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => handleAction(e, () => onPin(video.Id))}
              className="bg-white bg-opacity-90 hover:bg-white p-2 rounded-full transition-colors"
              title="고정/해제"
            >
              <ApperIcon name="Pin" className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={(e) => handleAction(e, () => onEdit(video.Id))}
              className="bg-white bg-opacity-90 hover:bg-white p-2 rounded-full transition-colors"
              title="수정"
            >
              <ApperIcon name="Edit" className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={(e) => handleAction(e, () => onDelete(video.Id))}
              className="bg-white bg-opacity-90 hover:bg-white p-2 rounded-full transition-colors"
              title="삭제"
            >
              <ApperIcon name="Trash2" className="w-4 h-4 text-red-500" />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 leading-snug">
          {video.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {video.description}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {new Date(video.createdAt).toLocaleDateString("ko-KR")}
          </span>
          <div className="flex items-center gap-2">
            <ApperIcon name="Users" className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">{video.allowedRoles.length}개 등급</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoThumbnail;