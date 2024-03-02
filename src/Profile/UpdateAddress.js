import React, { useState, useEffect } from "react";
import './AddAddress.css'; 
import configDetails from "../Config/Config";

const UpdateAddress = ({ onClose, userEmail, address }) => {
    const [addressDetails, setAddressDetails] = useState({
        id:address.id,
        name: address.name,
        address1: address.address1,
        address2: address.address2,
        city: address.city,
        state: address.state,
        zip: address.zip,
        phone: address.phone
    });

    useEffect(() => {
        // Update address details when the address prop changes
        setAddressDetails({
            name: address.name,
            address1: address.address1,
            address2: address.address2,
            city: address.city,
            state: address.state,
            zip: address.zip,
            phone: address.phone
        });
    }, [address]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleUpdateAddress = async () => {
        try {
            const response = await fetch(`${configDetails.baseUrl}${configDetails.updateAddress}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id:address.id,
                    name: addressDetails.name,
                    email: userEmail,
                    address1: addressDetails.address1,
                    address2: addressDetails.address2,
                    city: addressDetails.city,
                    state: addressDetails.state,
                    zip: parseInt(addressDetails.zip),
                    phone: addressDetails.phone
                })
            });

            if (response.ok) {
                onClose();
            } else {
                console.error('Failed to update address:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Update Address</h2>
                <input type="text" name="name" value={addressDetails.name} onChange={handleInputChange} placeholder="Name" />
                <input type="text" name="address1" value={addressDetails.address1} onChange={handleInputChange} placeholder="Address Line 1" />
                <input type="text" name="address2" value={addressDetails.address2} onChange={handleInputChange} placeholder="Address Line 2" />
                <input type="text" name="city" value={addressDetails.city} onChange={handleInputChange} placeholder="City" />
                <input type="text" name="state" value={addressDetails.state} onChange={handleInputChange} placeholder="State" />
                <input type="number" name="zip" value={addressDetails.zip} onChange={handleInputChange} placeholder="ZIP Code" />
                <input type="text" name="phone" value={addressDetails.phone} onChange={handleInputChange} placeholder="Phone Number" />
                <button onClick={handleUpdateAddress}>Update Address</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default UpdateAddress;
