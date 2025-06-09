import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './ResetPassword.css';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (err) {
      console.error("Reset Error:", err.message);
      if (err.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Failed to send reset link. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Reset Your Password</h2>
        <p>Enter your email to receive reset instructions</p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <div className="confirmation">
            ✅ A password reset link has been sent to <strong>{email}</strong>.<br />
            <Link to="/login" className="back-to-login">Return to Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
