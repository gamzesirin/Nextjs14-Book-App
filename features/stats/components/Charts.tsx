'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { useReadingStats } from '../hooks/hook'

export default function RatingDistributionChart() {
	const { stats, loading, error } = useReadingStats()

	if (loading || error || !stats) return null

	const data = [
		{ name: 'Ortalama Puan', value: stats.averageRating || 0 },
		{ name: 'Kalan', value: 5 - (stats.averageRating || 0) }
	]

	const COLORS = ['#0088FE', '#FFBbb3']

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Rating Distribution</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ResponsiveContainer width="100%" height={400}>
					<PieChart>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							innerRadius={60}
							outerRadius={80}
							fill="#8884d8"
							paddingAngle={5}
							dataKey="value"
							isAnimationActive={false}
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
							<Label
								value={stats.averageRating?.toFixed(2)}
								position="center"
								fill="#333"
								style={{ fontSize: '24px', fontWeight: 'bold' }}
							/>
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm text-center">
				<div className="leading-none text-muted-foreground">Ortalama Puan</div>
			</CardFooter>
		</Card>
	)
}
