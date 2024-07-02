addLayer("Space", {
	name: null, // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	color: "#3E1069",
	branches: ["QFoam"],
	requires: new Decimal(1e78), // Can be a function that takes requirement increases into account
	resource: "space", // Name of prestige currency
	baseResource: "QFoam", // Name of resource prestige is based on
	baseAmount() {return player["QFoam"].points}, // Get the current amount of baseResource
	type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.2, // Prestige currency exponent
	effect() {return player[this.layer].points.add(1)},
	effectDescription() {return `boosting QFoam gain by ${ezLayerEffectDisplay(this.layer, '', 'x')}`},
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1)
		
		return mult
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1)
	},
	row: 1, // Row the layer is in on the tree (0 is the first row)
	hotkeys: [
		{key: "s", description: "S: Reset for Space", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
	],

	layerShown(){return hasUpgrade("QFoam", 36) || player[this.layer].total.gt(0)}
})



