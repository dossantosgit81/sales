const express = require("express")
const app = express();
const router = express.Router();
const ClientController = require("../controllers/ClientController");
const FieldsExists = require("../middlewares/FieldsExists");


router.post("/cliente", FieldsExists, ClientController.create);


module.exports = router;