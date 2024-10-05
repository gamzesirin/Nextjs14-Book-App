import Link from 'next/link'
import React from 'react'

const Header = () => {
	return (
		<header className="bg-blue-500 text-white p-4">
			<nav className="container mx-auto flex justify-between items-center">
				<Link href="/profile" className="text-xl font-bold">
					Kitap Okuma App
				</Link>
				<ul className="flex space-x-4">
					<li>
						<Link href="/profile">Profil</Link>
					</li>
					<li>
						<Link href="/reviews">İncelemeler</Link>
					</li>
					<li>
						<Link href="/stats">İstatistikler</Link>
					</li>
					<li>
						<Link href="/tracking">Kitap Takibi</Link>
					</li>
					<li>
						<Link href="/auth">Çıkış</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
