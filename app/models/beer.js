'use strict'

const mongoose = require('mongoose')

// "beer": {
//   "brand": "'"${BRAND}"'",
//   "name": "'"${NAME}"'",
//   "style": "'"${STYLE}"'"

const beerSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

beerSchema.virtual('length').get(function length () {
  return this.brand.length
})

const Beer = mongoose.model('Beer', beerSchema)

module.exports = Beer
