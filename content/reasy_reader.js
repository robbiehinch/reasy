
if (!reasy) var reasy = {};

//alert('reasy_reader ->');

(function(){
  reasy.reasy_reader = {

    reader: function(txt, reasyHtml, pre_post_mode, skip_count, close_fn) {
      this.txt = txt;
      this.reasyHtml = reasyHtml;
      this.position = 0;
      this.last_punc_position = 0;
      this.play = false;
      this.set_node_text();
      this.pre_post_mode = pre_post_mode;
      this.skip_count = skip_count;
      this.close_fn = close_fn;
    }
  }

  reasy.reasy_reader.reader.prototype.playPause = function()
  {
    this.play = !this.play;
    this.run();
  }

  reasy.reasy_reader.reader.prototype.set_node_text = function () {
    //the centre text
    var fixation = reasy.reasy_db.singleton().fixation();
    var txtArray = this.txt;
    var textlen = txtArray.length;
    var pos = this.position;
    var text = txtArray[pos];
    var max_write = Math.min(pos + fixation, textlen);

    for (i = pos + 1; i < max_write; i++) {
      text += ' ' + txtArray[i];
    }

    if (!this.pre_post_mode)
      this.reasyHtml[0].nodeValue = text;
    else {
      var htmlArray = this.reasyHtml;
      htmlArray[1].nodeValue = text;

      //pre text
      text = ' ';
      for (i = Math.max(0, pos - fixation); i < pos; i++) {
        text += txtArray[i] + ' ';
      }
      htmlArray[0].nodeValue = text;

      //post text
      text = ' ';
      var post_pos_start = pos + fixation;
      var last_pos = Math.min(textlen, max_write + fixation);
      for (i = max_write; i < last_pos; i++) {
        text += txtArray[i] + ' ';
      }
      htmlArray[2].nodeValue = text;
    }

    return /[\.,:;!\?]/.test(text);
  }

  reasy.reasy_reader.reader.prototype.fwd = function()
  {
	  this.position = Math.min(this.txt.length-1, this.position + this.skip_count);
	  this.set_node_text();
  }

  reasy.reasy_reader.reader.prototype.back = function()
  {
	  this.position = Math.max(0, this.position - this.skip_count);
	  this.set_node_text();
  }

  reasy.reasy_reader.reader.prototype.run = function()
  {
    if (this.play)
    {
      var punctuation = this.set_node_text();
      var db = reasy.reasy_db.singleton();
      var fixation = db.fixation();
      var ticker = db.ticker_tape();
      var textlen = this.txt.length;
    
      if (ticker)
          this.position += 1;
      else
          this.position += fixation;

      var position = this.position;
      if ((!ticker && position < (textlen + fixation))
  		  || (ticker && ((position + fixation) <= (textlen+1))))
      {
		    var time = db.read_interval();
		    if (!ticker)
			    time *= fixation;

		    if (punctuation && ((position - this.last_punc_position) > fixation))
		    {
			    time += db.punc_pause();
			    this.last_punc_position = position;
		    }

		    var self = this;
		    this.timeout_call = setTimeout(function(){self.run();}, time);
      }
      else
        this.close_fn();
    }
  }
}).apply(reasy);

//alert('<- reasy_reader');
