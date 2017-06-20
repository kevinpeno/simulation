/* globals module, require */
"use strict"

const _ = require("./utils")
function get(state, type) {
	return _.defaultTo(
		_.find(state, _.matchesProperty("type", type)),
		{
			type,
			"amount": 0
		}
	)
}

function has(state, type, toCompare) {
	return _.gte(
		get(state, type).amount,
		toCompare
	)
}

function set(state, type, amount) {
	return _.map(state, _.cond([
		[
			_.matchesProperty("type", type),
			_.partialRight(_.assign, {
				amount
			})
		],
		[_.stubTrue, _.identity]
	]))
}

module.exports = {
	get,
	set,
	has
}
