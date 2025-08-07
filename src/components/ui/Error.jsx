import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-full mb-6">
        <ApperIcon name="AlertTriangle" className="w-12 h-12 text-red-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
        문제가 발생했습니다
      </h3>
      
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message || "데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          다시 시도
        </button>
      )}
    </motion.div>
  );
};

export default Error;