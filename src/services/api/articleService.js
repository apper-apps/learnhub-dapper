import articlesData from "@/services/mockData/articles.json";

let articles = [...articlesData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const articleService = {
  async getAll() {
    await delay();
    return [...articles].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  },

  async getById(id) {
    await delay();
    const article = articles.find(a => a.Id === parseInt(id));
    if (!article) throw new Error("Article not found");
    return { ...article };
  },

  async create(articleData) {
    await delay();
    const highestId = Math.max(...articles.map(a => a.Id), 0);
    const newArticle = {
      ...articleData,
      Id: highestId + 1,
      publishedAt: new Date().toISOString()
    };
    articles.push(newArticle);
    return { ...newArticle };
  },

  async update(id, articleData) {
    await delay();
    const index = articles.findIndex(a => a.Id === parseInt(id));
    if (index === -1) throw new Error("Article not found");
    
    articles[index] = { ...articles[index], ...articleData };
    return { ...articles[index] };
  },

  async delete(id) {
    await delay();
    const index = articles.findIndex(a => a.Id === parseInt(id));
    if (index === -1) throw new Error("Article not found");
    
    articles.splice(index, 1);
    return true;
  }
};