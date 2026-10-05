const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// In-memory token storage (with fallback to sessionStorage for browser refresh, NO localStorage)
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
  if (token) {
    try {
      sessionStorage.setItem('hza_admin_token', token);
    } catch {
      // ignore
    }
  } else {
    try {
      sessionStorage.removeItem('hza_admin_token');
    } catch {
      // ignore
    }
  }
};

export const getAuthToken = () => {
  if (authToken) return authToken;
  try {
    const saved = sessionStorage.getItem('hza_admin_token');
    if (saved) {
      authToken = saved;
      return saved;
    }
  } catch {
    // ignore
  }
  return null;
};

export const clearAuthToken = () => {
  setAuthToken(null);
};

// Generic fetch wrapper with auth header
async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearAuthToken();
    window.dispatchEvent(new CustomEvent('auth:expired'));
    throw new Error('Sesi login telah berakhir. Silakan login kembali.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Terjadi kesalahan pada server');
  }

  return data;
}

// ─── Auth API ───
export const apiLogin = async (username, password) => {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
};

// ─── Personal Info API ───
export const getPersonalInfo = () => request('/data/personal-info');
export const updatePersonalInfo = (data) =>
  request('/data/personal-info', {
    method: 'PUT',
    body: JSON.stringify(data),
  });

// ─── Experiences API ───
export const getExperiences = () => request('/data/experiences');
export const createExperience = (data) =>
  request('/data/experiences', {
    method: 'POST',
    body: JSON.stringify(data),
  });
export const updateExperience = (id, data) =>
  request(`/data/experiences/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
export const deleteExperience = (id) =>
  request(`/data/experiences/${id}`, {
    method: 'DELETE',
  });

// ─── Projects API ───
export const getProjects = () => request('/data/projects');
export const createProject = (data) =>
  request('/data/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  });
export const updateProject = (id, data) =>
  request(`/data/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
export const deleteProject = (id) =>
  request(`/data/projects/${id}`, {
    method: 'DELETE',
  });

// ─── Skills API ───
export const getSkills = () => request('/data/skills');
export const createSkillCategory = (data) =>
  request('/data/skills/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
export const updateSkillCategory = (id, data) =>
  request(`/data/skills/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
export const deleteSkillCategory = (id) =>
  request(`/data/skills/categories/${id}`, {
    method: 'DELETE',
  });

export const createSkillItem = (data) =>
  request('/data/skills/items', {
    method: 'POST',
    body: JSON.stringify(data),
  });
export const updateSkillItem = (id, data) =>
  request(`/data/skills/items/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
export const deleteSkillItem = (id) =>
  request(`/data/skills/items/${id}`, {
    method: 'DELETE',
  });

// ─── Certificates API ───
export const getCertificates = () => request('/data/certificates');
export const createCertificate = (data) =>
  request('/data/certificates', {
    method: 'POST',
    body: JSON.stringify(data),
  });
export const updateCertificate = (id, data) =>
  request(`/data/certificates/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
export const deleteCertificate = (id) =>
  request(`/data/certificates/${id}`, {
    method: 'DELETE',
  });

// ─── Generate Static JSON API ───
export const triggerGenerateStatic = () =>
  request('/data/generate', {
    method: 'POST',
  });
