const mongoose=require('mongoose');
const user=mongoose.Schema;

const userDetail=new user({
username:{
    type:String
}, 
email:{
    type:String
},
password:{
    type:String
},
create:{
    type:Date,
    default:Date.now
},
update:{
    type:Date,
    default:Date.now
}
});

module.exports=mongoose.model('user',userDetail);