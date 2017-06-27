/* globals module, require */
"use strict"

const _ = require("./utils")
const get = _.partial(_.getOr, {
	"amount": 0
})

function has(type, value, state) {
	return _.gte(
		get(type, state).amount,
		value
	)
}

function set(type, value) {
	return _.set(`${type}.amount`, value)
}

module.exports = {
	get,
	set,
	has
}
