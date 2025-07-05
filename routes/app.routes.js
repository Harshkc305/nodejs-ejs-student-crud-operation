const route=require("express").Router();
const appcontroller=require("../controller/app.controller")
const FileUploader= require("../helper/fileUpload");

const fileUpload= new FileUploader({
    folderName: "public/upload",supportedFiles:["image/png", "image/jpg", "image/jpeg" ,"application/pdf"], fieldSize: 1024 *1024 *5
})

route.get("/",appcontroller.form)
// route.post("/submit-form",fileUpload.upload().single("profileImage","resume"),appcontroller.submitform)

route.post("/submit-form", fileUpload.upload().fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 }
]), appcontroller.submitform)






route.get("/list",appcontroller.getlist)

route.get("/edit/:id",appcontroller.showEditForm)
route.post("/update-form", appcontroller.updateData)

route.get("/soft-delete/:id", appcontroller.softDelete);
route.get("/hard-delete/:id", appcontroller.hardDelete);


module.exports= route