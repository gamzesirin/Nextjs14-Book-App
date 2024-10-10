'use client'

import React, { useState } from 'react'

import { AddBookForm } from '@/features/tracking/components/Form'
import BookList from '@/features/tracking/components/List'

export default function TrackingPage() {
	const [refreshKey, setRefreshKey] = useState(0)

	const handleBookAdded = () => {
		setRefreshKey((oldKey) => oldKey + 1)
	}

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold">Kitap Takibi</h1>
			<AddBookForm onBookAdded={handleBookAdded} />
			<BookList key={refreshKey} />
		</div>
	)
}
