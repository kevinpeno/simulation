/* globals module */
"use strict"

function producer(good) {
	if ( good && good.length ) {
		return (good[0] instanceof Array) ? good : [good]
	}

	return []
}

function consumer(good) {
	return producer(good)
		.map(([name, value]) => [name, -value])
}

function factory(consumes, produces) {
	return [].concat(
		consumer(consumes),
		producer(produces)
	)
}

module.exports = {
	producer,
	consumer,
	factory
}
