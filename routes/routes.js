const express = require("express");
const router = express.Router();

const ClientController = require("../controllers/ClientController");
const EmployeeController = require("../controllers/EmployeeController");
const ProviderController = require("../controllers/ProviderController");
const ProductController = require("../controllers/ProductController");
const SaleController = require("../controllers/SaleController");
const ItemsSaleController = require("../controllers/ItemsSaleController");

const FieldValidateCreate = require("../middlewares/FieldValidateCreate");
const FieldValidateUpdate = require("../middlewares/FieldValidateUpdate");


router.post("/client", FieldValidateCreate ,ClientController.create);
router.put("/client" , FieldValidateUpdate, ClientController.update);
router.get("/client", ClientController.index);
router.delete("/client/:id", ClientController.remove);

router.post("/employee", FieldValidateCreate ,EmployeeController.new);
router.put("/employee", FieldValidateUpdate ,EmployeeController.update);
router.get("/employees", EmployeeController.readAll);
router.delete("/employee/:id", EmployeeController.remove);

router.post("/provider", FieldValidateCreate , ProviderController.create);
router.put("/provider", FieldValidateUpdate , ProviderController.update);
router.delete("/provider/:id", ProviderController.remove);
router.get("/provider", ProviderController.index);

router.post("/product", ProductController.create);
router.put("/product", ProductController.update);
router.get("/products", ProductController.index);
router.delete("/product/:id", ProductController.remove);
router.post("/find", ProductController.findById);

router.post("/sales", SaleController.create);
router.post("/search", SaleController.findByCpf);
router.get("/lastid", ItemsSaleController.lastSale);
router.post("/cart", ItemsSaleController.create);

module.exports = router;