import { motion } from "framer-motion"

const Loading = ({ type = "grid" }) => {
  if (type === "video") {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4"
          >
            <div className="w-48 h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-full" />
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-2/3" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "player") {
    return (
      <div className="space-y-6">
        <div className="aspect-video bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
        <div className="space-y-3">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-2/3" />
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-full" />
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4" />
        </div>
      </div>
    );
  }

  if (type === "feed") {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
              <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-32" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-full" />
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-1/2" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-xl overflow-hidden shadow-sm"
        >
          <div className="aspect-video bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-full" />
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-2/3" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;