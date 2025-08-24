import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
};

const btnStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
};

export default function SignInForm() {
  const { login, authLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/posts";

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);

      // ✅ Fix: check inside res.data
      if (res?.success && res?.data?.token) {
        navigate(from, { replace: true });
      } else {
        alert(res?.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          style={inputStyle}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            name="password"
            type={show ? "text" : "password"}
            value={form.password}
            onChange={onChange}
            style={{ ...inputStyle, flex: 1 }}
            required
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            style={{ padding: "0 12px" }}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <button style={btnStyle} type="submit" disabled={authLoading}>
        {authLoading ? "Signing in..." : "Sign In"}
      </button>

      <div style={{ textAlign: "center", fontSize: 14 }}>
        No account? <Link to="/signup">Create one</Link>
      </div>
    </form>
  );
}
