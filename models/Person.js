const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

personSchema.pre('save',async function(next){
    const person = this;
    //Only hash the password if it has been modified (or is new)
    if(!this.isModified('password')) return next();
    try{
        //Hash password generation
        const salt = await bcrypt.genSalt(10);

        //harshing the password
        const hashedPassword = await bcrypt.hash(this.password,salt);

        //Override the plain text password with the hashed one
        this.password = hashedPassword;     
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //Compare the hashed password with the candidate password
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}

//Create person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;