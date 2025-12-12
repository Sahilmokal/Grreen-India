import axios from 'axios';

// Base API URL - pointing to backend
const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Upload a photo to get eco suggestions
 * @param {FormData} formData - Form data containing the image file and userId
 * @returns {Promise} - Response with photoId, detections, and suggestions
 */
export const uploadPhoto = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};

/**
 * Send feedback for a suggestion
 * @param {Object} feedbackPayload - { photoId, suggestionId, userId, feedback }
 * @returns {Promise} - Response confirming feedback submission
 */
export const sendFeedback = async (feedbackPayload) => {
  try {
    const response = await apiClient.post('/feedback', feedbackPayload);
    return response.data;
  } catch (error) {
    console.error('Error sending feedback:', error);
    throw error;
  }
};

export default apiClient;
