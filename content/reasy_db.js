

if (!com) var com = {};
if (!com.reasy) com.reasy = {};
if (!com.reasy.reasy_db) com.reasy.reasy_db = {};

com.reasy.reasy_db = {

  instance: null,

  singleton: function() {
    if (!com.reasy.reasy_db.instance) {
      var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
      if (is_firefox)
        com.reasy.reasy_db.instance = new com.reasy.ff_db.DB();
      else
        com.reasy.reasy_db.instance = new com.reasy.default_db.DB();
    }
    return com.reasy.reasy_db.instance;
  }
}
