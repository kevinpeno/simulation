/* globals module,require */
"use strict"

const _ = require("lodash")

const assign = _.partial(_.assign, {})
const defaults = _.partial(_.defaults, {})

module.exports = assign(_, {
	assign,
	defaults
})
