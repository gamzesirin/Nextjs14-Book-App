// app/profile/components/UserInfo.tsx

import React from 'react'

export default function UserInfo() {
	// Bu veriler normalde bir API'den gelecektir
	const user = {
		name: 'Ahmet Yılmaz',
		email: 'ahmet@example.com',
		joinDate: '01.01.2023',
		favoriteGenre: 'Bilim Kurgu'
	}

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="text-2xl font-semibold mb-4">Kullanıcı Bilgileri</h2>
			<div className="space-y-2">
				<p>
					<strong>Ad Soyad:</strong> {user.name}
				</p>
				<p>
					<strong>E-posta:</strong> {user.email}
				</p>
				<p>
					<strong>Üyelik Tarihi:</strong> {user.joinDate}
				</p>
				<p>
					<strong>Favori Tür:</strong> {user.favoriteGenre}
				</p>
			</div>
		</div>
	)
}
