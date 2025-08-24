// src/components/Postcard.jsx
import React, { useState } from "react";
import EditPostForm from "./EditPostForm";
import "./Postcard.css"; // Import the CSS file

const Postcard = ({ post, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <EditPostForm
        post={post}
        onUpdate={(id, updatedPost) => {
          onUpdate(id, updatedPost);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="postcard">
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>

      <div className="postcard-buttons">
        <button className="btn-edit" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(post.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Postcard;
