import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ title, message, action, icon = "Search" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-full mb-8">
        <ApperIcon name={icon} className="w-16 h-16 text-primary" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
        {title || "콘텐츠가 없습니다"}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md leading-relaxed">
        {message || "아직 등록된 콘텐츠가 없습니다. 첫 번째 콘텐츠를 추가해보세요!"}
      </p>
      
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
        >
          {action.icon && <ApperIcon name={action.icon} className="w-5 h-5" />}
          {action.label}
        </button>
      )}
    </motion.div>
  );
};

export default Empty;