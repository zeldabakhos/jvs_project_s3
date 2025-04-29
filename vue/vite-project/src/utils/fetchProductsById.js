import.meta.env.VITE_API_URL

const uri = `${import.meta.env.VITE_API_URL}/api/products/seeProductId`


export const fetchProductById = async (_id) => {
    try {
        const response = await fetch(`${uri}/${_id}`); 
        if (!response.ok) {
            throw new Error("Failed to fetch product details");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};