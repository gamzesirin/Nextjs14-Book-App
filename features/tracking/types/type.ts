export interface Book {
    _id: string;
    title: string;
    author: string;
    pages: number;
    progress: number;
    createdAt: string;
  }
  
  export type CreateBookData = Omit<Book, '_id' | 'progress' | 'createdAt'>;