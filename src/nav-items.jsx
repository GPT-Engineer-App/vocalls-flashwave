import { Home as HomeIcon, Phone, UserPlus, LogIn, Users, BarChart } from "lucide-react";
import Home from "./pages/Home";
import CallPage from "./pages/CallPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import CallHistory from "./pages/CallHistory";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
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
    title: "Contacts",
    to: "/contacts",
    icon: <Users className="h-4 w-4" />,
    page: <Contacts />,
    protected: true,
  },
  {
    title: "History",
    to: "/history",
    icon: <BarChart className="h-4 w-4" />,
    page: <CallHistory />,
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