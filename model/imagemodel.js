const mongoose=require('mongoose');
const image=mongoose.Schema;

const imageDetail=new image({
title:{
    type:String
},
description:{
    type:String
},
imageUrl:{
    type:String
},
photographer_name:{
    type:String
},
userId: {
    type: String
},
tags: [String],

create:{
    type:Date,
    default:Date.now
},
update:{
    type:Date,
    default:Date.now
}
});

module.exports=mongoose.model('image',imageDetail);