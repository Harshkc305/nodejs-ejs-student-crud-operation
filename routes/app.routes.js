const route=require("express").Router();
const appcontroller=require("../controller/app.controller")

route.get("/",appcontroller.form)
route.post("/submit-form",appcontroller.submitform)
route.get("/list",appcontroller.getlist)

route.get("/edit/:id",appcontroller.showEditForm)
route.post("/update-form", appcontroller.updateData)

route.get("/soft-delete/:id", appcontroller.softDelete);
route.get("/hard-delete/:id", appcontroller.hardDelete);


module.exports= route