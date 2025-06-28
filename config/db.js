const mongoose=require("mongoose");


class DbConnect{

    async connectDb(){
        try{

            mongoose.connect(process.env.DB_URI);
            console.log("db connected succesfully")

        }catch (err){
            throw err
        }
    }
    
}

module.exports=new DbConnect();