import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getArticles = async () => {
  const res = await api.get("/api/article/allarticle");
  return res.data.data;
};

export const getArticleById = async (id) => {
  const res = await api.get(`/api/article/getarticle/${id}`);
  return res.data.data;
};


export const createArticle = async (data) => {
  const res = await api.post("/api/article/create", data);
  return res.data;
};

export const improveArticle = async (id) => {
  const res = await api.post(`/api/article/improve` , {
    id:id
  });
  return res.data;
};

export const deleteArticle = async (id) => {
  const res = await api.delete(`/api/article/delete` , {
    data: { id }
  });
  return res.data;
};