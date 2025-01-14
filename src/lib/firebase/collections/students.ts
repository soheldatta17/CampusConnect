import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  type DocumentData
} from 'firebase/firestore';
import { db } from '../config';
import type { User } from '../../../types';

const STUDENTS_COLLECTION = 'students';

export async function createStudent(studentData: Omit<User, 'id'>) {
  try {
    const studentRef = doc(collection(db, STUDENTS_COLLECTION));
    await setDoc(studentRef, {
      ...studentData,
      id: studentRef.id,
      createdAt: new Date().toISOString(),
    });
    return { id: studentRef.id, error: null };
  } catch (error) {
    return { id: null, error: error as Error };
  }
}

export async function getStudent(studentId: string) {
  try {
    const studentDoc = await getDoc(doc(db, STUDENTS_COLLECTION, studentId));
    if (studentDoc.exists()) {
      return { data: studentDoc.data() as User, error: null };
    }
    return { data: null, error: new Error('Student not found') };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function updateStudent(studentId: string, data: Partial<User>) {
  try {
    await setDoc(doc(db, STUDENTS_COLLECTION, studentId), data, { merge: true });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function getStudentsByDepartment(department: string) {
  try {
    const q = query(
      collection(db, STUDENTS_COLLECTION),
      where('department', '==', department),
      orderBy('semester')
    );
    const querySnapshot = await getDocs(q);
    const students = querySnapshot.docs.map(doc => doc.data() as User);
    return { data: students, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function getStudentsByCourse(courseId: string) {
  try {
    const q = query(
      collection(db, STUDENTS_COLLECTION),
      where('courses', 'array-contains', courseId)
    );
    const querySnapshot = await getDocs(q);
    const students = querySnapshot.docs.map(doc => doc.data() as User);
    return { data: students, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}