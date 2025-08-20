const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/wellness")
.then(()=>{
    console.log("connected to mongodb")
})
.catch((err)=>{
    console.log("Error connecting to mongoose")
})
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:['client','provider', 'admin'],
        default:'client'

    },
    location:{
        type:{
            type:String,
            enum:['Point'],
            default:'Point'
        },
        coordinates:{
            type:[Number],
            required:true
        }
    }

})
userSchema.index({location:'2dsphere'});



const serviceSchema=new mongoose.Schema({
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },

    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
    type:Number,
    required:true
    },

    category:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})



const bookingSchema= new mongoose.Schema({
    service:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Service'
    },
    
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true

    },
    scheduledDate:{
        type:Date,
required:true
    },

    status:{
        type:String,
        enum:["pending","confirmed","completed","cancelled"],
        default:"pending"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }


})


const reviewSchema=new mongoose.Schema({
    service:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Service',
  required:true
    },

    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    comment:{
        type:String
    },

    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})


const User=mongoose.model('User',userSchema);
const Service=mongoose.model('Service',serviceSchema)
const Booking=mongoose.model('Booking',bookingSchema)
const Review=mongoose.model('Review',reviewSchema)
module.exports={User,Service,Booking,Review}