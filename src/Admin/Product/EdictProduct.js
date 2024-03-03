import React, { useState, useEffect } from "react";
import configDetails from "../../Config/Config";
import AllCategories from "./AllCategories";
import AllManufacturers from "./AllManufacturers";
import AllSubcategories from "./AllSubCategories";

const EditProduct = ({ product, onClose, authIdToken }) => {
    const [productName, setProductName] = useState(product.name);
    const [productDescription, setProductDescription] = useState(product.description);
    const [productPrice, setProductPrice] = useState(product.price);
    const [productQuantity, setProductQuantity] = useState(product.quantityAvailable);
    const [productGender, setProductGender] = useState(product.gender);
    const [selectedManufacturer, setSelectedManufacturer] = useState(product.manufacturer);
    const [selectedCategory, setSelectedCategory] = useState(product.category);
    const [selectedSubcategory, setSelectedSubcategory] = useState(product.subcategory);
    const [allCategories, setAllCategories] = useState([]);
    const [allManufacturers, setAllManufacturers] = useState([]);
    const [allSubcategories, setAllSubcategories] = useState([]);
    const [productModel, setProductModel] = useState(product.model);
    const [imageUrl, setImageUrl] = useState(product.imageUrls);

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

    const handleEditProduct = async () => {
        console.log(productQuantity)
        try {
            const api = `${configDetails.baseUrl}${configDetails.updateProduct}`;
            const response = await fetch(api, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':authIdToken
                },
                body: JSON.stringify({
                    id:product.id,
                    name: productName,
                    description: productDescription,
                    price: productPrice,
                    quantityAvailable: productQuantity,
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
                console.error('Failed to edit product:', response.statusText);
            }
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Product</h2>
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
                    <input type="number" value={productPrice} 
                    onChange={(e) => setProductPrice(e.target.value)}
                     />
                </div>
                <div>
                    <label>Quantity Available:</label>
                    <input  type="number"
                            min={0}
                            value={productQuantity} 
                            onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    if (newValue < 0) {
                                        setProductQuantity(0);
                                    } else {
                                        setProductQuantity(newValue);
                                    }
                                }} 
                        />
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
                    <button onClick={handleEditProduct} style={{ margin: '10px', width: '200px', backgroundColor:'green' }}>Save Changes</button>
                    <button onClick={onClose} style={{ margin: '10px', width: '200px', backgroundColor:'red' }}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
