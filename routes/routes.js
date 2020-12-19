const express = require("express");
const app = express();
const router = express.Router();

const ClientController = require("../controllers/ClientController");
const EmployeeController = require("../controllers/EmployeeController");
const ProviderController = require("../controllers/ProviderController");

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
router.put("/provider", ProviderController.update);
router.delete("/provider/:id", ProviderController.remove);
router.get("/provider", ProviderController.index);

module.exports = router;