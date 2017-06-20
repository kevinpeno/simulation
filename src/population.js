/* globals module, require */
"use strict"

const _ = require("./utils")

function get(state) {
	return _.get(state, "population", 0)
}

function set(state, value) {
	return _.assign(state, {
		"population": _.max([value, 0])
	})
}

function increment(state, value) {
	return set(state, _.sum([get(state), value]))
}

module.exports = {
	get,
	set,
	increment
}
