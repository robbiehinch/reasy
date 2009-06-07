function reasyDB()
{
  this.prefs = null;
  this.instance = null;
  this.readInterval = 60000/this.wpm();
}

reasyDB.prototype.db = function()
{
  if (null == this.prefs)
  {
    var compClass = Components.classes["@mozilla.org/preferences-service;1"];
    var svc = compClass.getService(Components.interfaces.nsIPrefService);
    this.prefs = svc.getBranch("extensions.reasy.");
  }
  return this.prefs;
}

reasyDB.prototype.chg = function(key, val)
{
  this.db().setIntPref(key, val);
}

reasyDB.prototype.inc = function(key, cur_val, amount)
{
  this.chg(key, cur_val + amount);
}

reasyDB.prototype.dec = function(key, cur_val, amount)
{
  if (cur_val > amount)
    this.chg(key, cur_val - amount);
}

reasyDB.prototype.minWords = function()
{
  return this.db().getIntPref("minWords");
}

reasyDB.prototype.setMinWords = function(val)
{
  return this.db().setIntPref("minWords", val > 10 ? val : 10);
}

reasyDB.prototype.fontSize = function()
{
  return this.db().getIntPref('font_size') + 'px';
}

reasyDB.prototype.setFontSize = function(val)
{
  return this.db().setIntPref('font_size', val);
}

reasyDB.prototype.fontFamily = function()
{
  return this.db().getCharPref('font_family');
}

reasyDB.prototype.setFontFamily = function(val)
{
  return this.db().setCharPref('font_family', val);
}

reasyDB.prototype.txtColor = function(div)
{
  div.style.color = this.db().getCharPref('txtcolor');
}

reasyDB.prototype.getTxtColor = function()
{
	return this.db().getCharPref('txtcolor');
}

reasyDB.prototype.setTxtColor = function(val)
{
	this.db().setCharPref('txtcolor', val);
}
reasyDB.prototype.bkgColor = function(div)
{
  div.style.backgroundColor = this.db().getCharPref('bgcolor');
}

reasyDB.prototype.getBkgColor = function()
{
  return this.db().getCharPref('bgcolor');
}

reasyDB.prototype.setBkgColor = function(val)
{
	this.db().setCharPref('bgcolor', val);
}

reasyDB.prototype.wpm = function()
{
  return this.db().getIntPref('wpm');
}

reasyDB.prototype.wpmChg = function()
{
  return this.db().getIntPref('wpmChg');
}

reasyDB.prototype.incWpm = function(div)
{
  this.inc('wpm', this.wpm(), this.wpmChg());
  var w = this.wpm();
  if (div)
  {
    div.nodeValue = w;
  }
  this.readInterval = 60000/w;
}

reasyDB.prototype.decWpm = function(div)
{
  this.dec('wpm', this.wpm(), this.wpmChg());
  var w = this.wpm();
  if (div)
  {
    div.nodeValue = w;
  }
  this.readInterval = 60000/w;
}

reasyDB.prototype.fixation = function()
{
  return this.db().getIntPref('fixation');
}

reasyDB.prototype.incFix = function(div)
{
  this.inc('fixation', this.fixation(), 1);
  if (div)
  {
    div.nodeValue = this.fixation();
  }
}

reasyDB.prototype.decFix = function(div)
{
  this.dec('fixation', this.fixation(), 1);
  if (div)
  {
    div.nodeValue = this.fixation();
  }
}

reasyDB.prototype.punc_pause = function()
{
  return this.db().getIntPref('punc_pause');
}

reasyDB.prototype.setPuncPause = function(val)
{
  return this.db().setIntPref('punc_pause', val);
}

reasyDB.prototype.skip_count = function()
{
  return this.db().getIntPref('skip_count');
}

reasyDB.prototype.setSkipCount = function(val)
{
  return this.db().setIntPref('skip_count', val);
}

reasyDB.prototype.auto_play = function()
{
	return this.db().getBoolPref('auto_play');
}

reasyDB.prototype.auto_play_invert = function()
{
	return this.db().setBoolPref('auto_play', !this.auto_play());
}

reasyDB.prototype.deselect_close = function()
{
	return this.db().getBoolPref('deselect_close');
}

reasyDB.prototype.deselect_close_invert = function()
{
	return this.db().setBoolPref('deselect_close', !this.deselect_close());
}

reasyDB.prototype.ticker_tape = function()
{
	return this.db().getBoolPref('ticker');
}

reasyDB.prototype.ticker_tape_invert = function()
{
	this.db().setBoolPref('ticker', !this.ticker_tape());
}

reasyDB.prototype.pre_post = function()
{
	return this.db().getBoolPref('pre_post');
}

reasyDB.prototype.pre_post_invert = function()
{
	this.db().setBoolPref('pre_post', !this.pre_post());
}

reasyDB.prototype.live_ink = function()
{
	return this.db().getBoolPref('live_ink');
}

reasyDB.prototype.live_ink_invert = function()
{
	this.db().setBoolPref('live_ink', !this.live_ink());
}

reasyDB.prototype.top = function()
{
	return this.db().getIntPref('top');
}

reasyDB.prototype.setTop = function(val)
{
	this.db().setIntPref('top', val);
}

reasyDB.prototype.height = function()
{
	return this.db().getIntPref('height');
}

reasyDB.prototype.setHeight = function(val)
{
	this.db().setIntPref('height', val);
}

reasyDB.prototype.left = function()
{
	return this.db().getIntPref('left');
}

reasyDB.prototype.setLeft = function(val)
{
	this.db().setIntPref('left', val);
}

reasyDB.prototype.width = function()
{
	return this.db().getIntPref('width');
}

reasyDB.prototype.setWidth = function(val)
{
	this.db().setIntPref('width', val);
}

reasyDB.prototype.auto_popup = function()
{
	return this.db().getBoolPref('auto_popup');
}

reasyDB.prototype.invert_auto_popup = function()
{
	this.db().setBoolPref('auto_popup', !this.auto_popup());
}

reasyDB.prototype.action_key = function()
{
	return this.db().getCharPref('action_key');
}

reasyDB.prototype.set_action_key = function(val)
{
	if (val && '' != val)
		this.db().setCharPref('action_key', val);
}

reasyDB.prototype.fwd_key = function()
{
	return this.db().getCharPref('fwd_key');
}

reasyDB.prototype.set_fwd_key = function(val)
{
	if (val && '' != val)
		this.db().setCharPref('fwd_key', val);
}

reasyDB.prototype.back_key = function()
{
	return this.db().getCharPref('back_key');
}

reasyDB.prototype.set_back_key = function(val)
{
	if (val && '' != val)
		this.db().setCharPref('back_key', val);
}

reasyDB.prototype.read_interval = function()
{
	return this.readInterval;
}

reasyDB.prototype.dim_background = function()
{
	return this.db().getIntPref('dim_background');
}

reasyDB.prototype.set_dim_background = function(val)
{
	return this.db().setIntPref('dim_background', val > 100 ? 100 : val);
}

reasyDB.prototype.multi_line_opacity = function()
{
	return this.db().getIntPref('multi_line_opacity');
}

reasyDB.prototype.set_multi_line_opacity = function(val)
{
	return this.db().setIntPref('multi_line_opacity', val > 100 ? 100 : val);
}

var reasy_db = new reasyDB();