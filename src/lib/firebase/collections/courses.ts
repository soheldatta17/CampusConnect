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
import type { Course } from '../../../types';

const COURSES_COLLECTION = 'courses';

export async function createCourse(courseData: Omit<Course, 'id'>) {
  try {
    const courseRef = doc(collection(db, COURSES_COLLECTION));
    await setDoc(courseRef, {
      ...courseData,
      id: courseRef.id,
      createdAt: new Date().toISOString(),
    });
    return { id: courseRef.id, error: null };
  } catch (error) {
    return { id: null, error: error as Error };
  }
}

export async function getCourse(courseId: string) {
  try {
    const courseDoc = await getDoc(doc(db, COURSES_COLLECTION, courseId));
    if (courseDoc.exists()) {
      return { data: courseDoc.data() as Course, error: null };
    }
    return { data: null, error: new Error('Course not found') };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function getCoursesByDepartment(department: string) {
  try {
    const q = query(
      collection(db, COURSES_COLLECTION),
      where('department', '==', department),
      orderBy('semester')
    );
    const querySnapshot = await getDocs(q);
    const courses = querySnapshot.docs.map(doc => doc.data() as Course);
    return { data: courses, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function enrollStudent(courseId: string, studentId: string) {
  try {
    const courseRef = doc(db, COURSES_COLLECTION, courseId);
    const courseDoc = await getDoc(courseRef);
    
    if (!courseDoc.exists()) {
      throw new Error('Course not found');
    }

    const course = courseDoc.data() as Course;
    if (course.enrolledStudents.includes(studentId)) {
      throw new Error('Student already enrolled');
    }

    await setDoc(courseRef, {
      ...course,
      enrolledStudents: [...course.enrolledStudents, studentId]
    });

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}