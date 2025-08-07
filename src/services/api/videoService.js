// ApperClient will be initialized in each method to avoid timing issues with SDK loading

export const videoService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "thumbnailUrl" } },
          { field: { Name: "videoUrl" } },
          { field: { Name: "category" } },
          { field: { Name: "allowedRoles" } },
          { field: { Name: "isPinned" } },
          { field: { Name: "curriculumId" } },
          { field: { Name: "order" } },
          { field: { Name: "duration" } },
          { field: { Name: "createdAt" } }
        ],
        orderBy: [
          { fieldName: "isPinned", sorttype: "DESC" },
          { fieldName: "createdAt", sorttype: "DESC" }
        ]
      };
      
const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      const response = await apperClient.fetchRecords("video", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching videos:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "thumbnailUrl" } },
          { field: { Name: "videoUrl" } },
          { field: { Name: "category" } },
          { field: { Name: "allowedRoles" } },
          { field: { Name: "isPinned" } },
          { field: { Name: "curriculumId" } },
          { field: { Name: "order" } },
          { field: { Name: "duration" } },
          { field: { Name: "createdAt" } }
        ]
      };
      
const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      const response = await apperClient.getRecordById("video", parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching video with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getByCategory(category) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "thumbnailUrl" } },
          { field: { Name: "videoUrl" } },
          { field: { Name: "category" } },
          { field: { Name: "allowedRoles" } },
          { field: { Name: "isPinned" } },
          { field: { Name: "curriculumId" } },
          { field: { Name: "order" } },
          { field: { Name: "duration" } },
          { field: { Name: "createdAt" } }
        ],
        where: [
          {
            FieldName: "category",
            Operator: "EqualTo",
            Values: [category]
          }
        ],
        orderBy: [
          { fieldName: "isPinned", sorttype: "DESC" },
          { fieldName: "createdAt", sorttype: "DESC" }
        ]
      };
      
const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      const response = await apperClient.fetchRecords("video", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching videos by category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getByCurriculum(curriculumId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "thumbnailUrl" } },
          { field: { Name: "videoUrl" } },
          { field: { Name: "category" } },
          { field: { Name: "allowedRoles" } },
          { field: { Name: "isPinned" } },
          { field: { Name: "curriculumId" } },
          { field: { Name: "order" } },
          { field: { Name: "duration" } },
          { field: { Name: "createdAt" } }
        ],
        where: [
          {
            FieldName: "curriculumId",
            Operator: "EqualTo",
            Values: [curriculumId]
          }
        ],
        orderBy: [
          { fieldName: "order", sorttype: "ASC" }
        ]
      };
      
      const response = await apperClient.fetchRecords("video", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching videos by curriculum:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async create(videoData) {
    try {
      // Only include updateable fields
      const updateableData = {
        Name: videoData.title || videoData.Name,
        Tags: videoData.Tags || "",
        title: videoData.title,
        description: videoData.description,
        thumbnailUrl: videoData.thumbnailUrl,
        videoUrl: videoData.videoUrl,
        category: videoData.category,
        allowedRoles: Array.isArray(videoData.allowedRoles) ? videoData.allowedRoles.join(",") : videoData.allowedRoles,
        isPinned: videoData.isPinned || false,
        curriculumId: videoData.curriculumId,
        order: videoData.order || 1,
        duration: videoData.duration,
        createdAt: new Date().toISOString()
      };
      
      const params = {
        records: [updateableData]
      };
      
const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      const response = await apperClient.createRecord("video", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create videos ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating video:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async update(id, videoData) {
    try {
      // Only include updateable fields
      const updateableData = {
        Id: parseInt(id),
        Name: videoData.title || videoData.Name,
        Tags: videoData.Tags || "",
        title: videoData.title,
        description: videoData.description,
        thumbnailUrl: videoData.thumbnailUrl,
        videoUrl: videoData.videoUrl,
        category: videoData.category,
        allowedRoles: Array.isArray(videoData.allowedRoles) ? videoData.allowedRoles.join(",") : videoData.allowedRoles,
        isPinned: videoData.isPinned,
        curriculumId: videoData.curriculumId,
        order: videoData.order,
        duration: videoData.duration,
        createdAt: videoData.createdAt
      };
      
      const params = {
        records: [updateableData]
      };
      
const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      const response = await apperClient.updateRecord("video", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update videos ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating video:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async updateOrder(videoId, newOrder, curriculumId) {
    try {
      const updateData = {
        Id: parseInt(videoId),
        order: newOrder
      };
      
      if (curriculumId) {
        updateData.curriculumId = curriculumId;
      }
      
      return await this.update(videoId, updateData);
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating video order:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      const response = await apperClient.deleteRecord("video", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete videos ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting video:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async togglePin(id) {
    try {
      // First get the current video to toggle the pin status
      const video = await this.getById(id);
      
      const updatedData = {
        ...video,
        isPinned: !video.isPinned
      };
      
      return await this.update(id, updatedData);
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error toggling video pin:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
};