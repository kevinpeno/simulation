/* global setTimeout, console */
import {
	producer,
	consumer,
	factory,
	getStores,
} from "./src/index"

const feedPopulation = (gluttony = 1) => (stores) => consumer([
	"food",
	Math.floor(
		gluttony * getStores("population", stores)
	)
])

const workThePopulous = (efficiency = 1) => (stores) => producer([
	"energy",
	Math.floor(
		efficiency * getStores("population", stores)
	)
])

const growFood = (efficiency = 1) => (stores) => {
	const energy = getStores("energy", stores)

	return factory(
		["energy", energy],
		["food", Math.floor(energy * efficiency)]
	)
}

const cullPopulation = () => (stores) => {
	const food = getStores("food", stores)

	return food < 0
		? factory(["population", -food], ["food", -food])
		: producer(["population", 0])
}

const makeBabies = (sexCraze) => (stores) => {
	const food = getStores("food", stores)

	return food > 0
		? factory(["food", food], ["population", Math.floor(food * sexCraze)])
		: producer(["population", 0])
}

const simulate = (factories) => (stores) => {
	const newStoresObj = factories
		.reduce((stores, factory) => {
			return stores.concat(factory(stores))
		}, stores)
		.reduce((stores, [name, value]) => {
			return Object.assign({}, stores, {
				[name]: (stores[name] ? (stores[name] + value) : value)
			})
		}, {})

	const newStore = []

	for ( const i in newStoresObj) {
		newStore.push([i, newStoresObj[i]])
	}

	return newStore
}

function loop(timer, toRun) {
	const run = (state) => {
		setTimeout(() => {
			const newState = toRun(state)
			console.log(newState)
			run(newState)
		}, timer)
	}

	return run
}

// config
const startingCivCount = 15000
const GROWING_EFFICIENCY = 1.05
const SEX_CRAZE = 0.01

const factories = [
	feedPopulation(),
	workThePopulous(),
	growFood(GROWING_EFFICIENCY),
	cullPopulation(),
	makeBabies(SEX_CRAZE),
]

const stores = [
	["energy", 0],
	["food", startingCivCount],
	["population", startingCivCount]
]

// run it
loop(1000, simulate(factories))(stores)
