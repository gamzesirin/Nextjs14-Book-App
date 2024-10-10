'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
	useEffect(() => {
		// Burada normalde bir auth kontrolü yapılır
		const isAuthenticated = false // Örnek olarak false verdik
		if (!isAuthenticated) {
			redirect('/auth')
		} else {
			redirect('/profile')
		}
	}, [])

	return null // Bu sayfa sadece yönlendirme yapacak
}
