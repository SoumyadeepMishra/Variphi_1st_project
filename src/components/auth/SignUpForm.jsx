import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SignUpForm() {
  const { signup, authLoading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!form.confirm.trim()) {
      newErrors.confirm = "Please confirm your password";
    } else if (form.password !== form.confirm) {
      newErrors.confirm = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      const res = await signup({ 
        name: form.name.trim(), 
        email: form.email.trim(), 
        password: form.password 
      });
      if (res) {
        alert("Signup successful! Please sign in.");
        navigate("/login");
      }
    } catch (error) {
      setErrors({ general: "Signup failed. Please try again." });
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-5)" }}>
      {/* General Error */}
      {errors.general && (
        <div style={{
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          color: "var(--danger-color)",
          padding: "var(--spacing-3)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          fontSize: "var(--font-size-sm)",
          textAlign: "center"
        }}>
          ⚠️ {errors.general}
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" style={{
          display: "block",
          fontSize: "var(--font-size-sm)",
          fontWeight: "600",
          color: "var(--text-primary)",
          marginBottom: "var(--spacing-2)"
        }}>
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={onChange}
          placeholder="Enter your full name"
          style={{
            width: "100%",
            padding: "var(--spacing-4)",
            borderRadius: "var(--radius-lg)",
            border: errors.name ? "1px solid var(--danger-color)" : "1px solid var(--border-color)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            fontSize: "var(--font-size-base)",
            transition: "all var(--transition-fast)",
            boxSizing: "border-box"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = errors.name ? "var(--danger-color)" : "var(--primary-color)";
            e.target.style.boxShadow = errors.name 
              ? "0 0 0 3px rgba(239, 68, 68, 0.1)" 
              : "0 0 0 3px rgb(99 102 241 / 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = errors.name ? "var(--danger-color)" : "var(--border-color)";
            e.target.style.boxShadow = "none";
          }}
          required
          disabled={authLoading}
        />
        {errors.name && (
          <p style={{
            color: "var(--danger-color)",
            fontSize: "var(--font-size-xs)",
            marginTop: "var(--spacing-1)",
            marginBottom: 0
          }}>
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" style={{
          display: "block",
          fontSize: "var(--font-size-sm)",
          fontWeight: "600",
          color: "var(--text-primary)",
          marginBottom: "var(--spacing-2)"
        }}>
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="Enter your email"
          style={{
            width: "100%",
            padding: "var(--spacing-4)",
            borderRadius: "var(--radius-lg)",
            border: errors.email ? "1px solid var(--danger-color)" : "1px solid var(--border-color)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            fontSize: "var(--font-size-base)",
            transition: "all var(--transition-fast)",
            boxSizing: "border-box"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = errors.email ? "var(--danger-color)" : "var(--primary-color)";
            e.target.style.boxShadow = errors.email 
              ? "0 0 0 3px rgba(239, 68, 68, 0.1)" 
              : "0 0 0 3px rgb(99 102 241 / 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = errors.email ? "var(--danger-color)" : "var(--border-color)";
            e.target.style.boxShadow = "none";
          }}
          required
          disabled={authLoading}
        />
        {errors.email && (
          <p style={{
            color: "var(--danger-color)",
            fontSize: "var(--font-size-xs)",
            marginTop: "var(--spacing-1)",
            marginBottom: 0
          }}>
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" style={{
          display: "block",
          fontSize: "var(--font-size-sm)",
          fontWeight: "600",
          color: "var(--text-primary)",
          marginBottom: "var(--spacing-2)"
        }}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="Create a password"
          style={{
            width: "100%",
            padding: "var(--spacing-4)",
            borderRadius: "var(--radius-lg)",
            border: errors.password ? "1px solid var(--danger-color)" : "1px solid var(--border-color)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            fontSize: "var(--font-size-base)",
            transition: "all var(--transition-fast)",
            boxSizing: "border-box"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = errors.password ? "var(--danger-color)" : "var(--primary-color)";
            e.target.style.boxShadow = errors.password 
              ? "0 0 0 3px rgba(239, 68, 68, 0.1)" 
              : "0 0 0 3px rgb(99 102 241 / 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = errors.password ? "var(--danger-color)" : "var(--border-color)";
            e.target.style.boxShadow = "none";
          }}
          required
          disabled={authLoading}
        />
        {errors.password && (
          <p style={{
            color: "var(--danger-color)",
            fontSize: "var(--font-size-xs)",
            marginTop: "var(--spacing-1)",
            marginBottom: 0
          }}>
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirm" style={{
          display: "block",
          fontSize: "var(--font-size-sm)",
          fontWeight: "600",
          color: "var(--text-primary)",
          marginBottom: "var(--spacing-2)"
        }}>
          Confirm Password
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          value={form.confirm}
          onChange={onChange}
          placeholder="Confirm your password"
          style={{
            width: "100%",
            padding: "var(--spacing-4)",
            borderRadius: "var(--radius-lg)",
            border: errors.confirm ? "1px solid var(--danger-color)" : "1px solid var(--border-color)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            fontSize: "var(--font-size-base)",
            transition: "all var(--transition-fast)",
            boxSizing: "border-box"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = errors.confirm ? "var(--danger-color)" : "var(--primary-color)";
            e.target.style.boxShadow = errors.confirm 
              ? "0 0 0 3px rgba(239, 68, 68, 0.1)" 
              : "0 0 0 3px rgb(99 102 241 / 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = errors.confirm ? "var(--danger-color)" : "var(--border-color)";
            e.target.style.boxShadow = "none";
          }}
          required
          disabled={authLoading}
        />
        {errors.confirm && (
          <p style={{
            color: "var(--danger-color)",
            fontSize: "var(--font-size-xs)",
            marginTop: "var(--spacing-1)",
            marginBottom: 0
          }}>
            {errors.confirm}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={authLoading}
        style={{
          width: "100%",
          backgroundColor: authLoading ? "var(--text-muted)" : "var(--secondary-color)",
          color: "white",
          padding: "var(--spacing-4) var(--spacing-6)",
          borderRadius: "var(--radius-lg)",
          fontWeight: "600",
          fontSize: "var(--font-size-base)",
          border: "none",
          cursor: authLoading ? "not-allowed" : "pointer",
          transition: "all var(--transition-normal)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--spacing-2)",
          marginTop: "var(--spacing-2)"
        }}
        onMouseEnter={(e) => {
          if (!authLoading) {
            e.target.style.backgroundColor = "var(--secondary-hover)";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "var(--shadow-lg)";
          }
        }}
        onMouseLeave={(e) => {
          if (!authLoading) {
            e.target.style.backgroundColor = "var(--secondary-color)";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }
        }}
      >
        {authLoading ? (
          <>
            <div className="loading"></div>
            Creating account...
          </>
        ) : (
          <>
            🚀 Create Account
          </>
        )}
      </button>

      {/* Sign In Link */}
      <div style={{ 
        textAlign: "center", 
        fontSize: "var(--font-size-sm)",
        color: "var(--text-secondary)",
        marginTop: "var(--spacing-2)"
      }}>
        Already have an account?{" "}
        <Link 
          to="/login" 
          style={{
            color: "var(--primary-color)",
            fontWeight: "600",
            textDecoration: "none"
          }}
          onMouseEnter={(e) => {
            e.target.style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            e.target.style.textDecoration = "none";
          }}
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
