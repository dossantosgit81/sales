const express = require("express")
const app = express();
const router = express.Router();
const ClientController = require("../controllers/ClientController");
const FieldValidateCreate = require("../middlewares/FieldValidateCreate");
const FieldValidateUpdate = require("../middlewares/FieldValidateUpdate");

router.post("/client", FieldValidateCreate ,ClientController.create);
router.put("/client" , FieldValidateUpdate, ClientController.update);
router.get("/index", ClientController.index);
router.delete("/client/:id", ClientController.remove);


module.exports = router;