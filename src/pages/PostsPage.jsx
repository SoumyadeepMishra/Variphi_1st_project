import { useEffect, useState } from "react";
import { getRequest, postRequest, patchRequest, deleteRequest } from "../axios/api";
import Postcard from "../components/Postcard";
import PostForm from "../components/PostForm";

export default function PostsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getRequest("/posts")
      .then(setData)
      .catch((e) => console.error("Error fetching posts:", e))
      .finally(() => setLoading(false));
  }, []);

  const createPost = (newPost) => {
    postRequest("/posts", newPost)
      .then((res) => {
        setData((prev) => [...prev, res]);
        setShowForm(false);
      })
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
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteRequest(`/posts/${id}`)
        .then(() => setData((prev) => prev.filter((p) => p.id !== id)))
        .catch((e) => console.error("Error deleting post:", e));
    }
  };

  if (loading) {
    return (
      <div className="posts-loading">
        <div className="loading-spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="posts-page">
      {/* Page Header */}
      <div className="posts-header">
        <div className="posts-header-content">
          <h1>📝 My Posts</h1>
          <p>{data.length} {data.length === 1 ? 'post' : 'posts'} • Manage your content</p>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className={`new-post-btn ${showForm ? 'cancel' : ''}`}
        >
          {showForm ? "✕ Cancel" : "✏️ New Post"}
        </button>
      </div>

      {/* Create Post Form */}
      {showForm && (
        <div className="post-form-container">
          <PostForm onCreate={createPost} />
        </div>
      )}

      {/* Posts Grid */}
      {data.length === 0 ? (
        <div className="empty-posts">
          <div className="empty-icon">📭</div>
          <h3>No posts yet</h3>
          <p>Create your first post to get started!</p>
          <button
            onClick={() => setShowForm(true)}
            className="create-first-post-btn"
          >
            ✏️ Create First Post
          </button>
        </div>
      ) : (
        <div className="posts-grid">
          {Array.isArray(data) &&
            data.map((item) => (
              <Postcard 
                key={item.id} 
                post={item} 
                onUpdate={updatePost} 
                onDelete={removePost} 
              />
            ))}
        </div>
      )}
    </div>
  );
}
