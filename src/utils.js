/* globals module, require, Infinity */
"use strict"

const _ = require("lodash")

function assign(toAssign, assignee) {
	return Object.assign({}, assignee, toAssign)
}

// eslint-disable-next-line
function flattenObject(obj, nestedKeys=[]) {
	return Object.keys(obj)
		.map((key) => {
			return [obj[key], nestedKeys.concat([key])]
		})
		.map(_.cond([
			[_.spread(_.isPlainObject), _.spread(flattenObject)],
			[_.stubTrue, _.spread((value, key) => {
				return {
					[key.join(".")]: value
				}
			})]
		]))
		.reduce((acc, x) => {
			return assign(acc, x)
		}, {})
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

function mergeDiffsToState(diffs, state) {
	const cleanDiffs = diffs
		.map(_.flow([
			_.partial(flattenObject, _, []),
			_.toPairs
		]))

	const calculateDiffs = _.flow([
		_.spread((property, newValue) => {
			return [property, newValue, getOr(0, property, state)]
		}),
		_.spread((property, newValue, current) => {
			return [property, _.sum([newValue, current])]
		}),
		_.spread((property, value) => {
			return set(property, _.max([value, 0]))
		})
	])

	return _.flatten(cleanDiffs)
		.map(calculateDiffs)
		.reduce((acc, value) => {
			return _.merge({}, acc, value)
		}, state)
}

module.exports = assign({
	assign,
	flattenObject,
	get,
	getOr,
	gt0,
	mergeDiffsToState,
	set,
	setWith
}, _)
