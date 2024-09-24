import './globals.css' // Eğer global CSS dosyanız varsa

import Footer from '@/components/main/Footer'
import Header from '@/components/main/Header'
// app/layout.tsx
import React from 'react'

export const metadata = {
	title: 'Kitap Okuma Uygulaması',
	description: 'Kitaplarınızı takip edin ve inceleyin'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="tr">
			<body>
				<div className="flex flex-col min-h-screen">
					<Header />
					<main className="flex-grow container mx-auto px-4 py-8">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	)
}
