import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SignInForm() {
  const { login, authLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/posts";

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await login(form);
      if (res?.success && res?.data?.token) {
        navigate(from, { replace: true });
      } else {
        setErrors({ general: res?.message || "Login failed" });
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ general: "Login failed. Please try again." });
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
        <div style={{ position: "relative" }}>
          <input
            id="password"
            name="password"
            type={show ? "text" : "password"}
            value={form.password}
            onChange={onChange}
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "var(--spacing-4)",
              paddingRight: "60px",
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
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            style={{
              position: "absolute",
              right: "var(--spacing-2)",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "transparent",
              border: "none",
              color: "var(--text-secondary)",
              padding: "var(--spacing-2)",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              fontSize: "var(--font-size-sm)",
              transition: "all var(--transition-fast)"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--bg-tertiary)";
              e.target.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "var(--text-secondary)";
            }}
            disabled={authLoading}
          >
            {show ? "🙈" : "👁️"}
          </button>
        </div>
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={authLoading}
        style={{
          width: "100%",
          backgroundColor: authLoading ? "var(--text-muted)" : "var(--primary-color)",
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
            e.target.style.backgroundColor = "var(--primary-hover)";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "var(--shadow-lg)";
          }
        }}
        onMouseLeave={(e) => {
          if (!authLoading) {
            e.target.style.backgroundColor = "var(--primary-color)";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }
        }}
      >
        {authLoading ? (
          <>
            <div className="loading"></div>
            Signing in...
          </>
        ) : (
          <>
            🔐 Sign In
          </>
        )}
      </button>

      {/* Sign Up Link */}
      <div style={{ 
        textAlign: "center", 
        fontSize: "var(--font-size-sm)",
        color: "var(--text-secondary)",
        marginTop: "var(--spacing-2)"
      }}>
        Don't have an account?{" "}
        <Link 
          to="/signup" 
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
          Create one
        </Link>
      </div>
    </form>
  );
}
