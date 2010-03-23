

if (!com) var com = {};
if (!com.reasy) com.reasy = {};
if (!com.reasy.default_db) com.reasy.default_db = {};

com.reasy.default_db = {

  DB: function() {
    alert("default DB -->");
    this.prefs = null;
    this.instance = null;
    this.readInterval = 60000 / this.wpm();
  }
}

if (!com.reasy.reasy_db) com.reasy.reasy_db = {};

com.reasy.reasy_db = {

    instance: null,

    singleton: function() {
        if (!com.reasy.reasy_db.instance) {
            com.reasy.reasy_db.instance = new com.reasy.default_db.DB();
        }
        return com.reasy.reasy_db.instance;
    }
}

com.reasy.default_db.DB.prototype.chg = function(key, val) {
  //does nothing
}

com.reasy.default_db.DB.prototype.inc = function(key, cur_val, amount) {
  //does nothing
}

com.reasy.default_db.DB.prototype.dec = function(key, cur_val, amount) {
  //does nothing
}

com.reasy.default_db.DB.prototype.minWords = function() {
  return 25;
}

com.reasy.default_db.DB.prototype.setMinWords = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.fontSize = function() {
  return '20px';
}

com.reasy.default_db.DB.prototype.setFontSize = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.fontFamily = function() {
  return 'Times New Roman';
}

com.reasy.default_db.DB.prototype.setFontFamily = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.txtColor = function(div) {
  div.style.color = this.getTxtColor();
}

com.reasy.default_db.DB.prototype.getTxtColor = function() {
  return '#FFFF99';
}

com.reasy.default_db.DB.prototype.setTxtColor = function(val) {
//does nothing
}
com.reasy.default_db.DB.prototype.bkgColor = function(div) {
  div.style.backgroundColor = this.getBkgColor();
}

com.reasy.default_db.DB.prototype.getBkgColor = function() {
  return '#000066';
}

com.reasy.default_db.DB.prototype.setBkgColor = function(val) {
  //does nothing
}

com.reasy.default_db.DB.prototype.wpm = function() {
  return 350;
}

com.reasy.default_db.DB.prototype.wpmChg = function() {
  return 10;
}

com.reasy.default_db.DB.prototype.incWpm = function(div) {
//does nothing
}

com.reasy.default_db.DB.prototype.decWpm = function(div) {
//does nothing
}

com.reasy.default_db.DB.prototype.fixation = function() {
  return 2;
}

com.reasy.default_db.DB.prototype.incFix = function(div) {
//does nothing
}

com.reasy.default_db.DB.prototype.decFix = function(div) {
//does nothing
}

com.reasy.default_db.DB.prototype.punc_pause = function() {
  return 0;
}

com.reasy.default_db.DB.prototype.setPuncPause = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.skip_count = function() {
  return 25;
}

com.reasy.default_db.DB.prototype.setSkipCount = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.auto_play = function() {
  return false;
}

com.reasy.default_db.DB.prototype.auto_play_invert = function() {
//does nothing
}

com.reasy.default_db.DB.prototype.deselect_close = function() {
  return true;
}

com.reasy.default_db.DB.prototype.deselect_close_invert = function() {
//does nothing
}

com.reasy.default_db.DB.prototype.ticker_tape = function() {
  return true;
}

com.reasy.default_db.DB.prototype.ticker_tape_invert = function() {
//does nothing
}

com.reasy.default_db.DB.prototype.pre_post = function() {
  return true;
}

com.reasy.default_db.DB.prototype.pre_post_invert = function() {
//does nothing
}

com.reasy.default_db.DB.prototype.live_ink = function() {
  return true;
}

com.reasy.default_db.DB.prototype.live_ink_invert = function() {
//does nothing
}

com.reasy.default_db.DB.prototype.top = function() {
  return 250;
}

com.reasy.default_db.DB.prototype.setTop = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.height = function() {
  return -10000;
}

com.reasy.default_db.DB.prototype.setHeight = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.left = function() {
  return 300;
}

com.reasy.default_db.DB.prototype.setLeft = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.width = function() {
  return 1000;
}

com.reasy.default_db.DB.prototype.setWidth = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.auto_popup = function() {
  return true;
}

com.reasy.default_db.DB.prototype.invert_auto_popup = function() {
//does nothing
}

com.reasy.default_db.DB.prototype.action_key = function() {
  return 'R';
}

com.reasy.default_db.DB.prototype.set_action_key = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.fwd_key = function() {
  return 'F';
}

com.reasy.default_db.DB.prototype.set_fwd_key = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.back_key = function() {
  return 'B';
}

com.reasy.default_db.DB.prototype.set_back_key = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.read_interval = function() {
  return this.readInterval;
}

com.reasy.default_db.DB.prototype.dim_background = function() {
  return 25;
}

com.reasy.default_db.DB.prototype.set_dim_background = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.multi_line_opacity = function() {
  return 0;
}

com.reasy.default_db.DB.prototype.set_multi_line_opacity = function(val) {
//does nothing
}

com.reasy.default_db.DB.prototype.get_text_border = function() {
  return '3px';
}

com.reasy.default_db.DB.prototype.set_text_border = function(val) {
//does nothing
}
