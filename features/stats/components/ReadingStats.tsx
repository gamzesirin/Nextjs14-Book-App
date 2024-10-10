'use client'

import React from 'react'
import { useReadingStats } from '../hooks/hook'

export default function ReadingStats() {
	const { stats, loading, error } = useReadingStats()

	if (loading) return <p>Yükleniyor...</p>
	if (error) return <p>Hata: {error}</p>
	if (!stats) return <p>İstatistik bulunamadı.</p>

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div className="bg-blue-100 p-4 rounded">
				<h3 className="font-semibold">Toplam Okunan Kitap</h3>
				<p className="text-2xl font-bold">{stats.totalBooks}</p>
			</div>
			<div className="bg-green-100 p-4 rounded">
				<h3 className="font-semibold">Toplam Okunan Sayfa</h3>
				<p className="text-2xl font-bold">{stats.totalPages}</p>
			</div>
			<div className="bg-yellow-100 p-4 rounded">
				<h3 className="font-semibold">Ortalama Puan</h3>
				<p className="text-2xl font-bold">
					{typeof stats.averageRating === 'number' ? stats.averageRating.toFixed(2) : 'N/A'}
				</p>
			</div>
		</div>
	)
}
