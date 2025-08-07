import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const ArticleCard = ({ article, onEdit, onDelete, showActions = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article.Id}`);
  };

  const getRoleBadgeColor = (roles) => {
    if (roles.includes("free")) return "success";
    if (roles.includes("master")) return "primary";
    if (roles.includes("member")) return "secondary";
    return "default";
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
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
            src={article.thumbnailUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        <div className="absolute top-3 right-3">
          <Badge variant={getRoleBadgeColor(article.allowedRoles)} className="text-xs">
            {article.allowedRoles.includes("free") ? "무료" : 
             article.allowedRoles.includes("master") ? "마스터" : "멤버"}
          </Badge>
        </div>

        {showActions && (
          <div className="absolute top-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => handleAction(e, () => onEdit(article.Id))}
              className="bg-white bg-opacity-90 hover:bg-white p-2 rounded-full transition-colors"
              title="수정"
            >
              <ApperIcon name="Edit" className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={(e) => handleAction(e, () => onDelete(article.Id))}
              className="bg-white bg-opacity-90 hover:bg-white p-2 rounded-full transition-colors"
              title="삭제"
            >
              <ApperIcon name="Trash2" className="w-4 h-4 text-red-500" />
            </button>
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-bold text-white text-lg leading-tight line-clamp-2 drop-shadow-lg">
            {article.title}
          </h3>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-3">
          {stripHtml(article.content)}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500 flex items-center gap-2">
            <ApperIcon name="Calendar" className="w-4 h-4" />
            {new Date(article.publishedAt).toLocaleDateString("ko-KR")}
          </span>
          <div className="flex items-center gap-2">
            <ApperIcon name="Users" className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">{article.allowedRoles.length}개 등급</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;