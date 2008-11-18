var reasyHouseDivName = 'reasyHouseTextDiv';
var reasyOpaqueBGName = 'reasyOpaqueBG';
var sFirefox = "Firefox";
var firefox_pos = navigator.userAgent.indexOf("Firefox");
firefox_pos += sFirefox.length + 1;
var ver_string = navigator.userAgent.substring(firefox_pos).split(' ')[0];
var major_ver = parseInt(ver_string);
var reasyKeyFn = reasySelect;
//FirebugContext.window.console.log("Firefox ver ->", ver_string, major_ver);

function XY(x, y)
{
	this.x = x;
	this.y = y;
}

XY.prototype.getX = function()
{
	return this.x;
}

XY.prototype.getY = function()
{
	return this.y;
}

XY.prototype.change = function(x, y)
{
	this.x = x;
	this.y = y;
}

XY.prototype.diff_coords = function(x, y)
{
	return this.x != x || this.y != y;
}

function setOrReplaceNode(nodeName, node)
{
	// replace the old div or add the div to the document
	var oldNode = content.document.getElementById(nodeName);
	if (oldNode)
	{
		var result = content.document.body.replaceChild(node, oldNode);
		if (null == result)
		{
			content.document.body.appendChild(node);
		}
	}
	else
		content.document.body.appendChild(node);
}

function reasyClose(evt, div)
{
	var reasyDiv = content.document.getElementById(reasyHouseDivName);
	if (reasyDiv)
		content.document.body.removeChild(reasyDiv);

	var bg = content.document.getElementById(reasyOpaqueBGName);
	if (bg)
		content.document.body.removeChild(bg);

	var sel = content.window.getSelection();
	if (sel && sel.removeAllRanges)
		sel.removeAllRanges();

	reasyKeyFn = reasySelect;
		
	if (div)
		reasyMouseUp(evt, div);
}

function reasyMoveFunction(evt, div, old_x, old_y)
{
	var ntop = (parseInt(div.style.top) + evt.clientY - old_y);
	var nleft = (parseInt(div.style.left) + evt.clientX - old_x);
	div.style.top = ntop + 'px';
	div.style.left = nleft + 'px';
	reasy_db.setTop(ntop);
	reasy_db.setLeft(nleft);
}

function reasySizeLeft(evt, div, old_x, old_y)
{
	var diff = evt.clientX - old_x;
	var nleft = parseInt(div.style.left) + diff;
	var nwidth = parseInt(div.style.width) - diff;
	div.style.left = nleft + 'px';
	div.style.width = nwidth + 'px';
	reasy_db.setLeft(nleft);
	reasy_db.setWidth(nwidth);
}

function reasySizeRight(evt, div, old_x, old_y)
{
	var diff = evt.clientX - old_x;
	var nwidth = parseInt(div.style.width) + diff;
	div.style.width = nwidth + 'px';
	reasy_db.setWidth(nwidth);
}

function reasySizeTop(evt, div, old_x, old_y)
{
	var diff = evt.clientY - old_y;
	var ntop = parseInt(div.style.top) + diff;
	var nheight = parseInt(div.style.height) - diff;
	div.style.top = ntop + 'px';
	div.style.height = nheight + 'px';
	reasy_db.setTop(ntop);
	reasy_db.setHeight(nheight);
}

function reasySizeBottom(evt, div, old_x, old_y)
{
	var diff = evt.clientY - old_y;
	var nheight = parseInt(div.style.height) + diff;
	div.style.height = nheight + 'px';
	reasy_db.setHeight(nheight);
}

function reasyMouseMove(evt, myXY, div, move_fn)
{
	var nx = evt.clientX;
	var ny = evt.clientY;
	if (myXY.diff_coords(nx, ny))
	{
		if (move_fn)
			move_fn(evt, div, myXY.getX(), myXY.getY());
		myXY.change(nx, ny);
	}
}

function reasyMouseUp(evt, div)
{
	div.style.cursor = 'default';
	content.document.removeEventListener("mousemove"
		, div.onmousemove
		, false);
	content.document.removeEventListener("mouseup"
		, div.onmouseup
		, false);
	div.onmousemove = null;
}

function reasyHouseClicked(evt, div)
{
	var x = evt.clientX;
	var y = evt.clientY;
	var x_diff = x - parseInt(div.style.left);
	var y_diff = y - parseInt(div.style.top);
	var fn = reasyMoveFunction;
	if (x_diff < 10)
		fn = reasySizeLeft;
	else if (x_diff >= (parseInt(div.style.width) - 10))
		fn = reasySizeRight;
	else if (y_diff < 10)
		fn = reasySizeTop;
	else if (y_diff >= (parseInt(div.style.height) - 10))
		fn = reasySizeBottom;

	if (fn == reasyMoveFunction)
		div.style.cursor = 'move';
	myXY = new XY(x, y);
	div.onmousemove = function(newevt){reasyMouseMove(newevt, myXY, div, fn);};

	content.document.addEventListener("mousemove"
		, div.onmousemove
		, false);
	content.document.addEventListener("mouseup"
		, div.onmouseup
		, false);
}

function reasyMouseOver(evt, div)
{
	var x = evt.clientX;
	var y = evt.clientY;
	var x_diff = x - parseInt(div.style.left);
	var y_diff = y - parseInt(div.style.top);
	if (x_diff < 10 || x_diff >= (parseInt(div.style.width) - 10))
	{
		//near edges
		div.style.cursor = 'e-resize';
	}
	else if (y_diff < 10 || y_diff >= (parseInt(div.style.height) - 10))
	{
		//near edges
		div.style.cursor = 'n-resize';
	}
	else if (!div.onmousemove)
	{
		div.style.cursor = 'default';
	}
}

function reasyTextClicked(reasyReader)
{
	if (reasyReader)
	{
		reasyReader.playPause();
	}	
}

function reasyIncWPM(reasyWPMText)
{
	reasy_db.incWpm();
	reasyWPMText.nodeValue = reasy_db.wpm();
}

function reasyDecWPM(reasyWPMText)
{
	reasy_db.decWpm();
	reasyWPMText.nodeValue = reasy_db.wpm();
}

function reasyIncFixation(reasyFixationText)
{
	reasy_db.incFix();
	reasyFixationText.nodeValue = reasy_db.fixation();
}

function reasyDecFixation(reasyFixationText)
{
	reasy_db.decFix();
	reasyFixationText.nodeValue = reasy_db.fixation();
}

function createReasyDom(doc, reasySplit)
{
	//make reasy housing div
	var reasyHouseDiv = doc.createElement('div');
	reasyHouseDiv.setAttribute('id', reasyHouseDivName);
	reasyHouseDiv.style.position = 'fixed';

	var db_top = reasy_db.top();
	if (db_top < -5000)
		db_top = doc.height/5;
	reasyHouseDiv.style.top = db_top + 'px';
	var db_left = reasy_db.left();
	if (db_left < -5000)
		db_left = doc.width/5;
	reasyHouseDiv.style.left = db_left + 'px';
	var db_height = reasy_db.height();
	if (db_height < -5000)
		db_height = db_top*3;
	reasyHouseDiv.style.height = db_height + 'px';
	var db_width = reasy_db.width();
	if (db_width < -5000)
		db_width = db_left*3;
	reasyHouseDiv.style.width = db_width + 'px';
	reasyHouseDiv.style.zIndex = 10;
	reasy_db.bkgColor(reasyHouseDiv);
	reasy_db.txtColor(reasyHouseDiv);
	
	var menuDiv = doc.createElement('div');
	menuDiv.style.fontSize = '16px';
	menuDiv.style.fontFamily = 'Verdana';
	menuDiv.style.color = 'silver';
	menuDiv.style.padding = '10px';
	reasyHouseDiv.appendChild(menuDiv);

	var background_opacity = reasy_db.dim_background();
	if (0 == background_opacity)
	{
		// create menu/close button div
		var closeButton = doc.createElement('button');
		closeButton.onmouseup = function(evt){reasyClose(evt, reasyHouseDiv);};
		closeButton.style.cursor = 'default';
		closeButton.appendChild(doc.createTextNode('x'));
		closeButton.style.width = '20px';
		closeButton.style.height = '20px';
		closeButton.style.cssFloat = 'left';
		closeButton.style.fontWeight = 'bold';
		closeButton.style.borderStyle = 'none';
		menuDiv.appendChild(closeButton);
	}
	else
	{
		//cover background with opaque overlay
		var opaque_bg = doc.createElement('div');
		opaque_bg.onmouseup = function(evt){reasyClose(evt, reasyHouseDiv);};
		opaque_bg.style.width = '100%';
		opaque_bg.style.height = '100%';
		opaque_bg.style.position = 'fixed';
		opaque_bg.style.top = '0px';
		opaque_bg.style.left = '0px';
		opaque_bg.style.opacity = parseFloat(background_opacity)/100.0;
		opaque_bg.style.zIndex = 9;
		reasy_db.bkgColor(opaque_bg);
		opaque_bg.setAttribute('id', reasyOpaqueBGName);
		setOrReplaceNode(reasyOpaqueBGName, opaque_bg);
	}

	// make settings text div
	var settingsDiv = doc.createElement('div');
	settingsDiv.style.color = 'white';
	settingsDiv.style.fontSize = '16px';
	settingsDiv.style.fontWeight = 'bold';
	settingsDiv.style.fontFamily = 'Tahoma';

	//wpm
	var wpmDiv = doc.createElement('div');
	var reasyWPMText = doc.createTextNode(reasy_db.wpm());
	{
		var incWpmDiv = doc.createElement('div');
		incWpmDiv.onmousedown = function(){reasyIncWPM(reasyWPMText);}
		incWpmDiv.appendChild(doc.createTextNode('+'));
		incWpmDiv.style.cursor = 'default';
		wpmDiv.appendChild(incWpmDiv);
	}
	
	wpmDiv.appendChild(reasyWPMText);
	wpmDiv.style.padding = '10px';

	var decWpmDiv = doc.createElement('div');
	decWpmDiv.onmousedown = function(){reasyDecWPM(reasyWPMText);}
	decWpmDiv.appendChild(doc.createTextNode('-'));
	decWpmDiv.style.cursor = 'default';
	wpmDiv.appendChild(decWpmDiv);
	settingsDiv.appendChild(wpmDiv)
	//fixation
	var reasyFixationText = doc.createTextNode(reasy_db.fixation());
	var fixationDiv = doc.createElement('div');

	var incFixationDiv = doc.createElement('div');
	incFixationDiv.onmousedown = function(){reasyIncFixation(reasyFixationText);}
	incFixationDiv.style.cursor = 'default';
	incFixationDiv.appendChild(doc.createTextNode('+'));
	fixationDiv.appendChild(incFixationDiv);

	fixationDiv.appendChild(reasyFixationText);
	fixationDiv.style.padding = '10px';
	
	var decFixationDiv = doc.createElement('div');
	decFixationDiv.onmousedown = function(){reasyDecFixation(reasyFixationText);}
	decFixationDiv.style.cursor = 'default';
	decFixationDiv.appendChild(doc.createTextNode('-'));
	fixationDiv.appendChild(decFixationDiv);
	settingsDiv.appendChild(fixationDiv);

	//add settings to reasy house
	reasyHouseDiv.appendChild(settingsDiv);

	// make reasy text div
	var reasyDiv = new Array();
	reasyDiv[0] = doc.createTextNode(' ');
	var pre_post_mode = reasy_db.pre_post();
	if (pre_post_mode)
	{
		reasyDiv[1] = doc.createTextNode(' ');
		reasyDiv[2] = doc.createTextNode(' ');
	}
	
	var reasyReader = new reasy_reader(reasySplit, reasyDiv, pre_post_mode);

	var paddingDiv = doc.createElement('div');
	paddingDiv.style.height = '38%';
	reasyHouseDiv.appendChild(paddingDiv);

	for (i=0;i<reasyDiv.length;i++)
	{
		var textDiv = doc.createElement('div');
		reasy_db.txtColor(textDiv);
		textDiv.style.clear = 'both';
		textDiv.style.cssFloat = 'left';
		textDiv.style.width = '100%';
		textDiv.style.fontSize = reasy_db.fontSize();
		textDiv.style.fontFamily = reasy_db.fontFamily();
		if (!pre_post_mode)
			textDiv.style.textAlign = 'center';
		else
		{
			textDiv.style.textAlign = 'left';
			textDiv.style.position = 'relative';
			if (reasy_db.live_ink())
				textDiv.style.left = db_left + 50*(i-1) + 'px';
			else
				textDiv.style.left = db_left - 50 + 'px';
		}
		textDiv.appendChild(reasyDiv[i]);
		textDiv.onmousedown = function(){reasyTextClicked(reasyReader);};
		textDiv.style.cursor = 'default';
		reasyHouseDiv.appendChild(textDiv);
	}

	reasyHouseDiv.onmousedown = function(evt){reasyHouseClicked(evt, reasyHouseDiv);};
	reasyHouseDiv.onmouseup = function(evt){reasyMouseUp(evt, reasyHouseDiv);};
	reasyHouseDiv.onmouseover = function(evt){reasyMouseOver(evt, reasyHouseDiv);};

	setOrReplaceNode(reasyHouseDivName, reasyHouseDiv);
	
	reasyKeyFn = function(){reasyTextClicked(reasyReader);};
	if (reasy_db.auto_play())
		reasyTextClicked(reasyReader);
}

function reasySelect()
{
	// get the text content if there is not an existing reasy session
	if (content && content.document && !content.document.getElementById(reasyHouseDivName))
	{
		var gotText = content.document.getSelection();
		if (major_ver > 2)
			gotText = gotText.toString();

		if (gotText)
		{
			var reasySplit = gotText.split(/[- \n]/);
			if (reasySplit && reasySplit.length >= reasy_db.minWords())
			{
				createReasyDom(document, reasySplit);
			}
		}
	}
}

function reasyKeyDown(evt)
{
	if (reasy_db.action_key().charCodeAt(0) == evt.which)
		reasyKeyFn();
}

function reasyWindowFocus(evt)
{
	if (reasy_db.auto_popup())
		content.document.addEventListener("mouseup", reasySelect, false);
	content.document.addEventListener("keydown", reasyKeyDown, false);
}

function reasyWindowUnload(evt)
{
	content.document.removeEventListener("mouseup", reasySelect, false);
	content.document.removeEventListener("keydown", reasyKeyDown, false);
}

window.addEventListener("focus", reasyWindowFocus, true);
window.addEventListener("unload", reasyWindowUnload, true);
