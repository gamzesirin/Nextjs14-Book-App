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
