
//alert("reasy");
if (!com) var com = {};
if (!com.reasy) com.reasy = {};
if (!com.reasy.reasy) com.reasy.reasy = {};

//alert("reasy1");
com.reasy.reasy = {

  houseDivName: 'reasyHouseTextDiv',
  opaqueBGName: 'reasyOpaqueBG',
  major_ver: null,
  //FirebugContext.window.console.log("Firefox ver ->", ver_string, major_ver);
  //Firebug.Console.log("hello");

  XY: function XY(x, y) {
    this.x = x;
    this.y = y;
  },

  getContentSelectedText: function(doc) {
    if (!doc)
      return "";

    if (!com.reasy.reasy.major_ver) {
      var ua = navigator.userAgent;
      if (ua) {
        var ff_index = ua.indexOf("Firefox");
        if (ff_index >= 0) {
          var ver_index = ff_index + "Firefox".length + 1;
          com.reasy.reasy.major_ver = parseInt(ua.substring(ver_index).split(' ')[0]);
        }
        else
          com.reasy.reasy.major_ver = 0;
      }
    }

    var gotText = doc.getSelection();
    if (com.reasy.reasy.major_ver > 2)
      gotText = gotText.toString();

    return gotText;
  },

  getIFrameSelection: function(doc) {
    var ret = com.reasy.reasy.getContentSelectedText(doc);
    for (var f in window.frames) {
      if (f.contentWindow) {
        //			Firebug.Console.log("frame.contentWindow");
        ret += com.reasy.reasy.getContentSelectedText(f.contentWindow);
      }
      if (f.document) {
        //			Firebug.Console.log("frame.document");
        ret += com.reasy.reasy.getContentSelectedText(f.document);
      }
      if (f.contentDocument) {
        //			Firebug.Console.log("frame.contentDocument");
        ret += com.reasy.reasy.getContentSelectedText(f.contentDocument);
      }
    }
    return ret;
  },

  setOrReplaceNode: function(nodeName, node) {
    // replace the old div or add the div to the document
    var oldNode = content.document.getElementById(nodeName);
    if (oldNode) {
      var result = content.document.body.replaceChild(node, oldNode);
      if (null == result) {
        content.document.body.appendChild(node);
      }
    }
    else
      content.document.body.appendChild(node);
  },

  moveFunction: function(evt, div, old_x, old_y) {
    var ntop = (parseInt(div.style.top) + evt.clientY - old_y);
    var nleft = (parseInt(div.style.left) + evt.clientX - old_x);
    div.style.top = ntop + 'px';
    div.style.left = nleft + 'px';
    com.reasy.reasy_db.singleton().setTop(ntop);
    com.reasy.reasy_db.singleton().setLeft(nleft);
  },

  sizeLeft: function(evt, div, old_x, old_y) {
    var diff = evt.clientX - old_x;
    var nleft = parseInt(div.style.left) + diff;
    var nwidth = parseInt(div.style.width) - diff;
    div.style.left = nleft + 'px';
    div.style.width = nwidth + 'px';
    com.reasy.reasy_db.singleton().setLeft(nleft);
    com.reasy.reasy_db.singleton().setWidth(nwidth);
  },

  sizeRight: function(evt, div, old_x, old_y) {
    var diff = evt.clientX - old_x;
    var nwidth = parseInt(div.style.width) + diff;
    div.style.width = nwidth + 'px';
    com.reasy.reasy_db.singleton().setWidth(nwidth);
  },

  sizeTop: function(evt, div, old_x, old_y) {
    var diff = evt.clientY - old_y;
    var ntop = parseInt(div.style.top) + diff;
    var nheight = parseInt(div.style.height) - diff;
    div.style.top = ntop + 'px';
    div.style.height = nheight + 'px';
    com.reasy.reasy_db.singleton().setTop(ntop);
    com.reasy.reasy_db.singleton().setHeight(nheight);
  },

  sizeBottom: function(evt, div, old_x, old_y) {
    var diff = evt.clientY - old_y;
    var nheight = parseInt(div.style.height) + diff;
    div.style.height = nheight + 'px';
    com.reasy.reasy_db.singleton().setHeight(nheight);
  },

  mouseMove: function(evt, myXY, div, move_fn) {
    var nx = evt.clientX;
    var ny = evt.clientY;
    if (myXY.diff_coords(nx, ny)) {
      if (move_fn)
        move_fn(evt, div, myXY.getX(), myXY.getY());
      myXY.change(nx, ny);
    }
  },

  houseClicked: function(evt, div) {
    var x = evt.clientX;
    var y = evt.clientY;
    var x_diff = x - parseInt(div.style.left);
    var y_diff = y - parseInt(div.style.top);
    var fn = com.reasy.reasy.moveFunction;
    if (x_diff < 10)
      fn = com.reasy.reasy.sizeLeft;
    else if (x_diff >= (parseInt(div.style.width) - 10))
      fn = com.reasy.reasy.sizeRight;
    else if (y_diff < 10)
      fn = com.reasy.reasy.sizeTop;
    else if (y_diff >= (parseInt(div.style.height) - 10))
      fn = com.reasy.reasy.sizeBottom;

    if (fn == com.reasy.reasy.moveFunction)
      div.style.cursor = 'move';
    myXY = new com.reasy.reasy.XY(x, y);
    div.onmousemove = function(newevt) { com.reasy.reasy.mouseMove(newevt, myXY, div, fn); };

    content.document.addEventListener("mousemove"
		    , div.onmousemove
		    , false);
    content.document.addEventListener("mouseup"
		    , div.onmouseup
		    , false);
  },

  mouseOver: function(evt, div) {
    var x = evt.clientX;
    var y = evt.clientY;
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
    else if (!div.onmousemove) {
      div.style.cursor = 'default';
    }
  },

  incWPM: function(reasyWPMText) {
    com.reasy.reasy_db.singleton().incWpm();
    reasyWPMText.nodeValue = com.reasy.reasy_db.singleton().wpm();
  },

  decWPM: function(reasyWPMText) {
    com.reasy.reasy_db.singleton().decWpm();
    reasyWPMText.nodeValue = com.reasy.reasy_db.singleton().wpm();
  },

  incFixation: function(reasyFixationText) {
    com.reasy.reasy_db.singleton().incFix();
    reasyFixationText.nodeValue = com.reasy.reasy_db.singleton().fixation();
  },

  decFixation: function(reasyFixationText) {
    com.reasy.reasy_db.singleton().decFix();
    reasyFixationText.nodeValue = com.reasy.reasy_db.singleton().fixation();
  },

  mouseUp: function(evt, div) {
    div.style.cursor = 'default';
    content.document.removeEventListener("mousemove"
		    , div.onmousemove
		    , false);
    content.document.removeEventListener("mouseup"
		    , div.onmouseup
		    , false);
    div.onmousemove = null;
  },

  close: function(evt, div) {
    var reasyDiv = content.document.getElementById(com.reasy.reasy.houseDivName);
    if (reasyDiv)
      content.document.body.removeChild(reasyDiv);

    var bg = content.document.getElementById(com.reasy.reasy.opaqueBGName);
    if (bg)
      content.document.body.removeChild(bg);

    if (div || com.reasy.reasy_db.singleton().deselect_close())	//div is valid on forced close
    {
      var sel = content.window.getSelection();
      if (sel && sel.removeAllRanges)
        sel.removeAllRanges();
    }

    com.reasy.reasy.keyFn = com.reasy.reasy.select;
    com.reasy.reasy.fwdFn = null;
    com.reasy.reasy.backFn = null;

    if (div)
      com.reasy.reasy.mouseUp(evt, div);
  },

  keyFn: null,
  fwdFn: null,
  backFn: null,

  createDom: function(doc, reasySplit) {
    //make reasy housing div
    var reasyHouseDiv = doc.createElement('div');
    reasyHouseDiv.setAttribute('id', com.reasy.reasy.houseDivName);
    reasyHouseDiv.style.position = 'fixed';

    var db_top = com.reasy.reasy_db.singleton().top();
    if (db_top < -100)
      db_top = doc.height / 5;
    reasyHouseDiv.style.top = db_top + 'px';
    var db_left = com.reasy.reasy_db.singleton().left();
    if (db_left < -100)
      db_left = doc.width / 5;
    reasyHouseDiv.style.left = db_left + 'px';
    var db_height = com.reasy.reasy_db.singleton().height();
    if (db_height <= 0)
      db_height = db_top * 3;
    reasyHouseDiv.style.height = db_height + 'px';
    var db_width = com.reasy.reasy_db.singleton().width();
    if (db_width <= 0)
      db_width = db_left * 3;
    reasyHouseDiv.style.width = db_width + 'px';
    reasyHouseDiv.style.zIndex = 10;
    com.reasy.reasy_db.singleton().bkgColor(reasyHouseDiv);
    com.reasy.reasy_db.singleton().txtColor(reasyHouseDiv);

    var menuDiv = doc.createElement('div');
    menuDiv.style.fontSize = '16px';
    menuDiv.style.fontFamily = 'Verdana';
    menuDiv.style.color = 'silver';
    menuDiv.style.padding = '10px';
    reasyHouseDiv.appendChild(menuDiv);

    var background_opacity = com.reasy.reasy_db.singleton().dim_background();
    if (0 == background_opacity) {
      // create menu/close button div
      var closeButton = doc.createElement('button');
      closeButton.onmouseup = function(evt) { com.reasy.reasy.close(evt, reasyHouseDiv); };
      closeButton.style.cursor = 'default';
      closeButton.appendChild(doc.createTextNode('x'));
      closeButton.style.width = '20px';
      closeButton.style.height = '20px';
      closeButton.style.cssFloat = 'left';
      closeButton.style.fontWeight = 'bold';
      closeButton.style.borderStyle = 'none';
      menuDiv.appendChild(closeButton);
    }
    else {
      //cover background with opaque overlay
      var opaque_bg = doc.createElement('div');
      opaque_bg.onmouseup = function(evt) { com.reasy.reasy.close(evt, reasyHouseDiv); };
      opaque_bg.style.width = '100%';
      opaque_bg.style.height = '100%';
      opaque_bg.style.position = 'fixed';
      opaque_bg.style.top = '0px';
      opaque_bg.style.left = '0px';
      opaque_bg.style.opacity = parseFloat(background_opacity) / 100.0;
      opaque_bg.style.zIndex = 9;
      com.reasy.reasy_db.singleton().bkgColor(opaque_bg);
      opaque_bg.setAttribute('id', com.reasy.reasy.opaqueBGName);
      com.reasy.reasy.setOrReplaceNode(com.reasy.reasy.opaqueBGName, opaque_bg);
    }

    // make settings text div
    var settingsDiv = doc.createElement('div');
    com.reasy.reasy_db.singleton().txtColor(settingsDiv);
    settingsDiv.style.fontSize = '16px';
    settingsDiv.style.fontWeight = 'bold';
    settingsDiv.style.fontFamily = 'Tahoma';

    //wpm
    var wpmDiv = doc.createElement('div');
    var reasyWPMText = doc.createTextNode(com.reasy.reasy_db.singleton().wpm());
    {
      var incWpmDiv = doc.createElement('div');
      incWpmDiv.onmousedown = function() { com.reasy.reasy.incWPM(reasyWPMText); }
      incWpmDiv.appendChild(doc.createTextNode('+'));
      incWpmDiv.style.cursor = 'default';
      wpmDiv.appendChild(incWpmDiv);
    }

    wpmDiv.appendChild(reasyWPMText);
    wpmDiv.style.padding = '10px';

    var decWpmDiv = doc.createElement('div');
    decWpmDiv.onmousedown = function() { com.reasy.reasy.decWPM(reasyWPMText); }
    decWpmDiv.appendChild(doc.createTextNode('-'));
    decWpmDiv.style.cursor = 'default';
    wpmDiv.appendChild(decWpmDiv);
    settingsDiv.appendChild(wpmDiv)
    //fixation
    var reasyFixationText = doc.createTextNode(com.reasy.reasy_db.singleton().fixation());
    var fixationDiv = doc.createElement('div');

    var incFixationDiv = doc.createElement('div');
    incFixationDiv.onmousedown = function() { com.reasy.reasy.incFixation(reasyFixationText); }
    incFixationDiv.style.cursor = 'default';
    incFixationDiv.appendChild(doc.createTextNode('+'));
    fixationDiv.appendChild(incFixationDiv);

    fixationDiv.appendChild(reasyFixationText);
    fixationDiv.style.padding = '10px';

    var decFixationDiv = doc.createElement('div');
    decFixationDiv.onmousedown = function() { com.reasy.reasy.decFixation(reasyFixationText); }
    decFixationDiv.style.cursor = 'default';
    decFixationDiv.appendChild(doc.createTextNode('-'));
    fixationDiv.appendChild(decFixationDiv);
    settingsDiv.appendChild(fixationDiv);

    //add settings to reasy house
    reasyHouseDiv.appendChild(settingsDiv);

    // make reasy text div
    var reasyDiv = new Array();
    reasyDiv[0] = doc.createTextNode(' ');
    var pre_post_mode = com.reasy.reasy_db.singleton().pre_post();
    if (pre_post_mode) {
      reasyDiv[1] = doc.createTextNode(' ');
      reasyDiv[2] = doc.createTextNode(' ');
    }

    var reasyReader = new com.reasy.reasy_reader.reader(reasySplit, reasyDiv, pre_post_mode, com.reasy.reasy_db.singleton().skip_count());

    var paddingDiv = doc.createElement('div');
    paddingDiv.style.height = '38%';
    reasyHouseDiv.appendChild(paddingDiv);

    var bwidth = com.reasy.reasy_db.singleton().get_text_border();
    for (i = 0; i < reasyDiv.length; i++) {
      var textDiv = doc.createElement('div');
      com.reasy.reasy_db.singleton().txtColor(textDiv);
      textDiv.style.clear = 'both';
      textDiv.style.cssFloat = 'left';
      textDiv.style.width = '100%';
      textDiv.style.fontSize = com.reasy.reasy_db.singleton().fontSize();
      textDiv.style.fontFamily = com.reasy.reasy_db.singleton().fontFamily();
      if (!pre_post_mode)
        textDiv.style.textAlign = 'center';
      else {
        textDiv.style.textAlign = 'left';
        textDiv.style.position = 'relative';
        if (com.reasy.reasy_db.singleton().live_ink())
          textDiv.style.left = db_left + 50 * (i - 1) + 'px';
        else
          textDiv.style.left = db_left - 50 + 'px';

        if (0 == i % 2)	// set opacity of leading and trailing lines
        {
          var opacity = com.reasy.reasy_db.singleton().multi_line_opacity();
          if (opacity > 0)
            textDiv.style.opacity = parseFloat() / 100.0;
        }
        textDiv.style.padding = bwidth;
      }
      textDiv.appendChild(reasyDiv[i]);
      textDiv.onmousedown = function() { reasyReader.playPause(); };
      textDiv.style.cursor = 'default';
      reasyHouseDiv.appendChild(textDiv);
    }

    reasyHouseDiv.onmousedown = function(evt) { com.reasy.reasy.houseClicked(evt, reasyHouseDiv); };
    reasyHouseDiv.onmouseup = function(evt) { com.reasy.reasy.mouseUp(evt, reasyHouseDiv); };
    reasyHouseDiv.onmouseover = function(evt) { com.reasy.reasy.mouseOver(evt, reasyHouseDiv); };

    com.reasy.reasy.setOrReplaceNode(com.reasy.reasy.houseDivName, reasyHouseDiv);

    com.reasy.reasy.keyFn = function() { reasyReader.playPause(); };
    com.reasy.reasy.fwdFn = function() { reasyReader.fwd(); };
    com.reasy.reasy.backFn = function() { reasyReader.back(); };
    if (com.reasy.reasy_db.singleton().auto_play())
      reasyReader.playPause(); ;
  },

  select: function() {
    // get the text content if there is not an existing reasy session
    if (content && content.document && !content.document.getElementById(com.reasy.reasy.houseDivName)) {
      var gotText = com.reasy.reasy.getIFrameSelection(content.document);

      if (gotText) {
        var split = gotText.split(/[-\u2013\u2014\s]/gi);
        if (split && split.length >= com.reasy.reasy_db.singleton().minWords()) {
          com.reasy.reasy.createDom(document, split);
        }
      }
    }
  },

  keyDown: function(evt) {
    if (com.reasy.reasy_db.singleton().action_key().charCodeAt(0) == evt.which)
      com.reasy.reasy.keyFn();
    else if ((com.reasy.reasy_db.singleton().fwd_key().charCodeAt(0) == evt.which) && com.reasy.reasy.fwdFn)
      com.reasy.reasy.fwdFn();
    else if ((com.reasy.reasy_db.singleton().back_key().charCodeAt(0) == evt.which) && com.reasy.reasy.backFn)
      com.reasy.reasy.backFn();
  },

  windowFocus: function(evt) {
    if (!com.reasy.reasy.keyFn)
      com.reasy.reasy.keyFn = com.reasy.reasy.select;
    if (com.reasy.reasy_db.singleton().auto_popup())
      content.document.addEventListener("mouseup", com.reasy.reasy.select, false);
    content.document.addEventListener("keydown", com.reasy.reasy.keyDown, false);
  },

  windowUnload: function(evt) {
    content.document.removeEventListener("mouseup", com.reasy.reasy.select, false);
    content.document.removeEventListener("keydown", com.reasy.reasy.keyDown, false);
  }
}

com.reasy.reasy.XY.prototype.getX = function() {
    return this.x;
}

com.reasy.reasy.XY.prototype.getY = function() {
    return this.y;
}

com.reasy.reasy.XY.prototype.change = function(x, y) {
    this.x = x;
    this.y = y;
}

com.reasy.reasy.XY.prototype.diff_coords = function(x, y) {
    return this.x != x || this.y != y;
}

//alert("reasy2");

window.addEventListener("focus", com.reasy.reasy.windowFocus, true);
window.addEventListener("unload", com.reasy.reasy.windowUnload, true);
