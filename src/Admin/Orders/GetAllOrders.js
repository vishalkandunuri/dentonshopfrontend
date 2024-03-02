import configDetails from "../../Config/Config";

async function getAllOrders(){
    try{
        const api = `${configDetails.baseUrl}${configDetails.getAllOrders}`;
        const response = await fetch(api);
        if(response.ok){
            const orders = await response.json();
            return orders;
        } else {
            throw new Error('Failed to fetch user orders');
        }
    }
    catch(error){
        console.error('Error fetching user orders:', error);
        throw error; 
    }
}

export default getAllOrders;
