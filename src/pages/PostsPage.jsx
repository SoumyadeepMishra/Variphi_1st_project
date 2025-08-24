import { useEffect, useState } from "react";
import { getRequest, postRequest, patchRequest, deleteRequest } from "../axios/api";
import Postcard from "../components/Postcard";
import PostForm from "../components/PostForm";
import { useAuth } from "../context/AuthContext";

export default function PostsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    getRequest("/posts")
      .then(setData)
      .catch((e) => console.error("Error fetching posts:", e))
      .finally(() => setLoading(false));
  }, []);

  const createPost = (newPost) => {
    postRequest("/posts", newPost)
      .then((res) => setData((prev) => [...prev, res]))
      .catch((e) => console.error("Error creating post:", e));
  };

  const updatePost = (id, updatedPost) => {
    patchRequest({ endPoint: `/posts/${id}`, payload: updatedPost })
      .then(() => {
        setData((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedPost } : p)));
      })
      .catch((e) => console.error("Error updating post:", e));
  };

  const removePost = (id) => {
    deleteRequest(`/posts/${id}`)
      .then(() => setData((prev) => prev.filter((p) => p.id !== id)))
      .catch((e) => console.error("Error deleting post:", e));
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h1>Posts</h1>
        <button onClick={logout} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <PostForm onCreate={createPost} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {Array.isArray(data) &&
          data.map((item) => (
            <Postcard key={item.id} post={item} onUpdate={updatePost} onDelete={removePost} />
          ))}
      </div>
    </div>
  );
}
