/* globals module, require */
"use strict"

const _ = require("./utils")
function get(type, state) {
	return _.defaultTo(
		_.find(state, _.matchesProperty("type", type)),
		{
			type,
			"amount": 0
		}
	)
}

function has(type, value, state) {
	return _.gte(
		get(type, state).amount,
		value
	)
}

function set(type, value, state) {
	return _.map(state, _.cond([
		[
			_.matchesProperty("type", type),
			_.partial(_.assign, {
				"amount": _.max([value, 0])
			})
		],
		[_.stubTrue, _.identity]
	]))
}

// @todo find a functional way to handle this incrementing
function increment(type, addend, state) {
	const oldValue = get(type, state).amount
	const newValue = _.sum([oldValue, addend])
	return set(type, newValue, state)
}

module.exports = {
	get,
	set,
	has,
	increment
}
