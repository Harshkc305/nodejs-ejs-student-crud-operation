const EmpModel = require("../models/emp.model")

class appcontroller{

    async form(req, res){
        try{
            res.render("form",{
                title: "form page"
            })

        }catch (err){
            throw err
        }
    }

// -----------------------------------------------------------------

    // async submitform(req, res) {
    //     try {
    //         console.log(req.file, "req File");

    //         // Get the uploaded filename or set to empty
    //         const profileImage = req.file ? req.file.filename : "";

    //         // Save data including image filename
    //         const saveData = await EmpModel.create({
    //         ...req.body,
    //         profileImage: profileImage
    //         });

    //         console.log(saveData, "save data...........");
    //         res.redirect("/list");

    //     } catch (err) {
    //         throw err;
    //     }
    // }


    // async submitform(req, res){
    //     try{
    //         // console.log("hello harsh")

    //         // console.log(req.body,"req............body")

    //         const profileImage =req.file.filename;
            

    //         console.log(req.file, "req File");

    //         const saveData= await EmpModel.create({...req.body,profileImage});
    //         console.log(saveData, "save data...........")
    //         res.redirect("/list")
            

    //     }catch (err){
    //         throw err
    //     }
    // }


async submitform(req, res) {
  try {
    const files = req.files || {};
    const profileImage = files.profileImage ? files.profileImage[0].filename : "";
    const resume = files.resume ? files.resume[0].filename : "";

    const saveData = await EmpModel.create({
      ...req.body,
      profileImage,
      resume
    });

    res.redirect("/list");
  } catch (err) {
    throw err;
  }
}





// --------------------------------------------------------------------
  


    async getlist(req, res) {
    try {
        let allData = await EmpModel.find({ isDeleted: false });

        allData = allData.map(emp => {
            const baseSalary = emp.basesalary;
            const pf = baseSalary * 0.12;
            const esic = baseSalary < 21000 ? baseSalary * 0.04 : 0;
            const totalSalary = baseSalary - pf - esic;

            return {
                ...emp._doc,
                pf: pf.toFixed(2),
                esic: esic.toFixed(2),
                totalSalary: totalSalary.toFixed(2)
            };
        });

        res.render("list", {
            allData,
            title: "list page"
        });
    } catch (err) {
        throw err;
    }
}

    async showEditForm(req, res){
        try{
            let data= await EmpModel.findOne({_id: req.params.id})
            console.log(data,"edit alldata data.......")
            res.render("edit",{
                data,
                title:"edit page"
            })
        }catch(err){
            throw err
        }
    }

    async updateData(req, res){
        try{ 
            const updateData= await EmpModel.findByIdAndUpdate(req.body.id, req.body);

            console.log(updateData,"updatedata...........")
            res.redirect(`/list`)
       }catch(err){
            throw err
        }
    }

    async softDelete(req, res){
        try{ 
            const softDelete= await EmpModel.findByIdAndUpdate(req.params.id, {isDeleted: true});

            console.log(softDelete,"softdeletedata...........")
            res.redirect(`/list`)
       }catch(err){
            throw err
        }
    }

    async hardDelete(req,res){
        try{
            const hardDelete= await EmpModel.findByIdAndDelete(req.params.id )
            res.redirect("/list")

        }catch(err){
            throw err
        }
    }




    

}
module.exports=new appcontroller