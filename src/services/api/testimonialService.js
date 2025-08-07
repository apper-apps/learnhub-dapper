import testimonialsData from "@/services/mockData/testimonials.json";

let testimonials = [...testimonialsData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const testimonialService = {
  async getAll() {
    await delay();
    return [...testimonials].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getById(id) {
    await delay();
    const testimonial = testimonials.find(t => t.Id === parseInt(id));
    if (!testimonial) throw new Error("Testimonial not found");
    return { ...testimonial };
  },

  async create(testimonialData) {
    await delay();
    const highestId = Math.max(...testimonials.map(t => t.Id), 0);
    const newTestimonial = {
      ...testimonialData,
      Id: highestId + 1,
      createdAt: new Date().toISOString()
    };
    testimonials.push(newTestimonial);
    return { ...newTestimonial };
  },

  async update(id, testimonialData) {
    await delay();
    const index = testimonials.findIndex(t => t.Id === parseInt(id));
    if (index === -1) throw new Error("Testimonial not found");
    
    testimonials[index] = { ...testimonials[index], ...testimonialData };
    return { ...testimonials[index] };
  },

  async delete(id) {
    await delay();
    const index = testimonials.findIndex(t => t.Id === parseInt(id));
    if (index === -1) throw new Error("Testimonial not found");
    
    testimonials.splice(index, 1);
    return true;
  }
};