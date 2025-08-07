import VideoGallery from "@/components/organisms/VideoGallery";

const MasterPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <VideoGallery category="master" title="마스터 클래스" />
    </div>
  );
};

export default MasterPage;