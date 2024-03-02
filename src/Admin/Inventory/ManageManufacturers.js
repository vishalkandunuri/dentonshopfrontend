import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import configDetails from "../../Config/Config";
import AlertStatus from "../../AlertStatus";
import "../Styles/InventoryStyles.css"

const ManageManufacturers = ({ userEmail, authIdToken }) => {
  const [manufacturers, setManufacturers] = useState([]);
  const [newManufacturer, setNewManufacturer] = useState('');
  const [newManufacturerAddress, setNewManufacturerAddress] = useState('');
  const [editManufacturerId, setEditManufacturerId] = useState(null);
  const [editedManufacturer, setEditedManufacturer] = useState({ name: '', address: '' });
  const [alert, setAlert] = useState(null);

  const handleAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const fetchManufacturers = async () => {  
    try {
      const url = `${configDetails.baseUrl}${configDetails.allManufacturers}`;
      const response = await fetch(url,{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch Manufacturers. Status: ${response.status}`);
      }

      const ManufacturersData = await response.json();
      setManufacturers(ManufacturersData);
    } catch (error) {
      handleAlert("Failed to fetch Manufacturers. Please try again later.", "danger");
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);


  const handleAddManufacturer = async () => {
    if (!newManufacturer.trim() || !newManufacturerAddress.trim()) {
      handleAlert('Please enter both name, address for the new Manufacturer.', 'danger');
      return;
    }
    try {
      const url = `${configDetails.baseUrl}${configDetails.addManufacturer}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: newManufacturer,
          address: newManufacturerAddress,
        }),
      });

      if (response.ok) {
        setNewManufacturer('');
        setNewManufacturerAddress('');
        fetchManufacturers();
        handleAlert('Manufacturer added successfully.', 'success');
      } else {
        handleAlert("Manufacturer already exists.", "danger");
      }
    } catch (error) {
      handleAlert('Failed to add Manufacturer. Please try after sometime.', 'danger');
    }
  };

  const handleUpdateManufacturer = async (id) => {
    if (!editedManufacturer.name.trim() || !editedManufacturer.address.trim()) {
      handleAlert('Please enter both name and address for the updated Manufacturer.', 'danger');
      return;
    }

    try {
      const url = `${configDetails.baseUrl}${configDetails.updateManufacturer}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          id, 
          name: editedManufacturer.name,
          address: editedManufacturer.address,
          modifiedBy: userEmail  
        }),
      });

      if (response.ok) {
        setEditManufacturerId(null);
        fetchManufacturers();
        handleAlert('Manufacturer updated successfully.', 'success');
      } else {
        handleAlert('Failed to update Manufacturer. Please try after sometime.', 'danger');
      }
    } catch (error) {
      handleAlert('Failed to update Manufacturer. Please try after sometime.', 'danger');
    }
  };

  const handleDeleteManufacturer = async (id) => {
    try {
      const url = `${configDetails.baseUrl}${configDetails.deleteManufacturer}/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
         headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        fetchManufacturers();
        handleAlert('Manufacturer deleted successfully.', 'success');
      } else {
        handleAlert("Failed to delete Manufacturer.", "danger");
      }
    } catch (error) {
      handleAlert('Failed to delete Manufacturer. Please try after sometime.', 'danger');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {alert && (
        <AlertStatus message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
      )}
      <div style={{ backgroundColor: '#6495ED', color: 'white', textAlign: 'center', padding: '5px', marginBottom: '10px', borderRadius: '5px' }}>Manufacturers</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={fetchManufacturers} className="tableHeaderStyle" style={{width:'auto'}}>Fetch SubCategories</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Enter new Manufacturer"
          value={newManufacturer}
          onChange={(e) => setNewManufacturer(e.target.value)}
          className="tableCellStyle"
        />
        <input
          type="text"
          placeholder="Enter Address"
          value={newManufacturerAddress}
          onChange={(e) => setNewManufacturerAddress(e.target.value)}
          className="tableCellStyle"
          style={{ marginLeft: '10px' }}
        />
        <button onClick={handleAddManufacturer} className="tableHeaderStyle" style={{width:'auto', height:'auto', marginLeft: '10px'}}>Add Manufacturer</button>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%',marginTop:'10px' }}>
        <thead>
          <tr>
            <th className="tableHeaderStyle" >Manufacturer</th>
            <th className="tableHeaderStyle" >Address</th>
            <th className="tableHeaderStyle" >Action</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer, index) => (
            <tr key={manufacturer.id} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
              <td className="tableCellStyle" >
                {manufacturer.name}
              </td>
              <td className="tableCellStyle" >
                {manufacturer.address}
              </td>
              <td className="tableCellStyle" >
                <button onClick={() => handleUpdateManufacturer(manufacturer.id)} className="tableHeaderStyle" style={{ margin: '2px' }}>Update</button>
                <button onClick={() => handleDeleteManufacturer(manufacturer.id)} className="tableHeaderStyle" style={{ margin: '2px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const oddRowStyle = {
  backgroundColor: "#f3f3f3",
  border: "1px solid black",
};

const evenRowStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid black",
};

export default ManageManufacturers;
