'use client'

import React, { useState } from 'react'

import { ReviewForm } from '@/features/reviews/components/Form'
import ReviewList from '@/features/reviews/components/List'

export default function ReviewsPage() {
	const [refreshKey, setRefreshKey] = useState(0)

	const handleReviewSubmitted = () => {
		setRefreshKey((oldKey) => oldKey + 1)
	}

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold">Kitap İncelemeleri</h1>
			<ReviewForm onReviewSubmitted={handleReviewSubmitted} />
			<ReviewList key={refreshKey} />
		</div>
	)
}
