/* globals module, require */
"use strict"

const _ = require("lodash")
const population = require("./population")

function itWith(executor, state) {
	return executor(state)
}

function hasFood(state) {
	return state.goods.filter((v) => {
		return v.type === "food"
	})
}

function getFood(state) {
	return hasFood(state)
		.reduce((acc, food) => {
			return acc + food.amount
		}, 0)
}

function isFoodLessThanPopulation(state) {
	return getFood(state) < state.population
}

const increasePopIfNotTooLarge = _.cond([
	[ population.isLessThanZero, _.partialRight(population.set, 0) ],
	[ population.isLessThanSize, _.partialRight(population.increment, 1) ],
	[_.stubTrue, _.identity]
])

const decreasePopIfMissingFood = _.cond([
	[ isFoodLessThanPopulation, _.partialRight(population.decrement, 1) ],
	[_.stubTrue, increasePopIfNotTooLarge]
])

module.exports = {
	itWith,
	increasePopIfNotTooLarge,
	hasFood,
	getFood,
	isFoodLessThanPopulation,
	decreasePopIfMissingFood
}
