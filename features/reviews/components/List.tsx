'use client'
import { useReviews } from '../hooks/hook'

export default function ReviewsList() {
	const { reviews, loading, error } = useReviews()

	if (loading) return <p className="text-center text-gray-600">Yükleniyor...</p>
	if (error) return <p className="text-center text-red-500">Hata: {error}</p>

	return (
		<div className="mt-16">
			<h2 className="text-2xl font-bold text-gray-900 mb-6">Mevcut İncelemeler</h2>
			{loading && <p className="text-center text-gray-600">Yükleniyor...</p>}
			{error && <p className="text-center text-red-500">Hata: {error}</p>}
			{!loading && !error && (
				<div className="space-y-6">
					{reviews.map((review) => (
						<div key={review.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
							<div className="px-4 py-5 sm:px-6">
								<h3 className="text-lg leading-6 font-medium text-gray-900">{review.title}</h3>
								{review.rating !== undefined && (
									<p className="mt-1 max-w-2xl text-sm text-yellow-500">Puan: {review.rating.toFixed(1)} / 5</p>
								)}
							</div>
							<div className="border-t border-gray-200">
								<div className="px-4 py-5 sm:p-6">
									<p className="text-gray-700">{review.content}</p>
								</div>
								<div className="px-4 py-4 sm:px-6 bg-gray-50">
									<p className="text-sm text-gray-500">
										İnceleme tarihi: {new Date(review.createdAt).toLocaleString()}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
