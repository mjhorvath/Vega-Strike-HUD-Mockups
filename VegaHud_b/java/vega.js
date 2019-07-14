var vdu_lbl =
[
	[],
	['comm','invt','info'],
	['shld','powr','targ'],
	['comb','repr','hngr'],
	['chrt','sens','cmra'],
	['comm_lrg','invt_lrg','info_lrg']
]

var vdu_sel =
[
	[],
	[2,2,2,	0,0],
	[0,0,2,	2,2],
	[2,2,2,	0,0],
	[3,2,1,	1,1],
	[2,2,2,	0,0]
]

var sub_dsp = [0, 0, 1, 0]

var grp_sel = 2
var vdu_lvl = 0
var pop_on = 0
var zoom_lvl = 0
var bars_lvl = 0
var hud_lvl = 1
var bkg_on = 1
var brd_on = 0
var zom_off = 0

function pnl_sw(num)
{
	var vdu_num = num.charAt(0)
	var new_num = num.charAt(2)
	var cur_num = vdu_sel[vdu_num][3]
	var old_num = vdu_sel[vdu_num][4]
	var new_lbl = vdu_lbl[vdu_num][new_num]
	var old_lbl = vdu_lbl[vdu_num][old_num]
	var pnl_num
	if (vdu_num == 5)
		pnl_num = 1
	else
		pnl_num = vdu_num
	if ((new_num != old_num) || (vdu_lvl == 1))
	{
		document.getElementById(old_lbl).style.display = 'none'
		document.getElementById('pnl_' + pnl_num + '_' + cur_num).className = 'but_lrg_off'
		document.getElementById(new_lbl).style.display = 'block'
		document.getElementById('pnl_' + pnl_num + '_' + new_num).className = 'but_lrg_on'
	}
	else if (document.getElementById(new_lbl).style.display == 'block')
	{
		document.getElementById(new_lbl).style.display = 'none'
		document.getElementById('pnl_' + pnl_num + '_' + new_num).className = 'but_lrg_off'
	}
	else
	{
		document.getElementById(new_lbl).style.display = 'block'
		document.getElementById('pnl_' + pnl_num + '_' + new_num).className = 'but_lrg_on'
	}
	if (vdu_num == 1)
		vdu_sel[5][3] = new_num
	else if (vdu_num == 5)
		vdu_sel[1][3] = new_num
	vdu_sel[vdu_num][3] = new_num
	vdu_sel[vdu_num][4] = new_num
	vdu_lvl = 0
}

function max_sw(num)
{
	document.getElementById('vdu_1').style.display = 'none'
	document.getElementById('vdu_5').style.display = 'block'
	vdu_lvl = 1
}

function min_sw(num)
{
	document.getElementById('vdu_5').style.display = 'none'
	document.getElementById('vdu_1').style.display = 'block'
	vdu_lvl = 1
}

function but_dn(txt)
{
	var but_ele = document.getElementById(txt)
	var but_cla = but_ele.className
	var cla_pre = but_cla.substring(0, but_cla.lastIndexOf('_'))
	var cla_suf = but_cla.substring(but_cla.lastIndexOf('_'), but_cla.length)
	if (cla_suf == '_off')
		but_ele.className = cla_pre + '_on'
}

function but_up(txt)
{
	var but_ele = document.getElementById(txt)
	var but_cla = but_ele.className
	var cla_pre = but_cla.substring(0, but_cla.lastIndexOf('_'))
	var cla_suf = but_cla.substring(but_cla.lastIndexOf('_'), but_cla.length)
	if (cla_suf == '_on')
		but_ele.className = cla_pre + '_off'
}

function but_sw(txt, tot, sta)
{
	var but_ele = document.getElementById(txt)
	var but_cla = but_ele.className
	var cla_pre = but_cla.substring(0, but_cla.lastIndexOf('_'))
	var cla_suf = but_cla.substring(but_cla.lastIndexOf('_'), but_cla.length)
	var id_pre = txt.substring(0, eval(txt.lastIndexOf('_') + 1))
	var id_suf = txt.substring(eval(txt.lastIndexOf('_') + 1), txt.length)
	for (var i = sta, n = eval(sta + tot); i < n; i ++)
	{
//		if (i != id_suf)
//		{
			but_sib = document.getElementById(id_pre + i)
			var sib_cla = but_sib.className
			but_sib.className = sib_cla.substring(0, sib_cla.lastIndexOf('_')) + '_off'
//		}
	}
}

function but_tg(txt)
{
	var but_ele = document.getElementById(txt)
	var but_cla = but_ele.className
	var but_pre = but_cla.substring(0, but_cla.lastIndexOf('_'))
	var but_suf = but_cla.substring(but_cla.lastIndexOf('_'), but_cla.length)
	if (but_suf == '_off')
		but_ele.className = but_pre + '_on'
	if (but_suf == '_on')
		but_ele.className = but_pre + '_off'
}

function box_sw(txt, tot, sta)
{
	var box_pre = txt.substring(0, eval(txt.lastIndexOf('_') + 1))
	var box_suf = txt.substring(eval(txt.lastIndexOf('_') + 1), txt.length)
	for (var i = sta, n = eval(sta + tot); i < n; i ++)
	{
		if (i != box_suf)
		{
			box_ele = document.getElementById(box_pre + i + '_box')
			box_ele.style.display = 'none'
		}
	}
	document.getElementById(txt + '_box').style.display = 'block'
}

function zoom_in()
{
	document.getElementById('zoom_' + zoom_lvl).style.display = 'none'
	if (zoom_lvl < 3)
		zoom_lvl = zoom_lvl + 1
	else
		zoom_lvl = 0
	document.getElementById('zoom_' + zoom_lvl).style.display = 'block'
}

function zoom_out()
{
	document.getElementById('zoom_' + zoom_lvl).style.display = 'none'
	if (zoom_lvl > 0)
		zoom_lvl = zoom_lvl - 1
	else
		zoom_lvl = 3
	document.getElementById('zoom_' + zoom_lvl).style.display = 'block'
}

function bars_in()
{
	document.getElementById('bars_' + bars_lvl).style.display = 'none'
	if (bars_lvl < 2)
		bars_lvl = bars_lvl + 1
	else
		bars_lvl = 0
	document.getElementById('bars_' + bars_lvl).style.display = 'block'
}

function bars_out()
{
	document.getElementById('bars_' + bars_lvl).style.display = 'none'
	if (bars_lvl > 0)
		bars_lvl = bars_lvl - 1
	else
		bars_lvl = 2
	document.getElementById('bars_' + bars_lvl).style.display = 'block'
}

function hud_mode()
{
	if (hud_lvl == 1)
	{
		document.getElementById('vdu_0').style.display = 'none'
/*
		document.getElementById('shld_ctl').style.display = 'none'
		document.getElementById('powr_ctl').style.display = 'none'
		document.getElementById('targ_ctl').style.display = 'none'
		document.getElementById('comb_ctl').style.display = 'none'
		document.getElementById('repr_ctl').style.display = 'none'
		document.getElementById('hngr_ctl').style.display = 'none'
		document.getElementById('sens_ctl').style.display = 'none'
		document.getElementById('chrt_ctl').style.display = 'none'
		document.getElementById('cmra_ctl').style.display = 'none'
		document.getElementById('shld').style.background = 'transparent'
		document.getElementById('powr').style.background = 'transparent'
		document.getElementById('targ').style.background = 'transparent'
		document.getElementById('comb').style.background = 'transparent'
		document.getElementById('repr').style.background = 'transparent'
		document.getElementById('hngr').style.background = 'transparent'
		document.getElementById('sens').style.background = 'transparent'
		document.getElementById('chrt').style.background = 'transparent'
		document.getElementById('cmra').style.background = 'transparent'
*/
		hud_lvl = 2
	}
	else if (hud_lvl == 2)
	{
		document.getElementById('vdu_0').style.display = 'block'
/*
		document.getElementById('shld_ctl').style.display = 'block'
		document.getElementById('powr_ctl').style.display = 'block'
		document.getElementById('targ_ctl').style.display = 'block'
		document.getElementById('comb_ctl').style.display = 'block'
		document.getElementById('repr_ctl').style.display = 'block'
		document.getElementById('hngr_ctl').style.display = 'block'
		document.getElementById('sens_ctl').style.display = 'block'
		document.getElementById('chrt_ctl').style.display = 'block'
		document.getElementById('cmra_ctl').style.display = 'block'
		document.getElementById('shld').style.background = 'url(vdu_shld_.png)'
		document.getElementById('powr').style.background = 'url(vdu_powr_.png)'
		document.getElementById('targ').style.background = 'url(vdu_targ_.png)'
		document.getElementById('comb').style.background = 'url(vdu_comb_.png)'
		document.getElementById('repr').style.background = 'url(vdu_repr_.png)'
		document.getElementById('hngr').style.background = 'url(vdu_hngr_.png)'
		document.getElementById('sens').style.background = 'url(vdu_sens_.png)'
		document.getElementById('chrt').style.background = 'url(vdu_chrt_.png)'
		document.getElementById('cmra').style.background = 'url(vdu_cmra_.png)'
*/
		hud_lvl = 1
	}
}

function pop_up()
{
	var pop_vdu = document.getElementById('vdu_6')
	if (pop_on == 0)
	{
		pop_vdu.style.display = 'block'
		pop_on = 1
	}
	else
	{
		pop_vdu.style.display = 'none'
		pop_on = 0
	}
}

function bkg_off()
{
	var bkg_ele = document.getElementById('body_0')
	if (document.styleSheets[0].rules !== undefined)
		var sty_ele = window.document.styleSheets[0].rules
	if (bkg_on == 1)
	{
		bkg_ele.style.background = '#000000 url(./VegaImages2/_radial.jpg)'
		bkg_on = 2
	}
	else if (bkg_on == 2)
	{
		bkg_ele.style.background = '#ff00ff'
		for (var i = 0, n = sty_ele.length; i < n; i ++)
		{
			var this_elem = sty_ele[i]
			if (this_elem.selectorText == '.vdu_off')
			{
				this_elem.style.filter = 'alpha(opacity=100)'
				this_elem.style.margin = '0'
			}
		}
		bkg_on = 0
	}
	else
	{
		bkg_ele.style.background = '#000000 url(./VegaImages2/vegastrike040_013.jpg)'
		for (var i = 0, n = sty_ele.length; i < n; i ++)
		{
			var this_elem = sty_ele[i]
			if (this_elem.selectorText == '.vdu_off')
			{
				this_elem.style.filter = 'alpha(opacity=50)'
				this_elem.style.margin = ''
			}
		}
		bkg_on = 1
	}
}

function brd_off()
{
	if (document.styleSheets[0].rules !== undefined)
		var sty_ele = window.document.styleSheets[0].rules
	if (brd_on == 0)
	{
		for (var i = 0, n = sty_ele.length; i < n; i ++)
		{
			if (sty_ele[i].selectorText == 'DIV')
				sty_ele[i].style.border = 'solid 1px #ffffff'
		}
		brd_on = 1
	}
	else
	{
		for (var i = 0, n = sty_ele.length; i < n; i ++)
		{
			if (sty_ele[i].selectorText == 'DIV')
				sty_ele[i].style.border = ''
		}
		brd_on = 0
	}
}

function sub_on(num)
{
	var sub_ele = document.getElementById('txt_sub_' + num)
	if (sub_dsp[num] == 0)
	{
		sub_ele.style.display = 'block'
		sub_dsp[num] = 1
	}
	else
	{
		sub_ele.style.display = 'none'
		sub_dsp[num] = 0
	}
}

function zom_on()
{
	var zom_ele = document.getElementById('cmra_0')
	var zom_tar = document.getElementById('zom_frm')
	if (zom_ele.className == 'but_vrt_on')
		zom_tar.style.display = 'block'
	else
		zom_tar.style.display = 'none'
}

//------------------ Events --------------------------------

function getElementByEvent(e)
{
	if (!e) ev = window.event
	else ev = e
	var el = (ev.target) ? ev.target : ev.srcElement
	return el
}

document.onmouseover = function(e)
{
	var el = getElementByEvent(e)
	switch (el.className)
	{
		case 'cll_off' :
			el.style.background = '#008000'
//			document.getElementById(el.id + '_arw').style.display = 'block'
//			el.className = 'cll_on'
		break
		case 'cll_on' :
			el.style.background = '#008000'
		break
	}
}

document.onmouseout = function(e)
{
	var el = getElementByEvent(e)
	switch (el.className)
	{
		case 'cll_off' :
			el.style.background = 'transparent'
//			document.getElementById(el.id + '_arw').style.display = 'none'
		break
		case 'cll_on' :
			el.style.background = 'transparent'
//			document.getElementById(el.id + '_arw').style.display = 'none'
//			el.className = 'cll_off'
		break
	}
}

document.onclick = function(e)
{
//	var el = getElementByEvent(e)
}
