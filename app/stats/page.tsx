import BookPagesChart from '@/features/stats/components/BookPagesChart'
import RatingDistributionChart from '@/features/stats/components/Charts'
import ReadingStats from '@/features/stats/components/ReadingStats'
import { Suspense } from 'react'

export default function StatsPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Reading Stats</h1>
			<ReadingStats />
			<Suspense fallback={<div>Loading chart...</div>}>
				<RatingDistributionChart />
				<BookPagesChart />
			</Suspense>
		</div>
	)
}
