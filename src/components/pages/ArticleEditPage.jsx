import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import FormField from "@/components/molecules/FormField";
import RoleCheckboxes from "@/components/molecules/RoleCheckboxes";
import Button from "@/components/atoms/Button";
import Textarea from "@/components/atoms/Textarea";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { articleService } from "@/services/api/articleService";

const ArticleEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnailUrl: "",
    allowedRoles: ["free"]
  });

  const loadArticle = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articleService.getById(id);
      setArticle(data);
      setFormData({
        title: data.title,
        content: data.content,
        thumbnailUrl: data.thumbnailUrl,
        allowedRoles: data.allowedRoles
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticle();
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const insertFormatting = (format) => {
    const textarea = document.getElementById("content");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    
    let formattedText = "";
    let cursorOffset = 0;

    switch (format) {
      case "bold":
        formattedText = `<strong>${selectedText}</strong>`;
        cursorOffset = selectedText ? 0 : 8;
        break;
      case "italic":
        formattedText = `<em>${selectedText}</em>`;
        cursorOffset = selectedText ? 0 : 4;
        break;
      case "h2":
        formattedText = `<h2>${selectedText}</h2>`;
        cursorOffset = selectedText ? 0 : 4;
        break;
      case "h3":
        formattedText = `<h3>${selectedText}</h3>`;
        cursorOffset = selectedText ? 0 : 4;
        break;
      case "ul":
        formattedText = `<ul><li>${selectedText}</li></ul>`;
        cursorOffset = selectedText ? 0 : 4;
        break;
      case "blockquote":
        formattedText = `<blockquote>${selectedText}</blockquote>`;
        cursorOffset = selectedText ? 0 : 12;
        break;
      case "code":
        formattedText = `<code>${selectedText}</code>`;
        cursorOffset = selectedText ? 0 : 6;
        break;
      default:
        return;
    }

    const newContent = 
      formData.content.substring(0, start) + 
      formattedText + 
      formData.content.substring(end);
    
    setFormData(prev => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + formattedText.length - cursorOffset,
        start + formattedText.length - cursorOffset
      );
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("제목과 내용을 모두 입력해주세요");
      return;
    }

    try {
      setIsSubmitting(true);
      await articleService.update(id, formData);
      
      toast.success("글이 성공적으로 수정되었습니다");
      navigate("/insights");
    } catch (err) {
      toast.error("수정 중 오류가 발생했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/insights");
  };

  if (loading) return <Loading type="player" />;
  if (error) return <Error message={error} onRetry={loadArticle} />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 md:p-8"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            글 수정
          </h1>
          <p className="text-gray-600">
            내용을 수정하여 더 나은 정보를 제공해보세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="제목"
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="글 제목을 입력해주세요"
            required
          />

          <FormField
            label="썸네일 이미지 URL"
            type="url"
            value={formData.thumbnailUrl}
            onChange={(e) => handleInputChange("thumbnailUrl", e.target.value)}
            placeholder="https://example.com/image.jpg"
          />

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              내용
            </label>
            
            {/* Formatting Toolbar */}
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
              <button
                type="button"
                onClick={() => insertFormatting("h2")}
                className="px-3 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <ApperIcon name="Heading2" className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("h3")}
                className="px-3 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <ApperIcon name="Heading3" className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("bold")}
                className="px-3 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors font-bold"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("italic")}
                className="px-3 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors italic"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("ul")}
                className="px-3 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <ApperIcon name="List" className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("blockquote")}
                className="px-3 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <ApperIcon name="Quote" className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("code")}
                className="px-3 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <ApperIcon name="Code" className="w-4 h-4" />
              </button>
            </div>

            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="내용을 입력해주세요. HTML 태그를 사용할 수 있습니다."
              rows={15}
              className="font-mono text-sm"
              required
            />
            
            <p className="text-xs text-gray-500">
              HTML 태그를 사용하여 텍스트를 포맷할 수 있습니다. 위 툴바 버튼을 사용하거나 직접 입력하세요.
            </p>
          </div>

          <RoleCheckboxes
            selectedRoles={formData.allowedRoles}
            onChange={(roles) => handleInputChange("allowedRoles", roles)}
          />

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                  수정 중...
                </>
              ) : (
                <>
                  <ApperIcon name="Save" className="w-4 h-4" />
                  수정 완료
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ArticleEditPage;