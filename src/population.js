/* globals module, require */
"use strict"

const _ = require("./utils")

const get = _.partialRight(_.get, "population", 0)

function set(value, state) {
	return _.setWith("population", value, _.gt0, state)
}

function increment(value, state) {
	return set(_.sum([get(state), value]), state)
}

module.exports = {
	get,
	set,
	increment
}
