const delay = () => new Promise(resolve => setTimeout(resolve, 500));

// Mock curricula data
let curricula = [
  {
    Id: 1,
    name: "React 기초 과정",
    description: "React 개발의 기초부터 중급까지",
    category: "membership",
    createdAt: "2024-01-15T09:00:00Z"
  },
  {
    Id: 2,
    name: "고급 React 패턴",
    description: "React의 고급 패턴과 아키텍처",
    category: "master",
    createdAt: "2024-02-01T11:00:00Z"
  }
];

export const curriculumService = {
  async getAll() {
    await delay();
    return [...curricula].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getById(id) {
    await delay();
    const curriculum = curricula.find(c => c.Id === parseInt(id));
    if (!curriculum) throw new Error("Curriculum not found");
    return { ...curriculum };
  },

  async getByCategory(category) {
    await delay();
    return [...curricula]
      .filter(curriculum => curriculum.category === category)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async create(curriculumData) {
    await delay();
    const highestId = Math.max(...curricula.map(c => c.Id), 0);
    const newCurriculum = {
      ...curriculumData,
      Id: highestId + 1,
      createdAt: new Date().toISOString()
    };
    curricula.push(newCurriculum);
    return { ...newCurriculum };
  },

  async update(id, curriculumData) {
    await delay();
    const index = curricula.findIndex(c => c.Id === parseInt(id));
    if (index === -1) throw new Error("Curriculum not found");
    
    curricula[index] = { ...curricula[index], ...curriculumData };
    return { ...curricula[index] };
  },

  async delete(id) {
    await delay();
    const index = curricula.findIndex(c => c.Id === parseInt(id));
    if (index === -1) throw new Error("Curriculum not found");
    
    curricula.splice(index, 1);
    return true;
  }
};