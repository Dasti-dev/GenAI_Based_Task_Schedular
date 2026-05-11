import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/routes",
});

export const createTask = async (input) => {
  const response = await API.post("/task", {
    input,
  });

  return response.data;
};

export const getTasks = async () => {
  const response = await API.get("/tasks");

  return response.data;
};