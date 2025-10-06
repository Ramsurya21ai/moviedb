import "./App.css";
import { Header, Footer, Cours } from "./components";
import Allroutes from "./routes/Allroutes";
import { useState, useEffect } from "react";
import AuthModal from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  // load user from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.name) setUser(parsed); // user is an object
      } catch (err) {
        console.error("LocalStorage parse error:", err);''
      }
    }
  }, []);

  return (
    <div>
      {/* pass setUser so Header can logout */}
      <Header user={user} setUser={setUser} onLoginClick={() => setShowAuth(true)} />

      <Cours />
      <Allroutes setUser={setUser} />

      <Footer />

      {showAuth && (
        <AuthModal
          setUser={(u) => {
            setUser(u); // u is the user object
            setShowAuth(false);
          }}
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
}

export default App;
