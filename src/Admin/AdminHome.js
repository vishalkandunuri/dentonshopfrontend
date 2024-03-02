import React, { useState } from "react";
import ManageProducts from "./Product/ManageProducts";
import ManageInventories from "./Inventory/ManageInventories";
import AdminOrdersHome from"./Orders/AdminOrdersHome"
import configDetails from "../Config/Config";

const AdminHome = ({ userEmail, authIdToken }) => {
  const [mode, setMode] = useState('');

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const isAllowedUser = configDetails.adminUsers.includes(userEmail);

  return (
    <div style={{ marginLeft: '20px', marginRight: '20px', width: 'auto' }}>
      <h1 style={{ backgroundColor: '#33FF', color: 'white', textAlign: 'center', padding: '5px' }}> Admin Portal</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
        {isAllowedUser && (
          <>
            <button style={{ margin: '2px', width: 'auto', height: '40px' }} onClick={() => handleModeChange('manageOrders')}>
              Manage Orders
            </button>
            <button style={{ margin: '2px', width: 'auto', height: '40px' }} onClick={() => handleModeChange('manageProducts')}>
              Manage Products
            </button>
            <button style={{ margin: '2px', width: 'auto', height: '40px' }} onClick={() => handleModeChange('manageInventories')}>
              Manage Inventories
            </button>
          </>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {mode==='manageOrders' && <AdminOrdersHome userEmail={userEmail } authIdToken={authIdToken}/>}
        {mode==='manageProducts' && <ManageProducts userEmail={userEmail } authIdToken={authIdToken}/>}
        {mode==='manageInventories' && <ManageInventories userEmail={userEmail } authIdToken={authIdToken}/>}
      </div>
    </div>
  );
}

export default AdminHome;
