let modInfo = {
	name: "The ??? Tree",
	id: "mymod",
	author: "nobody",
	pointsName: "quantum fluctuations",
	modFiles: ["layers/layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

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