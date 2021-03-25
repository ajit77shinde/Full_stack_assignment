let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// user Model
let userSchema = require('../models/user');

// CREATE user
router.route('/create-user').post((req, res, next) => {
  console.log('req.body = ', req.body)
  userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      // res.json(data)
      res.json({msg: "User created Successfully!!"})
    }
  })
});

// Update user
router.route('/update-user').put((req, res, next) => {
  console.log("req.body._id", req.body._id)
  userSchema.findByIdAndUpdate(req.body._id, req.body, (error, data) => {
    if (error) {
      console.log("error = =====", error)
      return next(error);
    } else {
      console.log("data = ", data);
      if(data){
     
        res.json({msg: "user updated successfully !"})
     }
      // res.json(data)
    }
  })
})

// READ users
router.route('/').get((req, res) => {
  userSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single user
router.route('/edit-user/:id').get((req, res, next) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})




// Delete user
router.route('/delete-user/:id').delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
// Delete user
router.route('/delete-all').delete((req, res, next) => {
  userSchema.deleteMany({}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;