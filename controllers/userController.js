
const { where } = require('sequelize');
var db = require('../models');
const users = require('../models/users');
var User = db.user;
var Contact = db.contact;
var addUser = async (req,res) =>{
    const jane = await User.create({ firstName: "Saifee",lastName:"Shaikh" });
   // const jane = User.build({ firstName: "Ravi" , lastName:"Mohite" });
console.log(jane instanceof User); // true
console.log(jane.firstName); 
//await jane.save();
jane.set({firstName: "Sanket",lastName: "Borate"});
//await jane.update({firstName: "Ravi",lastName: "Kumar" })
await jane.save();
console.log('Jane was saved to the database!');
//await jane.destroy(); //for delete
//await jane.reload();
console.log(jane.toJSON());
res.status(200).json(jane.toJSON());
}

var oneToOneUser = async (req,res) =>{
//     var data = await User.create({firstName:'Ravi',lastName:'Kumar'})
//     if(data && data.id){
//         await Contact.create({permanent_address:'xyz','current_address':'def','user_id':data.id})
//     }

        // var data = await User.findAll({
            
        //     attributes:['firstName','lastName'],//to reduce record
        //     include:[{
        //         model:Contact,
        //         as:'contactsDetails',
        //         attributes:['permanent_address','current_address'] //only specific records
        //     }],
        //     where:{id:2}
        // })  //fetch data
        var data = await Contact.findAll({
            
            attributes:['permanent_address','current_address'],//to reduce record
            include:[{
                model:User,
                as:'userDetails',
                attributes:['firstName','lastName'] //only specific records
            }],
            where:{id:2}
       })  //fetch data
        res.status(200).json({data:data});
 }

 var oneToManyUser = async (req, res) =>{
    //await Contact.create({permanent_address:'Gurugram','current_address':'Merat','user_id':1})//for multiple insert
    
    var data = await User.findAll({
            
        attributes:['firstName','lastName'],//to reduce record
        include:[{
            model:Contact,
            as:'contactsDetails',
            attributes:['permanent_address','current_address'] //only specific records
        }],
        where:{id:2}
    })  //fetch data
    res.status(200).json({data:data});


 }


var getUsers = async (req,res)=>{
    const data = await User.findAll({});
    res.status(200).json({data:data});
}
var getUser = async (req,res)=>{
    const data = await User.findOne({
    where:{
        id:req.params.id
    }
});
    res.status(200).json({data:data});
}

var postUsers = async (req,res)=>{
    var postData = req.body;
    if(postData.length>1){
        var data = await User.bulkCreate(postData);  
    } else{
        var data = await User.create(postData); 
    }

    res.status(200).json({data:data});
}

var deleteUser = async (req,res)=>{
    const data = await User.destroy({
    where:{
        id:req.params.id
    }
});
res.status(200).json({data:data});
}

var patchUser = async (req,res)=>{
    var updatedData = req.body;
    const data = await User.update(updatedData,{
    where:{
        id:req.params.id
    }
});
res.status(200).json({data:data});
}
module.exports={
    addUser,
    getUsers,
    getUser,
    postUsers,
    deleteUser,
    patchUser,
    oneToOneUser,
    oneToManyUser
}