import { 
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  type DocumentData
} from 'firebase/firestore';
import { db } from './config';

export async function createUserProfile(
  uid: string,
  data: { email: string; displayName: string; photoURL: string | null; createdAt: string }
) {
  try {
    await setDoc(doc(db, 'users', uid), {
      ...data,
      uid,
    });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function getUserProfile(uid: string) {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { data: userDoc.data(), error: null };
    }
    return { data: null, error: new Error('User not found') };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function updateUserProfile(uid: string, data: Partial<DocumentData>) {
  try {
    await updateDoc(doc(db, 'users', uid), data);
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}