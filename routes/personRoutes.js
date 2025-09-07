const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware , generateToken} = require('./../jwt');


//POST route to add a person
router.post('/signup', async (req, res) => {
    try{
        const data = req.body; //Assuming the request body contains the person data

        //Create the new Person using the mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('Data saved');
        
        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        //Generate JWT token
        const token = generateToken(payload)
        console.log('Token is: ', token);
        res.status(201).json({response: response, token: token});


    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//POST route for user login
router.post('/login', async (req,res) =>{
    try{
        //Extract username and password from request body
        const {username, password} = req.body;

        //Find the user by username
        const user = await Person.findOne({username: username});

        //If user not found or password does not match
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        //generate token
        const payLoad = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payLoad);
        //return the token as response
        res.status(200).json({token: token});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//Profile route to get user details
router.get('/profile', jwtAuthMiddleware, async (req,res) =>{
    try{
        const userData = req.user;
        console.log('User Data: ', userData);

        const userId = req.user.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


//GET method to get the person data
router.get('/', async(req,res) =>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//GET method to get the person data by work type
router.get('/:workType', async(req,res) =>{
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
        }else{
        res.status(404).json({error: 'Invalid work type'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//PUT method to update person data
router.put('/:id', async (req,res) =>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        });

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('Person data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}) 

//DELETE method to delete person data
router.delete('/:id', async (req,res) =>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('Person data deleted');
        res.status(200).json({message: 'Person deleted successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;