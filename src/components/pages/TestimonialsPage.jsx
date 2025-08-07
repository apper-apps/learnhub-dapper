import TestimonialFeed from "@/components/organisms/TestimonialFeed";

const TestimonialsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">도전 후기</h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          LearnHub Pro와 함께한 학습자들의 생생한 도전 후기를 확인해보세요. 
          당신도 성공 스토리의 주인공이 될 수 있습니다!
        </p>
      </div>
      <TestimonialFeed />
    </div>
  );
};

export default TestimonialsPage;