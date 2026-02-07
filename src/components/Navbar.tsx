import { Bell, Search, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "My Stories", path: "/my-stories" },
    { label: "New & Popular", path: "/popular" },
    { label: "My List", path: "/my-list" },
  ];

  return (
    <nav className="relative z-50 flex items-center justify-between px-4 md:px-12 py-4 bg-background">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="StoryVerse Logo" 
            style={{ height: '70px', width: 'auto' }} 
            className="object-contain" 
          />

          {/* <h1 className="font-display text-3xl md:text-4xl text-primary tracking-wider">
            STORYVERSE
          </h1> */}
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
        
        <Link to="/stats" className="p-1 rounded hover:ring-2 ring-foreground transition-all">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
