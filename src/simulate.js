/* globals module, require */
"use strict"

const _ = require("./utils")
const goods = require("./goods")
const population = require("./population")

function itWith(executor, state) {
	return executor(state)
}

function isPopulationSufficient(state) {
	return _.gt(population.get(state), 0)
}

function isSpaceSufficient(state) {
	return _.gt(state.size, population.get(state))
}

function isFoodSufficient(state) {
	return goods.has("food", state.population, state.goods)
}

const canPopGrow = _.overEvery([
	isPopulationSufficient,
	isSpaceSufficient,
	isFoodSufficient
])

const growPopulation = _.cond([
	[canPopGrow, _.partial(population.increment, 1)],
	[_.negate(isFoodSufficient), _.partial(population.increment, -1)],
	[_.stubTrue, _.identity]
])

function consumeFood(state) {
	return _.assign({
		"goods": goods.increment(
			"food",
			_.multiply(-1, population.get(state)),
			state.goods
		)
	}, state)
}

module.exports = {
	itWith,
	isPopulationSufficient,
	isSpaceSufficient,
	isFoodSufficient,
	canPopGrow,
	growPopulation,
	consumeFood
}
