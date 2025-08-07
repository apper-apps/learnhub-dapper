import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import VideoThumbnail from "@/components/molecules/VideoThumbnail";
import ArticleCard from "@/components/molecules/ArticleCard";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import ApperIcon from "@/components/ApperIcon";
import { videoService } from "@/services/api/videoService";
import { articleService } from "@/services/api/articleService";

const HomePage = () => {
  const [featuredVideos, setFeaturedVideos] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedContent = async () => {
      try {
        const [videos, articles] = await Promise.all([
          videoService.getAll(),
          articleService.getAll()
        ]);
        
        setFeaturedVideos(videos.slice(0, 6));
        setFeaturedArticles(articles.slice(0, 4));
      } catch (err) {
        console.error("Error loading featured content:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedContent();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              배움의 새로운 시작
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                LearnHub Pro
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed">
              전문가가 엄선한 고품질 강의로 당신의 꿈을 현실로 만들어보세요. 
              체계적인 커리큘럼과 실무 중심의 학습으로 전문가가 되는 여정을 함께합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                className="bg-white text-primary hover:bg-gray-50 hover:shadow-xl"
              >
                <ApperIcon name="Play" className="w-5 h-5" />
                강의 둘러보기
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <ApperIcon name="Star" className="w-5 h-5" />
                무료 체험하기
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 LearnHub Pro인가요?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              단계별 맞춤 학습 시스템으로 초보자부터 전문가까지 모든 레벨을 지원합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "GraduationCap",
                title: "체계적인 커리큘럼",
                description: "전문가가 설계한 단계별 학습 과정으로 확실한 실력 향상을 보장합니다"
              },
              {
                icon: "Users",
                title: "등급별 맞춤 학습",
                description: "5단계 등급 시스템으로 개인 수준에 맞는 최적화된 학습 경험을 제공합니다"
              },
              {
                icon: "Trophy",
                title: "실무 중심 교육",
                description: "이론보다는 실제 현업에서 사용하는 실무 스킬 위주의 실용적인 교육 과정"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl w-fit mb-6">
                  <ApperIcon name={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                인기 강의
              </h2>
              <p className="text-xl text-gray-600">
                가장 많이 수강하는 베스트 강의들을 만나보세요
              </p>
            </div>
            <Link to="/membership">
              <Button variant="outline">
                전체 보기
                <ApperIcon name="ArrowRight" className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {featuredVideos.map((video) => (
              <motion.div
                key={video.Id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <VideoThumbnail video={video} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                최신 인사이트
              </h2>
              <p className="text-xl text-gray-600">
                업계 전문가들이 공유하는 최신 트렌드와 인사이트
              </p>
            </div>
            <Link to="/insights">
              <Button variant="outline">
                전체 보기
                <ApperIcon name="ArrowRight" className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {featuredArticles.map((article) => (
              <motion.div
                key={article.Id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              지금 바로 시작해보세요
            </h2>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              수천 명의 학습자가 이미 LearnHub Pro와 함께 꿈을 실현하고 있습니다. 
              당신도 오늘부터 새로운 도전을 시작해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                className="bg-white text-primary hover:bg-gray-50"
              >
                <ApperIcon name="Rocket" className="w-5 h-5" />
                멤버십 가입하기
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <ApperIcon name="MessageCircle" className="w-5 h-5" />
                상담받기
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;