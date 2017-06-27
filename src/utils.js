/* globals module, require, Infinity */
"use strict"

const _ = require("lodash")

function assign(toAssign, assignee) {
	return Object.assign({}, assignee, toAssign)
}

const get = _.rearg(_.get, [1, 0])
const getOr = _.rearg(_.get, [2, 1, 0])

function set(property, value) {
	return _.set({}, property, value)
}

function setWith(property, value, customizer) {
	return set(
		property,
		customizer(value)
	)
}

const gt0 = _.partial(Math.max, 0)

module.exports = assign({
	assign,
	get,
	getOr,
	set,
	setWith,
	gt0
}, _)
