const express = require("express");
const {  loginUserHandler, registerUserHandler, getUserHandler,  editUserHandler
} = require("../controllers/user.Controller.js");
const {  addFavoriteHandler, getFavoritesWithProductsHandler, deleteFavoriteHandler
} = require("../controllers/favorite.Controller.js");
const {  getUserCollection, registerUserCollection, getProductByEmailHandler, deleteProductHandler, editProductController
} = require("../controllers/product.Controller.js");
const {insertCarItemHandler} = require("../controllers/cart.Controller.js")

const { verifyToken, logRequests } = require("../middlewares/authorization.js");

const router = express.Router();

router.use(logRequests);

router.get("/usuarios", verifyToken, getUserHandler);
router.post("/login", loginUserHandler);
router.post("/usuarios", registerUserHandler);
router.put("/usuarios", editUserHandler);

router.get("/productos", getUserCollection);
router.post("/productos", registerUserCollection);
router.get("/productos/email", getProductByEmailHandler); 
router.delete("/productos/:id", deleteProductHandler);
router.put("/productos/:id", editProductController);

router.post("/favoritos",addFavoriteHandler)
router.get("/favoritos",getFavoritesWithProductsHandler)
router.delete("/favoritos/:id", deleteFavoriteHandler)


router.post("/carro",insertCarItemHandler);



module.exports = router;
