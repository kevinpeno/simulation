/* globals module, require */
"use strict"

const _ = require("../src/utils")

const meetsRequirements = _.curry((state, config) => {
	return _.toPairs(config)
		.filter(([, value]) => value < 0) // all consumed are < 0
		.every(([name, value]) => _.getOr(0, name, state) >= -value) // flip sign to see if we have enough
})

const run = _.curry((config, state) => {
	return _.cond([
		[meetsRequirements(state), _.identity],
		[_.stubTrue, _.stubObject]
	])(config)
})

module.exports = {
	run
}
