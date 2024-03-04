import React, { useEffect, useState } from "react";
import "./Profile.css";
import getAllUserAddresses from "./AllUserAddresses";
import AddAddress from "./AddAddress";
import UpdateAddress from "./UpdateAddress"; 
import configDetails from "../Config/Config";

const Profile = ({ userEmail, authUserName, authPhone, authIdToken }) => {
    const [allAddresses, setAllAddresses] = useState([]);
    const [isAddAddressPopupOpen, setIsAddAddressPopupOpen] = useState(false);
    const [isUpdateAddressPopupOpen, setIsUpdateAddressPopupOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null); // State to store the selected address for update
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userEmail) {
            fetchUserAddresses();
        }
    }, [userEmail]);

    const fetchUserAddresses = async () => {
        try {
            setIsLoading(true);
            const addresses = await getAllUserAddresses(userEmail, authIdToken);
            setAllAddresses(addresses);
        } catch (error) {
            console.error("Failed to fetch addresses:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openAddAddressPopup = () => {
        setIsAddAddressPopupOpen(true);
    };

    const closeAddAddressPopup = () => {
        setIsAddAddressPopupOpen(false);
        fetchUserAddresses();
    };

    const openUpdateAddressPopup = (address) => {
        setSelectedAddress(address);
        setIsUpdateAddressPopupOpen(true);
    };

    const closeUpdateAddressPopup = () => {
        setSelectedAddress(null);
        setIsUpdateAddressPopupOpen(false);
        fetchUserAddresses();
    };

    const handleEditAddress = (address) => {
        openUpdateAddressPopup(address);
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            const response = await fetch(`${configDetails.baseUrl}${configDetails.deleteAddress}/${addressId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':authIdToken
                }
            });

            if (response.ok) {
                // Address deleted successfully
                fetchUserAddresses();
                console.log("Address deleted successfully.");
            } else {
                console.error("Failed to delete address:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting address:", error);
        }
    };

    return (
        <div className="profile-container">
            <h2 style={{ textAlign: "center" }}>Profile Page</h2>
            <div className="profile-card">
                <strong>Email:</strong> {userEmail}
            </div>
            <div className="profile-card">
                <strong>Name:</strong> {authUserName}
            </div>
            <div className="profile-card">
                <strong>Phone:</strong> {authPhone}
            </div>
            <div className="add-address">
                <h3>All Addresses</h3>
                <button onClick={openAddAddressPopup} style={{ width: 'auto', backgroundColor: 'aqua', fontSize: '15px' }}> Add Address</button>
            </div>
            {isLoading && <p>Loading addresses...</p>}
            {allAddresses.length === 0 && !isLoading && <p style={{textAlign:'center'}}>No addresses found, try after sometime.</p>}
            {allAddresses.length > 0 && (
                <>
                    {allAddresses.map((address, index) => (
                        <div className="profile-addresses" key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                            <h4>Address {index + 1}: 
                                <button onClick={() => handleEditAddress(address)}>Edit</button>
                                <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                            </h4>
                            <strong>Name:</strong> {address.name}<br />
                            <strong>Address Line 1:</strong> {address.address1}<br />
                            <strong>Address Line 2:</strong> {address.address2}<br />
                            <strong>City:</strong> {address.city}<br />
                            <strong>State:</strong> {address.state}<br />
                            <strong>ZIP Code:</strong> {address.zip}<br />
                            <strong>Phone:</strong> {address.phone}<br />
                        </div>
                    ))}
                </>
            )}
            {isAddAddressPopupOpen && <AddAddress authIdToken={authIdToken} userEmail={userEmail} onClose={closeAddAddressPopup} />}
            {isUpdateAddressPopupOpen && <UpdateAddress authIdToken={authIdToken} userEmail={userEmail} onClose={closeUpdateAddressPopup} address={selectedAddress} />}
        </div>
    );
};

export default Profile;
