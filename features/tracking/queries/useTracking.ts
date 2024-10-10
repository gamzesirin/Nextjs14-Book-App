async function fetchWithErrorHandling(url: string, options?: RequestInit) {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }
  
  export const fetchBooks = async () => {
    try {
      return await fetchWithErrorHandling('/api/tracking')
    } catch (error) {
      console.error('Kitapları çekerken hata oluştu:', error)
      throw error
    }
  }
  
  export const fetchBookById = async (id: string) => {
    try {
      return await fetchWithErrorHandling(`/api/tracking/${id}`)
    } catch (error) {
      console.error(`${id} ID'li kitabı çekerken hata oluştu:`, error)
      throw error
    }
  }
  
  export const postBook = async (bookData: any) => {
    try {
      return await fetchWithErrorHandling('/api/tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      })
    } catch (error) {
      console.error('Kitap eklerken hata oluştu:', error)
      throw error
    }
  }
  
  export const updateBook = async (id: string, bookData: any) => {
    try {
      return await fetchWithErrorHandling(`/api/tracking/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      })
    } catch (error) {
      console.error(`${id} ID'li kitabı güncellerken hata oluştu:`, error)
      throw error
    }
  }
  
  export const deleteBook = async (id: string) => {
    try {
      return await fetchWithErrorHandling(`/api/tracking/${id}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.error(`${id} ID'li kitabı silerken hata oluştu:`, error)
      throw error
    }
  }