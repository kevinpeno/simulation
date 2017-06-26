/* globals module, require, Infinity */
"use strict"

const _ = require("lodash")

function assign(toAssign, assignee) {
	return Object.assign({}, assignee, toAssign)
}

function set(property, value, assignee) {
	return assign({
		[property]: value
	}, assignee)
}

function setWith(property, value, customizer, assignee) {
	return set(
		property,
		customizer(value),
		assignee
	)
}

const gt0 = _.partial(Math.max, 0)

module.exports = assign({
	assign,
	set,
	setWith,
	gt0
}, _)
