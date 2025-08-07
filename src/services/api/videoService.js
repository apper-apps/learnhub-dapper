import videosData from "@/services/mockData/videos.json";

let videos = [...videosData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const videoService = {
  async getAll() {
    await delay();
    return [...videos].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  },

  async getById(id) {
    await delay();
    const video = videos.find(v => v.Id === parseInt(id));
    if (!video) throw new Error("Video not found");
    return { ...video };
  },

  async getByCategory(category) {
    await delay();
    return [...videos]
      .filter(video => video.category === category)
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  },

  async getByCurriculum(curriculumId) {
    await delay();
    return [...videos]
      .filter(video => video.curriculumId === curriculumId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async create(videoData) {
    await delay();
    const highestId = Math.max(...videos.map(v => v.Id), 0);
    const newVideo = {
      ...videoData,
      Id: highestId + 1,
      createdAt: new Date().toISOString()
    };
    videos.push(newVideo);
    return { ...newVideo };
  },

  async update(id, videoData) {
    await delay();
    const index = videos.findIndex(v => v.Id === parseInt(id));
    if (index === -1) throw new Error("Video not found");
    
    videos[index] = { ...videos[index], ...videoData };
    return { ...videos[index] };
  },

  async updateOrder(videoId, newOrder, curriculumId) {
    await delay();
    const video = videos.find(v => v.Id === parseInt(videoId));
    if (!video) throw new Error("Video not found");
    
    video.order = newOrder;
    if (curriculumId) video.curriculumId = curriculumId;
    
    return { ...video };
  },

  async delete(id) {
    await delay();
    const index = videos.findIndex(v => v.Id === parseInt(id));
    if (index === -1) throw new Error("Video not found");
    
    videos.splice(index, 1);
    return true;
  },

  async togglePin(id) {
    await delay();
    const video = videos.find(v => v.Id === parseInt(id));
    if (!video) throw new Error("Video not found");
    
    video.isPinned = !video.isPinned;
    return { ...video };
  }
};