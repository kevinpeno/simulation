/* globals module */
"use strict"

function setKeyValue(obj, key, newValue) {
	return Object.assign({}, obj, {
		[key]: newValue
	})
}

function incrementKeyValue(obj, key, increment) {
	return Object.assign({}, obj, {
		[key]: obj[key] + increment
	})
}

module.exports = {
	setKeyValue,
	incrementKeyValue
}
