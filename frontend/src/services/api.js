// API Service Client for Online Learning Platform
const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMsg = 'An unexpected error occurred';
    try {
      const errorData = await response.json();
      errorMsg = errorData.error || errorData.message || errorMsg;
    } catch {
      // response wasn't JSON
    }
    throw new Error(errorMsg);
  }
  return response.json();
};

export const authAPI = {
  login: async (username, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return handleResponse(res);
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(res);
  },

  getCurrentUser: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  }
};

export const coursesAPI = {
  getAll: async (category = '', search = '') => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);

    const url = `${API_BASE_URL}/courses${params.toString() ? `?${params.toString()}` : ''}`;
    const res = await fetch(url, { headers: getAuthHeaders() });
    return handleResponse(res);
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/courses/${id}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  getLessons: async (courseId) => {
    const res = await fetch(`${API_BASE_URL}/courses/${courseId}/lessons`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  create: async (courseData) => {
    const res = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData)
    });
    return handleResponse(res);
  }
};

export const enrollmentAPI = {
  enroll: async (courseId) => {
    const res = await fetch(`${API_BASE_URL}/enrollments/enroll/${courseId}`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  getMyCourses: async () => {
    const res = await fetch(`${API_BASE_URL}/enrollments/my-courses`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  completeLesson: async (lessonId) => {
    const res = await fetch(`${API_BASE_URL}/enrollments/lessons/${lessonId}/complete`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  getCompletedLessons: async (courseId) => {
    const res = await fetch(`${API_BASE_URL}/enrollments/course/${courseId}/completed-lessons`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  }
};

export const quizAPI = {
  getByCourse: async (courseId) => {
    const res = await fetch(`${API_BASE_URL}/quizzes/course/${courseId}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  submit: async (quizId, answers) => {
    const res = await fetch(`${API_BASE_URL}/quizzes/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ quizId, answers })
    });
    return handleResponse(res);
  },

  getMyResults: async () => {
    const res = await fetch(`${API_BASE_URL}/quizzes/my-results`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  }
};

export const dashboardAPI = {
  getStats: async () => {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  }
};
