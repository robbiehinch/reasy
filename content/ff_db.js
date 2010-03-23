

if (!com) var com = {};
if (!com.reasy) com.reasy = {};
if (!com.reasy.ff_db) com.reasy.ff_db = {};

com.reasy.ff_db = {

  DB: function() {
    this.prefs = null;
    this.instance = null;
    this.readInterval = 60000 / this.wpm();
  }
}

com.reasy.ff_db.DB.prototype.db = function() {
  if (null == this.prefs) {
    var compClass = Components.classes["@mozilla.org/preferences-service;1"];
    var svc = compClass.getService(Components.interfaces.nsIPrefService);
    this.prefs = svc.getBranch("extensions.reasy.");
  }
  return this.prefs;
}

com.reasy.ff_db.DB.prototype.chg = function(key, val) {
  this.db().setIntPref(key, val);
}

com.reasy.ff_db.DB.prototype.inc = function(key, cur_val, amount) {
  this.chg(key, cur_val + amount);
}

com.reasy.ff_db.DB.prototype.dec = function(key, cur_val, amount) {
  if (cur_val > amount)
    this.chg(key, cur_val - amount);
}

com.reasy.ff_db.DB.prototype.minWords = function() {
  return this.db().getIntPref("minWords");
}

com.reasy.ff_db.DB.prototype.setMinWords = function(val) {
  return this.db().setIntPref("minWords", val > 10 ? val : 10);
}

com.reasy.ff_db.DB.prototype.fontSize = function() {
  return this.db().getIntPref('font_size') + 'px';
}

com.reasy.ff_db.DB.prototype.setFontSize = function(val) {
  return this.db().setIntPref('font_size', val);
}

com.reasy.ff_db.DB.prototype.fontFamily = function() {
  return this.db().getCharPref('font_family');
}

com.reasy.ff_db.DB.prototype.setFontFamily = function(val) {
  return this.db().setCharPref('font_family', val);
}

com.reasy.ff_db.DB.prototype.txtColor = function(div) {
  div.style.color = this.db().getCharPref('txtcolor');
}

com.reasy.ff_db.DB.prototype.getTxtColor = function() {
  return this.db().getCharPref('txtcolor');
}

com.reasy.ff_db.DB.prototype.setTxtColor = function(val) {
  this.db().setCharPref('txtcolor', val);
}
com.reasy.ff_db.DB.prototype.bkgColor = function(div) {
  div.style.backgroundColor = this.db().getCharPref('bgcolor');
}

com.reasy.ff_db.DB.prototype.getBkgColor = function() {
  return this.db().getCharPref('bgcolor');
}

com.reasy.ff_db.DB.prototype.setBkgColor = function(val) {
  this.db().setCharPref('bgcolor', val);
}

com.reasy.ff_db.DB.prototype.wpm = function() {
  return this.db().getIntPref('wpm');
}

com.reasy.ff_db.DB.prototype.wpmChg = function() {
  return this.db().getIntPref('wpmChg');
}

com.reasy.ff_db.DB.prototype.incWpm = function(div) {
  this.inc('wpm', this.wpm(), this.wpmChg());
  var w = this.wpm();
  if (div) {
    div.nodeValue = w;
  }
  this.readInterval = 60000 / w;
}

com.reasy.ff_db.DB.prototype.decWpm = function(div) {
  this.dec('wpm', this.wpm(), this.wpmChg());
  var w = this.wpm();
  if (div) {
    div.nodeValue = w;
  }
  this.readInterval = 60000 / w;
}

com.reasy.ff_db.DB.prototype.fixation = function() {
  return this.db().getIntPref('fixation');
}

com.reasy.ff_db.DB.prototype.incFix = function(div) {
  this.inc('fixation', this.fixation(), 1);
  if (div) {
    div.nodeValue = this.fixation();
  }
}

com.reasy.ff_db.DB.prototype.decFix = function(div) {
  this.dec('fixation', this.fixation(), 1);
  if (div) {
    div.nodeValue = this.fixation();
  }
}

com.reasy.ff_db.DB.prototype.punc_pause = function() {
  return this.db().getIntPref('punc_pause');
}

com.reasy.ff_db.DB.prototype.setPuncPause = function(val) {
  return this.db().setIntPref('punc_pause', val);
}

com.reasy.ff_db.DB.prototype.skip_count = function() {
  return this.db().getIntPref('skip_count');
}

com.reasy.ff_db.DB.prototype.setSkipCount = function(val) {
  return this.db().setIntPref('skip_count', val);
}

com.reasy.ff_db.DB.prototype.auto_play = function() {
  return this.db().getBoolPref('auto_play');
}

com.reasy.ff_db.DB.prototype.auto_play_invert = function() {
  return this.db().setBoolPref('auto_play', !this.auto_play());
}

com.reasy.ff_db.DB.prototype.deselect_close = function() {
  return this.db().getBoolPref('deselect_close');
}

com.reasy.ff_db.DB.prototype.deselect_close_invert = function() {
  return this.db().setBoolPref('deselect_close', !this.deselect_close());
}

com.reasy.ff_db.DB.prototype.ticker_tape = function() {
  return this.db().getBoolPref('ticker');
}

com.reasy.ff_db.DB.prototype.ticker_tape_invert = function() {
  this.db().setBoolPref('ticker', !this.ticker_tape());
}

com.reasy.ff_db.DB.prototype.pre_post = function() {
  return this.db().getBoolPref('pre_post');
}

com.reasy.ff_db.DB.prototype.pre_post_invert = function() {
  this.db().setBoolPref('pre_post', !this.pre_post());
}

com.reasy.ff_db.DB.prototype.live_ink = function() {
  return this.db().getBoolPref('live_ink');
}

com.reasy.ff_db.DB.prototype.live_ink_invert = function() {
  this.db().setBoolPref('live_ink', !this.live_ink());
}

com.reasy.ff_db.DB.prototype.top = function() {
  return this.db().getIntPref('top');
}

com.reasy.ff_db.DB.prototype.setTop = function(val) {
  this.db().setIntPref('top', val);
}

com.reasy.ff_db.DB.prototype.height = function() {
  return this.db().getIntPref('height');
}

com.reasy.ff_db.DB.prototype.setHeight = function(val) {
  this.db().setIntPref('height', val);
}

com.reasy.ff_db.DB.prototype.left = function() {
  return this.db().getIntPref('left');
}

com.reasy.ff_db.DB.prototype.setLeft = function(val) {
  this.db().setIntPref('left', val);
}

com.reasy.ff_db.DB.prototype.width = function() {
  return this.db().getIntPref('width');
}

com.reasy.ff_db.DB.prototype.setWidth = function(val) {
  this.db().setIntPref('width', val);
}

com.reasy.ff_db.DB.prototype.auto_popup = function() {
  return this.db().getBoolPref('auto_popup');
}

com.reasy.ff_db.DB.prototype.invert_auto_popup = function() {
  this.db().setBoolPref('auto_popup', !this.auto_popup());
}

com.reasy.ff_db.DB.prototype.action_key = function() {
  return this.db().getCharPref('action_key');
}

com.reasy.ff_db.DB.prototype.set_action_key = function(val) {
  if (val && '' != val)
    this.db().setCharPref('action_key', val);
}

com.reasy.ff_db.DB.prototype.fwd_key = function() {
  return this.db().getCharPref('fwd_key');
}

com.reasy.ff_db.DB.prototype.set_fwd_key = function(val) {
  if (val && '' != val)
    this.db().setCharPref('fwd_key', val);
}

com.reasy.ff_db.DB.prototype.back_key = function() {
  return this.db().getCharPref('back_key');
}

com.reasy.ff_db.DB.prototype.set_back_key = function(val) {
  if (val && '' != val)
    this.db().setCharPref('back_key', val);
}

com.reasy.ff_db.DB.prototype.read_interval = function() {
  return this.readInterval;
}

com.reasy.ff_db.DB.prototype.dim_background = function() {
  return this.db().getIntPref('dim_background');
}

com.reasy.ff_db.DB.prototype.set_dim_background = function(val) {
  return this.db().setIntPref('dim_background', val > 100 ? 100 : val);
}

com.reasy.ff_db.DB.prototype.multi_line_opacity = function() {
  return this.db().getIntPref('multi_line_opacity');
}

com.reasy.ff_db.DB.prototype.set_multi_line_opacity = function(val) {
  return this.db().setIntPref('multi_line_opacity', val > 100 ? 100 : val);
}

com.reasy.ff_db.DB.prototype.get_text_border = function() {
  return this.db().getIntPref('text_border') + 'px';
}

com.reasy.ff_db.DB.prototype.set_text_border = function(val) {
  return this.db().setIntPref('text_border', val);
}
