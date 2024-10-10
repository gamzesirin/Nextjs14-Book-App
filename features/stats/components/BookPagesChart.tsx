'use client'

import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useReadingStats } from '../hooks/hook'

export default function BookPagesChart() {
	const { stats, loading, error } = useReadingStats()

	console.log('BookPagesChart rendered', { stats, loading, error }) // Hata ayıklama için log

	if (loading) return <p>Yükleniyor...</p>
	if (error) return <p>Hata: {error}</p>
	if (!stats) return <p>İstatistik bulunamadı.</p>
	if (!stats.bookPages || stats.bookPages.length === 0) {
		console.log('No book pages data available') // Hata ayıklama için log
		return <p>Kitap sayfa sayısı verisi bulunamadı.</p>
	}

	console.log('Rendering chart with data:', stats.bookPages) // Hata ayıklama için log

	return (
		<Card className="w-full mt-6">
			<CardHeader>
				<CardTitle>Kitapların Sayfa Sayıları</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={400}>
					<BarChart data={stats.bookPages}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="title" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={100} />
						<YAxis />
						<Tooltip />
						<Bar dataKey="pages" fill="#8884d8" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
