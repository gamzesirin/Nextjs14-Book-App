import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("book-reviews");
    
    const books = await db.collection("tracking")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(books);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Kitaplar alınamadı' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("book-reviews");
    
    const { title, author, pages } = await request.json();
    
    if (!title || !author || !pages) {
      return NextResponse.json({ error: 'Tüm alanlar gereklidir.' }, { status: 400 });
    }

    const result = await db.collection("tracking").insertOne({
      title,
      author,
      pages,
      progress: 0,
      createdAt: new Date()
    });

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ success: false, error: 'Kitap eklenemedi' }, { status: 500 });
  }
}