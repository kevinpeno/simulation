/* globals module, require */
"use strict"

const utils = require("./utils")

function get(state) {
	return state.population || 0
}

function set(state, value) {
	return utils.setKeyValue(
		state,
		"population",
		value >= 0 ? value : 0
	)
}

function increment(state, value) {
	return set(state, get(state) + value)
}

module.exports = {
	get,
	set,
	increment
}
