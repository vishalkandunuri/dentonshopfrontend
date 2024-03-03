import React, { useEffect, useState } from "react";
import Select from 'react-select';
import '../Styles/AddProduct.css';
import AllCategories from "./AllCategories";
import AllSubcategories from "./AllSubCategories";
import AllManufacturers from "./AllManufacturers";
import configDetails from "../../Config/Config";

const AddProduct = ({ onClose, authIdToken }) => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState(0); 
    const [productQuantity, setProductQuantity] = useState(0);
    const [productGender, setProductGender] = useState("");
    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [allManufacturers, setAllManufacturers] = useState([]);
    const [allSubcategories, setAllSubcategories] = useState([]);
    const [productModel, setProductModel] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categories = await AllCategories(authIdToken);
                const manufacturers = await AllManufacturers(authIdToken);
                const subcategories = await AllSubcategories(authIdToken);

                setAllCategories(categories);
                setAllManufacturers(manufacturers);
                setAllSubcategories(subcategories);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleAddProduct = async () => {
        try {
            const api = `${configDetails.baseUrl}${configDetails.addProduct}`;
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':authIdToken
                },
                body: JSON.stringify({
                    name: productName,
                    description: productDescription,
                    price: parseFloat(productPrice).toFixed(2), 
                    quantityAvailable: parseInt(productQuantity), 
                    gender: productGender,
                    manufacturer: selectedManufacturer,
                    category: selectedCategory, 
                    subcategory: selectedSubcategory, 
                    model: productModel,
                    imageUrls: imageUrl
                })
            });

            if (response.ok) {
                onClose();
            } else {
                console.error('Failed to add product:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        // Check if the input is a valid number with up to two decimal places
        if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
            setProductPrice(value);
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2  style={{ backgroundColor: '#6495ED', color: 'white', textAlign: 'center', padding: '5px', marginBottom: '10px', borderRadius: '5px' }}>Add New Product</h2>
                <div>
                    <label>Product Name:</label>
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                </div>
                <div>
                    <label>Price: ($ enter up to 2 decimal points)</label>
                    <input type="number" step={0.01} value={productPrice} onChange={handlePriceChange} />
                </div>
                <div>
                    <label>Quantity Available:</label>
                    <input type="number" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
                </div>
                <div>
                    <label>Gender:</label>
                    <input type="text" value={productGender} onChange={(e) => setProductGender(e.target.value)} />
                </div>
                <div>
                    <label>Manufacturer:</label>
                    <select value={selectedManufacturer} onChange={(e) => setSelectedManufacturer(e.target.value)}>
                        <option value="">Select a Manufacturer</option>
                        {allManufacturers.map(manufacturer => (
                            <option key={manufacturer.id} value={manufacturer.name}>{manufacturer.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Category:</label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">Select a Category</option>
                        {allCategories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Subcategory:</label>
                    <select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
                        <option value="">Select a Subcategory</option>
                        {allSubcategories.map(subcategory => (
                            <option key={subcategory.id} value={subcategory.name}>{subcategory.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Model:</label>
                    <input type="text" value={productModel} onChange={(e) => setProductModel(e.target.value)} />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <div style={{textAlign:'center'}}>
                    <button style={{ margin: '10px', width: '200px', backgroundColor:'green' }} onClick={handleAddProduct}>Add Product</button>
                    <button style={{ margin: '10px', width: '200px', backgroundColor:'red' }} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
