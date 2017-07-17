/* globals module, require */
"use strict"

const _ = require("./utils")
const get = _.partial(_.getOr, 0)

function has(type, value, state) {
	return _.gte(
		get(type, state),
		value
	)
}

function set(type, value) {
	return _.set(type, value)
}

module.exports = {
	get,
	set,
	has
}
