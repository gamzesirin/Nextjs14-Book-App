// app/profile/components/RecentActivity.tsx

import React from 'react'

export default function RecentActivity() {
	// Bu veriler normalde bir API'den gelecektir
	const activities = [
		{ id: 1, type: 'finish', book: '1984', date: '2023-08-15' },
		{ id: 2, type: 'start', book: 'Dune', date: '2023-08-10' },
		{ id: 3, type: 'review', book: 'Suç ve Ceza', date: '2023-08-05' }
	]

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="text-2xl font-semibold mb-4">Son Aktiviteler</h2>
			<ul className="space-y-4">
				{activities.map((activity) => (
					<li key={activity.id} className="flex items-center space-x-2">
						{activity.type === 'finish' && <span className="text-green-500">✓</span>}
						{activity.type === 'start' && <span className="text-blue-500">▶</span>}
						{activity.type === 'review' && <span className="text-yellow-500">★</span>}
						<span>
							<strong>{activity.book}</strong>
							{activity.type === 'finish' && ' kitabını bitirdi'}
							{activity.type === 'start' && ' kitabına başladı'}
							{activity.type === 'review' && ' kitabını inceledi'}
						</span>
						<span className="text-gray-500 text-sm">{activity.date}</span>
					</li>
				))}
			</ul>
		</div>
	)
}
