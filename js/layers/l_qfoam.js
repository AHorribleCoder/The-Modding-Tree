addLayer("QFoam", {
	name: null, // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "QF", // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	color: "#CFCFDF",
	requires: new Decimal(10), // Can be a function that takes requirement increases into account
	resource: "quantum foam", // Name of prestige currency
	baseResource: "QFluc", // Name of resource prestige is based on
	baseAmount() {return player.points}, // Get the current amount of baseResource
	type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.5, // Prestige currency exponent
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1)
		
	if (hasUpgrade("QFoam", 21))
		mult = mult.mul(upgradeEffect("QFoam", 21))
	if (hasUpgrade("QFoam", 25))
		mult = mult.mul(upgradeEffect("QFoam", 25))

	
	if (hasUpgrade("QFoam", 32))
		mult = mult.mul(upgradeEffect("QFoam", 32))
	
	mult = mult.mul(buyableEffect("QFoam", 12))

	
	if (hasUpgrade("QFoam", 34))
		mult = mult.mul(upgradeEffect("QFoam", 34))
	
	if (hasUpgrade("QFoam", 35))
		mult = mult.mul(upgradeEffect("QFoam", 35))
	
	
	mult = mult.mul(layers["Space"].effect())
	
		return mult
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1)
	},
	row: 0, // Row the layer is in on the tree (0 is the first row)
	hotkeys: [
		{key: "q", description: "Q: Reset for quantum foam", onPress(){if (canReset(this.layer)) triedtoQFoamReset++}},
	],
	upgrades: {
		11: {
			title: "Start",
			description: "Start gathering more quantum fluctuations (QFluc).</br>You've got nothing better to do anyway...",
			cost: new Decimal(1),
			unlocked: true,
			effect() { return new Decimal(0.2) },
			
		},
		12: {
			title: "Bored?",
			description: "This is taking too long.</br>5x QFluc",
			cost: new Decimal(1),
			canAfford() { return hasUpgrade(this.layer, 11) },
			effect() { return new Decimal(5) },
			unlocked: true,
		},
		13: {
			title: "Exerciing Yourself",
			description: "Unspent QFoam boost QFluc.",
			tooltip: "No, I wont fix this typo",
			cost: new Decimal(5),
			canAfford() { return hasUpgrade(this.layer, 11) },
			effect() { return new Decimal(player[this.layer].points).add(1).sqrt() },
			effectDisplay() {return ezEffectDisplay(this.layer, this.id, '', 'x', false)},
			unlocked: true,
		},
		14: {
			title: "Gather More",
			description: "As the name suggests.</br>+5 QFluc/s",
			cost: new Decimal(20),
			canAfford() { return hasUpgrade(this.layer, 11) },
			effect() { return new Decimal((hasUpgrade(this.layer, 16)? 1 : 5)) },
			effectDisplay() {return ezEffectDisplay(this.layer, this.id, '+', '', false)},
			unlocked: true,
		},
		15: {
			title: "Self Improvement",
			description: "Uhh... boost QFluc gain based on time spent in QFoam reset?",
			cost: new Decimal(30),
			canAfford() { return hasUpgrade(this.layer, 11) },
			effect() { return new Decimal(player[this.layer].resetTime).add(1).sqrt() },
			effectDisplay() {return ezEffectDisplay(this.layer, this.id, '', 'x', false)},
			unlocked: true,
		},
		16: {
			title: "'Gather More' and smarter",
			description: "'Gather More' effect is nerfed (+5 > +1) but applies to base gain instead.</br>You thought is was a straight nerf didn't you?",
			cost: new Decimal(60),
			canAfford() { return hasUpgrade(this.layer, 14) },
			unlocked: true,
			tooltip() {return getAffectedUpgrade("QFoam", 14)}
		},
		21: {
			title: "A New Row??",
			description: "I didn't see you there, here's a free 2x to QFoam gain!",
			cost: new Decimal(100),
			effect() { return new Decimal(2) },
			unlocked() { return hasUpgrade(this.layer, 16) },
		},
		22: {
			title: "Fun Fact",
			description: "Quantum fluctuation and foam are somewhat representing the same thing and yet, they are different in this mod.</br>Anyway, here's another boost.</br> +1.5 base QFluc",
			cost: new Decimal(300),
			effect() { return new Decimal(1.5) },
			unlocked() { return hasUpgrade(this.layer, 16) },
		},
		23: {
			title: "Fluctuatin'",
			description: `Gain a oscillating boost to QFluc Rx with R\u2208${displayDefiniteSet(1, 2)}`,
			cost: new Decimal(1000),
			effect() { return new Decimal(Math.sin(player.time / 12000.0) * 0.5 + 1.5) },
			effectDisplay() {return ezEffectDisplay(this.layer, this.id, '', 'x', false)},
			unlocked() { return hasUpgrade(this.layer, 16) },
		},
		24: {
			title: "I heard you like fluctuations",
			description: "QFluc boosts itself.",
			cost: new Decimal(2000),
			effect() { return player.points.add(1).log10().add(1) },
			effectDisplay() {return ezEffectDisplay(this.layer, this.id, '', 'x', false)},
			unlocked() { return hasUpgrade(this.layer, 16) },
		},
		25: {
			title: "Order From Disroder",
			description: "Each upgrade bought in QFoam boosts QFoam gain by 1.1x.",
			cost: new Decimal(5000),
			effect() { return new Decimal(1.1).pow(getUpgradeCount(this.layer)) },
			effectDisplay() {return ezEffectDisplay(this.layer, this.id, '', 'x', false)},
			unlocked() { return hasUpgrade(this.layer, 16) },
		},
		26: {
			title: "Getting Serious",
			description: "Each QFoam upgrade bought boosts QFluc gain by 3x. it's time to get serious",
			cost: new Decimal(10000),
			effect() { return new Decimal(3).pow(getUpgradeCount(this.layer)) },
			effectDisplay() {return ezEffectDisplay(this.layer, this.id, '', 'x', false)},
			unlocked() { return hasUpgrade(this.layer, 25) },
		},
		31: {
			title: "Buyables?",
			description: "How about some new gameplay?</br>Unlock a buyable.",
			cost: new Decimal(50e6),
			effect() { return "UNLOCKED!" },
			effectDisplay() {return this.effect()},
			unlocked() { return hasUpgrade(this.layer, 26) },
		},
		32: {
			title: "Weak Buyable Synergy",
			description: "Each 'Multi-Fluctuations' bought boosts QFoam gain by 1.025.",
			cost: new Decimal(5e8),
			effect() { return new Decimal(1.025).pow(getBuyableAmount(this.layer, 11)) },
			effectDisplay() {return ezEffectDisplay(this.layer, this.id, '', 'x')},
			unlocked() { return hasUpgrade(this.layer, 26) },
		},
		33: {
			title: "Exponential Fluctuations",
			description: "As the name suggests, raises QFluc gain by ^1.25",
			cost: new Decimal(1e10),
			effect() { return new Decimal(1.25) },
			unlocked() { return hasUpgrade(this.layer, 26) },
		},
		34: {
			title: "New Layer Soon&trade;",
			description: "Don't worry, it's not far away.</br>Double QFluc gain for every upgrade bought.",
			cost: new Decimal(2.5e18),
			effect() { return new Decimal(2).pow(getUpgradeCount(this.layer)) },
			effectDisplay() {return ezEffectDisplay(this.layer, this.id, '', 'x')},
			unlocked() { return hasUpgrade(this.layer, 26) },
		},
		35: {
			title: "Final Stretch",
			description: "QFoam boosts itself again.</br>You're so close!",
			cost: new Decimal(1e48),
			effect() {return player[this.layer].points.log10().mul(2)},
			effectDisplay() {return ezEffectDisplay(this.layer, this.id, '', 'x')},
			unlocked() { return player[this.layer].points.gte(1e40) }
		},
		36: {
			title: "New Layer!",
			description: "Gain access to the next layer!</br>(Permanent)",
			cost: new Decimal(1e78),
			unlocked() { return player[this.layer].points.gte(1e72) || hasUpgrade(this.layer, this.id) },
		},
	},
	buyables: {
		11: {
			title: "Multi-Fluctuations",
			cost(x) { return new Decimal(2.2).pow(x).mul(1e7) }, // Cost starts at 1e7, scale: exp
			display() { return "Multiply QFluc gain by 1.5x.</br></br>Bought: " + getBuyableAmount(this.layer, this.id) + "</br>" + ezBuyableEffectDisplay(this.layer, this.id, '', 'x QFluc') + "</br></br>" + ezBuyableCostDisplay(this.layer, this.id)},
			effect(x) { return new Decimal(1.5).pow(x) },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			}
		},
		12: {
			title: "More Foams",
			cost(x) { return new Decimal(2.5).pow(x).mul(1e16) }, // Cost starts at 3e7, scale: exp
			display() { return "Multiply QFoam gain by 1.2x.</br></br>Bought: " + getBuyableAmount(this.layer, this.id) + "</br>" + ezBuyableEffectDisplay(this.layer, this.id, '', 'x QFoam') + "</br></br>" + ezBuyableCostDisplay(this.layer, this.id)},
			effect(x) { return new Decimal(1.2).pow(x) },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			unlocked() { return getBuyableAmount(this.layer, 11) >= 24 }
		},
	},
	bars: {
		test: {
			direction: RIGHT,
			width: 750,
			height: 20,
			progress() { return (player[this.layer].points.log(10).div(78))},
			unlocked() {return hasUpgrade(this.layer, 35)},
			display() {return `${format(player[this.layer].points.log(10))} / ${78} OOM of ${layers[this.layer].resource} for next layer`},
			textStyle: {"color": () => {return layers["QFoam"].color}},
			baseStyle: {"background-color": () => {return layers["QFoam"].color}},
			fillStyle: {"background-color": () => {return layers["Space"].color}},
		},
	},
	tabFormat: {
		"Upgrades": {
			content: [
				"main-display",
				"prestige-button",
				"resource-display",
				["bar", "test"],
				"blank",
				"upgrades"
			],
			unlocked() {return hasUpgrade("QFoam", 31)}
		},
		"Buyables": {
			content: [
				"main-display",
				"blank",
				"blank",
				"buyables"
			],
			unlocked() {return hasUpgrade("QFoam", 31)}
		},
	},
	layerShown(){return true}
})



