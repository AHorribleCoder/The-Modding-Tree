let modInfo = {
	name: "The ??? Tree",
	id: "mymod",
	author: "nobody",
	pointsName: "quantum fluctuations",
	modFiles: ["layers/l_qfoam.js", "layers/l_space.js", "layers/achievements.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "24m07a",
	name: "Foamy Layer",
}

let changelog = `<h1>Changelog:</h1><br><br>
	<h3>24m07a (Foamy Layer)</h3><br>
		- Added quantum foam (QFoam).<br>
		- Added 3 upgrade rows in QFoam.<br>
		- Added 2 buyables in QFoam.<br>
		- Added Achievements + some achs.<br>
		- No endgame yet. (I barely started on this mod)<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("QFoam", 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = upgradeEffect("QFoam", 11)

	// If player has "Gather More" and "'Gather More' and smarter"
	if (hasUpgrade("QFoam", 16) && hasUpgrade("QFoam", 14))
		gain = gain.add(upgradeEffect("QFoam", 14))

	
	if (hasUpgrade("QFoam", 22))
		gain = gain.add(upgradeEffect("QFoam", 22))

	// End of base gain
	// Anything after this comment should not be considered a 'base gain' boost

	if (hasUpgrade("QFoam", 12))
		gain = gain.mul(upgradeEffect("QFoam", 12))
	if (hasUpgrade("QFoam", 13))
		gain = gain.mul(upgradeEffect("QFoam", 13))
	
	// If player only has "Gather More"
	if (!hasUpgrade("QFoam", 16) && hasUpgrade("QFoam", 14))
		gain = gain.add(upgradeEffect("QFoam", 14))
	
	if (hasUpgrade("QFoam", 15))
		gain = gain.mul(upgradeEffect("QFoam", 15))

	if (hasUpgrade("QFoam", 23))
		gain = gain.mul(upgradeEffect("QFoam", 23))
	if (hasUpgrade("QFoam", 24))
		gain = gain.mul(upgradeEffect("QFoam", 24))
	if (hasUpgrade("QFoam", 26))
		gain = gain.mul(upgradeEffect("QFoam", 26))
	
	
	gain = gain.mul(buyableEffect("QFoam", 11))

	if (hasUpgrade("QFoam", 33))
		gain = gain.pow(upgradeEffect("QFoam", 33))
	

	

	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}