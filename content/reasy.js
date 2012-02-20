
if (!reasy) var reasy = {};

//alert('reasy ->');

(function(){
  //alert("reasy1");
  reasy.reasy = {

    houseDivName: 'reasyHouseTextDiv',
    opaqueBGName: 'reasyOpaqueBG',

    XY: function XY(x, y) {
      this.x = x;
      this.y = y;
    },

    XBrowserGetSelection: function(doc) {
        var selection = '';
        var window = reasy.reasy.XBrowserWindow();
        if (!window.getSelection) {
            var document = reasy.reasy.XBrowserDocument();
            selection = document.selection.createRange().htmlText;
        }
        else {
          selection = reasy.reasy.XBrowserWindow().getSelection();
          if (selection.toString)
            selection = selection.toString();
        }
        return selection;
    },
    
    XBrowserAddEventListener: function(el, eventName, fn, b) {
        if (el.addEventListener) {
            el.addEventListener(eventName, fn, b);
        } else if (el.attachEvent) {  
            el.attachEvent('on' + eventName, fn);
        }
    },
    
    XBrowserRemoveEventListener: function(el, eventName, fn, b) {
        if (el.addEventListener) {
            el.removeEventListener(eventName, fn, b);
        } else if (el.attachEvent) {  
            el.detachEvent(eventName, fn);
        }
    },
    
    //http://james.padolsey.com/javascript/get-document-height-cross-browser/
    XBrowserHeight: function (doc) {
        return Math.max(
            Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
            Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
            Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
        );
    },

    XBrowserWidth: function (doc) {
        return Math.max(
            Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
            Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
            Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
        );
    },

    XBrowserDocument: function() {
        if (!(typeof content === 'undefined') && content && content.document)
            return content.document;
        if (!(typeof document === 'undefined') && document)
            return document;
        return null;
    },

    XBrowserWindow: function() {
        if (!(typeof content === 'undefined') && content && content.window)
            return content.window;
        if (!(typeof window === 'undefined') && window)
            return window;
        return null;
    },

    getContentSelectedText: function (doc) {
      if (!doc)
        return "";

      return reasy.reasy.XBrowserGetSelection(doc);
    },

    getIFrameSelection: function (doc) {
      var ret = reasy.reasy.getContentSelectedText(doc);
      for (var f in reasy.reasy.XBrowserWindow().frames) {
        if (f.contentWindow) {
          			console.log("frame.contentWindow");
          ret += reasy.reasy.getContentSelectedText(f.contentWindow);
        }
        if (f.document) {
          			console.log("frame.document");
          ret += reasy.reasy.getContentSelectedText(f.document);
        }
        if (f.contentDocument) {
          			console.log("frame.contentDocument");
          ret += reasy.reasy.getContentSelectedText(f.contentDocument);
        }
      }
      return ret;
    },

    setOrReplaceNode: function (nodeName, node) {
      var doc = reasy.reasy.XBrowserDocument();
      // replace the old div or add the div to the document
      var oldNode = doc.getElementById(nodeName);
      if (oldNode) {
        var result = doc.body.replaceChild(node, oldNode);
        if (null == result) {
          doc.body.appendChild(node);
        }
      }
      else
        doc.body.appendChild(node);
    },

    moveFunction: function (evt, div, old_x, old_y) {
      var ntop = (parseInt(div.style.top) + evt.clientY - old_y);
      var nleft = (parseInt(div.style.left) + evt.clientX - old_x);
      var db = reasy.reasy_db.singleton();
      div.style.top = db.setTop(ntop) + 'px';
      div.style.left = db.setLeft(nleft) + 'px';
    },

    sizeLeft: function (evt, div, old_x, old_y) {
      var diff = evt.clientX - old_x;
      var nleft = parseInt(div.style.left) + diff;
      var nwidth = parseInt(div.style.width) - diff;
      var db = reasy.reasy_db.singleton();
      div.style.left = db.setLeft(nleft) + 'px';
      div.style.width = db.setWidth(nwidth) + 'px';
    },

    sizeRight: function (evt, div, old_x, old_y) {
      var diff = evt.clientX - old_x;
      var nwidth = parseInt(div.style.width) + diff;
      div.style.width = reasy.reasy_db.singleton().setWidth(nwidth) + 'px';
    },

    sizeTop: function (evt, div, old_x, old_y) {
      var diff = evt.clientY - old_y;
      var ntop = parseInt(div.style.top) + diff;
      var nheight = parseInt(div.style.height) - diff;
      var db = reasy.reasy_db.singleton();
      div.style.top = db.setTop(ntop) + 'px';
      div.style.height = db.setHeight(nheight) + 'px';
    },

    sizeBottom: function (evt, div, old_x, old_y) {
      var diff = evt.clientY - old_y;
      var nheight = parseInt(div.style.height) + diff;
      div.style.height = reasy.reasy_db.singleton().setHeight(nheight) + 'px';
    },

    mouseMove: function (evt, myXY, div, move_fn) {
      var nx = evt.clientX;
      var ny = evt.clientY;
      if (myXY.diff_coords(nx, ny)) {
        if (move_fn)
          move_fn(evt, div, myXY.getX(), myXY.getY());
        myXY.change(nx, ny);
      }
    },

    houseClicked: function (evt) {
      if (typeof evt === 'undefined' || !evt)
          return;

      var x = evt.clientX;
      var y = evt.clientY;
      var div = evt.target;
      var x_diff = x - parseInt(div.style.left);
      var y_diff = y - parseInt(div.style.top);
      var fn = reasy.reasy.moveFunction;
      if (x_diff < 10)
        fn = reasy.reasy.sizeLeft;
      else if (x_diff >= (parseInt(div.style.width) - 10))
        fn = reasy.reasy.sizeRight;
      else if (y_diff < 10)
        fn = reasy.reasy.sizeTop;
      else if (y_diff >= (parseInt(div.style.height) - 10))
        fn = reasy.reasy.sizeBottom;

      if (fn == reasy.reasy.moveFunction)
        div.style.cursor = 'move';
      var myXY = new reasy.reasy.XY(x, y);
      var mv_fn = function (newevt) { reasy.reasy.mouseMove(newevt, myXY, div, fn); };

      var doc = reasy.reasy.XBrowserDocument();
      var remove_fn = function removeFn() {
        div.style.cursor = 'default';
        reasy.reasy.XBrowserRemoveEventListener(div, "mousemove", mv_fn, false);
        reasy.reasy.XBrowserRemoveEventListener(doc, "mousemove", mv_fn, false);
        reasy.reasy.XBrowserRemoveEventListener(div, "mouseup", removeFn, false);
        reasy.reasy.XBrowserRemoveEventListener(doc, "mouseup", removeFn, false);
      }

      reasy.reasy.XBrowserAddEventListener(div, "mousemove", mv_fn, false);
      reasy.reasy.XBrowserAddEventListener(doc, "mousemove", mv_fn, false);

      reasy.reasy.XBrowserAddEventListener(div, "mouseup", remove_fn, false);
      reasy.reasy.XBrowserAddEventListener(doc, "mouseup", remove_fn, false);
    },

    mouseOver: function (evt) {
      if (typeof evt === 'undefined' || !evt)
          return;

      var x = evt.clientX;
      var y = evt.clientY;
      var div = evt.target;
      var x_diff = x - parseInt(div.style.left);
      var y_diff = y - parseInt(div.style.top);
      if (x_diff < 10 || x_diff >= (parseInt(div.style.width) - 10)) {
        //near edges
        div.style.cursor = 'e-resize';
      }
      else if (y_diff < 10 || y_diff >= (parseInt(div.style.height) - 10)) {
        //near edges
        div.style.cursor = 'n-resize';
      }
      else if (div.style.cursor != 'move') {
        div.style.cursor = 'default';
      }
    },

    incWPM: function (reasyWPMText) {
      reasyWPMText.nodeValue = reasy.reasy_db.singleton().incWpm();
    },

    decWPM: function (reasyWPMText) {
      reasyWPMText.nodeValue = reasy.reasy_db.singleton().decWpm();
    },

    incFixation: function (reasyFixationText) {
      reasyFixationText.nodeValue = reasy.reasy_db.singleton().incFix();
    },

    decFixation: function (reasyFixationText) {
      reasyFixationText.nodeValue = reasy.reasy_db.singleton().decFix();
    },

    close: function (evt, div) {
//      console.log("reasy close");
//      console.log(evt);
//      console.log(div);
      var doc = reasy.reasy.XBrowserDocument();
      var reasyDiv = doc.getElementById(reasy.reasy.houseDivName);
      if (reasyDiv)
        doc.body.removeChild(reasyDiv);

      var bg = doc.getElementById(reasy.reasy.opaqueBGName);
      if (bg)
        doc.body.removeChild(bg);

      if (div || reasy.reasy_db.singleton().deselect_close())	//div is valid on forced close
      {
        var sel = reasy.reasy.XBrowserWindow().getSelection();
        if (sel && sel.removeAllRanges)
          sel.removeAllRanges();
      }

      reasy.reasy.keyFn = reasy.reasy.select;
      reasy.reasy.fwdFn = null;
      reasy.reasy.backFn = null;

      if (div) {
        evt = doc.createEvent("HTMLEvents");
        evt.initEvent("mouseup", true, true ); // event type,bubbling,cancelable
        div.dispatchEvent(evt);
      }
    },

    keyFn: null,
    fwdFn: null,
    backFn: null,

    createDom: function (doc, reasySplit) {
      //make reasy housing div
      var reasyHouseDiv = doc.createElement('div');
      reasyHouseDiv.setAttribute('id', reasy.reasy.houseDivName);
      reasyHouseDiv.style.position = 'fixed';

      var db = reasy.reasy_db.singleton();
      var db_top = db.top();
      if (db_top < 0)
        db_top = reasy.reasy.XBrowserHeight(doc) / 5;
      reasyHouseDiv.style.top = db_top + 'px';
      var db_left = db.left();
      if (db_left < 0)
        db_left = reasy.reasy.XBrowserWidth(doc) / 5;
      reasyHouseDiv.style.left = db_left + 'px';
      var db_height = db.height();
      if (db_height <= 0)
        db_height = Math.max(db_top * 3, 200);
      reasyHouseDiv.style.height = db_height + 'px';
      var db_width = db.width();
      if (db_width <= 0)
        db_width = Math.max(db_left * 3, 400);
      reasyHouseDiv.style.width = db_width + 'px';
      reasyHouseDiv.style.zIndex = db.zIndex() + 1;
      reasyHouseDiv.style.borderRadius = '5px';
      db.bkgColor(reasyHouseDiv);
      db.txtColor(reasyHouseDiv);

      var menuDiv = doc.createElement('div');
      menuDiv.style.fontSize = '16px';
      menuDiv.style.fontFamily = 'Verdana';
      menuDiv.style.color = 'silver';
      menuDiv.style.padding = '10px';
      reasyHouseDiv.appendChild(menuDiv);

      var background_opacity = db.dim_background();

      var buttonnode = doc.createElement('button');
      buttonnode.style.cursor = 'default';
      buttonnode.style.cssFloat = 'left';
      buttonnode.style.fontWeight = 'bold';
      buttonnode.style.borderRadius = '1em';
      buttonnode.style.borderStyle = 'none';
      buttonnode.style.MozAppearance = 'none';
      buttonnode.style.backgroundColor = db.getTxtColor();
      buttonnode.style.color = db.getBkgColor();
      buttonnode.style.minWidth = "2em";
      buttonnode.style.textAlign = "center";

      if (0 == background_opacity) {
        // create menu/close button div
        var closeButton = buttonnode.cloneNode(true);
        closeButton.onmouseup = function (evt) { reasy.reasy.close(evt, reasyHouseDiv); };
        closeButton.title = 'Exit';
        closeButton.appendChild(doc.createTextNode('x'));
        menuDiv.appendChild(closeButton);
      }
      else {
        //cover background with opaque overlay
        var opaque_bg = doc.createElement('div');
        opaque_bg.onmouseup = function (evt) { reasy.reasy.close(evt, reasyHouseDiv); };
        opaque_bg.style.width = '100%';
        opaque_bg.style.height = '100%';
        opaque_bg.style.position = 'fixed';
        opaque_bg.style.top = '0px';
        opaque_bg.style.left = '0px';
        opaque_bg.style.opacity = parseFloat(background_opacity) / 100.0;
        opaque_bg.style.zIndex = db.zIndex();
        db.bkgColor(opaque_bg);
        opaque_bg.setAttribute('id', reasy.reasy.opaqueBGName);
        reasy.reasy.setOrReplaceNode(reasy.reasy.opaqueBGName, opaque_bg);
      }

      // make settings text div
      var settingsDiv = doc.createElement('div');
      db.txtColor(settingsDiv);
      settingsDiv.style.fontSize = '16px';
      settingsDiv.style.fontWeight = 'bold';
      settingsDiv.style.fontFamily = 'Tahoma';

      //wpm
      var wpmDiv = doc.createElement('div');
      var reasyWPMText = doc.createTextNode(db.wpm());
      {
        var plus_button = buttonnode.cloneNode(true);
        plus_button.appendChild(doc.createTextNode('+'));
        plus_button.onmousedown = function () { reasy.reasy.incWPM(reasyWPMText); }
        var incWpmDiv = doc.createElement('div');
        incWpmDiv.appendChild(plus_button);
        incWpmDiv.style.cursor = 'default';
        wpmDiv.appendChild(incWpmDiv);
      }

      wpmDiv.appendChild(reasyWPMText);
      wpmDiv.style.padding = '10px';

      //    var minus_button = reasy.reasy.createButton(doc);
      var minus_button = buttonnode.cloneNode(true);
      minus_button.appendChild(doc.createTextNode('-'));
      minus_button.onmousedown = function () { reasy.reasy.decWPM(reasyWPMText); }
      var decWpmDiv = doc.createElement('div');
      decWpmDiv.appendChild(minus_button);
      decWpmDiv.style.cursor = 'default';
      wpmDiv.appendChild(decWpmDiv);
      settingsDiv.appendChild(wpmDiv)
      //fixation
      var reasyFixationText = doc.createTextNode(db.fixation());
      var fixationDiv = doc.createElement('div');

      plus_button = buttonnode.cloneNode(true);
      plus_button.appendChild(doc.createTextNode('+'));
      plus_button.onmousedown = function () { reasy.reasy.incFixation(reasyFixationText); }
      var incFixationDiv = doc.createElement('div');
      incFixationDiv.style.cursor = 'default';
      incFixationDiv.appendChild(plus_button);
      fixationDiv.appendChild(incFixationDiv);

      fixationDiv.appendChild(reasyFixationText);
      fixationDiv.style.padding = '10px';

      minus_button = buttonnode.cloneNode(true);
      minus_button.appendChild(doc.createTextNode('-'));
      minus_button.onmousedown = function () { reasy.reasy.decFixation(reasyFixationText); }
      var decFixationDiv = doc.createElement('div');
      decFixationDiv.style.cursor = 'default';
      decFixationDiv.appendChild(minus_button);
      fixationDiv.appendChild(decFixationDiv);
      settingsDiv.appendChild(fixationDiv);

      //add settings to reasy house
      reasyHouseDiv.appendChild(settingsDiv);

      // make reasy text div
      var reasyDiv = new Array();
      reasyDiv[0] = doc.createTextNode(' ');
      var pre_post_mode = db.pre_post();
      if (pre_post_mode) {
        reasyDiv[1] = doc.createTextNode(' ');
        reasyDiv[2] = doc.createTextNode(' ');
      }

      var reasyReader = new reasy.reasy_reader.reader(reasySplit, reasyDiv, pre_post_mode, db.skip_count(), reasy.reasy.close);

      var paddingDiv = doc.createElement('div');
      paddingDiv.style.height = '38%';
      reasyHouseDiv.appendChild(paddingDiv);

      var bwidth = db.get_text_border();
      var i;
      for (i = 0; i < reasyDiv.length; i++) {
        var textDiv = doc.createElement('div');
        db.txtColor(textDiv);
        textDiv.style.clear = 'both';
        textDiv.style.cssFloat = 'left';
        textDiv.style.width = '100%';
        textDiv.style.fontSize = db.fontSize();
        textDiv.style.fontFamily = db.fontFamily();
        if (!pre_post_mode)
          textDiv.style.textAlign = db.Justify() ? "justify" : 'center';
        else {
          textDiv.style.textAlign = 'left';
          textDiv.style.position = 'relative';
          if (db.live_ink())
            textDiv.style.left = db_left + 50 * (i - 1) + 'px';
          else
            textDiv.style.left = db_left - 50 + 'px';

          if (0 == i % 2)	// set opacity of leading and trailing lines
          {
            var opacity = db.multi_line_opacity();
            if (opacity > 0)
              textDiv.style.opacity = parseFloat() / 100.0;
          }
          textDiv.style.padding = bwidth;
        }
        textDiv.appendChild(reasyDiv[i]);
        textDiv.onmousedown = function () { reasyReader.playPause(); };
        textDiv.style.cursor = 'default';
        reasyHouseDiv.appendChild(textDiv);
      }

      reasyHouseDiv.onmousedown = reasy.reasy.houseClicked;
      reasyHouseDiv.onmouseover = reasy.reasy.mouseOver;

      reasy.reasy.setOrReplaceNode(reasy.reasy.houseDivName, reasyHouseDiv);

      reasy.reasy.keyFn = function () { reasyReader.playPause(); };
      reasy.reasy.fwdFn = function () { reasyReader.fwd(); };
      reasy.reasy.backFn = function () { reasyReader.back(); };
      if (db.auto_play())
        reasyReader.playPause();
    },

    select: function () {
      // get the text content if there is not an existing reasy session
      var doc = reasy.reasy.XBrowserDocument();
      if (doc && !doc.getElementById(reasy.reasy.houseDivName)) {
        var gotText = reasy.reasy.getIFrameSelection(doc);

        if (gotText) {
          var split = gotText.split(/[-\u2013\u2014\s]/gi);
          if (split && split.length >= reasy.reasy_db.singleton().minWords()) {
            reasy.reasy.createDom(document, split);
          }
        }
      }
    },

    keyDown: function (evt) {
      var db = reasy.reasy_db.singleton();
      if (db.action_key().charCodeAt(0) == evt.which)
        reasy.reasy.keyFn();
      else if ((db.fwd_key().charCodeAt(0) == evt.which) && reasy.reasy.fwdFn)
        reasy.reasy.fwdFn();
      else if ((db.back_key().charCodeAt(0) == evt.which) && reasy.reasy.backFn)
        reasy.reasy.backFn();
    },

    attachListeners: function (evt) {
      var doc = reasy.reasy.XBrowserDocument();
      if (!reasy.reasy.keyFn)
        reasy.reasy.keyFn = reasy.reasy.select;
      if (reasy.reasy_db.singleton().auto_popup())
          reasy.reasy.XBrowserAddEventListener(doc, "mouseup", reasy.reasy.select, false);
      if (doc)
          reasy.reasy.XBrowserAddEventListener(doc, "keydown", reasy.reasy.keyDown, false);
    },

    detachListeners: function (evt) {
      var doc = reasy.reasy.XBrowserDocument();
      reasy.reasy.XBrowserRemoveEventListener(doc, "mouseup", reasy.reasy.select, false);
      reasy.reasy.XBrowserRemoveEventListener(doc, "keydown", reasy.reasy.keyDown, false);
    }
  }

  reasy.reasy.XY.prototype.getX = function () {
    return this.x;
  }

  reasy.reasy.XY.prototype.getY = function () {
    return this.y;
  }

  reasy.reasy.XY.prototype.change = function (x, y) {
    this.x = x;
    this.y = y;
  }

  reasy.reasy.XY.prototype.diff_coords = function (x, y) {
    return this.x != x || this.y != y;
  }

}).apply(reasy);

//alert("<- reasy");

//console.log("adding listeners");

reasy.reasy.XBrowserAddEventListener(window, "load", reasy.reasy.attachListeners, true);
//console.log("added load listener");
reasy.reasy.XBrowserAddEventListener(window, "focus", reasy.reasy.attachListeners, true);
reasy.reasy.XBrowserAddEventListener(window, "unload", reasy.reasy.detachListeners, true);

//console.log("added all listeners");
