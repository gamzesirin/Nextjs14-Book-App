import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("book-reviews");
    
    const { bookTitle, review, rating } = await request.json();
    
    if (!bookTitle || !review) {
      return NextResponse.json({ error: 'Kitap başlığı ve inceleme içeriği gereklidir.' }, { status: 400 });
    }

    const result = await db.collection("reviews").insertOne({
      title: bookTitle,
      content: review,
      rating: rating !== undefined ? parseFloat(rating) : undefined,  // Opsiyonel olarak eklendi
      createdAt: new Date()
    });

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ success: false, error: 'İnceleme oluşturulamadı' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("book-reviews");
    
    const reviews = await db.collection("reviews")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'İncelemeler alınamadı' }, { status: 500 });
  }
}