// src/components/EditPostForm.jsx
import React, { useState } from "react";

const EditPostForm = ({ post, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onUpdate(post.id, { ...post, title: title.trim(), body: body.trim() });
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ animation: "fadeIn var(--transition-normal) ease-out" }}>
      <div style={{ textAlign: "center", marginBottom: "var(--spacing-6)" }}>
        <div style={{ 
          fontSize: "2rem", 
          marginBottom: "var(--spacing-3)",
          filter: "grayscale(0.2)"
        }}>
          ✏️
        </div>
        <h3 style={{ 
          color: "var(--text-primary)", 
          marginBottom: "var(--spacing-2)",
          fontSize: "var(--font-size-xl)"
        }}>
          Edit Post
        </h3>
        <p style={{ 
          color: "var(--text-secondary)", 
          fontSize: "var(--font-size-sm)",
          margin: 0
        }}>
          Update your post content
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-5)" }}>
        <div>
          <label htmlFor="edit-title" style={{
            display: "block",
            fontSize: "var(--font-size-sm)",
            fontWeight: "600",
            color: "var(--text-primary)",
            marginBottom: "var(--spacing-2)"
          }}>
            Title *
          </label>
          <input
            id="edit-title"
            type="text"
            placeholder="Enter a compelling title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "var(--spacing-4)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              fontSize: "var(--font-size-base)",
              transition: "all var(--transition-fast)",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--primary-color)";
              e.target.style.boxShadow = "0 0 0 3px rgb(99 102 241 / 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border-color)";
              e.target.style.boxShadow = "none";
            }}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="edit-body" style={{
            display: "block",
            fontSize: "var(--font-size-sm)",
            fontWeight: "600",
            color: "var(--text-primary)",
            marginBottom: "var(--spacing-2)"
          }}>
            Content *
          </label>
          <textarea
            id="edit-body"
            placeholder="Write your post content here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="6"
            style={{
              width: "100%",
              padding: "var(--spacing-4)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              fontSize: "var(--font-size-base)",
              lineHeight: "1.6",
              resize: "vertical",
              minHeight: "120px",
              transition: "all var(--transition-fast)",
              boxSizing: "border-box",
              fontFamily: "inherit"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--primary-color)";
              e.target.style.boxShadow = "0 0 0 3px rgb(99 102 241 / 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border-color)";
              e.target.style.boxShadow = "none";
            }}
            required
            disabled={isSubmitting}
          />
        </div>

        <div style={{ 
          display: "flex", 
          gap: "var(--spacing-3)",
          marginTop: "var(--spacing-2)"
        }}>
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !body.trim()}
            style={{
              flex: 1,
              backgroundColor: isSubmitting || !title.trim() || !body.trim() 
                ? "var(--text-muted)" 
                : "var(--secondary-color)",
              color: "white",
              padding: "var(--spacing-4) var(--spacing-6)",
              borderRadius: "var(--radius-lg)",
              fontWeight: "600",
              fontSize: "var(--font-size-base)",
              border: "none",
              cursor: isSubmitting || !title.trim() || !body.trim() ? "not-allowed" : "pointer",
              transition: "all var(--transition-normal)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--spacing-2)"
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting && title.trim() && body.trim()) {
                e.target.style.backgroundColor = "var(--secondary-hover)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "var(--shadow-lg)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting && title.trim() && body.trim()) {
                e.target.style.backgroundColor = "var(--secondary-color)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }
            }}
          >
            {isSubmitting ? (
              <>
                <div className="loading"></div>
                Updating...
              </>
            ) : (
              <>
                💾 Update Post
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            style={{
              flex: 1,
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
              padding: "var(--spacing-4) var(--spacing-6)",
              borderRadius: "var(--radius-lg)",
              fontWeight: "600",
              fontSize: "var(--font-size-base)",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all var(--transition-normal)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--spacing-2)"
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = "var(--bg-tertiary)";
                e.target.style.borderColor = "var(--border-hover)";
                e.target.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = "var(--bg-primary)";
                e.target.style.borderColor = "var(--border-color)";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            ✕ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
