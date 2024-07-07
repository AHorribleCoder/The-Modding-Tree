var superSecretAchievent = false
var triedtoQFoamReset = 0

addLayer("Ach", {
	name: null, // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	update(diff) {
		ap = new Decimal(0)
		for (id in layers[this.layer].achievements) {
			if (hasAchievement(this.layer, id))
				ap = ap.add(achievementEffect(this.layer, id))
		}
		player[this.layer].points = ap
	},
	color: "yellow",
	resource: "achievment power", // Name of prestige currency
	row: "side", // Row the layer is in on the tree (0 is the first row)
	tabFormat: {
		"Achievements": {
			content: [
				"main-display",
				"blank",
				["achievements", 99]
			],
		},
		"Secret Achievements": {
			content: [
				"main-display",
				"blank",
				["achievements", [100, 101]],
				"clickables"
			],
		},
	},
	achievements: {
		//#region Normal achievements
		11: {
			name: "Start",
			tooltip: "Do I need to explain this?",
			done() {return hasUpgrade("QFoam", 11)},
			doneTooltip() {return this.tooltip + "</br>+" + format(this.effect) + " AP"},
			effect: 1
		},
		12: {
			name: "A Row",
			tooltip: "Buy the first row of QFoam upgrades.",
			done() {return hasUpgrade("QFoam", 16)},
			doneTooltip() {return this.tooltip + "</br>+" + format(this.effect) + " AP"},
			effect: 1
		},
		13: {
			name: "Millionaire of nothingness",
			tooltip: "Get 1 million QFluc.",
			done() {return player.points.gte(1e6)},
			doneTooltip() {return this.tooltip + "</br>+" + format(this.effect) + " AP"},
			effect: 1
		},
		14: {
			name: "Quantum Integer Limit",
			tooltip: "Get 2^32 (4,294,967,296) QFoam.",
			done() {return player.points.gte(2**32)},
			doneTooltip() {return this.tooltip + "</br>+" + format(this.effect) + " AP"},
			effect: 1
		},
		//#endregion

		//#region Spicy Achievements
		1001: {
			name: "Kepping to traditions",
			tooltip: "You should know what this one needs.",
			doneTooltip: "Blame that achievement of Hevipelle and his dimensions of antimatter :P.",
			done() {return superSecretAchievent},
		},
		1002: {
			name: "Bamboozled",
			tooltip: "Maybe it didn't register the first time?",
			doneTooltip: "Try to use the hotkey for a QFoam reset 10 time, you must be reallly desperate.",
			done() {return triedtoQFoamReset >= 10},
		},
		1003: {
			name: "Please Stop",
			tooltip: "You might break your keyboard!",
			doneTooltip: "Try to use the QFoam reset hotkey 100 time, ok NOW you can stop.",
			done() {return triedtoQFoamReset >= 100},
		},
		//#endregion
	},
	layerShown(){return true}
})

// Why do I have to do it like this...
setTimeout(() => {
	document.getElementById("achievement-Ach-1001").onclick = function() {superSecretAchievent = true}
	
}, 50);

