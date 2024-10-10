async function fetchWithErrorHandling(url: string, options?: RequestInit) {
	const response = await fetch(url, options)
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}
	return await response.json()
}

export const fetchReviews = async () => {
	try {
		return await fetchWithErrorHandling('/api/reviews')
	} catch (error) {
		console.error('İncelemeleri çekerken hata oluştu:', error)
		throw error
	}
}

export const fetchReviewById = async (id: string) => {
	try {
		return await fetchWithErrorHandling(`/api/reviews/${id}`)
	} catch (error) {
		console.error(`${id} ID'li incelemeyi çekerken hata oluştu:`, error)
		throw error
	}
}

export const postReview = async (reviewData: any) => {
	try {
		return await fetchWithErrorHandling('/api/reviews', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(reviewData)
		})
	} catch (error) {
		console.error('İnceleme gönderirken hata oluştu:', error)
		throw error
	}
}

export const updateReview = async (id: string, reviewData: any) => {
	try {
		return await fetchWithErrorHandling(`/api/reviews/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(reviewData)
		})
	} catch (error) {
		console.error(`${id} ID'li incelemeyi güncellerken hata oluştu:`, error)
		throw error
	}
}

export const deleteReview = async (id: string) => {
	try {
		return await fetchWithErrorHandling(`/api/reviews/${id}`, {
			method: 'DELETE'
		})
	} catch (error) {
		console.error(`${id} ID'li incelemeyi silerken hata oluştu:`, error)
		throw error
	}
}
