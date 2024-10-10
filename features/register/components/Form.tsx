// 'use client'

// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'

// const formSchema = z.object({
// 	name: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
// 	email: z.string().email('Geçerli bir e-posta adresi giriniz'),
// 	password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır')
// })

// export function RegisterForm() {
// 	const form = useForm<z.infer<typeof formSchema>>({
// 		resolver: zodResolver(formSchema),
// 		defaultValues: {
// 			name: '',
// 			email: '',
// 			password: ''
// 		}
// 	})

// 	function onSubmit(values: z.infer<typeof formSchema>) {
// 		console.log(values)
// 		// Kayıt işlemleri burada yapılacak
// 	}

// 	return (
// 		<Form {...form}>
// 			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
// 				<FormField
// 					control={form.control}
// 					name="name"
// 					render={({ field }) => (
// 						<FormItem>
// 							<FormLabel>Ad Soyad</FormLabel>
// 							<FormControl>
// 								<Input placeholder="John Doe" {...field} />
// 							</FormControl>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 				<FormField
// 					control={form.control}
// 					name="email"
// 					render={({ field }) => (
// 						<FormItem>
// 							<FormLabel>E-posta</FormLabel>
// 							<FormControl>
// 								<Input placeholder="ornek@email.com" {...field} />
// 							</FormControl>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 				<FormField
// 					control={form.control}
// 					name="password"
// 					render={({ field }) => (
// 						<FormItem>
// 							<FormLabel>Şifre</FormLabel>
// 							<FormControl>
// 								<Input type="password" placeholder="******" {...field} />
// 							</FormControl>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 				<Button type="submit" className="w-full">
// 					Kayıt Ol
// 				</Button>
// 			</form>
// 		</Form>
// 	)
// }

'use client'

import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

type FormData = {
	bookTitle: string
	review: string
}

export default function ReviewForm() {
	const { register, handleSubmit, reset } = useForm<FormData>()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)

	const onSubmit = async (data: FormData) => {
		setIsSubmitting(true)
		setSubmitError(null)

		try {
			const response = await fetch('/api/reviews', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})

			if (!response.ok) {
				throw new Error('Sunucu hatası')
			}

			const result = await response.json()
			console.log('İnceleme başarıyla gönderildi:', result)
			reset()
		} catch (error) {
			console.error('İnceleme gönderilirken hata oluştu:', error)
			setSubmitError('İnceleme gönderilemedi. Lütfen tekrar deneyin.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register('bookTitle')} placeholder="Kitap Adı" required />
			<textarea {...register('review')} placeholder="İncelemeniz" required />
			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
			</button>
			{submitError && <p style={{ color: 'red' }}>{submitError}</p>}
		</form>
	)
}
