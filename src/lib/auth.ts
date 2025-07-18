@@ .. @@
 import { getUsersCollection, getSessionsCollection } from "./mongodb";

-const JWT_SECRET = 'your-super-secret-jwt-key-change-this-in-production';
+const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || 'fallback-secret-key';
 const JWT_EXPIRES_IN = '7d';