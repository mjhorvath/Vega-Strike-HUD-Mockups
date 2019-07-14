// Probably should require that a VDU be enabled before making a selection. This will definately be the case for keyboard input. However, I don't think this should be required when using a mouse.
// Should make it so that the first selection within each tab is highlighted by default. (keyboard input only?)
// Still need to show current date & time, location, and FPS.
// Need to code the actions.
// Need to figure out the order of actions for VDU 2, and whether they're done correctly.
// Note: the 'display' property of a container is inherited. Should test this further.
// Note: filter opacity is cumulative in Mozilla, but not in IE. By moving the individual panes outside the VDUs, the behavior will be the same in both programs.

//------------------------------------------------------------------------------Global Variables

// numerical
var hudMode = 1, tcMode = 1, chatMode = 0, currentVdu = null, vduTotal = 7, grpTotal = 10
var isIE = document.all ? 1 : 0
//alert('Tested in Firefox 3.1.')
//alert('Tested in Internet Explorer 8.')

//------------------------------------------------------------------------------Global Arrays

// sets the state of a VDU to either off (0) or on (1)
var vduState = [0,1,0,0,0,0,0]

// sets the state of a VDU tab to either off (0), on (1) or active (2)
var tabState =
[
	[],
	[],
	[0,1,0,0],
	[0,1,0,0],
	[0,1,0,0],
	[0,1,0,0],
	[0,1,0,0]
]

// sets the state of the 'Group' hotkeys to either off (0) or on (1)
var grpState = [0,0,1,0,0,0,0,0,0,0]

// areas of the screen that the VDUs occupy
var vduArea =
[
	// left, top, width, height
	[],
	[],				// entire screen area (dimensions need not be specified]
	[16, 0, 904, 168],
	[16, 556, 196, 196],
	[812, 556, 196, 196],
	[16, 200, 196, 280],
	[812, 200, 196, 280]
]


//------------------------------------------------------------------------------Global Events

function getElementByEvent(e)
{
	if (!e) var ev = window.event
	else var ev = e
	var el = (ev.target) ? ev.target : ev.srcElement
	return [ev,el]
}

/*
document.onmouseover = function (e)
{
	if (!hudMode)
	{
		var el = getElementByEvent(e)[1]
		if (el.parentNode.nodeName != '#document')
		{
			if (el.parentNode.className == 'sel' || el.parentNode.className == 'act')
			{
				el.parentNode.style.background = '#808080'
			}
		}
	}
}

document.onmouseout = function (e)
{
	if (!hudMode)
	{
		var el = getElementByEvent(e)[1]
		if (el.parentNode.nodeName != '#document')
		{
			if (el.parentNode.className == 'sel' || el.parentNode.className == 'act')
			{
				el.parentNode.style.background = 'transparent'
			}
		}
	}
}
*/

document.onclick = function (e)
{
	if (hudMode == 1)
		vduToggle(getElementByEvent(e)[0])
}


//------------------------------------------------------------------------------Local Events

function movr_sel(vduType,vduNumber,tabNumber,selNumber)
{
	var vduObject = document.getElementById('vdu_' + vduNumber)
	if (vduObject.className == 'vdu_on')
		document.getElementById(vduType + '_' + vduNumber + '_' + tabNumber + '_' + selNumber).style.background = '#808080'
}

function mout_sel(vduType,vduNumber,tabNumber,selNumber)
{
	var vduObject = document.getElementById('vdu_' + vduNumber)
	if (vduObject.className == 'vdu_on')
		document.getElementById(vduType + '_' + vduNumber + '_' + tabNumber + '_' + selNumber).style.background = 'transparent'
}

function mclk_sel(vduType,vduNumber,tabNumber,selNumber)
{
	var panObject = document.getElementById('pan_' + vduNumber + '_' + tabNumber)
	var actObject = document.getElementById('act_' + vduNumber + '_' + tabNumber)
	// switch between action/selection dialogs where appropriate
	if (vduType == 'pan')
	{
		panObject.style.display = 'none'
		actObject.style.display = 'block'
		tabState[vduNumber][tabNumber] = 2
	}
	else if (vduType == 'act')
	{
		panObject.style.display = 'block'
		actObject.style.display = 'none'
		tabState[vduNumber][tabNumber] = 1
	}
}

// initialize the HUD on load using the default settings
function HUD_init()
{
	for (var i = 1; i < vduTotal; i ++)
	{
		var vduState_i = vduState[i]
		var tabState_i = tabState[i]
		if (vduState_i == 0)
			document.getElementById('vdu_' + i).className = 'vdu_off'
		else
		{
			document.getElementById('vdu_' + i).className = 'vdu_on'
			currentVdu = i
		}
		for (var j = 0, n = tabState_i.length; j < n; j ++)
		{
			var tabState_i_j = tabState_i[j]
			var tabObject = document.getElementById('tab_' + i + '_' + j)
			var panObject = document.getElementById('pan_' + i + '_' + j)
			var actObject = document.getElementById('act_' + i + '_' + j)
			var vduObject = document.getElementById('vdu_' + i + '_bot')
			if (tabState_i_j == 0)
			{
				if (tabObject && j == 0) tabObject.className = 'but_clo_off'
				if (tabObject && j != 0) tabObject.className = 'but_tab_off'
				if (panObject) panObject.style.display = 'none'
				if (actObject) actObject.style.display = 'none'
			}
			if (tabState_i_j == 1)
			{
				if (tabObject && j == 0) tabObject.className = 'but_clo_on'
				if (tabObject && j != 0) tabObject.className = 'but_tab_on'
				if (panObject) panObject.style.display = 'block'
				if (actObject) actObject.style.display = 'none'
				if (vduObject && j == 0) vduObject.style.display == 'none'
				if (vduObject && j != 0) vduObject.style.display == 'block'
			}
			if (tabState_i_j == 2)
			{
				if (tabObject && j == 0) tabObject.className = 'but_clo_on'
				if (tabObject && j != 0) tabObject.className = 'but_tab_on'
				if (panObject) panObject.style.display = 'none'
				if (actObject) actObject.style.display = 'block'
				if (vduObject && j == 0) vduObject.style.display == 'none'
				if (vduObject && j != 0) vduObject.style.display == 'block'
			}
		}
	}
	document.getElementById('chat_fld').style.display = 'none'
	var butObject = document.getElementById('but_tc')
	switch (tcMode)
	{
		case 1:
			butObject.className = 'but_tab_off'
		break
		case 2:
			butObject.className = 'but_tab_on'
		break
		case 4:
			butObject.className = 'but_tab_on'
		break
		case 8:
			butObject.className = 'but_tab_on'
		break
	}
	butObject.innerHTML = 'TC: x' + tcMode
	var butObject = document.getElementById('but_hud')
	switch (hudMode)
	{
		case 1:
			butObject.className = 'but_tab_on'
		break
		case 2:
			butObject.className = 'but_tab_off'
		break
		case 3:
			butObject.className = 'but_tab_off'
		break
	}
	butObject.innerHTML = 'HUD: ' + hudMode
}

// VDU switching
function vduToggle(ev)
{
	var pass = false
	var oldVdu = currentVdu
	var coo_lft = ev.pageX
	var coo_top = ev.pageY
	// buggy in strict mode IE8
	if (isIE)
	{
		var body_elem = document.getElementsByTagName('body')[0]
		coo_lft = ev.clientX + body_elem.scrollLeft
		coo_top = ev.clientY + body_elem.scrollTop
	}
	// start with VDU 2 and check to see if current mouse position lies within areas designated by the 'vduArea' table. areas must not overlap.
	// VDU 0 is a special case: it always retains focus.
	for (var i = 2; i < vduTotal; i ++)
	{
		var vduArea_i = vduArea[i]
		if ((coo_lft >= vduArea_i[0]) && (coo_lft <= vduArea_i[0] + vduArea_i[2]) && (coo_top >= vduArea_i[1]) && (coo_top <= vduArea_i[1] + vduArea_i[3]) && (document.getElementById('vdu_' + i + '_bot').style.display != 'none') && (document.getElementById('vdu_' + i + '_top').style.display != 'none'))
		{
			pass = true
			currentVdu = i
			vduState[i] = 1
		}
		else
			vduState[i] = 0
	}
	// VDU 1 is also a special case: it is given focus when a user clicks in none of the other areas.
	if (pass)
		vduState[1] = 0
	else
	{
		currentVdu = 1
		vduState[1] = 1
	}

	if (currentVdu != oldVdu)
	{
		// dim the old VDU and highlight the new one
		document.getElementById('vdu_' + oldVdu).className = 'vdu_off'
		document.getElementById('vdu_' + currentVdu).className = 'vdu_on'
		// turn off all action dialogs
		for (var i = 0; i < vduTotal; i ++)
		{
			var tabState_i = tabState[i]
			for (var j = 0, o = tabState_i.length; j < o; j ++)
			{
				if (tabState_i[j] == 2)
				{
					var panObject = document.getElementById('pan_' + i + '_' + j)
					var actObject = document.getElementById('act_' + i + '_' + j)
					tabState_i[j] = 1
					panObject.style.display = 'block'
					actObject.style.display = 'none'
				}
			}
		}
	}
}

// tab switching
function tabToggle(vduNumber, tabNumber)
{
	for (var j = 0, o = tabState[vduNumber].length; j < o; j ++)
	{
		var tabObject = document.getElementById('tab_' + vduNumber + '_' + j)
		var panObject = document.getElementById('pan_' + vduNumber + '_' + j)
		var actObject = document.getElementById('act_' + vduNumber + '_' + j)
		var vduObject = document.getElementById('vdu_' + vduNumber + '_bot')
		var oldValue = tabState[vduNumber][j]
		if (j == tabNumber && oldValue != 1)
		{
			if (j == 0)
			{
				if (tabObject) tabObject.className = 'but_clo_on'
				if (vduObject.style.display != 'none') vduObject.style.display = 'none'
			}
			else
			{
				if (tabObject) tabObject.className = 'but_tab_on'
				if (vduObject.style.display != 'block') vduObject.style.display = 'block'
			}
			if (panObject) panObject.style.display = 'block'
			if (actObject && oldValue == 2) actObject.style.display = 'none'
			tabState[vduNumber][j] = 1
		}
		else if (j != tabNumber && oldValue != 0)
		{
			if (tabObject)
			{
				if (j == 0)
					tabObject.className = 'but_clo_off'
				else
					tabObject.className = 'but_tab_off'
			}
			if (panObject) panObject.style.display = 'none'
			if (actObject && oldValue == 2) actObject.style.display = 'none'
			tabState[vduNumber][j] = 0
		}
	}
}

// generic button
function butToggle(butId)
{
	if (hudMode == 1)
	{
		var butObject = document.getElementById(butId)
		switch (butObject.className)
		{
			case 'but_tab_off':
				butObject.className = 'but_tab_on'
			break
			case 'but_tab_on':
				butObject.className = 'but_tab_off'
			break
/*
			case 'but_clr_off':
				butObject.className = 'but_clr_on'
			break
			case 'but_clr_on':
				butObject.className = 'but_clr_off'
			break
*/
		}
	}
}

// Chat button
function chatToggle(butId)
{
	if (hudMode == 1)
	{
		var butObject = document.getElementById(butId)
		if (chatMode == 0)
		{
			butObject.className = 'but_tab_on'
			document.getElementById('chat_fld').style.display = 'block'
			chatMode = 1
		}
		else
		{
			butObject.className = 'but_tab_off'
			document.getElementById('chat_fld').style.display = 'none'
			chatMode = 0
		}
	}
}

// Time Compression button
function tcToggle(butId)
{
	if (hudMode == 1)
	{
		var butObject = document.getElementById(butId)
		switch (tcMode)
		{
			case 1:
				butObject.className = 'but_tab_on'
				tcMode = 2
			break
			case 2:
				tcMode = 4
			break
			case 4:
				tcMode = 8
			break
			case 8:
				butObject.className = 'but_tab_off'
				tcMode = 1
			break
		}
		butObject.innerHTML = 'TC: x' + tcMode
	}
}

// HUD Mode button
function hudToggle(butId)
{
	var butObject = document.getElementById(butId)
	switch (hudMode)
	{
		case 1:
			vduForceState()
			for (var i = 2; i < vduTotal; i ++)
			{
				var vduTop = document.getElementById('vdu_' + i + '_top')
				var vduBot = document.getElementById('vdu_' + i + '_bot')
				vduTop.style.display = 'none'
				vduBot.className = 'vdu_' + i + '_bnk'
				document.getElementById('div_hid').style.display = 'none'
			}
			butObject.className = 'but_tab_off'
			hudMode = 2
		break
		case 2:
			for (var i = 2; i < vduTotal; i ++)
			{
				var vduObject = document.getElementById('vdu_' + i)
				vduObject.style.display = 'none'
			}
			hudMode = 3
		break
		case 3:
			for (var i = 2; i < vduTotal; i ++)
			{
				var vduTop = document.getElementById('vdu_' + i + '_top')
				var vduBot = document.getElementById('vdu_' + i + '_bot')
				var vduObject = document.getElementById('vdu_' + i)
				vduTop.style.display = 'block'
				vduBot.className = 'vdu_' + i
				vduObject.style.display = 'block'
			}
			document.getElementById('div_hid').style.display = 'block'
			butObject.className = 'but_tab_on'
			hudMode = 1
		break
	}
	butObject.innerHTML = 'HUD: ' + hudMode
}

// Group buttons
function grpToggle(grpNumber)
{
	if (hudMode == 1)
	{
		for (var i = 1; i < grpTotal; i ++)
		{
			var grpObject = document.getElementById('but_grp_' + i)
			if (i == grpNumber && grpState[i] == 0)
			{
				switch (grpObject.className)
				{
					case 'but_tab_off':
						grpObject.className = 'but_tab_on'
					break
					case 'but_clr_off':
						grpObject.className = 'but_clr_on'
					break
				}
				grpState[i] = 1
			}
			else if (i != grpNumber && grpState[i] == 1)
			{
				switch (grpObject.className)
				{
					case 'but_tab_on':
						grpObject.className = 'but_tab_off'
					break
					case 'but_clr_on':
						grpObject.className = 'but_clr_off'
					break
				}
				grpState[i] = 0
			}
		}
	}
}

// forces the focus to switch to VDU 1
function vduForceState()
{
	for (var i = 1; i < vduTotal; i ++)
	{
		var vduObject = document.getElementById('vdu_' + i)
		if (i == 1 && vduState[i] == 0)
		{
			vduObject.className = 'vdu_on'
			vduState[i] = 1
		}
		else if (i != 1 && vduState[i] == 1)
		{
			vduObject.className = 'vdu_off'
			vduState[i] = 0
		}
	}
}
