import { Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="accounts" element={<Account />} />
      <Route path="auth/login" element={<Login />} />
      <Route path="auth/register" element={<Register />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
}
