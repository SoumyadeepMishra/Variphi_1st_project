import SignInForm from "../components/auth/SignInForm";
import "./LoginPage.css"; // Import the CSS file

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome back 👋</h2>
        <SignInForm />
      </div>
    </div>
  );
}

