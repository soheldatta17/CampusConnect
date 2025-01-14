import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  type DocumentData
} from 'firebase/firestore';
import { db } from '../config';
import type { Book, BorrowRecord } from '../../../types';

const BOOKS_COLLECTION = 'books';

export async function addBook(bookData: Omit<Book, 'id'>) {
  try {
    const bookRef = doc(collection(db, BOOKS_COLLECTION));
    await setDoc(bookRef, {
      ...bookData,
      id: bookRef.id,
      createdAt: new Date().toISOString(),
    });
    return { id: bookRef.id, error: null };
  } catch (error) {
    return { id: null, error: error as Error };
  }
}

export async function getBook(bookId: string) {
  try {
    const bookDoc = await getDoc(doc(db, BOOKS_COLLECTION, bookId));
    if (bookDoc.exists()) {
      return { data: bookDoc.data() as Book, error: null };
    }
    return { data: null, error: new Error('Book not found') };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function searchBooks(searchTerm: string, category?: string) {
  try {
    let q = query(collection(db, BOOKS_COLLECTION));
    
    if (category) {
      q = query(q, where('category', '==', category));
    }
    
    const querySnapshot = await getDocs(q);
    const books = querySnapshot.docs
      .map(doc => doc.data() as Book)
      .filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm)
      );
    
    return { data: books, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function borrowBook(bookId: string, userId: string) {
  try {
    const bookRef = doc(db, BOOKS_COLLECTION, bookId);
    const bookDoc = await getDoc(bookRef);
    
    if (!bookDoc.exists()) {
      throw new Error('Book not found');
    }

    const book = bookDoc.data() as Book;
    if (!book.available || book.availableCopies === 0) {
      throw new Error('Book not available');
    }

    const borrowRecord: BorrowRecord = {
      userId,
      borrowDate: new Date().toISOString(),
      returnDate: null,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    };

    await updateDoc(bookRef, {
      availableCopies: book.availableCopies - 1,
      available: book.availableCopies - 1 > 0,
      borrowHistory: [...book.borrowHistory, borrowRecord],
    });

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function returnBook(bookId: string, userId: string) {
  try {
    const bookRef = doc(db, BOOKS_COLLECTION, bookId);
    const bookDoc = await getDoc(bookRef);
    
    if (!bookDoc.exists()) {
      throw new Error('Book not found');
    }

    const book = bookDoc.data() as Book;
    const borrowRecord = book.borrowHistory.find(
      record => record.userId === userId && !record.returnDate
    );

    if (!borrowRecord) {
      throw new Error('No active borrow record found');
    }

    const updatedHistory = book.borrowHistory.map(record =>
      record === borrowRecord
        ? { ...record, returnDate: new Date().toISOString() }
        : record
    );

    await updateDoc(bookRef, {
      availableCopies: book.availableCopies + 1,
      available: true,
      borrowHistory: updatedHistory,
    });

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}