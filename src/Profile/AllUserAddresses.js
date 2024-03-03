import configDetails from "../Config/Config";

async function getAllUserAddresses(userEmail, authIdToken) {
    try {
        const api = `${configDetails.baseUrl}${configDetails.allUserAddreses}?email=${userEmail}`;
        const response = await fetch(api, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization':authIdToken
            }
        });
        if (response.ok) {
            const addresses = await response.json();
            return addresses;
        } else {
            throw new Error("Failed to fetch addresses");
        }
    } catch (error) {
        throw new Error("Failed to fetch addresses: " + error.message);
    }
}

export default getAllUserAddresses;
