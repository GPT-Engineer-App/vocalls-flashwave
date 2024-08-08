import { Home, Phone, UserPlus, LogIn } from "lucide-react";
import Home from "./pages/Home";
import CallPage from "./pages/CallPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Home />,
    protected: true,
  },
  {
    title: "Call",
    to: "/call",
    icon: <Phone className="h-4 w-4" />,
    page: <CallPage />,
    protected: true,
  },
  {
    title: "Register",
    to: "/register",
    icon: <UserPlus className="h-4 w-4" />,
    page: <Register />,
    protected: false,
  },
  {
    title: "Login",
    to: "/login",
    icon: <LogIn className="h-4 w-4" />,
    page: <Login />,
    protected: false,
  },
];
