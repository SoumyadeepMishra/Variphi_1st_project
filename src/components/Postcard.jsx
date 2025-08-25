// src/components/Postcard.jsx
import React, { useState } from "react";
import EditPostForm from "./EditPostForm";

const Postcard = ({ post, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div style={{ 
        backgroundColor: "var(--bg-primary)",
        borderRadius: "var(--radius-xl)",
        padding: "var(--spacing-6)",
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--border-color)",
        animation: "fadeIn var(--transition-normal) ease-out"
      }}>
        <EditPostForm
          post={post}
          onUpdate={(id, updatedPost) => {
            onUpdate(id, updatedPost);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: "var(--bg-primary)",
      borderRadius: "var(--radius-xl)",
      padding: "var(--spacing-6)",
      boxShadow: "var(--shadow-md)",
      border: "1px solid var(--border-color)",
      transition: "all var(--transition-normal)",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      minHeight: "200px",
      position: "relative",
      overflow: "hidden"
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = "translateY(-4px)";
      e.target.style.boxShadow = "var(--shadow-xl)";
      e.target.style.borderColor = "var(--border-hover)";
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = "var(--shadow-md)";
      e.target.style.borderColor = "var(--border-color)";
    }}>
      
      {/* Post ID Badge */}
      <div style={{
        position: "absolute",
        top: "var(--spacing-4)",
        right: "var(--spacing-4)",
        backgroundColor: "var(--bg-tertiary)",
        color: "var(--text-secondary)",
        fontSize: "var(--font-size-xs)",
        fontWeight: "600",
        padding: "var(--spacing-1) var(--spacing-2)",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border-color)"
      }}>
        #{post.id}
      </div>

      {/* Content */}
      <div style={{ flex: 1, marginBottom: "var(--spacing-6)" }}>
        <h3 style={{
          fontSize: "var(--font-size-xl)",
          fontWeight: "700",
          color: "var(--text-primary)",
          marginBottom: "var(--spacing-3)",
          lineHeight: "1.4",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          {post.title}
        </h3>
        
        <p style={{
          color: "var(--text-secondary)",
          lineHeight: "1.6",
          fontSize: "var(--font-size-sm)",
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          margin: 0
        }}>
          {post.body}
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: "flex",
        gap: "var(--spacing-3)",
        marginTop: "auto"
      }}>
        <button
          onClick={() => setIsEditing(true)}
          style={{
            flex: 1,
            backgroundColor: "var(--secondary-color)",
            color: "white",
            padding: "var(--spacing-3) var(--spacing-4)",
            borderRadius: "var(--radius-lg)",
            fontWeight: "600",
            fontSize: "var(--font-size-sm)",
            transition: "all var(--transition-fast)",
            border: "none",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--secondary-hover)";
            e.target.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "var(--secondary-color)";
            e.target.style.transform = "scale(1)";
          }}
        >
          ✏️ Edit
        </button>
        
        <button
          onClick={() => onDelete(post.id)}
          style={{
            flex: 1,
            backgroundColor: "var(--danger-color)",
            color: "white",
            padding: "var(--spacing-3) var(--spacing-4)",
            borderRadius: "var(--radius-lg)",
            fontWeight: "600",
            fontSize: "var(--font-size-sm)",
            transition: "all var(--transition-fast)",
            border: "none",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--danger-hover)";
            e.target.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "var(--danger-color)";
            e.target.style.transform = "scale(1)";
          }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default Postcard;
