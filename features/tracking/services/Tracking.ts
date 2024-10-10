import { Book, CreateBookData } from "../types/type";
import { fetchBooks, postBook } from "../queries/useTracking";

export const getBooks = async (): Promise<Book[]> => {
  const books = await fetchBooks();
  return books.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const createBook = async (bookData: CreateBookData) => {
  // Burada veri doğrulama veya işleme yapabilirsiniz
  const newBook = await postBook(bookData);
  return newBook;
};