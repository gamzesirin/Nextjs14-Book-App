// app/auth/page.tsx
'use client'

import React, { useState } from 'react'

import Login from './login/page'
import Register from './register/page'

export default function AuthPage() {
	const [isLogin, setIsLogin] = useState(true)

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-96">
				<h1 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</h1>
				{isLogin ? <Login /> : <Register />}
				<button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-sm text-blue-500 hover:underline">
					{isLogin ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten hesabınız var mı? Giriş yapın'}
				</button>
			</div>
		</div>
	)
}
