'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Beer = models.beer
// this is only used if add additional relationships
// const Response = models.response
  // wasn't needed
  // const responses = require('./responses')

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')



// dotenv method to pull data from .env files
// const dotenv = require('dotenv').config()
require('dotenv').config()

// const MessageVerifier = require('lib/wiring/message-verifier')

// const decodePlacesKey = (signedSecureToken) => {
//   const mv = new MessageVerifier('MAPS_PLACES_API_KEY: ', process.env.MAPS_PLACES_API_KEY)
//   return mv.verify(signedSecureToken)
// }

// find / show all beers
const index = (req, res, next) => {
  const mapsPlacesApiKey = process.env.MAPS_PLACES_API_KEY
  console.log('MAPS_PLACES_API_KEY: ', mapsPlacesApiKey)
  // find everything in the Beer collection
  Beer.find({'_owner': req.user})
    .then(beers => {
      // console.log('beer index req.user is: ', req.user)
      res.json({ // res.json is like 'render' in rails, and is what sends data to the client side
      // to each individual beer:
        beers: beers.map((event) => // "beers.map" here could be called anything as long as it matches the fat arrow method name of beers // map creates new array
          event.toJSON({ virtuals: true, user: req.user })),
        mapsPlacesApiKey: mapsPlacesApiKey
      })
    })
    // just for error handling, move to the next thing?
    .catch(next)
}

// takes req(uest) and res(ponse) objects
const show = (req, res) => {
  // sends a json response of the requested beer
  res.json({
    // beer: req.beer.toJSON({ virtuals: true, user: req.user })
    beer: req.beer.toJSON({ virtuals: true })
  })
}

const create = (req, res, next) => {
  // adds the _owner key to req.body.beer and sets the req.user_id // this creates an beer with an _owner
  const beer = Object.assign(req.body.beer, {
    _owner: req.user._id
  })
  // executes the create method on Beer model with beer object
    // this beer object is created with data from the client and the current user as _owner
  Beer.create(beer)
    // the newly created beer we get from database is rendered as JSON

    .then(beer =>
      res.status(201)
        .json({
          beer: beer.toJSON({ virtuals: true, user: req.user })
        })
      )

    // if there is an error, send to the error handler
    .catch(next)
}

const update = (req, res, next) => {
  // protects against malicious users by deleting the _owner key from req.body
  // console.log('update beer here: ', req.body)
  // console.log('update beer here: ', req.body.beer)
  // console.log('here is the req.beer._owner: ', req.beer._owner)
  // console.log('update beer here for req: ', req)
  // console.log('update beer here for res: ', res)
  // delete req.body._owner  // disallow owner reassignment.
  delete req.beer._owner  // disallow owner reassignment.
// updates the beer in the database
  req.beer.update(req.body.beer)
    // if update is successful then send 204 status back to client
    // is 204 the right status for an update?
    .then(() => res.sendStatus(204))
    // if update fails, send error handler message
    .catch(next)
}

const destroy = (req, res, next) => {
  // remove beer from db
  console.log(req)
  console.log(req.beer)
  req.beer.remove()
  // if successfully remove ex from db, return 204 to client
    .then(() => {
      console.log('URL_PATH is this: ', req.URL_PATH)
      console.log('req.beer is: ', req.beer)
      console.log('req.beer._id is: ', req.beer._id)

      // use this for additional resources later on:
        // responses.controller.destroy(req.beer._id)
        // Response.find({'beer_id': req.beer._id}).remove()
        // Response.remove({beer_id: req.beer._id}).exec()
      res.sendStatus(204)
      console.log('req body is: ', req.body)
      console.log('request is: ', req.beer)
    })
    // error handling
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  // runs the setUser middleware for index and show controller actions
  { method: setUser, only: ['index', 'show'] },
    // runs the authenticate middleware for all controller actions except index and show
  { method: authenticate, except: ['index', 'show'] },
  // runs the setModel middleware for show controller action
  { method: setModel(Beer), only: ['show'] },
  // runs the setModel middleware for update and destroy controller actions, making sure the user only does it on things associated with that user
  { method: setModel(Beer, { forUser: true }), only: ['update', 'destroy'] }
]
})
