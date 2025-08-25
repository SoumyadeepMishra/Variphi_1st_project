import SignUpForm from "../components/auth/SignUpForm";
import "./LoginPage.css"; // Reuse the same styles

export default function SignupPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Join us today 🚀</h2>
        <SignUpForm />
      </div>
    </div>
  );
}
