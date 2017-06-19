/* globals module, require */
"use strict"

const _ = require("lodash")
const goods = require("./goods")
const population = require("./population")

function itWith(executor, state) {
	return executor(state)
}

function isSpaceSufficient(state) {
	return population.get(state) < state.size
}

function isFoodSufficient(state) {
	return goods.has(state.goods, "food", state.population)
}

const popValidators = [
	isSpaceSufficient,
	isFoodSufficient
]

const canPopGrow = (state) => {
	return popValidators.every((v) => {
		return v(state)
	})
}

const growPopulation = _.cond([
	[canPopGrow, _.partialRight(population.increment, 1)],
	[_.negate(isFoodSufficient), _.partialRight(population.increment, -1)],
	[_.stubTrue, _.identity]
])

module.exports = {
	itWith,
	isSpaceSufficient,
	isFoodSufficient,
	canPopGrow,
	growPopulation
}
