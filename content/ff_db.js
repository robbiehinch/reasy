

if (!reasy) var reasy = {};

//alert('reasy_db ->');

(function(){
  reasy.ff_db = {

    DB: function() {
      this.prefs = null;
      this.instance = null;
      this.readInterval = 60000 / this.wpm();
    }
  }

  if (!reasy.reasy_db) reasy.reasy_db = {};

  reasy.reasy_db = {

      instance: null,

      singleton: function() {
          if (!reasy.reasy_db.instance) {
              reasy.reasy_db.instance = new reasy.ff_db.DB();
          }
          return reasy.reasy_db.instance;
      }
  }

  reasy.ff_db.DB.prototype.db = function() {
    if (null == this.prefs) {
      var compClass = Components.classes["@mozilla.org/preferences-service;1"];
      var svc = compClass.getService(Components.interfaces.nsIPrefService);
      this.prefs = svc.getBranch("extensions.reasy.");
    }
    return this.prefs;
  }

  reasy.ff_db.DB.prototype.chg = function(key, val) {
    this.db().setIntPref(key, val);
  }

  reasy.ff_db.DB.prototype.inc = function(key, cur_val, amount) {
    this.chg(key, cur_val + amount);
  }

  reasy.ff_db.DB.prototype.dec = function(key, cur_val, amount) {
    if (cur_val > amount)
      this.chg(key, cur_val - amount);
  }

  reasy.ff_db.DB.prototype.minWords = function() {
    return this.db().getIntPref("minWords");
  }

  reasy.ff_db.DB.prototype.setMinWords = function(val) {
    return this.db().setIntPref("minWords", val > 10 ? val : 10);
  }

  reasy.ff_db.DB.prototype.fontSize = function() {
    return this.db().getIntPref('font_size') + 'px';
  }

  reasy.ff_db.DB.prototype.setFontSize = function(val) {
    return this.db().setIntPref('font_size', val);
  }

  reasy.ff_db.DB.prototype.fontFamily = function() {
    return this.db().getCharPref('font_family');
  }

  reasy.ff_db.DB.prototype.setFontFamily = function(val) {
    return this.db().setCharPref('font_family', val);
  }

  reasy.ff_db.DB.prototype.txtColor = function(div) {
    div.style.color = this.db().getCharPref('txtcolor');
  }

  reasy.ff_db.DB.prototype.getTxtColor = function() {
    return this.db().getCharPref('txtcolor');
  }

  reasy.ff_db.DB.prototype.setTxtColor = function(val) {
    this.db().setCharPref('txtcolor', val);
  }
  reasy.ff_db.DB.prototype.bkgColor = function(div) {
    div.style.backgroundColor = this.db().getCharPref('bgcolor');
  }

  reasy.ff_db.DB.prototype.getBkgColor = function() {
    return this.db().getCharPref('bgcolor');
  }

  reasy.ff_db.DB.prototype.setBkgColor = function(val) {
    this.db().setCharPref('bgcolor', val);
  }

  reasy.ff_db.DB.prototype.wpm = function() {
    return this.db().getIntPref('wpm');
  }

  reasy.ff_db.DB.prototype.wpmChg = function() {
    return this.db().getIntPref('wpmChg');
  }

  reasy.ff_db.DB.prototype.incWpm = function (div) {
    this.inc('wpm', this.wpm(), this.wpmChg());
    var w = this.wpm();
    if (div) {
      div.nodeValue = w;
    }
    this.readInterval = 60000 / w;
    return w;
  }

  reasy.ff_db.DB.prototype.decWpm = function(div) {
    this.dec('wpm', this.wpm(), this.wpmChg());
    var w = this.wpm();
    if (div) {
      div.nodeValue = w;
    }
    this.readInterval = 60000 / w;
    return w;
  }

  reasy.ff_db.DB.prototype.fixation = function() {
    return this.db().getIntPref('fixation');
  }

  reasy.ff_db.DB.prototype.incFix = function (div) {
    this.inc('fixation', this.fixation(), 1);
    var newFixation = this.fixation();
    if (div) {
      div.nodeValue = newFixation;
    }
    return newFixation;
  }

  reasy.ff_db.DB.prototype.decFix = function(div) {
    this.dec('fixation', this.fixation(), 1);
    var newFixation = this.fixation();
    if (div) {
      div.nodeValue = newFixation;
    }
    return newFixation;
  }

  reasy.ff_db.DB.prototype.punc_pause = function() {
    return this.db().getIntPref('punc_pause');
  }

  reasy.ff_db.DB.prototype.setPuncPause = function(val) {
    return this.db().setIntPref('punc_pause', val);
  }

  reasy.ff_db.DB.prototype.skip_count = function() {
    return this.db().getIntPref('skip_count');
  }

  reasy.ff_db.DB.prototype.setSkipCount = function(val) {
    return this.db().setIntPref('skip_count', val);
  }

  reasy.ff_db.DB.prototype.auto_play = function() {
    return this.db().getBoolPref('auto_play');
  }

  reasy.ff_db.DB.prototype.auto_play_invert = function() {
    return this.db().setBoolPref('auto_play', !this.auto_play());
  }

  reasy.ff_db.DB.prototype.deselect_close = function() {
    return this.db().getBoolPref('deselect_close');
  }

  reasy.ff_db.DB.prototype.deselect_close_invert = function() {
    return this.db().setBoolPref('deselect_close', !this.deselect_close());
  }

  reasy.ff_db.DB.prototype.ticker_tape = function() {
    return this.db().getBoolPref('ticker');
  }

  reasy.ff_db.DB.prototype.ticker_tape_invert = function() {
    this.db().setBoolPref('ticker', !this.ticker_tape());
  }

  reasy.ff_db.DB.prototype.pre_post = function() {
    return this.db().getBoolPref('pre_post');
  }

  reasy.ff_db.DB.prototype.pre_post_invert = function() {
    this.db().setBoolPref('pre_post', !this.pre_post());
  }

  reasy.ff_db.DB.prototype.live_ink = function() {
    return this.db().getBoolPref('live_ink');
  }

  reasy.ff_db.DB.prototype.live_ink_invert = function() {
    this.db().setBoolPref('live_ink', !this.live_ink());
  }

  reasy.ff_db.DB.prototype.top = function() {
    return this.db().getIntPref('top');
  }

  reasy.ff_db.DB.prototype.setTop = function (val) {
    val = Math.max(val, 0);
    this.db().setIntPref('top', val);
    return val;
  }

  reasy.ff_db.DB.prototype.height = function() {
    return this.db().getIntPref('height');
  }

  reasy.ff_db.DB.prototype.setHeight = function (val) {
    val = Math.max(val, 100);
    this.db().setIntPref('height', val);
    return val;
  }

  reasy.ff_db.DB.prototype.left = function() {
    return this.db().getIntPref('left');
  }

  reasy.ff_db.DB.prototype.setLeft = function (val) {
    val = Math.max(val, 0);
    this.db().setIntPref('left', val);
    return val;
  }

  reasy.ff_db.DB.prototype.width = function() {
    return this.db().getIntPref('width');
  }

  reasy.ff_db.DB.prototype.setWidth = function (val) {
    val = Math.max(val, 200);
    this.db().setIntPref('width', val);
    return val;
  }

  reasy.ff_db.DB.prototype.auto_popup = function() {
    return this.db().getBoolPref('auto_popup');
  }

  reasy.ff_db.DB.prototype.invert_auto_popup = function() {
    this.db().setBoolPref('auto_popup', !this.auto_popup());
  }

  reasy.ff_db.DB.prototype.action_key = function() {
    var action_key = this.db().getCharPref('action_key');
    var action_key_u = action_key.toUpperCase();
    if (action_key != action_key_u)
      this.set_action_key(action_key_u);
    return action_key_u;
  }

  reasy.ff_db.DB.prototype.set_action_key = function(val) {
    if (val && '' != val)
      this.db().setCharPref('action_key', val.toUpperCase());
  }

  reasy.ff_db.DB.prototype.fwd_key = function() {
    var fwd_key = this.db().getCharPref('fwd_key');
    var fwd_key_u = fwd_key.toUpperCase();
    if (fwd_key != fwd_key_u)
      this.set_fwd_key(fwd_key_u);
    return fwd_key_u;
  }

  reasy.ff_db.DB.prototype.set_fwd_key = function(val) {
    if (val && '' != val)
      this.db().setCharPref('fwd_key', val);
  }

  reasy.ff_db.DB.prototype.back_key = function() {
    var back_key = this.db().getCharPref('back_key');
    var back_key_u = back_key.toUpperCase();
    if (back_key != back_key_u)
      this.set_back_key(back_key_u);
    return back_key_u;
  }

  reasy.ff_db.DB.prototype.set_back_key = function(val) {
    if (val && '' != val)
      this.db().setCharPref('back_key', val);
  }

  reasy.ff_db.DB.prototype.read_interval = function() {
    return this.readInterval;
  }

  reasy.ff_db.DB.prototype.dim_background = function() {
    return this.db().getIntPref('dim_background');
  }

  reasy.ff_db.DB.prototype.set_dim_background = function(val) {
    return this.db().setIntPref('dim_background', val > 100 ? 100 : val);
  }

  reasy.ff_db.DB.prototype.multi_line_opacity = function() {
    return this.db().getIntPref('multi_line_opacity');
  }

  reasy.ff_db.DB.prototype.set_multi_line_opacity = function(val) {
    return this.db().setIntPref('multi_line_opacity', val > 100 ? 100 : val);
  }

  reasy.ff_db.DB.prototype.get_text_border = function() {
    return this.db().getIntPref('text_border') + 'px';
  }

  reasy.ff_db.DB.prototype.set_text_border = function(val) {
      return this.db().setIntPref('text_border', val);
  }

  reasy.ff_db.DB.prototype.zIndex = function (val) {
    return this.db().getIntPref('z_index', val);
  }

  reasy.ff_db.DB.prototype.Justify = function () {
    return this.db().getBoolPref('justify');
  }
}).apply(reasy);

//alert('<- reasy_db');

