import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert("./serviceAccount.json"),
});

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.uid = decoded.uid;
    req.email = decoded.email || null;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

