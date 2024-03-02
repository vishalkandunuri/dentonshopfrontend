import configDetails from "../../Config/Config";

async function AllManufactures() {
    try {
        const url = `${configDetails.baseUrl}${configDetails.allManufacturers}`;  
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const ManufacturersData = await response.json();
        return ManufacturersData;
    } catch (error) {
        console.log("Failed to fetch Categories.", error);
        throw error; 
    }
}

export default AllManufactures;
