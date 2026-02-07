import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { auth } from "@/lib/firebase";

const LAST_ACTIVE_KEY = "storyverse_last_active";
const INACTIVITY_LIMIT_MS = 10 * 60 * 1000; // 10 minutes

function setLastActiveNow() {
  localStorage.setItem(LAST_ACTIVE_KEY, String(Date.now()));
}

function getLastActive() {
  const raw = localStorage.getItem(LAST_ACTIVE_KEY);
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const activityEvents = useMemo(
    () => ["mousemove", "mousedown", "keydown", "touchstart", "scroll"],
    []
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) setLastActiveNow();
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;

    const handleActivity = () => setLastActiveNow();
    activityEvents.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }));

    const interval = window.setInterval(async () => {
      const lastActive = getLastActive();
      const now = Date.now();
      if (lastActive && now - lastActive > INACTIVITY_LIMIT_MS) {
        await signOut(auth);
      }
    }, 30_000);

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, handleActivity));
      window.clearInterval(interval);
    };
  }, [activityEvents, user]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return <>{children}</>;
}
