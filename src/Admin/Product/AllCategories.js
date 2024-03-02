import configDetails from "../../Config/Config";

async function AllCategories() {
    try {
        const url = `${configDetails.baseUrl}${configDetails.allCategories}`; // Corrected variable name from `api` to `url`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const categoriesData = await response.json();
        return categoriesData;
    } catch (error) {
        console.log("Failed to fetch Categories.", error);
        throw error; 
    }
}

export default AllCategories;
