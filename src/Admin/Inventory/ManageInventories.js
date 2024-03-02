import React, { useState } from "react";
import ManageCategories from "./ManageCategories";
import ManageSubCategories from "./ManageSubCategories";
import ManageManufacturers from "./ManageManufacturers";

const ManageInventories = ({ userEmail, authIdToken }) => {
    return (
        <div style={{ display: 'flex', backgroundColor: '#f0f0f0', border:'2px solid #ccc', marginTop:'20px' }}>
            <div style={{ flex: 1, borderRight: '2px solid #ccc' }}>
                <ManageCategories userEmail={userEmail} authIdToken={authIdToken} />
            </div>
            <div style={{ flex: 1, borderRight: '2px solid #ccc' }}>
                <ManageSubCategories userEmail={userEmail} authIdToken={authIdToken} />
            </div>
            <div style={{ flex: 1 }}>
                <ManageManufacturers userEmail={userEmail} authIdToken={authIdToken} />
            </div>
        </div>
    );
};

export default ManageInventories;
