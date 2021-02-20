(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"titlecard_atlas_1", frames: [[1151,141,55,55],[1151,0,139,139],[0,0,1149,748]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_4 = function() {
	this.initialize(ss["titlecard_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["titlecard_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["titlecard_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(-13.65,-13.65,0.1977,0.1977);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.6,-13.6,27.5,27.5);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween6("synched",0);
	this.instance.setTransform(15.7,58.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:2.5292,scaleY:2.5292,alpha:0},23).wait(1));

	// Layer_1
	this.instance_1 = new lib.CachedBmp_4();
	this.instance_1.setTransform(2,46,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(24));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.8,24.2,69.5,69.5);


// stage content:
(lib.titlecard = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,71];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_71 = function() {
		this.stop()
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(71).call(this.frame_71).wait(1));

	// GFC
	this.text = new cjs.Text("Covid-19 Pandemic 2020", "18px 'Helvetica'", "#CC3300");
	this.text.textAlign = "right";
	this.text.lineHeight = 20;
	this.text.lineWidth = 126;
	this.text.parent = this;
	this.text.setTransform(623.4,54.85);

	this.text_1 = new cjs.Text("Global Financial Crisis 2008/2009", "18px 'Helvetica'", "#CC3300");
	this.text_1.textAlign = "right";
	this.text_1.lineHeight = 20;
	this.text_1.lineWidth = 126;
	this.text_1.parent = this;
	this.text_1.setTransform(551.9,252.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.text_1},{t:this.text}]},44).wait(28));

	// WWII
	this.text_2 = new cjs.Text("World War II 1939-1946", "18px 'Helvetica'", "#CC3300");
	this.text_2.textAlign = "right";
	this.text_2.lineHeight = 20;
	this.text_2.lineWidth = 126;
	this.text_2.parent = this;
	this.text_2.setTransform(397.75,221.8);
	this.text_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.text_2).wait(24).to({_off:false},0).wait(48));

	// GD
	this.text_3 = new cjs.Text("Great Depression 1930s", "18px 'Helvetica'", "#CC3300");
	this.text_3.lineHeight = 20;
	this.text_3.lineWidth = 169;
	this.text_3.parent = this;
	this.text_3.setTransform(271.7,145.65);
	this.text_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.text_3).wait(20).to({_off:false},0).wait(52));

	// WWI
	this.text_4 = new cjs.Text("World War I 1914-1918", "18px 'Helvetica'", "#CC3300");
	this.text_4.textAlign = "right";
	this.text_4.lineHeight = 20;
	this.text_4.lineWidth = 126;
	this.text_4.parent = this;
	this.text_4.setTransform(180,179.8);
	this.text_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.text_4).wait(16).to({_off:false},0).wait(56));

	// circles
	this.instance = new lib.Symbol1();
	this.instance.setTransform(600.55,66.5,1,1,0,0,0,13.7,13.7);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(47).to({_off:false},0).to({alpha:1},24).wait(1));

	// text2
	this.text_5 = new cjs.Text("How does the effect of Covid-19 Pandemic compare to the great recessions in history?", "18px 'Helvetica'", "#595959");
	this.text_5.lineHeight = 20;
	this.text_5.lineWidth = 402;
	this.text_5.parent = this;
	this.text_5.setTransform(18.3,82.8);

	this.timeline.addTween(cjs.Tween.get(this.text_5).wait(72));

	// text1
	this.text_6 = new cjs.Text("Covid-19: Unprecedented Global Recessions", "bold 30px 'Helvetica'", "#595959");
	this.text_6.lineHeight = 32;
	this.text_6.lineWidth = 383;
	this.text_6.parent = this;
	this.text_6.setTransform(14.65,9.85);

	this.timeline.addTween(cjs.Tween.get(this.text_6).wait(72));

	// Layer_4 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AgofJMAAAg+RIBRAAMAAAA+Rg");
	var mask_graphics_1 = new cjs.Graphics().p("AhnfJMAAAg+RIDPAAMAAAA+Rg");
	var mask_graphics_2 = new cjs.Graphics().p("AimfIMAAAg+PIFNAAMAAAA+Pg");
	var mask_graphics_3 = new cjs.Graphics().p("AjlfIMAAAg+PIHLAAMAAAA+Pg");
	var mask_graphics_4 = new cjs.Graphics().p("AkkfJMAAAg+RIJJAAMAAAA+Rg");
	var mask_graphics_5 = new cjs.Graphics().p("AljfJMAAAg+RILHAAMAAAA+Rg");
	var mask_graphics_6 = new cjs.Graphics().p("AmhfJMAAAg+RINDAAMAAAA+Rg");
	var mask_graphics_7 = new cjs.Graphics().p("AngfJMAAAg+RIPBAAMAAAA+Rg");
	var mask_graphics_8 = new cjs.Graphics().p("AoffJMAAAg+RIQ/AAMAAAA+Rg");
	var mask_graphics_9 = new cjs.Graphics().p("ApefIMAAAg+PIS9AAMAAAA+Pg");
	var mask_graphics_10 = new cjs.Graphics().p("AqdfJMAAAg+RIU7AAMAAAA+Rg");
	var mask_graphics_11 = new cjs.Graphics().p("ArcfJMAAAg+RIW5AAMAAAA+Rg");
	var mask_graphics_12 = new cjs.Graphics().p("AsbfJMAAAg+RIY3AAMAAAA+Rg");
	var mask_graphics_13 = new cjs.Graphics().p("AtafJMAAAg+RIa1AAMAAAA+Rg");
	var mask_graphics_14 = new cjs.Graphics().p("AuYfJMAAAg+RIcxAAMAAAA+Rg");
	var mask_graphics_15 = new cjs.Graphics().p("AvXfJMAAAg+RIevAAMAAAA+Rg");
	var mask_graphics_16 = new cjs.Graphics().p("AwWfIMAAAg+PMAgtAAAMAAAA+Pg");
	var mask_graphics_17 = new cjs.Graphics().p("AxVfJMAAAg+RMAirAAAMAAAA+Rg");
	var mask_graphics_18 = new cjs.Graphics().p("AyUfIMAAAg+PMAkpAAAMAAAA+Pg");
	var mask_graphics_19 = new cjs.Graphics().p("AzTfJMAAAg+RMAmnAAAMAAAA+Rg");
	var mask_graphics_20 = new cjs.Graphics().p("A0SfJMAAAg+RMAolAAAMAAAA+Rg");
	var mask_graphics_21 = new cjs.Graphics().p("A1QfJMAAAg+RMAqhAAAMAAAA+Rg");
	var mask_graphics_22 = new cjs.Graphics().p("A2PfJMAAAg+RMAsfAAAMAAAA+Rg");
	var mask_graphics_23 = new cjs.Graphics().p("A3OfJMAAAg+RMAudAAAMAAAA+Rg");
	var mask_graphics_24 = new cjs.Graphics().p("A4NfJMAAAg+RMAwbAAAMAAAA+Rg");
	var mask_graphics_25 = new cjs.Graphics().p("A5MfJMAAAg+RMAyZAAAMAAAA+Rg");
	var mask_graphics_26 = new cjs.Graphics().p("A6LfJMAAAg+RMA0XAAAMAAAA+Rg");
	var mask_graphics_27 = new cjs.Graphics().p("A7KfJMAAAg+RMA2VAAAMAAAA+Rg");
	var mask_graphics_28 = new cjs.Graphics().p("A8JfJMAAAg+RMA4TAAAMAAAA+Rg");
	var mask_graphics_29 = new cjs.Graphics().p("A9HfJMAAAg+RMA6PAAAMAAAA+Rg");
	var mask_graphics_30 = new cjs.Graphics().p("A+GfJMAAAg+RMA8NAAAMAAAA+Rg");
	var mask_graphics_31 = new cjs.Graphics().p("A/FfJMAAAg+RMA+LAAAMAAAA+Rg");
	var mask_graphics_32 = new cjs.Graphics().p("EggEAfJMAAAg+RMBAJAAAMAAAA+Rg");
	var mask_graphics_33 = new cjs.Graphics().p("EghDAfJMAAAg+RMBCHAAAMAAAA+Rg");
	var mask_graphics_34 = new cjs.Graphics().p("EgiCAfJMAAAg+RMBEFAAAMAAAA+Rg");
	var mask_graphics_35 = new cjs.Graphics().p("EgjBAfJMAAAg+RMBGDAAAMAAAA+Rg");
	var mask_graphics_36 = new cjs.Graphics().p("EgkAAfJMAAAg+RMBIBAAAMAAAA+Rg");
	var mask_graphics_37 = new cjs.Graphics().p("Egk+AfJMAAAg+RMBJ9AAAMAAAA+Rg");
	var mask_graphics_38 = new cjs.Graphics().p("Egl9AfJMAAAg+RMBL7AAAMAAAA+Rg");
	var mask_graphics_39 = new cjs.Graphics().p("Egm8AfJMAAAg+RMBN5AAAMAAAA+Rg");
	var mask_graphics_40 = new cjs.Graphics().p("Egn7AfJMAAAg+RMBP3AAAMAAAA+Rg");
	var mask_graphics_41 = new cjs.Graphics().p("Ego6AfJMAAAg+RMBR1AAAMAAAA+Rg");
	var mask_graphics_42 = new cjs.Graphics().p("Egp5AfJMAAAg+RMBTzAAAMAAAA+Rg");
	var mask_graphics_43 = new cjs.Graphics().p("Egq4AfJMAAAg+RMBVxAAAMAAAA+Rg");
	var mask_graphics_44 = new cjs.Graphics().p("Egr3AfJMAAAg+RMBXvAAAMAAAA+Rg");
	var mask_graphics_45 = new cjs.Graphics().p("Egs1AfJMAAAg+RMBZrAAAMAAAA+Rg");
	var mask_graphics_46 = new cjs.Graphics().p("Egt0AfJMAAAg+RMBbpAAAMAAAA+Rg");
	var mask_graphics_47 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_48 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_49 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_50 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_51 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_52 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_53 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_54 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_55 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_56 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_57 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_58 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_59 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_60 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_61 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_62 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_63 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_64 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_65 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_66 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_67 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_68 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_69 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_70 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");
	var mask_graphics_71 = new cjs.Graphics().p("EguzAfJMAAAg+RMBdnAAAMAAAA+Rg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:12.4002,y:254.0997}).wait(1).to({graphics:mask_graphics_1,x:18.6507,y:255.9501}).wait(1).to({graphics:mask_graphics_2,x:24.9012,y:257.8}).wait(1).to({graphics:mask_graphics_3,x:31.1521,y:259.6999}).wait(1).to({graphics:mask_graphics_4,x:37.4026,y:261.5499}).wait(1).to({graphics:mask_graphics_5,x:43.6531,y:263.4003}).wait(1).to({graphics:mask_graphics_6,x:49.9037,y:265.2498}).wait(1).to({graphics:mask_graphics_7,x:56.1541,y:267.1497}).wait(1).to({graphics:mask_graphics_8,x:62.4042,y:269.0001}).wait(1).to({graphics:mask_graphics_9,x:68.6551,y:270.85}).wait(1).to({graphics:mask_graphics_10,x:74.9056,y:272.7}).wait(1).to({graphics:mask_graphics_11,x:81.2561,y:274.5999}).wait(1).to({graphics:mask_graphics_12,x:87.5066,y:276.4503}).wait(1).to({graphics:mask_graphics_13,x:93.7075,y:278.2998}).wait(1).to({graphics:mask_graphics_14,x:99.9576,y:280.1502}).wait(1).to({graphics:mask_graphics_15,x:106.2081,y:281.9997}).wait(1).to({graphics:mask_graphics_16,x:112.4586,y:283.9}).wait(1).to({graphics:mask_graphics_17,x:118.7091,y:285.75}).wait(1).to({graphics:mask_graphics_18,x:124.9596,y:287.6}).wait(1).to({graphics:mask_graphics_19,x:131.2106,y:289.4499}).wait(1).to({graphics:mask_graphics_20,x:137.461,y:291.3498}).wait(1).to({graphics:mask_graphics_21,x:143.7115,y:293.2002}).wait(1).to({graphics:mask_graphics_22,x:149.962,y:295.0497}).wait(1).to({graphics:mask_graphics_23,x:156.2125,y:295.4997}).wait(1).to({graphics:mask_graphics_24,x:162.463,y:295.9497}).wait(1).to({graphics:mask_graphics_25,x:168.7635,y:296.3997}).wait(1).to({graphics:mask_graphics_26,x:174.964,y:296.8002}).wait(1).to({graphics:mask_graphics_27,x:181.2145,y:297.2502}).wait(1).to({graphics:mask_graphics_28,x:187.4651,y:297.7002}).wait(1).to({graphics:mask_graphics_29,x:193.7155,y:298.1502}).wait(1).to({graphics:mask_graphics_30,x:200.0164,y:298.6002}).wait(1).to({graphics:mask_graphics_31,x:206.2165,y:299.0502}).wait(1).to({graphics:mask_graphics_32,x:212.467,y:299.4498}).wait(1).to({graphics:mask_graphics_33,x:218.7675,y:299.8998}).wait(1).to({graphics:mask_graphics_34,x:224.9685,y:300.3498}).wait(1).to({graphics:mask_graphics_35,x:231.1686,y:300.7998}).wait(1).to({graphics:mask_graphics_36,x:237.469,y:301.2498}).wait(1).to({graphics:mask_graphics_37,x:243.6696,y:301.6998}).wait(1).to({graphics:mask_graphics_38,x:249.97,y:302.1003}).wait(1).to({graphics:mask_graphics_39,x:256.1711,y:302.5503}).wait(1).to({graphics:mask_graphics_40,x:262.4215,y:303.0003}).wait(1).to({graphics:mask_graphics_41,x:268.722,y:303.4503}).wait(1).to({graphics:mask_graphics_42,x:274.9221,y:303.9003}).wait(1).to({graphics:mask_graphics_43,x:281.1726,y:304.3503}).wait(1).to({graphics:mask_graphics_44,x:287.4735,y:304.7499}).wait(1).to({graphics:mask_graphics_45,x:293.674,y:305.1999}).wait(1).to({graphics:mask_graphics_46,x:299.9745,y:305.6499}).wait(1).to({graphics:mask_graphics_47,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_48,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_49,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_50,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_51,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_52,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_53,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_54,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_55,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_56,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_57,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_58,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_59,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_60,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_61,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_62,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_63,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_64,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_65,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_66,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_67,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_68,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_69,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_70,x:307.9251,y:306.0999}).wait(1).to({graphics:mask_graphics_71,x:307.9251,y:306.0999}).wait(1));

	// chart
	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(32.55,115.9,0.5,0.5);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(47).to({y:114.9},0).wait(25));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(332.7,257.9,292.7,232);
// library properties:
lib.properties = {
	id: 'B1D262F85FCD4E9C8704F73B6BF97DB2',
	width: 640,
	height: 500,
	fps: 24,
	color: "#F4F0F0",
	opacity: 1.00,
	manifest: [
		{src:"images/titlecard_atlas_1.png", id:"titlecard_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['B1D262F85FCD4E9C8704F73B6BF97DB2'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;