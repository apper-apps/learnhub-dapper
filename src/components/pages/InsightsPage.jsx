import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ArticleCard from "@/components/molecules/ArticleCard";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { articleService } from "@/services/api/articleService";

const InsightsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articleService.getAll();
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleUpload = () => {
    navigate("/upload-article");
  };

  const handleEdit = (articleId) => {
    navigate(`/edit-article/${articleId}`);
  };

  const handleDelete = async (articleId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await articleService.delete(articleId);
        toast.success("글이 삭제되었습니다");
        loadArticles();
      } catch (err) {
        toast.error("삭제 중 오류가 발생했습니다");
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadArticles} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">인사이트</h1>
            <p className="text-gray-600 mt-2">
              업계 전문가들이 공유하는 최신 트렌드와 실무 노하우를 만나보세요
            </p>
          </div>
          <Button
            onClick={handleUpload}
            className="shrink-0"
            size="lg"
          >
            <ApperIcon name="PenTool" className="w-5 h-5" />
            글 작성
          </Button>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <Empty
            title="아직 인사이트 글이 없습니다"
            message="첫 번째 인사이트 글을 작성하여 지식을 공유해보세요!"
            action={{
              label: "글 작성",
              icon: "PenTool",
              onClick: handleUpload
            }}
          />
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {articles.map((article) => (
              <motion.div
                key={article.Id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <ArticleCard
                  article={article}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showActions={true}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InsightsPage;