function hasUpgrade(layer, id) {
	return ((player[layer].upgrades.includes(toNumber(id)) || player[layer].upgrades.includes(id.toString())) && !tmp[layer].deactivated)
}

function hasMilestone(layer, id) {
	return ((player[layer].milestones.includes(toNumber(id)) || player[layer].milestones.includes(id.toString())) && !tmp[layer].deactivated)
}

function hasAchievement(layer, id) {
	return ((player[layer].achievements.includes(toNumber(id)) || player[layer].achievements.includes(id.toString())) && !tmp[layer].deactivated)
}

function hasChallenge(layer, id) {
	return ((player[layer].challenges[id]) && !tmp[layer].deactivated)
}

function maxedChallenge(layer, id) {
	return ((player[layer].challenges[id] >= tmp[layer].challenges[id].completionLimit) && !tmp[layer].deactivated)
}

function challengeCompletions(layer, id) {
	return (player[layer].challenges[id])
}

function getBuyableAmount(layer, id) {
	return (player[layer].buyables[id])
}

function setBuyableAmount(layer, id, amt) {
	player[layer].buyables[id] = amt
}

function addBuyables(layer, id, amt) {
	player[layer].buyables[id] = player[layer].buyables[id].add(amt)
}

function getClickableState(layer, id) {
	return (player[layer].clickables[id])
}

function setClickableState(layer, id, state) {
	player[layer].clickables[id] = state
}

function getGridData(layer, id) {
	return (player[layer].grid[id])
}

function setGridData(layer, id, data) {
	player[layer].grid[id] = data
}

function upgradeEffect(layer, id) {
	return (tmp[layer].upgrades[id].effect)
}

function challengeEffect(layer, id) {
	return (tmp[layer].challenges[id].rewardEffect)
}

function buyableEffect(layer, id) {
	return (tmp[layer].buyables[id].effect)
}

function clickableEffect(layer, id) {
	return (tmp[layer].clickables[id].effect)
}

function achievementEffect(layer, id) {
	return (tmp[layer].achievements[id].effect)
}

function gridEffect(layer, id) {
	return (gridRun(layer, 'getEffect', player[layer].grid[id], id))
}

// Custom additions
function ezEffectDisplay(layer, id, prefix = '', suffix = '') {
	return prefix + format(upgradeEffect(layer, id)) + suffix
}
function ezLayerEffectDisplay(layer, prefix = '', suffix = '') {
	return prefix + format(layers[layer].effect()) + suffix
}


function ezBuyableEffectDisplay(layer, id, prefix = '', suffix = '') {
	return "Currently: " + prefix + format(buyableEffect(layer, id)) + suffix
}


function ezBuyableCostDisplay(layer, id) {
	return "Next at: " + format(layers[layer].buyables[id].cost(getBuyableAmount(layer, id))) + " " + layers[layer].baseResource
}

function getUpgradeCount(layer) {
	return player[layer].upgrades.length
}

/**
 * Use it for tooltips since it returns an HTML Element
 * @param {string} layer 
 * @param {number} id 
 */
function getAffectedUpgrade(layer, id) {
	return (
		`Affecting:<h2>
		${layers[layer].upgrades[id].title}
		</h2></br>
		( upg ${layer}${id} )`
	)
}

// Defualt implementation of the gain per second for layers
function defaultGPS(layer) {
	return format(tmp[layer].resetGain.div(player[layer].resetTime))
}


// [NYI] A more accurate (and expensive) GPS implementation
function accurateGPS(layer) {
	return format(tmp[layer].resetGain.div(player[layer].resetTime))
}

// Easy access of an upgrade's data
function getUpgradeData(layer, id) {
	return layers[layer].upgrades[id]
}

/**
 * Honestly, why did I add Set notation in this mod...
 * @param {any[Formatable]} lower
 * @param {any[Formatable]} upper
 * @param {boolean} include_lower
 * @param {boolean} include_upper
 * 
*/
function displayDefiniteSet(lower, upper, include_lower = true, include_upper = true) {
	return `${include_lower ? '[': ']'}${format(lower)};${format(upper)}${include_upper ? ']': '['}`
}

function getLayerColor(layer) {
	return layers[layer].color
}