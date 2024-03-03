import configDetails from "../../Config/Config";

async function AllSubCategories(authIdToken) {
    try {
        const url = `${configDetails.baseUrl}${configDetails.allSubCategories}`;  
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':authIdToken
            }
        });
        const subCategoriesData = await response.json();
        return subCategoriesData;
    } catch (error) {
        console.log("Failed to fetch Categories.", error);
        throw error; 
    }
}

export default AllSubCategories;
