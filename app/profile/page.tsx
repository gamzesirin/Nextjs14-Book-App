// app/profile/page.tsx

import React from 'react'
import ReadingStats from '@/features/stats/components/ReadingStats'
import RecentActivity from '@/features/profile/components/RecentActivity'
import UserInfo from '@/features/profile/components/UserInfo'

export default function ProfilePage() {
	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold">Profil</h1>
			<UserInfo />
			<ReadingStats />
			<RecentActivity />
		</div>
	)
}
