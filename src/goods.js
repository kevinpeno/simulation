/* globals module */
"use strict"

function get(state, property) {
	return state && state.find((o) => {
		return o.type === property
	})
}

function has(state, property, toCompare) {
	const good = get(state, property) || {}
	return good.amount >= toCompare
}

module.exports = {
	get,
	has
}
