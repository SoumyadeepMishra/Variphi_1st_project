import React, { useState } from "react";

const PostForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onCreate({ title: title.trim(), body: body.trim(), userId: 1 });
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      backgroundColor: "var(--bg-primary)",
      borderRadius: "var(--radius-xl)",
      padding: "var(--spacing-8)",
      boxShadow: "var(--shadow-lg)",
      border: "1px solid var(--border-color)",
      maxWidth: "600px",
      margin: "0 auto",
      animation: "fadeIn var(--transition-normal) ease-out"
    }}>
      <div style={{ textAlign: "center", marginBottom: "var(--spacing-6)" }}>
        <div style={{ 
          fontSize: "2.5rem", 
          marginBottom: "var(--spacing-3)",
          filter: "grayscale(0.2)"
        }}>
          ✍️
        </div>
        <h2 style={{ 
          color: "var(--text-primary)", 
          marginBottom: "var(--spacing-2)",
          fontSize: "var(--font-size-2xl)"
        }}>
          Create New Post
        </h2>
        <p style={{ 
          color: "var(--text-secondary)", 
          fontSize: "var(--font-size-sm)",
          margin: 0
        }}>
          Share your thoughts with the world
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-5)" }}>
        <div>
          <label htmlFor="title" style={{
            display: "block",
            fontSize: "var(--font-size-sm)",
            fontWeight: "600",
            color: "var(--text-primary)",
            marginBottom: "var(--spacing-2)"
          }}>
            Title *
          </label>
          <input
            id="title"
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
          <label htmlFor="body" style={{
            display: "block",
            fontSize: "var(--font-size-sm)",
            fontWeight: "600",
            color: "var(--text-primary)",
            marginBottom: "var(--spacing-2)"
          }}>
            Content *
          </label>
          <textarea
            id="body"
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
                : "var(--primary-color)",
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
                e.target.style.backgroundColor = "var(--primary-hover)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "var(--shadow-lg)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting && title.trim() && body.trim()) {
                e.target.style.backgroundColor = "var(--primary-color)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }
            }}
          >
            {isSubmitting ? (
              <>
                <div className="loading"></div>
                Creating...
              </>
            ) : (
              <>
                📝 Create Post
              </>
            )}
          </button>
        </div>

        <div style={{ 
          textAlign: "center", 
          fontSize: "var(--font-size-xs)", 
          color: "var(--text-muted)",
          marginTop: "var(--spacing-2)"
        }}>
          Your post will be visible to all users
        </div>
      </form>
    </div>
  );
};

export default PostForm;
