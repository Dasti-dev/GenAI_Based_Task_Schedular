import axios from "axios";

const API = axios.create({

  baseURL: "http://localhost:5000/api"
});

// =====================================
// JWT INTERCEPTOR
// =====================================

API.interceptors.request.use((req) => {

  const token =
    localStorage.getItem("token");

  if (token) {

    req.headers.Authorization =
      `Bearer ${token}`;
  }

  return req;
});

// =====================================
// AUTH APIs
// =====================================

export const signupUser = async (
  formData
) => {

  const response =
    await API.post(
      "/signup",
      formData
    );

  return response.data;
};

export const loginUser = async (
  formData
) => {

  const response =
    await API.post(
      "/login",
      formData
    );

  return response.data;
};

// =====================================
// TASK APIs
// =====================================

export const createTask = async (
  input
) => {

  const response =
    await API.post("/task", {
      input
    });

  return response.data;
};

export const getTasks = async () => {

  const response =
    await API.get("/tasks");

  return response.data;
};