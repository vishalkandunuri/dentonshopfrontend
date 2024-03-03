import React, { useState, useEffect } from "react";
import configDetails from "../../Config/Config";
import AlertStatus from "../../AlertStatus";
import "../Styles/InventoryStyles.css";

const ManageSubCategories = ({ userEmail, authIdToken }) => {
  const [SubCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState('');
  const [editSubCategoryId, setEditSubCategoryId] = useState(null);
  const [editedSubCategoryValue, setEditedSubCategoryValue] = useState('');
  const [alert, setAlert] = useState(null);

  const fetchSubCategories = async () => {  
     console.log(authIdToken)
    try {
      const url = `${configDetails.baseUrl}${configDetails.allSubCategories}`;
      const response = await fetch(url,{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization':authIdToken
          }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch SubCategories. Status: ${response.status}`);
      }

      const SubCategoriesData = await response.json();
      setSubCategories(SubCategoriesData);
    } catch (error) {
      handleAlert("Failed to fetch SubCategories. Please try again later.", "danger");
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const handleAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleAddSubCategory = async () => {
    if (!newSubCategory.trim()) {
      handleAlert('Please enter a value for the new SubCategory.', 'danger');
      return;
    }
    try {
      const url = `${configDetails.baseUrl}${configDetails.addSubCategory}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':authIdToken
        },
        body: JSON.stringify({ 
          name: newSubCategory 
        }),
      });

      if (response.ok) {
        setNewSubCategory('');
        fetchSubCategories();
        handleAlert('SubCategory added successfully.', 'success');
      } else {
        handleAlert("SubCategory already exists.", "danger");
      }
    } catch (error) {
      handleAlert('Failed to add SubCategory. Please try after sometime.', 'danger');
    }
  };

  const handleUpdateSubCategory = async () => {
    if (!editedSubCategoryValue.trim()) {
      handleAlert('Please enter a value for the updated SubCategory.', 'danger');
      return;
    }

    try {
      const url = `${configDetails.baseUrl}${configDetails.updateSubCategory}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':authIdToken
        },
        body: JSON.stringify({ 
          id: editSubCategoryId, 
          name: editedSubCategoryValue,
          modifiedBy: userEmail  
        }),
      });

      if (response.ok) {
        setEditSubCategoryId(null);
        setEditedSubCategoryValue('');
        fetchSubCategories();
        handleAlert('SubCategory updated successfully.', 'success');
      } else {
        handleAlert('Failed to update SubCategory. Please try after sometime.', 'danger');
      }
    } catch (error) {
      handleAlert('Failed to update SubCategory. Please try after sometime.', 'danger');
    }
  };

  const handleDeleteSubCategory = async (SubCategoryId) => {
    try {
      const url = `${configDetails.baseUrl}${configDetails.deleteSubCategory}/${SubCategoryId}`;
      const response = await fetch(url, {
        method: 'DELETE',
         headers: {
          'Content-Type': 'application/json',
          'Authorization':authIdToken
        }
      });

      if (response.ok) {
        fetchSubCategories();
        handleAlert('SubCategory deleted successfully.', 'success');
      } else {
        handleAlert("Failed to delete SubCategory.", "danger");
      }
    } catch (error) {
      handleAlert('Failed to delete SubCategory. Please try after sometime.', 'danger');
    }
  };

  const handleClickFetchSubCategories = () => {
    fetchSubCategories();
  };

  const handleEditSubCategory = (SubCategoryId, currentSubCategoryValue) => {
    setEditSubCategoryId(SubCategoryId);
    setEditedSubCategoryValue(currentSubCategoryValue);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {alert && (
        <AlertStatus message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
      )}
      <div style={{ backgroundColor: '#6495ED', color: 'white', textAlign: 'center', padding: '5px', marginBottom: '10px', borderRadius: '5px' }}>SubCategories</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleClickFetchSubCategories} className="tableHeaderStyle" style={{width:'auto', backgroundColor:'#87CEFA'}}>Fetch SubCategories</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Enter new SubCategory"
          value={newSubCategory}
          onChange={(e) => setNewSubCategory(e.target.value)}
          className="tableCellStyle"
        />
        <button onClick={handleAddSubCategory} className="tableHeaderStyle" style={{width:'auto', height:'auto', marginLeft: '10px', backgroundColor:'#87CEFA'}}>Add SubCat</button>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%',marginTop:'10px' }}>
        <thead>
          <tr>
            <th className="tableHeaderStyle" style={{backgroundColor:'#87CEFA'}} >SubCategory</th>
            <th className="tableHeaderStyle" style={{backgroundColor:'#87CEFA'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {SubCategories.map((SubCategory, index) => (
            <tr key={SubCategory.id} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
              <td className="tableCellStyle" >
                {SubCategory.id === editSubCategoryId ? (
                  <input
                    type="text"
                    value={editedSubCategoryValue}
                    onChange={(e) => setEditedSubCategoryValue(e.target.value)}
                    className="tableCellStyle"
                  />
                ) : (
                  SubCategory.name
                )}
              </td>
              <td className="tableCellStyle" >
                {SubCategory.id === editSubCategoryId ? (
                  <>
                    <button onClick={handleUpdateSubCategory} style={{ margin: '2px', backgroundColor:'#87CEFA' }} className="tableHeaderStyle">Save</button>
                    <button onClick={() => setEditSubCategoryId(null)} style={{ margin: '2px', backgroundColor:'#87CEFA' }} className="tableHeaderStyle">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditSubCategory(SubCategory.id, SubCategory.name)} style={{ margin: '2px', backgroundColor:'#87CEFA' }} className="tableHeaderStyle">Edit</button>
                    <button onClick={() => handleDeleteSubCategory(SubCategory.id)} style={{ margin: '2px', backgroundColor:'#87CEFA' }} className="tableHeaderStyle">Delete</button>
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

export default ManageSubCategories;
