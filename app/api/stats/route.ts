import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface Book {
  title: string;
  _id: ObjectId;
  genre: string;
  pages: number;
  readDate: string;
}

interface Review {
  _id: ObjectId;
  rating: number;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("book-reviews");
    
    const reviews = await db.collection<Review>("reviews").find({}).toArray();
    const books = await db.collection<Book>("tracking").find({}).toArray();

    // Kitap başlıklarını ve sayfa sayılarını içeren bir dizi oluşturun
    const bookPages = books.map(book => ({
      title: book.title, // Kitap başlığı
      pages: book.pages
    }));
        
    const totalBooks = books.length;
    const totalPages = books.reduce((sum, book) => sum + (book.pages || 0), 0);
    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length
      : null;

    const genreDistribution = books.reduce<Record<string, number>>((acc, book) => {
      if (book.genre) {
        acc[book.genre] = (acc[book.genre] || 0) + 1;
      }
      return acc;
    }, {});

    const monthlyReadCount = books.reduce<Record<string, number>>((acc, book) => {
      if (book.readDate) {
        const month = new Date(book.readDate).toLocaleString('default', { month: 'long' });
        acc[month] = (acc[month] || 0) + 1;
      }
      return acc;
    }, {});

    return NextResponse.json({
      totalBooks,
      totalPages,
      averageRating,
      genreDistribution,
      monthlyReadCount,
      bookPages
    });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'İstatistikler alınamadı' }, { status: 500 });
  }
}