import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Error from "@/components/ui/Error";
import Badge from "@/components/atoms/Badge";
import { videoService } from "@/services/api/videoService";

const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const VideoPlayer = ({ videoId: propVideoId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoId = propVideoId || id;
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  const handleEdit = () => {
    if (videoId) {
      navigate(`/edit-video/${videoId}`);
    }
  };

  const loadVideo = async () => {
    if (!videoId) {
      setError("Video ID is required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const videoData = await videoService.getById(videoId);
      setVideo(videoData);
      
      // Load related videos from the same category
      if (videoData?.category) {
        const allVideos = await videoService.getByCategory(videoData.category);
        const related = allVideos.filter(v => v.Id !== parseInt(videoId)).slice(0, 5);
        setRelatedVideos(related);
      }
    } catch (err) {
      console.error('Failed to load video:', err);
      setError(err.message || 'Failed to load video');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideo();
  }, [videoId]);

const getRoleBadgeColor = (roles) => {
    if (!roles || !Array.isArray(roles)) return "default";
    if (roles.includes("free")) return "success";
    if (roles.includes("master")) return "primary";
    if (roles.includes("member")) return "secondary";
    return "default";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!video) {
    return <Error message="비디오를 찾을 수 없습니다." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
<div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Main Video Section */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Edit Button */}
            <div className="mb-6 relative">
              <div className="absolute top-0 right-0 z-10">
                <button
                  onClick={handleEdit}
                  className="bg-white bg-opacity-90 hover:bg-white p-3 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 text-gray-700 hover:text-primary"
                  title="동영상 수정"
                >
                  <ApperIcon name="Edit" className="w-4 h-4" />
                  <span className="text-sm font-medium">수정</span>
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={video?.videoUrl || ''}
                title={video?.title || 'Video'}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {video?.title || 'Untitled Video'}
                </h1>
                
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant={getRoleBadgeColor(video?.allowedRoles)}>
                    {video?.allowedRoles?.includes("free") ? "무료" : 
                     video?.allowedRoles?.includes("master") ? "마스터" : "멤버"}
                  </Badge>
{video?.isPinned && (
                    <Badge variant="warning">
                      <ApperIcon name="Pin" className="w-3 h-3 mr-1" />
                      고정
                    </Badge>
                  )}
                  
                  {video?.duration && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <ApperIcon name="Clock" className="w-4 h-4" />
                      <span className="text-sm">{formatDuration(video.duration)}</span>
                    </div>
                  )}
                  
                  {video?.createdAt && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <ApperIcon name="Calendar" className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(video.createdAt).toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
{video?.description && (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {video.description}
                  </p>
                </div>
              )}
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                  <ApperIcon name="ThumbsUp" className="w-4 h-4" />
                  <span className="text-sm font-medium">좋아요</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                  <ApperIcon name="Share" className="w-4 h-4" />
                  <span className="text-sm font-medium">공유</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                  <ApperIcon name="Bookmark" className="w-4 h-4" />
                  <span className="text-sm font-medium">저장</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Videos Sidebar */}
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <div className="sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              관련 강의
            </h3>
            
<div className="space-y-4">
              {relatedVideos.length > 0 ? relatedVideos.map((relatedVideo) => (
                <motion.div
                  key={relatedVideo?.Id || Math.random()}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => navigate(`/video/${relatedVideo?.Id}`)}
                >
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={relatedVideo?.thumbnailUrl || '/placeholder-video.jpg'}
                      alt={relatedVideo?.title || 'Related Video'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/placeholder-video.jpg';
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-gray-900 text-sm leading-snug line-clamp-2 mb-2">
                      {relatedVideo?.title || 'Untitled Video'}
                    </h4>
                    <div className="flex items-center justify-between">
                      {relatedVideo?.duration && (
                        <span className="text-xs text-gray-500">
                          {formatDuration(relatedVideo.duration)}
                        </span>
                      )}
                      <Badge variant={getRoleBadgeColor(relatedVideo?.allowedRoles)} className="text-xs">
                        {relatedVideo?.allowedRoles?.includes("free") ? "무료" : 
                         relatedVideo?.allowedRoles?.includes("master") ? "마스터" : "멤버"}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <p>관련 강의가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;