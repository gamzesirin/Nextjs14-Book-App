'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createBook } from '../services/Tracking'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const bookSchema = z.object({
	title: z.string().min(1, 'Kitap adı gereklidir'),
	author: z.string().min(1, 'Yazar adı gereklidir'),
	pages: z.coerce.number().min(1, 'Sayfa sayısı en az 1 olmalıdır').int('Sayfa sayısı tam sayı olmalıdır')
})

type AddBookFormProps = {
	onBookAdded: () => void
}

export function AddBookForm({ onBookAdded }: AddBookFormProps) {
	const form = useForm<z.infer<typeof bookSchema>>({
		resolver: zodResolver(bookSchema),
		defaultValues: {
			title: '',
			author: '',
			pages: undefined
		}
	})

	async function onSubmit(values: z.infer<typeof bookSchema>) {
		try {
			await createBook(values)
			console.log('Kitap eklendi:', values)
			form.reset()
			onBookAdded()
		} catch (error) {
			console.error('Kitap eklenirken hata oluştu:', error)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
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
					name="author"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Yazar</FormLabel>
							<FormControl>
								<Input placeholder="Yazar" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="pages"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sayfa Sayısı</FormLabel>
							<FormControl>
								<Input type="number" placeholder="Sayfa Sayısı" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Kitap Ekle</Button>
			</form>
		</Form>
	)
}
