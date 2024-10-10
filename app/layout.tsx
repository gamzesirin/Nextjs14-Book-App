import Footer from '@/components/main/Footer'
import Header from '@/components/main/Header'
import NextAuthSessionProvider from '@/providers/NextAuthProviders'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<NextAuthSessionProvider>
			<html lang="tr">
				<body>
					<div className="flex flex-col min-h-screen">
						<Header />
						<main className="flex-grow container mx-auto px-4 py-8">{children}</main>
						<Footer />
					</div>
				</body>
			</html>
		</NextAuthSessionProvider>
	)
}
