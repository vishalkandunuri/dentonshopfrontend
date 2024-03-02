//AWS END Point APIs

const configDetails={
    baseUrl:"https://agg8enhzc4.execute-api.us-east-2.amazonaws.com/prod",
    //baseUrl:"http://localhost:8082",
    allCategories:"/allcategories",
    addCategory:"/addcategory",
    updateCategory:"/updatecategory",
    deleteCategory:"/deletecategory",
    allSubCategories:"/allsubcategories",
    addSubCategory:"/addsubcategory",
    updateSubCategory:"/updatesubcategory",
    deleteSubCategory:"/deletesubcategory",
    allManufacturers:"/allmanufacturers",
    addManufacturer:"/addmanufacturer",
    updateManufacturer:"/updatemanufacturer",
    deleteManufacturer:"/deletemanufacturer",
    allProducts:"/allproducts",
    addProduct:"/addproduct",
    updateProduct:"/updateproduct",
    deleteProduct:"/deleteproduct",
    addAddress:"/addaddress",
    allAddresses:"/alladdresses",
    allUserAddreses:"/alluseraddresses",
    updateAddress:"/updateaddress",
    deleteAddress:"/deleteaddress",
    addItemToCart:"/additemtocart",
    getAllCartItems:"/getallcartitems",
    getUserCartItems:"/getusercartitems",
    getTotalUserCartQuantity:"/getcurrentusercartquantity",
    placeOrder:"/placeorder",
    getAllOrders:"/getallorders",
    getUserOrder:"/getuserorders",
    getOrderCartItems:'/getordercartitems',
    updateOrderStatus:"/updateorderstatus",

    adminUsers:["siva.sotc@gmail.com",
                "vishalkandunuri@my.unt.edu",
                "supriyareddyattapuram@my.unt.edu",
                "SumukReddyKalagiri@my.unt.edu"]

}

export default configDetails;