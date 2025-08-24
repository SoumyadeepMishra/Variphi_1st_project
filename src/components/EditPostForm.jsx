// src/components/EditPostForm.jsx
import React, { useState } from "react";

const EditPostForm = ({ post, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(post.id, { ...post, title, body });
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#f0f4ff", padding: "20px", borderRadius: "8px" }}>
      <h3>Edit Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px", height: "80px" }}
      />
      <button type="submit" style={{ marginRight: "10px" }}>Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditPostForm;
