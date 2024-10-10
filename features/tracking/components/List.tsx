'use client'

import React, { useEffect, useState } from 'react'

import { Book } from '../types/type'
import { getBooks } from '../services/Tracking'

export default function BookList() {
	const [books, setBooks] = useState<Book[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetchBooks()
	}, [])

	const fetchBooks = async () => {
		try {
			const fetchedBooks = await getBooks()
			setBooks(fetchedBooks)
			setLoading(false)
		} catch (err) {
			setError('Kitaplar yüklenirken bir hata oluştu.')
			setLoading(false)
		}
	}

	if (loading) return <p>Yükleniyor...</p>
	if (error) return <p>Hata: {error}</p>

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-semibold">Okuduğum Kitaplar</h2>
			{books.length === 0 ? (
				<p>Henüz kitap eklenmemiş.</p>
			) : (
				books.map((book) => (
					<div key={book._id} className="border p-4 rounded flex justify-between items-center">
						<div>
							<h3 className="font-bold">{book.title}</h3>
							<p className="text-gray-600">{book.author}</p>
							<p className="text-sm text-gray-500">{book.pages} sayfa</p>
						</div>
						<div className="w-32">
							<div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
								<div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${book.progress}%` }}></div>
							</div>
							<p className="text-sm text-gray-500 text-right mt-1">{book.progress}%</p>
						</div>
					</div>
				))
			)}
		</div>
	)
}
