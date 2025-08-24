import SignUpForm from "../components/auth/SignUpForm";

export default function SignupPage() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 20, background: "#f8fafc" }}>
      <div style={{ width: 420, background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
        <h2 style={{ marginBottom: 12, textAlign: "center" }}>Create your account</h2>
        <SignUpForm />
      </div>
    </div>
  );
}
