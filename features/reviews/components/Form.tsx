'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const reviewSchema = z.object({
	bookTitle: z.string().min(1, 'Kitap adı gereklidir'),
	review: z.string().min(10, 'İnceleme en az 10 karakter olmalıdır'),
	rating: z.number().min(0).max(5).step(0.1) // Yeni eklenen alan
})

type ReviewFormData = z.infer<typeof reviewSchema>
type ReviewFormProps = {
	onReviewSubmitted: () => void
}
export function ReviewForm({ onReviewSubmitted }: ReviewFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)

	const form = useForm<ReviewFormData>({
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			bookTitle: '',
			review: '',
			rating: 0 // Yeni eklenen alan için varsayılan değer
		}
	})

	async function onSubmit(data: ReviewFormData) {
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
				const errorData = await response.json()
				throw new Error(errorData.error || 'İnceleme gönderilemedi')
			}

			const result = await response.json()
			console.log('Sunucu yanıtı:', result)
			form.reset()
			onReviewSubmitted() // Yeni inceleme eklendiğinde bu fonksiyonu çağır
		} catch (error) {
			console.error('İnceleme gönderilirken hata oluştu:', error)
			setSubmitError(
				error instanceof Error ? error.message : 'İnceleme gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* Mevcut alanlar */}
				<FormField
					control={form.control}
					name="bookTitle"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Kitap Adı</FormLabel>
							<FormControl>
								<Input placeholder="Kitap Adı" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="review"
					render={({ field }) => (
						<FormItem>
							<FormLabel>İnceleme</FormLabel>
							<FormControl>
								<Textarea placeholder="İncelemenizi yazın..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Yeni eklenen puan alanı */}
				<FormField
					control={form.control}
					name="rating"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Puan (0-5)</FormLabel>
							<FormControl>
								<Input
									type="number"
									step="0.1"
									min="0"
									max="5"
									placeholder="Puanınız (0-5)"
									{...field}
									onChange={(e) => field.onChange(parseFloat(e.target.value))}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{submitError && <p className="text-red-500">{submitError}</p>}
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Gönderiliyor...' : 'İnceleme Gönder'}
				</Button>
			</form>
		</Form>
	)
}
