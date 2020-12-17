const express = require("express")
//const app = express();
const router = express.Router();
const ClientController = require("../controllers/ClientController");
const EmployeeController = require("../controllers/EmployeeController");
const FieldValidateCreate = require("../middlewares/FieldValidateCreate");
const FieldValidateUpdate = require("../middlewares/FieldValidateUpdate");

router.post("/client", FieldValidateCreate ,ClientController.create);
router.put("/client" , FieldValidateUpdate, ClientController.update);
router.get("/index", ClientController.index);
router.delete("/client/:id", ClientController.remove);
router.post("/employee", FieldValidateCreate ,EmployeeController.new);
router.put("/employee", FieldValidateUpdate ,EmployeeController.update);


module.exports = router;