function reasy_reader(txt, reasyHtml, pre_post_mode)
{
  this.txt = txt;
  this.reasyHtml = reasyHtml;
  this.position = 0;
  this.last_punc_position = 0;
  this.play = false;
  this.set_node_text();
  this.pre_post_mode = pre_post_mode;
}

reasy_reader.prototype.playPause = function()
{
  this.play = !this.play;
  this.run();
}

reasy_reader.prototype.set_node_text = function()
{
	//the centre text
	var fixation = reasy_db.fixation();
	var textlen = this.txt.length;
	var pos = this.position;
	var txtArray = this.txt;
	var text = txtArray[pos];

	for (i=1; i < fixation && i+pos < textlen; i++)
	{
		text += ' '  + txtArray[pos + i];
	}
	  
	if (!this.pre_post_mode)
		this.reasyHtml[0].nodeValue = text;
	else
	{
		var htmlArray = this.reasyHtml;
		htmlArray[1].nodeValue = text;

		//pre text
		text = ' ';
		var pre_pos_start = pos-fixation;
		for (i=0; i<fixation; i++)
		{
			var pre_pos = pre_pos_start + i;
			if (pre_pos >=0)
			text += txtArray[pre_pos] + ' ';
		}
		htmlArray[0].nodeValue = text;
		
		//post text
		text = ' ';
		var post_pos_start = pos+fixation;
		for (i=0; i<fixation && (post_pos_start + i + 1 < textlen); i++)
		{
			var post_pos = post_pos_start + i;
			text += txtArray[post_pos] + ' ';
		}
		htmlArray[2].nodeValue = text;
	}
	
	return /[\.,:;!\?]/.test(text);
}

reasy_reader.prototype.run = function()
{
  if (this.play)
  {
    var punctuation = this.set_node_text();
	var fixation = reasy_db.fixation();
	var ticker = reasy_db.ticker_tape();
	var textlen = this.txt.length;
	
	if (ticker)
	    this.position += 1;
	else
	    this.position += fixation;

	var position = this.position;
    if ((!ticker && position < (textlen + fixation))
		|| (ticker && ((position + fixation) <= (textlen+1))))
    {
		var time = reasy_db.read_interval();
		if (!ticker)
			time *= fixation;

		if (punctuation && ((position - this.last_punc_position) > fixation))
		{
			time += reasy_db.punc_pause();
			this.last_punc_position = position;
		}

		var self = this;
		this.timeout_call = setTimeout(function(){self.run();}, time);
    }
    else
      reasyClose();
  }
}