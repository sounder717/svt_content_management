const express = require("express");
const svtcontroller = require("../controllers/pagecontroller");
const router = express.Router();
router.get("/", svtcontroller.view);

router.get("/adduser", svtcontroller.adduser);
router.post("/adduser", svtcontroller.save);

router.get("/edituser/:id", svtcontroller.edituser);
router.post("/edituser/:id", svtcontroller.edit);

router.get("/deleteuser/:id", svtcontroller.delete);

router.get("/svtjson", svtcontroller.svtjson);

module.exports = router;
