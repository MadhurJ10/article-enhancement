import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getArticles = async () => {
  const res = await api.get("/articles");
  return res.data;
};

export const getArticleById = async (id) => {
  const res = await api.get(`/articles/${id}`);
  return res.data;
};
