const express = require('express');
const router = express.Router();
const Menu = require('./../models/Menu');


//POST route to add a menuItem
router.post('/', async (req, res) => {
    try{
        const data = req.body; //Assuming the request body contains the menu item data
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        console.log('Menu item saved');
        res.status(201).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//GET method to get the menu data
router.get('/', async(req,res) =>{
    try{
        const data = await Menu.find();
        console.log('Menu data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//GET method to get the menu data by taste
router.get('/:taste', async(req,res) =>{
    try{
        const taste = req.params.taste;
        if(taste == 'spicy' || taste == 'sweet' || taste == 'sour' || taste == 'salty' || taste == 'umami'){
            const data = await Menu.find({ taste: taste });
            console.log('Menu data fetched by taste');
            res.status(200).json(data);
        }else{
            res.status(404).json({error: 'Invalid taste type'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//POST method to update the menu table
router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const response = await Menu.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true,
            runValidators: true
        });

        if (!response) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        console.log('Menu item updated');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//DELETE method to delete menu item
router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const response = await Menu.findByIdAndDelete(menuId);

        if (!response) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        console.log('Menu item deleted');
        res.status(200).json({ message: 'Menu item deleted successfully' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;