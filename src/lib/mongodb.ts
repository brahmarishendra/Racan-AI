import { MongoClient, Db, Collection } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://brahmarishi868:zEMM2bp8SJGWLBtt@cluster0.oqclpre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'racan_ai';

let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (client && db) {
    return { client, db };
  }

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    
    console.log('Connected to MongoDB successfully');
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function getUsersCollection(): Promise<Collection> {
  const { db } = await connectToDatabase();
  return db.collection('users');
}

export async function getSessionsCollection(): Promise<Collection> {
  const { db } = await connectToDatabase();
  return db.collection('sessions');
}

export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close();
  }
}

// Test database connection
export const testDatabaseConnection = async () => {
  try {
    const { db } = await connectToDatabase();
    await db.admin().ping();
    console.log('MongoDB connection successful');
    return { connected: true, error: null };
  } catch (err: any) {
    console.log('MongoDB connection test error:', err);
    return { connected: false, error: err };
  }
};