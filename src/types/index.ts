export interface User {
  id: string;
  rollNumber: string;
  fullName: string;
  profilePicture: string;
  email: string;
  phone: string;
  course: string;
  department: string;
  semester: number;
  enrollmentDate: string;
  studentId: string;
  credits: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  available: boolean;
  category: string;
  isbn: string;
  publisher: string;
  publishedYear: number;
  edition: string;
  totalCopies: number;
  availableCopies: number;
  location: string;
  borrowHistory: BorrowRecord[];
}

export interface BorrowRecord {
  userId: string;
  borrowDate: string;
  returnDate: string | null;
  dueDate: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  department: string;
  credits: number;
  semester: number;
  instructor: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    room: string;
  }[];
  prerequisites: string[];
  syllabus: string;
  enrolledStudents: string[];
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'homework' | 'exam' | 'project' | 'other';
  course?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  preparationTime: number;
  ingredients: string[];
  allergens?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
}