import { Bell, Search, User, LogOut, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleNavClick = (path: string, sectionId?: string) => {
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
    }
  };

  const navLinks = [
    { label: "Home", path: "/browse", sectionId: "your-stories" },
    { label: "Discover", path: "/browse", sectionId: "new-on-storyverse" },
    { label: "Analytics", path: "/stats" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setShowUserMenu(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="flex items-center justify-between h-16 px-4 md:px-12">
        <div className="flex items-center gap-8">
          <Link to="/browse" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Storyverse Logo"
              className="h-9 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path, link.sectionId)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/70 border border-border text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Sparkles className="w-4 h-4 text-primary" />
            AI Story Lab
          </button>

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

          <div className="relative">
            <button
              onClick={() => setShowUserMenu((v) => !v)}
              className="p-1 rounded-full hover:ring-2 ring-primary/60 transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-background border border-border rounded-xl shadow-lg overflow-hidden">
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
      </div>
    </nav>
  );
};

export default Navbar;
