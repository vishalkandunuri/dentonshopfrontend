import React, { useState, useEffect } from "react";
import configDetails from "../../Config/Config";
import AlertStatus from "../../AlertStatus";
import "../Styles/InventoryStyles.css";

const ManageManufacturers = ({ userEmail, authIdToken }) => {
  const [manufacturers, setManufacturers] = useState([]);
  const [newManufacturer, setNewManufacturer] = useState({ name: "", address: "" });
  const [editManufacturer, setEditManufacturer] = useState({ id: null, name: "", address: "" });
  const [alert, setAlert] = useState(null);

  const fetchManufacturers = async () => {
    try {
      const url = `${configDetails.baseUrl}${configDetails.allManufacturers}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authIdToken,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch Manufacturers. Status: ${response.status}`
        );
      }

      const manufacturersData = await response.json();
      setManufacturers(manufacturersData);
    } catch (error) {
      handleAlert(
        "Failed to fetch Manufacturers. Please try again later.",
        "danger"
      );
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const handleAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleAddManufacturer = async () => {
    if (!newManufacturer.name.trim() || !newManufacturer.address.trim()) {
      handleAlert("Please enter values for the name and address.", "danger");
      return;
    }
    try {
      const url = `${configDetails.baseUrl}${configDetails.addManufacturer}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authIdToken,
        },
        body: JSON.stringify(newManufacturer),
      });

      if (response.ok) {
        setNewManufacturer({ name: "", address: "" });
        fetchManufacturers();
        handleAlert("Manufacturer added successfully.", "success");
      } else {
        handleAlert("Manufacturer already exists.", "danger");
      }
    } catch (error) {
      handleAlert("Failed to add Manufacturer. Please try after sometime.", "danger");
    }
  };

  const handleUpdateManufacturer = async () => {
    if (!editManufacturer.name.trim() || !editManufacturer.address.trim()) {
      handleAlert("Please enter values for the name and address.", "danger");
      return;
    }

    try {
      const url = `${configDetails.baseUrl}${configDetails.updateManufacturer}`;
      console.log(editManufacturer)
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authIdToken,
        },
        body: JSON.stringify({
          id: editManufacturer.id,
          name: editManufacturer.name,
          address: editManufacturer.address,
          modifiedBy: userEmail,
        }),
      });

      if (response.ok) {
        setEditManufacturer({ id: null, name: "", address: "" });
        fetchManufacturers();
        handleAlert("Manufacturer updated successfully.", "success");
      } else {
        handleAlert(
          "Failed to update Manufacturer. Please try after sometime.",
          "danger"
        );
      }
    } catch (error) {
      handleAlert(
        "Failed to update Manufacturer. Please try after sometime.",
        "danger"
      );
    }
  };

  const handleDeleteManufacturer = async (id) => {
    try {
      const url = `${configDetails.baseUrl}${configDetails.deleteManufacturer}/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authIdToken,
        },
      });

      if (response.ok) {
        fetchManufacturers();
        handleAlert("Manufacturer deleted successfully.", "success");
      } else {
        handleAlert("Failed to delete Manufacturer.", "danger");
      }
    } catch (error) {
      handleAlert(
        "Failed to delete Manufacturer. Please try after sometime.",
        "danger"
      );
    }
  };

  const handleEditManufacturer = (manufacturer) => {
    setEditManufacturer({ ...manufacturer });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {alert && <AlertStatus message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <div style={{ backgroundColor: "#6495ED", color: "white", textAlign: "center", padding: "5px", marginBottom: "10px", borderRadius: "5px" }}>Manufacturers</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={fetchManufacturers} className="tableHeaderStyle" style={{ width: "auto" }}>Fetch Manufacturers</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Enter new manufacturer name"
          value={newManufacturer.name}
          onChange={(e) => setNewManufacturer({ ...newManufacturer, name: e.target.value })}
          className="tableCellStyle"
        />
        <input
          type="text"
          placeholder="Enter new manufacturer address"
          value={newManufacturer.address}
          onChange={(e) => setNewManufacturer({ ...newManufacturer, address: e.target.value })}
          className="tableCellStyle"
        />
        <button onClick={handleAddManufacturer} className="tableHeaderStyle" style={{ width: "auto", height: "auto", marginLeft: "10px" }}>Add Manufacturer</button>
      </div>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th className="tableHeaderStyle">Manufacturer Name</th>
            <th className="tableHeaderStyle">Manufacturer Address</th>
            <th className="tableHeaderStyle">Action</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer, index) => (
            <tr key={manufacturer.id} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
              <td className="tableCellStyle">
                {manufacturer.id === editManufacturer.id ? (
                  <input
                    type="text"
                    value={editManufacturer.name}
                    onChange={(e) => setEditManufacturer({ ...editManufacturer, name: e.target.value })}
                    className="tableCellStyle"
                  />
                ) : (
                  manufacturer.name
                )}
              </td>
              <td className="tableCellStyle">
                {manufacturer.id === editManufacturer.id ? (
                  <input
                    type="text"
                    value={editManufacturer.address}
                    onChange={(e) => setEditManufacturer({ ...editManufacturer, address: e.target.value })}
                    className="tableCellStyle"
                  />
                ) : (
                  manufacturer.address
                )}
              </td>
              <td className="tableCellStyle">
                {manufacturer.id === editManufacturer.id ? (
                  <>
                    <button onClick={handleUpdateManufacturer} style={{ margin: "2px" }} className="tableHeaderStyle">Save</button>
                    <button onClick={() => setEditManufacturer({ id: null, name: "", address: "" })} style={{ margin: "2px" }} className="tableHeaderStyle">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditManufacturer(manufacturer)} style={{ margin: "2px" }} className="tableHeaderStyle">Edit</button>
                    <button onClick={() => handleDeleteManufacturer(manufacturer.id)} style={{ margin: "2px" }} className="tableHeaderStyle">Delete</button>
                  </>
                )}
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
