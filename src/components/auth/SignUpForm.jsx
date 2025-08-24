import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  background: "#16a34a",
  color: "#fff",
  cursor: "pointer",
};

export default function SignUpForm() {
  const { signup, authLoading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const navigate = useNavigate();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return alert("Passwords do not match");
    try {
      const res = await signup({ name: form.name, email: form.email, password: form.password });
      if (res) {
        alert("Signup successful. Please sign in.");
        navigate("/login");
      }
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
      <div>
        <label>Name</label>
        <input name="name" type="text" value={form.name} onChange={onChange} style={inputStyle} required />
      </div>
      <div>
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={onChange} style={inputStyle} required />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={onChange} style={inputStyle} required />
      </div>
      <div>
        <label>Confirm Password</label>
        <input name="confirm" type="password" value={form.confirm} onChange={onChange} style={inputStyle} required />
      </div>

      <button style={btnStyle} type="submit" disabled={authLoading}>
        {authLoading ? "Creating..." : "Create account"}
      </button>

      <div style={{ textAlign: "center", fontSize: 14 }}>
        Have an account? <Link to="/login">Sign in</Link>
      </div>
    </form>
  );
}
