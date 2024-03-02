import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import configDetails from "../../Config/Config";
import AlertStatus from "../../AlertStatus";
import "../Styles/InventoryStyles.css"

const ManageCategories = ({ userEmail, authIdToken }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editedCategoryValue, setEditedCategoryValue] = useState('');
  const [alert, setAlert] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);

  const fetchCategories = async () => {  
    try {
      const url = `${configDetails.baseUrl}${configDetails.allCategories}`;
      const response = await fetch(url,{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories. Status: ${response.status}`);
      }

      const categoriesData = await response.json();
      setCategories(categoriesData);
    } catch (error) {
      handleAlert("Failed to fetch categories. Please try again later.", "danger");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      handleAlert('Please enter a value for the new category.', 'danger');
      return;
    }
    try {
      const url = `${configDetails.baseUrl}${configDetails.addCategory}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: newCategory 
        }),
      });

      if (response.ok) {
        setNewCategory('');
        fetchCategories();
        handleAlert('Category added successfully.', 'success');
      } else {
        handleAlert("Category already exists.", "danger");
      }
    } catch (error) {
      handleAlert('Failed to add Category. Please try after sometime.', 'danger');
    }
  };

  const handleUpdateCategory = async () => {
    if (!editedCategoryValue.trim()) {
      handleAlert('Please enter a value for the updated category.', 'danger');
      return;
    }

    try {
      const url = `${configDetails.baseUrl}${configDetails.updateCategory}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          id: editCategoryId, 
          name: editedCategoryValue,
          modifiedBy: userEmail  
        }),
      });

      if (response.ok) {
        setEditCategoryId(null);
        setEditedCategoryValue('');
        fetchCategories();
        handleAlert('Category updated successfully.', 'success');
      } else {
        handleAlert('Failed to update Category. Please try after sometime.', 'danger');
      }
    } catch (error) {
      handleAlert('Failed to update Category. Please try after sometime.', 'danger');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const url = `${configDetails.baseUrl}${configDetails.deleteCategory}/${categoryId}`;
      const response = await fetch(url, {
        method: 'DELETE',
         headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        fetchCategories();
        handleAlert('Category deleted successfully.', 'success');
      } else {
        handleAlert("Failed to delete Category.", "danger");
      }
    } catch (error) {
      handleAlert('Failed to delete Category. Please try after sometime.', 'danger');
    }
  };

  const handleClickFetchCategories = () => {
    fetchCategories();
  };

  const handleEditCategory = (categoryId, currentCategoryValue) => {
    setEditCategoryId(categoryId);
    setEditedCategoryValue(currentCategoryValue);
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {alert && (
        <AlertStatus message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
      )}
      <div style={{ backgroundColor: '#6495ED', color: 'white', textAlign: 'center', padding: '5px', marginBottom: '10px', borderRadius: '5px' }}>Categories</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleClickFetchCategories} className="tableHeaderStyle" style={{width:'auto'}}>Fetch Categories</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="tableCellStyle"
        />
        <button onClick={handleAddCategory} className="tableHeaderStyle" style={{width:'auto',height:'auto', marginLeft: '10px'}}>Add Category</button>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%',marginTop:'10px' }}>
        <thead>
          <tr>
            <th className="tableHeaderStyle" >Category</th>
            <th className="tableHeaderStyle" >Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
              <td className="tableCellStyle" >
                {category.id === editCategoryId ? (
                  <input
                    type="text"
                    value={editedCategoryValue}
                    onChange={(e) => setEditedCategoryValue(e.target.value)}
                    className="tableCellStyle"
                  />
                ) : (
                  category.name
                )}
              </td>
              <td className="tableCellStyle" >
                {category.id === editCategoryId ? (
                  <>
                    <button onClick={handleUpdateCategory} style={{ margin: '2px' }} className="tableHeaderStyle">Save</button>
                    <button onClick={() => setEditCategoryId(null)} style={{ margin: '2px' }} className="tableHeaderStyle">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditCategory(category.id, category.name)} style={{ margin: '2px' }} className="tableHeaderStyle">Edit</button>
                    <button onClick={() => handleDeleteCategory(category.id)} style={{ margin: '2px' }} className="tableHeaderStyle">Delete</button>
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

export default ManageCategories;
