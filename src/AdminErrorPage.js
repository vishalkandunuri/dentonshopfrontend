import React, { useState } from "react";

const AdminPageError = () => {
    const [showModal, setShowModal] = useState(true);

    const redirectToHomePage = () => {
        window.location.href = `/`;
        setShowModal(false); 
    };

    return (
        <>
            {showModal && (
                <div className="modal" style={modalStyle}>
                    <div className="modal-content" style={modalContentStyle}>
                        <h4 style={{textAlign:'center'}}> Wait Wait.....</h4>
                        <p style={{textAlign:'center', color:'red'}}>You don't have access to this page.</p>
                        <p style={{textAlign:'center'}}>Please contact DentonProject Admins at abc@xyz.com.</p>
                        <button style={{display: 'flex', justifyContent: 'center'}} onClick={redirectToHomePage}>Okay</button>
                    </div>
                </div>
            )}
        </>
    );
};

// Define inline styles for the modal and modal content
const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 1000 
};

const modalContentStyle = {
    width: '50%', 
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
};

export default AdminPageError;
