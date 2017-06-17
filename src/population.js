/* globals module, require */
"use strict"

const utils = require("./utils")

function get(state) {
	return state.population || 0
}

function set(state, value) {
	return utils.setKeyValue(state, "population", value)
}

function increment(state, value) {
	const pop = get(state)
	return set(state, pop + value)
}

function decrement(state, value) {
	const pop = get(state)
	return set(state, pop - value)
}

function isLessThanZero(data) {
	return data.population < 0
}

function isLessThanSize(data) {
	return data.population < data.size
}

module.exports = {
	get,
	set,
	increment,
	decrement,
	isLessThanSize,
	isLessThanZero
}
