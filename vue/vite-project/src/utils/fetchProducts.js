const uri = "http://localhost:3000/api/products/seeProduct"

export const fetchProducts = async () => {
    try {
        
        const response = await fetch(uri)
        if (!response.ok) {
            throw new Error('Failed to fetch product')
        }
        
        const data = await response.json()
        console.log("Fetched products:", data);
        return data

        } catch (error) {
            console.error("Error fetching products", error)
            throw error
            }
        }