// app/auth/layout.tsx

import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return <div className="min-h-screen flex items-center justify-center bg-gray-100">{children}</div>
}
