'use strict'

const models = require('app/models')
const User = models.user
// const dotenv = require('dotenv').config()
require('dotenv').config()

const MessageVerifier = require('lib/wiring/message-verifier')

const decodeToken = (signedSecureToken) => {
  const mv = new MessageVerifier('secure-token', process.env.SECRET_KEY)
  return mv.verify(signedSecureToken)
}

// const decodePlacesKey = (signedSecureToken) => {
//   const mv = new MessageVerifier('MAPS_PLACES_API_KEY: ', process.env.MAPS_PLACES_API_KEY)
//   return mv.verify(signedSecureToken)
// }

const setUser = function (req, res, next) {
  // console.log('setUser req: ', req)
  // console.log('setUser res: ', res)
  // console.log('setUser next: ', next)
  console.log('User: ', User)
  const tokenRegex = /^Token token=/
  const separatorRegex = /\s*(?::|;|\t+)\s*/
  const auth = req.headers.authorization
  if (auth && tokenRegex.test(auth)) {
    const opts = auth.replace(tokenRegex, '').split(separatorRegex)
    const signedToken = opts.shift()
    console.log('signedToken: ', signedToken)
    const token = decodeToken(signedToken)
    console.log('token: ', token)
    const mapsPlacesApiKey = process.env.MAPS_PLACES_API_KEY
    console.log('MAPS_PLACES_API_KEY: ', mapsPlacesApiKey)
    // res.json({ mapsPlacesApiKey })
    User.findOne({ token })
      .then(user => {
        req.user = user
        // req.mapsPlacesApiKey = mapsPlacesApiKey
        next()
      }
      // ,
      //   mapsPlacesApiKey => {
      //     res.json({
      //       mapsPlacesApiKey: mapsPlacesApiKey
      //     })
      //   }
      )
      // .then(mapsPlacesApiKey => {
      //   res.json({
      //     mapsPlacesApiKey: mapsPlacesApiKey
      //   })
      // })
    // this messes up the promise chain
      // .then(user => {
      //   req.user = user
      //   res.json({
      //     mapsPlacesApiKey: mapsPlacesApiKey
      //   })
      //   next()
      // })
      .catch(err => next(err))
  } else {
    next()
  }
}

module.exports = setUser
