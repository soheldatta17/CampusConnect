import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
  type DocumentData
} from 'firebase/firestore';
import { db } from '../config';
import type { Task } from '../../../types';

const TASKS_COLLECTION = 'tasks';

export async function createTask(userId: string, taskData: Omit<Task, 'id'>) {
  try {
    const taskRef = doc(collection(db, TASKS_COLLECTION));
    await setDoc(taskRef, {
      ...taskData,
      id: taskRef.id,
      userId,
      createdAt: new Date().toISOString(),
    });
    return { id: taskRef.id, error: null };
  } catch (error) {
    return { id: null, error: error as Error };
  }
}

export async function updateTask(taskId: string, data: Partial<Task>) {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function deleteTask(taskId: string) {
  try {
    await deleteDoc(doc(db, TASKS_COLLECTION, taskId));
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function getUserTasks(userId: string) {
  try {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId),
      orderBy('deadline')
    );
    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map(doc => doc.data() as Task);
    return { data: tasks, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function toggleTaskComplete(taskId: string) {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    const taskDoc = await getDoc(taskRef);
    
    if (!taskDoc.exists()) {
      throw new Error('Task not found');
    }

    const task = taskDoc.data() as Task;
    await updateDoc(taskRef, {
      completed: !task.completed,
      updatedAt: new Date().toISOString(),
    });

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}