import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./login.css";

const SERVICE_ID = "service_83r1mbj";
const TEMPLATE_ID = "template_fo9311q";
const PUBLIC_KEY = "uqFX7r5UMIuWJjzuW";

const LoginModal = ({ setUser, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN: check localStorage
        const savedJSON = localStorage.getItem("user");
        const saved = savedJSON ? JSON.parse(savedJSON) : null;
        if (saved && saved.email === form.email && saved.password === form.password) {
          alert("✅ Login successful!");
          setUser(saved); // store object
          onClose();
        } else {
          alert("❌ Invalid email or password");
        }
      } else {
        // SIGNUP: save and send email
        const newUser = { name: form.name.trim(), email: form.email.trim(), password: form.password };
        localStorage.setItem("user", JSON.stringify(newUser));
        try {
          console.log("📧 EmailJS payload:", { to_name: newUser.name, to_email: newUser.email });
          await emailjs.send(SERVICE_ID, TEMPLATE_ID, { to_name: newUser.name, to_email: newUser.email }, PUBLIC_KEY);
          alert("✅ Signup successful & welcome email sent!");
        } catch (emailErr) {
          console.error("EmailJS send error:", emailErr);
          alert("⚠️ Signup saved but welcome email failed to send.");
        }

        setUser(newUser);
        onClose();
      }
    } catch (err) {
      console.error("Auth error:", err);
      alert("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" role="dialog" aria-modal="true">
        <button className="close-btn" onClick={onClose} aria-label="Close">✖</button>

        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              autoFocus
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "New here? " : "Already have an account? "}
          <button type="button" className="link-like" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create an account" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
