import { Bell, Search, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "My Stories", path: "/my-stories" },
    { label: "New & Popular", path: "/popular" },
    { label: "My List", path: "/my-list" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      // optional: toast an error
      console.error("Logout failed:", err);
    } finally {
      setShowUserMenu(false);
    }
  };

  return (
    <nav className="relative z-50 flex items-center justify-between px-4 md:px-12 py-4 bg-background">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img 
          src="/logo.png" 
          alt="STORYVERSE Logo" 
          className="h-12 md:h-16 w-auto object-contain" 
        />
        </Link>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                location.pathname === link.path
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-accent transition-colors">
          <Search className="w-5 h-5" />
        </button>

        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-accent transition-colors relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>

          {showNotifications && (
            <NotificationPanel onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* User menu (Profile + Logout) */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu((v) => !v)}
            className="p-1 rounded hover:ring-2 ring-foreground transition-all"
          >
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-background border border-muted rounded shadow-lg overflow-hidden">
              <Link
                to="/stats"
                onClick={() => setShowUserMenu(false)}
                className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


