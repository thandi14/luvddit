const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../../backend/utils/validation');
const { setTokenCookie, requireAuth } = require('../../../backend/utils/auth');
const { User, Save, Restaurant, MenuItem, RestaurantTime, Review, RestaurantImage, Offer, ItemOption, ShoppingCart, CartItem, CartItemNotes, ItemSelection } = require('../../../backend/db/models');
const axios = require('axios');
const geolib = require('geolib'); //

const router = express.Router();


// Define a route to calculate the distance between two addresses
const geocodeAddress = async (address) => {
    const apiKey = 'AIzaSyA9ZZhYki6tunwewDOEljGqWu9sSY6VC9k';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const response = await axios.get(url);
    if (response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error('Failed to geocode address');
    }
  };

  const distanceInMiles = async (address1, address2) => {

    try {
      // Geocode the addresses to get their coordinates
      const { lat: lat1, lng: lng1 } = await geocodeAddress(address1);
      const { lat: lat2, lng: lng2 } = await geocodeAddress(address2);

      // Calculate the distance between the two locations using geolib
      const distanceInMeters = geolib.getDistance(
        { latitude: lat1, longitude: lng1 },
        { latitude: lat2, longitude: lng2 }
      );

      // Convert the distance to miles
      const distanceInMiles = geolib.convertDistance(distanceInMeters, 'mi');

      return distanceInMiles

    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const milesToMinutes = (distanceInMiles, speedInMph) => {
    // Convert speed from miles per hour to miles per minute
    const speedInMpm = speedInMph / 60;

    // Calculate time in minutes
    const timeInMinutes = distanceInMiles / speedInMpm;

    return timeInMinutes;
  };

router.get('/', async (req, res) => {
    const { user } = req
    const address = user.dataValues.address
    let location

    let restaurants = await Restaurant.findAll()

    const requests = restaurants.map(async (restaurant) => {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
                query: restaurant.name,
                location: address,
                radius: 50000, // Search radius in meters (adjust as needed)
                key: 'AIzaSyA9ZZhYki6tunwewDOEljGqWu9sSY6VC9k',
            }
        });


        const places = response.data.results;
        let location = ""

        if (places.length > 0) {
            location = places[0].formatted_address;
        }

        console.log(places[0])


        let franchise = await Restaurant.findOne({
            where: {
                name: restaurant.name
            }
        });

        if (franchise) {
            let distance = await distanceInMiles(location, address);
            let miles = 1;
            let mins = 0;

            if (distance) {
                miles = distance.toFixed(1);
                mins = milesToMinutes(Math.round(miles), 60);
            }

            franchise.set({
                address: location,
                miles,
                mins,
                franchiseId: places[0]?.place_id,
                level: places[0]?.price_level

            });

            await franchise.save();
        }


    })

    const franchises = await Restaurant.findAll({
        include: [
            { model: MenuItem },
            { model: RestaurantTime },
            { model: Review },
            { model: Offer },
            { model: RestaurantImage },
            { model: Save }

        ]
    })

    res.json( franchises )

})

router.get('/search', async (req, res) => {
    const search = req.query.search

    let franchise = []

    franchise = await Restaurant.findAll({
        where: {
            name: {
                [Op.like]: `%${search}%`
            }
        },
        include: [
            { model: MenuItem },
            { model: RestaurantTime },
            { model: Review },
            { model: Offer },
            { model: RestaurantImage },
            { model: Save }

        ]
    })

    if (!franchise.length) {

        franchise = await Restaurant.findAll({
            where: {
                type: {
                    [Op.like]: `%${search}%`
                }

            },
            include: [
                { model: MenuItem },
                { model: RestaurantTime },
                { model: Review },
                { model: Offer },
                { model: RestaurantImage },
                { model: Save }

            ]
        })

    }


    res.json( franchise )

})

router.get('/saves', async (req, res) => {
    const { user } = req
    const userId = user?.dataValues.id

    if (!userId) {

        return res.json({"message": "Please login"});

    }


    let saves = []

    saves = await Save.findAll({
        where : {
            userId,
        },
        include : [
            { model: Restaurant,
                include: [
                    { model: MenuItem },
                    { model: RestaurantTime },
                    { model: Review },
                    { model: Offer },
                    { model: RestaurantImage },
                    { model: Save }
                ]
            }
        ]
    });


    if (!saves) {

        res.json({"message": "Saves couldn't be found"});

    }

    res.json( saves )

})

router.post('/:id/save', async (req, res) => {
    let restaurantId = req.params.id;
    let restaurantExist = await Restaurant.findByPk(restaurantId);
    const { user } = req
    const userId = user.dataValues.id

    if (!restaurantExist) {

        res.json({"message": "Restaurant couldn't be found"});

    }

    let s = await Save.create({
        restaurantId,
        userId
    })

    let save = await Save.findByPk(s.dataValues.id, {
        include : [
            { model: Restaurant,
                include: [
                    { model: MenuItem },
                    { model: RestaurantTime },
                    { model: Review },
                    { model: Offer },
                    { model: RestaurantImage },
                    { model: Save }

                ]
            }
        ]
    });


    if (!save) {

        res.json({"message": "Save couldn't be found"});

    }

    res.json( save )

})

router.delete('/save/:id', async (req, res) => {
    let saveId = req.params.id;
    let saveExist = await Save.findByPk(saveId);
    const { user } = req
    const userId = user.dataValues.id

    if (!saveExist) {

        res.json({"message": "Save couldn't be found"});

    }

    saveExist.destroy()

    res.json( {"message": "Save succesfully deleted"} )

})


router.post('/', async (req, res) => {
    let { address } = req.body
    let location

    let restaurants = await Restaurant.findAll()

    const requests = restaurants.map(async (restaurant) => {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
                place_id: 'PLACE_ID',
                query: restaurant.name,
                location: address,
                radius: 50000, // Search radius in meters (adjust as needed)
                key: 'AIzaSyA9ZZhYki6tunwewDOEljGqWu9sSY6VC9k',
                // place_level: 'PLACE_LEVEL',

            }
        });


        const places = response.data.results;
        let location = ""

        if (places.length > 0) {
            location = places[0].formatted_address;
        }

        let franchise = await Restaurant.findOne({
            where: {
                name: restaurant.name
            }
        });

        if (franchise) {
            let distance = await distanceInMiles(location, address);
            let miles = 1;
            let mins = 0;

            if (distance) {
                miles = distance.toFixed(1);
                mins = milesToMinutes(Math.round(miles), 60);
            }

            franchise.set({
                address: location,
                miles,
                mins,
                franchiseId: places[0]?.place_id,
                level: places[0]?.price_level

            });

            await franchise.save();
        }


    })

    const franchises = await Restaurant.findAll({
        include: [
            { model: MenuItem },
            { model: RestaurantTime },
            { model: Review },
            { model: Offer },
            { model: RestaurantImage }

        ]
    })

    res.json( franchises )

})

router.post('/:id/cart', async (req, res) => {
    let restaurantId = req.params.id;
    let restaurantExist = await Restaurant.findByPk(restaurantId);
    const { user } = req
    const { sessionId } = req.body

    const userId = user?.dataValues.id


    if (!restaurantExist) {

        res.json({"message": "Restaurant couldn't be found"});

    }

    if (!userId && sessionId) {

         let cart = await ShoppingCart.findOne({
        where : {
            sessionId,
            restaurantId,
            status: "Ordering"
        },
        include : [
            {
                model: CartItem,
                include : [
                    {
                        model: MenuItem,
                    },
                    {
                        model: CartItemNotes,
                        include : [
                            {
                                model: ItemSelection,
                            }
                        ]
                    }
                ]
             },
            { model: Restaurant }
        ]
    });


    if (!cart) {

        res.json({"message": "Shopping Cart couldn't be found"});

    }

    res.json( cart )

    }
    else if (userId) {


            let cart = await ShoppingCart.findOne({
                where : {
                    userId,
                    restaurantId,
                    status: "Ordering"
                },
                include : [
                    {
                        model: CartItem,
                        include : [
                            {
                                model: MenuItem,
                            },
                            {
                                model: CartItemNotes,
                                include : [
                                    {
                                        model: ItemSelection,
                                    }
                                ]
                            }
                        ]
                     },
                    { model: User },
                    { model: Restaurant }
                ]
            });


            if (!cart) {

                res.json({"message": "Shopping Cart couldn't be found"});

            }

            res.json( cart )
    }
    else {
        res.json({"message": "Please try again later" });

    }

})

router.get('/:id/reviews', async (req, res) => {
    let restaurantId = req.params.id;
    let restaurantExist = await Restaurant.findByPk(restaurantId);
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;

    if (!restaurantExist) {

        res.json({"message": "Restaurant couldn't be found"});

    }

    let reviews = await Review.findAll({
        where: {
            restaurantId
        },
        include : [
            { model: User }
        ],
        limit: pageSize,
        offset: (page - 1) * pageSize
    });

    res.json( reviews )

})

router.post('/:id', async (req, res) => {
    let { address } = req.body
    let restaurantId = req.params.id;
    let restaurantExist = await Restaurant.findByPk(restaurantId);

    if (!restaurantExist) {

        res.json({"message": "Restaurant couldn't be found"});

    }

    let restaurant =  await Restaurant.findByPk(restaurantId, {
        include: [
            { model: RestaurantImage },
            { model: RestaurantTime },
            {
                model: MenuItem,
                include: [
                    { model: ItemOption }
                ]
            },
            { model: Offer },
            { model: Review,
                include: [
                    { model: User }
                ]
            },
            { model: Save }
        ]
    });

    res.json( restaurant )

})

router.post('/:id/review', async (req, res) => {
    let restaurantId = req.params.id;
    let restaurantExist = await Restaurant.findByPk(restaurantId);
    let { review, rating, franchiseId } = req.body;
    const { user } = req
    const userId = user.dataValues.id

    if (!restaurantExist) {

        res.json({"message": "Restaurant couldn't be found"});

    }

    let rr = await Review.create({
        restaurantId,
        userId,
        review,
        rating,
        franchiseId
    })

    let r = await Review.findByPk(rr.dataValues.id, {
        include : [
            { model: User }
        ]
    });

    res.json( r )

})



module.exports = router;
