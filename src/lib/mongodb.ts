@@ .. @@
 import { MongoClient, Db, Collection } from 'mongodb';

-const MONGODB_URI = 'mongodb+srv://brahmarishi868:zEMM2bp8SJGWLBtt@cluster0.oqclpre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
-const DB_NAME = 'racan_ai';
+const MONGODB_URI = import.meta.env.VITE_MONGODB_URI;
+const DB_NAME = import.meta.env.VITE_MONGODB_DB_NAME || 'racan_ai';

 if (!MONGODB_URI) {
-  throw new Error('Please define the MONGODB_URI environment variable');
+  throw new Error('Please define the VITE_MONGODB_URI environment variable in your .env file');
 }