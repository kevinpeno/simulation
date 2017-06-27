/* globals module, require */
"use strict"

const _ = require("./utils")

const get = _.partial(_.getOr, 0, "population")

function set(value) {
	return _.set("population", value)
}

module.exports = {
	get,
	set
}
