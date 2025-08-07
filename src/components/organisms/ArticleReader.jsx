import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { articleService } from "@/services/api/articleService";

const ArticleReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadArticle = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articleService.getById(id);
      setArticle(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticle();
  }, [id]);

  const getRoleBadgeColor = (roles) => {
    if (roles.includes("free")) return "success";
    if (roles.includes("master")) return "primary";
    if (roles.includes("member")) return "secondary";
    return "default";
  };

  if (loading) return <Loading type="player" />;
  if (error) return <Error message={error} onRetry={loadArticle} />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl overflow-hidden shadow-lg"
      >
        {/* Header Image */}
        <div className="aspect-video md:aspect-[2/1] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/insights")}
            className="mb-6"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            인사이트로 돌아가기
          </Button>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <ApperIcon name="Calendar" className="w-4 h-4" />
                <span className="text-sm">
                  {new Date(article.publishedAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </span>
              </div>
              
              <Badge variant={getRoleBadgeColor(article.allowedRoles)}>
                {article.allowedRoles.includes("free") ? "무료" : 
                 article.allowedRoles.includes("master") ? "마스터" : "멤버"}
              </Badge>

              <div className="flex items-center gap-2">
                <ApperIcon name="Users" className="w-4 h-4" />
                <span className="text-sm">{article.allowedRoles.length}개 등급 접근 가능</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-8 mt-8 border-t border-gray-200">
            <Button variant="ghost" size="sm">
              <ApperIcon name="ThumbsUp" className="w-4 h-4" />
              좋아요
            </Button>
            <Button variant="ghost" size="sm">
              <ApperIcon name="Share" className="w-4 h-4" />
              공유
            </Button>
            <Button variant="ghost" size="sm">
              <ApperIcon name="Bookmark" className="w-4 h-4" />
              저장
            </Button>
            <Button variant="ghost" size="sm">
              <ApperIcon name="MessageCircle" className="w-4 h-4" />
              댓글
            </Button>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default ArticleReader;