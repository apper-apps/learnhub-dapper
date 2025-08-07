import { useParams } from "react-router-dom";
import VideoPlayer from "@/components/organisms/VideoPlayer";
const VideoPlayerPage = () => {
const { id } = useParams();
  
  return <VideoPlayer videoId={id} />;
};

export default VideoPlayerPage;