import React, { useState } from "react";

const PostForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Please fill in all fields");
      return;
    }
    onCreate({ title, body, userId: 1 });
    setTitle("");
    setBody("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#111112ff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        
      }}
    >
      <h3>Create a New Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "90%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows="4"
        style={{
          width: "90%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#0930deff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Submit Post
      </button>
    </form>
  );
};

export default PostForm;
