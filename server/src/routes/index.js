const express = require("express");

// controller
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user");
const { getProducts, addProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/product");
const { getTransaction, addTransaction, notification } = require("../controllers/transaction");
const { register, login, checkAuth } = require("../controllers/auth");
const { auth } = require("../middlewares/auth");
const {getProfile} = require("../controllers/profile")
const { uploadFile } = require("../middlewares/uploadFile");
const { getCategorys, getCategory, updateCategory, addCategory, deleteCategory } = require("../controllers/category");
// init express router
const router = express.Router();

// controller routes

router.post("/user", addUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/profile", auth, getProfile)

//routes product
router.get("/products", getProducts);
router.post("/product", auth, uploadFile("image"), addProduct);
router.get("/product/:id", auth, getProduct);
router.patch("/product/:id", auth, uploadFile("image"), updateProduct);
router.delete("/product/:id", auth, deleteProduct);
//routes transaction
router.get("/transactions", auth, getTransaction);
router.post("/transaction", auth, addTransaction);
router.post("/notification", notification);

// routes category
router.get("/categorys", getCategorys);
router.get("/category/:id", getCategory);
router.patch("/category/:id", auth, updateCategory);
router.post("/category", addCategory);
router.delete("/category/:id", deleteCategory);

//routes register
router.post("/register", register);


//routes login
router.post("/login", login);

//routes check-auth
router.get("/check-auth", auth, checkAuth);

// exports module router
module.exports = router;
