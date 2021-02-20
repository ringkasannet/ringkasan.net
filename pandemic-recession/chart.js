(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


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



(lib.FotoJas3 = function() {
	this.initialize(img.FotoJas3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,482,640);


(lib._05aiAssets = function() {
	this.initialize(img._05aiAssets);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,736,372);


(lib.Artwork2aiAssets = function() {
	this.initialize(img.Artwork2aiAssets);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,33,62);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.world = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._05aiAssets();
	this.instance.setTransform(0,0,0.8146,0.8146);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,599.6,303);


(lib.Tween111 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(89,89,89,0.639)").s().p("AgjBWIgHgBIAAgZIAEAAIAJAAQAEgBADgCQADgBACgHIACgHIgth/IAkAAIAZBZIAahZIAiAAIgqB4QgNAjgGAHQgHAJgVAAg");
	this.shape.setTransform(162.475,18.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(89,89,89,0.639)").s().p("AA3A/IAAhOQAAgGgCgFQgFgIgLAAQgNgBgGALQgCAHAAAIIAABIIgfAAIAAhIQAAgLgDgFQgEgJgLAAQgOAAgFAJQgCAFAAAKIAABJIghAAIAAh6IAfAAIAAASQAGgKAFgDQAKgIAPABQAOgBAHAHQAHAGAEAIQAGgKAJgGQAKgEAMAAQAJAAAHACQAIADAHAIQAFAHACAJIABASIAABNg");
	this.shape_1.setTransform(145.925,16.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(89,89,89,0.639)").s().p("AguAuQgPgTAAgbQAAgZAPgUQAQgTAeAAQAfAAAQATQAPAUAAAZQAAAbgPATQgQATgfAAQgeAAgQgTgAgVgbQgHAKgBARQABATAHAKQAIAKANAAQAOAAAIgKQAHgKAAgTQAAgRgHgKQgIgKgOAAQgNAAgIAKg");
	this.shape_2.setTransform(128.7,16.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(89,89,89,0.639)").s().p("AAXA/IAAhKQAAgJgDgGQgFgJgNAAQgPAAgGAOQgDAHAAALIAABCIggAAIAAh5IAfAAIAAARQAGgJAGgEQAJgIAPAAQASAAAMAKQAMAKAAAXIAABSg");
	this.shape_3.setTransform(114.725,16.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(89,89,89,0.639)").s().p("AguAuQgPgTgBgbQABgZAPgUQAQgTAeAAQAfAAAQATQAPAUAAAZQAAAbgPATQgQATgfAAQgeAAgQgTgAgVgbQgIAKAAARQAAATAIAKQAIAKANAAQAOAAAIgKQAHgKAAgTQAAgRgHgKQgIgKgOAAQgNAAgIAKg");
	this.shape_4.setTransform(100.7,16.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(89,89,89,0.639)").s().p("AgpAvQgPgRAAgcQAAgfAQgRQAPgSAbAAQAWAAAPALQAPAKADAaIgiAAQAAgHgEgFQgFgIgLAAQgQAAgGARQgDAIAAANQAAAOADAIQAGAPAPAAQALAAAFgGQAEgGABgKIAhAAQgBAPgJANQgPAVgeAAQgcAAgOgSg");
	this.shape_5.setTransform(87.4,16.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(89,89,89,0.639)").s().p("AgpAyQgTgPAAgiQAAgfARgRQARgRAaAAQAQAAAMAGQANAGAJAMQAHALACAOQACAJgBAPIhYAAQABASAMAHQAHAFAKAAQALAAAGgGQAEgDADgFIAhAAQgCALgKALQgRASgdAAQgYAAgSgPgAAbgMQgBgMgHgHQgIgHgLAAQgMAAgGAHQgHAIgCALIA2AAIAAAAg");
	this.shape_6.setTransform(74.8063,16.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(89,89,89,0.639)").s().p("AgPBTIAAilIAfAAIAAClg");
	this.shape_7.setTransform(58.65,14.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(89,89,89,0.639)").s().p("AguA3QgKgJgBgSQAAgWASgJQAKgGASgCIALgCQAIgBAEgCQAHgCAAgHQAAgHgFgDQgGgDgJAAQgLAAgFAGQgDAEgCAHIgeAAQAAgQAJgKQAMgRAfAAQATAAAQAIQAQAIAAAWIAAA4IAAAOQABAGABACQACADACABIAAAFIgiAAIgCgHIgBgIQgGAIgKAFQgJAGgNAAQgQAAgMgKgAANAEIgJADIgGABQgLACgEACQgHAFAAAJQgBAIAFAEQAFADAHAAQAJAAAJgGQAJgGAAgQIAAgMg");
	this.shape_8.setTransform(49.15,16.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(89,89,89,0.639)").s().p("AgPBOQgGgEgGgIIAAAPIggAAIAAikIAhAAIAAA6QAFgIAIgFQAIgFANAAQAYAAAOARQANASAAAaQAAAcgNAUQgOATgXAAQgPAAgJgHgAgYAAQgEAIAAAOQABAPAGALQAIAKANAAQANAAAGgKQAHgKAAgQQAAgOgEgIQgGgPgQAAQgRAAgHAPg");
	this.shape_9.setTransform(36.1,14.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(89,89,89,0.639)").s().p("AguAuQgQgTAAgbQAAgZAQgUQAQgTAeAAQAgAAAPATQAPAUAAAZQAAAbgPATQgPATggAAQgeAAgQgTgAgUgbQgJAKABARQgBATAJAKQAHAKANAAQAOAAAIgKQAHgKAAgTQAAgRgHgKQgIgKgOAAQgNAAgHAKg");
	this.shape_10.setTransform(21.75,16.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(89,89,89,0.639)").s().p("AgPBTIAAilIAfAAIAAClg");
	this.shape_11.setTransform(11.55,14.025);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(89,89,89,0.639)").s().p("AgnBPQgOgKgCgSIAjAAQABAGADACQAFAFALAAQARAAAHgMQADgHAAgSIAAgIQgEAIgGAEQgJAHgPAAQgXAAgOgQQgOgRAAgbQAAgbANgTQAOgTAZAAQAIAAAHADQAMAFAHANIAAgSIAfAAIAABzQAAAYgIAMQgOAVgmAAQgXAAgPgJgAgVgrQgEAJAAAMQAAALAEAIQAHAOAPAAQALAAAIgIQAHgHAAgTQABgRgIgKQgHgJgNAAQgPAAgGAQg");
	this.shape_12.setTransform(1.05,18.525);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(89,89,89,0.639)").s().p("AgQBUIAAhiIgSAAIAAgXIARAAIAAgIQAAgTAHgIQAHgKAZgBIAGAAIAHABIAAAaIgJgBQgHAAgCADQgDADAAAEIAAAKIAVAAIAAAXIgVAAIAABig");
	this.shape_13.setTransform(-15.825,13.95);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(89,89,89,0.639)").s().p("AguAuQgQgTAAgbQAAgZAQgUQAPgTAfAAQAgAAAPATQAQAUAAAZQAAAbgQATQgPATggAAQgfAAgPgTgAgUgbQgIAKAAARQAAATAIAKQAHAKANAAQAOAAAHgKQAIgKAAgTQAAgRgIgKQgHgKgOAAQgNAAgHAKg");
	this.shape_14.setTransform(-26.6,16.175);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(89,89,89,0.639)").s().p("AgsBDQgPgRAAgbQAAgfAPgSQAOgSAYAAQAKAAAJAFQAJAFAFAJIAAg7IAhAAIAAClIggAAIAAgRQgGALgJAFQgJAFgMAAQgVAAgPgSgAgTgFQgHAKAAAPQAAARAHALQAHAKAMAAQAOAAAHgKQAHgLAAgQQAAgVgLgKQgHgGgJAAQgOAAgGALg");
	this.shape_15.setTransform(-47.275,14.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(89,89,89,0.639)").s().p("AguAuQgQgTAAgbQAAgZAQgUQAPgTAfAAQAfAAAQATQAPAUAAAZQAAAbgPATQgQATgfAAQgfAAgPgTgAgUgbQgJAKAAARQAAATAJAKQAHAKANAAQAOAAAIgKQAHgKAAgTQAAgRgHgKQgIgKgOAAQgNAAgHAKg");
	this.shape_16.setTransform(-60.95,16.175);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(89,89,89,0.639)").s().p("AgPBTIAAh5IAfAAIAAB5gAgPg1IAAgdIAfAAIAAAdg");
	this.shape_17.setTransform(-71.125,13.975);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(89,89,89,0.639)").s().p("AgjA/IAAh6IAfAAIAAAWQAHgNAFgEQAJgIAPAAIABABIACAAIAAAgIgFAAIgEAAQgTAAgHAMQgCAIAAANIAAA7g");
	this.shape_18.setTransform(-78.25,16.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(89,89,89,0.639)").s().p("AgpAyQgTgPAAgiQAAgfARgRQARgRAaAAQAQAAAMAGQANAGAJAMQAHALACAOQACAJgBAPIhYAAQABASAMAHQAHAFAKAAQALAAAGgGQAEgDADgFIAhAAQgCALgKALQgRASgdAAQgYAAgSgPgAAbgMQgBgMgHgHQgIgHgLAAQgMAAgGAHQgHAIgCALIA2AAIAAAAg");
	this.shape_19.setTransform(-89.3937,16.225);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(89,89,89,0.639)").s().p("Ag7BWIAAipIAfAAIAAASQAGgIAFgEQALgJAOABQAWAAAPAPQAPAQAAAfQAAAfgPARQgPARgXAAQgNAAgLgIQgEgEgGgHIAAA/gAgZgpQgDAJAAANQAAAUALAJQAIAFAJAAQAMAAAHgKQAIgKAAgRQgBgOgGgLQgHgLgNAAQgSAAgHARg");
	this.shape_20.setTransform(-102.65,18.45);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(89,89,89,0.639)").s().p("AA3A/IAAhOQAAgGgCgFQgFgIgLAAQgNgBgGALQgCAHAAAIIAABIIgfAAIAAhIQAAgLgDgFQgEgJgLAAQgOAAgFAJQgCAFAAAKIAABJIghAAIAAh6IAfAAIAAASQAGgKAFgDQAKgIAPABQAOgBAHAHQAHAGAEAIQAGgKAJgGQAKgEAMAAQAJAAAHACQAIADAHAIQAFAHACAJIABASIAABNg");
	this.shape_21.setTransform(-126.575,16.05);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(89,89,89,0.639)").s().p("AgPBTIAAilIAfAAIAAClg");
	this.shape_22.setTransform(-140,14.025);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(89,89,89,0.639)").s().p("AguA3QgLgJAAgSQAAgWASgJQAKgGASgCIALgCQAIgBAFgCQAGgCAAgHQAAgHgFgDQgFgDgKAAQgLAAgFAGQgDAEgBAHIggAAQACgQAHgKQANgRAfAAQAUAAAPAIQAQAIAAAWIAAA4IAAAOQABAGABACQACADADABIAAAFIgjAAIgCgHIgBgIQgGAIgJAFQgKAGgNAAQgQAAgMgKgAANAEIgJADIgGABQgLACgEACQgIAFABAJQgBAIAFAEQAFADAGAAQAKAAAJgGQAJgGAAgQIAAgMg");
	this.shape_23.setTransform(-149.5,16.225);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(89,89,89,0.639)").s().p("AgpAvQgOgRgBgcQAAgfAQgRQAPgSAaAAQAXAAAPALQAPAKADAaIghAAQgBgHgEgFQgGgIgKAAQgQAAgGARQgDAIAAANQAAAOADAIQAGAPAPAAQALAAAEgGQAGgGABgKIAgAAQgBAPgKANQgPAVgdAAQgcAAgOgSg");
	this.shape_24.setTransform(-162.2,16.225);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(89,89,89,0.639)").s().p("AgpAyQgTgPAAgiQAAgfARgRQARgRAaAAQAQAAAMAGQANAGAJAMQAHALACAOQACAJgBAPIhYAAQABASAMAHQAHAFAKAAQALAAAGgGQAEgDADgFIAhAAQgCALgKALQgRASgdAAQgYAAgSgPgAAbgMQgBgMgHgHQgIgHgLAAQgMAAgGAHQgHAIgCALIA2AAIAAAAg");
	this.shape_25.setTransform(162.7563,-15.925);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(89,89,89,0.639)").s().p("AgpA1QgOgMAAgTIAhAAQABAIACAEQAHAGAPABQAJAAAGgEQAFgCAAgGQAAgFgEgDQgEgDgcgGQgVgGgJgHQgJgHABgOQAAgSANgMQANgMAYAAQAXAAAOAJQAOAJACAXIgfAAQgBgGgDgEQgGgGgLAAQgLgBgEAEQgEADgBAEQABAGAEADQAFACAbAHQAUAEAKAIQAJAJAAAOQAAASgOALQgNAMgdAAQgbAAgOgMg");
	this.shape_26.setTransform(149.75,-15.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(89,89,89,0.639)").s().p("AgPBTIAAh5IAfAAIAAB5gAgPg1IAAgdIAfAAIAAAdg");
	this.shape_27.setTransform(140.225,-18.175);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(89,89,89,0.639)").s().p("AATA9IgThYIgTBYIghAAIgih5IAiAAIATBXIAShXIAfAAIATBXIAThXIAhAAIgjB5g");
	this.shape_28.setTransform(128.075,-15.975);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(89,89,89,0.639)").s().p("AgjA/IAAh6IAfAAIAAAWQAHgNAFgEQAJgIAPAAIABABIACAAIAAAgIgFAAIgDAAQgUAAgHAMQgCAIAAANIAAA7g");
	this.shape_29.setTransform(115.25,-16.125);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(89,89,89,0.639)").s().p("AgpAyQgTgPAAgiQAAgfARgRQARgRAaAAQAQAAAMAGQANAGAJAMQAHALACAOQACAJgBAPIhYAAQABASAMAHQAHAFAKAAQALAAAGgGQAEgDADgFIAhAAQgCALgKALQgRASgdAAQgYAAgSgPgAAbgMQgBgMgHgHQgIgHgLAAQgMAAgGAHQgHAIgCALIA2AAIAAAAg");
	this.shape_30.setTransform(104.1063,-15.925);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(89,89,89,0.639)").s().p("AAWBTIAAhLQAAgJgDgGQgEgJgMABQgMgBgHAJQgGAIAAAPIAABDIggAAIAAilIAgAAIAAA7QAHgLAJgEQAIgEAKAAQALAAAKAEQAJADAGAJQAFAGABAIQABAHAAAQIAABIg");
	this.shape_31.setTransform(90.525,-18.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(89,89,89,0.639)").s().p("AgLBHQgFgGAAgLIAAhLIgRAAIAAgXIARAAIAAgiIAeAAIAAAiIAUAAIAAAXIgUAAIAABAQAAAHACACQACACAKAAIADAAIADAAIAAAYIgPAAIgEABQgTAAgHgIg");
	this.shape_32.setTransform(79.525,-17.5447);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("rgba(89,89,89,0.639)").s().p("AguAuQgPgTAAgbQAAgZAPgUQAQgTAeAAQAfAAAQATQAPAUAAAZQAAAbgPATQgQATgfAAQgeAAgQgTgAgVgbQgHAKgBARQABATAHAKQAIAKANAAQAOAAAIgKQAHgKAAgTQAAgRgHgKQgIgKgOAAQgNAAgIAKg");
	this.shape_33.setTransform(68.85,-15.975);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("rgba(89,89,89,0.639)").s().p("AAXA/IAAhKQAAgJgDgGQgFgJgNAAQgPAAgGAOQgDAHAAALIAABCIggAAIAAh5IAfAAIAAARQAGgJAGgEQAJgIAPAAQASAAAMAKQAMAKAAAXIAABSg");
	this.shape_34.setTransform(48.525,-16.125);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("rgba(89,89,89,0.639)").s().p("AgtA3QgLgJAAgSQAAgWARgJQAKgGATgCIAKgCQAJgBADgCQAHgCAAgHQAAgHgFgDQgFgDgJAAQgMAAgFAGQgEAEAAAHIggAAQACgQAHgKQAOgRAeAAQATAAAQAIQAQAIAAAWIAAA4IAAAOQAAAGACACQACADACABIAAAFIgiAAIgCgHIgBgIQgHAIgIAFQgKAGgNAAQgQAAgLgKgAANAEIgJADIgGABQgLACgEACQgIAFAAAJQABAIAEAEQAFADAHAAQAJAAAJgGQAIgGABgQIAAgMg");
	this.shape_35.setTransform(35.15,-15.925);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("rgba(89,89,89,0.639)").s().p("AguAuQgPgTAAgbQAAgZAPgUQAQgTAeAAQAfAAAQATQAPAUABAZQgBAbgPATQgQATgfAAQgeAAgQgTgAgVgbQgHAKgBARQABATAHAKQAIAKANAAQAOAAAHgKQAIgKAAgTQAAgRgIgKQgHgKgOAAQgNAAgIAKg");
	this.shape_36.setTransform(15.4,-15.975);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("rgba(89,89,89,0.639)").s().p("AgLBHQgFgGAAgLIAAhLIgRAAIAAgXIARAAIAAgiIAeAAIAAAiIAUAAIAAAXIgUAAIAABAQAAAHACACQACACAKAAIADAAIADAAIAAAYIgPAAIgEABQgTAAgHgIg");
	this.shape_37.setTransform(4.425,-17.5447);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("rgba(89,89,89,0.639)").s().p("AAXA/IAAhKQAAgJgDgGQgFgJgNAAQgPAAgGAOQgDAHAAALIAABCIggAAIAAh5IAfAAIAAARQAGgJAGgEQAJgIAPAAQASAAAMAKQAMAKAAAXIAABSg");
	this.shape_38.setTransform(-12.575,-16.125);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("rgba(89,89,89,0.639)").s().p("AguAuQgQgTAAgbQAAgZAQgUQAPgTAfAAQAgAAAPATQAQAUAAAZQAAAbgQATQgPATggAAQgfAAgPgTgAgUgbQgIAKAAARQAAATAIAKQAHAKANAAQAOAAAHgKQAIgKAAgTQAAgRgIgKQgHgKgOAAQgNAAgHAKg");
	this.shape_39.setTransform(-26.6,-15.975);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(89,89,89,0.639)").s().p("AgPBTIAAh5IAfAAIAAB5gAgPg1IAAgdIAfAAIAAAdg");
	this.shape_40.setTransform(-36.775,-18.175);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("rgba(89,89,89,0.639)").s().p("AgLBHQgFgGAAgLIAAhLIgRAAIAAgXIARAAIAAgiIAeAAIAAAiIAUAAIAAAXIgUAAIAABAQAAAHACACQACACAKAAIADAAIADAAIAAAYIgPAAIgEABQgTAAgHgIg");
	this.shape_41.setTransform(-43.925,-17.5447);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("rgba(89,89,89,0.639)").s().p("Ag7BXIAAiqIAfAAIAAASQAFgIAHgEQAKgIAOAAQAWAAAPAPQAOAQAAAfQAAAfgOARQgPARgXAAQgNAAgKgIQgFgDgGgIIAABAgAgYgpQgEAJAAANQAAAUAMAJQAGAFAKAAQAMAAAIgKQAGgJABgRQAAgPgHgLQgGgLgOABQgSAAgGAQg");
	this.shape_42.setTransform(-54.25,-13.7);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("rgba(89,89,89,0.639)").s().p("AgpAyQgTgPAAgiQAAgfARgRQARgRAaAAQAQAAAMAGQANAGAJAMQAHALACAOQACAJgBAPIhYAAQABASAMAHQAHAFAKAAQALAAAGgGQAEgDADgFIAhAAQgCALgKALQgRASgdAAQgYAAgSgPgAAbgMQgBgMgHgHQgIgHgLAAQgMAAgGAHQgHAIgCALIA2AAIAAAAg");
	this.shape_43.setTransform(-67.7437,-15.925);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("rgba(89,89,89,0.639)").s().p("AgpAvQgOgRgBgcQAAgfAQgRQAPgSAbAAQAWAAAPALQAPAKADAaIgiAAQAAgHgEgFQgGgIgKAAQgQAAgGARQgDAIAAANQAAAOADAIQAGAPAPAAQALAAAEgGQAGgGAAgKIAhAAQgBAPgKANQgPAVgdAAQgcAAgOgSg");
	this.shape_44.setTransform(-80.65,-15.925);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("rgba(89,89,89,0.639)").s().p("AAVA9IgVglIgVAlIgmAAIApg9Igog8IAnAAIAUAjIAUgjIAmAAIgoA7IApA+g");
	this.shape_45.setTransform(-93.5,-15.95);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("rgba(89,89,89,0.639)").s().p("AgpAyQgTgPAAgiQAAgfARgRQARgRAaAAQAQAAAMAGQANAGAJAMQAHALACAOQACAJgBAPIhYAAQABASAMAHQAHAFAKAAQALAAAGgGQAEgDADgFIAhAAQgCALgKALQgRASgdAAQgYAAgSgPgAAbgMQgBgMgHgHQgIgHgLAAQgMAAgGAHQgHAIgCALIA2AAIAAAAg");
	this.shape_46.setTransform(-105.9937,-15.925);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("rgba(89,89,89,0.639)").s().p("AAXA/IAAhKQAAgJgDgGQgFgJgNAAQgPAAgGAOQgDAHAAALIAABCIggAAIAAh5IAfAAIAAARQAGgJAGgEQAJgIAPAAQASAAAMAKQAMAKAAAXIAABSg");
	this.shape_47.setTransform(-125.925,-16.125);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("rgba(89,89,89,0.639)").s().p("AApBTIgLgiIg8AAIgLAiIglAAIA8ilIAmAAIA7ClgAAVAUIgVhAIgUBAIApAAg");
	this.shape_48.setTransform(-141.15,-18.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.8,-29.5,341.70000000000005,59.1);


(lib.Tween110 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgZAgQgHgGAAgKQAAgMAKgGQAGgDAKgBIAGAAIAHgCQAEgCAAgDQAAgFgDgBQgDgCgFAAQgHAAgCADQgCACgBAEIgRAAQAAgJAFgFQAHgKARAAQALAAAJAFQAJAFAAAMIAAAfIAAAIIABAFIADACIAAACIgUAAIgBgDIgBgFIgIAHQgFADgIAAQgJAAgGgEgAAHADIgFABIgDABIgIACQgEACAAAGQAAAFACACQADACAEgBQAFAAAEgDQAFgDABgKIAAgGg");
	this.shape.setTransform(51.575,11.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgTAjIAAhDIARAAIAAAMQADgHADgDQAGgFAIAAIABAAIABABIAAASIgDAAIgDAAQgKAAgEAHQgBAEAAAIIAAAgg");
	this.shape_1.setTransform(45.75,11.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgjAvIAAhdIBEAAIAAARIgxAAIAAAUIAtAAIAAAPIgtAAIAAAYIAzAAIAAARg");
	this.shape_2.setTransform(38.85,9.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AANAjIAAgoQAAgGgCgDQgCgFgIgBQgIAAgDAJQgCADAAAHIAAAkIgSAAIAAhDIARAAIAAAKQAEgGADgCQAFgFAIAAQALABAGAFQAHAGAAANIAAAtg");
	this.shape_3.setTransform(26.725,11.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgTAjIAAhDIARAAIAAAMQADgHADgDQAGgFAIAAIABAAIABABIAAASIgDAAIgDAAQgKAAgEAHQgBAEAAAIIAAAgg");
	this.shape_4.setTransform(20.55,11.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgXAcQgKgIAAgUQAAgRAJgJQAKgKAOAAQAJAAAHADQAHAEAFAHQAFAGABAIIAAANIgxAAQAAAKAHAEQAEADAFAAQAGAAAEgDIAEgFIASAAQAAAGgGAHQgKAKgQAAQgNAAgLgJgAAQgGQgBgHgEgEQgFgEgGAAQgGAAgEAEQgEAEgBAHIAfAAIAAAAg");
	this.shape_5.setTransform(14.225,11.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgYAmQgJgKAAgPQAAgRAIgKQAJgKANAAQAFAAAFADQAFACADAFIAAghIATAAIAABdIgSAAIAAgKQgEAGgFADQgFADgGAAQgMAAgIgKgAgKgCQgEAFAAAJQAAAJAEAGQADAGAHAAQAIAAAEgGQAEgGAAgJQAAgMgHgFQgEgDgFAAQgHAAgDAGg");
	this.shape_6.setTransform(6.375,10.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgZAaQgJgLAAgPQAAgOAJgLQAIgLARAAQASAAAIALQAJALAAAOQAAAPgJALQgIALgSAAQgRAAgIgLgAgLgPQgFAGABAJQgBAKAFAGQAEAFAHABQAIgBAEgFQAFgGgBgKQABgJgFgGQgEgFgIgBQgHABgEAFg");
	this.shape_7.setTransform(-1.35,11.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AAfAjIAAgrIgBgGQgDgFgGAAQgIAAgDAGIgBAIIAAAoIgRAAIAAgoIgBgJQgDgFgGAAQgIAAgDAFQgBADAAAGIAAAoIgTAAIAAhEIASAAIAAAKQADgFADgCQAGgEAIAAQAIAAAEADQAEADACAFQADgGAGgDQAFgCAHAAQAFAAAEABQAEACAEAFQADADABAFIABALIAAAqg");
	this.shape_8.setTransform(-11.075,11.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AgXAcQgKgIAAgUQAAgRAJgJQAKgKAOAAQAJAAAHADQAHAEAFAHQAFAGABAIIAAANIgxAAQAAAKAHAEQAEADAFAAQAGAAAEgDIAEgFIASAAQAAAGgGAHQgKAKgQAAQgNAAgLgJgAAQgGQgBgHgEgEQgFgEgGAAQgGAAgEAEQgEAEgBAHIAfAAIAAAAg");
	this.shape_9.setTransform(-23.925,11.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AANAuIAAgpQAAgFgCgDQgDgGgHABQgGgBgDAGQgEADAAAJIAAAlIgSAAIAAhbIASAAIAAAhQAEgHAFgCQAEgDAGAAQAGAAAFADQAGACADAEQADAFAAADIABANIAAAog");
	this.shape_10.setTransform(-31.575,9.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgGAoQgDgDAAgHIAAgpIgJAAIAAgNIAJAAIAAgUIARAAIAAAUIALAAIAAANIgLAAIAAAjQAAAEABABQABABAGAAIACAAIABAAIAAAOIgIAAIgDABQgKAAgEgFg");
	this.shape_11.setTransform(-37.775,10.2523);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AANAjIAAgoQAAgGgCgDQgCgFgIgBQgIAAgDAJQgCADAAAHIAAAkIgSAAIAAhDIARAAIAAAKQAEgGADgCQAFgFAIAAQALABAGAFQAHAGAAANIAAAtg");
	this.shape_12.setTransform(-47.375,11.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgIAvIAAhEIARAAIAABEgAgIgeIAAgQIARAAIAAAQg");
	this.shape_13.setTransform(-53.175,9.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgXAcQgKgIAAgUQAAgRAJgJQAKgKAOAAQAJAAAHADQAHAEAFAHQAFAGABAIIAAANIgxAAQAAAKAHAEQAEADAFAAQAGAAAEgDIAEgFIASAAQAAAGgGAHQgKAKgQAAQgNAAgLgJgAAQgGQgBgHgEgEQgFgEgGAAQgGAAgEAEQgEAEgBAHIAfAAIAAAAg");
	this.shape_14.setTransform(51.675,-10.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgXAbQgIgKAAgQQAAgRAIgKQAKgKAOAAQANAAAIAGQAIAGACAPIgTAAQAAgEgCgDQgEgEgGAAQgIAAgDAJQgCAFAAAHQAAAHACAFQADAIAIAAQAHAAACgDQADgDAAgGIASAAQAAAIgFAIQgJAMgQAAQgRAAgHgKg");
	this.shape_15.setTransform(44.4,-10.975);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AANAjIAAgpQAAgFgCgDQgCgFgIAAQgIgBgDAJQgCAEAAAGIAAAkIgSAAIAAhEIARAAIAAALQAEgGADgCQAFgEAIgBQALAAAGAHQAHAFAAANIAAAtg");
	this.shape_16.setTransform(36.825,-11.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AgZAgQgHgGAAgKQAAgNAKgFQAGgCAKgCIAGgBIAHgBQAEgCAAgDQAAgFgDgBQgDgCgFAAQgHAAgCADQgCADgBAEIgRAAQAAgKAFgFQAHgKARAAQALABAJAEQAJAFAAAMIAAAfIAAAIIABAFIADACIAAACIgUAAIgBgDIgBgFIgIAHQgFADgIAAQgJAAgGgEgAAHADIgFABIgDABIgIACQgEADAAAFQAAAFACACQADACAEAAQAFgBAEgDQAFgDABgKIAAgGg");
	this.shape_17.setTransform(29.275,-11);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AgTAjIAAhEIARAAIAAANQADgIAEgCQAEgEAIgBIABAAIACABIAAASIgDAAIgCAAQgLAAgEAHQgBAEAAAHIAAAhg");
	this.shape_18.setTransform(23.45,-11.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AgbAYQgDgGAAgMIAAgoIASAAIAAAoQAAAGACADQACAFAHAAQAIAAAEgHQACgEAAgHIAAgkIASAAIAABEIgSAAIAAgKIgBACIgCADQgEADgEACQgDABgGAAQgPAAgFgLg");
	this.shape_19.setTransform(16.625,-10.925);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AgXAbQgIgKAAgQQAAgRAJgKQAIgKAPAAQANAAAIAGQAJAGABAPIgSAAQgBgEgDgDQgCgEgHAAQgIAAgDAJQgCAFAAAHQAAAHACAFQADAIAIAAQAGAAADgDQACgDABgGIATAAQgBAIgGAIQgIAMgRAAQgPAAgIgKg");
	this.shape_20.setTransform(9.15,-10.975);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AgXAbQgIgKAAgQQAAgRAJgKQAIgKAPAAQANAAAIAGQAJAGABAPIgSAAQgBgEgDgDQgCgEgHAAQgIAAgDAJQgCAFAAAHQAAAHACAFQADAIAIAAQAGAAADgDQACgDABgGIATAAQgBAIgFAIQgJAMgRAAQgPAAgIgKg");
	this.shape_21.setTransform(1.95,-10.975);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AgZAaQgKgLABgPQgBgOAKgLQAIgLARAAQASAAAJALQAIALABAOQgBAPgIALQgJALgSAAQgRAAgIgLgAgLgPQgEAFAAAKQAAALAEAFQAEAGAHAAQAIAAAEgGQAFgFAAgLQAAgKgFgFQgEgFgIAAQgHAAgEAFg");
	this.shape_22.setTransform(-5.65,-11);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("AABAuIAAg+IgUAAIAAgNIAMgBQAFgBADgEQACgCACgEIAAgEIAPAAIAABbg");
	this.shape_23.setTransform(-17.5,-12.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AgTAwIgFAAIAAgOIADAAIAFAAQAAAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIADgEIABgFIgZhHIAUAAIAOAyIAOgyIATAAIgXBDQgHAUgEAFQgDAFgMgBg");
	this.shape_24.setTransform(-27.625,-9.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("AgIAvIAAhdIARAAIAABdg");
	this.shape_25.setTransform(-33,-12.225);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#595959").s().p("AANAjIAAgpQAAgFgCgDQgCgFgIAAQgIgBgDAJQgCAEAAAGIAAAkIgSAAIAAhEIARAAIAAALQAEgGADgCQAFgEAIgBQALAAAGAHQAHAFAAANIAAAtg");
	this.shape_26.setTransform(-38.725,-11.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#595959").s().p("AgeAnQgOgNAAgaQAAgZAOgNQALgLATABQAUgBALALQAOANAAAZQAAAagOANQgLAKgUABQgTgBgLgKgAgRgXQgHAIAAAPQAAAQAHAIQAGAJALAAQAMAAAHgJQAGgIAAgQQAAgOgGgJQgHgJgMAAQgLAAgGAJg");
	this.shape_27.setTransform(-47.675,-12.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.1,-19.5,114.30000000000001,39.1);


(lib.Tween109 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("EAtUALPIgDgCQgHgFgCgIQgBgIAEgHQAFgHAIgBQAIgCAHAEIADACQAHAFACAIQABAIgEAHQgFAHgIACIgEAAQgGAAgFgDgEAshAKoIgwgmQgGgFgBgIQgBgIAFgHQAFgGAIgBQAIgBAHAFIAvAlQAHAFABAJQABAIgFAGQgFAHgJABIgCAAQgHAAgFgEgEArCAJcIgvgoQgHgFgBgIQAAgJAGgGQAFgGAIgBQAIgBAHAGIAuAnQAHAFABAJQAAAIgFAGQgFAHgIABIgDAAQgHAAgFgFgAOLIUQghgBgegDQgIgBgFgHQgFgGABgIQABgJAHgFQAGgFAJABQAbAEAeAAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEAplAINIgtgsQgGgGAAgIQAAgJAGgGQAGgGAIABQAIgBAGAGIAtAsQAGAFAAAIQAAAJgFAGQgGAGgIAAIgBAAQgIAAgGgFgAO8IMQgHgFgCgIQgBgIAFgHQAEgHAIgBQAcgFAagLQAHgDAIADQAIADADAIQADAHgDAIQgDAIgIADQgdAMggAGIgEABQgGAAgFgEgAMOIDQgfgIgdgNQgHgEgDgHQgDgIADgIQAEgHAIgDQAHgDAIADQAZAMAdAIQAIACAEAHQAEAHgCAIQgCAIgHAEQgFADgFAAIgGgBgAQyHhQgIgBgFgHQgFgHABgIQACgIAGgFQAXgRAVgVQAGgGAIAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgXAYgZASQgFAEgHAAIgDAAgAKbHNQgagSgXgXQgGgGAAgIQAAgIAGgGQAGgGAIAAQAJAAAGAGQAUAUAXARQAHAFABAIQACAIgFAHQgFAGgIACIgEAAQgGAAgFgEgEAobAG7QgIAAgGgHQgVgYgTgXQgFgHABgIQABgIAHgFQAGgFAJABQAIABAFAGQARAXAVAXQAFAGAAAIQgBAIgGAGQgFAFgIAAIgBAAgAR9GHQgHgFgCgIQgBgIAFgHQAPgWARgcQAEgHAIgCQAIgCAHAEQAHAEACAIQACAIgEAHQgRAegRAXQgFAHgIABIgDABQgGAAgFgEgAeOGAQgGgGAAgIQAAgIAGgGQAGgGAIAAIABAAQAcAAAXgIQAIgDAIAEQAHAEADAIQADAHgEAIQgEAHgHADQgeAKgjAAIgBAAIAAAAQgIAAgGgGgAJPF8QgIgCgFgHQgNgSgLgUIAAgBIgFgLQgEgIADgHQADgIAIgDQAIgEAHADQAIADADAIIAFAJIgBgBQALATALARQAFAHgCAIQgBAIgHAFQgFADgGAAIgEAAgAdoFsQgIgBgGgGQgSgUgNghIABACIgBgCQgEgIADgIQACgIAIgDQAHgEAIADQAIACAEAIIABACIAAABQALAaANAPQAFAHAAAIQgBAIgGAGQgFAFgIAAIgBAAgADFFoQgXABgWgUQgGgFgBgJQgBgIAGgGQAFgGAJgBQAIAAAGAFQAKAIAJABIAIgGQAHgFAIABQAIABAFAHQAFAGgBAJQgBAIgGAFQgTAOgMAAIgCAAgEAgKAFgQgIgBgGgGQgFgHABgIQAAgIAHgGQATgQAPgZQAEgHAJgBQAIgCAGAEQAIAEABAJQACAIgEAHQgTAdgYAVQgFAFgHAAIgCAAgEAnNAFbQgIgCgFgGQgSgcgNgbQgEgIADgIQACgIAHgDQAIgEAIADQAIACADAIQANAZARAaQAEAHgBAIQgCAIgHAEQgFAEgGAAIgEgBgAD3EuQgGgGAAgIQgBgIAGgGIAogtQAGgGAIgBQAJAAAGAFQAGAGABAIQAAAIgGAGIgpAuQgFAGgJAAIgBAAQgHAAgGgFgAB8EqQgHgCgEgIQgOgXgMggQgEgIAEgHQADgIAHgDQAIgDAIADQAHADAEAIQAMAdAMAWQAEAHgDAIQgCAIgHAEQgFADgFAAIgGgBgAS9EgQgHgEgDgIQgCgIAEgHIAbg2QAEgHAIgDQAIgCAHADQAIAEACAIQADAIgEAHIgcA3QgEAHgIACIgFABQgFAAgFgCgAIYEYQgHgDgEgHIgZg2QgDgIADgHQADgIAHgEQAIgDAIADQAHADAEAHIAYA2QAEAHgDAIQgDAIgIADQgEACgEAAIgHgBgA8zEIIg8AAQgIAAgGgGQgGgGAAgIQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAcyD8QgIgEgCgIIgRg6QgDgIAFgHQAEgHAHgDQAIgCAIAEQAHAEACAIIARA5QADAIgEAIQgEAHgIACIgGABQgFAAgEgCgEAhHAD4QgIgDgEgHQgDgIADgIQAJgZAHgfQADgIAHgEQAHgFAIACQAIACAEAHQAEAHgCAIQgIAigKAbQgDAIgHADQgEACgEAAIgHgBgA+wDwQgZgVgWgWQgGgGAAgIQAAgJAGgGQAGgGAIABQAIgBAGAGQAWAWAXAUQAGAFABAJQABAIgGAGQgFAGgJABIgBAAQgHAAgGgFgEAmUADwQgHgFgCgHIgPg7QgCgIAEgHQAEgIAIgBQAIgCAHAEQAIAEABAIIAPA6QADAIgEAHQgFAHgIACIgFABQgFAAgFgCgAFUDeQgIgBgGgGQgGgGABgIQAAgIAGgGQAZgYAWgPQAHgFAIABQAIACAFAHQAFAGgCAIQgBAIgHAFQgUAPgXAVQgGAGgIAAIAAAAgA8mDVQgIgBgFgHQgFgHABgIIAKg6QACgJAHgEQAGgFAJABQAIACAEAHQAFAGgBAJIgKA6QgCAIgHAFQgFAEgGAAIgDgBgABPDCQgIgEgCgHIgTg6QgCgIAEgHQAEgIAIgCQAIgCAHAEQAHADADAIIARA5QADAHgDAIQgEAHgIADIgHABQgEAAgEgCgAm1C7QgIgCgEgHIgCgEIAAABQgFAHgIACQgIACgHgEQgHgFgCgIQgHgcgFghQgCgIAFgHQAFgHAIgBQAIgCAHAFQAHAFABAIQAGAfAGAbQACgFAGgDQAWgNASgWQAGgGAIgBQAIgBAGAGQAHAFAAAIQABAIgFAHQgYAcgcAQQgEACgFAAIgGgBgAT0C0QgHgEgDgIQgDgIAEgHIAbg0QAEgIAIgCQAIgCAHAEQAIADACAIQADAIgFAIIgaAzQgEAHgIADIgGABQgFAAgEgCgAHnCuQgIgBgFgGQgJgLgIgCQgHAAgHACQgIACgHgEQgHgEgCgIQgDgJAFgHQAEgHAIgCQANgDALAAQAZgBAXAdQAFAGgBAIQgBAIgGAGQgGAEgGAAIgDAAgA/8CeQgIgBgGgGQgUgYgSgYQgFgHABgIQACgIAGgFQAHgFAIABQAIACAFAGQARAYAUAWQAFAGgBAIQAAAJgGAFQgGAFgHAAIgCAAgA2rCUQgIgCgDgHIgag1QgEgHADgIQADgIAHgDQAHgEAIADQAIACAEAIIAFAMIAEgpQABgIAHgFQAGgFAIABQAJABAFAGQAFAHgBAIQgFAhABAaQAAAIgGAGQgFAFgIABQACAFgCAGQgCAIgHAEQgFACgFAAIgGgBgAcPCHQgHgEgDgIQgKgdgKgaQgEgHAEgIQADgIAHgDQAIgDAHADQAIADAEAIQALAaAKAgQADAIgEAHQgEAHgIADIgGABQgFAAgEgCgEAhoACDQgIgCgFgGQgFgHACgIIAJg9QABgIAHgFQAHgFAIABQAIABAFAHQAFAHgBAIIgKA+QgBAIgHAEQgFAEgGAAIgEAAgEAl4AB+QgHgFgCgIIgOg9QgCgIAEgHQAFgHAIgCQAIgCAHAFQAHAEACAIIAOA+QACAIgFAHQgEAHgIACIgFAAQgFAAgFgDgEgpCABQQgGgFAAgIQAAgJAFgGQAGgGAIAAQAIgBAGAGQAKAJAJAEIAFgDQAIgEAIAEQAHADAEAIQADAHgDAIIgDAHQgDAGgFADQgFADgGAAIgCAAQgZAAgdgagAlqBiQgIgEgCgIQgDgIAEgHIAQgiIAAAAIAJgXQADgIAHgDQAHgDAIACQAIADAEAHQADAIgDAHIgJAZIAAAAQgIAUgJARQgEAIgIACIgGABQgFAAgEgCgA8SBfQgIgCgEgHQgFgHABgIIAMg7QABgIAHgEQAHgFAIACQAIABAFAGQAFAHgCAIIgLA8QgCAIgHAFQgFADgGAAIgEAAgAufBcIgLAAQgFAAgEgCQgFgCgDgEQgIgNgPgeQgEgIADgHQADgIAHgEQAIgEAHADQAIADAEAHIAPAdQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAIAAAAgAArBQQgHgEgCgIIgPg6QgBgIAEgGQAEgHAIgCQAIgCAHAEQAHAEADAHIAOA6QACAHgEAIQgEAHgIACIgGABQgFAAgFgDgAUqBMQgHgEgCgIQgCgIAEgHQASgeAPgTQAFgHAIgBQAIgCAHAFQAHAFABAHQACAIgFAHQgOAUgSAcQgEAHgIACIgFAAQgFAAgFgDgAt6BEQgIgCgEgGQgFgHABgIIAKg8QABgIAGgFQAHgFAIABQAIABAFAHQAFAHgBAIIgJA9QgCAIgGAEQgGAEgGAAIgEAAgAn1A9QgGgGgBgIQgDgcgCgfQAAgJAGgGQAFgGAIAAQAJgBAGAGQAGAFABAJQABAdADAcQABAIgFAHQgGAGgIABIgCAAQgHAAgGgEgEghGAA9QgIgDgFgHQgQgagNgbQgEgIADgIQADgHAHgEQAIgEAIADQAHADAEAHQANAaAPAZQAEAHgCAIQgCAIgHAEQgFADgFAAIgFAAgEgtiAA8QgIgCgFgHQgEgHACgIIAMg4QABgIAHgFQAHgEAIACQAIABAFAHQAEAHgCAIIgLA4QgCAIgHAFQgFADgGAAIgEAAgA3eArQgIgDgDgHIgZgzQgEgHADgIQADgIAHgDQAIgEAIADQAHADAEAHIAZAzQADAIgDAHQgDAIgHAEQgEACgEAAIgHgCgEgn3AAqQgHgEgCgIQgDgIAEgHQAOgZAQgbQAEgHAIgCQAIgCAHAEQAHAEACAIQACAIgEAHQgQAZgNAZQgEAIgIACIgGABQgEAAgFgCgEgpdAApQgIgCgEgGQgQgXgRgdQgEgHADgIQACgIAHgEQAIgEAIACQAHADAEAHQAQAcAPAUQAEAGgBAJQgCAIgGAFQgGADgGAAIgEAAgAbjAbQgIgCgEgHQgMgSgMgNIgBgBIgIgJQgGgGAAgIQAAgJAGgGQAGgGAIABQAIgBAGAGIALAMQAOAQANAWQAFAGgCAIQgCAIgHAEQgFADgFAAIgFAAgEAh5AAKQgIgBgFgHQgFgFABgIIAIg6QABgJAGgFQAHgFAIABQAIABAFAHQAFAHgBAIIgHA6QgBAHgHAFQgFAEgHAAIgDAAgEAlcAAEQgHgEgCgIIgLguIgFgTQgCgIAEgHQAEgHAIgCQAIgCAIAEQAHAEACAIIAFAUIALAuQACAIgFAHQgEAGgIACIgFABQgFAAgFgDgA2JAEQgIgCgFgGQgEgHACgIQAGgfAIgdQACgIAHgEQAIgEAHACQAIADAFAHQAEAHgDAIQgIAcgGAdQgBAIgHAEQgFADgGAAIgEAAgAvhgDQgHgDgEgHIgXg2QgEgHADgIQADgIAIgDQAHgEAIADQAIADADAIIAYA2QADAHgDAIQgDAHgIAEQgDACgEAAIgIgCgAV9gOQgIgBgGgGQgGgGAAgIQABgIAGgGQAZgXAbgQQAHgEAIACQAIACAEAIQAEAHgCAIQgCAIgHAEQgYANgVAUQgGAGgIAAIAAAAgAk7gSQgIgCgEgHQgEgHACgIQAHgbAGgfQACgIAHgFQAHgEAIACQAIABAFAHQAEAHgCAIQgGAggIAcQgCAIgHAEQgFADgFAAIgFgBgA78gXQgHgDgFgHQgEgHACgIIADgLIAAgBIAJgmQACgIAHgEQAHgFAIACQAIACAEAHQAFAHgCAIIgJAnIAAABIgDALQgCAIgHAEQgFADgFAAIgGAAgAAOgjQgHgEgCgIIgNg6QgBgIAEgHQAEgHAIgCQAHgCAIAFQAHAEACAIIANA6QACAIgEAHQgFAHgIACIgFAAQgFAAgFgDgEgh9gAvQgIgDgDgIIgUg3QgDgHADgIQAEgHAHgDQAIgDAIADQAHAEADAIIAVA2QADAHgEAIQgDAIgIADIgHABQgEAAgEgCgAtng0QgIgBgFgGQgGgHABgIIABgJIAAgBIAGgzQABgJAHgFQAGgFAJABQAIABAFAHQAFAGgBAJIgGAzIgBAJQgBAIgGAGQgGAEgHAAIgCAAgEgtKgA1QgIgCgFgHQgEgHABgIIANg5QACgIAHgEQAHgFAIACQAIACAEAHQAFAHgCAIIgMA5QgCAIgHAEQgFAEgGAAIgEgBgAnvg1QgIAAgGgGQgGgGAAgIIAAgDIgBg6QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIABA6IAAADQAAAIgGAGQgGAGgIAAIAAAAgAaJg5QgXgNgbgFQgIgCgFgHQgEgHACgIQABgIAHgFQAHgEAIACQAhAHAcAPQAHAEADAIQACAIgEAHQgEAHgIADIgGABQgEAAgFgDgEgm6gA9QgHgFgCgIQgBgIAFgHQARgaATgXQAFgGAIgBQAJgBAGAGQAHAFABAIQAAAIgFAHQgRAVgSAZQgEAHgIABIgEABQgGAAgFgEgA4Pg8QgIgDgEgHIgLgYIAAAAIgQggQgDgIACgHQADgIAIgEQAHgEAIADQAIADADAHIAQAhIAAAAIALAXQAEAHgDAIQgDAIgHADQgEADgFAAIgGgBgEgqbgBBQgIgEgDgHIgXg3QgEgIAEgIQACgHAIgEQAIgDAHADQAIADADAIIAYA4QADAHgDAIQgDAHgIAEQgEABgEAAQgDAAgEgBgAXbhLQgHgFgDgHQgCgIAEgIQAEgHAIgCQAfgJAiAAQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAQgcAAgaAHIgGABQgFAAgEgCgEAiIgBqQgIgBgFgGQgFgHABgIIAIg6QACgIAGgFQAHgFAIABQAIACAFAGQAFAHgBAIIgIA5QgBAIgHAFQgFAEgHAAIgDAAgA1shsQgIgEgDgHQgEgIAEgHIACgFIgBAAQALgcAMgYQAEgHAIgDQAIgDAHAEQAHAEADAIQADAIgEAHQgLAWgKAaIAAABIgCAFQgEAHgHAEQgEABgEAAQgEAAgDgBgAwShxQgIgDgDgIIgJgSIAAAAIgUgpQgEgHACgIQADgIAHgEQAHgEAIACQAIADAEAHIAVArIABAAIAIATQAEAHgDAIQgDAIgIADQgEACgEAAIgHgBgEAk8gB4QgHgFgCgHQgJgfgJgaQgDgIAEgHQAEgIAHgCQAIgDAIAEQAHADADAIQAJAaAJAhQADAIgEAHQgFAHgHACIgGABQgFAAgFgCgA7hiCQgIgCgEgIQgEgHACgIQAJggAKgZQADgIAHgDQAIgEAIADQAHADAEAIQADAHgDAIQgJAYgIAeQgDAIgHAEQgEADgFAAIgGgBgAkgiIQgIgCgFgGQgFgHACgIIAIg1IABgHQABgIAHgFQAHgFAIABQAIABAFAHQAFAHgBAIIgBAHIAAAAIgJA2QgBAIgHAFQgFADgGAAIgEAAgEglygCbQgGgGAAgIQAAgIAFgGQAXgYAXgSQAGgGAIABQAJABAFAGQAFAHAAAIQgBAIgHAGQgVARgUAVQgGAGgJABIAAAAQgIAAgGgGgAgNidQgIgFgBgIIgPg7QgBgIAEgHQAEgHAJgCQAHgCAHAFQAHAEABAIIAPA7QABAIgEAHQgEAHgIACIgEABQgFAAgFgDgEgimgCfQgHgEgDgHIgVg3QgEgIAEgIQADgHAIgDQAHgEAIAEQAHADAEAIIAVA4QADAHgDAIQgEAHgHADIgIACQgEAAgEgCgEgs0gChQgIgDgDgIQgEgHADgIQANgiAXgXQAGgGAIABQAIgBAGAGQAGAGAAAJQAAAIgGAGQgQARgKAZQgDAIgIADQgEACgEAAIgHgBgA5FirQgIgCgEgIQgQgfgOgVQgEgIACgIQACgIAHgEQAHgEAIACQAIABAFAIQANAWARAhQAEAHgDAIQgCAIgHAEQgFACgEAAIgGgBgAtZisQgJgBgFgGQgFgHABgIIAIg7QABgIAGgFQAHgFAIABQAIABAFAGQAFAHgBAIIgHA7QgBAIgHAFQgFAEgHAAIgCAAgAoAi0QgGgFAAgJIgBg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIABA8QAAAIgGAGQgGAGgIAAIAAAAQgIAAgGgGgEgrLgCxQgHgDgEgHIgag7QgDgHADgIQADgIAHgDQAIgEAIADQAHADAEAIIAaA7QADAHgDAIQgDAHgHAEQgFACgEAAIgHgCgA07jYQgHgFgCgIQgBgIAFgHQATgdAVgUQAHgFAIAAQAIAAAGAHQAFAGAAAIQAAAIgHAGQgSARgRAYQgEAHgIACIgEAAQgGAAgFgDgEAibgDbQgIgDgDgHQgEgIADgIQAPglAUgUQAGgGAIABQAIgBAGAGQAGAGAAAJQAAAIgGAGQgPAPgKAcQgDAHgIAEQgEACgEAAIgHgCgAxKjgQgIgCgFgHQgSgcgRgSQgFgHAAgIQAAgIAHgGQAGgFAIAAQAIAAAGAHQASAUAVAgQAEAHgBAIQgCAIgHAEQgFAEgGAAIgEgBgEgkNgDhQgIgCgEgHQgEgHACgIQACgIAHgFQAcgRAdgLQAIgDAIAEQAHADADAIQADAIgDAHQgEAIgHADQgaAKgaAPQgFADgFAAIgFgBgEAkXgDqQgIgDgEgHQgQgigMgJQgIgDgCgIQgDgIAEgHQAEgIAIgCQAIgDAHAEQAXAKAXAzQAEAHgDAIQgDAIgHADQgEACgEAAIgHgBgA68jwQgHgEgCgIQgCgIAEgHQAcgvAfADQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAQgLADgNAVQgFAHgIADIgEAAQgGAAgFgDgAkPj/QgIgBgFgGQgFgHABgIIAIg6QABgJAGgFQAHgFAIABQAIABAFAHQAFAGgBAJIgHA6QgBAIgHAFQgFAEgHAAIgDAAgAgqkTQgHgEgCgIIgNg7QgCgIAEgHQAEgHAIgCQAIgCAHAFQAIAEABAIIAPA6QABAIgEAIQgEAHgIACIgFAAQgGAAgFgDgAtLkfQgIgBgFgHQgEgGABgIIAKg7QABgIAHgFQAHgFAIACQAIABAFAHQAFAHgCAIIgKA6QgBAIgHAFQgFAEgGAAIgEgBgAzhkkQgHgEgEgHQgDgIADgHQAEgIAHgDQAfgNAjgBQAIAAAGAGQAGAGAAAIQAAAIgGAGQgGAGgIAAQgaAAgYALQgEABgEAAQgEAAgEgBgAoCkrQgHgGAAgIIgBgZIgCgeQgBgIAFgHQAFgGAJgBQAIgBAGAGQAHAFAAAIIADAgIABAZQAAAIgFAHQgGAGgIAAIgBAAQgIAAgFgFgAkAl0QgIgBgFgHQgFgHABgIIAIg6QABgJAHgFQAHgFAIABQAIABAFAHQAFAHgBAIIgIA7QgBAIgHAFQgFAEgHAAIgDAAgAhHmJQgHgEgCgIIgPg2IAAAAIgDgKQgCgIAEgHQAEgIAIgCQAIgCAHAEQAHADADAIIADAKIAAABIAPA3QACAIgEAHQgEAHgIACIgGABQgFAAgFgDgAs2mTQgIgCgFgHQgEgHABgIIAOg6QACgIAHgEQAHgFAIACQAIACAFAHQAEAHgCAIIgOA6QgBAIgHAEQgFAEgGAAIgEgBgAoMmdQgHgFgCgIQgGgggIgbQgCgIAEgHQAEgHAIgDQAIgCAHAEQAHAEADAIQAJAdAGAhQABAIgEAHQgFAHgJACIgDAAQgGAAgFgDgAjvnpQgIgBgFgHQgFgHABgIIALg6QACgIAHgFQAGgEAIACQAJABAEAHQAFAHgCAIIgKA5QgCAIgGAFQgGAEgGAAIgDgBgAhpoDQgHgEgDgIIgUg4QgDgIAEgHQADgIAIgDQAIgDAHAEQAIADADAIIAUA6QADAIgEAHQgEAHgIADIgGABQgFAAgEgCgAsboHQgIgCgEgHQgEgIADgHIARg6QADgIAHgEQAIgEAIADQAIADADAHQAEAHgDAIIgRA5QgCAIgIAEQgEACgFAAIgGgBgAosoRQgIgDgEgHIgGgNIgBgBQgJgRgMgQQgFgHABgIQABgIAHgFQAHgFAIABQAIABAFAHQANASALAUIAAAAIAIAQQAEAHgDAIQgDAIgHADQgEACgEAAIgHgBgAjapcQgIgCgEgHQgEgHACgIQAIggAIgZQADgIAIgDQAHgEAIADIACABQgBgFABgEQACgIAHgEQAHgFAJACQAIACAEAHQAPAYAPAhQAEAIgDAIQgDAHgIAEQgHADgIgDQgIgDgDgHQgKgVgKgSIgBAEQgIAYgIAeQgCAIgHAEQgEADgGAAIgFgBgAp5pyQgVgSgZgNQgIgEgCgIQgDgIAFgHQADgIAIgCQAIgCAIAEQAcAPAZAUQAGAGAAAIQABAIgFAGQgGAHgIABIgCAAQgHAAgFgFgAr2p3QgIgDgEgHQgDgIADgIIAUgzQACgIAHgDQAHgDAHACIAHACQAIACAEAHQAFAIgDAIQgCAHgHAFIgEABIgOAlQgDAIgHADQgEACgEAAIgHgBg");
	this.shape.setTransform(0,0.7954);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-293.1,-71.4,586.2,144.4);


(lib.Tween108 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgZAgQgHgGAAgKQAAgMAKgGQAGgDAKgBIAGAAIAHgCQAEgCAAgDQAAgFgDgBQgDgCgFAAQgHAAgCADQgCACgBAEIgRAAQAAgJAFgFQAHgKARAAQALAAAJAFQAJAFAAAMIAAAfIAAAIIABAFIADACIAAACIgUAAIgBgDIgBgFIgIAHQgFADgIAAQgJAAgGgEgAAHADIgFABIgDABIgIACQgEACAAAGQAAAFACACQADACAEgBQAFAAAEgDQAFgDABgKIAAgGg");
	this.shape.setTransform(51.575,11.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgTAjIAAhDIARAAIAAAMQADgHADgDQAGgFAIAAIABAAIABABIAAASIgDAAIgDAAQgKAAgEAHQgBAEAAAIIAAAgg");
	this.shape_1.setTransform(45.75,11.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgjAvIAAhdIBEAAIAAARIgxAAIAAAUIAtAAIAAAPIgtAAIAAAYIAzAAIAAARg");
	this.shape_2.setTransform(38.85,9.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AANAjIAAgoQAAgGgCgDQgCgFgIgBQgIAAgDAJQgCADAAAHIAAAkIgSAAIAAhDIARAAIAAAKQAEgGADgCQAFgFAIAAQALABAGAFQAHAGAAANIAAAtg");
	this.shape_3.setTransform(26.725,11.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgTAjIAAhDIARAAIAAAMQADgHADgDQAGgFAIAAIABAAIABABIAAASIgDAAIgDAAQgKAAgEAHQgBAEAAAIIAAAgg");
	this.shape_4.setTransform(20.55,11.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgXAcQgKgIAAgUQAAgRAJgJQAKgKAOAAQAJAAAHADQAHAEAFAHQAFAGABAIIAAANIgxAAQAAAKAHAEQAEADAFAAQAGAAAEgDIAEgFIASAAQAAAGgGAHQgKAKgQAAQgNAAgLgJgAAQgGQgBgHgEgEQgFgEgGAAQgGAAgEAEQgEAEgBAHIAfAAIAAAAg");
	this.shape_5.setTransform(14.225,11.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgYAmQgJgKAAgPQAAgRAIgKQAJgKANAAQAFAAAFADQAFACADAFIAAghIATAAIAABdIgSAAIAAgKQgEAGgFADQgFADgGAAQgMAAgIgKgAgKgCQgEAFAAAJQAAAJAEAGQADAGAHAAQAIAAAEgGQAEgGAAgJQAAgMgHgFQgEgDgFAAQgHAAgDAGg");
	this.shape_6.setTransform(6.375,10.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgZAaQgJgLAAgPQAAgOAJgLQAIgLARAAQASAAAIALQAJALAAAOQAAAPgJALQgIALgSAAQgRAAgIgLgAgLgPQgFAGABAJQgBAKAFAGQAEAFAHABQAIgBAEgFQAFgGgBgKQABgJgFgGQgEgFgIgBQgHABgEAFg");
	this.shape_7.setTransform(-1.35,11.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AAfAjIAAgrIgBgGQgDgFgGAAQgIAAgDAGIgBAIIAAAoIgRAAIAAgoIgBgJQgDgFgGAAQgIAAgDAFQgBADAAAGIAAAoIgTAAIAAhEIASAAIAAAKQADgFADgCQAGgEAIAAQAIAAAEADQAEADACAFQADgGAGgDQAFgCAHAAQAFAAAEABQAEACAEAFQADADABAFIABALIAAAqg");
	this.shape_8.setTransform(-11.075,11.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AgXAcQgKgIAAgUQAAgRAJgJQAKgKAOAAQAJAAAHADQAHAEAFAHQAFAGABAIIAAANIgxAAQAAAKAHAEQAEADAFAAQAGAAAEgDIAEgFIASAAQAAAGgGAHQgKAKgQAAQgNAAgLgJgAAQgGQgBgHgEgEQgFgEgGAAQgGAAgEAEQgEAEgBAHIAfAAIAAAAg");
	this.shape_9.setTransform(-23.925,11.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AANAuIAAgpQAAgFgCgDQgDgGgHABQgGgBgDAGQgEADAAAJIAAAlIgSAAIAAhbIASAAIAAAhQAEgHAFgCQAEgDAGAAQAGAAAFADQAGACADAEQADAFAAADIABANIAAAog");
	this.shape_10.setTransform(-31.575,9.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgGAoQgDgDAAgHIAAgpIgJAAIAAgNIAJAAIAAgUIARAAIAAAUIALAAIAAANIgLAAIAAAjQAAAEABABQABABAGAAIACAAIABAAIAAAOIgIAAIgDABQgKAAgEgFg");
	this.shape_11.setTransform(-37.775,10.2523);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AANAjIAAgoQAAgGgCgDQgCgFgIgBQgIAAgDAJQgCADAAAHIAAAkIgSAAIAAhDIARAAIAAAKQAEgGADgCQAFgFAIAAQALABAGAFQAHAGAAANIAAAtg");
	this.shape_12.setTransform(-47.375,11.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgIAvIAAhEIARAAIAABEgAgIgeIAAgQIARAAIAAAQg");
	this.shape_13.setTransform(-53.175,9.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgXAcQgKgIAAgUQAAgRAJgJQAKgKAOAAQAJAAAHADQAHAEAFAHQAFAGABAIIAAANIgxAAQAAAKAHAEQAEADAFAAQAGAAAEgDIAEgFIASAAQAAAGgGAHQgKAKgQAAQgNAAgLgJgAAQgGQgBgHgEgEQgFgEgGAAQgGAAgEAEQgEAEgBAHIAfAAIAAAAg");
	this.shape_14.setTransform(51.675,-10.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgXAbQgIgKAAgQQAAgRAIgKQAKgKAOAAQANAAAIAGQAIAGACAPIgTAAQAAgEgCgDQgEgEgGAAQgIAAgDAJQgCAFAAAHQAAAHACAFQADAIAIAAQAHAAACgDQADgDAAgGIASAAQAAAIgFAIQgJAMgQAAQgRAAgHgKg");
	this.shape_15.setTransform(44.4,-10.975);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AANAjIAAgpQAAgFgCgDQgCgFgIAAQgIgBgDAJQgCAEAAAGIAAAkIgSAAIAAhEIARAAIAAALQAEgGADgCQAFgEAIgBQALAAAGAHQAHAFAAANIAAAtg");
	this.shape_16.setTransform(36.825,-11.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AgZAgQgHgGAAgKQAAgNAKgFQAGgCAKgCIAGgBIAHgBQAEgCAAgDQAAgFgDgBQgDgCgFAAQgHAAgCADQgCADgBAEIgRAAQAAgKAFgFQAHgKARAAQALABAJAEQAJAFAAAMIAAAfIAAAIIABAFIADACIAAACIgUAAIgBgDIgBgFIgIAHQgFADgIAAQgJAAgGgEgAAHADIgFABIgDABIgIACQgEADAAAFQAAAFACACQADACAEAAQAFgBAEgDQAFgDABgKIAAgGg");
	this.shape_17.setTransform(29.275,-11);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AgTAjIAAhEIARAAIAAANQADgIAEgCQAEgEAIgBIABAAIACABIAAASIgDAAIgCAAQgLAAgEAHQgBAEAAAHIAAAhg");
	this.shape_18.setTransform(23.45,-11.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AgbAYQgDgGAAgMIAAgoIASAAIAAAoQAAAGACADQACAFAHAAQAIAAAEgHQACgEAAgHIAAgkIASAAIAABEIgSAAIAAgKIgBACIgCADQgEADgEACQgDABgGAAQgPAAgFgLg");
	this.shape_19.setTransform(16.625,-10.925);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AgXAbQgIgKAAgQQAAgRAJgKQAIgKAPAAQANAAAIAGQAJAGABAPIgSAAQgBgEgDgDQgCgEgHAAQgIAAgDAJQgCAFAAAHQAAAHACAFQADAIAIAAQAGAAADgDQACgDABgGIATAAQgBAIgGAIQgIAMgRAAQgPAAgIgKg");
	this.shape_20.setTransform(9.15,-10.975);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AgXAbQgIgKAAgQQAAgRAJgKQAIgKAPAAQANAAAIAGQAJAGABAPIgSAAQgBgEgDgDQgCgEgHAAQgIAAgDAJQgCAFAAAHQAAAHACAFQADAIAIAAQAGAAADgDQACgDABgGIATAAQgBAIgFAIQgJAMgRAAQgPAAgIgKg");
	this.shape_21.setTransform(1.95,-10.975);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AgZAaQgKgLABgPQgBgOAKgLQAIgLARAAQASAAAJALQAIALABAOQgBAPgIALQgJALgSAAQgRAAgIgLgAgLgPQgEAFAAAKQAAALAEAFQAEAGAHAAQAIAAAEgGQAFgFAAgLQAAgKgFgFQgEgFgIAAQgHAAgEAFg");
	this.shape_22.setTransform(-5.65,-11);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("AABAuIAAg+IgUAAIAAgNIAMgBQAFgBADgEQACgCACgEIAAgEIAPAAIAABbg");
	this.shape_23.setTransform(-17.5,-12.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AgTAwIgFAAIAAgOIADAAIAFAAQAAAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIADgEIABgFIgZhHIAUAAIAOAyIAOgyIATAAIgXBDQgHAUgEAFQgDAFgMgBg");
	this.shape_24.setTransform(-27.625,-9.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("AgIAvIAAhdIARAAIAABdg");
	this.shape_25.setTransform(-33,-12.225);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#595959").s().p("AANAjIAAgpQAAgFgCgDQgCgFgIAAQgIgBgDAJQgCAEAAAGIAAAkIgSAAIAAhEIARAAIAAALQAEgGADgCQAFgEAIgBQALAAAGAHQAHAFAAANIAAAtg");
	this.shape_26.setTransform(-38.725,-11.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#595959").s().p("AgeAnQgOgNAAgaQAAgZAOgNQALgLATABQAUgBALALQAOANAAAZQAAAagOANQgLAKgUABQgTgBgLgKgAgRgXQgHAIAAAPQAAAQAHAIQAGAJALAAQAMAAAHgJQAGgIAAgQQAAgOgGgJQgHgJgMAAQgLAAgGAJg");
	this.shape_27.setTransform(-47.675,-12.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.1,-19.5,114.30000000000001,39.1);


(lib.Tween104 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AAZBHIAAhTQAAgLgCgGQgGgLgOAAQgSAAgGAQQgEAIAAANIAABKIglAAIAAiJIAjAAIAAAUQAIgLAGgFQALgIAQAAQAVAAAOALQANAMAAAaIAABcg");
	this.shape.setTransform(205.55,27.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("Ag0A0QgSgVAAgfQAAgdASgWQARgWAjAAQAkAAARAWQASAWAAAdQAAAfgSAVQgRAWgkAAQgjAAgRgWgAgYgfQgIALAAAUQAAAVAIALQAJAMAPAAQAQAAAIgMQAJgLAAgVQAAgUgJgLQgIgLgQAAQgPAAgJALg");
	this.shape_1.setTransform(189.675,27.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgRBeIAAiJIAjAAIAACJgAgRg8IAAghIAjAAIAAAhg");
	this.shape_2.setTransform(178.125,25.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgvA8QgPgOAAgVIAkAAQABAJAEAFQAHAHARAAQALAAAGgDQAHgDAAgHQAAgGgGgDQgFgDgfgIQgYgGgKgIQgJgIAAgRQAAgTAPgNQAPgOAbgBQAZAAAQALQARALACAZIgkAAQgBgHgDgEQgGgIgNAAQgMABgFADQgFADAAAGQAAAGAFADQAGACAfAIQAWAFAKAJQALALAAAPQAAAUgPAOQgQAMggAAQgfAAgQgNg");
	this.shape_3.setTransform(167.275,27.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgvA8QgPgOAAgVIAkAAQABAJAEAFQAHAHARAAQALAAAGgDQAHgDAAgHQAAgGgGgDQgFgDgfgIQgYgGgKgIQgJgIAAgRQAAgTAPgNQAPgOAbgBQAZAAAQALQARALACAZIgkAAQgBgHgDgEQgGgIgNAAQgMABgFADQgFADAAAGQAAAGAFADQAGACAfAIQAWAFAKAJQALALAAAPQAAAUgPAOQgQAMggAAQgfAAgQgNg");
	this.shape_4.setTransform(152.825,27.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgvA4QgVgRAAgmQAAgjATgTQATgTAeAAQASAAAOAGQAPAHAJAOQAJAMACAQQACAKgBARIhjAAQABAVANAIQAIAFALAAQAMAAAIgGQAEgEAEgGIAlAAQgCANgMAMQgSAUgiAAQgbAAgVgRgAAfgNQgBgOgJgIQgIgHgNAAQgNAAgIAHQgHAIgCAOIA9AAIAAAAg");
	this.shape_5.setTransform(138.6563,27.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgvA2QgQgVAAgfQAAgjASgTQARgUAeAAQAaAAAQAMQARALADAeIglAAQgBgIgEgGQgGgJgNAAQgSABgGARQgEAKAAAPQAAAQAEAJQAGARARAAQANAAAFgHQAGgHABgLIAlAAQgCARgKAOQgRAYgiAAQggAAgQgTg");
	this.shape_6.setTransform(124.025,27.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgvA4QgVgRAAgmQAAgjATgTQATgTAeAAQASAAAOAGQAPAHAJAOQAJAMACAQQACAKgBARIhjAAQABAVANAIQAIAFALAAQAMAAAIgGQAEgEAEgGIAlAAQgCANgMAMQgSAUgiAAQgbAAgVgRgAAfgNQgBgOgJgIQgIgHgNAAQgNAAgIAHQgHAIgCAOIA9AAIAAAAg");
	this.shape_7.setTransform(109.7563,27.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgnBHIAAiKIAiAAIAAAYQAIgNAGgFQAKgJAQAAIACAAIADAAIAAAlIgGAAIgEAAQgWAAgIAOQgDAIAAAQIAABCg");
	this.shape_8.setTransform(97.875,27.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AgiARIAAghIBGAAIAAAhg");
	this.shape_9.setTransform(87.7,27.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgvA2QgQgVAAgfQAAgjASgTQARgUAeAAQAaAAAQAMQARALADAeIglAAQgBgIgEgGQgGgJgNAAQgSABgGARQgEAKAAAPQAAAQAEAJQAGARARAAQANAAAFgHQAGgHABgLIAlAAQgCARgKAOQgRAYgiAAQggAAgQgTg");
	this.shape_10.setTransform(76.375,27.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgRBeIAAiJIAjAAIAACJgAgRg8IAAghIAjAAIAAAhg");
	this.shape_11.setTransform(65.475,25.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AA+BHIAAhXQAAgIgDgFQgFgKgNAAQgPAAgFAMQgDAHAAAJIAABSIgkAAIAAhSQAAgMgCgGQgFgKgNAAQgQAAgFAKQgDAGAAALIAABTIgkAAIAAiJIAjAAIAAAUQAGgLAGgFQALgIARAAQAQAAAIAHQAIAHAEAKQAHgMALgGQALgGAOAAQAJAAAJAEQAJADAHAJQAGAIACAKQABAHAAAOIAABWg");
	this.shape_12.setTransform(50.375,27.525);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgvA4QgVgRAAgmQAAgjATgTQATgTAeAAQASAAAOAGQAPAHAJAOQAJAMACAQQACAKgBARIhjAAQABAVANAIQAIAFALAAQAMAAAIgGQAEgEAEgGIAlAAQgCANgMAMQgSAUgiAAQgbAAgVgRgAAfgNQgBgOgJgIQgIgHgNAAQgNAAgIAHQgHAIgCAOIA9AAIAAAAg");
	this.shape_13.setTransform(31.8063,27.725);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgyBMQgRgUAAgeQAAgjARgUQAQgUAcAAQALAAAKAFQAKAGAFAJIAAhCIAlAAIAAC6IgjAAIAAgTQgIAMgKAGQgJAGgOAAQgZAAgQgUgAgWgGQgHALAAASQAAATAHAMQAIALAPAAQAPAAAHgLQAIgMAAgSQAAgYgMgLQgIgHgKAAQgPAAgIAMg");
	this.shape_14.setTransform(16.05,25.475);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AAZBHIAAhTQAAgLgCgGQgGgLgPAAQgRAAgGAQQgEAIAAANIAABKIglAAIAAiJIAjAAIAAAUQAIgLAGgFQALgIAQAAQAWAAANALQANAMAAAaIAABcg");
	this.shape_15.setTransform(0.6,27.525);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("Ag0A+QgMgLAAgUQAAgZAUgLQAKgFAWgDIAMgCQAKgBADgCQAJgDgBgHQAAgJgFgDQgHgDgKAAQgNAAgFAGQgFAFgBAIIgjAAQACgSAIgMQAPgSAjAAQAWAAARAJQATAJgBAZIAAA/IAAAPQABAIACACQABACAEACIAAAFIgnAAIgDgHIgBgIQgHAHgKAGQgKAHgQAAQgSAAgNgLgAAOAFIgKACIgHACQgLACgFACQgJAGAAAKQAAAJAFAFQAGADAHAAQALABAKgIQAKgGAAgTIAAgNg");
	this.shape_16.setTransform(-14.55,27.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AhCBiIAAjAIAjAAIAAAUQAFgIAHgFQAMgKAQAAQAZAAAQASQARASAAAjQAAAjgRAUQgQASgaABQgPAAgMgJQgGgEgFgJIAABIgAgcgvQgEALABAOQgBAXANALQAIAFAKAAQAPAAAIgMQAIgLAAgSQAAgQgHgNQgIgNgQAAQgUABgHASg");
	this.shape_17.setTransform(-29.35,30.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AgyBgIBHi/IAeAAIhIC/g");
	this.shape_18.setTransform(-41.125,24.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AgMBQQgGgGAAgNIAAhVIgUAAIAAgZIAUAAIAAgnIAjAAIAAAnIAWAAIAAAZIgWAAIAABJQAAAIACACQACACALAAIADAAIAEAAIAAAbIgRABIgFAAQgVAAgIgJg");
	this.shape_19.setTransform(-49.375,25.9295);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AgvA4QgVgRAAgmQAAgjATgTQATgTAeAAQASAAAOAGQAPAHAJAOQAJAMACAQQACAKgBARIhjAAQABAVANAIQAIAFALAAQAMAAAIgGQAEgEAEgGIAlAAQgCANgMAMQgSAUgiAAQgbAAgVgRgAAfgNQgBgOgJgIQgIgHgNAAQgNAAgIAHQgHAIgCAOIA9AAIAAAAg");
	this.shape_20.setTransform(-60.4937,27.725);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AAaBHIAAhTQgBgLgDgGQgFgLgPAAQgRAAgHAQQgDAIAAANIAABKIgkAAIAAiJIAjAAIAAAUQAGgLAHgFQALgIAQAAQAVAAAOALQAOAMAAAaIAABcg");
	this.shape_21.setTransform(-75.85,27.525);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AgSATIAAglIAlAAIAAAlg");
	this.shape_22.setTransform(-87.45,32.7);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("AAZBHIAAhTQAAgLgDgGQgFgLgOAAQgSAAgHAQQgDAIAAANIAABKIgkAAIAAiJIAjAAIAAAUQAGgLAHgFQALgIAQAAQAVAAAOALQAOAMAAAaIAABcg");
	this.shape_23.setTransform(-98.9,27.525);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("Ag0A+QgMgLAAgUQAAgZAUgLQALgFAVgDIAMgCQAJgBAFgCQAHgDABgHQgBgJgGgDQgGgDgKAAQgNAAgGAGQgDAFgCAIIgiAAQABgSAJgMQAOgSAjAAQAWAAASAJQASAJAAAZIAAA/IAAAPQAAAIACACQACACADACIAAAFIgnAAIgCgHIgBgIQgIAHgKAGQgLAHgOAAQgUAAgMgLgAAPAFIgKACIgHACQgMACgGACQgIAGAAAKQAAAJAGAFQAEADAIAAQALABAKgIQAKgGABgTIAAgNg");
	this.shape_24.setTransform(-114.05,27.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("AgvA8QgPgOAAgVIAkAAQABAJAEAFQAHAHARAAQALAAAGgDQAHgDAAgHQAAgGgGgDQgFgDgfgIQgYgGgKgIQgJgIAAgRQAAgTAPgNQAPgOAbgBQAZAAAQALQARALACAZIgkAAQgBgHgDgEQgGgIgNAAQgMABgFADQgFADAAAGQAAAGAFADQAGACAfAIQAWAFAKAJQALALAAAPQAAAUgPAOQgQAMggAAQgfAAgQgNg");
	this.shape_25.setTransform(-128.575,27.7);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#595959").s().p("Ag0A+QgMgLAAgUQAAgZAUgLQAKgFAWgDIAMgCQAJgBAFgCQAHgDABgHQgBgJgFgDQgHgDgKAAQgNAAgFAGQgEAFgCAIIgjAAQACgSAJgMQAOgSAjAAQAWAAASAJQASAJAAAZIAAA/IAAAPQAAAIACACQABACAEACIAAAFIgnAAIgCgHIgBgIQgIAHgKAGQgLAHgOAAQgUAAgMgLgAAPAFIgKACIgHACQgMACgFACQgJAGAAAKQAAAJAGAFQAFADAHAAQALABAKgIQAKgGABgTIAAgNg");
	this.shape_26.setTransform(-142.95,27.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#595959").s().p("AAUBdIghg7IgPAQIAAArIgjAAIAAi5IAjAAIAABkIAtgzIAtAAIgxAyIAzBWg");
	this.shape_27.setTransform(-156.6,25.275);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#595959").s().p("AgsBZQgRgKgCgWIAoAAQABAHAEACQAGAFAMABQAUAAAHgOQAEgIAAgUIAAgJQgFAKgGAEQgLAIgQAAQgbAAgQgTQgQgTAAgeQAAgfAPgVQAQgVAcAAQAJAAAIADQANAGAIAOIAAgUIAkAAIAACDQAAAagJAOQgQAXgrAAQgaAAgRgKgAgYgxQgEAKAAAOQAAAMAEAJQAHARASAAQANAAAIgKQAJgJAAgUQAAgUgIgLQgIgJgOgBQgSABgHARg");
	this.shape_28.setTransform(-172.975,30.35);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#595959").s().p("AAZBHIAAhTQAAgLgCgGQgGgLgPAAQgRAAgGAQQgEAIAAANIAABKIglAAIAAiJIAjAAIAAAUQAIgLAGgFQALgIAQAAQAWAAANALQANAMAAAaIAABcg");
	this.shape_29.setTransform(-188.4,27.525);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#595959").s().p("AgRBeIAAiJIAjAAIAACJgAgRg8IAAghIAjAAIAAAhg");
	this.shape_30.setTransform(-199.975,25.175);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#595959").s().p("AgnBHIAAiKIAiAAIAAAYQAIgNAGgFQAKgJAQAAIACAAIADAAIAAAlIgGAAIgEAAQgWAAgIAOQgDAIAAAQIAABCg");
	this.shape_31.setTransform(-207.975,27.525);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#EA5547").s().p("AghB2IAAhDIBDAAIAABDgAghgxIAAhEIBDAAIAABEg");
	this.shape_32.setTransform(32.45,-16.925);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#EA5547").s().p("AhTBjQgmgeAAhDQAAg/AigiQAigiA1AAQAfAAAaALQAaAMARAZQAPAVAEAeQADAQgBAfIixAAQABAlAYAPQAPAJAUAAQAWAAANgLQAIgHAFgKIBCAAQgDAWgVAWQghAkg7AAQgwAAglgfgAA3gYQgCgZgPgOQgQgNgWAAQgYAAgOAOQgNAOgEAYIBuAAIAAAAg");
	this.shape_33.setTransform(11.5036,-17.3);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#EA5547").s().p("AhGB9IAAj0IA9AAIAAArQAOgYALgJQASgPAdAAIADAAIAFAAIAABCIgLgBIgHgBQgnAAgNAaQgHAOAAAcIAAB1g");
	this.shape_34.setTransform(-9.575,-17.675);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#EA5547").s().p("AhdBcQgfgmAAg2QAAg0AfgnQAfgnA+AAQA/AAAfAnQAfAnAAA0QAAA2gfAmQgfAmg/AAQg+AAgfgmgAgqg4QgPAUgBAkQABAlAPATQAOAUAcAAQAcAAAPgUQAPgTAAglQAAgkgPgUQgPgUgcAAQgcAAgOAUg");
	this.shape_35.setTransform(-33.65,-17.35);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#EA5547").s().p("ABtB9IAAibQAAgOgEgJQgJgRgXAAQgaAAgKAWQgFAMAAAQIAACRIhAAAIAAiRQABgWgFgJQgJgSgXAAQgbAAgKASQgFAJAAAVIAACSIhBAAIAAj0IA+AAIAAAkQAMgTALgIQASgOAeAAQAdAAAPAMQAPAMAGARQANgVATgKQAUgKAYAAQAQAAAQAGQAQAGANAQQAJANAEASQACANAAAXIAACag");
	this.shape_36.setTransform(-68.1,-17.65);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#595959").s().p("AhZCHQgdgkAAg1QAAg/AdgjQAdgkAwAAQAVAAARAJQASALALAQIAAh0IBAAAIAAFKIg+AAIAAgjQgNAXgSAKQgSAJgZAAQgqAAgegigAgngLQgNAUAAAfQAAAiANAVQAOAUAaAAQAbAAAOgUQAOgUAAggQAAgsgWgUQgOgLgTAAQgbAAgNAVg");
	this.shape_37.setTransform(-116.025,-21.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#595959").s().p("AhcBvQgWgUAAgiQAAguAjgTQATgLAmgEIAVgEQARgCAIgDQANgGAAgMQAAgQgKgFQgKgGgUABQgXAAgKALQgGAIgDAOIg+AAQACggAQgVQAaggA+AAQAnAAAgAQQAgAQgBAsIAABwIAAAbQACANADAFQADAEAGADIAAAKIhGAAIgDgPIgCgOQgOAOgSAKQgTAMgaAAQgiAAgVgSgAAZAIIgRAFIgOACQgUAFgJAEQgPAJAAASQAAARAJAIQAJAGANAAQAUAAASgMQASgLAAghIAAgXg");
	this.shape_38.setTransform(-142.05,-17.3);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#595959").s().p("AhTBjQgmgeAAhDQAAg/AigiQAigiA1AAQAfAAAaALQAaAMARAZQAPAVAEAeQADAQgBAfIixAAQABAlAYAPQAPAJAUAAQAWAAANgLQAIgHAFgKIBCAAQgDAWgVAWQghAkg7AAQgwAAglgfgAA3gYQgCgZgPgOQgQgNgWAAQgYAAgOAOQgNAOgEAYIBuAAIAAAAg");
	this.shape_39.setTransform(-167.2464,-17.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#595959").s().p("AA7CmIgFgSIgDgdIAAgfQgBgfgKgLQgLgLgdAAIhCAAIAACDIhEAAIAAlLICeAAQAhABATAIQASAIANAPQAKANAHAPQAFAPABAUQAAAYgNAXQgMAWgaAIQAWAKAKAQQAKARAAAkIAAAVIABAgQADAMAKAGIAAAJgAhCgSIBJAAQAXAAALgFQATgKAAgcQAAgegTgKQgLgGgVAAIhLAAg");
	this.shape_40.setTransform(-196.5,-21.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.6,-42.5,431.29999999999995,85.1);


(lib.Tween100 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.FotoJas3();
	this.instance.setTransform(-27.35,-36.3,1.0315,1.0315);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.3,-36.3,54.7,72.6);


(lib.Tween99 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.FotoJas3();
	this.instance.setTransform(-27.35,-36.3,1.0315,1.0315);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.3,-36.3,54.7,72.6);


(lib.Tween98 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgRAlIAAhIIAMAAIAAANQABgEAFgFQAFgGAIABIABAAIADAAIAAANIgCgBIgCAAQgKAAgEAHQgFAFAAAIIAAApg");
	this.shape.setTransform(94.325,11.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgXAdQgJgKAAgSQAAgRAJgLQAKgLAOAAQAIAAAHAEQAHAEAEAGQAEAFABAHQABAGAAAKIg0AAQAAALAFAGQAFAHAJAAQAKAAAFgGQAEgEABgFIAMAAQAAAEgDAFQgDAFgDADQgGAGgIACIgJABQgOAAgJgKgAAUgFQAAgIgDgFQgFgJgMAAQgHAAgGAGQgGAGAAAKIAnAAIAAAAg");
	this.shape_1.setTransform(87.675,11.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgWAqQgJgLAAgRQAAgPAIgMQAIgLAPAAQAHAAAGADQADACAEAFIAAglIAMAAIAABkIgLAAIAAgKQgEAHgGADQgGADgGAAQgNAAgIgKgAgNgGQgFAGAAANQAAAMAFAIQAEAIAKAAQAJAAAFgHQAGgIAAgNQAAgNgGgHQgFgHgJAAQgIAAgGAIg");
	this.shape_2.setTransform(79.725,10.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AARAlIAAgsQAAgIgCgDQgDgIgIAAIgHABQgFACgDAFQgEADAAAEIgBALIAAAlIgNAAIAAhIIAMAAIAAAKQAFgFAGgEQAGgCAGAAQAPgBAGALQADAGAAAMIAAAtg");
	this.shape_3.setTransform(72.225,11.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgZAbQgDgGAAgJIAAgxIAMAAIAAAwQABAFABAEQAEAGAIAAQAMAAAEgLQACgGABgKIAAgkIAMAAIAABIIgMAAIABgKQgDAEgEADQgGAFgKAAQgPAAgFgKg");
	this.shape_4.setTransform(64.4,11.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgYAdQgJgLAAgRQAAgRAJgLQAKgLAPAAQANAAAKAKQAKAJAAATQAAAQgJALQgIAMgRAAQgQAAgIgKgAgQgSQgEAIAAALQAAAMAEAHQAGAJAKgBQAMABAFgKQAEgJAAgKQAAgLgDgGQgFgKgNAAQgKAAgGAJg");
	this.shape_5.setTransform(56.65,11.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgiAyIAAhjIBFAAIAAAMIg3AAIAAAfIAwAAIAAALIgwAAIAAAtg");
	this.shape_6.setTransform(48.975,10.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgQAGIAAgLIAhAAIAAALg");
	this.shape_7.setTransform(41.95,11.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgYAdQgJgLAAgRQAAgRAJgLQAKgLAOAAQAPAAAJAKQAKAJAAATQAAAQgJALQgJAMgRAAQgOAAgJgKgAgQgSQgEAIAAALQAAAMAEAHQAGAJAKgBQAMABAEgKQAFgJAAgKQAAgLgEgGQgEgKgNAAQgKAAgGAJg");
	this.shape_8.setTransform(35.7,11.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AgcAqQgPgOAAgcQAAgWAMgOQAMgQAWAAQASAAALAKQAKAKABANIgNAAQgCgKgHgFQgHgGgLAAQgOAAgJAKQgJALAAAUQAAASAIALQAIALAQAAQAOAAAIgMQAEgGACgKIANAAQgBAQgKALQgMANgVAAQgPAAgNgLg");
	this.shape_9.setTransform(26.8,10.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgQAGIAAgLIAhAAIAAALg");
	this.shape_10.setTransform(15.6,11.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgWAfQgHgHgBgLIANAAQAAAGADADQAEAHALAAQAHAAAFgEQAGgDAAgGQAAgEgFgDIgLgEIgIgCQgKgCgFgCQgHgFgBgJQAAgKAIgGQAHgHANAAQARAAAGAJQAGAHgBAHIgMAAQAAgFgDgDQgDgEgLgBQgGAAgEADQgEADAAAEQAAAFAFADIAIADIAHACQAOADAEACQAIAEAAALQgBAJgHAHQgIAIgOAAQgQAAgHgIg");
	this.shape_11.setTransform(5.95,11.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgZAbQgDgGAAgJIAAgxIAMAAIAAAwQABAFABAEQADAGAJAAQAMAAAEgLQADgGAAgKIAAgkIAMAAIAABIIgMAAIABgKQgDAEgEADQgGAFgKAAQgOAAgGgKg");
	this.shape_12.setTransform(-1.5,11.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AARAlIAAgsQAAgIgCgDQgDgIgIAAIgHABQgFACgDAFQgEADAAAEIgBALIAAAlIgNAAIAAhIIAMAAIAAAKQAFgFAGgEQAGgCAGAAQAPgBAGALQADAGAAAMIAAAtg");
	this.shape_13.setTransform(-9.175,11.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgbAhQgHgHAAgJQAAgKAHgGQAGgEAKgCIATgCQAEgBACgDIABgEQAAgHgFgCQgEgDgIAAQgJAAgEAFQgDADAAAFIgMAAQABgNAIgFQAIgGAMAAQALAAAIAFQAIAFAAAKIAAAqIABADIAEABIABAAIADAAIAAAJIgFABIgEAAQgGAAgDgFIgCgGQgEAEgHAEQgGAEgJAAQgKAAgGgGgAAIABIgHACIgGABQgHABgDACQgGADAAAHQAAAFAEADQAEADAFAAQAHAAAFgDQAKgFAAgLIAAgJIgGABg");
	this.shape_14.setTransform(-16.775,11.775);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgFAyIAAhIIALAAIAABIgAgFgjIAAgOIALAAIAAAOg");
	this.shape_15.setTransform(-22.375,10.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AgGAkIgbhIIAOAAIATA7IAUg7IAOAAIgcBIg");
	this.shape_16.setTransform(-27.425,11.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AgbAhQgHgHAAgJQAAgKAHgGQAGgEAKgCIATgCQAEgBACgDIABgEQAAgHgFgCQgEgDgIAAQgJAAgEAFQgDADAAAFIgMAAQABgNAIgFQAIgGAMAAQALAAAIAFQAIAFAAAKIAAAqIABADIAEABIABAAIADAAIAAAJIgFABIgEAAQgGAAgDgFIgCgGQgEAEgHAEQgGAEgJAAQgKAAgGgGgAAIABIgHACIgGABQgHABgDACQgGADAAAHQAAAFAEADQAEADAFAAQAHAAAFgDQAKgFAAgLIAAgJIgGABg");
	this.shape_17.setTransform(-34.625,11.775);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AAIAvQgIAAgDgEQgDgEAAgHIAAgwIgKAAIAAgKIAKAAIAAgUIALAAIAAAUIAMAAIAAAKIgMAAIAAAvQAAAEADABIAFABIABAAIADgBIAAAKIgFABg");
	this.shape_18.setTransform(-40.65,10.775);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AAOAyIgWglIgKAKIAAAbIgLAAIAAhjIALAAIAAA5IAfgeIAQAAIgdAaIAeAug");
	this.shape_19.setTransform(-45.575,10.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AgkAlQgMgOAAgXQAAgTAKgPQANgSAZAAQAaAAANARQAKAOAAAUQAAAWgLAOQgOASgYAAQgXAAgNgQgAgYgdQgKAKAAAUQAAARAJALQAIAMASAAQASAAAIgNQAIgNAAgPQAAgTgKgKQgIgLgQAAQgQAAgJALg");
	this.shape_20.setTransform(-54.9,10.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AARAlIAAgsQAAgIgCgDQgDgIgIAAIgHABQgFACgDAFQgEADAAAEIgBALIAAAlIgNAAIAAhIIAMAAIAAAKQAFgFAGgEQAGgCAGAAQAPgBAGALQADAGAAAMIAAAtg");
	this.shape_21.setTransform(-68.075,11.65);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AgbAhQgHgHAAgJQAAgKAHgGQAGgEAKgCIATgCQAEgBACgDIABgEQAAgHgFgCQgEgDgIAAQgJAAgEAFQgDADAAAFIgMAAQABgNAIgFQAIgGAMAAQALAAAIAFQAIAFAAAKIAAAqIABADIAEABIABAAIADAAIAAAJIgFABIgEAAQgGAAgDgFIgCgGQgEAEgHAEQgGAEgJAAQgKAAgGgGgAAIABIgHACIgGABQgHABgDACQgGADAAAHQAAAFAEADQAEADAFAAQAHAAAFgDQAKgFAAgLIAAgJIgGABg");
	this.shape_22.setTransform(-75.675,11.775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("AgGAkIgbhIIAOAAIATA7IAUg7IAOAAIgcBIg");
	this.shape_23.setTransform(-83.225,11.75);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AgkAyIAAhjIBIAAIAAAMIg7AAIAAAfIA3AAIAAAKIg3AAIAAAiIA8AAIAAAMg");
	this.shape_24.setTransform(-91.1,10.375);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#EA5547").s().p("AgGArQgDgDAAgHIAAgtIgLAAIAAgOIALAAIAAgVIASAAIAAAVIAMAAIAAAOIgMAAIAAAmQAAAFABABQABABAGAAIACAAIACAAIAAAOIgJABIgDAAQgLAAgEgFg");
	this.shape_25.setTransform(93.825,-12.4229);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#EA5547").s().p("AgYAfQgMgKAAgVQAAgSALgKQAJgKAQAAQAKAAAIADQAIADAFAIQAEAHACAIIAAAOIg1AAQAAAMAIAEQAEACAGABQAGAAAEgDQADgDABgDIAUAAQAAAHgHAGQgKAMgSAAQgOgBgLgIgAARgHQgBgIgEgEQgFgDgHAAQgGgBgFAFQgDAEgBAHIAgAAIAAAAg");
	this.shape_26.setTransform(87.85,-11.45);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#EA5547").s().p("AAOAmIAAgsQAAgGgCgDQgDgGgIAAQgJAAgDAJQgCAEAAAHIAAAnIgUAAIAAhJIATAAIAAALIAHgJQAGgEAJAAQALAAAHAGQAIAGAAAOIAAAxg");
	this.shape_27.setTransform(79.575,-11.575);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#595959").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_28.setTransform(73.375,-8.775);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#595959").s().p("AAOAmIAAgsQAAgGgCgDQgDgGgIAAQgJAAgDAJQgCAEAAAHIAAAnIgUAAIAAhJIATAAIAAALIAHgJQAGgEAJAAQALAAAHAGQAIAGAAAOIAAAxg");
	this.shape_29.setTransform(67.175,-11.575);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#595959").s().p("AgcAhQgGgFAAgLQAAgOALgFQAFgDAMgCIAGgBIAHgBQAFgCAAgDQAAgFgDgCQgEgBgFAAQgHgBgDAEQgCACgBAFIgTAAQABgKAFgHQAIgKASABQAMAAAKAEQAJAGAAANIAAAhIAAAIIABAGIADACIAAADIgVAAIgCgEIAAgFIgJAHQgFAFgJAAQgJgBgIgGgAAIADIgFABIgEABIgJACQgEADAAAFQAAAFACADQADACAEAAQAFAAAGgDQAFgEABgKIAAgHg");
	this.shape_30.setTransform(59.05,-11.45);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#595959").s().p("AgZAgQgIgHAAgMIATAAQACAFACADQADADAJAAQAFAAAEgBQAEgCAAgEQgBgCgDgCQgCgCgRgEQgNgEgFgDQgFgFAAgIQAAgLAIgHQAJgHAOAAQANAAAJAFQAJAFABAOIgUAAIgCgGQgDgDgHAAQgGAAgCACQgDABAAADQAAADADACQACABARAEQAMADAFAEQAGAGAAAJQAAAKgIAIQgIAGgSABQgQAAgJgIg");
	this.shape_31.setTransform(51.25,-11.45);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#595959").s().p("AgcAhQgGgFAAgLQAAgOALgFQAFgDAMgCIAGgBIAHgBQAFgCAAgDQAAgFgEgCQgDgBgFAAQgHgBgDAEQgCACgBAFIgSAAQAAgKAFgHQAHgKATABQAMAAAKAEQAJAGAAANIAAAhIAAAIIABAGIADACIAAADIgVAAIgBgEIgBgFIgJAHQgFAFgJAAQgKgBgHgGgAAIADIgFABIgEABIgJACQgFADABAFQAAAFACADQADACAEAAQAGAAAFgDQAGgEAAgKIAAgHg");
	this.shape_32.setTransform(43.55,-11.45);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#595959").s().p("AAKAyIgRggIgHAJIAAAXIgUAAIAAhjIAUAAIAAA1IAXgbIAYAAIgbAbIAcAug");
	this.shape_33.setTransform(36.25,-12.775);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#595959").s().p("AgXAwQgJgGgBgLIAVAAIADAFQADADAGgBQALABAEgIQACgEAAgKIAAgGQgDAFgEADQgFAFgJgBQgOAAgIgKQgJgKAAgQQAAgQAJgMQAHgLAPAAQAFAAAFABQAGADAFAIIAAgLIATAAIAABGQAAAPgFAHQgJANgWAAQgOgBgJgFgAgNgZQgCAEAAAIQAAAGACAGQAFAIAIAAQAHAAAFgFQAFgFAAgLQAAgKgFgGQgEgFgIAAQgJgBgEALg");
	this.shape_34.setTransform(27.4,-10.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#595959").s().p("AAOAmIAAgsQAAgGgCgDQgDgGgIAAQgJAAgDAJQgCAEAAAHIAAAnIgUAAIAAhJIATAAIAAALIAHgJQAGgEAJAAQALAAAHAGQAIAGAAAOIAAAxg");
	this.shape_35.setTransform(19.075,-11.575);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#595959").s().p("AgJAzIAAhKIATAAIAABKgAgJggIAAgSIATAAIAAASg");
	this.shape_36.setTransform(12.875,-12.825);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#595959").s().p("AgUAmIAAhJIASAAIAAANQAEgIADgCQAGgFAIAAIABAAIABAAIAAAUIgDAAIgCAAQgMAAgEAHQgBAFAAAIIAAAjg");
	this.shape_37.setTransform(8.6,-11.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-98.2,-20.5,196.5,41.1);


(lib.Tween97 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgRAlIAAhIIAMAAIAAANQABgEAFgFQAFgGAIABIABAAIADAAIAAANIgCgBIgCAAQgKAAgEAHQgFAFAAAIIAAApg");
	this.shape.setTransform(94.325,11.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgXAdQgJgKAAgSQAAgRAJgLQAKgLAOAAQAIAAAHAEQAHAEAEAGQAEAFABAHQABAGAAAKIg0AAQAAALAFAGQAFAHAJAAQAKAAAFgGQAEgEABgFIAMAAQAAAEgDAFQgDAFgDADQgGAGgIACIgJABQgOAAgJgKgAAUgFQAAgIgDgFQgFgJgMAAQgHAAgGAGQgGAGAAAKIAnAAIAAAAg");
	this.shape_1.setTransform(87.675,11.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgWAqQgJgLAAgRQAAgPAIgMQAIgLAPAAQAHAAAGADQADACAEAFIAAglIAMAAIAABkIgLAAIAAgKQgEAHgGADQgGADgGAAQgNAAgIgKgAgNgGQgFAGAAANQAAAMAFAIQAEAIAKAAQAJAAAFgHQAGgIAAgNQAAgNgGgHQgFgHgJAAQgIAAgGAIg");
	this.shape_2.setTransform(79.725,10.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AARAlIAAgsQAAgIgCgDQgDgIgIAAIgHABQgFACgDAFQgEADAAAEIgBALIAAAlIgNAAIAAhIIAMAAIAAAKQAFgFAGgEQAGgCAGAAQAPgBAGALQADAGAAAMIAAAtg");
	this.shape_3.setTransform(72.225,11.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgZAbQgDgGAAgJIAAgxIAMAAIAAAwQABAFABAEQAEAGAIAAQAMAAAEgLQACgGABgKIAAgkIAMAAIAABIIgMAAIABgKQgDAEgEADQgGAFgKAAQgPAAgFgKg");
	this.shape_4.setTransform(64.4,11.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgYAdQgJgLAAgRQAAgRAJgLQAKgLAPAAQANAAAKAKQAKAJAAATQAAAQgJALQgIAMgRAAQgQAAgIgKgAgQgSQgEAIAAALQAAAMAEAHQAGAJAKgBQAMABAFgKQAEgJAAgKQAAgLgDgGQgFgKgNAAQgKAAgGAJg");
	this.shape_5.setTransform(56.65,11.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgiAyIAAhjIBFAAIAAAMIg3AAIAAAfIAwAAIAAALIgwAAIAAAtg");
	this.shape_6.setTransform(48.975,10.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgQAGIAAgLIAhAAIAAALg");
	this.shape_7.setTransform(41.95,11.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgYAdQgJgLAAgRQAAgRAJgLQAKgLAOAAQAPAAAJAKQAKAJAAATQAAAQgJALQgJAMgRAAQgOAAgJgKgAgQgSQgEAIAAALQAAAMAEAHQAGAJAKgBQAMABAEgKQAFgJAAgKQAAgLgEgGQgEgKgNAAQgKAAgGAJg");
	this.shape_8.setTransform(35.7,11.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AgcAqQgPgOAAgcQAAgWAMgOQAMgQAWAAQASAAALAKQAKAKABANIgNAAQgCgKgHgFQgHgGgLAAQgOAAgJAKQgJALAAAUQAAASAIALQAIALAQAAQAOAAAIgMQAEgGACgKIANAAQgBAQgKALQgMANgVAAQgPAAgNgLg");
	this.shape_9.setTransform(26.8,10.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgQAGIAAgLIAhAAIAAALg");
	this.shape_10.setTransform(15.6,11.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgWAfQgHgHgBgLIANAAQAAAGADADQAEAHALAAQAHAAAFgEQAGgDAAgGQAAgEgFgDIgLgEIgIgCQgKgCgFgCQgHgFgBgJQAAgKAIgGQAHgHANAAQARAAAGAJQAGAHgBAHIgMAAQAAgFgDgDQgDgEgLgBQgGAAgEADQgEADAAAEQAAAFAFADIAIADIAHACQAOADAEACQAIAEAAALQgBAJgHAHQgIAIgOAAQgQAAgHgIg");
	this.shape_11.setTransform(5.95,11.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgZAbQgDgGAAgJIAAgxIAMAAIAAAwQABAFABAEQADAGAJAAQAMAAAEgLQADgGAAgKIAAgkIAMAAIAABIIgMAAIABgKQgDAEgEADQgGAFgKAAQgOAAgGgKg");
	this.shape_12.setTransform(-1.5,11.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AARAlIAAgsQAAgIgCgDQgDgIgIAAIgHABQgFACgDAFQgEADAAAEIgBALIAAAlIgNAAIAAhIIAMAAIAAAKQAFgFAGgEQAGgCAGAAQAPgBAGALQADAGAAAMIAAAtg");
	this.shape_13.setTransform(-9.175,11.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgbAhQgHgHAAgJQAAgKAHgGQAGgEAKgCIATgCQAEgBACgDIABgEQAAgHgFgCQgEgDgIAAQgJAAgEAFQgDADAAAFIgMAAQABgNAIgFQAIgGAMAAQALAAAIAFQAIAFAAAKIAAAqIABADIAEABIABAAIADAAIAAAJIgFABIgEAAQgGAAgDgFIgCgGQgEAEgHAEQgGAEgJAAQgKAAgGgGgAAIABIgHACIgGABQgHABgDACQgGADAAAHQAAAFAEADQAEADAFAAQAHAAAFgDQAKgFAAgLIAAgJIgGABg");
	this.shape_14.setTransform(-16.775,11.775);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgFAyIAAhIIALAAIAABIgAgFgjIAAgOIALAAIAAAOg");
	this.shape_15.setTransform(-22.375,10.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AgGAkIgbhIIAOAAIATA7IAUg7IAOAAIgcBIg");
	this.shape_16.setTransform(-27.425,11.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AgbAhQgHgHAAgJQAAgKAHgGQAGgEAKgCIATgCQAEgBACgDIABgEQAAgHgFgCQgEgDgIAAQgJAAgEAFQgDADAAAFIgMAAQABgNAIgFQAIgGAMAAQALAAAIAFQAIAFAAAKIAAAqIABADIAEABIABAAIADAAIAAAJIgFABIgEAAQgGAAgDgFIgCgGQgEAEgHAEQgGAEgJAAQgKAAgGgGgAAIABIgHACIgGABQgHABgDACQgGADAAAHQAAAFAEADQAEADAFAAQAHAAAFgDQAKgFAAgLIAAgJIgGABg");
	this.shape_17.setTransform(-34.625,11.775);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AAIAvQgIAAgDgEQgDgEAAgHIAAgwIgKAAIAAgKIAKAAIAAgUIALAAIAAAUIAMAAIAAAKIgMAAIAAAvQAAAEADABIAFABIABAAIADgBIAAAKIgFABg");
	this.shape_18.setTransform(-40.65,10.775);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AAOAyIgWglIgKAKIAAAbIgLAAIAAhjIALAAIAAA5IAfgeIAQAAIgdAaIAeAug");
	this.shape_19.setTransform(-45.575,10.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AgkAlQgMgOAAgXQAAgTAKgPQANgSAZAAQAaAAANARQAKAOAAAUQAAAWgLAOQgOASgYAAQgXAAgNgQgAgYgdQgKAKAAAUQAAARAJALQAIAMASAAQASAAAIgNQAIgNAAgPQAAgTgKgKQgIgLgQAAQgQAAgJALg");
	this.shape_20.setTransform(-54.9,10.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AARAlIAAgsQAAgIgCgDQgDgIgIAAIgHABQgFACgDAFQgEADAAAEIgBALIAAAlIgNAAIAAhIIAMAAIAAAKQAFgFAGgEQAGgCAGAAQAPgBAGALQADAGAAAMIAAAtg");
	this.shape_21.setTransform(-68.075,11.65);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AgbAhQgHgHAAgJQAAgKAHgGQAGgEAKgCIATgCQAEgBACgDIABgEQAAgHgFgCQgEgDgIAAQgJAAgEAFQgDADAAAFIgMAAQABgNAIgFQAIgGAMAAQALAAAIAFQAIAFAAAKIAAAqIABADIAEABIABAAIADAAIAAAJIgFABIgEAAQgGAAgDgFIgCgGQgEAEgHAEQgGAEgJAAQgKAAgGgGgAAIABIgHACIgGABQgHABgDACQgGADAAAHQAAAFAEADQAEADAFAAQAHAAAFgDQAKgFAAgLIAAgJIgGABg");
	this.shape_22.setTransform(-75.675,11.775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("AgGAkIgbhIIAOAAIATA7IAUg7IAOAAIgcBIg");
	this.shape_23.setTransform(-83.225,11.75);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AgkAyIAAhjIBIAAIAAAMIg7AAIAAAfIA3AAIAAAKIg3AAIAAAiIA8AAIAAAMg");
	this.shape_24.setTransform(-91.1,10.375);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("AgGArQgDgDAAgHIAAgtIgLAAIAAgOIALAAIAAgVIASAAIAAAVIAMAAIAAAOIgMAAIAAAmQAAAFABABQABABAGAAIACAAIACAAIAAAOIgJABIgDAAQgLAAgEgFg");
	this.shape_25.setTransform(93.825,-12.4229);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#595959").s().p("AgYAfQgMgKAAgVQAAgSALgKQAJgKAQAAQAKAAAIADQAIADAFAIQAEAHACAIIAAAOIg1AAQAAAMAIAEQAEACAGABQAGAAAEgDQADgDABgDIAUAAQAAAHgHAGQgKAMgSAAQgOgBgLgIgAARgHQgBgIgEgEQgFgDgHAAQgGgBgFAFQgDAEgBAHIAgAAIAAAAg");
	this.shape_26.setTransform(87.85,-11.45);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#595959").s().p("AAOAmIAAgsQAAgGgCgDQgDgGgIAAQgJAAgDAJQgCAEAAAHIAAAnIgUAAIAAhJIATAAIAAALIAHgJQAGgEAJAAQALAAAHAGQAIAGAAAOIAAAxg");
	this.shape_27.setTransform(79.575,-11.575);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#595959").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_28.setTransform(73.375,-8.775);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#595959").s().p("AAOAmIAAgsQAAgGgCgDQgDgGgIAAQgJAAgDAJQgCAEAAAHIAAAnIgUAAIAAhJIATAAIAAALIAHgJQAGgEAJAAQALAAAHAGQAIAGAAAOIAAAxg");
	this.shape_29.setTransform(67.175,-11.575);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#595959").s().p("AgcAhQgGgFAAgLQAAgOALgFQAFgDAMgCIAGgBIAHgBQAFgCAAgDQAAgFgDgCQgEgBgFAAQgHgBgDAEQgCACgBAFIgTAAQABgKAFgHQAIgKASABQAMAAAKAEQAJAGAAANIAAAhIAAAIIABAGIADACIAAADIgVAAIgCgEIAAgFIgJAHQgFAFgJAAQgJgBgIgGgAAIADIgFABIgEABIgJACQgEADAAAFQAAAFACADQADACAEAAQAFAAAGgDQAFgEABgKIAAgHg");
	this.shape_30.setTransform(59.05,-11.45);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#595959").s().p("AgZAgQgIgHAAgMIATAAQACAFACADQADADAJAAQAFAAAEgBQAEgCAAgEQgBgCgDgCQgCgCgRgEQgNgEgFgDQgFgFAAgIQAAgLAIgHQAJgHAOAAQANAAAJAFQAJAFABAOIgUAAIgCgGQgDgDgHAAQgGAAgCACQgDABAAADQAAADADACQACABARAEQAMADAFAEQAGAGAAAJQAAAKgIAIQgIAGgSABQgQAAgJgIg");
	this.shape_31.setTransform(51.25,-11.45);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#595959").s().p("AgcAhQgGgFAAgLQAAgOALgFQAFgDAMgCIAGgBIAHgBQAFgCAAgDQAAgFgEgCQgDgBgFAAQgHgBgDAEQgCACgBAFIgSAAQAAgKAFgHQAHgKATABQAMAAAKAEQAJAGAAANIAAAhIAAAIIABAGIADACIAAADIgVAAIgBgEIgBgFIgJAHQgFAFgJAAQgKgBgHgGgAAIADIgFABIgEABIgJACQgFADABAFQAAAFACADQADACAEAAQAGAAAFgDQAGgEAAgKIAAgHg");
	this.shape_32.setTransform(43.55,-11.45);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#595959").s().p("AAKAyIgRggIgHAJIAAAXIgUAAIAAhjIAUAAIAAA1IAXgbIAYAAIgbAbIAcAug");
	this.shape_33.setTransform(36.25,-12.775);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#595959").s().p("AgXAwQgJgGgBgLIAVAAIADAFQADADAGgBQALABAEgIQACgEAAgKIAAgGQgDAFgEADQgFAFgJgBQgOAAgIgKQgJgKAAgQQAAgQAJgMQAHgLAPAAQAFAAAFABQAGADAFAIIAAgLIATAAIAABGQAAAPgFAHQgJANgWAAQgOgBgJgFgAgNgZQgCAEAAAIQAAAGACAGQAFAIAIAAQAHAAAFgFQAFgFAAgLQAAgKgFgGQgEgFgIAAQgJgBgEALg");
	this.shape_34.setTransform(27.4,-10.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#595959").s().p("AAOAmIAAgsQAAgGgCgDQgDgGgIAAQgJAAgDAJQgCAEAAAHIAAAnIgUAAIAAhJIATAAIAAALIAHgJQAGgEAJAAQALAAAHAGQAIAGAAAOIAAAxg");
	this.shape_35.setTransform(19.075,-11.575);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#595959").s().p("AgJAzIAAhKIATAAIAABKgAgJggIAAgSIATAAIAAASg");
	this.shape_36.setTransform(12.875,-12.825);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#595959").s().p("AgUAmIAAhJIASAAIAAANQAEgIADgCQAGgFAIAAIABAAIABAAIAAAUIgDAAIgCAAQgMAAgEAHQgBAFAAAIIAAAjg");
	this.shape_37.setTransform(8.6,-11.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-98.2,-20.5,196.5,41.1);


(lib.Tween96 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AhfCaICokzIAXAAIinEzgAAzB8QgVgVAAgeQAAgfAVgVQAWgVAeAAQAeAAAWAVQAVAVAAAfQAAAegVAVQgWAWgeAAQgeAAgWgWgABJAqQgOANAAASQAAASAOAMQAMANASAAQASAAANgNQAMgMAAgSQAAgSgMgNQgNgNgSAAQgSAAgMANgAiZgUQgWgVAAgfQAAgeAWgVQAUgWAfAAQAeAAAWAWQAVAVAAAeQAAAfgVAVQgWAUgeAAQgfAAgUgUgAiFhmQgMAMAAASQAAASAMANQANANASAAQASAAANgNQAMgNAAgSQAAgRgMgNQgNgNgSAAQgSAAgNANg");
	this.shape.setTransform(22.8,110.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AhRBrQgWgnAAhCQAAgyANglQAZhEBBAAQA5AAAaAwQAVAlAABAQAAA9gTAoQgaA5g7AAQg2AAgbgvgAgvhYQgPAfAAA8QAAAuAKAcQAPArAkAAQAdAAARgaQASgaAAhGQAAgzgNghQgMghglAAQggAAgQAfg");
	this.shape_1.setTransform(-8.375,110.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AhHCDQgcgVgDgrIAmAAQAEAhAaAMQAOAGASAAQAgABAQgWQARgVgBgbQAAgfgTgRQgTgRgZAAQgUABgOAHQgOAIgKAMIgggCIAWihICcAAIAAAlIh/AAIgOBTQALgIAJgEQASgGAVgBQApAAAcAbQAeAaAAApQAAAqgbAhQgbAgg4ABQglAAgcgVg");
	this.shape_2.setTransform(-32.25,110.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AhfCaICokzIAXAAIinEzgAAzB8QgVgVAAgeQAAgfAVgVQAWgVAeAAQAeAAAWAVQAVAVAAAfQAAAegVAVQgWAWgeAAQgeAAgWgWgABJAqQgOANAAASQAAASAOAMQAMANASAAQASAAANgNQAMgMAAgSQAAgSgMgNQgNgNgSAAQgSAAgMANgAiZgUQgWgVAAgfQAAgeAWgVQAUgWAfAAQAeAAAWAWQAVAVAAAeQAAAfgVAVQgWAUgeAAQgfAAgUgUgAiFhmQgMAMAAASQAAASAMANQANANASAAQASAAANgNQAMgNAAgSQAAgRgMgNQgNgNgSAAQgSAAgNANg");
	this.shape_3.setTransform(35.85,-116.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AhRBrQgWgnAAhCQAAgyANglQAZhEBBAAQA5AAAaAwQAVAlAABAQAAA9gTAoQgaA5g7AAQg2AAgbgvgAgvhYQgPAfAAA8QAAAuAKAcQAPArAkAAQAdAAARgaQASgaAAhGQAAgzgNghQgMghglAAQggAAgQAfg");
	this.shape_4.setTransform(4.675,-116.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AhRBrQgWgnAAhCQAAgyANglQAZhEBBAAQA5AAAaAwQAVAlAABAQAAA9gTAoQgaA5g7AAQg2AAgbgvgAgvhYQgPAfAAA8QAAAuAKAcQAPArAkAAQAdAAARgaQASgaAAhGQAAgzgNghQgMghglAAQggAAgQAfg");
	this.shape_5.setTransform(-19.225,-116.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AAPCWIAAjUIhGAAIAAgdQAqgEAPgJQAQgKAIgjIAdAAIAAErg");
	this.shape_6.setTransform(-45.2,-116.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-136.9,114.1,273.9);


(lib.Tween91 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AhKCDQgXgWAAgjIAmAAQACAfAWAMQAMAGAOAAQAbAAASgWQAUgXAHhFQgMAUgSAIQgTAIgVAAQgrAAgZgbQgZgaAAgqQAAgqAZgeQAZgfAwgBQBAABAaA6QANAhAAAxQAAA2gQArQgbBGhBABQgtAAgWgYgAgthlQgRATAAAfQAAAeAPAQQAOARAgAAQAVAAASgOQATgPAAgkQAAgigQgQQgSgQgYAAQgcAAgQASg");
	this.shape.setTransform(35.7,-3.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AAQCWIAAjUIhGAAIAAgdQAogEAQgJQAQgKAIgjIAeAAIAAErg");
	this.shape_1.setTransform(9.75,-3.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AhRBrQgWgnAAhCQAAgyANglQAZhEBBAAQA5AAAaAwQAVAlAABAQAAA9gTAoQgaA5g7AAQg2AAgbgvgAgvhYQgPAfAAA8QAAAuAKAcQAPArAkAAQAdAAARgaQASgaAAhGQAAgzgNghQgMghglAAQggAAgQAfg");
	this.shape_2.setTransform(-12.075,-3.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AhnCXQACgnAOgdQAOgdAogXIAogXQAbgPALgLQARgSAAgWQAAgbgQgPQgQgQgZAAQgmAAgPAeQgIAQgBAcIgnAAQABgoAOgYQAYgsA+AAQAzAAAYAcQAYAcAAAiQAAAkgZAZQgPAPgmAVIgcAQQgUALgNALQgUASgGAWICjAAIAAAkg");
	this.shape_3.setTransform(-35.95,-3.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.9,-23.5,99.8,47);


(lib.Tween89 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AAPCWIAAjUIhGAAIAAgdQApgEAQgJQAQgKAIgjIAeAAIAAErg");
	this.shape.setTransform(33.65,-3.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("Ag9CUQAPhWAvhVQAdgyAggkIimAAIAAgmIDRAAIAAAhQgPAOgYAjQgYAjgSAnQgTAngIAhIgQBDg");
	this.shape_1.setTransform(12.125,-3.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AhICDQgegYAAgtQAAgbANgTQANgTAZgKQgPgGgJgKQgRgQAAgbQAAgiAYgYQAZgYAsAAQArAAAYAXQAZAXAAAeQAAAcgPASQgIAKgQAJQASAIALAKQAUAVAAAiQAAAogaAcQgbAbgxAAQgrAAgegYgAgsAVQgRAOAAAcQAAAYAQAQQAPARAgABQAagBASgOQARgOAAgcQAAgdgSgPQgSgPgbAAQgbAAgRAQgAgohpQgMAOAAASQAAAWAQAMQAPAMAVAAQAYAAAPgOQAOgOAAgUQAAgQgOgOQgNgOgbgBQgbABgMAOg");
	this.shape_2.setTransform(-12.075,-3.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AAPCWIAAjUIhFAAIAAgdQApgEAPgJQAQgKAIgjIAeAAIAAErg");
	this.shape_3.setTransform(-38.05,-3.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.9,-23.5,99.8,47);


(lib.Tween87 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AAWAwIAAg6QAAgJgCgFQgFgJgKAAIgJABQgHACgEAGQgEAEgCAFIAAAPIAAAwIgRAAIAAhdIAQAAIAAANQAGgIAIgEQAIgDAHAAQAVAAAGANQAFAJAAAOIAAA7g");
	this.shape.setTransform(96.2,13.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_1.setTransform(86.075,13.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHgtIAAgSIAPAAIAAASg");
	this.shape_2.setTransform(79.2,12);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgdAoQgJgJAAgOIAPAAQAAAIAEAEQAGAHAOABQAJgBAHgDQAHgEAAgIQAAgGgGgDQgDgCgLgCIgLgEQgNgDgFgCQgLgHAAgLQAAgOAKgIQAKgIAQAAQAVAAAJANQAGAHAAAKIgPAAQAAgGgEgEQgFgGgNAAQgJgBgFAEQgFADAAAGQAAAGAHAEQADACAHACIAKACQARAFAGACQAJAGAAANQAAANgJAJQgKAJgUAAQgUAAgJgKg");
	this.shape_3.setTransform(72.775,13.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgdAoQgJgJAAgOIAPAAQAAAIAEAEQAGAHAOABQAJgBAHgDQAHgEAAgIQAAgGgGgDQgDgCgLgCIgLgEQgNgDgFgCQgLgHAAgLQAAgOAKgIQAKgIAQAAQAVAAAJANQAGAHAAAKIgPAAQAAgGgEgEQgFgGgNAAQgJgBgFAEQgFADAAAGQAAAGAHAEQADACAHACIAKACQARAFAGACQAJAGAAANQAAANgJAJQgKAJgUAAQgUAAgJgKg");
	this.shape_4.setTransform(63.775,13.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_5.setTransform(54.125,13.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgdAlQgLgOABgUQgBgYAMgOQANgOASAAQAQAAAJAIQALAIACATIgQAAQgCgJgFgGQgFgFgKAAQgPAAgGAOQgFAKABANQAAAOAFAKQAHAJALAAQAKAAAGgGQAFgGADgKIAQAAQgDATgLAIQgLAJgQAAQgSAAgLgNg");
	this.shape_6.setTransform(44.8,13.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_7.setTransform(35.125,13.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgWAwIAAhdIAPAAIAAAQQACgFAGgGQAIgHAIAAIACAAIAEAAIAAARIgCAAIgEAAQgMgBgFAIQgGAIAAAKIAAA1g");
	this.shape_8.setTransform(27.8,13.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_9.setTransform(14.175,13.775);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgFA4QgDgGAAgJIAAg+IgNAAIAAgMIANAAIAAgbIAPAAIAAAbIAPAAIAAAMIgPAAIAAA9QAAAEADADIAHABIACgBIADAAIAAAMIgGABIgGABQgKAAgFgFg");
	this.shape_10.setTransform(6.7,12.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AAWAwIAAg6QAAgJgCgFQgEgJgMAAIgIABQgGACgFAGQgEAEgCAFIgBAPIAAAwIgQAAIAAhdIAPAAIAAANQAIgIAHgEQAIgDAIAAQATAAAIANQADAJAAAOIAAA7g");
	this.shape_11.setTransform(-0.7,13.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHgtIAAgSIAPAAIAAASg");
	this.shape_12.setTransform(-7.7,12);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgWAwIAAhdIAPAAIAAAQQACgFAGgGQAIgHAIAAIACAAIAEAAIAAARIgCAAIgEAAQgLgBgGAIQgGAIAAAKIAAA1g");
	this.shape_13.setTransform(-17.1,13.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_14.setTransform(-25.725,13.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgFA4QgDgGAAgJIAAg+IgNAAIAAgMIANAAIAAgbIAPAAIAAAbIAPAAIAAAMIgPAAIAAA9QAAAEADADIAGABIADgBIADAAIAAAMIgGABIgGABQgLAAgEgFg");
	this.shape_15.setTransform(-33.2,12.5);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AAWAwIAAg6QAAgJgCgFQgFgJgKAAIgJABQgHACgEAGQgEAEgCAFIAAAPIAAAwIgRAAIAAhdIAQAAIAAANQAGgIAIgEQAIgDAHAAQAVAAAGANQAFAJAAAOIAAA7g");
	this.shape_16.setTransform(-40.6,13.65);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_17.setTransform(-50.725,13.825);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_18.setTransform(-62.55,12);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_19.setTransform(-66.5,12);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHgtIAAgSIAPAAIAAASg");
	this.shape_20.setTransform(-70.5,12);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AATAvIgThIIgRBIIgRAAIgbhdIARAAIASBJIAThJIAQAAIATBIIAThIIAQAAIgbBdg");
	this.shape_21.setTransform(-79,13.75);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AgdApQgJgKAAgOIAPAAQAAAIAEAEQAGAHAOAAQAJABAHgEQAHgEAAgIQAAgGgGgDQgDgCgLgDIgLgDQgNgDgFgCQgLgHAAgLQAAgNAKgJQAKgIAQAAQAVAAAJAMQAGAJAAAJIgPAAQAAgGgEgEQgFgGgNgBQgJABgFADQgFAEAAAFQAAAGAHAEQADACAHABIAKADQARAEAGADQAJAGAAANQAAANgJAJQgKAJgUAAQgUAAgJgJg");
	this.shape_22.setTransform(96.725,-13.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_23.setTransform(87.075,-13.325);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHguIAAgSIAPAAIAAASg");
	this.shape_24.setTransform(80.2,-15.15);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("AAvAwIAAhAQAAgKgFgEQgFgDgGAAQgKAAgGAGQgHAHAAAOIAAA2IgPAAIAAg9QAAgJgDgFQgDgGgKAAQgJAAgHAHQgHAHAAASIAAAxIgRAAIAAhdIAQAAIAAANIAKgKQAJgFAJAAQALAAAIAGQACACAEAHQAFgIAGgDQAIgEAJAAQASAAAIAOQADAHAAANIAAA9g");
	this.shape_25.setTransform(70.8,-13.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_26.setTransform(58.175,-13.375);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#595959").s().p("AAWAwIAAg7QAAgIgDgFQgEgJgKAAIgJABQgGACgFAGQgEAFgBAFIgBANIAAAxIgQAAIAAhdIAPAAIAAANQAGgIAIgDQAHgEAIAAQAUAAAIAOQADAHAAAOIAAA8g");
	this.shape_27.setTransform(48.3,-13.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_28.setTransform(38.175,-13.375);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#595959").s().p("AgcAlQgLgOAAgUQAAgYAMgOQAMgOARAAQARAAAJAIQAKAIADATIgQAAQgCgJgFgGQgEgFgMAAQgNAAgHAOQgFAKAAANQABAOAFAKQAHAJALAAQAKAAAGgGQAGgGACgKIAQAAQgEATgKAIQgKAJgRAAQgSAAgKgNg");
	this.shape_29.setTransform(28.85,-13.425);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_30.setTransform(19.175,-13.325);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#595959").s().p("AgdApQgJgKAAgOIAPAAQAAAIAEAEQAGAHAOAAQAJABAHgEQAHgEAAgIQAAgGgGgDQgDgCgLgDIgLgDQgNgDgFgCQgLgHAAgLQAAgNAKgJQAKgIAQAAQAVAAAJAMQAGAJAAAJIgPAAQAAgGgEgEQgFgGgNgBQgJABgFADQgFAEAAAFQAAAGAHAEQADACAHABIAKADQARAEAGADQAJAGAAANQAAANgJAJQgKAJgUAAQgUAAgJgJg");
	this.shape_31.setTransform(4.825,-13.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#595959").s().p("AgEAaIgDgzIAPAAIgCAzg");
	this.shape_32.setTransform(-0.95,-19.025);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#595959").s().p("AgdA1QgMgNAAgWQAAgTALgPQAKgQAUAAQAJAAAIAFQAEACAGAHIAAgwIAOAAIAACBIgNAAIAAgNQgGAIgIAFQgHADgJAAQgPAAgMgNgAgQgJQgIAJAAARQAAAPAHALQAGAJANABQALAAAHgKQAHgKAAgRQAAgRgHgIQgIgJgKAAQgLAAgHAJg");
	this.shape_33.setTransform(-8.45,-15);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#595959").s().p("AgHBAIAAiAIAPAAIAACAg");
	this.shape_34.setTransform(-15.05,-15.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#595959").s().p("AgWAwIAAhdIAPAAIAAAQQACgFAGgGQAHgHAKAAIABAAIAEAAIAAARIgDgBIgCAAQgNABgFAHQgGAIAAAKIAAA1g");
	this.shape_35.setTransform(-19.5,-13.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_36.setTransform(-28.125,-13.375);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#595959").s().p("AATAvIgThIIgSBIIgQAAIgchdIASAAIASBJIAShJIARAAIASBJIAUhJIAPAAIgbBdg");
	this.shape_37.setTransform(-39.55,-13.4);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_38.setTransform(-56.075,-13.325);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#595959").s().p("AAWBBIAAg8QAAgJgCgFQgFgIgMAAQgJAAgIAHQgHAHgBASIAAAyIgQAAIAAiBIAQAAIAAAwQAGgHAEgDQAIgFAKAAQAVAAAIAPQADAHAAANIAAA9g");
	this.shape_39.setTransform(-65.95,-15.175);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#595959").s().p("AgEA4QgEgHAAgJIAAg9IgNAAIAAgMIANAAIAAgbIAPAAIAAAbIAPAAIAAAMIgPAAIAAA8QAAAFADADIAGAAIACAAIAEAAIAAAMIgGABIgGABQgLAAgDgFg");
	this.shape_40.setTransform(-73.55,-14.65);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#595959").s().p("AgIBBIAAhQIgNAAIAAgMIANAAIAAgPQAAgKADgEQAFgJAQABIADAAIADAAIAAAOIgDAAIgCAAQgIAAgBAEQgCAEAAAPIAQAAIAAAMIgQAAIAABQg");
	this.shape_41.setTransform(-83.475,-15.25);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_42.setTransform(-91.075,-13.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-103.1,-24.5,206.3,49.1);


(lib.Tween86 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AAWAwIAAg6QAAgJgCgFQgFgJgKAAIgJABQgHACgEAGQgEAEgCAFIAAAPIAAAwIgRAAIAAhdIAQAAIAAANQAGgIAIgEQAIgDAHAAQAVAAAGANQAFAJAAAOIAAA7g");
	this.shape.setTransform(96.2,13.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_1.setTransform(86.075,13.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHgtIAAgSIAPAAIAAASg");
	this.shape_2.setTransform(79.2,12);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgdAoQgJgJAAgOIAPAAQAAAIAEAEQAGAHAOABQAJgBAHgDQAHgEAAgIQAAgGgGgDQgDgCgLgCIgLgEQgNgDgFgCQgLgHAAgLQAAgOAKgIQAKgIAQAAQAVAAAJANQAGAHAAAKIgPAAQAAgGgEgEQgFgGgNAAQgJgBgFAEQgFADAAAGQAAAGAHAEQADACAHACIAKACQARAFAGACQAJAGAAANQAAANgJAJQgKAJgUAAQgUAAgJgKg");
	this.shape_3.setTransform(72.775,13.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgdAoQgJgJAAgOIAPAAQAAAIAEAEQAGAHAOABQAJgBAHgDQAHgEAAgIQAAgGgGgDQgDgCgLgCIgLgEQgNgDgFgCQgLgHAAgLQAAgOAKgIQAKgIAQAAQAVAAAJANQAGAHAAAKIgPAAQAAgGgEgEQgFgGgNAAQgJgBgFAEQgFADAAAGQAAAGAHAEQADACAHACIAKACQARAFAGACQAJAGAAANQAAANgJAJQgKAJgUAAQgUAAgJgKg");
	this.shape_4.setTransform(63.775,13.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_5.setTransform(54.125,13.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgdAlQgLgOABgUQgBgYAMgOQANgOASAAQAQAAAJAIQALAIACATIgQAAQgCgJgFgGQgFgFgKAAQgPAAgGAOQgFAKABANQAAAOAFAKQAHAJALAAQAKAAAGgGQAFgGADgKIAQAAQgDATgLAIQgLAJgQAAQgSAAgLgNg");
	this.shape_6.setTransform(44.8,13.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_7.setTransform(35.125,13.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgWAwIAAhdIAPAAIAAAQQACgFAGgGQAIgHAIAAIACAAIAEAAIAAARIgCAAIgEAAQgMgBgFAIQgGAIAAAKIAAA1g");
	this.shape_8.setTransform(27.8,13.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_9.setTransform(14.175,13.775);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgFA4QgDgGAAgJIAAg+IgNAAIAAgMIANAAIAAgbIAPAAIAAAbIAPAAIAAAMIgPAAIAAA9QAAAEADADIAHABIACgBIADAAIAAAMIgGABIgGABQgKAAgFgFg");
	this.shape_10.setTransform(6.7,12.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AAWAwIAAg6QAAgJgCgFQgEgJgMAAIgIABQgGACgFAGQgEAEgCAFIgBAPIAAAwIgQAAIAAhdIAPAAIAAANQAIgIAHgEQAIgDAIAAQATAAAIANQADAJAAAOIAAA7g");
	this.shape_11.setTransform(-0.7,13.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHgtIAAgSIAPAAIAAASg");
	this.shape_12.setTransform(-7.7,12);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgWAwIAAhdIAPAAIAAAQQACgFAGgGQAIgHAIAAIACAAIAEAAIAAARIgCAAIgEAAQgLgBgGAIQgGAIAAAKIAAA1g");
	this.shape_13.setTransform(-17.1,13.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_14.setTransform(-25.725,13.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgFA4QgDgGAAgJIAAg+IgNAAIAAgMIANAAIAAgbIAPAAIAAAbIAPAAIAAAMIgPAAIAAA9QAAAEADADIAGABIADgBIADAAIAAAMIgGABIgGABQgLAAgEgFg");
	this.shape_15.setTransform(-33.2,12.5);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AAWAwIAAg6QAAgJgCgFQgFgJgKAAIgJABQgHACgEAGQgEAEgCAFIAAAPIAAAwIgRAAIAAhdIAQAAIAAANQAGgIAIgEQAIgDAHAAQAVAAAGANQAFAJAAAOIAAA7g");
	this.shape_16.setTransform(-40.6,13.65);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_17.setTransform(-50.725,13.825);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_18.setTransform(-62.55,12);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_19.setTransform(-66.5,12);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHgtIAAgSIAPAAIAAASg");
	this.shape_20.setTransform(-70.5,12);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AATAvIgThIIgRBIIgRAAIgbhdIARAAIASBJIAThJIAQAAIATBIIAThIIAQAAIgbBdg");
	this.shape_21.setTransform(-79,13.75);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AgdApQgJgKAAgOIAPAAQAAAIAEAEQAGAHAOAAQAJABAHgEQAHgEAAgIQAAgGgGgDQgDgCgLgDIgLgDQgNgDgFgCQgLgHAAgLQAAgNAKgJQAKgIAQAAQAVAAAJAMQAGAJAAAJIgPAAQAAgGgEgEQgFgGgNgBQgJABgFADQgFAEAAAFQAAAGAHAEQADACAHABIAKADQARAEAGADQAJAGAAANQAAANgJAJQgKAJgUAAQgUAAgJgJg");
	this.shape_22.setTransform(96.725,-13.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_23.setTransform(87.075,-13.325);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHguIAAgSIAPAAIAAASg");
	this.shape_24.setTransform(80.2,-15.15);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("AAvAwIAAhAQAAgKgFgEQgFgDgGAAQgKAAgGAGQgHAHAAAOIAAA2IgPAAIAAg9QAAgJgDgFQgDgGgKAAQgJAAgHAHQgHAHAAASIAAAxIgRAAIAAhdIAQAAIAAANIAKgKQAJgFAJAAQALAAAIAGQACACAEAHQAFgIAGgDQAIgEAJAAQASAAAIAOQADAHAAANIAAA9g");
	this.shape_25.setTransform(70.8,-13.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_26.setTransform(58.175,-13.375);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#595959").s().p("AAWAwIAAg7QAAgIgDgFQgEgJgKAAIgJABQgGACgFAGQgEAFgBAFIgBANIAAAxIgQAAIAAhdIAPAAIAAANQAGgIAIgDQAHgEAIAAQAUAAAIAOQADAHAAAOIAAA8g");
	this.shape_27.setTransform(48.3,-13.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_28.setTransform(38.175,-13.375);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#595959").s().p("AgcAlQgLgOAAgUQAAgYAMgOQAMgOARAAQARAAAJAIQAKAIADATIgQAAQgCgJgFgGQgEgFgMAAQgNAAgHAOQgFAKAAANQABAOAFAKQAHAJALAAQAKAAAGgGQAGgGACgKIAQAAQgEATgKAIQgKAJgRAAQgSAAgKgNg");
	this.shape_29.setTransform(28.85,-13.425);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_30.setTransform(19.175,-13.325);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#595959").s().p("AgdApQgJgKAAgOIAPAAQAAAIAEAEQAGAHAOAAQAJABAHgEQAHgEAAgIQAAgGgGgDQgDgCgLgDIgLgDQgNgDgFgCQgLgHAAgLQAAgNAKgJQAKgIAQAAQAVAAAJAMQAGAJAAAJIgPAAQAAgGgEgEQgFgGgNgBQgJABgFADQgFAEAAAFQAAAGAHAEQADACAHABIAKADQARAEAGADQAJAGAAANQAAANgJAJQgKAJgUAAQgUAAgJgJg");
	this.shape_31.setTransform(4.825,-13.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#595959").s().p("AgEAaIgDgzIAPAAIgCAzg");
	this.shape_32.setTransform(-0.95,-19.025);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#595959").s().p("AgdA1QgMgNAAgWQAAgTALgPQAKgQAUAAQAJAAAIAFQAEACAGAHIAAgwIAOAAIAACBIgNAAIAAgNQgGAIgIAFQgHADgJAAQgPAAgMgNgAgQgJQgIAJAAARQAAAPAHALQAGAJANABQALAAAHgKQAHgKAAgRQAAgRgHgIQgIgJgKAAQgLAAgHAJg");
	this.shape_33.setTransform(-8.45,-15);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#595959").s().p("AgHBAIAAiAIAPAAIAACAg");
	this.shape_34.setTransform(-15.05,-15.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#595959").s().p("AgWAwIAAhdIAPAAIAAAQQACgFAGgGQAHgHAKAAIABAAIAEAAIAAARIgDgBIgCAAQgNABgFAHQgGAIAAAKIAAA1g");
	this.shape_35.setTransform(-19.5,-13.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_36.setTransform(-28.125,-13.375);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#595959").s().p("AATAvIgThIIgSBIIgQAAIgchdIASAAIASBJIAShJIARAAIASBJIAUhJIAPAAIgbBdg");
	this.shape_37.setTransform(-39.55,-13.4);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_38.setTransform(-56.075,-13.325);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#595959").s().p("AAWBBIAAg8QAAgJgCgFQgFgIgMAAQgJAAgIAHQgHAHgBASIAAAyIgQAAIAAiBIAQAAIAAAwQAGgHAEgDQAIgFAKAAQAVAAAIAPQADAHAAANIAAA9g");
	this.shape_39.setTransform(-65.95,-15.175);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#595959").s().p("AgEA4QgEgHAAgJIAAg9IgNAAIAAgMIANAAIAAgbIAPAAIAAAbIAPAAIAAAMIgPAAIAAA8QAAAFADADIAGAAIACAAIAEAAIAAAMIgGABIgGABQgLAAgDgFg");
	this.shape_40.setTransform(-73.55,-14.65);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#595959").s().p("AgIBBIAAhQIgNAAIAAgMIANAAIAAgPQAAgKADgEQAFgJAQABIADAAIADAAIAAAOIgDAAIgCAAQgIAAgBAEQgCAEAAAPIAQAAIAAAMIgQAAIAABQg");
	this.shape_41.setTransform(-83.475,-15.25);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_42.setTransform(-91.075,-13.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-103.1,-24.5,206.3,49.1);


(lib.Tween85 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AiPDoID9nPIAjAAIj9HPgABNC8QggggAAguQAAguAgghQAhgfAuAAQAuAAAgAfQAgAhAAAuQAAAuggAgQggAgguAAQguAAghgggABtA/QgTAUAAAbQAAAbATATQAUATAbAAQAbAAATgTQATgTAAgbQAAgbgTgUQgTgTgbAAQgbAAgUATgAjpgfQggggAAguQAAguAgggQAgghAuAAQAuAAAhAhQAgAgAAAuQAAAuggAgQghAgguAAQguAAgggggAjJibQgTATAAAbQAAAbATAUQATATAbAAQAbAAAUgTQATgUAAgbQAAgbgTgTQgUgTgbAAQgbAAgTATg");
	this.shape.setTransform(63.125,-4.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AhxDHQgigjAAg1IA6AAQACAvAiASQASAKAVAAQAoAAAdgiQAdgiAMhpQgTAfgcAMQgcAMgfAAQhCAAgmgpQgngoAAhAQAAg+AmgvQAmgvBKAAQBiAAAmBaQAVAxAABKQAABSgZBAQgqBshiAAQhDAAgjgjgAhEiZQgZAcAAAvQAAAsAVAbQAWAZAvAAQAhAAAcgVQAcgXAAg3QAAgzgZgYQgZgZgmAAQgqAAgYAcg");
	this.shape_1.setTransform(15.975,-4.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AghA1QAWgEAIgbQAFgOgBgNIAAgEIAAgEIgiAAIAAhFIBDAAIAABAQAAAlgPAdQgQAcgkAHg");
	this.shape_2.setTransform(-10.95,18.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AicDkQADg6AVgsQAVgsA+gjIA7gkQApgWARgRQAagbAAgiQAAgogYgXQgXgXgoAAQg6AAgWAtQgNAXgBArIg6AAQABg8AVglQAlhCBdAAQBOAAAkAqQAkArAAAzQAAA2gnAmQgVAXg6AgIgqAYQgfARgTAQQgfAcgIAhID3AAIAAA2g");
	this.shape_3.setTransform(-38.1,-5.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AhxDHQgigjAAg1IA6AAQACAvAiASQASAKAVAAQAoAAAdgiQAdgiAMhpQgTAfgcAMQgcAMgfAAQhCAAgmgpQgngoAAhAQAAg+AmgvQAmgvBKAAQBiAAAmBaQAVAxAABKQAABSgZBAQgqBshiAAQhDAAgjgjgAhEiZQgZAcAAAvQAAAsAVAbQAWAZAvAAQAhAAAcgVQAcgXAAg3QAAgzgZgYQgZgZgmAAQgqAAgYAcg");
	this.shape_4.setTransform(-74.275,-4.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-94.1,-34.5,188.3,69);


(lib.Tween84 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AiPDoID9nPIAjAAIj9HPgABNC8QggggAAguQAAguAgghQAhgfAuAAQAuAAAgAfQAgAhAAAuQAAAuggAgQggAgguAAQguAAghgggABtA/QgTAUAAAbQAAAbATATQAUATAbAAQAbAAATgTQATgTAAgbQAAgbgTgUQgTgTgbAAQgbAAgUATgAjpgfQggggAAguQAAguAgggQAgghAuAAQAuAAAhAhQAgAgAAAuQAAAuggAgQghAgguAAQguAAgggggAjJibQgTATAAAbQAAAbATAUQATATAbAAQAbAAAUgTQATgUAAgbQAAgbgTgTQgUgTgbAAQgbAAgTATg");
	this.shape.setTransform(63.125,-4.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AhxDHQgigjAAg1IA6AAQACAvAiASQASAKAVAAQAoAAAdgiQAdgiAMhpQgTAfgcAMQgcAMgfAAQhCAAgmgpQgngoAAhAQAAg+AmgvQAmgvBKAAQBiAAAmBaQAVAxAABKQAABSgZBAQgqBshiAAQhDAAgjgjgAhEiZQgZAcAAAvQAAAsAVAbQAWAZAvAAQAhAAAcgVQAcgXAAg3QAAgzgZgYQgZgZgmAAQgqAAgYAcg");
	this.shape_1.setTransform(15.975,-4.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AghA1QAWgEAIgbQAFgOgBgNIAAgEIAAgEIgiAAIAAhFIBDAAIAABAQAAAlgPAdQgQAcgkAHg");
	this.shape_2.setTransform(-10.95,18.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AicDkQADg6AVgsQAVgsA+gjIA7gkQApgWARgRQAagbAAgiQAAgogYgXQgXgXgoAAQg6AAgWAtQgNAXgBArIg6AAQABg8AVglQAlhCBdAAQBOAAAkAqQAkArAAAzQAAA2gnAmQgVAXg6AgIgqAYQgfARgTAQQgfAcgIAhID3AAIAAA2g");
	this.shape_3.setTransform(-38.1,-5.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AhxDHQgigjAAg1IA6AAQACAvAiASQASAKAVAAQAoAAAdgiQAdgiAMhpQgTAfgcAMQgcAMgfAAQhCAAgmgpQgngoAAhAQAAg+AmgvQAmgvBKAAQBiAAAmBaQAVAxAABKQAABSgZBAQgqBshiAAQhDAAgjgjgAhEiZQgZAcAAAvQAAAsAVAbQAWAZAvAAQAhAAAcgVQAcgXAAg3QAAgzgZgYQgZgZgmAAQgqAAgYAcg");
	this.shape_4.setTransform(-74.275,-4.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-94.1,-34.5,188.3,69);


(lib.Tween83 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#595959").ss(12,0,1,3,true).p("AtxNGMAhzAAAA1AtFMAqBAAA");
	this.shape.setTransform(0,26.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-140.5,-63.5,281,179.5);


(lib.Tween81 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgnBBIBFiAIAKAAIhFCAgAAVA0QgJgJAAgNQAAgNAJgIQAJgJANAAQANAAAJAJQAJAIAAANQAAANgJAJQgJAJgNAAQgNAAgJgJgAAeASQgFAFAAAHQAAAIAFAFQAFAFAIAAQAHAAAGgFQAFgFAAgIQAAgHgFgFQgGgGgHAAQgIAAgFAGgAhAgIQgJgIAAgOQAAgMAJgJQAJgJANAAQAMAAAJAJQAJAJAAAMQAAAOgJAIQgJAIgMAAQgNAAgJgIgAg3gqQgFAFAAAHQAAAIAFAGQAFAEAIAAQAHAAAGgEQAFgGAAgIQAAgHgFgFQgGgGgHAAQgIAAgFAGg");
	this.shape.setTransform(160.775,-27.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgqA/QAAgQAHgMQAFgMARgKIAQgKQAMgFAEgFQAHgHAAgKQAAgLgGgGQgHgHgLAAQgPAAgHANQgDAGAAAMIgRAAQABgQAGgLQAKgSAZAAQAWAAAJAMQAKALAAAPQABAPgLAJQgGAHgQAJIgLAGIgNAJQgKAIgBAJIBDAAIAAAPg");
	this.shape_1.setTransform(147.7,-27.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgIAPQAFgBADgIIABgHIAAgBIgBgBIgIAAIAAgTIASAAIAAASQgBAJgEAIQgEAIgJACg");
	this.shape_2.setTransform(140.25,-20.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AAHA/IAAhYIgdAAIAAgMQARgCAGgEQAHgEADgPIAMAAIAAB9g");
	this.shape_3.setTransform(131.825,-27.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgdA0QgNgOAAggQAAgWAGgRQALgfAbAAQAVAAAJALQAJALgBAMIgPAAQgBgIgEgEQgGgIgLAAQgMAAgIANQgIAMgBAXQAFgIAJgFQAIgDAHAAQARAAALAKQAMAJAAAUQAAARgLAOQgLANgVAAQgQAAgNgNgAgQACQgIAHAAAOQAAALAHAJQAHAHALABQANgBAGgHQAGgJABgLQgBgKgFgJQgGgIgPABQgJgBgHAGg");
	this.shape_4.setTransform(122.8,-27.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgdApQgJgKAAgOIAPAAQAAAIAEAEQAGAHAOAAQAJABAHgEQAHgEAAgIQAAgGgGgDQgDgCgLgDIgLgDQgNgDgFgCQgLgHAAgLQAAgNAKgJQAKgIAQAAQAVAAAJAMQAGAJAAAJIgPAAQAAgGgEgEQgFgGgNgBQgJABgFADQgFAEAAAFQAAAGAHAEQADACAHABIAKADQARAEAGADQAJAGAAANQAAANgJAJQgKAJgUAAQgUAAgJgJg");
	this.shape_5.setTransform(164.325,-52.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHguIAAgSIAPAAIAAASg");
	this.shape_6.setTransform(157.8,-54.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgdApQgJgKAAgOIAPAAQAAAIAEAEQAGAHAOAAQAJABAHgEQAHgEAAgIQAAgGgGgDQgDgCgLgDIgLgDQgNgDgFgCQgLgHAAgLQAAgNAKgJQAKgIAQAAQAVAAAJAMQAGAJAAAJIgPAAQAAgGgEgEQgFgGgNgBQgJABgFADQgFAEAAAFQAAAGAHAEQADACAHABIAKADQARAEAGADQAJAGAAANQAAANgJAJQgKAJgUAAQgUAAgJgJg");
	this.shape_7.setTransform(151.375,-52.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHguIAAgSIAPAAIAAASg");
	this.shape_8.setTransform(144.85,-54.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AgWAwIAAhdIAPAAIAAAQQACgFAGgGQAHgHAJAAIACAAIAEAAIAAARIgDgBIgDAAQgMABgFAHQgGAIAAAKIAAA1g");
	this.shape_9.setTransform(140.45,-53.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgjA2QgVgRABgmQAAgcAOgSQARgUAbAAQAYAAANANQAOAMABARIgRAAQgCgMgJgIQgIgHgQAAQgSAAgLAOQgLANAAAaQAAAXAKAOQAKAOAUAAQATAAAJgPQAGgHACgNIARAAQgBAUgNAPQgQAQgZAAQgWAAgOgOg");
	this.shape_10.setTransform(130.45,-54.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgHBAIAAiAIAPAAIAACAg");
	this.shape_11.setTransform(117.05,-54.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgjAqQgIgIgBgMQABgNAIgHQAIgGANgCIAYgDQAGgBACgEIABgGQAAgIgGgEQgGgDgJAAQgMAAgGAGQgDAEgBAHIgOAAQAAgRALgHQALgHAOAAQAPAAALAHQALAGAAANIAAA2IABAEQAAAAAAAAQAAABABAAQAAAAABAAQABAAAAAAIADAAIADAAIAAALIgGACIgFAAQgIAAgEgGQgCgDgBgGQgFAHgIAEQgJAFgLAAQgNAAgIgIgAALACIgJACIgJABQgIABgEADQgIAEAAAJQAAAHAFAEQAFADAHAAQAJAAAHgDQANgHgBgOIAAgMIgHACg");
	this.shape_12.setTransform(110.2,-52.975);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHguIAAgSIAPAAIAAASg");
	this.shape_13.setTransform(103.05,-54.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgdAlQgLgOABgUQgBgYAMgOQANgOASAAQAQAAAKAIQAJAIADATIgQAAQgBgJgGgGQgFgFgKAAQgPAAgGAOQgFAKABANQAAAOAFAKQAHAJAMAAQAJAAAGgGQAFgGADgKIAQAAQgDATgLAIQgLAJgQAAQgRAAgMgNg");
	this.shape_14.setTransform(96.65,-53.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AAWAwIAAg7QAAgIgDgFQgDgJgLAAIgJABQgHACgEAGQgEAFgBAFIgBANIAAAxIgQAAIAAhdIAPAAIAAANQAGgIAIgDQAHgEAIAAQAVAAAGAOQAEAHABAOIAAA8g");
	this.shape_15.setTransform(87.1,-53.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AgjAqQgIgIAAgMQAAgNAIgHQAIgGANgCIAYgDQAGgBACgEIABgGQAAgIgGgEQgGgDgJAAQgNAAgFAGQgCAEgCAHIgPAAQABgRALgHQALgHAOAAQAPAAALAHQALAGAAANIAAA2IABAEQAAAAAAAAQABABAAAAQAAAAABAAQABAAAAAAIADAAIADAAIAAALIgGACIgFAAQgJAAgDgGQgCgDgBgGQgEAHgKAEQgHAFgMAAQgNAAgIgIgAALACIgJACIgJABQgIABgEADQgIAEAAAJQAAAHAFAEQAGADAGAAQAJAAAGgDQANgHABgOIAAgMIgIACg");
	this.shape_16.setTransform(77.25,-52.975);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AAWAwIAAg7QAAgIgDgFQgEgJgKAAIgJABQgGACgFAGQgEAFgBAFIgBANIAAAxIgQAAIAAhdIAOAAIAAANQAIgIAHgDQAHgEAJAAQATAAAIAOQADAHAAAOIAAA8g");
	this.shape_17.setTransform(67.1,-53.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHguIAAgSIAPAAIAAASg");
	this.shape_18.setTransform(60.1,-54.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AgsBAIAAiAIBZAAIAAAQIhHAAIAAAnIA+AAIAAAPIg+AAIAAA6g");
	this.shape_19.setTransform(53.225,-54.75);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AgHBAIAAiAIAPAAIAACAg");
	this.shape_20.setTransform(40.25,-54.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AgjAqQgJgIABgMQgBgNAJgHQAIgGAOgCIAYgDQAFgBACgEIABgGQAAgIgGgEQgFgDgKAAQgNAAgFAGQgCAEgBAHIgQAAQABgRALgHQALgHAOAAQAPAAALAHQALAGgBANIAAA2IACAEQAAAAAAAAQABABAAAAQABAAAAAAQABAAAAAAIADAAIADAAIAAALIgGACIgFAAQgJAAgDgGQgCgDAAgGQgGAHgJAEQgHAFgLAAQgNAAgJgIgAALACIgJACIgIABQgJABgFADQgHAEAAAJQAAAHAFAEQAFADAHAAQAJAAAGgDQAOgHAAgOIAAgMIgIACg");
	this.shape_21.setTransform(33.4,-52.975);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AgRA9QgEgDgFgHIAAAMIgPAAIAAiAIAPAAIAAAvQAGgHAHgEQAIgDAHAAQASAAAKAMQAMAMAAAWQAAAXgMAOQgKAPgUAAQgJAAgIgFgAgSgKQgIAIAAARQAAANADAJQAGAPARAAQAMAAAHgKQAGgKAAgRQAAgPgGgIQgHgKgMAAQgKAAgIAIg");
	this.shape_22.setTransform(23.45,-54.625);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_23.setTransform(13.125,-52.975);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AgHBAIAAiAIAPAAIAACAg");
	this.shape_24.setTransform(6.3,-54.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("AgnA1QgSgTAAggQAAggARgSQARgTAZAAQASAAANAHQATAKAEAZIgRAAQgDgOgKgGQgKgHgPAAQgQAAgMAOQgMANAAAaQAAAXAKAOQAKAPAVAAQARAAALgKQAMgLAAgWIgoAAIAAgNIA4AAIAABDIgLAAIgEgQQgJAKgHADQgLAHgRAAQgWAAgQgPg");
	this.shape_25.setTransform(-3.025,-54.75);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#EABFBB").s().p("AhEBEQgbgcAAgoQAAgnAbgcQAdgcAnAAQAoAAAcAcQAcAcAAAnQAAAogcAcQgcAdgogBQgnABgdgdg");
	this.shape_26.setTransform(185.95,-59.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.9,-69.6,207.5,54.599999999999994);


(lib.Tween80 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgnBBIBFiBIAKAAIhFCBgAAVA0QgJgJAAgMQAAgNAJgKQAJgIANAAQANAAAJAIQAJAKAAANQAAAMgJAJQgJAJgNAAQgNAAgJgJgAAeARQgFAGAAAIQAAAHAFAFQAFAFAIABQAHgBAGgFQAFgFAAgHQAAgIgFgGQgGgFgHAAQgIAAgFAFgAhAgIQgJgJAAgNQAAgMAJgJQAJgJANAAQAMAAAJAJQAJAJAAAMQAAANgJAJQgJAIgMAAQgNAAgJgIgAg3gqQgFAFAAAHQAAAIAFAGQAFAEAIAAQAHAAAGgEQAFgGAAgIQAAgHgFgFQgGgFgHgBQgIABgFAFg");
	this.shape.setTransform(8.775,-23.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgeA0QgMgOAAggQAAgWAGgRQAKgfAcAAQAWAAAIALQAJALgBALIgPAAQgCgHgDgEQgFgIgMAAQgMAAgIANQgIAMgBAXQAGgIAIgFQAIgDAHAAQAQAAAMAKQAMAJAAAUQAAASgLANQgLANgVAAQgRAAgNgNgAgQACQgIAHAAANQAAAMAHAJQAHAHALABQANgBAGgHQAGgJABgMQgBgJgFgJQgGgIgOAAQgKAAgHAGg");
	this.shape_1.setTransform(-4.2,-23.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgIAPQAFgBADgIIAAgHIAAgBIAAgBIgIAAIAAgTIARAAIAAASQAAAJgEAIQgEAIgJACg");
	this.shape_2.setTransform(-11.75,-17.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgeA3QgKgKAAgOIAQAAQAAANAKAFQAFACAGAAQALAAAHgJQAIgJADgdQgEAIgIADQgIAEgIAAQgSAAgLgMQgLgKAAgSQAAgRALgNQAKgNAVAAQAaAAAKAZQAHAOAAAUQAAAWgIASQgLAegaAAQgTAAgJgKgAgSgqQgHAIAAANQAAAMAGAIQAGAGANAAQAJAAAHgFQAIgGAAgQQAAgOgHgHQgHgGgKAAQgLAAgHAHg");
	this.shape_3.setTransform(-19.3,-23.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgdA3QgMgJgBgSIAQAAQACAOALAFQAFADAIAAQANAAAGgJQAHgJAAgLQAAgNgIgIQgIgGgKAAQgIAAgGADQgGADgEAFIgOgBIAKhCIBAAAIAAAPIg0AAIgGAjIAJgFQAHgDAIAAQARAAAMALQAMAKAAARQAAASgLAOQgLANgXAAQgPAAgMgIg");
	this.shape_4.setTransform(-29.275,-23.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgIBAIAAh/IARAAIAAB/g");
	this.shape_5.setTransform(14.45,-51.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgIBAIAAh/IARAAIAAB/g");
	this.shape_6.setTransform(9.45,-51.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AAeBAIgehqIgdBqIgTAAIghh/IATAAIAYBnIAehnIARAAIAeBnIAYhnIATAAIgiB/g");
	this.shape_7.setTransform(-1.6,-51.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AAeBAIgehqIgdBqIgTAAIghh/IATAAIAYBnIAdhnIASAAIAeBnIAYhnIATAAIgiB/g");
	this.shape_8.setTransform(-18.55,-51.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EABFBB").s().p("AhDBEQgcgcAAgoQAAgnAcgcQAcgcAnAAQAoAAAcAcQAdAcgBAnQABAogdAcQgcAcgoAAQgnAAgcgcg");
	this.shape_9.setTransform(-9,-5.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.4,-60.7,55.2,64.8);


(lib.Tween79 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgnBBIBFiAIAKAAIhFCAgAAVA0QgJgJAAgNQAAgNAJgIQAJgJANAAQANAAAJAJQAJAIAAANQAAANgJAJQgJAJgNAAQgNAAgJgJgAAeASQgFAFAAAHQAAAIAFAFQAFAFAIAAQAHAAAGgFQAFgFAAgIQAAgHgFgFQgGgGgHAAQgIAAgFAGgAhAgIQgJgIAAgOQAAgMAJgJQAJgJANAAQAMAAAJAJQAJAJAAAMQAAAOgJAIQgJAIgMAAQgNAAgJgIgAg3gqQgFAFAAAHQAAAIAFAGQAFAEAIAAQAHAAAGgEQAFgGAAgIQAAgHgFgFQgGgGgHAAQgIAAgFAGg");
	this.shape.setTransform(-14.275,-47.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AghAtQgJgQAAgcQgBgVAGgPQALgdAaAAQAYAAALAVQAJAPgBAbQABAZgIARQgMAYgYAAQgWAAgLgUgAgTgkQgHANABAYQgBAUAFALQAGASAPAAQAMAAAHgLQAIgLAAgcQAAgWgGgNQgFgOgPAAQgOAAgGANg");
	this.shape_1.setTransform(-27.35,-47.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgZA+QAGgkAUgjQAMgVANgPIhFAAIAAgQIBXAAIAAAOQgGAGgKAOQgKAPgIAQQgIAQgDAOIgGAcg");
	this.shape_2.setTransform(-37.225,-47.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AghAjQgDgHAAgMIAAg/IAQAAIAAA9QAAAHACAFQAEAIALAAQAPAAAGgOQADgIAAgNIAAguIAQAAIAABdIgPAAIAAgOQgDAFgEAEQgJAHgMAAQgTAAgIgNg");
	this.shape_3.setTransform(-11.375,-73.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgHBAIAAiAIAPAAIAACAg");
	this.shape_4.setTransform(-18.2,-75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgsBAIAAiAIBZAAIAAAQIhHAAIAAAnIA+AAIAAAPIg+AAIAAA6g");
	this.shape_5.setTransform(-25.125,-75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AAWBBIAAg8QAAgJgDgFQgEgIgLAAQgKAAgHAHQgJAHABASIAAAyIgRAAIAAiBIARAAIAAAwQAFgHAFgDQAHgFAKAAQAVAAAHAPQAEAHABANIAAA9g");
	this.shape_6.setTransform(-41.15,-75.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgdApQgJgKAAgOIAPAAQAAAIAEAEQAGAHAOAAQAJABAHgEQAHgEAAgIQAAgGgGgDQgDgCgLgDIgLgDQgNgDgFgCQgLgHAAgLQAAgNAKgJQAKgIAQAAQAVAAAJAMQAGAJAAAJIgPAAQAAgGgEgEQgFgGgNgBQgJABgFADQgFAEAAAFQAAAGAHAEQADACAHABIAKADQARAEAGADQAJAGAAANQAAANgJAJQgKAJgUAAQgUAAgJgJg");
	this.shape_7.setTransform(-50.625,-73.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHguIAAgSIAPAAIAAASg");
	this.shape_8.setTransform(-57.15,-75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AAWAwIAAg7QAAgIgDgFQgDgJgLAAIgJABQgHACgEAGQgEAFgBAFIgBANIAAAxIgRAAIAAhdIAQAAIAAANQAGgIAIgDQAHgEAIAAQAVAAAGAOQAEAHABAOIAAA8g");
	this.shape_9.setTransform(-64.1,-73.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgjAqQgIgIAAgMQAAgNAIgHQAIgGANgCIAYgDQAGgBACgEIABgGQAAgIgGgEQgGgDgJAAQgNAAgFAGQgCAEgCAHIgPAAQABgRALgHQALgHAOAAQAPAAALAHQALAGAAANIAAA2IABAEQAAAAAAAAQABABAAAAQAAAAABAAQABAAAAAAIADAAIADAAIAAALIgGACIgFAAQgJAAgDgGQgCgDgBgGQgEAHgKAEQgHAFgMAAQgNAAgIgIgAALACIgJACIgJABQgIABgEADQgIAEAAAJQAAAHAFAEQAGADAGAAQAJAAAGgDQANgHABgOIAAgMIgIACg");
	this.shape_10.setTransform(-73.95,-73.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgoBDIAAiCIAPAAIAAAMQAFgGAFgEQAIgFAKAAQAQAAAMAMQAKAMABAYQgBAdgQAOQgKAHgOABQgJAAgIgFQgEgDgFgGIAAAwgAgWgkQgEAJAAANQAAALAEAIQAGAOAQAAQAKAAAIgKQAHgJAAgRQAAgMgDgHQgGgQgQAAQgQAAgGAQg");
	this.shape_11.setTransform(-83.9,-71.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgkA4QgNgMAAgVIAQAAQABALAEAGQAJANAUAAQAJAAAIgDQAPgFAAgOQAAgLgGgEQgHgEgNgEIgQgEQgRgEgHgDQgMgIAAgQQAAgSAMgLQAMgLAVAAQATAAAOAKQAOAJAAAWIgRAAQgBgKgEgGQgIgKgRAAQgPAAgHAHQgGAGAAAJQAAAJAIAFQAFACAQAFIASAEQANADAGAEQAMAJAAARQAAAWgPAJQgPAJgUAAQgXAAgNgMg");
	this.shape_12.setTransform(-95.225,-74.975);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgHAuIAAgmIgmAAIAAgOIAmAAIAAgnIAPAAIAAAnIAmAAIAAAOIgmAAIAAAmg");
	this.shape_13.setTransform(-111.2,-73.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgIBAIAAiAIARAAIAACAg");
	this.shape_14.setTransform(-123.95,-75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AAeBAIgehqIgdBqIgTAAIghiAIATAAIAYBoIAdhoIASAAIAeBpIAYhpIATAAIgiCAg");
	this.shape_15.setTransform(-135,-75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AAdBAIgdhqIgdBqIgSAAIgiiAIATAAIAYBoIAdhoIASAAIAdBpIAZhpIATAAIgiCAg");
	this.shape_16.setTransform(-151.95,-75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#EABFBB").s().p("AhDBEQgdgcAAgoQAAgnAdgcQAcgcAnAAQAoAAAcAcQAcAcABAnQgBAogcAcQgcAdgogBQgnABgcgdg");
	this.shape_17.setTransform(-27.3,-28.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-162.7,-84.4,158.5,65.2);


(lib.Tween78 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgnBBIBFiAIAKAAIhFCAgAAVA0QgJgJAAgNQAAgNAJgIQAJgJANAAQANAAAJAJQAJAIAAANQAAANgJAJQgJAJgNAAQgNAAgJgJgAAeASQgFAFAAAHQAAAIAFAFQAFAFAIAAQAHAAAGgFQAFgFAAgIQAAgHgFgFQgGgGgHAAQgIAAgFAGgAhAgIQgJgIAAgOQAAgMAJgJQAJgJANAAQAMAAAJAJQAJAJAAAMQAAAOgJAIQgJAIgMAAQgNAAgJgIgAg3gqQgFAFAAAHQAAAIAFAGQAFAEAIAAQAHAAAGgEQAFgGAAgIQAAgHgFgFQgGgGgHAAQgIAAgFAGg");
	this.shape.setTransform(62.475,12.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgeA3QgMgKAAgTQAAgLAFgIQAFgIALgEQgGgDgEgDQgHgHAAgMQAAgOAKgKQAKgKASAAQASAAAKAKQALAJAAANQAAAMgGAHQgEAEgHAEQAIAEAFADQAIAJAAAOQAAARgLALQgLAMgVAAQgRAAgNgKgAgSAIQgHAHAAALQAAAKAGAHQAHAHANAAQALAAAHgFQAHgGAAgMQAAgMgHgHQgIgGgLAAQgLAAgHAGgAgQgsQgFAGAAAIQAAAJAGAFQAHAFAIAAQAKAAAGgGQAGgGAAgIQAAgHgGgGQgFgGgLAAQgLAAgFAGg");
	this.shape_1.setTransform(49.425,12.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgIAPQAGgBACgIIABgHIAAgBIgBgBIgIAAIAAgTIASAAIAAASQAAAJgFAIQgEAIgJACg");
	this.shape_2.setTransform(41.95,18.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AghA0QgKgMAAgRIAQAAQACAMADAFQAGAKAQAAQALAAAIgGQAHgHAAgLQAAgNgHgFQgIgFgNAAIgEAAIgDAAIAAgNIAFABIADAAQAIAAAGgDQAJgFABgNQAAgJgHgFQgHgFgJAAQgPAAgFAKQgEAGgBALIgPAAQAAgOAFgKQAKgSAZAAQASAAAKAJQALAIAAARQAAALgGAHQgEAFgGACQAJADAGAHQAGAIAAALQAAASgMALQgMAMgUAAQgXAAgKgNg");
	this.shape_3.setTransform(34.35,12.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgeA3QgMgKAAgTQAAgLAFgIQAFgIALgEQgGgDgEgDQgHgHAAgMQAAgOAKgKQAKgKASAAQASAAAKAKQALAJAAANQAAAMgGAHQgEAEgHAEQAIAEAFADQAIAJAAAOQAAARgLALQgLAMgVAAQgRAAgNgKgAgSAIQgHAHAAALQAAAKAGAHQAHAHANAAQALAAAHgFQAHgGAAgMQAAgMgHgHQgIgGgLAAQgLAAgHAGgAgQgsQgFAGAAAIQAAAJAGAFQAHAFAIAAQAKAAAGgGQAGgGAAgIQAAgHgGgGQgFgGgLAAQgLAAgFAGg");
	this.shape_4.setTransform(24.425,12.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AAWAwIAAg7QAAgIgDgFQgDgJgLAAIgJABQgHACgEAGQgEAFgBAFIgBANIAAAxIgRAAIAAhdIAQAAIAAANQAGgIAIgDQAHgEAIAAQAVAAAGAOQAEAHABAOIAAA8g");
	this.shape_5.setTransform(65.5,-13.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_6.setTransform(55.375,-13.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgHBAIAAhcIAPAAIAABcgAgHguIAAgSIAPAAIAAASg");
	this.shape_7.setTransform(48.5,-15.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgdApQgJgKAAgOIAPAAQAAAIAEAEQAGAHAOAAQAJABAHgEQAHgEAAgIQAAgGgGgDQgDgCgLgDIgLgDQgNgDgFgCQgLgHAAgLQAAgNAKgJQAKgIAQAAQAVAAAJAMQAGAJAAAJIgPAAQAAgGgEgEQgFgGgNgBQgJABgFADQgFAEAAAFQAAAGAHAEQADACAHABIAKADQARAEAGADQAJAGAAANQAAANgJAJQgKAJgUAAQgUAAgJgJg");
	this.shape_8.setTransform(42.075,-13.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AgdApQgJgKAAgOIAPAAQAAAIAEAEQAGAHAOAAQAJABAHgEQAHgEAAgIQAAgGgGgDQgDgCgLgDIgLgDQgNgDgFgCQgLgHAAgLQAAgNAKgJQAKgIAQAAQAVAAAJAMQAGAJAAAJIgPAAQAAgGgEgEQgFgGgNgBQgJABgFADQgFAEAAAFQAAAGAHAEQADACAHABIAKADQARAEAGADQAJAGAAANQAAANgJAJQgKAJgUAAQgUAAgJgJg");
	this.shape_9.setTransform(33.075,-13.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_10.setTransform(23.425,-13.325);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgWAwIAAhdIAPAAIAAAQQACgFAGgGQAIgHAIAAIACAAIAEAAIAAARIgCgBIgEAAQgMABgFAHQgGAIAAAKIAAA1g");
	this.shape_11.setTransform(16.1,-13.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgoBDIAAiCIAPAAIAAAMQAEgGAGgEQAIgFAKAAQAQAAAMAMQAKAMABAYQgBAdgQAOQgKAHgOABQgJAAgIgFQgEgDgFgGIAAAwgAgWgkQgEAJAAANQAAALAEAIQAGAOAQAAQAKAAAIgKQAHgJAAgRQAAgMgDgHQgGgQgQAAQgQAAgGAQg");
	this.shape_12.setTransform(7.8,-11.65);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_13.setTransform(-2.525,-13.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("Ag0BAIAAiAIA0AAQAZABAPASQANARAAAbQAAATgIARQgOAdgfAAgAgiAyIAeAAQAIAAAGgDQAKgCAGgLQAFgIACgLIACgOQAAgXgKgOQgJgMgUAAIgeAAg");
	this.shape_14.setTransform(-13.625,-15.15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgFA4QgDgHAAgJIAAg9IgNAAIAAgMIANAAIAAgbIAPAAIAAAbIAPAAIAAAMIgPAAIAAA8QAAAFADADIAHAAIABAAIAEAAIAAAMIgGABIgGABQgKAAgFgFg");
	this.shape_15.setTransform(-27.95,-14.65);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AgjAqQgJgIAAgMQAAgNAJgHQAIgGAOgCIAYgDQAFgBACgEIABgGQAAgIgGgEQgGgDgJAAQgMAAgGAGQgDAEAAAHIgQAAQABgRALgHQALgHAOAAQAQAAAKAHQAKAGAAANIAAA2IABAEQABAAAAAAQAAABABAAQABAAAAAAQABAAABAAIACAAIACAAIAAALIgFACIgFAAQgIAAgEgGQgCgDAAgGQgGAHgJAEQgIAFgKAAQgNAAgJgIgAALACIgJACIgIABQgJABgFADQgHAEAAAJQAAAHAFAEQAGADAGAAQAIAAAHgDQANgHAAgOIAAgMIgHACg");
	this.shape_16.setTransform(-35.2,-13.375);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_17.setTransform(-45.475,-13.325);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AgWAwIAAhdIAPAAIAAAQQACgFAGgGQAHgHAKAAIABAAIAEAAIAAARIgDgBIgCAAQgNABgFAHQgGAIAAAKIAAA1g");
	this.shape_18.setTransform(-52.8,-13.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AgnA1QgSgTAAggQAAggARgSQARgTAZAAQASAAANAHQATAKAEAZIgRAAQgDgOgKgGQgKgHgPAAQgQAAgMAOQgMANAAAaQAAAXAKAOQAKAPAVAAQARAAALgKQAMgLAAgWIgoAAIAAgNIA4AAIAABDIgLAAIgEgQQgJAKgHADQgLAHgRAAQgWAAgQgPg");
	this.shape_19.setTransform(-63.625,-15.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#EABFBB").s().p("AhEBEQgcgcAAgoQAAgnAcgdQAdgcAnAAQAoAAAcAcQAdAdAAAnQAAAogdAcQgcAcgoABQgngBgdgcg");
	this.shape_20.setTransform(41.7,27.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.5,-24.5,145,61.2);


(lib.Tween72 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("AgwA9QgSgXAAgiQAAgoAUgXQAUgXAeAAQAbAAAQANQARANADAfIgZAAQgDgOgIgKQgIgJgTgBQgYAAgLAZQgHAQAAAWQAAAYAKAQQAKAQAUABQARAAAJgLQAKgJAEgSIAZAAQgEAfgSAOQgRAPgcAAQgdAAgTgWg");
	this.shape.setTransform(98.825,-33);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_1.setTransform(87.875,-35.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("ABOBQIAAhsQAAgPgIgGQgIgGgLAAQgPAAgLAKQgMALAAAYIAABaIgZAAIAAhlQAAgQgFgHQgGgLgQAAQgPAAgMALQgNAMAAAeIAABSIgaAAIAAicIAaAAIAAAXQAKgMAHgFQAOgJAQAAQASAAAMAJQAFAFAGALQAJgNALgGQAMgGAPAAQAgAAALAXQAHAMAAAVIAABng");
	this.shape_2.setTransform(72.15,-33.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AgyA+QgUgVAAgnQAAglAUgYQAUgXAgAAQARAAAQAIQAPAIAIAMQAIAMADAQQACALAAAXIhxAAQABAXAKAPQALAPAVAAQAUAAAMgPQAHgHADgLIAaAAQgBAJgGAKQgGALgHAHQgMAMgRAEQgKACgLAAQgdAAgUgVgAAsgNQgCgQgGgLQgKgTgZAAQgRAAgNAOQgMANAAATIBVAAIAAAAg");
	this.shape_3.setTransform(51.175,-32.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA5547").s().p("AgxBZQgTgWAAglQAAghARgZQARgZAhAAQARAAAMAHQAHAFAJALIAAhQIAZAAIAADXIgYAAIAAgWQgJAPgMAGQgMAHgQAAQgaAAgTgWgAgcgPQgMAPAAAdQAAAZAKARQALARAWAAQATAAALgQQAMgQAAgdQAAgdgMgOQgMgOgSAAQgTAAgMAPg");
	this.shape_4.setTransform(34.1,-35.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EA5547").s().p("AAlBQIAAhiQAAgOgEgJQgHgOgTAAQgIAAgGABQgLAEgIAJQgHAIgBAIQgDAJAAAPIAABRIgaAAIAAicIAZAAIAAAXQALgOANgGQAMgGAOAAQAiAAAMAXQAGANAAAYIAABjg");
	this.shape_5.setTransform(18.025,-33.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EA5547").s().p("Ag7BGQgOgOAAgUQAAgWANgMQAOgLAWgCIApgGQAJgBADgGQACgEAAgGQAAgOgJgGQgKgGgRAAQgUAAgJALQgFAHgBALIgZAAQABgdASgLQASgLAYAAQAaAAASALQARAKAAAWIAABaQAAAEABACQACADAGAAIADAAIAFgBIAAATIgJADIgJAAQgOAAgGgKQgDgFgBgKQgIALgPAIQgPAIgSAAQgWAAgNgNgAASADIgPADIgPACQgOACgHAEQgNAHAAAPQAAALAJAHQAIAHALAAQAOAAAMgHQAWgLAAgYIAAgUQgEACgIACg");
	this.shape_6.setTransform(1.675,-32.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EA5547").s().p("AhPBsIAAjWIBfAAQAdAAARAPQASARAAAdQAAAZgQATQgQARggAAIhBAAIAABcgAgxgHIA4AAQAUAAAMgIQALgJABgVQAAgYgSgIQgJgFgRAAIg4AAg");
	this.shape_7.setTransform(-16.4,-35.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgzBcQgRgQABgZIAbAAQABAWAPAJQAIAEALAAQARAAANgQQAOgQAFgwQgIAOgNAGQgNAFgOAAQgfAAgRgSQgSgSAAgeQAAgcARgWQASgWAiAAQAtAAARAqQAKAWAAAiQAAAmgMAdQgTAygsAAQggAAgPgQgAgfhGQgMANABAWQAAAUAKAMQAJALAWAAQAPAAANgJQANgKAAgaQAAgXgLgMQgMgLgSAAQgSAAgMANg");
	this.shape_8.setTransform(-43.75,-35.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AALBpIAAiUIgxAAIAAgUQAdgDAKgGQAMgHAFgZIAVAAIAADRg");
	this.shape_9.setTransform(-61.825,-35.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgkAOIAAgaIBJAAIAAAag");
	this.shape_10.setTransform(-73.575,-33.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgxBZQgTgWAAglQAAghARgZQARgZAhAAQARAAAMAHQAHAFAJALIAAhQIAZAAIAADXIgYAAIAAgWQgJAPgMAGQgMAHgQAAQgaAAgTgWgAgcgPQgMAPAAAdQAAAZAKARQALARAWAAQATAAALgQQAMgQAAgdQAAgdgMgOQgMgOgSAAQgTAAgMAPg");
	this.shape_11.setTransform(-87.4,-35.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_12.setTransform(-98.525,-35.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgOBPIg6idIAfAAIApB/IArh/IAeAAIg8Cdg");
	this.shape_13.setTransform(-109.35,-33);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgnAUgXQAUgYAhAAQAeAAAVAVQAVAUAAAnQAAAlgTAZQgSAZgmAAQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgWgbABQgXAAgLASg");
	this.shape_14.setTransform(-125.325,-32.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("Ag8BbQghgegBg+QAAgwAageQAaghAvAAQAoAAAWAVQAXAWADAbIgdAAQgFgVgOgMQgOgMgaAAQgeAAgTAWQgTAXgBAtQABAmARAXQASAYAgAAQAgAAARgZQAJgNAEgVIAcAAQgDAigWAXQgZAbgrAAQgkAAgZgWg");
	this.shape_15.setTransform(-144.35,-35.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-157.3,-50.2,265.6,34);


(lib.Tween68 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("AhKBmQgWgYgBgkIAmAAQACAUAIALQAPATAlAAQAWAAARgKQARgJAAgUQAAgPgNgIQgJgFgagHIgfgHQgegIgPgIQgagQAAgdQAAghAZgVQAYgUApAAQA1AAAYAfQAPAUgBAXIglAAQgBgOgJgLQgNgPgiAAQgXAAgMAIQgLAJAAAOQAAAPAPAJQAJAGASAEIAZAGQAsALAOAIQAXAQAAAgQAAAggYAWQgYAXgxAAQg0AAgXgXg");
	this.shape.setTransform(177.825,15.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AgTChIAAjpIAnAAIAADpgAgTh0IAAgtIAnAAIAAAtg");
	this.shape_1.setTransform(161.5,10.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("AhKBmQgWgYgBgkIAmAAQACAUAIALQAPATAlAAQAWAAARgKQARgJAAgUQAAgPgNgIQgJgFgagHIgfgHQgegIgPgIQgagQAAgdQAAghAZgVQAYgUApAAQA1AAAYAfQAPAUgBAXIglAAQgBgOgJgLQgNgPgiAAQgXAAgMAIQgLAJAAAOQAAAPAPAJQAJAGASAEIAZAGQAsALAOAIQAXAQAAAgQAAAggYAWQgYAXgxAAQg0AAgXgXg");
	this.shape_2.setTransform(145.375,15.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AgTChIAAjpIAnAAIAADpgAgTh0IAAgtIAnAAIAAAtg");
	this.shape_3.setTransform(129.05,10.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA5547").s().p("Ag4B4IAAjqIAlAAIAAApQAFgMARgRQASgRAYAAIADAAIAJABIAAApIgGAAIgHgBQgeAAgPAUQgQATAAAZIAACGg");
	this.shape_4.setTransform(117.925,15.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EA5547").s().p("AhbCIQgygtAAhdQAAhHAlguQApgyBGAAQA8AAAiAgQAhAhAEAoIgrAAQgHgfgVgSQgVgSgmAAQgvAAgcAhQgdAiAABFQAAA4AaAjQAaAkAzAAQAwgBAYgkQANgUAHggIAqAAQgGAzgfAiQgmAqhAAAQg3AAgmgig");
	this.shape_5.setTransform(92.9,10.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgTChIAAlBIAnAAIAAFBg");
	this.shape_6.setTransform(184.075,-43.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AhZBoQgVgTAAgeQAAghAUgSQAVgRAhgEIA+gIQAOgBAEgLQADgFAAgJQAAgVgPgJQgOgJgaAAQgfAAgNAQQgHAKgCASIglAAQABgrAbgRQAbgSAkABQApAAAZAPQAaAQAAAiIAACGQAAAGADAEQACADAIAAIAGAAIAHgBIAAAeIgOADIgNAAQgUAAgKgOQgEgIgCgOQgMAQgXAMQgWALgbAAQghABgUgVgAAbAEIgWAFIgXADQgWADgKAGQgTAKAAAXQAAARANAKQAMAKARAAQAVAAATgKQAhgQAAgkIAAgfQgIAEgLACg");
	this.shape_7.setTransform(167.025,-38.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgTChIAAjpIAnAAIAADpgAgThzIAAgtIAnAAIAAAtg");
	this.shape_8.setTransform(149.05,-43.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AhIBaQgcghAAgzQAAg8AegjQAegjAuABQAogBAZAUQAZATAFAvIgnAAQgDgWgNgOQgMgPgcAAQglAAgQAmQgLAYAAAhQAAAkAPAYQAPAYAfAAQAZAAAOgOQAPgPAFgbIAnAAQgHAvgaAWQgbAWgpgBQgtABgbgjg");
	this.shape_9.setTransform(133.025,-38.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AA3B4IAAiTQABgWgHgNQgLgWgbAAQgNAAgJADQgQAFgMAOQgKAMgEANQgDAMAAAXIAAB6IgnAAIAAjqIAmAAIAAAhQARgUASgJQATgJAVAAQAzAAARAjQAKATAAAjIAACWg");
	this.shape_10.setTransform(109.15,-39.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AhZBoQgVgTAAgeQAAghAUgSQAVgRAhgEIA+gIQAOgBAEgLQADgFAAgJQAAgVgPgJQgOgJgaAAQgfAAgNAQQgHAKgCASIglAAQABgrAbgRQAbgSAkABQApAAAZAPQAaAQAAAiIAACGQAAAGADAEQACADAIAAIAGAAIAHgBIAAAeIgOADIgNAAQgUAAgKgOQgEgIgCgOQgMAQgXAMQgWALgbAAQghABgUgVgAAbAEIgWAFIgXADQgWADgKAGQgTAKAAAXQAAARANAKQAMAKARAAQAVAAATgKQAhgQAAgkIAAgfQgIAEgLACg");
	this.shape_11.setTransform(84.575,-38.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AA4B4IAAiTQgBgWgGgNQgLgWgbAAQgNAAgJADQgQAFgNAOQgKAMgCANQgDAMgBAXIAAB6IgnAAIAAjqIAlAAIAAAhQARgUATgJQASgJAXAAQAxAAASAjQAKATAAAjIAACWg");
	this.shape_12.setTransform(59.15,-39.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgTChIAAjpIAnAAIAADpgAgThzIAAgtIAnAAIAAAtg");
	this.shape_13.setTransform(41.6,-43.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AhvChIAAlBIDfAAIAAAnIizAAIAABjICdAAIAAAkIidAAIAACTg");
	this.shape_14.setTransform(24.3,-43.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgTChIAAlBIAnAAIAAFBg");
	this.shape_15.setTransform(-8.225,-43.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AhZBoQgVgTAAgeQAAghAUgSQAVgRAhgEIA+gIQAOgBAEgLQADgFAAgJQAAgVgPgJQgOgJgaAAQgfAAgNAQQgHAKgCASIglAAQABgrAbgRQAbgSAkABQApAAAZAPQAaAQAAAiIAACGQAAAGADAEQACADAIAAIAGAAIAHgBIAAAeIgOADIgNAAQgUAAgKgOQgEgIgCgOQgMAQgXAMQgWALgbAAQghABgUgVgAAbAEIgWAFIgXADQgWADgKAGQgTAKAAAXQAAARANAKQAMAKARAAQAVAAATgKQAhgQAAgkIAAgfQgIAEgLACg");
	this.shape_16.setTransform(-25.275,-38.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AgrCZQgLgIgMgRIAAAeIglAAIAAlDIAnAAIAAB1QANgQASgJQASgJAUAAQAsAAAcAeQAbAeAAA6QAAA4gbAlQgbAlgxAAQgZAAgTgNgAgugbQgUAUAAAtQgBAhAJAVQAPAnArAAQAfAAAQgaQARgZgBgqQABglgRgXQgPgZggAAQgZAAgVAUg");
	this.shape_17.setTransform(-50.25,-42.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AhPBcQgdghAAg3QAAg6AegjQAegjAxAAQAuAAAfAeQAfAeAAA7QAAA4gcAlQgbAlg5AAQgwAAgcghgAgzg+QgQAbAAAmQAAAmAQAZQAQAZAjAAQAnAAAOgeQAPgeAAgjQAAghgLgUQgQghgpAAQgjAAgQAcg");
	this.shape_18.setTransform(-76.025,-38.725);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AgTChIAAlBIAnAAIAAFBg");
	this.shape_19.setTransform(-93.175,-43.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AhkCFQgsgvAAhRQAAhQArgwQApguBAAAQAtAAAhASQAvAZALA/IgrAAQgIgjgYgQQgZgQglAAQgrAAgeAhQgeAiAABBQAAA6AZAkQAZAkA3AAQArAAAcgZQAcgaABg4IhmAAIAAgjICOAAIAACrIgcAAIgKgpQgWAYgRAKQgcAQgrAAQg4AAgpglg");
	this.shape_20.setTransform(-116.425,-43.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-147.8,-63.7,338.9,103.2);


(lib.Tween67 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgIBcQgHgKAAgOIAAhoIgVAAIAAgVIAVAAIAAgrIAaAAIAAArIAZAAIAAAVIgZAAIAABmQAAAIAGADQADABAHAAIAEAAIAFAAIAAAVIgJACIgLABQgRAAgHgKg");
	this.shape.setTransform(134.7,17.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape_1.setTransform(123.225,19.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("Ag7BGQgOgNAAgVQAAgVANgNQAOgKAWgDIApgGQAJgBADgGQACgEAAgGQAAgOgJgGQgKgGgRAAQgUAAgJALQgFAHgBAMIgZAAQABgdASgMQASgLAYAAQAaAAASAKQARALAAAWIAABaQAAAEABACQACACAGABIADAAIAFgBIAAATIgJACIgJABQgOAAgGgKQgDgFgBgKQgIALgPAIQgPAIgSAAQgWAAgNgNgAASADIgPADIgPACQgOACgHAEQgNAHAAAPQAAALAJAHQAIAGALABQAOgBAMgGQAWgLAAgYIAAgUQgEACgIACg");
	this.shape_2.setTransform(107.675,19.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AhEBvIAAjZIAaAAIAAAUQAIgKAJgGQANgJARAAQAbABATAUQASAUAAAmQAAAygaAWQgRAOgXABQgRAAgMgJQgHgEgJgLIAABQgAglg8QgGAPAAAWQAAASAGAMQAKAYAbAAQASAAAMgPQAMgPAAgfQAAgSgFgNQgKgbgbAAQgbABgKAbg");
	this.shape_3.setTransform(91.025,22.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgyA+QgUgVAAgnQAAglAUgXQAUgYAgAAQARAAAQAIQAPAIAIAMQAIAMADAQQACALAAAWIhxAAQABAZAKAOQALAPAVAAQAUgBAMgOQAHgHADgLIAaAAQgBAJgGAKQgGALgHAHQgMAMgRADQgKADgLAAQgdAAgUgVgAAsgMQgCgSgGgKQgKgTgZAAQgRAAgNAOQgMAMAAAVIBVAAIAAAAg");
	this.shape_4.setTransform(65.625,19.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AAlBsIAAhjQAAgQgFgIQgHgNgTAAQgQAAgNALQgOALAAAfIAABTIgaAAIAAjXIAaAAIAABQQAKgLAHgGQANgHASgBQAiAAAMAYQAHANAAAWIAABlg");
	this.shape_5.setTransform(49.125,16.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgIBcQgHgKAAgOIAAhoIgVAAIAAgVIAVAAIAAgrIAaAAIAAArIAZAAIAAAVIgZAAIAABmQAAAIAGADQADABAHAAIAEAAIAFAAIAAAVIgJACIgKABQgSAAgHgKg");
	this.shape_6.setTransform(36.5,17.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AAlBQIAAhiQAAgOgEgJQgHgOgTAAQgIAAgGABQgLAEgIAJQgHAIgBAIQgDAJAAAPIAABRIgaAAIAAicIAZAAIAAAXQALgOANgGQAMgGAOAAQAiAAAMAXQAGANAAAYIAABjg");
	this.shape_7.setTransform(15.875,19.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_8.setTransform(4.175,16.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape_9.setTransform(-14.875,19.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AAlBQIAAhiQAAgOgEgJQgHgOgTAAQgIAAgGABQgLAEgIAJQgHAIgBAIQgDAJAAAPIAABRIgaAAIAAicIAZAAIAAAXQALgOANgGQAMgGAOAAQAiAAAMAXQAGANAAAYIAABjg");
	this.shape_10.setTransform(-30.725,19.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_11.setTransform(-47.575,19.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_12.setTransform(-59.075,16.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape_13.setTransform(-69.825,19.95);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape_14.setTransform(-84.825,19.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgyA+QgUgVAAgnQAAglAUgXQAUgYAgAAQARAAAQAIQAPAIAIAMQAIAMADAQQACALAAAWIhxAAQABAZAKAOQALAPAVAAQAUgBAMgOQAHgHADgLIAaAAQgBAJgGAKQgGALgHAHQgMAMgRADQgKADgLAAQgdAAgUgVgAAsgMQgCgSgGgKQgKgTgZAAQgRAAgNAOQgMAMAAAVIBVAAIAAAAg");
	this.shape_15.setTransform(-100.825,19.95);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AgwA9QgSgXAAghQAAgpAUgXQAUgXAeAAQAbAAAQANQARANADAfIgZAAQgDgOgIgJQgIgLgTAAQgYAAgLAZQgHAQAAAXQAAAXAKAQQAKARAUAAQARgBAJgJQAKgLAEgRIAZAAQgEAfgSAPQgRAOgcAAQgdAAgTgWg");
	this.shape_16.setTransform(-116.425,19.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AgyA+QgUgVAAgnQAAglAUgXQAUgYAgAAQARAAAQAIQAPAIAIAMQAIAMADAQQACALAAAWIhxAAQABAZAKAOQALAPAVAAQAUgBAMgOQAHgHADgLIAaAAQgBAJgGAKQgGALgHAHQgMAMgRADQgKADgLAAQgdAAgUgVgAAsgMQgCgSgGgKQgKgTgZAAQgRAAgNAOQgMAMAAAVIBVAAIAAAAg");
	this.shape_17.setTransform(-132.475,19.95);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AA0BsIgCgHIgCgSIgCgkQgBgUgOgIQgIgEgRAAIhAAAIAABdIgdAAIAAjWIBhAAQAYgBAQAIQAeAOAAAkQAAAUgIAMQgIAMgPAHQANAFAGAIQAHAJAAATIABAcQABAMABAHQADAKAHACIAAAGgAg6gIIBBAAQAUAAALgIQAMgJAAgVQAAgXgQgIQgJgFgOABIhFAAg");
	this.shape_18.setTransform(-150.875,16.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AgOBtIAAiGIgWAAIAAgVIAWAAIAAgZQAAgQAFgIQAJgNAaAAIAFAAIAGABIAAAYIgGgBIgDAAQgNAAgCAGQgCAHAAAZIAaAAIAAAVIgaAAIAACGg");
	this.shape_19.setTransform(149.675,-22.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_20.setTransform(137.025,-19.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AAlBQIAAhiQAAgOgEgJQgHgOgTAAQgIAAgGABQgLAEgIAJQgHAIgBAIQgDAJAAAPIAABRIgaAAIAAicIAZAAIAAAXQALgOANgGQAMgGAOAAQAiAAAMAXQAGANAAAYIAABjg");
	this.shape_21.setTransform(112.275,-19.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_22.setTransform(95.425,-19.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_23.setTransform(83.925,-22.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AgIBcQgGgKgBgOIAAhoIgUAAIAAgVIAUAAIAAgsIAaAAIAAAsIAaAAIAAAVIgaAAIAABmQABAIAFADQADABAHAAIAEAAIAGAAIAAAVIgKACIgKABQgSAAgHgKg");
	this.shape_24.setTransform(76.35,-21.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("Ag7BGQgOgNAAgVQAAgVANgNQAOgKAWgDIApgGQAJgBADgGQACgEAAgGQAAgOgJgGQgKgGgRAAQgUAAgJALQgFAHgBAMIgZAAQABgdASgMQASgLAYAAQAaAAASAKQARALAAAWIAABaQAAAEABACQACACAGABIADAAIAFgBIAAATIgJACIgJABQgOAAgGgKQgDgFgBgKQgIALgPAIQgPAIgSAAQgWAAgNgNgAASADIgPADIgPACQgOACgHAEQgNAHAAAPQAAALAJAHQAIAGALABQAOgBAMgGQAWgLAAgYIAAgUQgEACgIACg");
	this.shape_25.setTransform(64.325,-19.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#595959").s().p("AglBQIAAicIAZAAIAAAbQADgHALgMQAMgLAQAAIACAAIAGABIAAAbIgEAAIgFAAQgTAAgKANQgLAMAAARIAABZg");
	this.shape_26.setTransform(51.575,-19.475);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#595959").s().p("AgIBcQgHgKAAgOIAAhoIgVAAIAAgVIAVAAIAAgsIAaAAIAAAsIAZAAIAAAVIgZAAIAABmQAAAIAGADQADABAHAAIAEAAIAFAAIAAAVIgJACIgKABQgSAAgHgKg");
	this.shape_27.setTransform(41.45,-21.35);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#595959").s().p("AAlBQIAAhiQAAgOgEgJQgHgOgTAAQgIAAgGABQgLAEgIAJQgHAIgBAIQgDAJAAAPIAABRIgaAAIAAicIAZAAIAAAXQALgOANgGQAMgGAOAAQAiAAAMAXQAGANAAAYIAABjg");
	this.shape_28.setTransform(29.125,-19.475);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#595959").s().p("AgyA+QgUgVAAgnQAAglAUgXQAUgYAgAAQARAAAQAIQAPAIAIAMQAIAMADAQQACALAAAWIhxAAQABAZAKAOQALAPAVAAQAUgBAMgOQAHgHADgLIAaAAQgBAJgGAKQgGALgHAHQgMAMgRADQgKADgLAAQgdAAgUgVgAAsgMQgCgSgGgKQgKgTgZAAQgRAAgNANQgMANAAAVIBVAAIAAAAg");
	this.shape_29.setTransform(12.325,-19.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#595959").s().p("AgwA9QgSgXAAghQAAgpAUgXQAUgXAeAAQAbAAAQANQARANADAfIgZAAQgDgOgIgJQgIgLgTAAQgYAAgLAZQgHAQAAAXQAAAXAKAQQAKARAUAAQARgBAJgJQAKgLAEgRIAZAAQgEAfgSAPQgRAOgcAAQgdAAgTgWg");
	this.shape_30.setTransform(-3.275,-19.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#595959").s().p("AAlBQIAAhiQAAgOgEgJQgHgOgTAAQgIAAgGABQgLAEgIAJQgHAIgBAIQgDAJAAAPIAABRIgaAAIAAicIAZAAIAAAXQALgOANgGQAMgGAOAAQAiAAAMAXQAGANAAAYIAABjg");
	this.shape_31.setTransform(-19.175,-19.475);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_32.setTransform(-36.025,-19.25);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#595959").s().p("Ag8BbQgigeAAg+QAAgwAZgeQAbghAvAAQApAAAVAVQAXAWACAbIgcAAQgFgVgOgMQgOgMgaAAQgeAAgTAWQgTAXAAAtQAAAmARAXQARAYAhAAQAhAAAQgZQAIgNAFgVIAcAAQgEAigUAXQgaAbgrAAQgkAAgZgWg");
	this.shape_33.setTransform(-55.05,-22.225);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#EA5547").s().p("AglBQIAAicIAZAAIAAAbQADgHALgMQAMgLAQAAIACAAIAGABIAAAbIgEAAIgFAAQgTAAgKANQgLAMAAARIAABZg");
	this.shape_34.setTransform(-78.225,-19.475);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#EA5547").s().p("AgyA+QgUgVAAgnQAAglAUgXQAUgYAgAAQARAAAQAIQAPAIAIAMQAIAMADAQQACALAAAWIhxAAQABAZAKAOQALAPAVAAQAUgBAMgOQAHgHADgLIAaAAQgBAJgGAKQgGALgHAHQgMAMgRADQgKADgLAAQgdAAgUgVgAAsgMQgCgSgGgKQgKgTgZAAQgRAAgNANQgMANAAAVIBVAAIAAAAg");
	this.shape_35.setTransform(-92.525,-19.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#EA5547").s().p("AAlBsIAAhjQAAgQgFgIQgHgNgTAAQgQAAgNALQgOALAAAfIAABTIgaAAIAAjXIAaAAIAABQQAKgLAHgGQANgHASgBQAiAAAMAYQAHANAAAWIAABlg");
	this.shape_36.setTransform(-109.025,-22.25);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#EA5547").s().p("AgrBmQgRgMgCgYIAaAAQACALAFAFQAJAJAUAAQAdAAAJgWQAGgMgBghQgIANgLAFQgLAHgRgBQgZAAgUgSQgSgSgBgpQABgnASgWQAUgWAbAAQARAAAOAJQAIAFAHAKIAAgUIAYAAIAACOQABAegJARQgRAggsAAQgaAAgQgLgAgjg/QgFAOgBAXQAAAaALANQALAOASAAQAcAAALgaQAGgOAAgTQAAgdgMgOQgMgOgSAAQgbAAgKAag");
	this.shape_37.setTransform(-126.25,-16.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#EA5547").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_38.setTransform(-137.375,-22.2);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#EA5547").s().p("AA3BsIAAhlIhtAAIAABlIgeAAIAAjWIAeAAIAABYIBtAAIAAhYIAeAAIAADWg");
	this.shape_39.setTransform(-151.475,-22.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-164.3,-36.5,328.70000000000005,73.1);


(lib.Tween66 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgJBIIAAiPIATAAIAACPg");
	this.shape.setTransform(23.45,-6.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgJBIIAAiPIATAAIAACPg");
	this.shape_1.setTransform(17.9,-6.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("AgYA2IAAhoIAQAAIAAASQACgGAHgHQAIgHALAAIACAAIADAAIAAASIgCAAIgDAAQgOAAgGAJQgHAIAAALIAAA8g");
	this.shape_2.setTransform(6.65,-4.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AgnAuQgKgIAAgOQAAgOAJgIQAKgHAPgCIAbgEQAFAAADgFIABgGQAAgJgHgEQgGgFgLAAQgOAAgGAIQgCAEgBAIIgRAAQAAgTAMgIQANgHAPAAQASAAAMAHQALAHAAAPIAAA7IABAEQAAABABAAQAAAAABAAQAAABABAAQABAAAAAAIAEAAIACgBIAAANIgGACIgFAAQgKAAgEgGQgCgEgBgGQgFAHgLAFQgJAFgLAAQgPAAgJgJgAAMACIgKACIgJABQgKACgFACQgIAFAAAKQAAAIAGAEQAFAEAHAAQAKAAAHgEQAPgHAAgQIAAgNIgIACg");
	this.shape_3.setTransform(-2.6,-4.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA5547").s().p("AAhBIIghh2IggB2IgVAAIgliPIAVAAIAbB0IAhh0IAUAAIAgB0IAbh0IAVAAIglCPg");
	this.shape_4.setTransform(-17.725,-6.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AggA7QgNgOAAgZQAAgWALgQQAMgRAWAAQALAAAIAFQAEADAGAHIAAg1IARAAIAACPIgQAAIAAgOQgGAJgIAFQgJAEgJAAQgSAAgMgPgAgTgKQgIAKAAATQAAARAHALQAHAMAPAAQAMAAAIgLQAIgKAAgUQAAgTgIgJQgIgKgMAAQgMAAgJAKg");
	this.shape_5.setTransform(19.575,-35.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgIBIIAAiPIARAAIAACPg");
	this.shape_6.setTransform(12.225,-35.175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgZA2IAAhoIARAAIAAASQACgGAHgHQAIgHAKgBIACAAIAFABIAAASIgDAAIgEAAQgNAAgGAIQgHAJAAALIAAA8g");
	this.shape_7.setTransform(7.25,-33.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgjApQgMgOAAgZQAAgaANgPQANgPAVgBQAVAAANAOQAOANAAAaQAAAYgMARQgMARgZAAQgVAAgNgPgAgWgbQgHANAAAQQAAAQAHAMQAHALAPgBQARABAGgNQAHgOAAgPQAAgOgFgKQgHgPgSAAQgPAAgHANg");
	this.shape_8.setTransform(-2.325,-33.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AAhBIIghh2IggB2IgVAAIgliPIAVAAIAbB0IAhh0IAUAAIAgB0IAbh0IAVAAIglCPg");
	this.shape_9.setTransform(-17.125,-35.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EB5344").s().p("AFcQ+QgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAgGQAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAAGQAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhQGQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAgwQAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAAwQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAFcP9QgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABgBQABABAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhOaQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAgAFcOFQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhMhQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcMNQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhKpQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcKVQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABgBQABABAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhIyQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAgAFcIdQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhG5QgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcGlQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhFBQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcEtQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABgBQABABAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhDKQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAgAFcC1QgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhBRQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcA9QgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhgmQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcg6QgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABgBQABABAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhidQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAgAFciyQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhkWQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFckqQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhmOQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcmiQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABgBQABABAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhoFQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAgAFcoaQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhp+QgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcqSQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhr2QgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcsKQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABgBQABABAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhttQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAgAFcuCQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhvmQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcv6QgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.6,-108.7,71.2,217.5);


(lib.Tween65 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgJBIIAAiPIATAAIAACPg");
	this.shape.setTransform(23.45,-6.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgJBIIAAiPIATAAIAACPg");
	this.shape_1.setTransform(17.9,-6.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("AgYA2IAAhoIAQAAIAAASQACgGAHgHQAIgHALAAIACAAIADAAIAAASIgCAAIgDAAQgOAAgGAJQgHAIAAALIAAA8g");
	this.shape_2.setTransform(6.65,-4.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AgnAuQgKgIAAgOQAAgOAJgIQAKgHAPgCIAbgEQAFAAADgFIABgGQAAgJgHgEQgGgFgLAAQgOAAgGAIQgCAEgBAIIgRAAQAAgTAMgIQANgHAPAAQASAAAMAHQALAHAAAPIAAA7IABAEQAAABABAAQAAAAABAAQAAABABAAQABAAAAAAIAEAAIACgBIAAANIgGACIgFAAQgKAAgEgGQgCgEgBgGQgFAHgLAFQgJAFgLAAQgPAAgJgJgAAMACIgKACIgJABQgKACgFACQgIAFAAAKQAAAIAGAEQAFAEAHAAQAKAAAHgEQAPgHAAgQIAAgNIgIACg");
	this.shape_3.setTransform(-2.6,-4.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA5547").s().p("AAhBIIghh2IggB2IgVAAIgliPIAVAAIAbB0IAhh0IAUAAIAgB0IAbh0IAVAAIglCPg");
	this.shape_4.setTransform(-17.725,-6.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AggA7QgNgOAAgZQAAgWALgQQAMgRAWAAQALAAAIAFQAEADAGAHIAAg1IARAAIAACPIgQAAIAAgOQgGAJgIAFQgJAEgJAAQgSAAgMgPgAgTgKQgIAKAAATQAAARAHALQAHAMAPAAQAMAAAIgLQAIgKAAgUQAAgTgIgJQgIgKgMAAQgMAAgJAKg");
	this.shape_5.setTransform(19.575,-35.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgIBIIAAiPIARAAIAACPg");
	this.shape_6.setTransform(12.225,-35.175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgZA2IAAhoIARAAIAAASQACgGAHgHQAIgHAKgBIACAAIAFABIAAASIgDAAIgEAAQgNAAgGAIQgHAJAAALIAAA8g");
	this.shape_7.setTransform(7.25,-33.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgjApQgMgOAAgZQAAgaANgPQANgPAVgBQAVAAANAOQAOANAAAaQAAAYgMARQgMARgZAAQgVAAgNgPgAgWgbQgHANAAAQQAAAQAHAMQAHALAPgBQARABAGgNQAHgOAAgPQAAgOgFgKQgHgPgSAAQgPAAgHANg");
	this.shape_8.setTransform(-2.325,-33.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AAhBIIghh2IggB2IgVAAIgliPIAVAAIAbB0IAhh0IAUAAIAgB0IAbh0IAVAAIglCPg");
	this.shape_9.setTransform(-17.125,-35.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EB5344").s().p("AFcQ+QgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAgGQAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAAGQAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhQGQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAgwQAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAAwQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAFcP9QgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABgBQABABAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhOaQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAgAFcOFQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhMhQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcMNQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhKpQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcKVQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABgBQABABAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhIyQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAgAFcIdQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhG5QgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcGlQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhFBQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcEtQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABgBQABABAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhDKQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAgAFcC1QgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhBRQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcA9QgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhgmQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcg6QgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABgBQABABAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhidQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAgAFciyQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhkWQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFckqQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhmOQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcmiQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABgBQABABAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhoFQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAgAFcoaQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhp+QgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcqSQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhr2QgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcsKQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABgBQABABAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhttQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAgAFcuCQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAgAlhvmQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBgAFcv6QgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.6,-108.7,71.2,217.5);


(lib.Tween64 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("AAZA1IAAhAQAAgKgDgGQgFgKgMAAIgJABQgIADgFAGQgEAFgBAGQgCAFAAAKIAAA2IgRAAIAAhnIAQAAIAAAPQAIgKAIgDQAIgFAJAAQAWAAAJAQQADAJAAAQIAABBg");
	this.shape.setTransform(44.9,14.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AgjApQgMgPAAgYQAAgZANgQQANgPAVAAQAVAAANANQAOAOAAAaQAAAYgMAQQgMAQgZAAQgVAAgNgOgAgWgbQgHANAAAPQAAARAHALQAHALAPAAQARAAAGgNQAHgNAAgPQAAgPgFgJQgHgPgSAAQgPAAgHANg");
	this.shape_1.setTransform(33.675,14.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("AgIBIIAAhnIARAAIAABngAgIgzIAAgUIARAAIAAAUg");
	this.shape_2.setTransform(26.05,12.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_3.setTransform(18.875,14.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA5547").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_4.setTransform(8.875,14.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EA5547").s().p("AghApQgOgOAAgaQAAgYAOgPQANgQAWAAQAKAAALAFQAKAFAGAJQAFAHACALQABAHABAPIhMAAQABAQAGAKQAHAJAPAAQANAAAIgJQAFgFACgHIARAAQgBAGgEAHQgEAHgFAEQgHAIgMADQgHABgGAAQgUAAgNgOgAAegIQgCgLgEgHQgHgNgQAAQgLAAgJAJQgIAJgBANIA6AAIAAAAg");
	this.shape_5.setTransform(-1.8,14.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EA5547").s().p("AgYA1IAAhnIAQAAIAAASQACgGAHgHQAIgIALAAIACAAIADABIAAASIgCAAIgDAAQgOAAgGAIQgHAJAAAMIAAA6g");
	this.shape_6.setTransform(-10,14.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EA5547").s().p("AgtBKIAAiQIARAAIAAAOQAFgIAGgEQAJgFALAAQASAAANANQAMAOAAAZQAAAhgSAPQgLAJgPAAQgLAAgIgFQgFgDgGgHIAAA1gAgZgoQgDAKAAAPQAAAMADAIQAHAQASAAQAMAAAIgKQAIgLAAgTQAAgNgEgJQgGgRgSAAQgSAAgHASg");
	this.shape_7.setTransform(-19.225,16.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EA5547").s().p("AghApQgNgOAAgaQAAgYANgPQANgQAVAAQALAAALAFQAKAFAGAJQAFAHACALQACAHgBAPIhKAAQAAAQAHAKQAGAJAOAAQAOAAAIgJQAFgFABgHIASAAQgBAGgDAHQgFAHgEAEQgIAIgMADQgHABgGAAQgTAAgOgOgAAdgIQgBgLgDgHQgIgNgRAAQgLAAgHAJQgJAJAAANIA4AAIAAAAg");
	this.shape_8.setTransform(-30.65,14.825);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EA5547").s().p("Ag5BIIAAiPIA5AAQAcAAAQAVQAPATAAAeQAAAWgJASQgPAhgkAAgAgmA3IAiAAQAJAAAGgCQALgEAHgLQAGgIACgOIABgPQAAgagKgOQgKgPgWAAIgiAAg");
	this.shape_9.setTransform(-43.05,12.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgdBEQgLgIgCgQIASAAQACAHADAEQAGAGANAAQATAAAGgOQAEgJAAgVQgGAIgHAEQgHAEgMAAQgQAAgNgMQgNgNAAgaQAAgbANgOQANgPASAAQALAAAJAGQAFADAFAHIAAgNIARAAIAABeQAAAUgGALQgLAVgdAAQgRAAgMgHgAgXgpQgEAJAAAPQAAARAHAJQAIAJAMAAQARAAAIgRQAEgJAAgMQAAgUgIgJQgIgKgMAAQgRAAgHASg");
	this.shape_10.setTransform(16.275,-12.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AAZA1IAAhBQAAgJgDgGQgEgKgNAAIgJABQgIADgFAGQgFAGAAAFQgCAFAAAKIAAA2IgSAAIAAhnIARAAIAAAPQAHgKAJgDQAIgEAJgBQAXABAHAPQAFAIAAARIAABBg");
	this.shape_11.setTransform(5.55,-14.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgjApQgMgOAAgZQAAgaANgPQANgPAVAAQAVAAANANQAOAOAAAaQAAAYgMAQQgMAQgZAAQgVAAgNgOgAgWgbQgHAMAAAQQAAASAHAKQAHAMAPAAQARAAAGgOQAHgNAAgPQAAgPgFgJQgHgOgSAAQgPAAgHAMg");
	this.shape_12.setTransform(-5.675,-14.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgtBIIAAiPIAUAAIAAB+IBHAAIAAARg");
	this.shape_13.setTransform(-16.125,-16.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.3,-26.5,110.69999999999999,53.1);


(lib.Tween63 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("AAZA1IAAhAQAAgKgDgGQgFgKgMAAIgJABQgIADgFAGQgEAFgBAGQgCAFAAAKIAAA2IgRAAIAAhnIAQAAIAAAPQAIgKAIgDQAIgFAJAAQAWAAAJAQQADAJAAAQIAABBg");
	this.shape.setTransform(44.9,14.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AgjApQgMgPAAgYQAAgZANgQQANgPAVAAQAVAAANANQAOAOAAAaQAAAYgMAQQgMAQgZAAQgVAAgNgOgAgWgbQgHANAAAPQAAARAHALQAHALAPAAQARAAAGgNQAHgNAAgPQAAgPgFgJQgHgPgSAAQgPAAgHANg");
	this.shape_1.setTransform(33.675,14.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("AgIBIIAAhnIARAAIAABngAgIgzIAAgUIARAAIAAAUg");
	this.shape_2.setTransform(26.05,12.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_3.setTransform(18.875,14.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA5547").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_4.setTransform(8.875,14.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EA5547").s().p("AghApQgOgOAAgaQAAgYAOgPQANgQAWAAQAKAAALAFQAKAFAGAJQAFAHACALQABAHABAPIhMAAQABAQAGAKQAHAJAPAAQANAAAIgJQAFgFACgHIARAAQgBAGgEAHQgEAHgFAEQgHAIgMADQgHABgGAAQgUAAgNgOgAAegIQgCgLgEgHQgHgNgQAAQgLAAgJAJQgIAJgBANIA6AAIAAAAg");
	this.shape_5.setTransform(-1.8,14.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EA5547").s().p("AgYA1IAAhnIAQAAIAAASQACgGAHgHQAIgIALAAIACAAIADABIAAASIgCAAIgDAAQgOAAgGAIQgHAJAAAMIAAA6g");
	this.shape_6.setTransform(-10,14.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EA5547").s().p("AgtBKIAAiQIARAAIAAAOQAFgIAGgEQAJgFALAAQASAAANANQAMAOAAAZQAAAhgSAPQgLAJgPAAQgLAAgIgFQgFgDgGgHIAAA1gAgZgoQgDAKAAAPQAAAMADAIQAHAQASAAQAMAAAIgKQAIgLAAgTQAAgNgEgJQgGgRgSAAQgSAAgHASg");
	this.shape_7.setTransform(-19.225,16.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EA5547").s().p("AghApQgNgOAAgaQAAgYANgPQANgQAVAAQALAAALAFQAKAFAGAJQAFAHACALQACAHgBAPIhKAAQAAAQAHAKQAGAJAOAAQAOAAAIgJQAFgFABgHIASAAQgBAGgDAHQgFAHgEAEQgIAIgMADQgHABgGAAQgTAAgOgOgAAdgIQgBgLgDgHQgIgNgRAAQgLAAgHAJQgJAJAAANIA4AAIAAAAg");
	this.shape_8.setTransform(-30.65,14.825);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EA5547").s().p("Ag5BIIAAiPIA5AAQAcAAAQAVQAPATAAAeQAAAWgJASQgPAhgkAAgAgmA3IAiAAQAJAAAGgCQALgEAHgLQAGgIACgOIABgPQAAgagKgOQgKgPgWAAIgiAAg");
	this.shape_9.setTransform(-43.05,12.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgdBEQgLgIgCgQIASAAQACAHADAEQAGAGANAAQATAAAGgOQAEgJAAgVQgGAIgHAEQgHAEgMAAQgQAAgNgMQgNgNAAgaQAAgbANgOQANgPASAAQALAAAJAGQAFADAFAHIAAgNIARAAIAABeQAAAUgGALQgLAVgdAAQgRAAgMgHgAgXgpQgEAJAAAPQAAARAHAJQAIAJAMAAQARAAAIgRQAEgJAAgMQAAgUgIgJQgIgKgMAAQgRAAgHASg");
	this.shape_10.setTransform(16.275,-12.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AAZA1IAAhBQAAgJgDgGQgEgKgNAAIgJABQgIADgFAGQgFAGAAAFQgCAFAAAKIAAA2IgSAAIAAhnIARAAIAAAPQAHgKAJgDQAIgEAJgBQAXABAHAPQAFAIAAARIAABBg");
	this.shape_11.setTransform(5.55,-14.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgjApQgMgOAAgZQAAgaANgPQANgPAVAAQAVAAANANQAOAOAAAaQAAAYgMAQQgMAQgZAAQgVAAgNgOgAgWgbQgHAMAAAQQAAASAHAKQAHAMAPAAQARAAAGgOQAHgNAAgPQAAgPgFgJQgHgOgSAAQgPAAgHAMg");
	this.shape_12.setTransform(-5.675,-14.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgtBIIAAiPIAUAAIAAB+IBHAAIAAARg");
	this.shape_13.setTransform(-16.125,-16.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.3,-26.5,110.69999999999999,53.1);


(lib.Tween62 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("AAZA1IAAhBQAAgJgDgGQgFgKgMAAIgKABQgGADgGAGQgEAGgCAFQgBAFAAAKIAAA2IgRAAIAAhnIAQAAIAAAPQAHgKAJgDQAIgEAKgBQAVABAIAPQAEAIAAARIAABBg");
	this.shape.setTransform(126.65,26.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AgjApQgMgOAAgZQAAgaANgPQANgPAVAAQAVAAANANQAOAOAAAaQAAAYgMAQQgMAQgZAAQgVAAgNgOgAgWgbQgHAMAAAQQAAASAHAKQAHAMAPAAQARAAAGgOQAHgNAAgPQAAgPgFgJQgHgOgSAAQgPAAgHAMg");
	this.shape_1.setTransform(115.425,26.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("AgIBIIAAhnIARAAIAABngAgIgzIAAgUIARAAIAAAUg");
	this.shape_2.setTransform(107.8,24.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_3.setTransform(100.625,26.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA5547").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_4.setTransform(90.625,26.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EA5547").s().p("AghApQgNgOAAgaQAAgYANgPQANgQAVAAQAMAAAKAFQAKAFAGAJQAFAHACALQACAHgBAPIhKAAQAAAQAGAKQAIAJAOAAQANAAAIgJQAFgFABgHIASAAQgBAGgEAHQgDAHgGAEQgHAIgMADQgHABgGAAQgTAAgOgOgAAdgIQgBgLgDgHQgIgNgQAAQgMAAgHAJQgJAJAAANIA4AAIAAAAg");
	this.shape_5.setTransform(79.95,26.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EA5547").s().p("AggAoQgMgPAAgWQAAgbANgPQAOgPATAAQASAAALAIQALAJADAVIgSAAQgBgKgGgGQgFgHgNAAQgPAAgIARQgEAKAAAPQAAAQAGAKQAHALANAAQALAAAHgGQAGgHACgMIASAAQgDAVgMAKQgMAJgSAAQgUAAgMgPg");
	this.shape_6.setTransform(69.575,26.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EA5547").s().p("AghApQgOgOAAgaQAAgYAOgPQANgQAWAAQAKAAALAFQALAFAFAJQAFAHACALQACAHAAAPIhMAAQABAQAHAKQAHAJANAAQAOAAAIgJQAFgFACgHIARAAQgBAGgEAHQgEAHgFAEQgHAIgMADQgHABgGAAQgUAAgNgOgAAegIQgCgLgEgHQgHgNgRAAQgKAAgJAJQgIAJgBANIA6AAIAAAAg");
	this.shape_7.setTransform(58.85,26.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EA5547").s().p("AAjBIIgBgFIgBgLIgCgYQAAgOgKgFQgFgDgMAAIgqAAIAAA+IgTAAIAAiPIBAAAQAQAAALAFQATAJAAAZQAAANgFAIQgFAIgKAEQAJAEADAFQAFAGABAMIAAAUIABAMQACAHAFACIAAADgAgmgFIArAAQANAAAIgFQAHgGABgOQAAgQgLgFQgGgDgKAAIgtAAg");
	this.shape_8.setTransform(46.6,24.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_9.setTransform(117.225,-2.525);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AglAyQgKgTAAgeQAAgXAGgRQAMggAdAAQAbAAAMAXQAJARAAAeQAAAcgIASQgNAbgbAAQgZAAgMgWgAgVgoQgHAOgBAcQAAAVAGANQAGAUARAAQANAAAIgNQAJgLAAghQgBgYgFgOQgGgQgSAAQgOAAgHAPg");
	this.shape_10.setTransform(106.55,-4.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgiA9QgKgKAAgRIARAAQABAOALAGQAFADAHAAQALAAAJgKQAJgLAEggQgGAKgJADQgIAEgJAAQgVAAgLgNQgMgLAAgUQAAgTAMgPQALgOAXAAQAdAAAMAbQAGAQAAAXQAAAYgHAUQgNAhgeAAQgUAAgLgLgAgUgvQgIAKAAAOQAAAOAHAHQAGAIAPgBQAJABAJgHQAJgGAAgRQAAgQgIgIQgIgHgLAAQgNAAgHAIg");
	this.shape_11.setTransform(95.425,-4.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AggBJIgGgBIAAgQIAIACIADAAQAFAAACgBIAEgEIAEgIIAEgLIgnhrIAUAAIAbBUIAchUIAUAAIgQAuIgRArQgPAogFAJQgGAJgQAAg");
	this.shape_12.setTransform(79.45,-0.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgIBIIAAiPIARAAIAACPg");
	this.shape_13.setTransform(72.275,-4.525);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgZA1IAAhnIARAAIAAASQACgGAHgHQAIgIAKABIADAAIADAAIAAATIgCgBIgEAAQgNAAgGAJQgHAIAAAMIAAA6g");
	this.shape_14.setTransform(67.3,-2.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgnAuQgKgIAAgOQAAgOAKgIQAJgHAPgCIAbgEQAGAAACgFIABgGQAAgJgHgEQgGgFgLAAQgOAAgFAIQgDAEgCAIIgQAAQAAgTAMgIQANgHAPAAQASAAALAHQAMAHAAAPIAAA7IABAEQAAABABAAQAAAAABAAQAAABABAAQABAAAAAAIAEAAIADgBIAAANIgHACIgFAAQgKAAgEgGQgCgEgBgGQgFAHgLAFQgIAFgMAAQgPAAgJgJgAAMACIgKACIgJABQgKACgFACQgIAFAAAKQAAAIAGAEQAFAEAHAAQAKAAAHgEQAPgHAAgQIAAgNIgIACg");
	this.shape_15.setTransform(58.05,-2.525);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("Ag0BIIAAiPIBnAAIAAASIhUAAIAAArIBOAAIAAAQIhOAAIAAAxIBWAAIAAARg");
	this.shape_16.setTransform(45.975,-4.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#EB5344").s().p("As9QqQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBgBIAAg7QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3QRQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAgBQABABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9OyQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg9QABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3OZQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9M6QAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg8QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3MhQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9LCQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBgBIAAg7QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3KpQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAgBQABABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9JKQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg9QABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3IxQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9HSQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg8QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3G5QAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9FaQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBgBIAAg7QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3FBQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAgBQABABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9DiQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg9QABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3DJQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9BqQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg8QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3BRQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9gNQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBgBIAAg7QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3gmQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAgBQABABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9iFQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg9QABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3ieQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9j9QAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg8QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3kWQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9l1QAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBgBIAAg7QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3mOQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAgBQABABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9ntQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg9QABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3oGQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9plQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg8QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3p+QAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9rdQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBgBIAAg7QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3r2QAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAgBQABABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9tVQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg9QABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3tuQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9vNQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg8QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3vmQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_17.setTransform(-51.75,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134.9,-106.7,269.3,213.5);


(lib.Tween61 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("AAZA1IAAhBQAAgJgDgGQgFgKgMAAIgKABQgGADgGAGQgEAGgCAFQgBAFAAAKIAAA2IgRAAIAAhnIAQAAIAAAPQAHgKAJgDQAIgEAKgBQAVABAIAPQAEAIAAARIAABBg");
	this.shape.setTransform(126.65,26.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AgjApQgMgOAAgZQAAgaANgPQANgPAVAAQAVAAANANQAOAOAAAaQAAAYgMAQQgMAQgZAAQgVAAgNgOgAgWgbQgHAMAAAQQAAASAHAKQAHAMAPAAQARAAAGgOQAHgNAAgPQAAgPgFgJQgHgOgSAAQgPAAgHAMg");
	this.shape_1.setTransform(115.425,26.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("AgIBIIAAhnIARAAIAABngAgIgzIAAgUIARAAIAAAUg");
	this.shape_2.setTransform(107.8,24.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_3.setTransform(100.625,26.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA5547").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_4.setTransform(90.625,26.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EA5547").s().p("AghApQgNgOAAgaQAAgYANgPQANgQAVAAQAMAAAKAFQAKAFAGAJQAFAHACALQACAHgBAPIhKAAQAAAQAGAKQAIAJAOAAQANAAAIgJQAFgFABgHIASAAQgBAGgEAHQgDAHgGAEQgHAIgMADQgHABgGAAQgTAAgOgOgAAdgIQgBgLgDgHQgIgNgQAAQgMAAgHAJQgJAJAAANIA4AAIAAAAg");
	this.shape_5.setTransform(79.95,26.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EA5547").s().p("AggAoQgMgPAAgWQAAgbANgPQAOgPATAAQASAAALAIQALAJADAVIgSAAQgBgKgGgGQgFgHgNAAQgPAAgIARQgEAKAAAPQAAAQAGAKQAHALANAAQALAAAHgGQAGgHACgMIASAAQgDAVgMAKQgMAJgSAAQgUAAgMgPg");
	this.shape_6.setTransform(69.575,26.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EA5547").s().p("AghApQgOgOAAgaQAAgYAOgPQANgQAWAAQAKAAALAFQALAFAFAJQAFAHACALQACAHAAAPIhMAAQABAQAHAKQAHAJANAAQAOAAAIgJQAFgFACgHIARAAQgBAGgEAHQgEAHgFAEQgHAIgMADQgHABgGAAQgUAAgNgOgAAegIQgCgLgEgHQgHgNgRAAQgKAAgJAJQgIAJgBANIA6AAIAAAAg");
	this.shape_7.setTransform(58.85,26.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EA5547").s().p("AAjBIIgBgFIgBgLIgCgYQAAgOgKgFQgFgDgMAAIgqAAIAAA+IgTAAIAAiPIBAAAQAQAAALAFQATAJAAAZQAAANgFAIQgFAIgKAEQAJAEADAFQAFAGABAMIAAAUIABAMQACAHAFACIAAADgAgmgFIArAAQANAAAIgFQAHgGABgOQAAgQgLgFQgGgDgKAAIgtAAg");
	this.shape_8.setTransform(46.6,24.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_9.setTransform(117.225,-2.525);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AglAyQgKgTAAgeQAAgXAGgRQAMggAdAAQAbAAAMAXQAJARAAAeQAAAcgIASQgNAbgbAAQgZAAgMgWgAgVgoQgHAOgBAcQAAAVAGANQAGAUARAAQANAAAIgNQAJgLAAghQgBgYgFgOQgGgQgSAAQgOAAgHAPg");
	this.shape_10.setTransform(106.55,-4.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgiA9QgKgKAAgRIARAAQABAOALAGQAFADAHAAQALAAAJgKQAJgLAEggQgGAKgJADQgIAEgJAAQgVAAgLgNQgMgLAAgUQAAgTAMgPQALgOAXAAQAdAAAMAbQAGAQAAAXQAAAYgHAUQgNAhgeAAQgUAAgLgLgAgUgvQgIAKAAAOQAAAOAHAHQAGAIAPgBQAJABAJgHQAJgGAAgRQAAgQgIgIQgIgHgLAAQgNAAgHAIg");
	this.shape_11.setTransform(95.425,-4.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AggBJIgGgBIAAgQIAIACIADAAQAFAAACgBIAEgEIAEgIIAEgLIgnhrIAUAAIAbBUIAchUIAUAAIgQAuIgRArQgPAogFAJQgGAJgQAAg");
	this.shape_12.setTransform(79.45,-0.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgIBIIAAiPIARAAIAACPg");
	this.shape_13.setTransform(72.275,-4.525);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgZA1IAAhnIARAAIAAASQACgGAHgHQAIgIAKABIADAAIADAAIAAATIgCgBIgEAAQgNAAgGAJQgHAIAAAMIAAA6g");
	this.shape_14.setTransform(67.3,-2.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgnAuQgKgIAAgOQAAgOAKgIQAJgHAPgCIAbgEQAGAAACgFIABgGQAAgJgHgEQgGgFgLAAQgOAAgFAIQgDAEgCAIIgQAAQAAgTAMgIQANgHAPAAQASAAALAHQAMAHAAAPIAAA7IABAEQAAABABAAQAAAAABAAQAAABABAAQABAAAAAAIAEAAIADgBIAAANIgHACIgFAAQgKAAgEgGQgCgEgBgGQgFAHgLAFQgIAFgMAAQgPAAgJgJgAAMACIgKACIgJABQgKACgFACQgIAFAAAKQAAAIAGAEQAFAEAHAAQAKAAAHgEQAPgHAAgQIAAgNIgIACg");
	this.shape_15.setTransform(58.05,-2.525);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("Ag0BIIAAiPIBnAAIAAASIhUAAIAAArIBOAAIAAAQIhOAAIAAAxIBWAAIAAARg");
	this.shape_16.setTransform(45.975,-4.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#EB5344").s().p("As9QqQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBgBIAAg7QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3QRQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAgBQABABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9OyQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg9QABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3OZQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9M6QAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg8QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3MhQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9LCQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBgBIAAg7QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3KpQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAgBQABABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9JKQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg9QABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3IxQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9HSQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg8QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3G5QAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9FaQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBgBIAAg7QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3FBQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAgBQABABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9DiQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg9QABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3DJQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9BqQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg8QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3BRQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9gNQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBgBIAAg7QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3gmQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAgBQABABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9iFQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg9QABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3ieQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9j9QAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg8QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3kWQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9l1QAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBgBIAAg7QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3mOQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAgBQABABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9ntQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg9QABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3oGQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9plQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg8QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3p+QAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9rdQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBgBIAAg7QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3r2QAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAgBQABABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9tVQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg9QABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3tuQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAg8QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA8QAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAs9vNQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIAAg8QABgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAM3vmQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_17.setTransform(-51.75,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134.9,-106.7,269.3,213.5);


(lib.Tween60 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("AAZA1IAAhAQAAgKgDgGQgFgKgMAAIgJABQgIADgFAGQgEAFgBAGQgCAFAAAKIAAA2IgRAAIAAhnIAQAAIAAAPQAIgKAIgDQAIgFAJAAQAWAAAJAQQADAJAAAQIAABBg");
	this.shape.setTransform(44.9,14.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AgjApQgMgPAAgYQAAgZANgQQANgPAVAAQAVAAANANQAOAOAAAaQAAAYgMAQQgMAQgZAAQgVAAgNgOgAgWgbQgHANAAAPQAAARAHALQAHALAPAAQARAAAGgNQAHgNAAgPQAAgPgFgJQgHgPgSAAQgPAAgHANg");
	this.shape_1.setTransform(33.675,14.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("AgIBIIAAhnIARAAIAABngAgIgzIAAgUIARAAIAAAUg");
	this.shape_2.setTransform(26.05,12.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_3.setTransform(18.875,14.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA5547").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_4.setTransform(8.875,14.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EA5547").s().p("AghApQgOgOAAgaQAAgYAOgPQANgQAWAAQAKAAALAFQAKAFAGAJQAFAHACALQABAHABAPIhMAAQABAQAGAKQAHAJAPAAQANAAAIgJQAFgFACgHIARAAQgBAGgEAHQgEAHgFAEQgHAIgMADQgHABgGAAQgUAAgNgOgAAegIQgCgLgEgHQgHgNgQAAQgLAAgJAJQgIAJgBANIA6AAIAAAAg");
	this.shape_5.setTransform(-1.8,14.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EA5547").s().p("AgYA1IAAhnIAQAAIAAASQACgGAHgHQAIgIALAAIACAAIADABIAAASIgCAAIgDAAQgOAAgGAIQgHAJAAAMIAAA6g");
	this.shape_6.setTransform(-10,14.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EA5547").s().p("AgtBKIAAiQIARAAIAAAOQAFgIAGgEQAJgFALAAQASAAANANQAMAOAAAZQAAAhgSAPQgLAJgPAAQgLAAgIgFQgFgDgGgHIAAA1gAgZgoQgDAKAAAPQAAAMADAIQAHAQASAAQAMAAAIgKQAIgLAAgTQAAgNgEgJQgGgRgSAAQgSAAgHASg");
	this.shape_7.setTransform(-19.225,16.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EA5547").s().p("AghApQgNgOAAgaQAAgYANgPQANgQAVAAQALAAALAFQAKAFAGAJQAFAHACALQACAHgBAPIhKAAQAAAQAHAKQAGAJAOAAQAOAAAIgJQAFgFABgHIASAAQgBAGgDAHQgFAHgEAEQgIAIgMADQgHABgGAAQgTAAgOgOgAAdgIQgBgLgDgHQgIgNgRAAQgLAAgHAJQgJAJAAANIA4AAIAAAAg");
	this.shape_8.setTransform(-30.65,14.825);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EA5547").s().p("Ag5BIIAAiPIA5AAQAcAAAQAVQAPATAAAeQAAAWgJASQgPAhgkAAgAgmA3IAiAAQAJAAAGgCQALgEAHgLQAGgIACgOIABgPQAAgagKgOQgKgPgWAAIgiAAg");
	this.shape_9.setTransform(-43.05,12.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AALBEQgMAAgDgGQgFgHAAgKIAAhEIgOAAIAAgOIAOAAIAAgeIAQAAIAAAeIARAAIAAAOIgRAAIAABDQAAAGAFACIAGABIADAAIADgBIAAAOIgGACg");
	this.shape_10.setTransform(22.05,-15.775);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgnAuQgKgIAAgOQAAgOAJgIQAKgHAPgCIAbgEQAFAAADgFIABgGQAAgJgHgEQgGgFgLAAQgOAAgGAIQgCAEgBAIIgRAAQAAgTAMgIQANgHAPAAQASAAAMAHQALAHAAAPIAAA7IABAEQAAABABAAQAAAAABAAQAAABABAAQABAAAAAAIAEAAIACgBIAAANIgGACIgFAAQgKAAgEgGQgCgEgBgGQgFAHgLAFQgJAFgLAAQgPAAgJgJgAAMACIgKACIgJABQgKACgFACQgIAFAAAKQAAAIAGAEQAFAEAHAAQAKAAAHgEQAPgHAAgQIAAgNIgIACg");
	this.shape_11.setTransform(14.05,-14.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AghApQgNgOAAgaQAAgYANgPQANgQAVAAQALAAALAFQAKAFAGAJQAFAHACALQACAHgBAPIhKAAQAAAQAHAKQAGAJAPAAQANAAAIgJQAFgFABgHIASAAQgBAGgDAHQgFAHgEAEQgIAIgMADQgHABgGAAQgTAAgOgOgAAdgIQgBgLgDgHQgIgNgQAAQgMAAgHAJQgJAJAAANIA4AAIAAAAg");
	this.shape_12.setTransform(2.65,-14.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgZA1IAAhnIARAAIAAASQACgGAHgHQAIgIAKAAIACAAIAFABIAAATIgEgBIgDAAQgNAAgGAIQgHAJAAAMIAAA6g");
	this.shape_13.setTransform(-5.55,-14.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgsA7QgUgVAAgkQAAgjAUgWQASgTAcgBQAUABAOAHQAWALAEAcIgTAAQgDgPgLgHQgLgIgQABQgTgBgNAQQgOAPAAAcQAAAaALAPQALAQAYABQATgBANgKQAMgMABgZIgtAAIAAgPIA/AAIAABLIgNAAIgFgSQgJALgIAEQgMAIgTAAQgZAAgSgRg");
	this.shape_14.setTransform(-17.575,-16.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.5,-26.5,105.1,53.1);


(lib.Tween59 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("AAZA1IAAhAQAAgKgDgGQgFgKgMAAIgJABQgIADgFAGQgEAFgBAGQgCAFAAAKIAAA2IgRAAIAAhnIAQAAIAAAPQAIgKAIgDQAIgFAJAAQAWAAAJAQQADAJAAAQIAABBg");
	this.shape.setTransform(44.9,14.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AgjApQgMgPAAgYQAAgZANgQQANgPAVAAQAVAAANANQAOAOAAAaQAAAYgMAQQgMAQgZAAQgVAAgNgOgAgWgbQgHANAAAPQAAARAHALQAHALAPAAQARAAAGgNQAHgNAAgPQAAgPgFgJQgHgPgSAAQgPAAgHANg");
	this.shape_1.setTransform(33.675,14.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("AgIBIIAAhnIARAAIAABngAgIgzIAAgUIARAAIAAAUg");
	this.shape_2.setTransform(26.05,12.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_3.setTransform(18.875,14.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA5547").s().p("AggAtQgKgKgBgQIARAAQABAJAEAEQAGAJAQAAQAKAAAIgEQAHgFAAgIQAAgHgGgEIgPgFIgNgDQgOgEgGgDQgMgHAAgMQAAgPALgJQALgKASAAQAXAAALAOQAGAJAAAKIgRAAQAAgGgEgFQgGgGgOAAQgLAAgFADQgFAEAAAGQAAAHAHAEQAEADAIACIAKACQAUAFAGADQALAHAAAOQAAAOgLALQgLAKgWAAQgWAAgKgLg");
	this.shape_4.setTransform(8.875,14.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EA5547").s().p("AghApQgOgOAAgaQAAgYAOgPQANgQAWAAQAKAAALAFQAKAFAGAJQAFAHACALQABAHABAPIhMAAQABAQAGAKQAHAJAPAAQANAAAIgJQAFgFACgHIARAAQgBAGgEAHQgEAHgFAEQgHAIgMADQgHABgGAAQgUAAgNgOgAAegIQgCgLgEgHQgHgNgQAAQgLAAgJAJQgIAJgBANIA6AAIAAAAg");
	this.shape_5.setTransform(-1.8,14.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EA5547").s().p("AgYA1IAAhnIAQAAIAAASQACgGAHgHQAIgIALAAIACAAIADABIAAASIgCAAIgDAAQgOAAgGAIQgHAJAAAMIAAA6g");
	this.shape_6.setTransform(-10,14.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EA5547").s().p("AgtBKIAAiQIARAAIAAAOQAFgIAGgEQAJgFALAAQASAAANANQAMAOAAAZQAAAhgSAPQgLAJgPAAQgLAAgIgFQgFgDgGgHIAAA1gAgZgoQgDAKAAAPQAAAMADAIQAHAQASAAQAMAAAIgKQAIgLAAgTQAAgNgEgJQgGgRgSAAQgSAAgHASg");
	this.shape_7.setTransform(-19.225,16.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EA5547").s().p("AghApQgNgOAAgaQAAgYANgPQANgQAVAAQALAAALAFQAKAFAGAJQAFAHACALQACAHgBAPIhKAAQAAAQAHAKQAGAJAOAAQAOAAAIgJQAFgFABgHIASAAQgBAGgDAHQgFAHgEAEQgIAIgMADQgHABgGAAQgTAAgOgOgAAdgIQgBgLgDgHQgIgNgRAAQgLAAgHAJQgJAJAAANIA4AAIAAAAg");
	this.shape_8.setTransform(-30.65,14.825);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EA5547").s().p("Ag5BIIAAiPIA5AAQAcAAAQAVQAPATAAAeQAAAWgJASQgPAhgkAAgAgmA3IAiAAQAJAAAGgCQALgEAHgLQAGgIACgOIABgPQAAgagKgOQgKgPgWAAIgiAAg");
	this.shape_9.setTransform(-43.05,12.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AALBEQgMAAgDgGQgFgHAAgKIAAhEIgOAAIAAgOIAOAAIAAgeIAQAAIAAAeIARAAIAAAOIgRAAIAABDQAAAGAFACIAGABIADAAIADgBIAAAOIgGACg");
	this.shape_10.setTransform(22.05,-15.775);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgnAuQgKgIAAgOQAAgOAJgIQAKgHAPgCIAbgEQAFAAADgFIABgGQAAgJgHgEQgGgFgLAAQgOAAgGAIQgCAEgBAIIgRAAQAAgTAMgIQANgHAPAAQASAAAMAHQALAHAAAPIAAA7IABAEQAAABABAAQAAAAABAAQAAABABAAQABAAAAAAIAEAAIACgBIAAANIgGACIgFAAQgKAAgEgGQgCgEgBgGQgFAHgLAFQgJAFgLAAQgPAAgJgJgAAMACIgKACIgJABQgKACgFACQgIAFAAAKQAAAIAGAEQAFAEAHAAQAKAAAHgEQAPgHAAgQIAAgNIgIACg");
	this.shape_11.setTransform(14.05,-14.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AghApQgNgOAAgaQAAgYANgPQANgQAVAAQALAAALAFQAKAFAGAJQAFAHACALQACAHgBAPIhKAAQAAAQAHAKQAGAJAPAAQANAAAIgJQAFgFABgHIASAAQgBAGgDAHQgFAHgEAEQgIAIgMADQgHABgGAAQgTAAgOgOgAAdgIQgBgLgDgHQgIgNgQAAQgMAAgHAJQgJAJAAANIA4AAIAAAAg");
	this.shape_12.setTransform(2.65,-14.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgZA1IAAhnIARAAIAAASQACgGAHgHQAIgIAKAAIACAAIAFABIAAATIgEgBIgDAAQgNAAgGAIQgHAJAAAMIAAA6g");
	this.shape_13.setTransform(-5.55,-14.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgsA7QgUgVAAgkQAAgjAUgWQASgTAcgBQAUABAOAHQAWALAEAcIgTAAQgDgPgLgHQgLgIgQABQgTgBgNAQQgOAPAAAcQAAAaALAPQALAQAYABQATgBANgKQAMgMABgZIgtAAIAAgPIA/AAIAABLIgNAAIgFgSQgJALgIAEQgMAIgTAAQgZAAgSgRg");
	this.shape_14.setTransform(-17.575,-16.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.5,-26.5,105.1,53.1);


(lib.Tween58 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgJBIIAAiPIATAAIAACPg");
	this.shape.setTransform(19.75,-64.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AgZA1IAAhnIARAAIAAASQACgGAHgHQAIgIAKABIACAAIAFAAIAAATIgEgBIgDAAQgNAAgGAJQgHAIAAAMIAAA6g");
	this.shape_1.setTransform(8.5,-62.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("AgnAuQgJgIAAgOQAAgOAJgIQAIgHAPgCIAbgEQAHAAABgFIABgGQAAgJgFgEQgHgFgLAAQgOAAgFAIQgEAEgBAIIgQAAQABgTAMgIQAMgHAQAAQARAAALAHQAMAHAAAPIAAA7IABAEQAAABABAAQAAAAABAAQAAABABAAQABAAAAAAIADAAIAEgBIAAANIgHACIgGAAQgJAAgEgGQgCgEgBgGQgFAHgKAFQgKAFgMAAQgOAAgJgJgAAMACIgKACIgKABQgJACgFACQgIAFAAAKQAAAIAFAEQAGAEAIAAQAJAAAIgEQAOgHAAgQIAAgNIgIACg");
	this.shape_2.setTransform(-0.75,-62.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AAhBIIghh2IggB2IgVAAIgliPIAVAAIAbB0IAhh0IAUAAIAgB0IAbh0IAVAAIglCPg");
	this.shape_3.setTransform(-15.875,-64.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AggA7QgNgOAAgZQAAgWALgQQAMgRAWAAQALAAAIAFQAEADAGAHIAAg1IARAAIAACPIgQAAIAAgOQgGAJgIAFQgJAEgJAAQgSAAgMgPgAgTgKQgIAKAAATQAAARAHALQAHAMAPAAQAMAAAIgLQAIgKAAgUQAAgTgIgJQgIgKgMAAQgMAAgJAKg");
	this.shape_4.setTransform(18.625,-93.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgIBIIAAiPIARAAIAACPg");
	this.shape_5.setTransform(11.275,-93.525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgYA2IAAhoIAQAAIAAASQACgFAHgIQAIgIALABIACAAIADAAIAAATIgCgBIgDAAQgOAAgGAJQgHAIAAAMIAAA7g");
	this.shape_6.setTransform(6.3,-91.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgjApQgMgOAAgZQAAgaANgPQANgQAVAAQAVAAANAOQAOANAAAaQAAAZgMAQQgMAQgZAAQgVAAgNgOgAgWgbQgHANAAAPQAAASAHALQAHAKAPABQARgBAGgNQAHgNAAgPQAAgPgFgJQgHgOgSAAQgPAAgHAMg");
	this.shape_7.setTransform(-3.275,-91.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AAhBIIghh2IggB2IgVAAIgliPIAVAAIAbB0IAhh0IAUAAIAgB0IAbh0IAVAAIglCPg");
	this.shape_8.setTransform(-18.075,-93.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EB5344").s().p("AmQQUQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBIAAgmQAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAAAIAAAmQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAgAGKQRQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAAAAAgBIAAglQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAAlQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAgAmQOyQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg8QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKOwQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQM6QAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKM3QgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBgAmQLCQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKLAQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQJKQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg8QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKJIQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQHSQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKHPQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBgAmQFaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKFYQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQDiQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg8QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKDgQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQBqQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKBnQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBgAmQgNQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKgPQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQiFQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg8QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKiHQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQj9QAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKkAQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBgAmQl1QAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKl3QgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQntQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg8QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKnvQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQplQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKpoQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBgAmQrdQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKrfQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQtVQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg8QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKtXQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQvNQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKvQQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_9.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40.2,-104.5,80.5,209);


(lib.Tween57 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgJBIIAAiPIATAAIAACPg");
	this.shape.setTransform(19.75,-64.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AgZA1IAAhnIARAAIAAASQACgGAHgHQAIgIAKABIACAAIAFAAIAAATIgEgBIgDAAQgNAAgGAJQgHAIAAAMIAAA6g");
	this.shape_1.setTransform(8.5,-62.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("AgnAuQgJgIAAgOQAAgOAJgIQAIgHAPgCIAbgEQAHAAABgFIABgGQAAgJgFgEQgHgFgLAAQgOAAgFAIQgEAEgBAIIgQAAQABgTAMgIQAMgHAQAAQARAAALAHQAMAHAAAPIAAA7IABAEQAAABABAAQAAAAABAAQAAABABAAQABAAAAAAIADAAIAEgBIAAANIgHACIgGAAQgJAAgEgGQgCgEgBgGQgFAHgKAFQgKAFgMAAQgOAAgJgJgAAMACIgKACIgKABQgJACgFACQgIAFAAAKQAAAIAFAEQAGAEAIAAQAJAAAIgEQAOgHAAgQIAAgNIgIACg");
	this.shape_2.setTransform(-0.75,-62.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AAhBIIghh2IggB2IgVAAIgliPIAVAAIAbB0IAhh0IAUAAIAgB0IAbh0IAVAAIglCPg");
	this.shape_3.setTransform(-15.875,-64.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AggA7QgNgOAAgZQAAgWALgQQAMgRAWAAQALAAAIAFQAEADAGAHIAAg1IARAAIAACPIgQAAIAAgOQgGAJgIAFQgJAEgJAAQgSAAgMgPgAgTgKQgIAKAAATQAAARAHALQAHAMAPAAQAMAAAIgLQAIgKAAgUQAAgTgIgJQgIgKgMAAQgMAAgJAKg");
	this.shape_4.setTransform(18.625,-93.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgIBIIAAiPIARAAIAACPg");
	this.shape_5.setTransform(11.275,-93.525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgYA2IAAhoIAQAAIAAASQACgFAHgIQAIgIALABIACAAIADAAIAAATIgCgBIgDAAQgOAAgGAJQgHAIAAAMIAAA7g");
	this.shape_6.setTransform(6.3,-91.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgjApQgMgOAAgZQAAgaANgPQANgQAVAAQAVAAANAOQAOANAAAaQAAAZgMAQQgMAQgZAAQgVAAgNgOgAgWgbQgHANAAAPQAAASAHALQAHAKAPABQARgBAGgNQAHgNAAgPQAAgPgFgJQgHgOgSAAQgPAAgHAMg");
	this.shape_7.setTransform(-3.275,-91.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AAhBIIghh2IggB2IgVAAIgliPIAVAAIAbB0IAhh0IAUAAIAgB0IAbh0IAVAAIglCPg");
	this.shape_8.setTransform(-18.075,-93.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EB5344").s().p("AmQQUQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBIAAgmQAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAAAIAAAmQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAgAGKQRQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAAAAAgBIAAglQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAAlQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAgBgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAgAmQOyQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg8QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKOwQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQM6QAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKM3QgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBgAmQLCQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKLAQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQJKQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg8QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKJIQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQHSQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKHPQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBgAmQFaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKFYQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQDiQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg8QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKDgQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQBqQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKBnQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBgAmQgNQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKgPQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQiFQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg8QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKiHQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQj9QAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKkAQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBgAmQl1QAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKl3QgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQntQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg8QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKnvQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQplQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKpoQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBgAmQrdQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg9QAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAAAIAAA9QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKrfQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQtVQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAg8QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA8QAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKtXQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAmQvNQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAg7QAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIAAA7QAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAABQgBgBAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAGKvQQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAg8QAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIAAA8QAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_9.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40.2,-104.5,80.5,209);


(lib.Tween38 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("AhxD6IgQgEIAAg3IAWAGIANABQAQAAAIgGIANgNIAMgbIAPglIiEltIBEAAIBfEhIBfkhIBDAAIg5CcIg2CVQg0CIgUAeQgWAeg0AAg");
	this.shape.setTransform(79.2,34.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AgTDRQgOgVAAgjIAAjqIgxAAIAAgxIAxAAIAAhjIA7AAIAABjIA5AAIAAAxIg5AAIAADnQAAATANAGQAHAEAQAAIAJgBIAMgBIAAAwIgWAEIgYABQgpAAgPgVg");
	this.shape_1.setTransform(52.375,22.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("AgdD0IAAlhIA7AAIAAFhgAgdivIAAhEIA7AAIAABEg");
	this.shape_2.setTransform(35.675,20.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AgdD0IAAnnIA7AAIAAHng");
	this.shape_3.setTransform(20.7,20.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA5547").s().p("AgdD0IAAlhIA7AAIAAFhgAgdivIAAhEIA7AAIAABEg");
	this.shape_4.setTransform(5.475,20.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EA5547").s().p("AgTDRQgOgVAAgjIAAjqIgxAAIAAgxIAxAAIAAhjIA7AAIAABjIA5AAIAAAxIg5AAIAADnQAAATANAGQAHAEAQAAIAJgBIAMgBIAAAwIgWAEIgYABQgpAAgPgVg");
	this.shape_5.setTransform(-11.775,22.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EA5547").s().p("AiHCeQgggeAAguQAAgxAfgaQAfgbAygGIBegMQAVgDAHgOQAEgJAAgOQAAgfgWgOQgWgOgnAAQgvAAgTAZQgLAOgEAcIg3AAQABhCApgZQApgaA2AAQA+AAAnAYQAnAYAAAyIAADMQAAAJAEAGQADAFANABIAJgBIAKgBIAAAsIgVAEIgUABQgfAAgOgVQgHgMgDgVQgSAYgiASQgiARgpAAQgxAAgfgegAApAHIgiAGIgjAGQggADgRAKQgcAPAAAjQAAAaATAOQATAPAaAAQAgAAAcgPQAygXAAg4IAAgvQgLAHgRAEg");
	this.shape_6.setTransform(-39.075,27.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EA5547").s().p("AgdD0IAAnnIA7AAIAAHng");
	this.shape_7.setTransform(-66.15,20.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EA5547").s().p("Ah4CMQgsgyABhUQgBhYAug1QAtg1BLAAQBFAAAuAuQAwAtgBBZQAABVgpA4QgpA4hXAAQhIAAgrgxgAhOheQgYAqAAA5QAAA5AYAmQAZAmA1AAQA6AAAWgtQAWgtAAg2QAAgygPgfQgZgxg+AAQg1AAgZAqg");
	this.shape_8.setTransform(-93.1,27.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EA5547").s().p("AggCyIiDljIBFAAIBeEhIBjkhIBBAAIiGFjg");
	this.shape_9.setTransform(-128.675,27.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgeBAIAAh8IAVAAIAAAVQACgGAJgJQAKgJAMAAIACAAIAEABIAAAWIgDgBIgEAAQgPAAgIALQgJAKABANIAABHg");
	this.shape_10.setTransform(-3.85,-28.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgoAyQgQgRAAggQAAgdAQgSQARgUAZABQANgBANAHQAMAGAHAKQAGAJACAOQACAIAAASIhaAAQAAATAJALQAIAMARAAQAQAAAKgLQAFgGACgIIAVAAQgBAGgEAJQgFAIgGAGQgJAKgOACQgIACgIAAQgYAAgQgQgAAjgKQgBgOgFgIQgIgPgUAAQgOAAgKALQgJAKgBAQIBEAAIAAAAg");
	this.shape_11.setTransform(-15.275,-28.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AAZA/IgZhgIgYBgIgWAAIgkh9IAXAAIAYBiIAZhiIAWAAIAYBiIAahiIAVAAIgkB9g");
	this.shape_12.setTransform(-30.55,-28.375);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgqAxQgPgRAAgeQAAgeAQgTQAQgTAaAAQAYAAAQAQQARAQAAAgQAAAdgPAUQgOAUgeAAQgaAAgPgSgAgbghQgIAPgBAUQABAUAIANQAJAOASAAQAVAAAIgQQAHgQAAgTQAAgRgFgLQgJgRgWAAQgSAAgJAOg");
	this.shape_13.setTransform(-45.9,-28.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgJBWIAAirIATAAIAACrg");
	this.shape_14.setTransform(-55.05,-30.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgnA2QgLgMgCgTIAVAAQABAKAFAGQAHAKATAAQANAAAIgFQAKgFAAgLQAAgIgHgEQgFgDgOgDIgQgEQgQgFgIgDQgOgJAAgPQAAgSAOgLQANgLAVAAQAcAAAMARQAJALgBALIgUAAQAAgHgFgFQgHgIgRAAQgNgBgGAFQgGAEAAAIQAAAIAIAFQAFADAJACIAOAEQAXAFAHAEQANAIAAASQAAAQgOAMQgMANgaAAQgcAAgMgNg");
	this.shape_15.setTransform(-70.35,-28.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AgGBKQgFgIAAgMIAAhSIgRAAIAAgRIARAAIAAgjIAUAAIAAAjIAUAAIAAARIgUAAIAABRQAAAGAFADIAIABIADAAIAEgBIAAARIgHACIgJAAQgOAAgFgHg");
	this.shape_16.setTransform(-79.825,-30.025);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AgKBWIAAh8IAVAAIAAB8gAgKg9IAAgYIAVAAIAAAYg");
	this.shape_17.setTransform(-85.675,-30.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AgWBRQgGgEgHgJIAAAQIgUAAIAAirIAVAAIAAA+QAHgJAKgFQAJgFALAAQAXAAAPARQAOAQAAAeQAAAegOAUQgOATgaAAQgOAAgJgHgAgYgOQgLALAAAXQAAASAFALQAIAVAWAAQARAAAIgOQAJgOAAgWQAAgUgJgMQgIgNgRAAQgNAAgLALg");
	this.shape_18.setTransform(-94.7,-30.525);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AgKBWIAAh8IAVAAIAAB8gAgKg9IAAgYIAVAAIAAAYg");
	this.shape_19.setTransform(-104.275,-30.7);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AAdBWIAAhPQAAgNgDgGQgGgKgQAAQgMAAgLAJQgKAJAAAYIAABCIgVAAIAAirIAVAAIAABAQAHgKAGgEQAKgGAPAAQAbAAAKATQAFAKAAASIAABQg");
	this.shape_20.setTransform(-113.525,-30.725);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AAfA/IgfgvIgeAvIgaAAIAshAIgrg9IAcAAIAbAsIAegsIAZABIgqA8IAtBAg");
	this.shape_21.setTransform(-126.3,-28.375);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AgoAyQgQgRAAggQAAgdAQgSQARgUAZABQANgBANAHQAMAGAHAKQAGAJACAOQACAIAAASIhaAAQAAATAJALQAIAMARAAQAQAAAKgLQAFgGACgIIAVAAQgBAGgEAJQgFAIgGAGQgJAKgOACQgIACgIAAQgYAAgQgQgAAjgKQgBgOgFgIQgIgPgUAAQgOAAgKALQgJAKgBAQIBEAAIAAAAg");
	this.shape_22.setTransform(-138.975,-28.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("AgwA4QgKgLgBgQQABgRAKgKQAMgIARgCIAggFQAIgBACgFQACgDAAgFQAAgLgHgFQgJgEgNAAQgQAAgHAIQgEAFgBAKIgUAAQABgXAOgJQAOgJAUAAQAVAAANAIQAOAJABARIAABIQgBADACACQABACAFAAIACAAIAEgBIAAAQIgHACIgHAAQgLAAgFgIQgDgEAAgHQgHAIgMAGQgLAGgPAAQgRAAgMgKgAAOADIgMACIgLACQgMABgFADQgKAGAAAMQAAAJAGAFQAHAGAJAAQAMAAAJgGQASgIAAgUIAAgPIgLADg");
	this.shape_23.setTransform(79.5,-61.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AgeBAIAAh8IAUAAIAAAVQADgGAJgJQAJgJANAAIACAAIAFABIAAAWIgEgBIgEAAQgPAAgIALQgJAKAAANIAABHg");
	this.shape_24.setTransform(69.3,-61.675);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("AgoAxQgQgRAAgeQAAgdAQgUQARgTAZAAQANAAANAHQAMAGAHAKQAGAJACANQACAJAAASIhaAAQAAATAJAMQAIAMARgBQAQABAKgLQAFgHACgJIAVAAQgBAIgEAIQgFAJgGAFQgJAKgOADQgIABgIAAQgYAAgQgRgAAjgKQgBgNgFgJQgIgPgUAAQgOAAgKALQgJAKgBAQIBEAAIAAAAg");
	this.shape_25.setTransform(57.875,-61.45);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#595959").s().p("AgmAwQgPgSAAgbQAAggAQgSQAQgSAYAAQAVAAAOAKQANAKADAZIgVAAQgCgLgGgIQgHgIgPAAQgTAAgJAUQgFANAAASQAAASAIANQAIANAQAAQANAAAIgIQAHgIADgOIAVAAQgEAZgOAMQgOALgWAAQgYAAgOgSg");
	this.shape_26.setTransform(38.775,-61.525);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#595959").s().p("AgKBWIAAh8IAVAAIAAB8gAgKg9IAAgYIAVAAIAAAYg");
	this.shape_27.setTransform(30.025,-63.85);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#595959").s().p("AA+BAIAAhWQABgMgHgFQgGgFgJAAQgMAAgJAIQgJAJAAATIAABIIgVAAIAAhRQAAgMgDgGQgFgJgNAAQgMAAgKAJQgJAJgBAZIAABBIgVAAIAAh8IAVAAIAAASQAIgKAGgEQAKgHANAAQAQAAAIAHQAFAFAEAIQAHgKAJgFQAKgFAMAAQAaAAAIASQAGAKAAARIAABSg");
	this.shape_28.setTransform(17.45,-61.675);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#595959").s().p("AgqAxQgPgRAAgeQAAgeAQgTQAQgTAaAAQAYAAAQAQQARAQAAAgQAAAdgOAUQgPAUgeAAQgaAAgPgSgAgaghQgJAPAAAUQAAAUAJANQAIAOASAAQAUAAAJgQQAHgQAAgTQAAgRgGgLQgJgRgVAAQgSAAgIAOg");
	this.shape_29.setTransform(0.65,-61.475);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#595959").s().p("AAeBAIAAhOQAAgLgEgHQgFgMgPAAQgHAAgFABQgIADgHAIQgFAGgCAHQgBAGAAANIAABAIgVAAIAAh8IAUAAIAAASQAJgLAKgFQAKgFALAAQAaAAAKATQAFAKAAATIAABPg");
	this.shape_30.setTransform(-12.475,-61.675);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#595959").s().p("AgqAxQgPgRAAgeQAAgeAQgTQAQgTAZAAQAZAAARAQQAQAQAAAgQAAAdgPAUQgOAUgeAAQgaAAgPgSgAgbghQgJAPAAAUQAAAUAJANQAJAOASAAQAVAAAHgQQAIgQAAgTQAAgRgFgLQgKgRgVAAQgSAAgJAOg");
	this.shape_31.setTransform(-25.95,-61.475);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#595959").s().p("AgmAwQgPgSAAgbQAAggAQgSQAQgSAYAAQAVAAAOAKQANAKADAZIgVAAQgCgLgGgIQgHgIgPAAQgTAAgJAUQgFANAAASQAAASAIANQAIANAQAAQANAAAIgIQAHgIADgOIAVAAQgEAZgOAMQgOALgWAAQgYAAgOgSg");
	this.shape_32.setTransform(-38.375,-61.525);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#595959").s().p("AgoAxQgQgRAAgeQAAgdAQgUQARgTAZAAQANAAANAHQAMAGAHAKQAGAJACANQACAJAAASIhaAAQAAATAJAMQAIAMARgBQAQABAKgLQAFgHACgJIAVAAQgBAIgEAIQgFAJgGAFQgJAKgOADQgIABgIAAQgYAAgQgRgAAjgKQgBgNgFgJQgIgPgUAAQgOAAgKALQgJAKgBAQIBEAAIAAAAg");
	this.shape_33.setTransform(-51.225,-61.45);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#595959").s().p("AAeBAIAAhOQAAgLgEgHQgFgMgPAAQgHAAgFABQgIADgHAIQgFAGgCAHQgBAGAAANIAABAIgVAAIAAh8IAUAAIAAASQAJgLAKgFQAKgFALAAQAaAAAKATQAFAKAAATIAABPg");
	this.shape_34.setTransform(-71.025,-61.675);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#595959").s().p("AgeBAIAAh8IAUAAIAAAVQADgGAJgJQAJgJANAAIACAAIAFABIAAAWIgEgBIgEAAQgPAAgIALQgJAKAAANIAABHg");
	this.shape_35.setTransform(-81,-61.675);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#595959").s().p("AgoAxQgQgRAAgeQAAgdAQgUQARgTAZAAQANAAANAHQAMAGAHAKQAGAJACANQACAJAAASIhaAAQAAATAJAMQAIAMARgBQAQABAKgLQAFgHACgJIAVAAQgBAIgEAIQgFAJgGAFQgJAKgOADQgIABgIAAQgYAAgQgRgAAjgKQgBgNgFgJQgIgPgUAAQgOAAgKALQgJAKgBAQIBEAAIAAAAg");
	this.shape_36.setTransform(-92.425,-61.45);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#595959").s().p("AgnBHQgQgSAAgdQABgbAOgTQAOgVAZAAQAOABAKAFQAFAEAHAIIAAg/IAUAAIAACsIgTAAIAAgRQgHALgKAGQgKAEgMAAQgVAAgPgRgAgWgMQgKAMAAAXQAAAUAIAOQAJANARAAQAPAAAJgMQAKgNAAgXQAAgYgKgLQgKgMgOAAQgPAAgJANg");
	this.shape_37.setTransform(-106.05,-63.65);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#595959").s().p("AgqAxQgPgRAAgeQAAgeAQgTQAQgTAaAAQAYAAAQAQQARAQAAAgQAAAdgOAUQgPAUgeAAQgaAAgPgSgAgaghQgJAPAAAUQAAAUAJANQAIAOASAAQAUAAAJgQQAHgQAAgTQAAgRgGgLQgJgRgVAAQgSAAgIAOg");
	this.shape_38.setTransform(-119.05,-61.475);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#595959").s().p("AA8BWIAAhlIABgRIAAgaIgxCQIgWAAIgyiQIAAAFIAAATIABATIAABlIgXAAIAAirIAiAAIAwCRIAyiRIAhAAIAACrg");
	this.shape_39.setTransform(-135.475,-63.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-147.5,-75.7,264.8,138.3);


(lib.Tween35 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AiWDzIEJnlIAlAAIkJHlgABRDFQgigiAAgwQAAgwAigiQAighAwAAQAwAAAiAhQAhAiAAAwQAAAwghAiQgiAhgwABQgwgBgighgAByBCQgTAVgBAcQABAcATAUQAVAUAcAAQAcAAAVgUQATgUAAgcQAAgcgTgVQgVgUgcAAQgcAAgVAUgAj0ggQghgiAAgwQAAgvAhgjQAighAwgBQAwABAiAhQAiAjAAAvQAAAwgiAiQgiAggwAAQgwAAgigggAjSiiQgVATABAdQgBAcAVAVQAUATAcABQAdgBAUgTQAUgVgBgcQABgcgUgUQgUgUgdAAQgcAAgUAUg");
	this.shape.setTransform(142.65,28.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AikDvQAEg+AWgtQAWguBBglIA+glQArgYARgRQAcgcAAgjQAAgqgZgZQgagYgpAAQg9AAgXAvQgMAYgCAtIg8AAQABg/AVgnQAnhEBiAAQBRgBAmAtQAlAsAAA2QABA5goAnQgYAYg8AiIgtAZQggASgSAQQgiAdgIAjIECAAIAAA5g");
	this.shape_1.setTransform(93.35,27.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgjA3QAXgEAJgcQAEgPABgNIAAgEIgCgEIgjAAIAAhJIBGAAIAABDQAAAngPAeQgRAegmAHg");
	this.shape_2.setTransform(65.15,52.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AiACqQgjg+AAhpQAAhQAVg6QAnhsBnAAQBbAAApBMQAgA7AABmQAABggdA/QgqBbheAAQhVAAgqhKgAhKiMQgZAyAABfQAABJAQAsQAYBEA6AAQAuAAAbgpQAcgqAAhvQAAhRgUg0QgUg0g6AAQg0AAgYAxg");
	this.shape_3.setTransform(36.675,28.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("Ah/DGQgmguAAhDIA+AAQAEAuANAWQAXAlA+AAQAtAAAdgZQAdgZgBgoQABgygegTQgfgUg0AAIgMAAIgMABIAAg0IAPACIAOAAQAgAAAWgLQAmgTAAgvQAAgjgZgUQgagTghAAQg7AAgXAnQgMAXgCAoIg7AAQgBg1AWglQAlhCBbAAQBIgBAoAhQAoAgAAA+QAAAsgXAbQgQAQgWAKQAlAKAVAdQAVAdAAAqQAABFgtAqQgsAshSgBQhUAAgmgug");
	this.shape_4.setTransform(-1.4,28.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgeBAIAAh8IAUAAIAAAVQADgGAJgJQAKgJAMAAIACAAIAFABIAAAWIgEgBIgEAAQgPAAgIALQgJAKABANIAABHg");
	this.shape_5.setTransform(169.75,-21.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgwA4QgKgLgBgQQABgRAKgKQAMgIARgCIAggFQAIgBACgFQACgDAAgFQAAgLgIgFQgHgEgOAAQgQAAgHAIQgEAFgBAKIgUAAQABgXAOgJQAOgJAUAAQAVAAANAIQAOAJABARIAABIQgBADACACQABACAFAAIADAAIADgBIAAAQIgHACIgHAAQgLAAgFgIQgDgEAAgHQgHAIgMAGQgMAGgOAAQgRAAgMgKgAAOADIgMACIgLACQgMABgFADQgKAGAAAMQAAAJAGAFQAHAGAJAAQAMAAAJgGQASgIAAgUIAAgPIgLADg");
	this.shape_6.setTransform(158.7,-21.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgoAyQgQgRAAgfQAAgdAQgUQARgSAZgBQANABANAGQAMAGAHAKQAGAKACAMQACAJAAASIhaAAQAAATAJALQAIAMARABQAQgBAKgKQAFgHACgIIAVAAQgBAGgEAJQgFAIgGAGQgJAJgOAEQgIACgIAAQgYgBgQgQgAAjgKQgBgOgFgHQgIgQgUAAQgOAAgKAKQgJALgBAQIBEAAIAAAAg");
	this.shape_7.setTransform(145.025,-21.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgnBYIgGgBIAAgTIAIACIAEAAQAGAAADgCIAEgFIAFgKIAFgMIgviBIAYAAIAhBmIAihmIAXAAIgTA3IgTA0QgTAxgGAKQgIAKgTAAg");
	this.shape_8.setTransform(132.5,-19.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AAdBWIAAhPQAAgNgDgGQgGgKgQAAQgMAAgLAJQgKAJAAAYIAABCIgVAAIAAirIAVAAIAABAQAHgKAGgEQAKgGAPAAQAbAAAKATQAFAKAAASIAABQg");
	this.shape_9.setTransform(113.225,-24.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgmAwQgPgSAAgbQAAggAQgSQAQgSAYAAQAVAAAOAKQANAKADAZIgVAAQgCgLgGgIQgHgIgPAAQgTAAgJAUQgFANAAASQAAASAIANQAIANAQAAQANAAAIgIQAHgIADgOIAVAAQgEAZgOAMQgOALgWAAQgYAAgOgSg");
	this.shape_10.setTransform(100.625,-21.775);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgvA4QgMgLAAgQQAAgRAMgKQAKgIASgCIAggFQAIgBADgFQABgDAAgFQAAgLgIgFQgIgEgNAAQgQAAgHAIQgEAFgBAKIgUAAQABgXAOgJQAPgJATAAQAVAAANAIQAOAJAAARIAABIQABADABACQABACAFAAIACAAIAFgBIAAAQIgIACIgHAAQgLAAgFgIQgDgEAAgHQgHAIgMAGQgMAGgOAAQgRAAgLgKgAAPADIgNACIgLACQgMABgFADQgLAGABAMQgBAJAIAFQAGAGAJAAQAMAAAJgGQASgIAAgUIAAgPIgKADg");
	this.shape_11.setTransform(88.15,-21.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgoAyQgQgRAAgfQAAgdAQgUQARgSAZgBQANABANAGQAMAGAHAKQAGAKACAMQACAJAAASIhaAAQAAATAJALQAIAMARABQAQgBAKgKQAFgHACgIIAVAAQgBAGgEAJQgFAIgGAGQgJAJgOAEQgIACgIAAQgYgBgQgQgAAjgKQgBgOgFgHQgIgQgUAAQgOAAgKAKQgJALgBAQIBEAAIAAAAg");
	this.shape_12.setTransform(74.475,-21.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EA5547").s().p("AAeBAIAAhOQAAgLgEgHQgFgMgPAAQgHAAgFABQgIADgHAIQgFAGgCAHQgBAGAAANIAABAIgVAAIAAh8IAUAAIAAASQAJgLAKgFQAKgFALAAQAaAAAKATQAFAKAAATIAABPg");
	this.shape_13.setTransform(54.675,-21.925);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#EA5547").s().p("AgqAxQgPgRAAgeQAAgeAQgTQAQgTAZAAQAZAAARAQQAQAQAAAgQAAAdgPAUQgOAUgeAAQgaAAgPgSgAgbghQgIAPgBAUQABAUAIANQAJAOASAAQAUAAAIgQQAIgQAAgTQAAgRgFgLQgKgRgVAAQgSAAgJAOg");
	this.shape_14.setTransform(41.2,-21.725);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#EA5547").s().p("AgKBWIAAh8IAVAAIAAB8gAgKg9IAAgYIAVAAIAAAYg");
	this.shape_15.setTransform(32.025,-24.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#EA5547").s().p("AgnA2QgMgNAAgSIAUAAQABAKAFAGQAHAKAUAAQALAAAJgFQAKgFAAgLQAAgIgIgEQgEgDgOgDIgQgFQgQgEgIgEQgOgIAAgPQAAgSAOgLQANgLAVAAQAcAAAMARQAJAKAAAMIgUAAQgBgHgFgFQgHgJgSAAQgMABgGAEQgHAEAAAIQAAAIAJAFQAFADAJACIAOADQAWAGAIAEQAMAJAAAQQAAASgMALQgNANgaAAQgcAAgMgNg");
	this.shape_16.setTransform(23.4,-21.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#EA5547").s().p("AgmA2QgNgNgBgSIAVAAQABAKAEAGQAJAKASAAQAMAAAKgFQAJgFAAgLQAAgIgHgEQgFgDgOgDIgQgFQgQgEgIgEQgOgIAAgPQAAgSANgLQANgLAWAAQAcAAANARQAHAKABAMIgVAAQAAgHgEgFQgIgJgRAAQgNABgGAEQgGAEgBAIQAAAIAJAFQAEADAKACIANADQAXAGAJAEQAMAJgBAQQABASgNALQgNANgbAAQgbAAgLgNg");
	this.shape_17.setTransform(11.4,-21.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#EA5547").s().p("AgoAyQgQgRAAgfQAAgdAQgUQARgSAZgBQANABANAGQAMAGAHAKQAGAKACAMQACAJAAASIhaAAQAAATAJALQAIAMARABQAQgBAKgKQAFgHACgIIAVAAQgBAGgEAJQgFAIgGAGQgJAJgOAEQgIACgIAAQgYgBgQgQgAAjgKQgBgOgFgHQgIgQgUAAQgOAAgKAKQgJALgBAQIBEAAIAAAAg");
	this.shape_18.setTransform(-1.375,-21.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#EA5547").s().p("AgmAwQgPgSAAgbQAAggAQgSQAQgSAYAAQAVAAAOAKQANAKADAZIgVAAQgCgLgGgIQgHgIgPAAQgTAAgJAUQgFANAAASQAAASAIANQAIANAQAAQANAAAIgIQAHgIADgOIAVAAQgEAZgOAMQgOALgWAAQgYAAgOgSg");
	this.shape_19.setTransform(-13.825,-21.775);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#EA5547").s().p("AgoAyQgQgRAAgfQAAgdAQgUQARgSAZgBQANABANAGQAMAGAHAKQAGAKACAMQACAJAAASIhaAAQAAATAJALQAIAMARABQAQgBAKgKQAFgHACgIIAVAAQgBAGgEAJQgFAIgGAGQgJAJgOAEQgIACgIAAQgYgBgQgQgAAjgKQgBgOgFgHQgIgQgUAAQgOAAgKAKQgJALgBAQIBEAAIAAAAg");
	this.shape_20.setTransform(-26.675,-21.7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#EA5547").s().p("AgdBAIAAh8IAUAAIAAAVQACgGAIgJQALgJAMAAIACAAIAEABIAAAWIgDgBIgDAAQgQAAgIALQgIAKAAANIAABHg");
	this.shape_21.setTransform(-36.5,-21.925);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AAeBAIAAhOQAAgLgEgHQgFgMgPAAQgHAAgFABQgIADgHAIQgFAGgCAHQgBAGAAANIAABAIgVAAIAAh8IAUAAIAAASQAJgLAKgFQAKgFALAAQAaAAAKATQAFAKAAATIAABPg");
	this.shape_22.setTransform(-54.425,-21.925);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("AgKBWIAAh8IAVAAIAAB8gAgKg9IAAgYIAVAAIAAAYg");
	this.shape_23.setTransform(-63.775,-24.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AgnA2QgMgMAAgTIAUAAQABAKAFAGQAHAKAUAAQALAAAJgFQAKgFAAgLQAAgIgIgEQgEgDgOgDIgQgEQgQgFgIgDQgOgJAAgPQAAgSAOgLQAMgLAWAAQAcAAAMARQAJALgBALIgTAAQgBgHgFgFQgHgIgSAAQgMgBgGAFQgHAEABAIQgBAIAJAFQAEADAKACIAOAEQAXAFAHAEQAMAIAAASQAAAQgNAMQgMANgaAAQgcAAgMgNg");
	this.shape_24.setTransform(167.05,-54.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("AgoAyQgQgRAAggQAAgdAQgSQARgUAZABQANgBANAHQAMAGAHAKQAGAJACAOQACAIAAASIhaAAQAAATAJALQAIAMARAAQAQAAAKgLQAFgGACgIIAVAAQgBAGgEAJQgFAIgGAGQgJAKgOACQgIACgIAAQgYAAgQgQgAAjgKQgBgOgFgIQgIgPgUAAQgOAAgKALQgJAKgBAQIBEAAIAAAAg");
	this.shape_25.setTransform(154.275,-54.85);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#595959").s().p("AgKBWIAAh8IAVAAIAAB8gAgKg9IAAgYIAVAAIAAAYg");
	this.shape_26.setTransform(145.075,-57.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#595959").s().p("AgeBAIAAh8IAUAAIAAAVQADgGAJgJQAKgJAMAAIACAAIAEABIAAAWIgDgBIgEAAQgPAAgIALQgJAKABANIAABHg");
	this.shape_27.setTransform(139.15,-55.075);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#595959").s().p("AgGBKQgFgIAAgMIAAhSIgRAAIAAgRIARAAIAAgjIAUAAIAAAjIAUAAIAAARIgUAAIAABRQAAAGAFADIAIABIADAAIAEgBIAAARIgHACIgJAAQgOAAgFgHg");
	this.shape_28.setTransform(131.025,-56.575);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#595959").s().p("AAeBAIAAhOQAAgLgEgHQgFgMgPAAQgHAAgFABQgIADgHAIQgFAGgCAHQgBAGAAANIAABAIgVAAIAAh8IAUAAIAAASQAJgLAKgFQAKgFALAAQAaAAAKATQAFAKAAATIAABPg");
	this.shape_29.setTransform(121.225,-55.075);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#595959").s().p("AgsAuQgFgJAAgQIAAhVIAWAAIAABTQAAAJADAGQAFAMAPAAQAVAAAHgUQAFgKAAgSIAAg+IAVAAIAAB9IgUAAIAAgSQgEAGgGAFQgMAKgQAAQgaABgKgTg");
	this.shape_30.setTransform(107.725,-54.75);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#595959").s().p("AgqAxQgPgRAAgeQAAgeAQgTQAQgTAZAAQAZAAARAQQAQAQAAAgQAAAdgOAUQgQAUgdAAQgaAAgPgSgAgaghQgKAPABAUQgBAUAKANQAIAOASAAQAVAAAHgQQAIgQAAgTQAAgRgGgLQgIgRgWAAQgSAAgIAOg");
	this.shape_31.setTransform(94.45,-54.875);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#595959").s().p("AgmAwQgPgSAAgbQAAggAQgSQAQgSAYAAQAVAAAOAKQANAKADAZIgVAAQgCgLgGgIQgHgIgPAAQgTAAgJAUQgFANAAASQAAASAIANQAIANAQAAQANAAAIgIQAHgIADgOIAVAAQgEAZgOAMQgOALgWAAQgYAAgOgSg");
	this.shape_32.setTransform(82.025,-54.925);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#595959").s().p("AgLBXIAAhrIgSAAIAAgRIASAAIAAgTQAAgNAEgHQAHgKAVAAIAEAAIAFAAIAAATIgFAAIgDAAQgJAAgDAFQgCAFAAAUIAWAAIAAARIgWAAIAABrg");
	this.shape_33.setTransform(65.95,-57.375);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#595959").s().p("AgqAxQgPgRAAgeQAAgeAQgTQAQgTAZAAQAZAAARAQQAQAQAAAgQAAAdgOAUQgPAUgeAAQgaAAgPgSgAgbghQgJAPABAUQgBAUAJANQAJAOASAAQAVAAAHgQQAIgQAAgTQAAgRgGgLQgIgRgWAAQgSAAgJAOg");
	this.shape_34.setTransform(55.85,-54.875);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#595959").s().p("AgoAyQgQgRAAggQAAgdAQgSQARgUAZABQANgBANAHQAMAGAHAKQAGAJACAOQACAIAAASIhaAAQAAATAJALQAIAMARAAQAQAAAKgLQAFgGACgIIAVAAQgBAGgEAJQgFAIgGAGQgJAKgOACQgIACgIAAQgYAAgQgQgAAjgKQgBgOgFgIQgIgPgUAAQgOAAgKALQgJAKgBAQIBEAAIAAAAg");
	this.shape_35.setTransform(35.925,-54.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#595959").s().p("AgjBRQgOgJgBgTIAWAAQABAIAFAFQAHAHAPAAQAXAAAIgRQAEgKgBgaQgGAJgJAFQgIAFgOAAQgUAAgPgPQgQgOAAghQAAgfAQgSQAPgRAVAAQAPAAAKAHQAGAEAGAIIAAgQIAUAAIAABxQAAAYgHAOQgNAZgkAAQgUAAgOgJgAgcgyQgEALAAASQAAAVAJALQAIALAOAAQAWAAAJgVQAGgLgBgPQAAgXgJgMQgJgLgQAAQgVAAgIAVg");
	this.shape_36.setTransform(22.3,-52.375);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#595959").s().p("AgvA4QgLgLAAgQQAAgRALgKQAKgIASgCIAhgFQAHgBADgFQABgDAAgFQAAgLgIgFQgIgEgMAAQgRAAgHAIQgEAFgBAKIgUAAQABgXAOgJQAPgJATAAQAVAAAOAIQANAJAAARIAABIQAAADACACQABACAEAAIADAAIAFgBIAAAQIgIACIgHAAQgLAAgFgIQgCgEgCgHQgGAIgMAGQgLAGgPAAQgRAAgLgKgAAPADIgMACIgNACQgLABgGADQgKAGAAAMQAAAJAIAFQAGAGAJAAQALAAAJgGQASgIAAgUIAAgPIgJADg");
	this.shape_37.setTransform(9.7,-54.875);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#595959").s().p("AgGBKQgFgIAAgMIAAhSIgRAAIAAgRIARAAIAAgjIAUAAIAAAjIAUAAIAAARIgUAAIAABRQAAAGAFADIAIABIADAAIAEgBIAAARIgHACIgJAAQgOAAgFgHg");
	this.shape_38.setTransform(-0.675,-56.575);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#595959").s().p("AAeBAIAAhOQAAgLgEgHQgFgMgPAAQgHAAgFABQgIADgHAIQgFAGgCAHQgBAGAAANIAABAIgVAAIAAh8IAUAAIAAASQAJgLAKgFQAKgFALAAQAaAAAKATQAFAKAAATIAABPg");
	this.shape_39.setTransform(-10.475,-55.075);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#595959").s().p("AgoAyQgQgRAAggQAAgdAQgSQARgUAZABQANgBANAHQAMAGAHAKQAGAJACAOQACAIAAASIhaAAQAAATAJALQAIAMARAAQAQAAAKgLQAFgGACgIIAVAAQgBAGgEAJQgFAIgGAGQgJAKgOACQgIACgIAAQgYAAgQgQgAAjgKQgBgOgFgIQgIgPgUAAQgOAAgKALQgJAKgBAQIBEAAIAAAAg");
	this.shape_40.setTransform(-23.925,-54.85);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#595959").s().p("AgmAwQgPgSAAgbQAAggAQgSQAQgSAYAAQAVAAAOAKQANAKADAZIgVAAQgCgLgGgIQgHgIgPAAQgTAAgJAUQgFANAAASQAAASAIANQAIANAQAAQANAAAIgIQAHgIADgOIAVAAQgEAZgOAMQgOALgWAAQgYAAgOgSg");
	this.shape_41.setTransform(-36.375,-54.925);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#595959").s().p("AgdBAIAAh8IATAAIAAAVQADgGAIgJQAKgJANAAIACAAIAFABIAAAWIgEgBIgDAAQgQAAgIALQgJAKAAANIAABHg");
	this.shape_42.setTransform(-45.75,-55.075);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#595959").s().p("AgoAyQgQgRAAggQAAgdAQgSQARgUAZABQANgBANAHQAMAGAHAKQAGAJACAOQACAIAAASIhaAAQAAATAJALQAIAMARAAQAQAAAKgLQAFgGACgIIAVAAQgBAGgEAJQgFAIgGAGQgJAKgOACQgIACgIAAQgYAAgQgQgAAjgKQgBgOgFgIQgIgPgUAAQgOAAgKALQgJAKgBAQIBEAAIAAAAg");
	this.shape_43.setTransform(-57.175,-54.85);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#595959").s().p("Ag3BZIAAiuIAWAAIAAARQAFgJAIgEQALgHANAAQAWAAAOAQQAPAQABAfQgBAogVARQgNALgTAAQgNAAgKgGQgFgDgHgJIAABAgAgegwQgEAMAAASQAAAOAEAKQAJATAVAAQAOAAAKgMQAKgNAAgXQAAgPgEgLQgJgVgVAAQgVAAgJAWg");
	this.shape_44.setTransform(-70.1,-52.575);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#595959").s().p("AgoAyQgQgRAAggQAAgdAQgSQARgUAZABQANgBANAHQAMAGAHAKQAGAJACAOQACAIAAASIhaAAQAAATAJALQAIAMARAAQAQAAAKgLQAFgGACgIIAVAAQgBAGgEAJQgFAIgGAGQgJAKgOACQgIACgIAAQgYAAgQgQgAAjgKQgBgOgFgIQgIgPgUAAQgOAAgKALQgJAKgBAQIBEAAIAAAAg");
	this.shape_45.setTransform(-90.425,-54.85);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#595959").s().p("AgjBRQgOgJgBgTIAVAAQACAIAFAFQAGAHAQAAQAXAAAIgRQAEgKgBgaQgGAJgIAFQgJAFgOAAQgUAAgQgPQgPgOAAghQAAgfAPgSQAQgRAVAAQAPAAAKAHQAGAEAGAIIAAgQIAUAAIAABxQAAAYgHAOQgNAZgkAAQgUAAgOgJgAgcgyQgEALAAASQAAAVAJALQAIALAOAAQAWAAAJgVQAGgLgBgPQAAgXgJgMQgJgLgPAAQgWAAgIAVg");
	this.shape_46.setTransform(-104.05,-52.375);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#595959").s().p("AgwA4QgLgLABgQQgBgRALgKQALgIASgCIAhgFQAHgBACgFQACgDAAgFQAAgLgIgFQgIgEgMAAQgRAAgHAIQgEAFgBAKIgUAAQABgXAOgJQAPgJATAAQAVAAAOAIQANAJAAARIAABIQAAADACACQABACAEAAIAEAAIADgBIAAAQIgHACIgHAAQgLAAgFgIQgDgEgBgHQgGAIgMAGQgLAGgPAAQgRAAgMgKgAAOADIgLACIgNACQgLABgGADQgJAGgBAMQAAAJAHAFQAHAGAJAAQALAAAJgGQASgIAAgUIAAgPIgKADg");
	this.shape_47.setTransform(-116.65,-54.875);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#595959").s().p("AgdBAIAAh8IAUAAIAAAVQACgGAIgJQAKgJANAAIACAAIAEABIAAAWIgDgBIgDAAQgQAAgIALQgIAKgBANIAABHg");
	this.shape_48.setTransform(-126.85,-55.075);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#595959").s().p("AgoAyQgQgRAAggQAAgdAQgSQARgUAZABQANgBANAHQAMAGAHAKQAGAJACAOQACAIAAASIhaAAQAAATAJALQAIAMARAAQAQAAAKgLQAFgGACgIIAVAAQgBAGgEAJQgFAIgGAGQgJAKgOACQgIACgIAAQgYAAgQgQgAAjgKQgBgOgFgIQgIgPgUAAQgOAAgKALQgJAKgBAQIBEAAIAAAAg");
	this.shape_49.setTransform(-138.275,-54.85);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#595959").s().p("AgLA/Iguh9IAZAAIAgBlIAjhlIAXAAIgvB9g");
	this.shape_50.setTransform(-150.85,-54.925);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#595959").s().p("AA0BWIgSg0IhDAAIgTA0IgYAAIBBirIAaAAIA+CrgAAbAPIgbhKIgaBKIA1AAg");
	this.shape_51.setTransform(-164.75,-57.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-69.1,350.1,138.3);


(lib.Tween32 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Artwork2aiAssets();
	this.instance.setTransform(8.45,144.7,0.2727,0.2727,90);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#DA6B56").ss(1,1,1).p("AAAXUMAAAgun");
	this.shape.setTransform(0,-4.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.4,-154.7,16.9,308.4);


(lib.Tween31 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Artwork2aiAssets();
	this.instance.setTransform(4.5,8.45,0.2727,0.2727,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.5,-8.4,9,16.9);


(lib.Tween25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("Ag6B6IAAjuIAnAAIAAApQAEgMASgRQASgSAZAAIADAAIAJABIAAArIgGgBIgHAAQgeAAgPAUQgRATAAAaIAACIg");
	this.shape.setTransform(191.1,25.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AhbBrQgVgVAAgeQAAghAUgTQAVgRAigEIA/gIQAOgCAFgKQADgFAAgKQAAgVgPgJQgPgKgaAAQgfAAgOARQgHAKgCASIgmAAQABgsAcgRQAcgSAkAAQApAAAbAQQAaAQAAAiIAACKQAAAGACAEQADADAIAAIAGAAIAHgBIAAAeIgOADIgNABQgVAAgKgPQgFgIgCgOQgMAQgXAMQgWAMgcAAQghAAgVgUgAAbAFIgWAEIgYADQgWADgKAHQgTAKAAAXQAAARAMAKQANALASAAQAVAAATgKQAhgRAAglIAAgfQgHAEgMADg");
	this.shape_1.setTransform(169.925,26.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("AhNBeQgfggAAg7QAAg5AfgkQAfgkAyAAQAZAAAYAMQAYAMAMATQAMASAEAYQAEARAAAjIiuAAQABAlAQAWQAQAWAhAAQAfAAATgVQALgMAEgQIAnAAQgBANgJARQgJAQgLAKQgSASgbAGQgOAEgSAAQgsAAgfghgABDgUQgCgagJgQQgQgdgnAAQgaAAgTAUQgTAUgBAfICDAAIAAAAg");
	this.shape_2.setTransform(143.775,26.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AgVCkIAAiEIh9jDIA0AAIBeCdIBeidIA1AAIh9DDIAACEg");
	this.shape_3.setTransform(120.575,21.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AA4ClIAAiXQAAgagGgMQgLgTgfgBQgYAAgUARQgUASAAAvIAAB/IgpAAIAAlJIApAAIAAB7QAOgTALgHQAUgNAcAAQA0AAATAlQAKAUAAAiIAACag");
	this.shape_4.setTransform(80.075,21.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AhKBcQgcgiAAg0QAAg+AfgjQAfgjAuAAQApAAAZAUQAaATAFAxIgnAAQgEgXgNgOQgNgPgcAAQglAAgRAmQgLAYAAAjQAAAkAQAYQAPAZAgAAQAZAAAOgPQAPgPAGgbIAnAAQgHAwgbAWQgbAWgqAAQguAAgcgjg");
	this.shape_5.setTransform(56.025,26.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AhbBrQgVgVAAgeQAAghAUgTQAVgRAigEIA/gIQAOgCAFgKQADgFAAgKQAAgVgPgJQgPgKgaAAQgfAAgOARQgHAKgCASIgmAAQABgsAcgRQAcgSAkAAQApAAAbAQQAaAQAAAiIAACKQAAAGACAEQADADAIAAIAGAAIAHgBIAAAeIgOADIgNABQgVAAgKgPQgFgIgCgOQgMAQgXAMQgWAMgcAAQghAAgVgUgAAbAFIgWAEIgYADQgWADgKAHQgTAKAAAXQAAARAMAKQANALASAAQAVAAATgKQAhgRAAglIAAgfQgHAEgMADg");
	this.shape_6.setTransform(32.175,26.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("Ah4CkIAAlHIDuAAIAAAoIjDAAIAABkIC0AAIAAAlIi0AAIAABwIDGAAIAAAmg");
	this.shape_7.setTransform(4.45,21.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AAcA9IAAhKQAAgLgDgHQgFgLgPAAQgGAAgEABQgJADgGAHQgFAGgBAHQgCAGAAAMIAAA9IgUAAIAAh3IATAAIAAARQAJgKAJgFQAKgEAKAAQAaAAAJASQAFAJAAASIAABMg");
	this.shape_8.setTransform(187.875,-36.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AgoAvQgOgRAAgcQAAgdAPgSQAPgRAZAAQAXAAAPAOQARAQgBAeQABAcgOATQgOASgdABQgZAAgOgRgAgagfQgIAOAAATQAAATAIAMQAJANARABQAUgBAHgPQAIgPAAgSQgBgQgFgLQgIgQgVAAQgRAAgJAOg");
	this.shape_9.setTransform(175,-36.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgJBSIAAh2IATAAIAAB2gAgJg6IAAgXIATAAIAAAXg");
	this.shape_10.setTransform(166.25,-39.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AglA0QgLgMgBgSIATAAQABAKAFAFQAHAKATAAQALAAAIgFQAJgFAAgKQAAgIgHgEQgFgCgNgEIgPgEQgPgDgHgEQgOgIAAgPQAAgRANgKQAMgLAVAAQAaAAANAQQAHAKAAAMIgTAAQgBgHgEgFQgHgIgRAAQgMAAgGAEQgFAEAAAHQAAAIAIAFQAEADAJACIANADQAVAFAIAEQAMAIAAARQAAAQgMALQgMAMgZAAQgbAAgLgMg");
	this.shape_11.setTransform(158.05,-36.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AglA0QgMgMAAgSIATAAQABAKAFAFQAHAKATAAQAKAAAKgFQAIgFAAgKQAAgIgHgEQgEgCgOgEIgPgEQgPgDgHgEQgOgIAAgPQAAgRANgKQAMgLAVAAQAbAAAMAQQAHAKAAAMIgTAAQAAgHgFgFQgHgIgRAAQgLAAgHAEQgFAEgBAHQABAIAHAFQAFADAJACIAMADQAXAFAHAEQAMAIAAARQAAAQgMALQgMAMgaAAQgaAAgLgMg");
	this.shape_12.setTransform(146.6,-36.775);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AgmAvQgPgQAAgdQAAgcAPgSQAQgSAYAAQANAAAMAGQALAGAHAJQAGAJACAMQABAJAAARIhWAAQABASAIALQAIALAQAAQAPAAAKgKQAFgGACgIIAUAAQgBAGgEAIQgFAIgFAGQgJAJgOADQgHABgIAAQgWAAgQgQgAAigJQgCgNgEgIQgIgPgTAAQgNAAgJAKQgKAKAAAQIBBAAIAAAAg");
	this.shape_13.setTransform(134.375,-36.775);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgkAuQgOgRAAgaQAAgeAPgSQAPgRAXAAQAUAAANAJQANAKACAYIgTAAQgCgLgGgHQgHgHgOAAQgSAAgIASQgGANAAAQQAAASAIANQAIAMAPAAQAMAAAIgIQAHgHADgOIATAAQgDAYgNALQgOALgVAAQgWAAgOgRg");
	this.shape_14.setTransform(122.475,-36.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgmAvQgPgQAAgdQAAgcAPgSQAQgSAYAAQANAAAMAGQALAGAHAJQAGAJACAMQABAJAAARIhWAAQABASAIALQAIALAQAAQAPAAAKgKQAFgGACgIIAUAAQgBAGgEAIQgFAIgFAGQgJAJgOADQgHABgIAAQgWAAgQgQgAAigJQgCgNgEgIQgIgPgTAAQgNAAgJAKQgKAKAAAQIBBAAIAAAAg");
	this.shape_15.setTransform(110.225,-36.775);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AAoBSIgCgFIgBgNIgCgcQAAgQgLgFQgGgDgNAAIgxAAIAABGIgWAAIAAijIBKAAQASAAAMAFQAXALAAAcQAAAPgGAJQgGAKgLAFQAKADAEAHQAFAGABAOIABAXIABANQACAIAFADIAAADgAgsgGIAxAAQAPAAAKgGQAIgGABgRQAAgRgNgHQgHgDgLAAIg0AAg");
	this.shape_16.setTransform(96.2,-39.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AAcA9IAAhKQAAgLgDgHQgFgLgPAAQgGAAgEABQgJADgGAHQgFAGgBAHQgCAGAAAMIAAA9IgUAAIAAh3IATAAIAAARQAJgKAJgFQAKgEAKAAQAaAAAJASQAFAJAAASIAABMg");
	this.shape_17.setTransform(74.825,-36.975);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AgJBSIAAh2IATAAIAAB2gAgJg6IAAgXIATAAIAAAXg");
	this.shape_18.setTransform(65.9,-39.075);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AglA0QgMgMAAgSIATAAQABAKAEAFQAIAKASAAQAMAAAIgFQAJgFAAgKQAAgIgHgEQgEgCgNgEIgPgEQgQgDgIgEQgNgIAAgPQAAgRAMgKQANgLAVAAQAaAAAMAQQAIAKAAAMIgTAAQAAgHgFgFQgHgIgQAAQgNAAgFAEQgHAEAAAHQAAAIAIAFQAFADAJACIANADQAWAFAHAEQAMAIAAARQAAAQgNALQgMAMgZAAQgaAAgLgMg");
	this.shape_19.setTransform(51.35,-36.775);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AgmAvQgPgQAAgdQAAgcAPgSQAQgSAYAAQANAAAMAGQALAGAHAJQAGAJACAMQABAJAAARIhWAAQABASAIALQAIALAQAAQAPAAAKgKQAFgGACgIIAUAAQgBAGgEAIQgFAIgFAGQgJAJgOADQgHABgIAAQgWAAgQgQgAAigJQgCgNgEgIQgIgPgTAAQgNAAgJAKQgKAKAAAQIBBAAIAAAAg");
	this.shape_20.setTransform(39.125,-36.775);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AgJBSIAAh2IATAAIAAB2gAgJg6IAAgXIATAAIAAAXg");
	this.shape_21.setTransform(30.35,-39.075);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AgcA9IAAh3IATAAIAAAVQADgGAHgIQAKgJALAAIADAAIAEAAIAAAWIgDgBIgEAAQgPAAgHAKQgIAKAAAMIAABEg");
	this.shape_22.setTransform(24.7,-36.975);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("AgGBGQgEgHAAgLIAAhPIgRAAIAAgQIARAAIAAgiIATAAIAAAiIATAAIAAAQIgTAAIAABNQgBAHAFABQACACAFAAIAEAAIAEgBIAAAQIgIACIgIAAQgNABgFgIg");
	this.shape_23.setTransform(16.95,-38.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AAcA9IAAhKQAAgLgDgHQgFgLgPAAQgGAAgEABQgJADgGAHQgFAGgBAHQgCAGAAAMIAAA9IgUAAIAAh3IATAAIAAARQAJgKAJgFQAKgEAKAAQAaAAAJASQAFAJAAASIAABMg");
	this.shape_24.setTransform(7.575,-36.975);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("AgqAtQgEgJAAgQIAAhQIAUAAIAABOQAAAJADAGQAFALAPAAQATAAAHgTQAEgKAAgRIAAg6IAUAAIAAB2IgTAAIABgRQgEAGgGAGQgLAIgPABQgZAAgKgRg");
	this.shape_25.setTransform(-5.325,-36.7);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#595959").s().p("AgoAvQgPgRAAgcQAAgdAQgSQAPgRAZAAQAWAAARAOQAQAQAAAeQAAAcgPATQgOASgcABQgYAAgPgRgAgZgfQgIAOAAATQAAATAIAMQAIANARABQATgBAIgPQAIgPgBgSQABgQgGgLQgIgQgVAAQgRAAgIAOg");
	this.shape_26.setTransform(-18,-36.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#595959").s().p("AguBFQgZgXAAgvQAAgkATgXQAVgaAjAAQAfABAQAQQARAQACAVIgVAAQgEgQgLgJQgLgKgTAAQgXABgOAQQgPASAAAiQAAAdANASQAOASAZAAQAYAAANgTQAGgKADgRIAWAAQgDAbgQARQgUAWgggBQgbAAgUgRg");
	this.shape_27.setTransform(-32.5,-39.05);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#595959").s().p("AgKBTIAAhmIgSAAIAAgQIASAAIAAgTQAAgMADgGQAHgKAUAAIAEAAIAEAAIAAASIgEAAIgDAAQgJAAgCAFQgCAFAAATIAUAAIAAAQIgUAAIAABmg");
	this.shape_28.setTransform(-50.25,-39.175);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#595959").s().p("AgoAvQgOgRAAgcQAAgdAPgSQAPgRAYAAQAYAAAPAOQARAQgBAeQABAcgOATQgPASgcABQgZAAgOgRgAgagfQgIAOAAATQAAATAIAMQAJANARABQAUgBAHgPQAIgPAAgSQgBgQgFgLQgIgQgVAAQgRAAgJAOg");
	this.shape_29.setTransform(-59.9,-36.8);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#595959").s().p("AglA0QgLgMgBgSIATAAQABAKAEAFQAIAKASAAQALAAAKgFQAIgFAAgKQAAgIgHgEQgEgCgNgEIgQgEQgPgDgIgEQgNgIAAgPQAAgRAMgKQANgLAVAAQAbAAALAQQAIAKAAAMIgTAAQgBgHgEgFQgHgIgQAAQgNAAgFAEQgHAEAAAHQABAIAHAFQAFADAJACIAMADQAWAFAIAEQAMAIAAARQAAAQgNALQgMAMgZAAQgaAAgLgMg");
	this.shape_30.setTransform(-78.15,-36.775);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#595959").s().p("AgmAvQgPgQAAgdQAAgcAPgSQAQgSAYAAQANAAAMAGQALAGAHAJQAGAJACAMQABAJAAARIhWAAQABASAIALQAIALAQAAQAPAAAKgKQAFgGACgIIAUAAQgBAGgEAIQgFAIgFAGQgJAJgOADQgHABgIAAQgWAAgQgQgAAigJQgCgNgEgIQgIgPgTAAQgNAAgJAKQgKAKAAAQIBBAAIAAAAg");
	this.shape_31.setTransform(-90.375,-36.775);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#595959").s().p("AghBOQgNgJgCgSIAVAAQABAIAFAEQAGAHAPAAQAWAAAHgRQAEgJAAgZQgGAJgJAFQgIAEgNAAQgTAAgPgOQgOgNAAgfQAAgeAOgRQAPgRAVAAQANAAAKAHQAGAEAGAHIAAgPIASAAIAABsQAAAXgGANQgNAYgiAAQgTAAgNgIgAgbgvQgEAKAAARQAAAUAIAKQAJALANAAQAVAAAJgUQAFgKAAgPQAAgWgJgLQgKgKgOAAQgUAAgIAUg");
	this.shape_32.setTransform(-103.375,-34.425);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#595959").s().p("AgtA1QgLgKAAgPQAAgRALgJQAKgIARgCIAfgEQAHgBACgFQACgDAAgFQAAgKgHgFQgIgEgMAAQgQAAgHAIQgDAFgCAJIgSAAQAAgWAOgJQAOgIASAAQAUAAANAIQANAIAAARIAABEQAAADACACQABACAEAAIADgBIAEAAIAAAPIgHABIgHABQgLAAgEgIQgDgDgBgIQgGAIgLAGQgLAGgOAAQgQAAgLgKgAAOACIgMADIgLABQgLACgFADQgKAFAAALQAAAJAHAFQAGAFAJAAQALAAAIgFQARgIAAgSIAAgQQgDACgGABg");
	this.shape_33.setTransform(-115.425,-36.775);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#595959").s().p("AgFBGQgGgHAAgLIAAhPIgQAAIAAgQIAQAAIAAgiIATAAIAAAiIAUAAIAAAQIgUAAIAABNQABAHAEABQACACAGAAIADAAIAEgBIAAAQIgHACIgIAAQgNABgFgIg");
	this.shape_34.setTransform(-125.3,-38.4);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#595959").s().p("AAcA9IAAhKQAAgLgDgHQgFgLgPAAQgGAAgEABQgJADgGAHQgFAGgBAHQgCAGAAAMIAAA9IgUAAIAAh3IATAAIAAARQAJgKAJgFQAKgEAKAAQAaAAAJASQAFAJAAASIAABMg");
	this.shape_35.setTransform(-134.675,-36.975);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#595959").s().p("AgmAvQgPgQAAgdQAAgcAPgSQAQgSAYAAQANAAAMAGQALAGAHAJQAGAJACAMQABAJAAARIhWAAQABASAIALQAIALAQAAQAPAAAKgKQAFgGACgIIAUAAQgBAGgEAIQgFAIgFAGQgJAJgOADQgHABgIAAQgWAAgQgQgAAigJQgCgNgEgIQgIgPgTAAQgNAAgJAKQgKAKAAAQIBBAAIAAAAg");
	this.shape_36.setTransform(-147.525,-36.775);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#595959").s().p("AgkAuQgOgRAAgaQAAgeAPgSQAPgRAXAAQAUAAANAJQANAKACAYIgTAAQgCgLgGgHQgHgHgOAAQgSAAgIASQgGANAAAQQAAASAIANQAIAMAPAAQAMAAAIgIQAHgHADgOIATAAQgDAYgNALQgOALgVAAQgWAAgOgRg");
	this.shape_37.setTransform(-159.425,-36.825);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#595959").s().p("AgcA9IAAh3IATAAIAAAVQADgGAHgIQAKgJALAAIADAAIAEAAIAAAWIgDgBIgEAAQgPAAgHAKQgIAKAAAMIAABEg");
	this.shape_38.setTransform(-168.35,-36.975);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#595959").s().p("AgmAvQgPgQAAgdQAAgcAPgSQAQgSAYAAQANAAAMAGQALAGAHAJQAGAJACAMQABAJAAARIhWAAQABASAIALQAIALAQAAQAPAAAKgKQAFgGACgIIAUAAQgBAGgEAIQgFAIgFAGQgJAJgOADQgHABgIAAQgWAAgQgQgAAigJQgCgNgEgIQgIgPgTAAQgNAAgJAKQgKAKAAAQIBBAAIAAAAg");
	this.shape_39.setTransform(-179.275,-36.775);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#595959").s().p("Ag8BSIAAijIBJAAQAVAAAOAMQANANAAAWQAAATgMAPQgMANgYAAIgzAAIAABFgAgmgFIArAAQAPAAAKgGQAIgHABgQQAAgSgOgGQgHgEgNAAIgrAAg");
	this.shape_40.setTransform(-192.7,-39.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-202.7,-50.5,405.5,101.1);


(lib.Tween9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape.setTransform(159.875,19.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AAlBQIAAhiQAAgOgEgJQgHgOgTAAQgIAAgGABQgLAEgIAJQgHAIgBAIQgDAJAAAPIAABRIgaAAIAAicIAZAAIAAAXQALgOANgGQAMgGAOAAQAiAAAMAXQAGANAAAYIAABjg");
	this.shape_1.setTransform(144.025,19.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_2.setTransform(127.175,19.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_3.setTransform(115.675,16.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape_4.setTransform(104.925,19.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape_5.setTransform(89.925,19.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgyA+QgUgVAAgnQAAglAUgXQAUgYAgAAQARAAAQAIQAPAIAIAMQAIAMADAQQACALAAAWIhxAAQABAZAKAOQALAPAVAAQAUgBAMgOQAHgHADgLIAaAAQgBAJgGAKQgGALgHAHQgMAMgRADQgKADgLAAQgdAAgUgVgAAsgMQgCgSgGgKQgKgTgZAAQgRAAgNAOQgMAMAAAVIBVAAIAAAAg");
	this.shape_6.setTransform(73.925,19.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgwA9QgSgXAAghQAAgpAUgXQAUgXAeAAQAbAAAQANQARANADAfIgZAAQgDgOgIgJQgIgLgTAAQgYAAgLAZQgHAQAAAXQAAAXAKAQQAKARAUAAQARgBAJgJQAKgLAEgRIAZAAQgEAfgSAPQgRAOgcAAQgdAAgTgWg");
	this.shape_7.setTransform(58.325,19.85);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgyA+QgUgVAAgnQAAglAUgXQAUgYAgAAQARAAAQAIQAPAIAIAMQAIAMADAQQACALAAAWIhxAAQABAZAKAOQALAPAVAAQAUgBAMgOQAHgHADgLIAaAAQgBAJgGAKQgGALgHAHQgMAMgRADQgKADgLAAQgdAAgUgVgAAsgMQgCgSgGgKQgKgTgZAAQgRAAgNAOQgMAMAAAVIBVAAIAAAAg");
	this.shape_8.setTransform(42.275,19.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AA0BsIgCgHIgCgSIgCgkQgBgUgOgIQgIgEgRAAIhAAAIAABdIgdAAIAAjWIBhAAQAYgBAQAIQAeAOAAAkQAAAUgIAMQgIAMgPAHQANAFAGAIQAHAJAAATIABAcQABAMABAHQADAKAHACIAAAGgAg6gIIBBAAQAUAAALgIQAMgJAAgVQAAgXgQgIQgJgFgOABIhFAAg");
	this.shape_9.setTransform(23.875,16.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgMBsIAAjWIAZAAIAADWg");
	this.shape_10.setTransform(0.825,16.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("Ag7BGQgOgNAAgVQAAgVANgNQAOgKAWgDIApgGQAJgBADgGQACgEAAgGQAAgOgJgGQgKgGgRAAQgUAAgJALQgFAHgBAMIgZAAQABgdASgMQASgLAYAAQAaAAASAKQARALAAAWIAABaQAAAEABACQACACAGABIADAAIAFgBIAAATIgJACIgJABQgOAAgGgKQgDgFgBgKQgIALgPAIQgPAIgSAAQgWAAgNgNgAASADIgPADIgPACQgOACgHAEQgNAHAAAPQAAALAJAHQAIAGALABQAOgBAMgGQAWgLAAgYIAAgUQgEACgIACg");
	this.shape_11.setTransform(-10.525,19.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgcBmQgHgGgJgKIAAAUIgYAAIAAjXIAaAAIAABNQAIgKAMgGQAMgHANABQAeAAASATQASAVAAAmQAAAlgSAZQgSAYggAAQgRABgMgJgAgegRQgOANAAAeQAAAWAGAOQAKAZAcAAQAVAAALgRQAKgRAAgbQAAgZgKgQQgLgQgVAAQgRAAgNAOg");
	this.shape_12.setTransform(-27.175,17.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_13.setTransform(-44.325,19.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgMBsIAAjWIAZAAIAADWg");
	this.shape_14.setTransform(-55.775,16.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AhDBZQgdgfAAg3QAAg1AdggQAbgeArAAQAeAAAWAMQAgARAGAqIgdAAQgEgYgRgLQgQgKgZAAQgcAAgUAWQgUAWAAAsQAAAmAQAYQARAYAkAAQAdAAASgQQAUgRAAgmIhEAAIAAgXIBfAAIAAByIgTAAIgHgcQgPAQgLAHQgTAKgcAAQgmAAgbgYg");
	this.shape_15.setTransform(-71.25,16.925);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AgOBtIAAiGIgWAAIAAgVIAWAAIAAgZQAAgQAFgIQAJgNAaAAIAFAAIAGABIAAAYIgGgBIgDAAQgNAAgCAGQgCAHAAAZIAaAAIAAAVIgaAAIAACGg");
	this.shape_16.setTransform(163.175,-22.375);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_17.setTransform(150.525,-19.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AAlBQIAAhiQAAgOgEgJQgHgOgTAAQgIAAgGABQgLAEgIAJQgHAIgBAIQgDAJAAAPIAABRIgaAAIAAicIAZAAIAAAXQALgOANgGQAMgGAOAAQAiAAAMAXQAGANAAAYIAABjg");
	this.shape_18.setTransform(125.775,-19.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_19.setTransform(108.925,-19.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape_20.setTransform(93.325,-19.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_21.setTransform(82.425,-22.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AglBQIAAicIAZAAIAAAbQADgHALgMQAMgLAQAAIACAAIAGABIAAAbIgEAAIgFAAQgTAAgKANQgLAMAAARIAABZg");
	this.shape_22.setTransform(75.025,-19.475);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("Ag7BGQgOgNAAgVQAAgVANgNQAOgKAWgDIApgGQAJgBADgGQACgEAAgGQAAgOgJgGQgKgGgRAAQgUAAgJALQgFAHgBAMIgZAAQABgdASgMQASgLAYAAQAaAAASAKQARALAAAWIAABaQAAAEABACQACACAGABIADAAIAFgBIAAATIgJACIgJABQgOAAgGgKQgDgFgBgKQgIALgPAIQgPAIgSAAQgWAAgNgNgAASADIgPADIgPACQgOACgHAEQgNAHAAAPQAAALAJAHQAIAGALABQAOgBAMgGQAWgLAAgYIAAgUQgEACgIACg");
	this.shape_23.setTransform(61.175,-19.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AhEBvIAAjZIAaAAIAAAUQAIgKAJgGQANgJARAAQAbABATAUQASAUAAAmQAAAygaAWQgRAOgXABQgRAAgMgJQgHgEgJgLIAABQgAglg8QgGAPAAAWQAAASAGAMQAKAYAbAAQASAAAMgPQAMgPAAgfQAAgSgFgNQgKgbgbAAQgbABgKAbg");
	this.shape_24.setTransform(44.525,-16.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("ABOBQIAAhsQAAgPgHgGQgJgGgLAAQgPAAgLAKQgMALAAAYIAABaIgZAAIAAhlQgBgQgEgHQgFgLgRAAQgPAAgMALQgNAMAAAeIAABSIgaAAIAAicIAaAAIAAAXQAKgMAHgFQAOgJAQAAQASAAAMAJQAGAFAFALQAIgNAMgGQANgGAOAAQAgAAALAXQAHAMAAAVIAABng");
	this.shape_25.setTransform(23.45,-19.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_26.setTransform(2.425,-19.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#595959").s().p("Ag8BbQgigeABg+QgBgwAZgeQAcghAuAAQAoAAAXAVQAWAWACAbIgcAAQgFgVgOgMQgOgMgaAAQgeAAgTAWQgUAXABAtQAAAmARAXQASAYAhAAQAfAAARgZQAJgNAEgVIAdAAQgFAigUAXQgaAbgrAAQgkAAgZgWg");
	this.shape_27.setTransform(-16.6,-22.225);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#595959").s().p("AgMBsIAAjWIAZAAIAADWg");
	this.shape_28.setTransform(-38.975,-22.2);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#595959").s().p("Ag7BGQgOgNAAgVQAAgVANgNQAOgKAWgDIApgGQAJgBADgGQACgEAAgGQAAgOgJgGQgKgGgRAAQgUAAgJALQgFAHgBAMIgZAAQABgdASgMQASgLAYAAQAaAAASAKQARALAAAWIAABaQAAAEABACQACACAGABIADAAIAFgBIAAATIgJACIgJABQgOAAgGgKQgDgFgBgKQgIALgPAIQgPAIgSAAQgWAAgNgNgAASADIgPADIgPACQgOACgHAEQgNAHAAAPQAAALAJAHQAIAGALABQAOgBAMgGQAWgLAAgYIAAgUQgEACgIACg");
	this.shape_29.setTransform(-50.325,-19.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#595959").s().p("AgwA9QgSgXAAghQAAgpAUgXQAUgXAeAAQAbAAAQANQARANADAfIgZAAQgDgOgIgJQgIgLgTAAQgYAAgLAZQgHAQAAAXQAAAXAKAQQAKARAUAAQARgBAJgJQAKgLAEgRIAZAAQgEAfgSAPQgRAOgcAAQgdAAgTgWg");
	this.shape_30.setTransform(-66.375,-19.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#595959").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_31.setTransform(-77.325,-22.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#595959").s().p("AglBQIAAicIAZAAIAAAbQADgHALgMQAMgLAQAAIACAAIAGABIAAAbIgEAAIgFAAQgTAAgKANQgLAMAAARIAABZg");
	this.shape_32.setTransform(-84.725,-19.475);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_33.setTransform(-99.075,-19.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#595959").s().p("AgIBcQgGgKAAgOIAAhoIgVAAIAAgVIAVAAIAAgsIAaAAIAAAsIAZAAIAAAVIgZAAIAABmQAAAIAFADQADABAHAAIAEAAIAGAAIAAAVIgKACIgLABQgRAAgHgKg");
	this.shape_34.setTransform(-111.5,-21.35);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape_35.setTransform(-122.975,-19.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#595959").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_36.setTransform(-133.875,-22.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#595959").s().p("AA3BsIAAhlIhtAAIAABlIgeAAIAAjWIAeAAIAABYIBtAAIAAhYIAeAAIAADWg");
	this.shape_37.setTransform(-147.975,-22.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-169.3,-36.5,338.70000000000005,73.1);


(lib.Tween8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape.setTransform(159.875,19.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AAlBQIAAhiQAAgOgEgJQgHgOgTAAQgIAAgGABQgLAEgIAJQgHAIgBAIQgDAJAAAPIAABRIgaAAIAAicIAZAAIAAAXQALgOANgGQAMgGAOAAQAiAAAMAXQAGANAAAYIAABjg");
	this.shape_1.setTransform(144.025,19.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_2.setTransform(127.175,19.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_3.setTransform(115.675,16.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape_4.setTransform(104.925,19.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape_5.setTransform(89.925,19.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgyA+QgUgVAAgnQAAglAUgXQAUgYAgAAQARAAAQAIQAPAIAIAMQAIAMADAQQACALAAAWIhxAAQABAZAKAOQALAPAVAAQAUgBAMgOQAHgHADgLIAaAAQgBAJgGAKQgGALgHAHQgMAMgRADQgKADgLAAQgdAAgUgVgAAsgMQgCgSgGgKQgKgTgZAAQgRAAgNAOQgMAMAAAVIBVAAIAAAAg");
	this.shape_6.setTransform(73.925,19.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgwA9QgSgXAAghQAAgpAUgXQAUgXAeAAQAbAAAQANQARANADAfIgZAAQgDgOgIgJQgIgLgTAAQgYAAgLAZQgHAQAAAXQAAAXAKAQQAKARAUAAQARgBAJgJQAKgLAEgRIAZAAQgEAfgSAPQgRAOgcAAQgdAAgTgWg");
	this.shape_7.setTransform(58.325,19.85);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgyA+QgUgVAAgnQAAglAUgXQAUgYAgAAQARAAAQAIQAPAIAIAMQAIAMADAQQACALAAAWIhxAAQABAZAKAOQALAPAVAAQAUgBAMgOQAHgHADgLIAaAAQgBAJgGAKQgGALgHAHQgMAMgRADQgKADgLAAQgdAAgUgVgAAsgMQgCgSgGgKQgKgTgZAAQgRAAgNAOQgMAMAAAVIBVAAIAAAAg");
	this.shape_8.setTransform(42.275,19.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AA0BsIgCgHIgCgSIgCgkQgBgUgOgIQgIgEgRAAIhAAAIAABdIgdAAIAAjWIBhAAQAYgBAQAIQAeAOAAAkQAAAUgIAMQgIAMgPAHQANAFAGAIQAHAJAAATIABAcQABAMABAHQADAKAHACIAAAGgAg6gIIBBAAQAUAAALgIQAMgJAAgVQAAgXgQgIQgJgFgOABIhFAAg");
	this.shape_9.setTransform(23.875,16.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgMBsIAAjWIAZAAIAADWg");
	this.shape_10.setTransform(0.825,16.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("Ag7BGQgOgNAAgVQAAgVANgNQAOgKAWgDIApgGQAJgBADgGQACgEAAgGQAAgOgJgGQgKgGgRAAQgUAAgJALQgFAHgBAMIgZAAQABgdASgMQASgLAYAAQAaAAASAKQARALAAAWIAABaQAAAEABACQACACAGABIADAAIAFgBIAAATIgJACIgJABQgOAAgGgKQgDgFgBgKQgIALgPAIQgPAIgSAAQgWAAgNgNgAASADIgPADIgPACQgOACgHAEQgNAHAAAPQAAALAJAHQAIAGALABQAOgBAMgGQAWgLAAgYIAAgUQgEACgIACg");
	this.shape_11.setTransform(-10.525,19.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AgcBmQgHgGgJgKIAAAUIgYAAIAAjXIAaAAIAABNQAIgKAMgGQAMgHANABQAeAAASATQASAVAAAmQAAAlgSAZQgSAYggAAQgRABgMgJgAgegRQgOANAAAeQAAAWAGAOQAKAZAcAAQAVAAALgRQAKgRAAgbQAAgZgKgQQgLgQgVAAQgRAAgNAOg");
	this.shape_12.setTransform(-27.175,17.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_13.setTransform(-44.325,19.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgMBsIAAjWIAZAAIAADWg");
	this.shape_14.setTransform(-55.775,16.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AhDBZQgdgfAAg3QAAg1AdggQAbgeArAAQAeAAAWAMQAgARAGAqIgdAAQgEgYgRgLQgQgKgZAAQgcAAgUAWQgUAWAAAsQAAAmAQAYQARAYAkAAQAdAAASgQQAUgRAAgmIhEAAIAAgXIBfAAIAAByIgTAAIgHgcQgPAQgLAHQgTAKgcAAQgmAAgbgYg");
	this.shape_15.setTransform(-71.25,16.925);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AgOBtIAAiGIgWAAIAAgVIAWAAIAAgZQAAgQAFgIQAJgNAaAAIAFAAIAGABIAAAYIgGgBIgDAAQgNAAgCAGQgCAHAAAZIAaAAIAAAVIgaAAIAACGg");
	this.shape_16.setTransform(163.175,-22.375);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_17.setTransform(150.525,-19.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AAlBQIAAhiQAAgOgEgJQgHgOgTAAQgIAAgGABQgLAEgIAJQgHAIgBAIQgDAJAAAPIAABRIgaAAIAAicIAZAAIAAAXQALgOANgGQAMgGAOAAQAiAAAMAXQAGANAAAYIAABjg");
	this.shape_18.setTransform(125.775,-19.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_19.setTransform(108.925,-19.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape_20.setTransform(93.325,-19.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_21.setTransform(82.425,-22.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AglBQIAAicIAZAAIAAAbQADgHALgMQAMgLAQAAIACAAIAGABIAAAbIgEAAIgFAAQgTAAgKANQgLAMAAARIAABZg");
	this.shape_22.setTransform(75.025,-19.475);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("Ag7BGQgOgNAAgVQAAgVANgNQAOgKAWgDIApgGQAJgBADgGQACgEAAgGQAAgOgJgGQgKgGgRAAQgUAAgJALQgFAHgBAMIgZAAQABgdASgMQASgLAYAAQAaAAASAKQARALAAAWIAABaQAAAEABACQACACAGABIADAAIAFgBIAAATIgJACIgJABQgOAAgGgKQgDgFgBgKQgIALgPAIQgPAIgSAAQgWAAgNgNgAASADIgPADIgPACQgOACgHAEQgNAHAAAPQAAALAJAHQAIAGALABQAOgBAMgGQAWgLAAgYIAAgUQgEACgIACg");
	this.shape_23.setTransform(61.175,-19.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AhEBvIAAjZIAaAAIAAAUQAIgKAJgGQANgJARAAQAbABATAUQASAUAAAmQAAAygaAWQgRAOgXABQgRAAgMgJQgHgEgJgLIAABQgAglg8QgGAPAAAWQAAASAGAMQAKAYAbAAQASAAAMgPQAMgPAAgfQAAgSgFgNQgKgbgbAAQgbABgKAbg");
	this.shape_24.setTransform(44.525,-16.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("ABOBQIAAhsQAAgPgHgGQgJgGgLAAQgPAAgLAKQgMALAAAYIAABaIgZAAIAAhlQgBgQgEgHQgFgLgRAAQgPAAgMALQgNAMAAAeIAABSIgaAAIAAicIAaAAIAAAXQAKgMAHgFQAOgJAQAAQASAAAMAJQAGAFAFALQAIgNAMgGQANgGAOAAQAgAAALAXQAHAMAAAVIAABng");
	this.shape_25.setTransform(23.45,-19.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_26.setTransform(2.425,-19.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#595959").s().p("Ag8BbQgigeABg+QgBgwAZgeQAcghAuAAQAoAAAXAVQAWAWACAbIgcAAQgFgVgOgMQgOgMgaAAQgeAAgTAWQgUAXABAtQAAAmARAXQASAYAhAAQAfAAARgZQAJgNAEgVIAdAAQgFAigUAXQgaAbgrAAQgkAAgZgWg");
	this.shape_27.setTransform(-16.6,-22.225);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#595959").s().p("AgMBsIAAjWIAZAAIAADWg");
	this.shape_28.setTransform(-38.975,-22.2);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#595959").s().p("Ag7BGQgOgNAAgVQAAgVANgNQAOgKAWgDIApgGQAJgBADgGQACgEAAgGQAAgOgJgGQgKgGgRAAQgUAAgJALQgFAHgBAMIgZAAQABgdASgMQASgLAYAAQAaAAASAKQARALAAAWIAABaQAAAEABACQACACAGABIADAAIAFgBIAAATIgJACIgJABQgOAAgGgKQgDgFgBgKQgIALgPAIQgPAIgSAAQgWAAgNgNgAASADIgPADIgPACQgOACgHAEQgNAHAAAPQAAALAJAHQAIAGALABQAOgBAMgGQAWgLAAgYIAAgUQgEACgIACg");
	this.shape_29.setTransform(-50.325,-19.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#595959").s().p("AgwA9QgSgXAAghQAAgpAUgXQAUgXAeAAQAbAAAQANQARANADAfIgZAAQgDgOgIgJQgIgLgTAAQgYAAgLAZQgHAQAAAXQAAAXAKAQQAKARAUAAQARgBAJgJQAKgLAEgRIAZAAQgEAfgSAPQgRAOgcAAQgdAAgTgWg");
	this.shape_30.setTransform(-66.375,-19.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#595959").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_31.setTransform(-77.325,-22.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#595959").s().p("AglBQIAAicIAZAAIAAAbQADgHALgMQAMgLAQAAIACAAIAGABIAAAbIgEAAIgFAAQgTAAgKANQgLAMAAARIAABZg");
	this.shape_32.setTransform(-84.725,-19.475);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#595959").s().p("Ag1A9QgTgVAAglQAAgmAUgYQAUgXAhgBQAeABAVAUQAVAUAAAnQAAAlgTAZQgSAYgmABQggAAgTgXgAgigpQgLATAAAZQAAAZALAQQALARAXAAQAaAAAJgUQAKgUAAgXQAAgWgHgOQgLgVgbAAQgXAAgLASg");
	this.shape_33.setTransform(-99.075,-19.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#595959").s().p("AgIBcQgGgKAAgOIAAhoIgVAAIAAgVIAVAAIAAgsIAaAAIAAAsIAZAAIAAAVIgZAAIAABmQAAAIAFADQADABAHAAIAEAAIAGAAIAAAVIgKACIgLABQgRAAgHgKg");
	this.shape_34.setTransform(-111.5,-21.35);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#595959").s().p("AgxBEQgPgRgBgXIAaAAQABANAFAIQALAMAYAAQAPAAALgGQALgHAAgNQAAgKgJgFQgFgDgRgEIgVgGQgUgFgKgFQgRgLAAgTQAAgWAQgOQAQgOAcABQAjAAAQAUQAKANgBAPIgZAAQAAgIgGgHQgJgLgWAAQgQAAgHAGQgIAGAAAJQAAAKAKAHQAGADAMACIAQAFQAdAHAKAFQAQALAAAVQAAAVgRAQQgQAOghAAQgiAAgPgPg");
	this.shape_35.setTransform(-122.975,-19.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#595959").s().p("AgMBsIAAicIAZAAIAACcgAgMhNIAAgdIAZAAIAAAdg");
	this.shape_36.setTransform(-133.875,-22.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#595959").s().p("AA3BsIAAhlIhtAAIAABlIgeAAIAAjWIAeAAIAABYIBtAAIAAhYIAeAAIAADWg");
	this.shape_37.setTransform(-147.975,-22.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-169.3,-36.5,338.70000000000005,73.1);


(lib.Tween7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AhKBcQgcgiAAg0QAAg+AfgjQAfgjAuAAQApAAAZAUQAaATAFAxIgnAAQgEgXgNgOQgNgPgcAAQglAAgRAmQgLAYAAAjQAAAkAQAYQAPAZAgAAQAZAAAOgPQAPgPAGgbIAnAAQgHAwgbAWQgbAWgqAAQguAAgcgjg");
	this.shape.setTransform(188.325,0.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgTClIAAjuIAnAAIAADugAgTh2IAAguIAnAAIAAAug");
	this.shape_1.setTransform(171.6,-4.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AB4B7IAAimQAAgYgMgJQgMgJgSAAQgXAAgRAQQgSAQAAAlIAACLIgoAAIAAicQAAgZgFgLQgKgQgZAAQgXgBgSATQgTARAAAvIAAB+IgoAAIAAjwIAoAAIAAAjQAOgSAMgIQAUgNAZAAQAdAAARANQAJAJAIAPQANgTASgJQATgKAWABQAxAAARAiQAJATAAAgIAACfg");
	this.shape_2.setTransform(147.525,0.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AhNBeQgfggAAg7QAAg5AfgkQAfgkAyAAQAZAAAYAMQAYAMAMATQAMASAEAYQAEARAAAjIiuAAQABAlAQAWQAQAWAhAAQAfAAATgVQALgMAEgQIAnAAQgBANgJARQgJAQgLAKQgSASgbAGQgOAEgSAAQgsAAgfghgABDgUQgCgagJgQQgQgdgnAAQgaAAgTAUQgTAUgBAfICDAAIAAAAg");
	this.shape_3.setTransform(115.475,0.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AhMCIQgdgiAAg4QAAgzAagnQAbgmAyAAQAaAAATALQAKAHAOARIAAh5IAnAAIAAFJIgkAAIAAgiQgPAXgSAJQgUAKgXAAQgpAAgdghgAgrgYQgUAXABAtQAAAmAQAaQAQAaAjAAQAcAAASgYQARgYAAgtQAAgsgSgWQgSgWgcAAQgdAAgSAXg");
	this.shape_4.setTransform(89.4,-3.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AA5B7IAAiXQAAgWgHgNQgKgWgdAAQgNAAgJADQgRAEgMAPQgKAMgDANQgDANAAAXIAAB9IgpAAIAAjwIAnAAIAAAjQARgWATgIQATgJAWAAQAzgBASAkQAKATAAAlIAACZg");
	this.shape_5.setTransform(64.825,0.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AhbBrQgVgVAAgeQAAghAUgTQAVgRAigEIA/gIQAOgCAFgKQADgFAAgKQAAgVgPgJQgPgKgaAAQgfAAgOARQgHAKgCASIgmAAQABgsAcgRQAcgSAkAAQApAAAbAQQAaAQAAAiIAACKQAAAGACAEQADADAIAAIAGAAIAHgBIAAAeIgOADIgNABQgVAAgKgPQgFgIgCgOQgMAQgXAMQgWAMgcAAQghAAgVgUgAAbAFIgWAEIgYADQgWADgKAHQgTAKAAAXQAAARAMAKQANALASAAQAVAAATgKQAhgRAAglIAAgfQgHAEgMADg");
	this.shape_6.setTransform(39.825,0.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("Ah5ClIAAlJICSAAQAsAAAbAZQAaAZAAAtQAAAngYAcQgYAbgxAAIhmAAIAACMgAhNgLIBXAAQAeAAATgNQASgMAAghQAAgkgagNQgPgHgaAAIhXAAg");
	this.shape_7.setTransform(12.225,-4.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EA5547").s().p("AhPCMQgZgYAAglIApAAQACAhAYANQAMAGAQAAQAcAAAUgYQAUgYAJhJQgOAVgTAJQgUAIgWAAQguAAgbgdQgbgcAAgtQAAgsAaghQAbghA0AAQBFAAAbA/QAOAjAAA0QAAA6gRAtQgeBMhFAAQgvAAgYgZgAgwhrQgSAUAAAgQAAAgAQASQAPASAhAAQAXAAAUgPQAUgQAAgnQAAgjgSgSQgSgRgaAAQgeAAgRAUg");
	this.shape_8.setTransform(-29.575,-3.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EA5547").s().p("AAQCgIAAjiIhKAAIAAggQArgEARgJQARgKAIgmIAgAAIAAE/g");
	this.shape_9.setTransform(-57.175,-3.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EA5547").s().p("Ag3AVIAAgpIBvAAIAAApg");
	this.shape_10.setTransform(-75.225,-0.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#EA5547").s().p("AhMCIQgdgiAAg4QAAgzAagnQAbgmAyAAQAaAAATALQAKAHAOARIAAh5IAnAAIAAFJIgkAAIAAgiQgPAXgTAJQgTAKgYAAQgnAAgeghgAgsgYQgSAXAAAtQAAAmAQAaQAQAaAjAAQAcAAASgYQARgYABgtQgBgsgSgWQgSgWgcAAQgdAAgTAXg");
	this.shape_11.setTransform(-96.35,-3.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EA5547").s().p("AgTClIAAjuIAnAAIAADugAgTh2IAAguIAnAAIAAAug");
	this.shape_12.setTransform(-113.35,-4.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EA5547").s().p("AgVB4IhZjvIAvAAIA/DCIBDjCIAsAAIhbDvg");
	this.shape_13.setTransform(-129.9,0.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#EA5547").s().p("AhRBeQgdghAAg5QAAg7AegkQAfgjAyAAQAvAAAgAeQAfAfAAA8QAAA5gcAlQgcAng6gBQgxAAgdghgAg0g/QgRAcAAAmQAAAnARAaQARAZAjAAQAnAAAPgeQAPgfAAgkQAAghgKgWQgSgggpAAQgjAAgRAcg");
	this.shape_14.setTransform(-154.3,0.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#EA5547").s().p("AhdCLQgyguAAhfQAAhJAmguQApgzBHAAQA+AAAiAhQAiAhAEAqIgrAAQgHgggWgTQgWgSgnAAQgvAAgdAiQgdAiAABGQAAA5AaAkQAbAkAzAAQAxAAAZgmQANgTAHghIArAAQgGA0ggAjQgnAqhBAAQg4AAgngig");
	this.shape_15.setTransform(-183.375,-4.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-201.8,-24.9,403.70000000000005,49.9);


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AhKBcQgcgiAAg0QAAg+AfgjQAfgjAuAAQApAAAZAUQAaATAFAxIgnAAQgEgXgNgOQgNgPgcAAQglAAgRAmQgLAYAAAjQAAAkAQAYQAPAZAgAAQAZAAAOgPQAPgPAGgbIAnAAQgHAwgbAWQgbAWgqAAQguAAgcgjg");
	this.shape.setTransform(188.325,0.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgTClIAAjuIAnAAIAADugAgTh2IAAguIAnAAIAAAug");
	this.shape_1.setTransform(171.6,-4.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AB4B7IAAimQAAgYgMgJQgMgJgSAAQgXAAgRAQQgSAQAAAlIAACLIgoAAIAAicQAAgZgFgLQgKgQgZAAQgXgBgSATQgTARAAAvIAAB+IgoAAIAAjwIAoAAIAAAjQAOgSAMgIQAUgNAZAAQAdAAARANQAJAJAIAPQANgTASgJQATgKAWABQAxAAARAiQAJATAAAgIAACfg");
	this.shape_2.setTransform(147.525,0.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AhNBeQgfggAAg7QAAg5AfgkQAfgkAyAAQAZAAAYAMQAYAMAMATQAMASAEAYQAEARAAAjIiuAAQABAlAQAWQAQAWAhAAQAfAAATgVQALgMAEgQIAnAAQgBANgJARQgJAQgLAKQgSASgbAGQgOAEgSAAQgsAAgfghgABDgUQgCgagJgQQgQgdgnAAQgaAAgTAUQgTAUgBAfICDAAIAAAAg");
	this.shape_3.setTransform(115.475,0.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AhMCIQgdgiAAg4QAAgzAagnQAbgmAyAAQAaAAATALQAKAHAOARIAAh5IAnAAIAAFJIgkAAIAAgiQgPAXgSAJQgUAKgXAAQgpAAgdghgAgrgYQgUAXABAtQAAAmAQAaQAQAaAjAAQAcAAASgYQARgYAAgtQAAgsgSgWQgSgWgcAAQgdAAgSAXg");
	this.shape_4.setTransform(89.4,-3.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AA5B7IAAiXQAAgWgHgNQgKgWgdAAQgNAAgJADQgRAEgMAPQgKAMgDANQgDANAAAXIAAB9IgpAAIAAjwIAnAAIAAAjQARgWATgIQATgJAWAAQAzgBASAkQAKATAAAlIAACZg");
	this.shape_5.setTransform(64.825,0.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AhbBrQgVgVAAgeQAAghAUgTQAVgRAigEIA/gIQAOgCAFgKQADgFAAgKQAAgVgPgJQgPgKgaAAQgfAAgOARQgHAKgCASIgmAAQABgsAcgRQAcgSAkAAQApAAAbAQQAaAQAAAiIAACKQAAAGACAEQADADAIAAIAGAAIAHgBIAAAeIgOADIgNABQgVAAgKgPQgFgIgCgOQgMAQgXAMQgWAMgcAAQghAAgVgUgAAbAFIgWAEIgYADQgWADgKAHQgTAKAAAXQAAARAMAKQANALASAAQAVAAATgKQAhgRAAglIAAgfQgHAEgMADg");
	this.shape_6.setTransform(39.825,0.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("Ah5ClIAAlJICSAAQAsAAAbAZQAaAZAAAtQAAAngYAcQgYAbgxAAIhmAAIAACMgAhNgLIBXAAQAeAAATgNQASgMAAghQAAgkgagNQgPgHgaAAIhXAAg");
	this.shape_7.setTransform(12.225,-4.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EA5547").s().p("AhPCMQgZgYAAglIApAAQACAhAYANQAMAGAQAAQAcAAAUgYQAUgYAJhJQgOAVgTAJQgUAIgWAAQguAAgbgdQgbgcAAgtQAAgsAaghQAbghA0AAQBFAAAbA/QAOAjAAA0QAAA6gRAtQgeBMhFAAQgvAAgYgZgAgwhrQgSAUAAAgQAAAgAQASQAPASAhAAQAXAAAUgPQAUgQAAgnQAAgjgSgSQgSgRgaAAQgeAAgRAUg");
	this.shape_8.setTransform(-29.575,-3.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EA5547").s().p("AAQCgIAAjiIhKAAIAAggQArgEARgJQARgKAIgmIAgAAIAAE/g");
	this.shape_9.setTransform(-57.175,-3.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EA5547").s().p("Ag3AVIAAgpIBvAAIAAApg");
	this.shape_10.setTransform(-75.225,-0.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#EA5547").s().p("AhMCIQgdgiAAg4QAAgzAagnQAbgmAyAAQAaAAATALQAKAHAOARIAAh5IAnAAIAAFJIgkAAIAAgiQgPAXgTAJQgTAKgYAAQgnAAgeghgAgsgYQgSAXAAAtQAAAmAQAaQAQAaAjAAQAcAAASgYQARgYABgtQgBgsgSgWQgSgWgcAAQgdAAgTAXg");
	this.shape_11.setTransform(-96.35,-3.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EA5547").s().p("AgTClIAAjuIAnAAIAADugAgTh2IAAguIAnAAIAAAug");
	this.shape_12.setTransform(-113.35,-4.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EA5547").s().p("AgVB4IhZjvIAvAAIA/DCIBDjCIAsAAIhbDvg");
	this.shape_13.setTransform(-129.9,0.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#EA5547").s().p("AhRBeQgdghAAg5QAAg7AegkQAfgjAyAAQAvAAAgAeQAfAfAAA8QAAA5gcAlQgcAng6gBQgxAAgdghgAg0g/QgRAcAAAmQAAAnARAaQARAZAjAAQAnAAAPgeQAPgfAAgkQAAghgKgWQgSgggpAAQgjAAgRAcg");
	this.shape_14.setTransform(-154.3,0.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#EA5547").s().p("AhdCLQgyguAAhfQAAhJAmguQApgzBHAAQA+AAAiAhQAiAhAEAqIgrAAQgHgggWgTQgWgSgnAAQgvAAgdAiQgdAiAABGQAAA5AaAkQAbAkAzAAQAxAAAZgmQANgTAHghIArAAQgGA0ggAjQgnAqhBAAQg4AAgngig");
	this.shape_15.setTransform(-183.375,-4.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-201.8,-24.9,403.70000000000005,49.9);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("AhrDjIAAm7IBHAAIAABNQAJgXAgggQAiggAtAAIAHAAIARACIAABPIgMgCIgNAAQg4AAgdAkQgeAkgBAwIAAD+g");
	this.shape.setTransform(243.3,64.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AiQCvQg5g9AAhsQAAhrA6hCQA6hDBcAAQAvAAAsAWQAsAWAYAjQAWAiAHAtQAHAfAABCIlDAAQACBEAeApQAeApA9AAQA6AAAjgnQATgXAIgdIBJAAQgCAYgRAfQgQAdgVAUQghAhgyALQgbAHghAAQhSAAg6g8gAB9glQgFgxgQgdQgfg2hHAAQgyAAgiAlQgjAlgCA6ID0AAIAAAAg");
	this.shape_1.setTransform(202.675,65.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("ABoEyIAAkYQAAgwgMgXQgUglg5AAQgtAAgmAhQgmAgABBXIAADsIhLAAIAApjIBLAAIAADkQAagiAVgOQAkgXA1AAQBhAAAjBDQASAlAABBIAAEdg");
	this.shape_2.setTransform(155.9,56.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AgXEFQgTgbAAgqIAAkmIg8AAIAAg9IA8AAIAAh8IBLAAIAAB8IBGAAIAAA9IhGAAIAAEhQAAAYAPAHQAJAFAUAAIAMAAIAOgCIAAA8IgaAFIgeACQg0AAgSgbg");
	this.shape_3.setTransform(119.975,59.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA5547").s().p("AiXCvQg2g/AAhoQAAhvA5hCQA4hDBeAAQBWAAA7A6QA7A5AABvQAABqg0BGQg0BHhsAAQhcAAg1g+gAhhh2QgfA0AABJQAABHAfAvQAeAvBDAAQBJAAAbg4QAcg4AAhEQAAg+gUgnQggg9hMAAQhDAAgeA0g");
	this.shape_4.setTransform(84.475,65.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EA5547").s().p("AiXCvQg2g/AAhoQAAhvA5hCQA4hDBeAAQBWAAA7A6QA7A5AABvQAABqg0BGQg0BHhsAAQhcAAg1g+gAhhh2QgfA0AABJQAABHAfAvQAeAvBDAAQBJAAAbg4QAcg4AAhEQAAg+gUgnQggg9hMAAQhDAAgeA0g");
	this.shape_5.setTransform(13.625,65.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EA5547").s().p("ABpDjIAAkXQAAgpgMgYQgUgqg0AAQgaAAgQAFQggAKgWAbQgUAWgFAYQgFAXgBArIAADoIhKAAIAAm7IBHAAIAAA/QAggnAigRQAkgRAqAAQBeAAAiBCQASAkAABDIAAEcg");
	this.shape_6.setTransform(-33.05,64.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AiQCvQg5g9AAhsQAAhrA6hCQA6hDBcAAQAvAAAsAWQAsAWAYAjQAWAiAHAtQAHAfAABCIlDAAQACBEAeApQAeApA9AAQA6AAAjgnQATgXAIgdIBJAAQgCAYgRAfQgQAdgVAUQghAhgyALQgbAHghAAQhSAAg6g8gAB9glQgFgxgQgdQgfg2hHAAQgyAAgiAlQgjAlgCA6ID0AAIAAAAg");
	this.shape_7.setTransform(-104.375,65.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("ABZExIiLjiIg9A7IAACnIhIAAIAAphIBIAAIAAFhIC+i8IBgAAIirCkIC0EYg");
	this.shape_8.setTransform(-146.275,57.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AglExIAAm6IBLAAIAAG6gAgljbIAAhVIBLAAIAABVg");
	this.shape_9.setTransform(-179.575,57.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgkExIAAphIBJAAIAAJhg");
	this.shape_10.setTransform(-198.275,57.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AjGEOQg7g/gEheIBlAAQAFA1AWAcQApAzBjAAQA8AAAtgZQAugaAAg1QAAgpgkgVQgYgMhEgRIhUgWQhSgUgmgYQhFgqAAhMQAAhZBBg3QBBg3BtAAQCPAABABTQAnA1gBA9IhjAAQgDgkgXgcQglgqhbAAQg+AAgfAXQgfAWAAAlQAAApApAZQAYAPAvALIBGARQB0AbAnAZQA9AoAABYQAABThAA9QhBA9iDAAQiNAAg7hAg");
	this.shape_11.setTransform(225.175,-45.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("Ag0GuIAApvIBqAAIAAJvgAg0k2IAAh3IBqAAIAAB3g");
	this.shape_12.setTransform(181.55,-57.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AjGEOQg7g/gEheIBlAAQAFA1AWAcQApAzBjAAQA8AAAtgZQAugaAAg1QAAgpgkgVQgYgMhEgRIhUgWQhSgUgmgYQhFgqAAhMQAAhZBBg3QBBg3BtAAQCPAABABTQAnA1gBA9IhjAAQgDgkgXgcQglgqhbAAQg+AAgfAXQgfAWAAAlQAAApApAZQAYAPAvALIBGARQB0AbAnAZQA9AoAABYQAABThAA9QhBA9iDAAQiNAAg7hAg");
	this.shape_13.setTransform(138.525,-45.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("Ag1GuIAApvIBrAAIAAJvgAg1k2IAAh3IBrAAIAAB3g");
	this.shape_14.setTransform(94.9,-57.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AiYFBIAApzIBlAAIAABtQAMggAvgtQAwguA/AAIAKABIAXACIAABvIgRgCIgRgBQhQAAgpA0QgrAzgBBDIAAFog");
	this.shape_15.setTransform(65.15,-46.725);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AjCDyQhKhaAAiHQAAikBRhcQBQhcB7AAQBqAABDA0QBCAzAOB+IhnAAQgJg6gigmQghgnhKAAQhkAAgrBjQgcBAAABcQAABeAoBBQAoBABUAAQBCAAAmgoQAmgoAPhFIBnAAQgSB8hGA6QhHA6htAAQh6AAhJhag");
	this.shape_16.setTransform(12.175,-46.025);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AEAGuIhakCIlQAAIheECIh3AAIFEtbICCAAIE5NbgACFBOIiEl8IiKF8IEOAAg");
	this.shape_17.setTransform(-91.15,-57.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257.1,-109,514.2,218.1);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("AhrDjIAAm7IBHAAIAABNQAJgXAgggQAiggAtAAIAHAAIARACIAABPIgMgCIgNAAQg4AAgdAkQgeAkgBAwIAAD+g");
	this.shape.setTransform(243.3,64.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA5547").s().p("AiQCvQg5g9AAhsQAAhrA6hCQA6hDBcAAQAvAAAsAWQAsAWAYAjQAWAiAHAtQAHAfAABCIlDAAQACBEAeApQAeApA9AAQA6AAAjgnQATgXAIgdIBJAAQgCAYgRAfQgQAdgVAUQghAhgyALQgbAHghAAQhSAAg6g8gAB9glQgFgxgQgdQgfg2hHAAQgyAAgiAlQgjAlgCA6ID0AAIAAAAg");
	this.shape_1.setTransform(202.675,65.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EA5547").s().p("ABoEyIAAkYQAAgwgMgXQgUglg5AAQgtAAgmAhQgmAgABBXIAADsIhLAAIAApjIBLAAIAADkQAagiAVgOQAkgXA1AAQBhAAAjBDQASAlAABBIAAEdg");
	this.shape_2.setTransform(155.9,56.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("AgXEFQgTgbAAgqIAAkmIg8AAIAAg9IA8AAIAAh8IBLAAIAAB8IBGAAIAAA9IhGAAIAAEhQAAAYAPAHQAJAFAUAAIAMAAIAOgCIAAA8IgaAFIgeACQg0AAgSgbg");
	this.shape_3.setTransform(119.975,59.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EA5547").s().p("AiXCvQg2g/AAhoQAAhvA5hCQA4hDBeAAQBWAAA7A6QA7A5AABvQAABqg0BGQg0BHhsAAQhcAAg1g+gAhhh2QgfA0AABJQAABHAfAvQAeAvBDAAQBJAAAbg4QAcg4AAhEQAAg+gUgnQggg9hMAAQhDAAgeA0g");
	this.shape_4.setTransform(84.475,65.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EA5547").s().p("AiXCvQg2g/AAhoQAAhvA5hCQA4hDBeAAQBWAAA7A6QA7A5AABvQAABqg0BGQg0BHhsAAQhcAAg1g+gAhhh2QgfA0AABJQAABHAfAvQAeAvBDAAQBJAAAbg4QAcg4AAhEQAAg+gUgnQggg9hMAAQhDAAgeA0g");
	this.shape_5.setTransform(13.625,65.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EA5547").s().p("ABpDjIAAkXQAAgpgMgYQgUgqg0AAQgaAAgQAFQggAKgWAbQgUAWgFAYQgFAXgBArIAADoIhKAAIAAm7IBHAAIAAA/QAggnAigRQAkgRAqAAQBeAAAiBCQASAkAABDIAAEcg");
	this.shape_6.setTransform(-33.05,64.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AiQCvQg5g9AAhsQAAhrA6hCQA6hDBcAAQAvAAAsAWQAsAWAYAjQAWAiAHAtQAHAfAABCIlDAAQACBEAeApQAeApA9AAQA6AAAjgnQATgXAIgdIBJAAQgCAYgRAfQgQAdgVAUQghAhgyALQgbAHghAAQhSAAg6g8gAB9glQgFgxgQgdQgfg2hHAAQgyAAgiAlQgjAlgCA6ID0AAIAAAAg");
	this.shape_7.setTransform(-104.375,65.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("ABZExIiLjiIg9A7IAACnIhIAAIAAphIBIAAIAAFhIC+i8IBgAAIirCkIC0EYg");
	this.shape_8.setTransform(-146.275,57.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AglExIAAm6IBLAAIAAG6gAgljbIAAhVIBLAAIAABVg");
	this.shape_9.setTransform(-179.575,57.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgkExIAAphIBJAAIAAJhg");
	this.shape_10.setTransform(-198.275,57.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AjGEOQg7g/gEheIBlAAQAFA1AWAcQApAzBjAAQA8AAAtgZQAugaAAg1QAAgpgkgVQgYgMhEgRIhUgWQhSgUgmgYQhFgqAAhMQAAhZBBg3QBBg3BtAAQCPAABABTQAnA1gBA9IhjAAQgDgkgXgcQglgqhbAAQg+AAgfAXQgfAWAAAlQAAApApAZQAYAPAvALIBGARQB0AbAnAZQA9AoAABYQAABThAA9QhBA9iDAAQiNAAg7hAg");
	this.shape_11.setTransform(225.175,-45.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("Ag0GuIAApvIBqAAIAAJvgAg0k2IAAh3IBqAAIAAB3g");
	this.shape_12.setTransform(181.55,-57.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AjGEOQg7g/gEheIBlAAQAFA1AWAcQApAzBjAAQA8AAAtgZQAugaAAg1QAAgpgkgVQgYgMhEgRIhUgWQhSgUgmgYQhFgqAAhMQAAhZBBg3QBBg3BtAAQCPAABABTQAnA1gBA9IhjAAQgDgkgXgcQglgqhbAAQg+AAgfAXQgfAWAAAlQAAApApAZQAYAPAvALIBGARQB0AbAnAZQA9AoAABYQAABThAA9QhBA9iDAAQiNAAg7hAg");
	this.shape_13.setTransform(138.525,-45.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("Ag1GuIAApvIBrAAIAAJvgAg1k2IAAh3IBrAAIAAB3g");
	this.shape_14.setTransform(94.9,-57.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AiYFBIAApzIBlAAIAABtQAMggAvgtQAwguA/AAIAKABIAXACIAABvIgRgCIgRgBQhQAAgpA0QgrAzgBBDIAAFog");
	this.shape_15.setTransform(65.15,-46.725);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AjCDyQhKhaAAiHQAAikBRhcQBQhcB7AAQBqAABDA0QBCAzAOB+IhnAAQgJg6gigmQghgnhKAAQhkAAgrBjQgcBAAABcQAABeAoBBQAoBABUAAQBCAAAmgoQAmgoAPhFIBnAAQgSB8hGA6QhHA6htAAQh6AAhJhag");
	this.shape_16.setTransform(12.175,-46.025);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AEAGuIhakCIlQAAIheECIh3AAIFEtbICCAAIE5NbgACFBOIiEl8IiKF8IEOAAg");
	this.shape_17.setTransform(-91.15,-57.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257.1,-109,514.2,218.1);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(4,1,1).p("EguBAAAMBcDAAA");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-296.6,-2,593.3,4);


(lib.Tween2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(1,1,1).p("EguBAAAMBcDAAA");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-295.6,-1,591.3,2);


(lib.shade = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F04D2F").s().p("A3gdEMAAAg6HMAvBAAAMAAAA6Hg");
	this.shape.setTransform(0.025,0.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150.5,-185.5,301.1,372.1);


(lib.red = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA5547").s().p("Ag7A7QgZgYAAgjQAAgiAZgZQAZgZAiAAQAjAAAYAZQAaAZAAAiQAAAjgaAYQgYAagjAAQgiAAgZgag");
	this.shape.setTransform(8.45,8.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,16.9,16.9);


(lib.lineGreen = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7AD0DD").s().p("EAteAAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgEArmAAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgEApuAAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgEAn2AAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgEAl+AAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgEAkGAAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgEAiOAAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgEAgWAAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgAeeAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgAcmAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgAauAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgAY2APQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgAW+APQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgAVGAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgATOAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgARWAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgAPeAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgANmAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgALuAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgAJ2APQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgAH+APQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgAGGAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgAEOAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgACWAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgAAeAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgAhZAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgAjRAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgAlJAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgAnBAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgAo5APQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgAqxAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgAspAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgAuhAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgAwZAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgAyRAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgA0JAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgA2BAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgA35APQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgA5xAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgA7pAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgA9hAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgA/ZAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgEghRAAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgEgjJAAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgEglBAAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgEgm5AAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgEgoxAAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgEgqpAAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAgEgshAAPQgGAAgEgEQgFgFAAgGQAAgFAFgFQAEgEAGAAIA8AAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAgEguZAAPQgGAAgFgEQgEgFAAgGQAAgFAEgFQAFgEAGAAIA8AAQAGAAAEAEQAFAFAAAFQAAAGgFAFQgEAEgGAAg");
	this.shape.setTransform(-2.15,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-300.6,-1.5,597,3);


(lib.largeScale = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AAWAwIAAg6QAAgJgCgFQgFgJgLAAIgIABQgGACgFAGQgEAFgCAEIgBAPIAAAwIgQAAIAAhdIAPAAIAAANQAIgIAHgDQAIgEAHAAQAVAAAGANQAFAJAAANIAAA8g");
	this.shape.setTransform(227.8,64.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_1.setTransform(217.675,64.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgHBBIAAhdIAPAAIAABdgAgHguIAAgSIAPAAIAAASg");
	this.shape_2.setTransform(210.8,62.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgdApQgJgKAAgOIAPAAQAAAIAEAEQAGAIAOAAQAJAAAHgEQAHgEAAgIQAAgGgGgDQgDgCgLgDIgLgDQgNgDgFgDQgLgGAAgLQAAgNAKgJQAKgIAQAAQAVAAAJAMQAGAJAAAIIgPAAQAAgFgEgEQgFgHgNAAQgJAAgFAEQgFAEAAAFQAAAGAHAEQADACAHABIAKADQARAEAGADQAJAGAAAOQAAAMgJAJQgKAJgUAAQgUAAgJgJg");
	this.shape_3.setTransform(204.375,64.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgdApQgJgKAAgOIAPAAQAAAIAEAEQAGAIAOAAQAJAAAHgEQAHgEAAgIQAAgGgGgDQgDgCgLgDIgLgDQgNgDgFgDQgLgGAAgLQAAgNAKgJQAKgIAQAAQAVAAAJAMQAGAJAAAIIgPAAQAAgFgEgEQgFgHgNAAQgJAAgFAEQgFAEAAAFQAAAGAHAEQADACAHABIAKADQARAEAGADQAJAGAAAOQAAAMgJAJQgKAJgUAAQgUAAgJgJg");
	this.shape_4.setTransform(195.375,64.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_5.setTransform(185.725,64.375);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgdAlQgLgOAAgUQAAgYAMgOQANgOASAAQAPAAALAIQAJAIACATIgPAAQgBgJgFgGQgFgFgLAAQgPAAgGAOQgEAKAAANQgBAOAHAKQAGAJAMAAQAJAAAGgGQAGgGACgKIAPAAQgCATgLAIQgLAJgQAAQgRAAgMgNg");
	this.shape_6.setTransform(176.4,64.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_7.setTransform(166.725,64.375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#595959").s().p("AgWAwIAAhdIAPAAIAAAQQACgEAGgIQAIgGAJAAIABAAIAEAAIAAARIgCgBIgDAAQgMAAgGAIQgGAIAAAKIAAA1g");
	this.shape_8.setTransform(159.4,64.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#595959").s().p("AgWAwIAAhdIAPAAIAAAQQACgEAGgIQAHgGAKAAIABAAIAEAAIAAARIgDgBIgCAAQgNAAgFAIQgGAIAAAKIAAA1g");
	this.shape_9.setTransform(148.45,64.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_10.setTransform(139.825,64.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgdA1QgLgNAAgWQAAgUAKgPQAKgPAUAAQAJAAAIAFQAEACAFAHIAAgvIAPAAIAACAIgNAAIAAgNQgGAJgIADQgHAEgJABQgPAAgMgOgAgQgJQgIAJAAARQAAAPAGALQAHAKANgBQALABAHgKQAHgJAAgSQAAgRgHgJQgIgIgKAAQgLAAgHAJg");
	this.shape_11.setTransform(129.6,62.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#595959").s().p("AAWAwIAAg6QAAgJgDgFQgDgJgLAAIgJABQgHACgEAGQgEAFgBAEIgBAPIAAAwIgRAAIAAhdIAQAAIAAANQAGgIAIgDQAHgEAIAAQAVAAAGANQAEAJABANIAAA8g");
	this.shape_12.setTransform(119.95,64.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#595959").s().p("AghAjQgDgHAAgMIAAg/IAQAAIAAA9QAAAHACAFQAEAIALAAQAPAAAGgOQADgIAAgNIAAguIAQAAIAABdIgPAAIAAgOQgDAFgEAEQgJAHgMAAQgTAAgIgNg");
	this.shape_13.setTransform(109.825,64.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#595959").s().p("AgdApQgJgKAAgOIAPAAQAAAIAEAEQAGAIAOAAQAJAAAHgEQAHgEAAgIQAAgGgGgDQgDgCgLgDIgLgDQgNgDgFgDQgLgGAAgLQAAgNAKgJQAKgIAQAAQAVAAAJAMQAGAJAAAIIgPAAQAAgFgEgEQgFgHgNAAQgJAAgFAEQgFAEAAAFQAAAGAHAEQADACAHABIAKADQARAEAGADQAJAGAAAOQAAAMgJAJQgKAJgUAAQgUAAgJgJg");
	this.shape_14.setTransform(95.475,64.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#595959").s().p("AgdAlQgNgNAAgXQAAgWANgOQAMgOATAAQAKAAAJAFQAJAEAFAIQAFAHACAJIABAUIhEAAQABAPAGAIQAGAJANAAQAMAAAHgIQAEgFACgGIAQAAIgEALQgEAHgEAEQgHAHgLACQgGACgGAAQgRAAgMgNgAAbgHQgBgLgEgGQgGgLgPAAQgKAAgHAIQgIAIAAAMIAzAAIAAAAg");
	this.shape_15.setTransform(85.825,64.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#595959").s().p("AgHBBIAAhdIAPAAIAABdgAgHguIAAgSIAPAAIAAASg");
	this.shape_16.setTransform(78.95,62.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#595959").s().p("AgWAwIAAhdIAPAAIAAAQQACgEAGgIQAHgGAKAAIABAAIAEAAIAAARIgDgBIgCAAQgNAAgFAIQgGAIAAAKIAAA1g");
	this.shape_17.setTransform(74.55,64.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#595959").s().p("AgFA3QgDgGAAgIIAAg9IgNAAIAAgOIANAAIAAgaIAPAAIAAAaIAPAAIAAAOIgPAAIAAA7QAAAGADABIAHABIABAAIAEAAIAAANIgGABIgGAAQgKAAgFgGg");
	this.shape_18.setTransform(68.45,63.05);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#595959").s().p("AAWAwIAAg6QAAgJgDgFQgDgJgMAAIgIABQgHACgEAGQgEAFgCAEIgBAPIAAAwIgPAAIAAhdIAOAAIAAANQAIgIAHgDQAIgEAIAAQATAAAIANQADAJAAANIAAA8g");
	this.shape_19.setTransform(61.05,64.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#595959").s().p("AghAjQgDgHAAgMIAAg/IAQAAIAAA9QAAAHACAFQAEAIALAAQAPAAAGgOQADgIAAgNIAAguIAQAAIAABdIgPAAIAAgOQgDAFgEAEQgJAHgMAAQgTAAgIgNg");
	this.shape_20.setTransform(50.925,64.425);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_21.setTransform(40.925,64.325);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#595959").s().p("AgdAlQgKgOgBgUQABgYALgOQANgOASAAQAPAAALAIQAKAIABATIgPAAQgBgJgFgGQgGgFgKAAQgPAAgGAOQgEAKgBANQAAAOAHAKQAFAJANAAQAJAAAGgGQAFgGADgKIAPAAQgCATgLAIQgLAJgQAAQgRAAgMgNg");
	this.shape_22.setTransform(31.6,64.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#595959").s().p("AgIBCIAAhQIgNAAIAAgNIANAAIAAgPQAAgKADgEQAFgJAQAAIADAAIADABIAAAPIgDgBIgCAAQgIAAgBAEQgCAEAAAPIAQAAIAAANIgQAAIAABQg");
	this.shape_23.setTransform(19.525,62.45);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#595959").s().p("AgfAlQgMgNAAgWQAAgXAMgOQAMgOATAAQATAAAMAMQANAMAAAYQAAAVgLAPQgLAPgXAAQgTAAgLgNgAgUgYQgGALAAAOQAAAPAGAKQAHAKANAAQAPAAAGgLQAGgMAAgOQAAgNgEgIQgHgNgQAAQgNAAgHALg");
	this.shape_24.setTransform(11.925,64.325);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#595959").s().p("AgnBBIBFiBIAKAAIhFCBgAAVA0QgJgJAAgMQAAgNAJgKQAJgIANAAQANAAAJAIQAJAKAAANQAAAMgJAJQgJAJgNAAQgNAAgJgJgAAeARQgFAGAAAIQAAAHAFAFQAFAFAIABQAHgBAGgFQAFgFAAgHQAAgIgFgGQgGgFgHAAQgIAAgFAFgAhAgIQgJgJAAgNQAAgMAJgJQAJgJANAAQAMAAAJAJQAJAJAAAMQAAANgJAJQgJAIgMAAQgNAAgJgIgAg3gqQgFAFAAAHQAAAIAFAFQAFAGAIgBQAHABAGgGQAFgFAAgIQAAgHgFgFQgGgFgHgBQgIABgFAFg");
	this.shape_25.setTransform(-5.975,62.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#595959").s().p("AghAtQgKgQAAgcQABgVAFgPQALgdAaAAQAYAAALAVQAJAPAAAbQAAAZgIARQgMAYgYAAQgWAAgLgUgAgTgkQgGANAAAYQAAAUAEALQAGASAPAAQAMAAAHgLQAIgLAAgcQgBgWgFgNQgFgOgPAAQgNAAgHANg");
	this.shape_26.setTransform(-19.05,62.875);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#595959").s().p("AgdA3QgMgJgBgSIAQAAQACAOALAFQAFADAIAAQANAAAGgJQAHgJAAgLQAAgNgIgIQgIgGgKAAQgIAAgGADQgGADgEAFIgOgBIAKhCIBAAAIAAAPIg0AAIgGAjIAJgFQAHgDAIAAQARAAAMALQAMAKAAARQAAASgLAOQgLANgXAAQgPAAgMgIg");
	this.shape_27.setTransform(-29.025,62.975);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#595959").s().p("AgxAgIBRggIhRgeIAAgQIBjAnIAAAPIhjAng");
	this.shape_28.setTransform(-39.15,64.4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#595959").s().p("AgnA2QgMgMAAgUIAUAAQABALAFAGQAHAKAUAAQALAAAKgFQAJgFAAgLQAAgIgIgEQgEgDgOgDIgQgFQgQgDgIgFQgOgIAAgPQABgSANgLQAMgLAWAAQAcAAAMARQAJAKAAANIgUAAQgBgHgFgHQgHgHgSgBQgMABgGAEQgHAFAAAHQAAAIAJAFQAFADAJACIAOADQAWAGAIAEQAMAJAAAQQAAASgMAMQgNAMgaAAQgcAAgMgNg");
	this.shape_29.setTransform(226.8,34.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#595959").s().p("AAeBAIAAhOQAAgLgEgHQgFgMgPAAQgHAAgFABQgIADgHAIQgFAGgCAHQgBAGAAANIAABAIgVAAIAAh8IAUAAIAAASQAJgLAKgFQAKgFALAAQAaAAAKATQAFAKAAATIAABPg");
	this.shape_30.setTransform(214.175,34.075);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#595959").s().p("AgqAxQgPgRAAgeQAAgeAQgTQAQgTAaAAQAYAAAQAQQARAQAAAgQAAAdgPAUQgOAUgeAAQgaAAgPgSgAgbghQgIAPgBAUQABAUAIANQAJAOASAAQAVAAAIgQQAHgQAAgTQAAgRgFgLQgJgRgWAAQgSAAgJAOg");
	this.shape_31.setTransform(200.7,34.275);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#595959").s().p("AgKBWIAAh8IAVAAIAAB8gAgKg9IAAgYIAVAAIAAAYg");
	this.shape_32.setTransform(191.525,31.9);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#595959").s().p("AgnA2QgMgMAAgUIAUAAQABALAFAGQAHAKAUAAQAMAAAIgFQAKgFAAgLQAAgIgIgEQgEgDgOgDIgQgFQgQgDgIgFQgOgIAAgPQAAgSAOgLQANgLAVAAQAcAAAMARQAJAKgBANIgTAAQgBgHgFgHQgHgHgSgBQgMABgGAEQgHAFABAHQgBAIAJAFQAEADAKACIAOADQAWAGAIAEQANAJAAAQQAAASgOAMQgMAMgaAAQgcAAgMgNg");
	this.shape_33.setTransform(182.9,34.3);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#595959").s().p("AgnA2QgLgMgBgUIAUAAQABALAEAGQAIAKAUAAQALAAAKgFQAJgFAAgLQAAgIgIgEQgEgDgOgDIgQgFQgQgDgIgFQgNgIAAgPQgBgSANgLQANgLAWAAQAcAAANARQAHAKABANIgUAAQgBgHgFgHQgHgHgSgBQgMABgGAEQgHAFAAAHQAAAIAJAFQAFADAJACIANADQAXAGAJAEQAMAJgBAQQABASgNAMQgNAMgbAAQgbAAgMgNg");
	this.shape_34.setTransform(170.9,34.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#595959").s().p("AgoAxQgQgQAAgfQAAgdAQgUQARgSAZgBQANABANAGQAMAGAHAKQAGAJACANQACAJAAASIhaAAQAAATAJAMQAIAMARgBQAQABAKgLQAFgHACgJIAVAAQgBAIgEAIQgFAIgGAGQgJAKgOADQgIACgIAAQgYgBgQgRgAAjgKQgBgNgFgJQgIgPgUAAQgOAAgKAKQgJALgBAQIBEAAIAAAAg");
	this.shape_35.setTransform(158.125,34.3);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#595959").s().p("AgmAwQgPgSAAgbQAAggAQgSQAQgSAYAAQAVAAAOAKQANAKADAZIgVAAQgCgLgGgIQgHgIgPAAQgTAAgJAUQgFANAAASQAAASAIANQAIANAQAAQANAAAIgIQAHgIADgOIAVAAQgEAZgOAMQgOALgWAAQgYAAgOgSg");
	this.shape_36.setTransform(145.675,34.225);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#595959").s().p("AgoAxQgQgQAAgfQAAgdAQgUQARgSAZgBQANABANAGQAMAGAHAKQAGAJACANQACAJAAASIhaAAQAAATAJAMQAIAMARgBQAQABAKgLQAFgHACgJIAVAAQgBAIgEAIQgFAIgGAGQgJAKgOADQgIACgIAAQgYgBgQgRgAAjgKQgBgNgFgJQgIgPgUAAQgOAAgKAKQgJALgBAQIBEAAIAAAAg");
	this.shape_37.setTransform(132.825,34.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#595959").s().p("AAqBWIgCgFIgBgPIgCgcQgBgRgLgFQgGgEgOAAIgzAAIAABKIgXAAIAAirIBNAAQATAAANAGQAYAKAAAfQAAAPgHAJQgGALgLAEQAKAEAFAHQAFAHAAAPIABAXIACAPQACAIAFACIAAAEgAgugHIA0AAQAPAAAKgGQAJgHAAgQQAAgTgNgHQgHgDgLAAIg3AAg");
	this.shape_38.setTransform(118.125,31.9);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#595959").s().p("AgKBWIAAirIAUAAIAACrg");
	this.shape_39.setTransform(99.7,31.9);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#595959").s().p("AgwA4QgKgLgBgQQABgRAKgKQAMgIARgCIAggFQAIgBACgFQACgDAAgFQAAgLgHgFQgJgEgNAAQgQAAgHAIQgEAFgBAKIgUAAQABgXAOgJQAOgJAUAAQAVAAANAIQAOAJABARIAABIQgBADACACQABACAFAAIADAAIADgBIAAAQIgHACIgHAAQgLAAgFgIQgCgEgBgHQgHAIgMAGQgLAGgPAAQgRAAgMgKgAAOADIgLACIgMACQgMABgFADQgKAGAAAMQAAAJAGAFQAHAGAJAAQALAAAJgGQATgIgBgUIAAgPIgKADg");
	this.shape_40.setTransform(90.65,34.275);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#595959").s().p("AAeBAIAAhOQAAgLgEgHQgFgMgPAAQgHAAgFABQgIADgHAIQgFAGgCAHQgBAGAAANIAABAIgVAAIAAh8IAUAAIAAASQAJgLAKgFQAKgFALAAQAaAAAKATQAFAKAAATIAABPg");
	this.shape_41.setTransform(77.125,34.075);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#595959").s().p("AgqAxQgPgRAAgeQAAgeAQgTQAQgTAaAAQAYAAAQAQQARAQAAAgQAAAdgOAUQgPAUgeAAQgaAAgPgSgAgaghQgJAPAAAUQAAAUAJANQAIAOASAAQAUAAAJgQQAHgQAAgTQAAgRgGgLQgJgRgVAAQgSAAgIAOg");
	this.shape_42.setTransform(63.65,34.275);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#595959").s().p("AgKBWIAAh8IAVAAIAAB8gAgKg9IAAgYIAVAAIAAAYg");
	this.shape_43.setTransform(54.475,31.9);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#595959").s().p("AgGBKQgFgIAAgMIAAhSIgRAAIAAgRIARAAIAAgjIAUAAIAAAjIAUAAIAAARIgUAAIAABRQAAAGAFADIAIABIADAAIAEgBIAAARIgHACIgJAAQgOAAgFgHg");
	this.shape_44.setTransform(48.375,32.575);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#595959").s().p("AgwA4QgLgLAAgQQAAgRALgKQAMgIARgCIAggFQAIgBACgFQACgDAAgFQAAgLgHgFQgJgEgNAAQgQAAgHAIQgEAFgBAKIgUAAQABgXAOgJQAOgJAUAAQAVAAANAIQAPAJAAARIAABIQAAADABACQABACAEAAIAEAAIADgBIAAAQIgHACIgHAAQgLAAgFgIQgCgEgCgHQgGAIgMAGQgLAGgPAAQgRAAgMgKgAAOADIgLACIgNACQgLABgFADQgLAGAAAMQABAJAGAFQAHAGAJAAQAMAAAIgGQATgIgBgUIAAgPIgKADg");
	this.shape_45.setTransform(38.8,34.275);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#595959").s().p("AAeBAIAAhOQAAgLgEgHQgFgMgPAAQgHAAgFABQgIADgHAIQgFAGgCAHQgBAGAAANIAABAIgVAAIAAh8IAUAAIAAASQAJgLAKgFQAKgFALAAQAaAAAKATQAFAKAAATIAABPg");
	this.shape_46.setTransform(25.275,34.075);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#595959").s().p("AgeBAIAAh8IAUAAIAAAVQADgGAJgJQAJgJANAAIACAAIAFABIAAAWIgEgBIgEAAQgPAAgIALQgJAKAAANIAABHg");
	this.shape_47.setTransform(15.3,34.075);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#595959").s().p("AgoAxQgQgQAAgfQAAgdAQgUQARgSAZgBQANABANAGQAMAGAHAKQAGAJACANQACAJAAASIhaAAQAAATAJAMQAIAMARgBQAQABAKgLQAFgHACgJIAVAAQgBAIgEAIQgFAIgGAGQgJAKgOADQgIACgIAAQgYgBgQgRgAAjgKQgBgNgFgJQgIgPgUAAQgOAAgKAKQgJALgBAQIBEAAIAAAAg");
	this.shape_48.setTransform(3.875,34.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#595959").s().p("AgGBKQgFgIAAgMIAAhSIgRAAIAAgRIARAAIAAgjIAUAAIAAAjIAUAAIAAARIgUAAIAABRQAAAGAFADIAIABIADAAIAEgBIAAARIgHACIgJAAQgOAAgFgHg");
	this.shape_49.setTransform(-6.125,32.575);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#595959").s().p("AAeBAIAAhOQAAgLgEgHQgFgMgPAAQgHAAgFABQgIADgHAIQgFAGgCAHQgBAGAAANIAABAIgVAAIAAh8IAUAAIAAASQAJgLAKgFQAKgFALAAQAaAAAKATQAFAKAAATIAABPg");
	this.shape_50.setTransform(-15.925,34.075);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#595959").s().p("AgLBWIAAirIAXAAIAACrg");
	this.shape_51.setTransform(-25.725,31.9);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#EA5547").s().p("AiRCxQg6g9AAhvQAAhrA6hDQA7hEBdAAQAwAAAsAXQAtAWAYAkQAVAiAIAtQAHAgAABCIlGAAQACBEAeAqQAeAqA+AAQA7AAAjgnQATgYAJgdIBJAAQgCAYgQAgQgRAdgVAUQgiAhgzAMQgbAHggAAQhUAAg6g9gAB+gmQgFgxgQgdQgfg3hIAAQgyAAgjAmQgkAmgBA5ID2AAIAAAAg");
	this.shape_52.setTransform(208.4,-29.15);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#EA5547").s().p("AglE1IAAppIBLAAIAAJpg");
	this.shape_53.setTransform(175.425,-37.8);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#EA5547").s().p("AisDIQgogmAAg5QAAg+AngjQAnghBAgIIB3gPQAagEAJgSQAFgKAAgTQAAgngbgRQgcgSgyAAQg7AAgZAgQgOASgEAjIhGAAQAChUAzggQA1ghBEAAQBOAAAxAeQAyAfAAA/IAAECQAAAMAFAHQAEAIAQAAIALgBIAOgCIAAA4IgbAGIgaABQgnAAgRgbQgJgPgEgbQgXAegsAXQgqAWg0AAQg+AAgogmgAAzAJIgrAIIgsAGQgpAGgVAMQgjATAAArQAAAhAYATQAYATAhAAQAoAAAkgTQA/gfAAhFIAAg8QgOAIgWAGg");
	this.shape_54.setTransform(142.825,-29.225);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#EA5547").s().p("AiLCuQg0hBgBhgQABh2A5hCQA5hCBZAAQBMAAAvAlQAwAlAJBaIhJAAQgHgpgYgcQgYgbg0AAQhIAAgfBGQgUAuAABCQAABEAcAtQAdAvA8AAQAwAAAbgdQAcgcAKgyIBJAAQgMBagzApQgyAphOAAQhYAAg0hAg");
	this.shape_55.setTransform(96.85,-29.45);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#EA5547").s().p("AixELQg/g7ABhkIBPAAQADA1AVAgQAoA+BkAAQAtAAAmgOQBHgaAAhDQAAgygegWQgfgVhCgPIhQgTQhPgTghgVQg5gnAAhMQAAhTA4g2QA4g1BmAAQBeAABCAvQBCAuAABnIhPAAQgGgxgTgbQglgwhXAAQhHAAgfAfQgfAfAAApQAAAuAlAVQAYANBUAUIBUAUQA8AOAhAYQA5ArAABTQAABmhJAsQhIAshgAAQhwAAhAg6g");
	this.shape_56.setTransform(45.8742,-37.675);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#595959").s().p("AiRCxQg6g9AAhvQAAhrA6hDQA6hEBeAAQAvAAAuAXQAsAWAXAkQAXAiAIAtQAGAgAABCIlGAAQACBEAeAqQAeAqA+AAQA7AAAignQAVgYAHgdIBLAAQgDAYgRAgQgRAdgUAUQgiAhgyAMQgbAHgiAAQhUAAg5g9gAB/gmQgGgxgQgdQgfg3hHAAQgzAAgkAmQgiAmgDA5ID4AAIAAAAg");
	this.shape_57.setTransform(-30.5,-29.15);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#595959").s().p("Ah+EkQgyghgFhFIBMAAQAGAeAQAQQAaAZA3AAQBVAAAag9QARgkgChdQgWAjggAQQggARgzAAQhJAAg3gzQg3g1AAh2QAAhxA3hAQA4g/BNAAQA0AAAnAaQAVAPAXAcIAAg5IBFAAIAAGYQAABWgZAxQguBciBAAQhJAAgxgggAhmi1QgQAnAABBQABBMAeAnQAeAnA1AAQBQAAAghJQATgpAAg3QAAhUgjgoQghgog2AAQhOAAgdBLg");
	this.shape_58.setTransform(-79.5,-20.325);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#595959").s().p("AhtDmIAAnBIBIAAIAABOQAJgWAighQAighAtAAIAHAAIARACIAABQIgMgCIgMAAQg6AAgdAlQgfAkAAAxIAAEBg");
	this.shape_59.setTransform(-113.6,-29.95);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#595959").s().p("AisDIQgogmAAg5QAAg+AngjQAnghBAgIIB3gPQAagEAJgSQAFgKAAgTQAAgngbgRQgcgSgyAAQg7AAgZAgQgOASgEAjIhGAAQAChUAzggQA1ghBEAAQBOAAAxAeQAyAfAAA/IAAECQAAAMAFAHQAEAIAQAAIALgBIAOgCIAAA4IgbAGIgaABQgnAAgRgbQgJgPgEgbQgXAegsAXQgqAWg0AAQg+AAgogmgAAzAJIgrAIIgsAGQgpAGgVAMQgjATAAArQAAAhAYATQAYATAhAAQAoAAAkgTQA/gfAAhFIAAg8QgOAIgWAGg");
	this.shape_60.setTransform(-153.375,-29.225);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#595959").s().p("AjDE1IAAppIBTAAIAAIfIE0AAIAABKg");
	this.shape_61.setTransform(-199.7,-37.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-234.7,-75.1,469.5,150.3);


(lib.GreenShade = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7AD0DD").s().p("EAvpARzIgEAAQgIAAgGgGQgGgGAAgIQAAgHAEgGIAAgrQAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA4QAAAIgGAGQgGAGgIAAIAAAAgEAupARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEAsxARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEAq5ARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEApBARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEAnJARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEAlRARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEAjZARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEAhhARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAfpRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAdxRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAb5RzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAaBRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAYJRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAWRRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAUZRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAShRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAQpRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAOxRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAM5RzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgALBRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAJJRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAHRRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAFZRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgADhRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgABpRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAgORzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAFAFAAAJQAAAIgFAGQgGAGgIAAIAAAAgAiGRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAj+RzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAl2RzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAnuRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgApmRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAreRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAtWRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAvORzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAxGRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgAy+RzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgA02RzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgA2uRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgA4mRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgA6eRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgA8WRzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgA+ORzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEggGARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEgh+ARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEgj2ARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEgluARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEgnmARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEgpeARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEgrWARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEgtOARzIg8AAQgIAAgGgGQgGgGAAgIQAAgJAGgFQAGgGAIAAIA8AAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEgvGARzIgiAAQgIAAgGgGQgGgGAAgIIAAgaQAAgJAGgGQAGgFAIAAQAIAAAGAFQAGAGAAAJIAAAGIAOAAQAIAAAGAGQAGAFAAAJQAAAIgGAGQgGAGgIAAIAAAAgEgvoAQdQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgFQAGgGAIAAQAIAAAGAGQAGAFAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpAP/QgIAAgGgGQgGgFAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAFQgGAGgIAAIAAAAgEgvoAOlQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgGQAGgFAIAAQAIAAAGAFQAGAGAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpAOHQgIAAgGgFQgGgGAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAGQgGAFgIAAIAAAAgEgvoAMtQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgGQAGgFAIAAQAIAAAGAFQAGAGAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpAMPQgIAAgGgFQgGgGAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAGQgGAFgIAAIAAAAgEgvoAK1QgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgFQAGgGAIAAQAIAAAGAGQAGAFAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpAKXQgIAAgGgGQgGgFAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAFQgGAGgIAAIAAAAgEgvoAI9QgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgGQAGgFAIAAQAIAAAGAFQAGAGAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpAIfQgIAAgGgFQgGgGAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAGQgGAFgIAAIAAAAgEgvoAHFQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgGQAGgFAIAAQAIAAAGAFQAGAGAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpAGnQgIAAgGgFQgGgGAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAGQgGAFgIAAIAAAAgEgvoAFNQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgFQAGgGAIAAQAIAAAGAGQAGAFAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpAEvQgIAAgGgGQgGgFAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAFQgGAGgIAAIAAAAgEgvoADVQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgGQAGgFAIAAQAIAAAGAFQAGAGAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpAC3QgIAAgGgFQgGgGAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAGQgGAFgIAAIAAAAgEgvoABdQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgFQAGgFAIAAQAIAAAGAFQAGAFAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpAA/QgIAAgGgFQgGgGAAgJIAAg7QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA7QAAAJgGAGQgGAFgIAAIAAAAgEgvogAaQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgFQAGgGAIAAQAIAAAGAGQAGAFAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpgA4QgIAAgGgGQgGgFAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAFQgGAGgIAAIAAAAgEgvogCSQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgGQAGgFAIAAQAIAAAGAFQAGAGAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpgCwQgIAAgGgFQgGgGAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAGQgGAFgIAAIAAAAgEgvogEKQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgGQAGgFAIAAQAIAAAGAFQAGAGAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpgEoQgIAAgGgFQgGgGAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAGQgGAFgIAAIAAAAgEgvogGCQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgFQAGgGAIAAQAIAAAGAGQAGAFAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpgGgQgIAAgGgGQgGgFAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAFQgGAGgIAAIAAAAgEgvogH6QgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgGQAGgFAIAAQAIAAAGAFQAGAGAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpgIYQgIAAgGgFQgGgGAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAGQgGAFgIAAIAAAAgEgvogJyQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgGQAGgFAIAAQAIAAAGAFQAGAGAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpgKQQgIAAgGgFQgGgGAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAGQgGAFgIAAIAAAAgEgvogLqQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgFQAGgGAIAAQAIAAAGAGQAGAFAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpgMIQgIAAgGgGQgGgFAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAFQgGAGgIAAIAAAAgEgvogNiQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgGQAGgFAIAAQAIAAAGAFQAGAGAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpgOAQgIAAgGgFQgGgGAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAGQgGAFgIAAIAAAAgEgvogPaQgIAAgGgGQgGgGAAgIIAAg8QAAgJAGgGQAGgFAIAAQAIAAAGAFQAGAGAAAJIAAA8QAAAIgGAGQgGAGgIAAIAAAAgEAvpgP4QgIAAgGgFQgGgGAAgJIAAg8QAAgIAGgGQAGgGAIAAQAIAAAGAGQAGAGAAAIIAAA8QAAAJgGAGQgGAFgIAAIAAAAgEAvDgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEAtLgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEArTgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEApbgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEAnjgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEAlrgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEAjzgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEAh7gRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEAgDgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAeLxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAcTxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAabxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAYjxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAWrxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAUzxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAS7xKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgARDxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAPLxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgANTxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgALbxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAJjxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAHrxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAFzxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAD7xKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgACDxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAALxKIg7AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA7AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAhsxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAjkxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAlcxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAnUxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgApMxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgArExKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAs8xKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAu0xKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAwsxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgAykxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgA0cxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgA2UxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgA4MxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgA6ExKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgA78xKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgA90xKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgA/sxKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEghkgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEgjcgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEglUgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEgnMgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEgpEgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEgq8gRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEgs0gRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAgEgusgRKIg8AAQgIAAgGgGQgGgFAAgJQAAgIAGgGQAGgGAIAAIA8AAQAIAAAGAGQAGAGAAAIQAAAJgGAFQgGAGgIAAIAAAAg");
	this.shape.setTransform(0,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3996A4").s().p("EAu9ARfQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgFgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIg8AAQgIAAgGAGQgGAFAAAJIgUAAQAAgJgGgFQgGgGgIAAIgOAAIAAgGQAAgJgGgGQgGgFgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgFQgGgGgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgGQgGgFgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgGQgGgFgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgFQgGgGgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgGQgGgFgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgGQgGgFgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgFQgGgGgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgGQgGgFgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgFQgGgFgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgFQgGgGgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgGQgGgFgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgGQgGgFgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgFQgGgGgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgGQgGgFgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgGQgGgFgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgFQgGgGgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgGQgGgFgIAAIAAgUQAIAAAGgGQAGgGAAgIIAAg8QAAgJgGgGQgGgFgIAAIAAgMIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA7AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIAUAAQAAAJAGAFQAGAGAIAAIA8AAQAIAAAGgGQAGgFAAgJIASAAIAAACQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAGQAGAFAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAGQAGAFAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAFQAGAGAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAGQAGAFAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAGQAGAFAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAFQAGAGAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAGQAGAFAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAGQAGAFAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAFQAGAGAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA7QAAAJAGAGQAGAFAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAGQAGAFAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAFQAGAGAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAGQAGAFAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAGQAGAFAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAFQAGAGAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAGQAGAFAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAGQAGAFAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAA8QAAAJAGAFQAGAGAIAAIAAAUQgIAAgGAGQgGAGAAAIIAAArQgEAGAAAHg");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-306.9,-113.8,613.8,227.7);


(lib.ClipGroup_10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgyEAlZMAAAhKxMBkIAAAMAAABKxg");
	mask.setTransform(320.45,239.325);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgOAUQgEgIAAgMQAAgIACgHQAFgNALABQALgBAEAJQAEAHAAAMQAAAKgDAIQgFAKgLAAQgJABgFgJgAgIgQQgDAHAAAJQAAAJACAGQADAHAGAAQAFAAADgFQAEgEAAgNQAAgJgDgGQgCgHgHABQgFAAgDAFg");
	this.shape.setTransform(17.325,456.45);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_10, new cjs.Rectangle(13.2,451.1,10.2,11.899999999999977), null);


(lib.ClipGroup_9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgyEAlZMAAAhKxMBkIAAAMAAABKxg");
	mask.setTransform(320.45,239.325);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgOAUQgEgIAAgMQAAgIACgHQAFgMALAAQALgBAEAKQAEAGAAAMQAAALgDAHQgFAKgLAAQgJAAgFgIgAgIgQQgDAHAAAJQAAAJACAGQADAHAGAAQAFAAADgEQAEgGAAgMQAAgJgDgGQgCgHgHAAQgFABgDAFg");
	this.shape.setTransform(17.275,411.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AADAcIAAgnIgMAAIAAgFQAHgBACgBQADgCACgHIAFAAIAAA3g");
	this.shape_1.setTransform(12.475,411.175);

	var maskedShapeInstanceList = [this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_9, new cjs.Rectangle(8.7,405.9,13,11.900000000000034), null);


(lib.ClipGroup_8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgyEAlZMAAAhKxMBkIAAAMAAABKxg");
	mask.setTransform(320.45,239.325);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgOAUQgEgHAAgMQAAgJACgHQAFgMALAAQALAAAEAJQAEAGAAAMQAAALgDAHQgFALgLAAQgJAAgFgJgAgIgPQgDAFAAALQAAAIACAFQADAIAGAAQAFAAADgEQAEgGAAgMQAAgJgDgGQgCgGgHgBQgFAAgDAHg");
	this.shape.setTransform(17.275,366.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgSAcQAAgHADgGQACgFAIgEIAGgEIAHgFQADgDAAgEQAAgEgCgDQgDgEgFAAQgGABgDAFQgCADAAAFIgHAAQAAgHADgFQAEgIALAAQAJAAAFAFQAEAFAAAHQAAAGgFAFIgJAGIgFADIgGAEQgDAEgBADIAdAAIAAAHg");
	this.shape_1.setTransform(12.875,366.85);

	var maskedShapeInstanceList = [this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_8, new cjs.Rectangle(8.7,361.6,13,11.899999999999977), null);


(lib.ClipGroup_7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgyEAlZMAAAhKxMBkIAAAMAAABKxg");
	mask.setTransform(320.45,239.325);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgOAUQgEgIAAgMQAAgIACgHQAFgMALAAQALgBAEAKQAEAGAAAMQAAALgDAHQgFAKgLAAQgJAAgFgIgAgIgQQgDAHAAAJQAAAJACAGQADAHAGAAQAFAAADgEQAEgFAAgNQAAgJgDgGQgCgHgHAAQgFABgDAFg");
	this.shape.setTransform(17.275,321.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgOAXQgEgFgBgIIAIAAQAAAFABADQAEAEAGAAQAFAAADgDQADgDABgFQAAgFgEgDQgEgCgFAAIgBAAIgBAAIAAgFIABAAIACAAQADAAADgBQAEgCAAgGQAAgEgDgCQgDgDgEAAQgGABgDAEQgBADgBAFIgGAAQAAgHADgEQADgHALAAQAIgBAFAEQAEAEAAAHQAAAFgCADIgFAEQAEAAADADQACAEAAAEQABAJgGAFQgFAEgJAAQgKAAgEgFg");
	this.shape_1.setTransform(12.85,321.7);

	var maskedShapeInstanceList = [this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_7, new cjs.Rectangle(8.7,316.3,13,12), null);


(lib.ClipGroup_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgyEAlZMAAAhKxMBkIAAAMAAABKxg");
	mask.setTransform(320.45,239.325);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgOAUQgEgHAAgMQAAgJACgHQAFgMALAAQALAAAEAJQAEAGAAAMQAAALgDAHQgFALgLAAQgJAAgFgJgAgIgPQgDAFAAALQAAAIACAFQADAIAGAAQAFAAADgEQAEgGAAgMQAAgJgDgGQgCgGgHgBQgFAAgDAHg");
	this.shape.setTransform(17.275,277.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AAFAcIAAgOIgYAAIAAgHIAZgiIAGAAIAAAjIAIAAIAAAGIgIAAIAAAOgAgMAIIARAAIAAgYg");
	this.shape_1.setTransform(12.875,277.325);

	var maskedShapeInstanceList = [this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_6, new cjs.Rectangle(8.7,272,13,12), null);


(lib.ClipGroup_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgyEAlZMAAAhKxMBkIAAAMAAABKxg");
	mask.setTransform(320.45,239.325);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgOAUQgEgIAAgLQAAgJACgHQAFgNALAAQALABAEAIQAEAHAAAMQAAAKgDAIQgFALgLAAQgJAAgFgJgAgIgPQgDAFAAALQAAAIACAFQADAIAGAAQAFAAADgFQAEgFAAgMQAAgJgDgGQgCgGgHgBQgFAAgDAHg");
	this.shape.setTransform(17.275,233.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgMAYQgGgDAAgJIAHAAQABAHAFABQACACADAAQAGAAADgEQADgEAAgFQAAgGgEgDQgEgCgEAAIgGABIgEADIgGAAIAEgdIAcAAIAAAHIgXAAIgCAPIAEgCQADgBADgBQAHAAAGAGQAFAEAAAHQAAAIgFAGQgFAGgJAAQgHAAgFgEg");
	this.shape_1.setTransform(12.875,233.15);

	var maskedShapeInstanceList = [this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_5, new cjs.Rectangle(8.7,227.7,13,12), null);


(lib.ClipGroup_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgyEAlZMAAAhKxMBkIAAAMAAABKxg");
	mask.setTransform(320.45,239.325);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgOAUQgEgIAAgMQAAgIACgHQAFgNALAAQALAAAEAJQAEAHAAAMQAAALgDAHQgFALgLgBQgJABgFgJgAgIgQQgDAHAAAJQAAAJACAGQADAHAGAAQAFAAADgFQAEgEAAgNQAAgJgDgGQgCgGgHAAQgFAAgDAFg");
	this.shape.setTransform(17.275,187.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgNAXQgFgGAAgOQAAgKACgHQAFgOANAAQAJAAADAFQAEAFAAAFIgHAAQAAgDgCgCQgDgDgEAAQgFAAgEAFQgEAFAAAKQACgDAEgCQADgBAEAAQAGAAAGAEQAFAEAAAIQAAAIgFAGQgFAGgJAAQgGAAgHgGgAgHABQgDADAAAGQAAAFADAEQAEADAEAAQAFAAADgDQADgEgBgFQAAgEgBgEQgDgDgGAAQgEAAgEACg");
	this.shape_1.setTransform(12.9,187.875);

	var maskedShapeInstanceList = [this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_4, new cjs.Rectangle(8.7,182.5,13,12), null);


(lib.ClipGroup_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgyEAlZMAAAhKxMBkIAAAMAAABKxg");
	mask.setTransform(320.45,239.325);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgOAUQgEgIAAgLQAAgJACgHQAFgNALAAQALABAEAIQAEAHAAAMQAAAKgDAIQgFALgLAAQgJAAgFgJgAgIgPQgDAFAAALQAAAIACAFQADAIAGAAQAFAAADgFQAEgFAAgMQAAgJgDgGQgCgGgHAAQgFgBgDAHg");
	this.shape.setTransform(17.275,143.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgKAbQACgQAIgOQAGgKAFgGIgdAAIAAgHIAlAAIAAAGIgHAJIgIANQgDAHgBAGIgDAMg");
	this.shape_1.setTransform(12.925,143.525);

	var maskedShapeInstanceList = [this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3, new cjs.Rectangle(8.7,138.2,13,11.900000000000006), null);


(lib.ClipGroup_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgyEAlZMAAAhKxMBkIAAAMAAABKxg");
	mask.setTransform(320.45,239.325);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgOAUQgEgIAAgMQAAgIACgHQAFgNALAAQALAAAEAJQAEAHAAAMQAAALgDAHQgFALgLgBQgJABgFgJgAgIgQQgDAHAAAJQAAAJACAGQADAHAGAAQAFAAADgFQAEgEAAgNQAAgJgDgGQgCgGgHAAQgFAAgDAFg");
	this.shape.setTransform(17.275,98.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgNAYQgFgEAAgIQAAgGACgDQADgDAEgCIgEgCQgDgEAAgEQAAgHAEgEQAFgFAHAAQAIAAAFAFQAEADAAAHQAAAEgDAEIgEADIAFADQAEAEAAAGQAAAIgFAFQgFAEgJAAQgHABgGgFgAgHAEQgEACAAAGQAAAEADADQADADAFAAQAFAAADgDQAEgCAAgFQAAgFgEgDQgDgDgFAAQgEAAgDADgAgHgTQgCADAAAEQAAADADACQADADADAAQAEAAADgDQADgDAAgDQAAgDgDgDQgCgDgFABQgEgBgDADg");
	this.shape_1.setTransform(12.875,98.35);

	var maskedShapeInstanceList = [this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(8.7,93,13,11.900000000000006), null);


(lib.ClipGroup_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgyEAlZMAAAhKxMBkIAAAMAAABKxg");
	mask.setTransform(320.45,239.325);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgOAUQgEgIAAgMQAAgIACgHQAFgMALAAQALgBAEAKQAEAGAAAMQAAAKgDAIQgFAKgLAAQgJAAgFgIgAgIgQQgDAHAAAJQAAAJACAGQADAHAGAAQAFAAADgFQAEgEAAgNQAAgJgDgGQgCgHgHABQgFAAgDAFg");
	this.shape.setTransform(17.275,54.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgNAYQgEgEAAgGIAHAAQAAAFAEACIAFACQAEgBAEgEQADgDACgOQgDAFgDABQgEABgDAAQgIAAgEgFQgFgEAAgIQAAgHAFgGQAEgFAJAAQALgBAFALQADAHAAAJQAAAJgDAIQgFANgMgBQgIABgEgFgAgIgSQgDAEAAAFQAAAFADAEQADACAFAAQAEAAADgCQADgCAAgHQAAgGgDgDQgDgDgEAAQgFAAgDADg");
	this.shape_1.setTransform(12.875,54.05);

	var maskedShapeInstanceList = [this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(8.7,48.7,13,11.899999999999999), null);


(lib.ClipGroup = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgyEAlZMAAAhKxMBkIAAAMAAABKxg");
	mask.setTransform(320.45,239.325);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgOAUQgEgIAAgMQAAgIACgHQAFgNALAAQALAAAEAJQAEAHAAAMQAAALgDAHQgFALgLgBQgJABgFgJgAgIgQQgDAHAAAJQAAAJACAGQADAHAGAAQAFAAADgFQAEgEAAgNQAAgJgDgGQgCgGgHAAQgFAAgDAFg");
	this.shape.setTransform(17.275,8.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgOAUQgEgIAAgMQAAgIACgHQAFgNALAAQALAAAEAJQAEAHAAAMQAAALgDAHQgFALgLgBQgJABgFgJgAgIgQQgDAHAAAJQAAAJACAGQADAHAGAAQAFAAADgFQAEgEAAgNQAAgJgDgGQgCgGgHAAQgFAAgDAFg");
	this.shape_1.setTransform(12.875,8.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AADAcIAAgnIgMAAIAAgFQAHgBACgBQADgCACgHIAFAAIAAA3g");
	this.shape_2.setTransform(8.075,8.725);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(4.3,3.4,17.4,12), null);


(lib.ClipGroup_11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EguzAi+MAAAhF7MBdnAAAMAAABF7g");
	mask_1.setTransform(299.625,223.825);

	// Layer_3
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA5547").s().p("EAtTAANQgFAAgFgEQgEgDAAgGQAAgEAEgEQAFgEAFAAIA1AAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAgEArpAANQgGAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAGAAIA1AAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAgEAp+AANQgFAAgEgEQgFgDAAgGQAAgEAFgEQAEgEAFAAIA1AAQAFAAAFAEQADAEAAAEQAAAGgDADQgFAEgFAAgEAoUAANQgFAAgFgEQgDgDAAgGQAAgEADgEQAEgEAGAAIA1AAQAGAAADAEQAEAEAAAEQAAAGgEADQgDAEgGAAgEAmpAANQgFAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAFAAIA1AAQAGAAAEAEQAEAEAAAEQAAAGgEADQgEAEgGAAgEAk/AANIAAgZIA1AAQAFAAAEAEQAFAEAAAEQAAAGgFADQgEAEgFAAgEAjVAANQgGAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAGAAIA0AAQAGAAAEAEQAEAEAAAEQAAAGgEADQgEAEgGAAgEAhqAANIAAgZIA2AAQAFAAAEAEQADAEAAAEQAAAGgDADQgEAEgFAAgEAgAAANQgGAAgDgEQgEgDgBgGQABgEAEgEQADgEAGAAIA1AAQAGAAAEAEQADAEAAAEQAAAGgDADQgEAEgGAAgAeVANQgFAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAFAAIA2AAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAgAcrANQgFAAgFgEQgDgDAAgGQAAgEADgEQAFgEAFAAIA1AAQAFAAAEAEQAEAEABAEQAAAGgFADQgEAEgFAAgAbAANQgEAAgFgEQgEgDABgGQgBgEAEgEQAEgEAFAAIA2AAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAgAZXANQgGAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAGAAIA1AAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAgAXsANQgFAAgEgEQgFgDAAgGQAAgEAFgEQAEgEAFAAIA1AAQAFAAAFAEQADAEAAAEQAAAGgDADQgFAEgFAAgAWCANQgGAAgEgEQgDgDAAgGQAAgEADgEQAEgEAGAAIA1AAQAGAAADAEQAEAEAAAEQAAAGgEADQgDAEgGAAgAUXANQgFAAgEgEQgEgDAAgGQAAgEAEgEQADgEAGAAIA1AAQAGAAADAEQAEAEABAEQgBAGgEADQgDAEgGAAgAStANQgGAAgEgEQgDgDAAgGQAAgEADgEQAEgEAGAAIA1AAQAFAAAEAEQAFAEAAAEQAAAGgFADQgEAEgFAAgARDANQgGAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAGAAIA0AAQAGAAAEAEQAEAEAAAEQAAAGgEADQgEAEgGAAgAPYANIAAgZIA2AAQAFAAAEAEQADAEAAAEQAAAGgDADQgEAEgFAAgANuANQgFAAgEgEQgEgDgBgGQABgEAEgEQADgEAGAAIA1AAQAGAAAEAEQADAEAAAEQAAAGgDADQgEAEgGAAgAMDANQgFAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAFAAIA2AAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAgAKZANQgFAAgFgEQgDgDAAgGQAAgEADgEQAFgEAFAAIA1AAQAFAAAEAEQAEAEABAEQAAAGgFADQgEAEgFAAgAIuANQgEAAgFgEQgEgDABgGQgBgEAEgEQAEgEAFAAIA2AAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAgAHFANQgGAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAGAAIA1AAQAFAAAEAEQADAEAAAEQAAAGgDADQgEAEgFAAgAFaANQgFAAgEgEQgFgDAAgGQAAgEAFgEQAEgEAFAAIA1AAQAFAAAFAEQADAEAAAEQAAAGgDADQgFAEgFAAgADwANQgGAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAGAAIA1AAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAgACFANQgFAAgEgEQgEgDAAgGQAAgEAEgEQADgEAGAAIA1AAQAGAAADAEQAEAEABAEQgBAGgEADQgDAEgGAAgAAbANQgGAAgEgEQgDgDAAgGQAAgEADgEQAEgEAGAAIA1AAQAFAAAEAEQAFAEAAAEQAAAGgFADQgEAEgFAAgAhOANQgGAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAGAAIA0AAQAGAAAEAEQAEAEAAAEQAAAGgEADQgEAEgGAAgAi5ANIAAgZIA1AAQAGAAAEAEQADAEAAAEQAAAGgDADQgEAEgGAAgAkjANQgFAAgEgEQgEgDgBgGQABgEAEgEQADgEAGAAIA1AAQAGAAADAEQAEAEAAAEQAAAGgEADQgDAEgGAAgAmOANIAAgZIA2AAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAgAn4ANQgFAAgFgEQgDgDAAgGQAAgEADgEQAFgEAFAAIA1AAQAFAAAEAEQAFAEAAAEQAAAGgFADQgEAEgFAAgApjANQgFAAgEgEQgDgDgBgGQABgEADgEQAEgEAFAAIA1AAQAGAAAEAEQAEAEAAAEQAAAGgEADQgEAEgGAAgArNANQgFAAgEgEQgEgDAAgGQAAgEAEgEQADgEAGAAIA2AAQAFAAAEAEQADAEAAAEQAAAGgDADQgEAEgFAAgAs3ANQgFAAgEgEQgFgDAAgGQAAgEAFgEQAEgEAFAAIA1AAQAFAAAFAEQADAEAAAEQAAAGgDADQgFAEgFAAgAuhANQgGAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAGAAIA1AAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAgAwMANQgGAAgEgEQgDgDAAgGQAAgEADgEQAEgEAGAAIA1AAQAGAAADAEQAEAEABAEQgBAGgEADQgDAEgGAAgAx3ANQgEAAgFgEQgDgDAAgGQAAgEADgEQAEgEAFAAIA2AAQAGAAADAEQAEAEAAAEQAAAGgEADQgDAEgGAAgAzgANQgGAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAGAAIA0AAQAGAAAEAEQAEAEAAAEQAAAGgEADQgEAEgGAAgA1LANQgFAAgEgEQgFgDAAgGQAAgEAFgEQAEgEAFAAIA1AAQAGAAAEAEQADAEAAAEQAAAGgDADQgEAEgGAAgA21ANQgFAAgEgEQgEgDgBgGQABgEAEgEQADgEAGAAIA1AAQAGAAADAEQAEAEAAAEQAAAGgEADQgDAEgGAAgA4gANIAAgZIA2AAQAFAAAEAEQADAEAAAEQAAAGgDADQgEAEgFAAgA6KANQgFAAgFgEQgDgDAAgGQAAgEADgEQAFgEAFAAIA1AAQAFAAAEAEQAFAEAAAEQAAAGgFADQgEAEgFAAgA71ANQgFAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAFAAIA1AAQAGAAAEAEQAEAEAAAEQAAAGgEADQgEAEgGAAgA9fANQgFAAgEgEQgEgDAAgGQAAgEAEgEQADgEAGAAIA2AAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAgA/JANQgFAAgEgEQgFgDAAgGQAAgEAFgEQAEgEAFAAIA1AAQAFAAAFAEQADAEAAAEQAAAGgDADQgFAEgFAAgEggzAANQgGAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAGAAIA1AAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAgEgieAANQgGAAgEgEQgDgDAAgGQAAgEADgEQAEgEAGAAIA1AAQAGAAADAEQAEAEABAEQgBAGgEADQgDAEgGAAgEgkJAANQgEAAgFgEQgDgDAAgGQAAgEADgEQAEgEAFAAIA2AAQAGAAADAEQAEAEAAAEQAAAGgEADQgDAEgGAAgEglyAANQgGAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAGAAIA0AAQAGAAAEAEQAEAEAAAEQAAAGgEADQgEAEgGAAgEgndAANQgFAAgEgEQgFgDAAgGQAAgEAFgEQAEgEAFAAIA1AAQAGAAAEAEQADAEAAAEQAAAGgDADQgEAEgGAAgEgpHAANQgGAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAGAAIA1AAQAFAAAEAEQAEAEAAAEQAAAGgEADQgEAEgFAAgEgqyAANIAAgZIA2AAQAFAAADAEQAEAEAAAEQAAAGgEADQgDAEgFAAgEgscAANQgFAAgFgEQgDgDAAgGQAAgEADgEQAFgEAFAAIA1AAQAFAAAEAEQAFAEAAAEQAAAGgFADQgEAEgFAAgEguHAANQgFAAgEgEQgEgDAAgGQAAgEAEgEQAEgEAFAAIA1AAQAGAAAEAEQAEAEAAAEQAAAGgEADQgEAEgGAAg");
	this.shape_3.setTransform(300.05,310.675);

	var maskedShapeInstanceList = [this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_11, new cjs.Rectangle(3.6,309.4,593,2.6000000000000227), null);


(lib.ClipGroup_1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EgyEAlZMAAAhKxMBkIAAAMAAABKxg");
	mask_1.setTransform(320.45,239.325);

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#D9D9D9").ss(0.8,0,1).p("EguvAfYMBdfAAAEguvAYcMBdfAAAEguvARhMBdfAAAEguvAKdMBdfAAAEguvADiMBdfAAAEguvgDhMBdfAAAEguvgKcMBdfAAAEguvgRgMBdfAAAEguvgYcMBdfAAAEguvgfXMBdfAAA");
	this.shape_2.setTransform(324.425,210.975);

	var maskedShapeInstanceList = [this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_1, new cjs.Rectangle(24.3,9.2,600.3000000000001,403.6), null);


(lib.ClipGroup_12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("EgyEAlZMAAAhKxMBkIAAAMAAABKxg");
	mask_2.setTransform(320.45,239.325);

	// Layer_3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#D9D9D9").ss(0.8,0,1).p("EguvAAAMBdfAAA");
	this.shape_4.setTransform(324.425,456.95);

	var maskedShapeInstanceList = [this.shape_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_12, new cjs.Rectangle(24.3,456,600.3000000000001,2), null);


(lib.ClipGroup_22 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask.setTransform(309.7,231.3);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape.setTransform(34.625,451.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgOAjQAEgUAKgUQAHgMAIgIIgnAAIAAgJIAxAAIAAAIQgEADgFAIQgGAJgEAIIgGARIgEAQg");
	this.shape_1.setTransform(29.225,451.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgRAfQgGgGgBgKQABgGADgFQACgEAHgCIgGgEQgEgEAAgGQAAgJAFgFQAHgGAJAAQAKAAAGAFQAGAGAAAHQAAAHgEAEQgBACgEACIAHAFQAEAFABAHQgBAKgGAHQgGAGgMAAQgJAAgIgGgAgKAFQgEADAAAHQAAAFAEAFQAEAEAGAAQAHAAAEgEQAEgDAAgHQAAgGgFgEQgEgEgGAAQgGAAgEAEgAgJgYQgDADABAFQgBAEAEADQAEAEAEAAQAGgBADgDQAEgDAAgFQgBgEgDgDQgDgEgGAAQgGAAgDAEg");
	this.shape_2.setTransform(24,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_3.setTransform(17.575,451.275);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_22, new cjs.Rectangle(13.3,445,27.2,14.199999999999989), null);


(lib.ClipGroup_21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask.setTransform(309.7,231.3);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgRAfQgGgGgBgKQABgGADgFQACgEAHgCIgGgEQgEgEAAgGQAAgJAFgFQAHgGAJAAQAKAAAGAFQAGAGAAAHQAAAHgEAEQgCACgDACIAHAFQAEAFABAHQgBAKgGAHQgGAGgMAAQgJAAgIgGgAgJAFQgFADAAAHQAAAFAEAFQAEAEAGAAQAHAAAEgEQAEgDAAgHQAAgGgFgEQgEgEgGAAQgGAAgDAEgAgJgYQgDADABAFQgBAEAEADQAEAEAEAAQAGgBADgDQAEgDAAgFQgBgEgDgDQgDgEgGAAQgGAAgDAEg");
	this.shape.setTransform(61.8,451.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgOAjQAEgUAKgUQAHgMAIgIIgnAAIAAgJIAxAAIAAAIQgEADgFAIQgGAJgEAIIgGARIgEAQg");
	this.shape_1.setTransform(55.925,451.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgQAfQgIgGAAgKQAAgGADgFQAEgEAFgCIgFgEQgEgEAAgGQAAgJAFgFQAHgGAJAAQALAAAFAFQAGAGAAAHQAAAHgDAEQgCACgFACIAIAFQAFAFAAAHQAAAKgHAHQgGAGgMAAQgJAAgHgGgAgJAFQgFADAAAHQAAAFAEAFQADAEAIAAQAFAAAFgEQAEgDAAgHQAAgGgFgEQgDgEgHAAQgFAAgEAEgAgJgYQgDADAAAFQAAAEAEADQAEAEAEAAQAGgBADgDQAEgDgBgFQAAgEgCgDQgEgEgGAAQgGAAgDAEg");
	this.shape_2.setTransform(50.7,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_3.setTransform(44.275,451.275);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_21, new cjs.Rectangle(40,445,27.200000000000003,14.199999999999989), null);


(lib.ClipGroup_20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask.setTransform(309.7,231.3);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgQAfQgHgFAAgKIAJAAQABAIAGADQADABAEAAQAHAAAEgFQAEgFAAgGQAAgIgEgEQgFgDgGAAQgEAAgEACIgFAEIgIgBIAGglIAkAAIAAAIIgeAAIgDAUIAFgCQAEgCAEAAQAKAAAHAGQAGAGAAAJQABALgHAHQgGAIgNAAQgIAAgHgFg");
	this.shape.setTransform(88.55,451.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgRAfQgGgGAAgKQAAgGADgFQACgEAHgCIgGgEQgEgEAAgGQAAgJAFgFQAHgGAJAAQALAAAFAFQAGAGAAAHQAAAHgEAEQgCACgDACIAHAFQAEAFAAAHQAAAKgGAHQgGAGgMAAQgJAAgIgGgAgKAFQgEADAAAHQAAAFAEAFQAEAEAGAAQAHAAAEgEQAEgDAAgHQAAgGgFgEQgEgEgGAAQgGAAgEAEgAgJgYQgDADABAFQAAAEADADQAEAEAEAAQAGgBADgDQAEgDAAgFQAAgEgEgDQgDgEgGAAQgGAAgDAEg");
	this.shape_1.setTransform(82.6,451.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgRAfQgGgGgBgKQAAgGAEgFQACgEAHgCIgGgEQgEgEAAgGQAAgJAFgFQAHgGAJAAQAKAAAGAFQAGAGAAAHQAAAHgEAEQgBACgFACIAIAFQAEAFABAHQgBAKgGAHQgGAGgMAAQgJAAgIgGgAgJAFQgFADAAAHQAAAFAEAFQAEAEAGAAQAGAAAFgEQAEgDAAgHQAAgGgFgEQgEgEgGAAQgGAAgDAEgAgJgYQgCADAAAFQgBAEAEADQAEAEAEAAQAGgBADgDQADgDAAgFQAAgEgDgDQgDgEgGAAQgGAAgDAEg");
	this.shape_2.setTransform(77.45,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_3.setTransform(71.025,451.275);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_20, new cjs.Rectangle(66.7,445,27.200000000000003,14.199999999999989), null);


(lib.ClipGroup_19 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask.setTransform(309.7,231.3);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgYAkQABgJADgHQADgHAKgGIAIgFIAJgFQAFgEAAgGQAAgHgEgDQgDgEgHAAQgIABgEAGQgCAEAAAHIgJAAQAAgKAEgFQAFgLAOAAQAMAAAGAGQAGAIAAAIQAAAIgHAFQgDAEgJAFIgGAEIgIAFQgEAEgCAFIAnAAIAAAJg");
	this.shape.setTransform(115.25,451.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_1.setTransform(109.275,451.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgQAfQgIgGAAgKQAAgGADgFQAEgEAFgCIgFgEQgEgEAAgGQAAgJAGgFQAFgGAKAAQALAAAFAFQAGAGAAAHQAAAHgDAEQgDACgEACIAIAFQAFAFgBAHQABAKgHAHQgGAGgMAAQgJAAgHgGgAgJAFQgFADAAAHQAAAFAEAFQADAEAIAAQAFAAAFgEQAEgDAAgHQAAgGgEgEQgEgEgHAAQgFAAgEAEgAgJgYQgDADAAAFQAAAEAEADQAEAEAEAAQAGgBADgDQADgDAAgFQAAgEgCgDQgEgEgGAAQgGAAgDAEg");
	this.shape_2.setTransform(104.15,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_3.setTransform(97.725,451.275);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_19, new cjs.Rectangle(93.4,445,27.19999999999999,14.199999999999989), null);


(lib.ClipGroup_18 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask.setTransform(309.7,231.3);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape.setTransform(141.925,451.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_1.setTransform(135.975,451.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgRAfQgGgGAAgKQAAgGACgFQAEgEAFgCIgFgEQgEgEAAgGQAAgJAGgFQAFgGAKAAQAKAAAGAFQAGAGAAAHQAAAHgEAEQgCACgDACIAHAFQAEAFAAAHQAAAKgGAHQgGAGgMAAQgJAAgIgGgAgKAFQgEADAAAHQAAAFAEAFQAEAEAGAAQAHAAAEgEQAEgDAAgHQAAgGgEgEQgFgEgGAAQgFAAgFAEgAgJgYQgCADgBAFQABAEADADQAEAEAEAAQAGgBADgDQADgDABgFQAAgEgEgDQgDgEgGAAQgGAAgDAEg");
	this.shape_2.setTransform(130.85,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_3.setTransform(124.425,451.275);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_18, new cjs.Rectangle(120.1,445,27.200000000000017,14.199999999999989), null);


(lib.ClipGroup_17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask.setTransform(309.7,231.3);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgQAdQgIgHABgSQAAgNACgJQAHgSAQAAQAMAAAEAGQAFAHAAAGIgJAAIgCgGQgEgFgGAAQgHAAgFAHQgEAHAAANQADgFAFgCQAEgCAEAAQAJAAAHAGQAGAEAAAMQAAAKgGAIQgGAHgMAAQgJAAgHgIgAgJABQgEAEAAAIQAAAGAEAFQAEAFAGAAQAHAAAEgFQADgFAAgGQAAgGgDgEQgEgFgHAAQgGABgEACg");
	this.shape.setTransform(168.75,451.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgSAZQgGgJAAgQQAAgLAEgJQAGgQAOAAQAOAAAGAMQAFAIAAAQQAAANgEAKQgHAOgOAAQgMAAgGgMgAgKgUQgEAHAAAOQAAALADAGQADAKAIAAQAHAAAEgGQAEgGAAgQQAAgMgDgIQgDgIgIAAQgHAAgEAIg");
	this.shape_1.setTransform(162.725,451.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_2.setTransform(157.575,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_3.setTransform(151.175,451.275);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_17, new cjs.Rectangle(146.9,445,27.19999999999999,14.199999999999989), null);


(lib.ClipGroup_16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask.setTransform(309.7,231.3);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgSAeQgGgHAAgKIAJAAQABAHACADQADAGAJAAQAGAAAFgEQAEgEABgGQgBgIgEgCQgFgDgHAAIgBAAIgDAAIAAgHIADAAIACAAQAEAAADgBQAGgDAAgHQAAgGgEgCQgEgEgFAAQgIABgDAGQgCACgBAHIgIAAQAAgIADgGQAGgKANAAQAKAAAHAFQAFAFABAJQgBAHgEAEQgCACgDACQAFACAEADQADAFAAAGQAAAKgHAHQgGAGgMAAQgMAAgGgHg");
	this.shape.setTransform(195.35,451.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_1.setTransform(188.975,451.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_2.setTransform(184.275,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_3.setTransform(177.875,451.275);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_16, new cjs.Rectangle(173.6,445,27.200000000000017,14.199999999999989), null);


(lib.ClipGroup_15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask.setTransform(309.7,231.3);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgSAZQgGgJAAgQQAAgLAEgJQAGgQAOAAQAOAAAGAMQAFAIAAAQQAAANgEAKQgHAOgOAAQgMAAgGgMgAgKgUQgEAHAAAOQAAALADAGQADAKAIAAQAHAAAEgGQAEgGAAgQQAAgMgDgIQgDgIgIAAQgHAAgEAIg");
	this.shape.setTransform(222.125,451.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgYAkQABgJADgHQAEgHAJgGIAJgFIAJgFQAEgEAAgGQAAgHgEgDQgDgEgHAAQgIABgEAGQgBAEgBAHIgJAAQAAgKAEgFQAFgLAOAAQANAAAFAGQAGAIAAAIQAAAIgGAFQgEAEgJAFIgGAEIgHAFQgGAEgBAFIAmAAIAAAJg");
	this.shape_1.setTransform(216.2,451.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_2.setTransform(211.025,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_3.setTransform(204.625,451.275);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_15, new cjs.Rectangle(200.3,445,27.19999999999999,14.199999999999989), null);


(lib.ClipGroup_14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask.setTransform(309.7,231.3);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgOAjQAEgUAKgUQAHgMAIgIIgnAAIAAgJIAxAAIAAAIQgEADgFAIQgGAJgEAIIgGARIgEAQg");
	this.shape.setTransform(248.925,451.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgYAkQAAgJAEgHQADgHAKgGIAJgFIAJgFQAEgEAAgGQAAgHgEgDQgEgEgGAAQgIABgEAGQgCAEAAAHIgJAAQAAgKADgFQAHgLANAAQANAAAFAGQAGAIAAAIQAAAIgHAFQgDAEgJAFIgGAEIgIAFQgEAEgBAFIAlAAIAAAJg");
	this.shape_1.setTransform(242.9,451.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_2.setTransform(237.725,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_3.setTransform(231.325,451.275);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_14, new cjs.Rectangle(227,445,27.19999999999999,14.199999999999989), null);


(lib.ClipGroup_13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask.setTransform(309.7,231.3);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AAGAkIAAgSIgeAAIAAgJIAggsIAHAAIAAAuIALAAIAAAHIgLAAIAAASgAgQALIAWAAIAAggg");
	this.shape.setTransform(275.6,451.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgSAeQgGgHAAgKIAJAAQABAHACADQADAGAJAAQAGAAAFgEQAEgEABgGQgBgIgEgCQgFgDgHAAIgBAAIgDAAIAAgHIADAAIACAAQAEAAADgBQAGgDAAgHQAAgGgEgCQgEgEgFAAQgIABgDAGQgCACgBAHIgIAAQAAgIADgGQAGgKANAAQAKAAAHAFQAFAFABAJQgBAHgEAEQgCACgDACQAFACAEADQADAFAAAGQAAAKgHAHQgGAGgMAAQgNAAgFgHg");
	this.shape_1.setTransform(269.6,451.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_2.setTransform(264.475,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_3.setTransform(258.075,451.275);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_13, new cjs.Rectangle(253.8,445,27.19999999999999,14.199999999999989), null);


(lib.ClipGroup_12_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask.setTransform(309.7,231.3);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape.setTransform(301.825,451.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AAGAkIAAgSIgfAAIAAgJIAggsIAIAAIAAAuIAKAAIAAAHIgKAAIAAASgAgQALIAWAAIAAggg");
	this.shape_1.setTransform(296.35,451.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_2.setTransform(291.175,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_3.setTransform(284.775,451.275);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_12_1, new cjs.Rectangle(280.5,445,27.19999999999999,14.199999999999989), null);


(lib.ClipGroup_11_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask.setTransform(309.7,231.3);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#595959").s().p("AgRAfQgGgGgBgKQAAgGAEgFQACgEAHgCIgGgEQgEgEAAgGQAAgJAFgFQAHgGAJAAQAKAAAGAFQAGAGAAAHQAAAHgEAEQgBACgFACIAIAFQAEAFABAHQgBAKgGAHQgGAGgMAAQgJAAgIgGgAgJAFQgFADAAAHQAAAFAEAFQAEAEAGAAQAGAAAFgEQAEgDAAgHQAAgGgFgEQgEgEgGAAQgGAAgDAEgAgJgYQgCADAAAFQgBAEAEADQAEAEAEAAQAGgBADgDQADgDAAgFQAAgEgDgDQgDgEgGAAQgGAAgDAEg");
	this.shape.setTransform(329,451.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AAGAkIAAgSIgfAAIAAgJIAhgsIAHAAIAAAuIALAAIAAAHIgLAAIAAASgAgQALIAWAAIAAggg");
	this.shape_1.setTransform(323.05,451.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_2.setTransform(317.875,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_3.setTransform(311.475,451.275);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_11_1, new cjs.Rectangle(307.2,445,27.19999999999999,14.199999999999989), null);


(lib.ClipGroup_10_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask_1.setTransform(309.7,231.3);

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#595959").s().p("AgQAfQgHgFAAgKIAJAAQAAAIAHADQADABAEAAQAHAAAEgFQAEgFAAgGQAAgIgFgEQgEgDgGAAQgEAAgEACIgFAEIgIgBIAFglIAlAAIAAAIIgeAAIgDAUIAFgCQAEgCAEAAQAKAAAHAGQAGAGAAAJQABALgHAHQgGAIgNAAQgJAAgGgFg");
	this.shape_1.setTransform(355.75,451.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgQAfQgHgFgBgKIAJAAQACAIAGADQADABAEAAQAHAAAEgFQAEgFAAgGQAAgIgFgEQgEgDgGAAQgFAAgDACIgFAEIgIgBIAFglIAkAAIAAAIIgdAAIgDAUIAFgCQAEgCAEAAQAKAAAHAGQAGAGABAJQAAALgHAHQgGAIgNAAQgJAAgGgFg");
	this.shape_2.setTransform(349.8,451.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_3.setTransform(344.625,451.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_4.setTransform(338.225,451.275);

	var maskedShapeInstanceList = [this.shape_1,this.shape_2,this.shape_3,this.shape_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_10_1, new cjs.Rectangle(333.9,445,27.200000000000045,14.199999999999989), null);


(lib.ClipGroup_9_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask_1.setTransform(309.7,231.3);

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgYAkQABgJADgHQADgHAKgGIAIgFIAJgFQAFgEAAgGQAAgHgEgDQgEgEgGAAQgIABgEAGQgBAEgBAHIgJAAQAAgKAEgFQAFgLAOAAQAMAAAGAGQAGAIAAAIQAAAIgHAFQgDAEgJAFIgGAEIgHAFQgFAEgCAFIAnAAIAAAJg");
	this.shape_2.setTransform(382.45,451.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgRAdQgGgHAAgSQAAgNACgJQAHgSAQAAQALAAAFAGQAFAHAAAGIgJAAIgCgGQgEgFgGAAQgHAAgFAHQgEAHAAANQADgFAFgCQAEgCAEAAQAJAAAHAGQAGAEAAAMQAAAKgGAIQgGAHgMAAQgJAAgIgIgAgJABQgEAEAAAIQAAAGAEAFQAEAFAGAAQAHAAAEgFQADgFAAgGQAAgGgDgEQgDgFgJAAQgFABgEACg");
	this.shape_3.setTransform(376.55,451.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_4.setTransform(371.325,451.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_5.setTransform(364.925,451.275);

	var maskedShapeInstanceList = [this.shape_2,this.shape_3,this.shape_4,this.shape_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_9_1, new cjs.Rectangle(360.6,445,27.19999999999999,14.199999999999989), null);


(lib.ClipGroup_8_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask_1.setTransform(309.7,231.3);

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_2.setTransform(409.175,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgQAdQgIgHABgSQAAgNACgJQAHgSAQAAQAMAAAEAGQAFAHAAAGIgJAAIgCgGQgEgFgGAAQgHAAgFAHQgEAHAAANQADgFAFgCQAEgCAEAAQAJAAAHAGQAHAEgBAMQABAKgHAIQgGAHgMAAQgJAAgHgIgAgJABQgEAEAAAIQAAAGAEAFQAEAFAGAAQAHAAAEgFQADgFAAgGQAAgGgDgEQgEgFgHAAQgGABgEACg");
	this.shape_3.setTransform(403.3,451.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_4.setTransform(398.075,451.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_5.setTransform(391.675,451.275);

	var maskedShapeInstanceList = [this.shape_2,this.shape_3,this.shape_4,this.shape_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_8_1, new cjs.Rectangle(387.4,445,27.200000000000045,14.199999999999989), null);


(lib.ClipGroup_7_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask_1.setTransform(309.7,231.3);

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgRAdQgGgHAAgSQAAgNACgJQAHgSAQAAQALAAAFAGQAFAHAAAGIgJAAIgCgGQgEgFgGAAQgHAAgFAHQgEAHAAANQADgFAFgCQAEgCAEAAQAJAAAHAGQAGAEAAAMQAAAKgGAIQgGAHgMAAQgJAAgIgIgAgJABQgEAEAAAIQAAAGAEAFQAEAFAGAAQAHAAAEgFQADgFAAgGQAAgGgDgEQgDgFgJAAQgFABgEACg");
	this.shape_2.setTransform(435.95,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgOAjQAEgUAKgUQAHgMAIgIIgnAAIAAgJIAxAAIAAAIQgEADgFAIQgGAJgEAIIgGARIgEAQg");
	this.shape_3.setTransform(430.025,451.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_4.setTransform(424.775,451.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_5.setTransform(418.375,451.275);

	var maskedShapeInstanceList = [this.shape_2,this.shape_3,this.shape_4,this.shape_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_7_1, new cjs.Rectangle(414.1,445,27.19999999999999,14.199999999999989), null);


(lib.ClipGroup_6_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask_1.setTransform(309.7,231.3);

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgSAeQgGgHAAgKIAJAAQABAHACADQADAGAJAAQAGAAAFgEQAFgEAAgGQAAgIgFgCQgFgDgHAAIgBAAIgDAAIAAgHIADAAIACAAQAEAAADgBQAGgDAAgHQAAgGgEgCQgEgEgEAAQgJABgDAGQgCACgBAHIgIAAQAAgIADgGQAGgKANAAQAKAAAHAFQAFAFAAAJQAAAHgEAEQgCACgDACQAGACADADQADAFAAAGQAAAKgHAHQgHAGgLAAQgNAAgFgHg");
	this.shape_2.setTransform(462.55,451.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgRAfQgGgGAAgKQAAgGADgFQADgEAFgCIgFgEQgEgEAAgGQAAgJAGgFQAFgGAKAAQAKAAAGAFQAGAGAAAHQAAAHgEAEQgCACgDACIAHAFQAEAFAAAHQAAAKgGAHQgGAGgMAAQgJAAgIgGgAgKAFQgEADAAAHQAAAFAEAFQAEAEAGAAQAHAAAEgEQAEgDAAgHQAAgGgEgEQgFgEgGAAQgFAAgFAEgAgJgYQgCADgBAFQABAEADADQAEAEAEAAQAGgBADgDQADgDABgFQAAgEgEgDQgDgEgGAAQgGAAgDAEg");
	this.shape_3.setTransform(456.65,451.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_4.setTransform(451.475,451.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_5.setTransform(445.075,451.275);

	var maskedShapeInstanceList = [this.shape_2,this.shape_3,this.shape_4,this.shape_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_6_1, new cjs.Rectangle(440.8,445,27.19999999999999,14.199999999999989), null);


(lib.ClipGroup_5_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask_1.setTransform(309.7,231.3);

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgSAZQgGgJAAgQQAAgLAEgJQAGgQAOAAQAOAAAGAMQAFAIAAAQQAAANgEAKQgHAOgOAAQgMAAgGgMgAgKgUQgEAHAAAOQAAALADAGQADAKAIAAQAHAAAEgGQAEgGAAgQQAAgMgDgIQgDgIgIAAQgHAAgEAIg");
	this.shape_2.setTransform(489.325,451.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_3.setTransform(483.375,451.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_4.setTransform(478.225,451.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_5.setTransform(471.825,451.275);

	var maskedShapeInstanceList = [this.shape_2,this.shape_3,this.shape_4,this.shape_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_5_1, new cjs.Rectangle(467.5,445,27.19999999999999,14.199999999999989), null);


(lib.ClipGroup_4_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask_1.setTransform(309.7,231.3);

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AgOAjQAEgUAKgUQAHgMAIgIIgnAAIAAgJIAxAAIAAAIQgEADgFAIQgGAJgEAIIgGARIgEAQg");
	this.shape_2.setTransform(516.125,451.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_3.setTransform(510.075,451.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgRAfQgFgFAAgJIAJAAQAAAIAGADQACABAEABQAFgBAFgFQAEgGACgQQgDAFgEACQgFACgEAAQgKAAgGgHQgGgFAAgKQAAgKAGgIQAGgHALAAQAPAAAGAPQADAHAAAMQAAAMgEAKQgGARgPAAQgKAAgGgGgAgKgXQgEAFAAAGQAAAIAEAEQADADAHAAQAFAAAEgDQAFgDAAgJQAAgIgEgDQgEgFgGAAQgGAAgEAFg");
	this.shape_4.setTransform(504.925,451.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_5.setTransform(498.525,451.275);

	var maskedShapeInstanceList = [this.shape_2,this.shape_3,this.shape_4,this.shape_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_4_1, new cjs.Rectangle(494.2,445,27.19999999999999,14.199999999999989), null);


(lib.ClipGroup_3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask_1.setTransform(309.7,231.3);

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AAGAkIAAgSIgeAAIAAgJIAfgsIAIAAIAAAuIAKAAIAAAHIgKAAIAAASgAgQALIAWAAIAAggg");
	this.shape_2.setTransform(542.8,451.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgSAZQgGgJAAgQQAAgLAEgJQAGgQAOAAQAOAAAGAMQAFAIAAAQQAAANgEAKQgHAOgOAAQgMAAgGgMgAgKgUQgEAHAAAOQAAALADAGQADAKAIAAQAHAAAEgGQAEgGAAgQQAAgMgDgIQgDgIgIAAQgHAAgEAIg");
	this.shape_3.setTransform(536.825,451.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgSAZQgGgJAAgQQAAgLAEgJQAGgQAOAAQAOAAAGAMQAFAIAAAQQAAANgEAKQgHAOgOAAQgMAAgGgMgAgKgUQgEAHAAAOQAAALADAGQADAKAIAAQAHAAAEgGQAEgGAAgQQAAgMgDgIQgDgIgIAAQgHAAgEAIg");
	this.shape_4.setTransform(531.675,451.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgYAkQABgJADgHQAEgHAJgGIAIgFIAJgFQAFgEAAgGQAAgHgEgDQgDgEgHAAQgIABgEAGQgCAEAAAHIgJAAQAAgKADgFQAGgLAOAAQAMAAAGAGQAGAIAAAIQAAAIgHAFQgDAEgJAFIgGAEIgIAFQgEAEgBAFIAmAAIAAAJg");
	this.shape_5.setTransform(525.75,451.25);

	var maskedShapeInstanceList = [this.shape_2,this.shape_3,this.shape_4,this.shape_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3_1, new cjs.Rectangle(521,445,27.200000000000045,14.199999999999989), null);


(lib.ClipGroup_2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask_1.setTransform(309.7,231.3);

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_2.setTransform(569.025,451.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_3.setTransform(563.075,451.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AgSAZQgGgJAAgQQAAgLAEgJQAGgQAOAAQAOAAAGAMQAFAIAAAQQAAANgEAKQgHAOgOAAQgMAAgGgMgAgKgUQgEAHAAAOQAAALADAGQADAKAIAAQAHAAAEgGQAEgGAAgQQAAgMgDgIQgDgIgIAAQgHAAgEAIg");
	this.shape_4.setTransform(558.375,451.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgYAkQABgJADgHQAEgHAJgGIAIgFIAJgFQAFgEAAgGQAAgHgEgDQgEgEgGAAQgIABgEAGQgBAEgBAHIgJAAQAAgKAEgFQAFgLAOAAQAMAAAGAGQAGAIAAAIQAAAIgGAFQgEAEgJAFIgGAEIgHAFQgGAEgBAFIAnAAIAAAJg");
	this.shape_5.setTransform(552.45,451.25);

	var maskedShapeInstanceList = [this.shape_2,this.shape_3,this.shape_4,this.shape_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2_1, new cjs.Rectangle(547.7,445,27.199999999999932,14.199999999999989), null);


(lib.ClipGroup_1_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("EgwYAkJMAAAhIRMBgxAAAMAAABIRg");
	mask_2.setTransform(309.7,231.3);

	// Layer_3
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#595959").s().p("AgQAfQgIgGABgKQAAgGACgFQAEgEAFgCIgFgEQgEgEAAgGQAAgJAGgFQAFgGAKAAQAKAAAGAFQAGAGAAAHQAAAHgDAEQgDACgDACIAHAFQAFAFgBAHQAAAKgGAHQgGAGgMAAQgJAAgHgGgAgKAFQgEADAAAHQAAAFAEAFQADAEAIAAQAGAAAEgEQAEgDAAgHQAAgGgEgEQgFgEgGAAQgGAAgEAEgAgJgYQgCADgBAFQABAEADADQAEAEAEAAQAGgBADgDQADgDABgFQAAgEgDgDQgEgEgGAAQgGAAgDAEg");
	this.shape_3.setTransform(596.25,451.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#595959").s().p("AADAkIAAgyIgPAAIAAgHQAJgBADgCQAEgCACgJIAHAAIAABHg");
	this.shape_4.setTransform(589.825,451.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#595959").s().p("AgSAZQgGgJAAgQQAAgLAEgJQAGgQAOAAQAOAAAGAMQAFAIAAAQQAAANgEAKQgHAOgOAAQgMAAgGgMgAgKgUQgEAHAAAOQAAALADAGQADAKAIAAQAHAAAEgGQAEgGAAgQQAAgMgDgIQgDgIgIAAQgHAAgEAIg");
	this.shape_5.setTransform(585.125,451.375);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#595959").s().p("AgYAkQABgJADgHQADgHAKgGIAIgFIAJgFQAFgEAAgGQAAgHgEgDQgEgEgGAAQgIABgEAGQgCAEAAAHIgJAAQAAgKAEgFQAFgLAOAAQAMAAAGAGQAGAIAAAIQAAAIgHAFQgDAEgJAFIgGAEIgIAFQgFAEgBAFIAnAAIAAAJg");
	this.shape_6.setTransform(579.2,451.25);

	var maskedShapeInstanceList = [this.shape_3,this.shape_4,this.shape_5,this.shape_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_2, new cjs.Rectangle(574.4,445,27.200000000000045,14.199999999999989), null);


(lib.ClipGroup_23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_3 = new cjs.Shape();
	mask_3._off = true;
	mask_3.graphics.p("EgtGAhzMAAAhDlMBaNAAAMAAABDlg");
	mask_3.setTransform(288.7,216.3);

	// Layer_3
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#28596B").ss(2.3,1,1).p("EgstAGBIAsJPIAhAAIArjFIAjjEIAisUIArJOIAimIIArAAIAiSdIArDFIAijFIArjGIAi1iIArHoIAiRqIAji8IAqryIAjC9IArF4IAiutIArLxIAil5IArOuIAil5IArDoIAiDWIAiILIAstiIAiAAIBNwDIArQUIAipPIArG+IAiQVIAro+IAivqIAiPqIAsAAIAiCSIAqmtIAikjIAs4wIAhLQIArWeIAj65IAqm1IAjdTIAikjIAruCIAjdCIAqngIAjAZIArjnIAhAAIAsjnIAiK+IAqpPIAi7SIAjpHIArFfIAie6IArB4IAiFfIArlfIAiHXIArulIAiJGIAryUIAjHWIAiq9IArK9IAipFIArjwIAhXzIArD5IAihwIArjfIAiDfIArj4IAjiBIAqE9IAjArIAiE0IArnfIAiAAIAro/IAiGCIAqIlIAjmcIArDOIAiCJIArD4IAijWIAjirIArgiIAhBmIAsGkIAilfIAqgJIAjgiIArBnIAigiIAruVIAiMdIAjisIAqhVIAjEJIAqnPIAjiJIArm0IAiC8IArITIAik0IArD4IAiBFIAihWIArBeIAiq+IAriBIAjgZIAqB4IAjK+IAqESIAjC9IArA8IBEphIArGkIAikbIArBFIAiFfIArEBIAihEIArB4IAjheIAqnYIAj5aIAid1IArAAIAimTIArEbIAiBeIAqjnIAjBvIArBfIAiAzIAri8MAAigwUMAAjA2N");
	this.shape_5.setTransform(288.7,216.75);

	var maskedShapeInstanceList = [this.shape_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_23, new cjs.Rectangle(1.5,29.8,574.5,374), null);


(lib.Tween41 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.ClipGroup_1_2();
	this.instance.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_1 = new lib.ClipGroup_2_1();
	this.instance_1.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_2 = new lib.ClipGroup_3_1();
	this.instance_2.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_3 = new lib.ClipGroup_4_1();
	this.instance_3.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_4 = new lib.ClipGroup_5_1();
	this.instance_4.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_5 = new lib.ClipGroup_6_1();
	this.instance_5.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_6 = new lib.ClipGroup_7_1();
	this.instance_6.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_7 = new lib.ClipGroup_8_1();
	this.instance_7.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_8 = new lib.ClipGroup_9_1();
	this.instance_8.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_9 = new lib.ClipGroup_10_1();
	this.instance_9.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_10 = new lib.ClipGroup_11_1();
	this.instance_10.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_11 = new lib.ClipGroup_12_1();
	this.instance_11.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_12 = new lib.ClipGroup_13();
	this.instance_12.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_13 = new lib.ClipGroup_14();
	this.instance_13.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_14 = new lib.ClipGroup_15();
	this.instance_14.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_15 = new lib.ClipGroup_16();
	this.instance_15.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_16 = new lib.ClipGroup_17();
	this.instance_16.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_17 = new lib.ClipGroup_18();
	this.instance_17.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_18 = new lib.ClipGroup_19();
	this.instance_18.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_19 = new lib.ClipGroup_20();
	this.instance_19.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_20 = new lib.ClipGroup_21();
	this.instance_20.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.instance_21 = new lib.ClipGroup_22();
	this.instance_21.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-307.4,-452,619.4,462.6);


(lib.Tween36 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// _Clip_Group__1
	this.instance = new lib.ClipGroup_1_2();
	this.instance.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:321.1},23).wait(24).to({x:175},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__2
	this.instance_1 = new lib.ClipGroup_2_1();
	this.instance_1.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:321.1},23).wait(24).to({x:175},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__3
	this.instance_2 = new lib.ClipGroup_3_1();
	this.instance_2.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({x:321.1},23).wait(24).to({x:175},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__4
	this.instance_3 = new lib.ClipGroup_4_1();
	this.instance_3.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({x:321.1},23).wait(24).to({x:175},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__5
	this.instance_4 = new lib.ClipGroup_5_1();
	this.instance_4.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({x:321.1},23).wait(24).to({x:175},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__6
	this.instance_5 = new lib.ClipGroup_6_1();
	this.instance_5.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({x:321.1},23).wait(24).to({x:175},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__7
	this.instance_6 = new lib.ClipGroup_7_1();
	this.instance_6.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({x:321.1},23).wait(24).to({x:175},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__8
	this.instance_7 = new lib.ClipGroup_8_1();
	this.instance_7.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({x:321.1},23).wait(24).to({x:175},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__9
	this.instance_8 = new lib.ClipGroup_9_1();
	this.instance_8.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({x:321.1},23).wait(24).to({x:175},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__10
	this.instance_9 = new lib.ClipGroup_10_1();
	this.instance_9.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({x:321.1},23).wait(24).to({x:175},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__11
	this.instance_10 = new lib.ClipGroup_11_1();
	this.instance_10.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({x:291.55},23).wait(24).to({x:159},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__12
	this.instance_11 = new lib.ClipGroup_12_1();
	this.instance_11.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({x:265.1},23).wait(24).to({x:144.65},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__13
	this.instance_12 = new lib.ClipGroup_13();
	this.instance_12.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).to({x:238.8},23).wait(24).to({x:130.4},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__14
	this.instance_13 = new lib.ClipGroup_14();
	this.instance_13.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).to({x:212.55},23).wait(24).to({x:116.2},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__15
	this.instance_14 = new lib.ClipGroup_15();
	this.instance_14.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).to({x:186.25},23).wait(24).to({x:101.95},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__16
	this.instance_15 = new lib.ClipGroup_16();
	this.instance_15.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).to({x:160},23).wait(24).to({x:87.7},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__17
	this.instance_16 = new lib.ClipGroup_17();
	this.instance_16.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).to({x:133.7},23).wait(24).to({x:73.5},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__18
	this.instance_17 = new lib.ClipGroup_18();
	this.instance_17.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).to({x:107.45},23).wait(24).to({x:59.25},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__19
	this.instance_18 = new lib.ClipGroup_19();
	this.instance_18.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).to({x:81.15},23).wait(24).to({x:45},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__20
	this.instance_19 = new lib.ClipGroup_20();
	this.instance_19.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).to({x:54.85},23).wait(24).to({x:30.75},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__21
	this.instance_20 = new lib.ClipGroup_21();
	this.instance_20.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).to({x:28.6},23).wait(24).to({x:16.55},11).to({_off:true},1).wait(12).to({_off:false,x:2.3},0).wait(84).to({_off:true},1).wait(12));

	// _Clip_Group__22
	this.instance_21 = new lib.ClipGroup_22();
	this.instance_21.setTransform(2.3,-220.75,1,1,0,0,0,309.7,231.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(58).to({_off:true},1).wait(12).to({_off:false},0).wait(84).to({_off:true},1).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-307.4,-452,938.1999999999999,462.6);


(lib.Tween33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween31("synched",0);
	this.instance.setTransform(-77,0);
	this.instance.filters = [new cjs.ColorFilter(0.94, 0.94, 0.94, 1, 15.3, 15.3, 15.3, 0)];
	this.instance.cache(-6,-10,13,21);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#DA6B56").ss(1,1,1).p("AsYAAIYxAA");
	this.shape.setTransform(2.25,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-81.5,-8.4,164,16.9);


(lib.Tween27 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.ClipGroup();
	this.instance.setTransform(306.6,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_1 = new lib.ClipGroup_1();
	this.instance_1.setTransform(306.6,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_2 = new lib.ClipGroup_2();
	this.instance_2.setTransform(306.6,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_3 = new lib.ClipGroup_3();
	this.instance_3.setTransform(306.6,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_4 = new lib.ClipGroup_4();
	this.instance_4.setTransform(306.6,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_5 = new lib.ClipGroup_5();
	this.instance_5.setTransform(306.6,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_6 = new lib.ClipGroup_6();
	this.instance_6.setTransform(306.6,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_7 = new lib.ClipGroup_7();
	this.instance_7.setTransform(306.6,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_8 = new lib.ClipGroup_8();
	this.instance_8.setTransform(306.6,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_9 = new lib.ClipGroup_9();
	this.instance_9.setTransform(306.6,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_10 = new lib.ClipGroup_10();
	this.instance_10.setTransform(306.6,6.1,1,1,0,0,0,320.4,239.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.8,-233.2,640.9,478.7);


(lib.Tween26 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.ClipGroup();
	this.instance.setTransform(306.55,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_1 = new lib.ClipGroup_1();
	this.instance_1.setTransform(306.55,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_2 = new lib.ClipGroup_2();
	this.instance_2.setTransform(306.55,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_3 = new lib.ClipGroup_3();
	this.instance_3.setTransform(306.55,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_4 = new lib.ClipGroup_4();
	this.instance_4.setTransform(306.55,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_5 = new lib.ClipGroup_5();
	this.instance_5.setTransform(306.55,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_6 = new lib.ClipGroup_6();
	this.instance_6.setTransform(306.55,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_7 = new lib.ClipGroup_7();
	this.instance_7.setTransform(306.55,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_8 = new lib.ClipGroup_8();
	this.instance_8.setTransform(306.55,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_9 = new lib.ClipGroup_9();
	this.instance_9.setTransform(306.55,6.1,1,1,0,0,0,320.4,239.3);

	this.instance_10 = new lib.ClipGroup_10();
	this.instance_10.setTransform(306.55,6.1,1,1,0,0,0,320.4,239.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.8,-233.2,640.9,478.7);


(lib.Tween21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.ClipGroup_12();
	this.instance.setTransform(-4,5.75,1,1,0,0,0,320.4,239.3);

	this.instance_1 = new lib.ClipGroup_1_1();
	this.instance_1.setTransform(-4,5.75,1,1,0,0,0,320.4,239.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-324.4,-233.5,640.9,478.6);


(lib.redRadar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.red("synched",0);
	this.instance.setTransform(16.8,16.8,1,1,0,0,0,8.4,8.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(23).to({startPosition:0},0).wait(1));

	// Layer_2
	this.instance_1 = new lib.red("synched",0);
	this.instance_1.setTransform(16.8,16.8,1,1,0,0,0,8.4,8.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:8.3,regY:8.3,scaleX:2.3793,scaleY:2.3793,x:16.35,y:16.35,alpha:0},23).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.4,-3.4,40.199999999999996,40.199999999999996);


(lib.circles = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// redRadar
	this.instance = new lib.redRadar();
	this.instance.setTransform(377.55,-13.55,1,1,0,0,0,16.8,16.8);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},24).to({x:510},23).wait(24).to({x:377.55},12).wait(12).to({_off:true},1).wait(14));

	// redRadar
	this.instance_1 = new lib.redRadar();
	this.instance_1.setTransform(132.85,-1.95,1,1,0,0,0,16.8,16.8);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({alpha:1},24).to({x:400.65,y:-2.5},23).wait(24).to({x:132.85,y:-1.95,alpha:0.1016},12).wait(12).to({_off:true},1).wait(14));

	// redRadar
	this.instance_2 = new lib.redRadar();
	this.instance_2.setTransform(121.25,11.35,1,1,0,0,0,16.8,16.8);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({alpha:1},24).to({x:377.7,y:3.35},23).wait(24).to({x:121.25,y:11.35,alpha:0.1016},12).wait(12).to({_off:true},1).wait(14));

	// redRadar
	this.instance_3 = new lib.redRadar();
	this.instance_3.setTransform(113.7,31.35,1,1,0,0,0,16.8,16.8);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({alpha:1},24).to({x:364.5},23).wait(24).to({x:113.7,alpha:0.1016},12).wait(12).to({_off:true},1).wait(14));

	// redRadar
	this.instance_4 = new lib.redRadar();
	this.instance_4.setTransform(79.05,-104.2,1,1,0,0,0,16.8,16.8);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({alpha:1},24).to({regX:16.9,regY:16.9,x:296.55,y:-104.85},23).wait(24).to({regX:16.8,regY:16.8,x:79.05,y:-104.2,alpha:0.1016},12).wait(12).to({_off:true},1).wait(14));

	// redRadar
	this.instance_5 = new lib.redRadar();
	this.instance_5.setTransform(40.7,19.15,1,1,0,0,0,16.8,16.8);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({alpha:1},24).to({x:223.55},23).wait(24).to({x:40.7,alpha:0.1016},12).wait(12).to({_off:true},1).wait(14));

	// redRadar
	this.instance_6 = new lib.redRadar();
	this.instance_6.setTransform(29.3,-50.35,1,1,0,0,0,16.8,16.8);
	this.instance_6.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({alpha:1},24).to({x:201.4,y:-52},23).wait(24).to({x:29.3,y:-50.35,alpha:0.1016},12).wait(12).to({_off:true},1).wait(14));

	// redRadar
	this.instance_7 = new lib.redRadar();
	this.instance_7.setTransform(12.4,-50.35,1,1,0,0,0,16.8,16.8);
	this.instance_7.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({alpha:1},24).to({x:170.9},23).wait(24).to({x:12.4,alpha:0.1016},12).wait(12).to({_off:true},1).wait(14));

	// redRadar
	this.instance_8 = new lib.redRadar();
	this.instance_8.setTransform(-33.05,31.35,1,1,0,0,0,16.8,16.8);
	this.instance_8.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({alpha:1},24).to({x:81.25,y:27.3},23).wait(24).to({x:-33.05,y:31.35,alpha:0.1016},12).wait(12).to({_off:true},1).wait(14));

	// redRadar
	this.instance_9 = new lib.redRadar();
	this.instance_9.setTransform(-73.85,31.35,1,1,0,0,0,16.8,16.8);
	this.instance_9.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({alpha:1},24).to({x:-0.8,y:26.4},23).wait(24).to({x:-73.85,y:31.35,alpha:0.1016},12).wait(12).to({_off:true},1).wait(14));

	// redRadar
	this.instance_10 = new lib.redRadar();
	this.instance_10.setTransform(-99.8,-1.95,1,1,0,0,0,16.8,16.8);
	this.instance_10.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({alpha:1},24).to({x:-52.25,y:-2.5},23).wait(24).to({x:-99.8,y:-1.95,alpha:0.1016},12).wait(12).to({_off:true},1).wait(14));

	// redRadar
	this.instance_11 = new lib.redRadar();
	this.instance_11.setTransform(-132.95,19.15,1,1,0,0,0,16.8,16.8);
	this.instance_11.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({alpha:1},24).to({x:-114.3},23).wait(24).to({x:-132.95,alpha:0.1016},12).wait(12).to({_off:true},1).wait(14));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-141.3,-113.3,659.8,153.2);


// stage content:
(lib.recession = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{label1:0,label2:24,label3:48,label4:72,label5:96,label6:120,label7:144,label8:192,label9:216,label10:240});

	this.actionFrames = [0,23,47,71,95,119,143,191,215,239,287];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		/*
		this.NextBtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.play()
		}
		
		*/
	}
	this.frame_23 = function() {
		this.stop()
	}
	this.frame_47 = function() {
		this.stop()
	}
	this.frame_71 = function() {
		this.stop()
	}
	this.frame_95 = function() {
		this.stop()
	}
	this.frame_119 = function() {
		this.stop()
	}
	this.frame_143 = function() {
		this.stop()
	}
	this.frame_191 = function() {
		this.stop()
	}
	this.frame_215 = function() {
		this.stop()
	}
	this.frame_239 = function() {
		this.stop()
	}
	this.frame_287 = function() {
		this.stop()
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(23).call(this.frame_23).wait(24).call(this.frame_47).wait(24).call(this.frame_71).wait(24).call(this.frame_95).wait(24).call(this.frame_119).wait(24).call(this.frame_143).wait(48).call(this.frame_191).wait(24).call(this.frame_215).wait(24).call(this.frame_239).wait(48).call(this.frame_287).wait(1));

	// average
	this.instance = new lib.Tween35("synched",0);
	this.instance.setTransform(355.9,136.25);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(71).to({_off:false},0).to({alpha:1},10).wait(14).to({startPosition:0},0).to({y:-68.35,alpha:0},7).to({_off:true},1).wait(185));

	// percentagesEachYear
	this.instance_1 = new lib.Tween25("synched",0);
	this.instance_1.setTransform(389.8,-62.55);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(24).to({_off:false},0).to({y:88.1,alpha:1},23).wait(10).to({startPosition:0},0).wait(14).to({startPosition:0},0).to({x:303.65,y:-76.1,alpha:0},10).to({_off:true},1).wait(206));

	// yearStart
	this.instance_2 = new lib.Tween89("synched",0);
	this.instance_2.setTransform(72,451.15);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(38).to({_off:false},0).to({x:76.35,alpha:1},9).wait(25).to({alpha:0.8984},0).to({alpha:0},9).to({_off:true},1).wait(206));

	// yearEnd
	this.instance_3 = new lib.Tween91("synched",0);
	this.instance_3.setTransform(573.7,451.15);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(38).to({_off:false},0).to({x:547.6,alpha:1},9).wait(25).to({alpha:0.8984},0).to({alpha:0},9).to({_off:true},1).wait(206));

	// percentage
	this.instance_4 = new lib.Tween96("synched",0);
	this.instance_4.setTransform(72.8,136.9);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(33).to({_off:false},0).to({alpha:1},14).wait(25).to({alpha:0.8984},0).to({alpha:0},9).to({_off:true},1).wait(206));

	// arrow2
	this.instance_5 = new lib.Tween32("synched",0);
	this.instance_5.setTransform(544.25,144.05,1,0.0525,0,0,0,0,-153.5);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(33).to({_off:false},0).to({regY:-153.7,scaleY:0.8694,alpha:1},14).to({regY:-153.8,scaleY:0.0523,y:144,alpha:0},10).to({_off:true},1).wait(230));

	// arrow
	this.instance_6 = new lib.Tween33("synched",0);
	this.instance_6.setTransform(177.15,52.85,0.0385,1,0,0,0,81.8,0);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(33).to({_off:false},0).to({regX:81.5,scaleX:0.91,x:177.1,alpha:1},14).to({regX:81.9,scaleX:0.0648,x:177.15,alpha:0},10).to({_off:true},1).wait(230));

	// lowerVolatility
	this.instance_7 = new lib.Tween38("synched",0);
	this.instance_7.setTransform(462.55,180.6);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(96).to({_off:false},0).to({alpha:1},11).wait(12).to({startPosition:0},0).to({x:467.5,y:-153.3,alpha:0},10).to({_off:true},1).wait(158));

	// shade
	this.instance_8 = new lib.shade("synched",0);
	this.instance_8.setTransform(20.95,280.3,1,0.9836,0,0,0,-150.5,0.5);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(96).to({_off:false},0).to({alpha:0.1016},23).to({startPosition:0},24).to({scaleX:1.9992,x:20.8},24).wait(24).to({startPosition:0},0).to({scaleX:1,x:20.95},12).to({_off:true},13).wait(72));

	// maskCalmCurve (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_96 = new cjs.Graphics().p("EABjAijIAAjQIAAgGIAAgOIAAg8IAAgOIAAgGIAAgUIAAgGIAAgOIAAg8IAAgOIAAgGIAAgUIAAgGIAAgOIAAg8IAAgOIAAgGIAAgUIAAgGIAAgOIAAg8IAAgOIAAgGIAAgUIAAgGIAAgOIAAg8IAAgOIAAgGIAAgUIAAgGIAAgOIAAg8IAAgOIAAgGIAAgUIAAgGIAAgOIAAg8IAAgOIAAgGIAAgUIAAgGIAAgOIAAg8IAAgOIAAgGIAAgUIAAgGIAAgOIAAg8IAAgOIAAgGIAAgUIAAgGIAAgOIAAg8IAAgOIAAgGIAAgUIAAgGIAAgOIAAg8IAAgOIAAgGIAAgUIAAgGIAAgOIAAg8IAAgOIAAgGIAAjyIA2AAIAADRIABAGIAAAOIAAA8IAAAOIgBAGIAAAUIABAGIAAAOIAAA8IAAAOIgBAGIAAAUIABAGIAAAOIAAA8IAAAOIgBAGIAAAUIABAGIAAAOIAAA8IAAAOIgBAGIAAAUIABAGIAAAOIAAA8IAAAOIgBAGIAAAUIABAGIAAAOIAAA8IAAAOIgBAGIAAAUIABAGIAAAOIAAA8IAAAOIgBAGIAAAUIABAGIAAAOIAAA8IAAAOIgBAGIAAAUIABAGIAAAOIAAA8IAAAOIgBAGIAAAUIABAGIAAAOIAAA8IAAAOIgBAGIAAAUIABAGIAAAOIAAA8IAAAOIgBAGIAAAUIABAGIAAAOIAAA8IAAAOIgBAGIAADxg");
	var mask_graphics_97 = new cjs.Graphics().p("EgCrAijIAAjQQgBAAgBgGIgCgOIAAg8IACgOQABgGABAAIAAgUQgBAAgBgGIgCgOIAAg8IACgOQABgGABAAIAAgUQgBAAgBgGIgCgOIAAg8IACgOQABgGABAAIAAgUQgBAAgBgGIgCgOIAAg8IACgOQABgGABAAIAAgUQgBAAgBgGIgCgOIAAg8IACgOQABgGABAAIAAgUQgBAAgBgGIgCgOIAAg8IACgOQABgGABAAIAAgUQgBAAgBgGIgCgOIAAg8IACgOQABgGABAAIAAgUQgBAAgBgGIgCgOIAAg8IACgOQABgGABAAIAAgUQgBAAgBgGIgCgOIAAg8IACgOQABgGABAAIAAgUQgBAAgBgGIgCgOIAAg8IACgOQABgGABAAIAAgUQgBAAgBgGIgCgOIAAg8IACgOQABgGABAAIAAgUQgBAAgBgGIgCgOIAAg8IACgOQABgGABAAIAAjyIJSAAIAADRQACAAABAGIABAOIAAA8IgBAOQgBAGgCAAIAAAUQACAAABAGIABAOIAAA8IgBAOQgBAGgCAAIAAAUQACAAABAGIABAOIAAA8IgBAOQgBAGgCAAIAAAUQACAAABAGIABAOIAAA8IgBAOQgBAGgCAAIAAAUQACAAABAGIABAOIAAA8IgBAOQgBAGgCAAIAAAUQACAAABAGIABAOIAAA8IgBAOQgBAGgCAAIAAAUQACAAABAGIABAOIAAA8IgBAOQgBAGgCAAIAAAUQACAAABAGIABAOIAAA8IgBAOQgBAGgCAAIAAAUQACAAABAGIABAOIAAA8IgBAOQgBAGgCAAIAAAUQACAAABAGIABAOIAAA8IgBAOQgBAGgCAAIAAAUQACAAABAGIABAOIAAA8IgBAOQgBAGgCAAIAAAUQACAAABAGIABAOIAAA8IgBAOQgBAGgCAAIAADxg");
	var mask_graphics_98 = new cjs.Graphics().p("EgG5AijIAAjQQgEAAgCgGQgCgGAAgIIAAg8QAAgJACgFQACgGAEAAIAAgUQgEAAgCgGQgCgGAAgIIAAg8QAAgJACgFQACgGAEAAIAAgUQgEAAgCgGQgCgGAAgIIAAg8QAAgJACgFQACgGAEAAIAAgUQgEAAgCgGQgCgGAAgIIAAg8QAAgJACgFQACgGAEAAIAAgUQgEAAgCgGQgCgGAAgIIAAg8QAAgJACgFQACgGAEAAIAAgUQgEAAgCgGQgCgGAAgIIAAg8QAAgJACgFQACgGAEAAIAAgUQgEAAgCgGQgCgGAAgIIAAg8QAAgJACgFQACgGAEAAIAAgUQgEAAgCgGQgCgGAAgIIAAg8QAAgJACgFQACgGAEAAIAAgUQgEAAgCgGQgCgGAAgIIAAg8QAAgJACgFQACgGAEAAIAAgUQgEAAgCgGQgCgGAAgIIAAg8QAAgJACgFQACgGAEAAIAAgUQgEAAgCgGQgCgGAAgIIAAg8QAAgJACgFQACgGAEAAIAAgUQgEAAgCgGQgCgGAAgIIAAg8QAAgJACgFQACgGAEAAIAAjyIRuAAIAADRQAEAAACAGQACAFAAAJIAAA8QAAAIgCAGQgCAGgEAAIAAAUQAEAAACAGQACAFAAAJIAAA8QAAAIgCAGQgCAGgEAAIAAAUQAEAAACAGQACAFAAAJIAAA8QAAAIgCAGQgCAGgEAAIAAAUQAEAAACAGQACAFAAAJIAAA8QAAAIgCAGQgCAGgEAAIAAAUQAEAAACAGQACAFAAAJIAAA8QAAAIgCAGQgCAGgEAAIAAAUQAEAAACAGQACAFAAAJIAAA8QAAAIgCAGQgCAGgEAAIAAAUQAEAAACAGQACAFAAAJIAAA8QAAAIgCAGQgCAGgEAAIAAAUQAEAAACAGQACAFAAAJIAAA8QAAAIgCAGQgCAGgEAAIAAAUQAEAAACAGQACAFAAAJIAAA8QAAAIgCAGQgCAGgEAAIAAAUQAEAAACAGQACAFAAAJIAAA8QAAAIgCAGQgCAGgEAAIAAAUQAEAAACAGQACAFAAAJIAAA8QAAAIgCAGQgCAGgEAAIAAAUQAEAAACAGQACAFAAAJIAAA8QAAAIgCAGQgCAGgEAAIAADxg");
	var mask_graphics_99 = new cjs.Graphics().p("EgLIAijIAAjQQgFAAgDgGQgEgGAAgIIAAg8QAAgJAEgFQADgGAFAAIAAgUQgFAAgDgGQgEgGAAgIIAAg8QAAgJAEgFQADgGAFAAIAAgUQgFAAgDgGQgEgGAAgIIAAg8QAAgJAEgFQADgGAFAAIAAgUQgFAAgDgGQgEgGAAgIIAAg8QAAgJAEgFQADgGAFAAIAAgUQgFAAgDgGQgEgGAAgIIAAg8QAAgJAEgFQADgGAFAAIAAgUQgFAAgDgGQgEgGAAgIIAAg8QAAgJAEgFQADgGAFAAIAAgUQgFAAgDgGQgEgGAAgIIAAg8QAAgJAEgFQADgGAFAAIAAgUQgFAAgDgGQgEgGAAgIIAAg8QAAgJAEgFQADgGAFAAIAAgUQgFAAgDgGQgEgGAAgIIAAg8QAAgJAEgFQADgGAFAAIAAgUQgFAAgDgGQgEgGAAgIIAAg8QAAgJAEgFQADgGAFAAIAAgUQgFAAgDgGQgEgGAAgIIAAg8QAAgJAEgFQADgGAFAAIAAgUQgFAAgDgGQgEgGAAgIIAAg8QAAgJAEgFQADgGAFAAIAAjyIaLAAIAADRQAFAAAEAGQADAFAAAJIAAA8QAAAIgDAGQgEAGgFAAIAAAUQAFAAAEAGQADAFAAAJIAAA8QAAAIgDAGQgEAGgFAAIAAAUQAFAAAEAGQADAFAAAJIAAA8QAAAIgDAGQgEAGgFAAIAAAUQAFAAAEAGQADAFAAAJIAAA8QAAAIgDAGQgEAGgFAAIAAAUQAFAAAEAGQADAFAAAJIAAA8QAAAIgDAGQgEAGgFAAIAAAUQAFAAAEAGQADAFAAAJIAAA8QAAAIgDAGQgEAGgFAAIAAAUQAFAAAEAGQADAFAAAJIAAA8QAAAIgDAGQgEAGgFAAIAAAUQAFAAAEAGQADAFAAAJIAAA8QAAAIgDAGQgEAGgFAAIAAAUQAFAAAEAGQADAFAAAJIAAA8QAAAIgDAGQgEAGgFAAIAAAUQAFAAAEAGQADAFAAAJIAAA8QAAAIgDAGQgEAGgFAAIAAAUQAFAAAEAGQADAFAAAJIAAA8QAAAIgDAGQgEAGgFAAIAAAUQAFAAAEAGQADAFAAAJIAAA8QAAAIgDAGQgEAGgFAAIAADxg");
	var mask_graphics_100 = new cjs.Graphics().p("EgPXAijIAAjQQgGAAgEgGQgFgGAAgIIAAg8QAAgJAFgFQAEgGAGAAIAAgUQgGAAgEgGQgFgGAAgIIAAg8QAAgJAFgFQAEgGAGAAIAAgUQgGAAgEgGQgFgGAAgIIAAg8QAAgJAFgFQAEgGAGAAIAAgUQgGAAgEgGQgFgGAAgIIAAg8QAAgJAFgFQAEgGAGAAIAAgUQgGAAgEgGQgFgGAAgIIAAg8QAAgJAFgFQAEgGAGAAIAAgUQgGAAgEgGQgFgGAAgIIAAg8QAAgJAFgFQAEgGAGAAIAAgUQgGAAgEgGQgFgGAAgIIAAg8QAAgJAFgFQAEgGAGAAIAAgUQgGAAgEgGQgFgGAAgIIAAg8QAAgJAFgFQAEgGAGAAIAAgUQgGAAgEgGQgFgGAAgIIAAg8QAAgJAFgFQAEgGAGAAIAAgUQgGAAgEgGQgFgGAAgIIAAg8QAAgJAFgFQAEgGAGAAIAAgUQgGAAgEgGQgFgGAAgIIAAg8QAAgJAFgFQAEgGAGAAIAAgUQgGAAgEgGQgFgGAAgIIAAg8QAAgJAFgFQAEgGAGAAIAAjyMAipAAAIAADRQAGAAAEAGQAFAFAAAJIAAA8QAAAIgFAGQgEAGgGAAIAAAUQAGAAAEAGQAFAFAAAJIAAA8QAAAIgFAGQgEAGgGAAIAAAUQAGAAAEAGQAFAFAAAJIAAA8QAAAIgFAGQgEAGgGAAIAAAUQAGAAAEAGQAFAFAAAJIAAA8QAAAIgFAGQgEAGgGAAIAAAUQAGAAAEAGQAFAFAAAJIAAA8QAAAIgFAGQgEAGgGAAIAAAUQAGAAAEAGQAFAFAAAJIAAA8QAAAIgFAGQgEAGgGAAIAAAUQAGAAAEAGQAFAFAAAJIAAA8QAAAIgFAGQgEAGgGAAIAAAUQAGAAAEAGQAFAFAAAJIAAA8QAAAIgFAGQgEAGgGAAIAAAUQAGAAAEAGQAFAFAAAJIAAA8QAAAIgFAGQgEAGgGAAIAAAUQAGAAAEAGQAFAFAAAJIAAA8QAAAIgFAGQgEAGgGAAIAAAUQAGAAAEAGQAFAFAAAJIAAA8QAAAIgFAGQgEAGgGAAIAAAUQAGAAAEAGQAFAFAAAJIAAA8QAAAIgFAGQgEAGgGAAIAADxg");
	var mask_graphics_101 = new cjs.Graphics().p("EgTmAijIAAjQQgIAAgFgGQgFgGAAgIIAAg8QAAgJAFgFQAFgGAIAAIAAgUQgIAAgFgGQgFgGAAgIIAAg8QAAgJAFgFQAFgGAIAAIAAgUQgIAAgFgGQgFgGAAgIIAAg8QAAgJAFgFQAFgGAIAAIAAgUQgIAAgFgGQgFgGAAgIIAAg8QAAgJAFgFQAFgGAIAAIAAgUQgIAAgFgGQgFgGAAgIIAAg8QAAgJAFgFQAFgGAIAAIAAgUQgIAAgFgGQgFgGAAgIIAAg8QAAgJAFgFQAFgGAIAAIAAgUQgIAAgFgGQgFgGAAgIIAAg8QAAgJAFgFQAFgGAIAAIAAgUQgIAAgFgGQgFgGAAgIIAAg8QAAgJAFgFQAFgGAIAAIAAgUQgIAAgFgGQgFgGAAgIIAAg8QAAgJAFgFQAFgGAIAAIAAgUQgIAAgFgGQgFgGAAgIIAAg8QAAgJAFgFQAFgGAIAAIAAgUQgIAAgFgGQgFgGAAgIIAAg8QAAgJAFgFQAFgGAIAAIAAgUQgIAAgFgGQgFgGAAgIIAAg8QAAgJAFgFQAFgGAIAAIAAjyMArGAAAIAADRQAIAAAFAGQAFAFAAAJIAAA8QAAAIgFAGQgFAGgIAAIAAAUQAIAAAFAGQAFAFAAAJIAAA8QAAAIgFAGQgFAGgIAAIAAAUQAIAAAFAGQAFAFAAAJIAAA8QAAAIgFAGQgFAGgIAAIAAAUQAIAAAFAGQAFAFAAAJIAAA8QAAAIgFAGQgFAGgIAAIAAAUQAIAAAFAGQAFAFAAAJIAAA8QAAAIgFAGQgFAGgIAAIAAAUQAIAAAFAGQAFAFAAAJIAAA8QAAAIgFAGQgFAGgIAAIAAAUQAIAAAFAGQAFAFAAAJIAAA8QAAAIgFAGQgFAGgIAAIAAAUQAIAAAFAGQAFAFAAAJIAAA8QAAAIgFAGQgFAGgIAAIAAAUQAIAAAFAGQAFAFAAAJIAAA8QAAAIgFAGQgFAGgIAAIAAAUQAIAAAFAGQAFAFAAAJIAAA8QAAAIgFAGQgFAGgIAAIAAAUQAIAAAFAGQAFAFAAAJIAAA8QAAAIgFAGQgFAGgIAAIAAAUQAIAAAFAGQAFAFAAAJIAAA8QAAAIgFAGQgFAGgIAAIAADxg");
	var mask_graphics_102 = new cjs.Graphics().p("EgX0AijIAAjQQgKAAgGgGQgHgGAAgIIAAg8QAAgJAHgFQAGgGAKAAIAAgUQgKAAgGgGQgHgGAAgIIAAg8QAAgJAHgFQAGgGAKAAIAAgUQgKAAgGgGQgHgGAAgIIAAg8QAAgJAHgFQAGgGAKAAIAAgUQgKAAgGgGQgHgGAAgIIAAg8QAAgJAHgFQAGgGAKAAIAAgUQgKAAgGgGQgHgGAAgIIAAg8QAAgJAHgFQAGgGAKAAIAAgUQgKAAgGgGQgHgGAAgIIAAg8QAAgJAHgFQAGgGAKAAIAAgUQgKAAgGgGQgHgGAAgIIAAg8QAAgJAHgFQAGgGAKAAIAAgUQgKAAgGgGQgHgGAAgIIAAg8QAAgJAHgFQAGgGAKAAIAAgUQgKAAgGgGQgHgGAAgIIAAg8QAAgJAHgFQAGgGAKAAIAAgUQgKAAgGgGQgHgGAAgIIAAg8QAAgJAHgFQAGgGAKAAIAAgUQgKAAgGgGQgHgGAAgIIAAg8QAAgJAHgFQAGgGAKAAIAAgUQgKAAgGgGQgHgGAAgIIAAg8QAAgJAHgFQAGgGAKAAIAAjyMAziAAAIAADRQAJAAAHAGQAGAFAAAJIAAA8QAAAIgGAGQgHAGgJAAIAAAUQAJAAAHAGQAGAFAAAJIAAA8QAAAIgGAGQgHAGgJAAIAAAUQAJAAAHAGQAGAFAAAJIAAA8QAAAIgGAGQgHAGgJAAIAAAUQAJAAAHAGQAGAFAAAJIAAA8QAAAIgGAGQgHAGgJAAIAAAUQAJAAAHAGQAGAFAAAJIAAA8QAAAIgGAGQgHAGgJAAIAAAUQAJAAAHAGQAGAFAAAJIAAA8QAAAIgGAGQgHAGgJAAIAAAUQAJAAAHAGQAGAFAAAJIAAA8QAAAIgGAGQgHAGgJAAIAAAUQAJAAAHAGQAGAFAAAJIAAA8QAAAIgGAGQgHAGgJAAIAAAUQAJAAAHAGQAGAFAAAJIAAA8QAAAIgGAGQgHAGgJAAIAAAUQAJAAAHAGQAGAFAAAJIAAA8QAAAIgGAGQgHAGgJAAIAAAUQAJAAAHAGQAGAFAAAJIAAA8QAAAIgGAGQgHAGgJAAIAAAUQAJAAAHAGQAGAFAAAJIAAA8QAAAIgGAGQgHAGgJAAIAADxg");
	var mask_graphics_103 = new cjs.Graphics().p("EgcDAijIAAjQQgLAAgHgGQgIgGAAgIIAAg8QAAgJAIgFQAHgGALAAIAAgUQgLAAgHgGQgIgGAAgIIAAg8QAAgJAIgFQAHgGALAAIAAgUQgLAAgHgGQgIgGAAgIIAAg8QAAgJAIgFQAHgGALAAIAAgUQgLAAgHgGQgIgGAAgIIAAg8QAAgJAIgFQAHgGALAAIAAgUQgLAAgHgGQgIgGAAgIIAAg8QAAgJAIgFQAHgGALAAIAAgUQgLAAgHgGQgIgGAAgIIAAg8QAAgJAIgFQAHgGALAAIAAgUQgLAAgHgGQgIgGAAgIIAAg8QAAgJAIgFQAHgGALAAIAAgUQgLAAgHgGQgIgGAAgIIAAg8QAAgJAIgFQAHgGALAAIAAgUQgLAAgHgGQgIgGAAgIIAAg8QAAgJAIgFQAHgGALAAIAAgUQgLAAgHgGQgIgGAAgIIAAg8QAAgJAIgFQAHgGALAAIAAgUQgLAAgHgGQgIgGAAgIIAAg8QAAgJAIgFQAHgGALAAIAAgUQgLAAgHgGQgIgGAAgIIAAg8QAAgJAIgFQAHgGALAAIAAjyMA7/AAAIAADRQALAAAIAGQAHAFAAAJIAAA8QAAAIgHAGQgIAGgLAAIAAAUQALAAAIAGQAHAFAAAJIAAA8QAAAIgHAGQgIAGgLAAIAAAUQALAAAIAGQAHAFAAAJIAAA8QAAAIgHAGQgIAGgLAAIAAAUQALAAAIAGQAHAFAAAJIAAA8QAAAIgHAGQgIAGgLAAIAAAUQALAAAIAGQAHAFAAAJIAAA8QAAAIgHAGQgIAGgLAAIAAAUQALAAAIAGQAHAFAAAJIAAA8QAAAIgHAGQgIAGgLAAIAAAUQALAAAIAGQAHAFAAAJIAAA8QAAAIgHAGQgIAGgLAAIAAAUQALAAAIAGQAHAFAAAJIAAA8QAAAIgHAGQgIAGgLAAIAAAUQALAAAIAGQAHAFAAAJIAAA8QAAAIgHAGQgIAGgLAAIAAAUQALAAAIAGQAHAFAAAJIAAA8QAAAIgHAGQgIAGgLAAIAAAUQALAAAIAGQAHAFAAAJIAAA8QAAAIgHAGQgIAGgLAAIAAAUQALAAAIAGQAHAFAAAJIAAA8QAAAIgHAGQgIAGgLAAIAADxg");
	var mask_graphics_104 = new cjs.Graphics().p("EggSAijIAAjQQgMAAgJgGQgJgGAAgIIAAg8QAAgJAJgFQAJgGAMAAIAAgUQgMAAgJgGQgJgGAAgIIAAg8QAAgJAJgFQAJgGAMAAIAAgUQgMAAgJgGQgJgGAAgIIAAg8QAAgJAJgFQAJgGAMAAIAAgUQgMAAgJgGQgJgGAAgIIAAg8QAAgJAJgFQAJgGAMAAIAAgUQgMAAgJgGQgJgGAAgIIAAg8QAAgJAJgFQAJgGAMAAIAAgUQgMAAgJgGQgJgGAAgIIAAg8QAAgJAJgFQAJgGAMAAIAAgUQgMAAgJgGQgJgGAAgIIAAg8QAAgJAJgFQAJgGAMAAIAAgUQgMAAgJgGQgJgGAAgIIAAg8QAAgJAJgFQAJgGAMAAIAAgUQgMAAgJgGQgJgGAAgIIAAg8QAAgJAJgFQAJgGAMAAIAAgUQgMAAgJgGQgJgGAAgIIAAg8QAAgJAJgFQAJgGAMAAIAAgUQgMAAgJgGQgJgGAAgIIAAg8QAAgJAJgFQAJgGAMAAIAAgUQgMAAgJgGQgJgGAAgIIAAg8QAAgJAJgFQAJgGAMAAIAAjyMBEcAAAIAADRQANAAAJAGQAIAFAAAJIAAA8QAAAIgIAGQgJAGgNAAIAAAUQANAAAJAGQAIAFAAAJIAAA8QAAAIgIAGQgJAGgNAAIAAAUQANAAAJAGQAIAFAAAJIAAA8QAAAIgIAGQgJAGgNAAIAAAUQANAAAJAGQAIAFAAAJIAAA8QAAAIgIAGQgJAGgNAAIAAAUQANAAAJAGQAIAFAAAJIAAA8QAAAIgIAGQgJAGgNAAIAAAUQANAAAJAGQAIAFAAAJIAAA8QAAAIgIAGQgJAGgNAAIAAAUQANAAAJAGQAIAFAAAJIAAA8QAAAIgIAGQgJAGgNAAIAAAUQANAAAJAGQAIAFAAAJIAAA8QAAAIgIAGQgJAGgNAAIAAAUQANAAAJAGQAIAFAAAJIAAA8QAAAIgIAGQgJAGgNAAIAAAUQANAAAJAGQAIAFAAAJIAAA8QAAAIgIAGQgJAGgNAAIAAAUQANAAAJAGQAIAFAAAJIAAA8QAAAIgIAGQgJAGgNAAIAAAUQANAAAJAGQAIAFAAAJIAAA8QAAAIgIAGQgJAGgNAAIAADxg");
	var mask_graphics_105 = new cjs.Graphics().p("EgkhAijIAAjQQgOAAgJgGQgKgGAAgIIAAg8QAAgJAKgFQAJgGAOAAIAAgUQgOAAgJgGQgKgGAAgIIAAg8QAAgJAKgFQAJgGAOAAIAAgUQgOAAgJgGQgKgGAAgIIAAg8QAAgJAKgFQAJgGAOAAIAAgUQgOAAgJgGQgKgGAAgIIAAg8QAAgJAKgFQAJgGAOAAIAAgUQgOAAgJgGQgKgGAAgIIAAg8QAAgJAKgFQAJgGAOAAIAAgUQgOAAgJgGQgKgGAAgIIAAg8QAAgJAKgFQAJgGAOAAIAAgUQgOAAgJgGQgKgGAAgIIAAg8QAAgJAKgFQAJgGAOAAIAAgUQgOAAgJgGQgKgGAAgIIAAg8QAAgJAKgFQAJgGAOAAIAAgUQgOAAgJgGQgKgGAAgIIAAg8QAAgJAKgFQAJgGAOAAIAAgUQgOAAgJgGQgKgGAAgIIAAg8QAAgJAKgFQAJgGAOAAIAAgUQgOAAgJgGQgKgGAAgIIAAg8QAAgJAKgFQAJgGAOAAIAAgUQgOAAgJgGQgKgGAAgIIAAg8QAAgJAKgFQAJgGAOAAIAAjyMBM5AAAIAADRQAOAAAKAGQAKAFAAAJIAAA8QAAAIgKAGQgKAGgOAAIAAAUQAOAAAKAGQAKAFAAAJIAAA8QAAAIgKAGQgKAGgOAAIAAAUQAOAAAKAGQAKAFAAAJIAAA8QAAAIgKAGQgKAGgOAAIAAAUQAOAAAKAGQAKAFAAAJIAAA8QAAAIgKAGQgKAGgOAAIAAAUQAOAAAKAGQAKAFAAAJIAAA8QAAAIgKAGQgKAGgOAAIAAAUQAOAAAKAGQAKAFAAAJIAAA8QAAAIgKAGQgKAGgOAAIAAAUQAOAAAKAGQAKAFAAAJIAAA8QAAAIgKAGQgKAGgOAAIAAAUQAOAAAKAGQAKAFAAAJIAAA8QAAAIgKAGQgKAGgOAAIAAAUQAOAAAKAGQAKAFAAAJIAAA8QAAAIgKAGQgKAGgOAAIAAAUQAOAAAKAGQAKAFAAAJIAAA8QAAAIgKAGQgKAGgOAAIAAAUQAOAAAKAGQAKAFAAAJIAAA8QAAAIgKAGQgKAGgOAAIAAAUQAOAAAKAGQAKAFAAAJIAAA8QAAAIgKAGQgKAGgOAAIAADxg");
	var mask_graphics_106 = new cjs.Graphics().p("EgovAijIAAjQQgQAAgKgGQgLgGAAgIIAAg8QAAgJALgFQAKgGAQAAIAAgUQgQAAgKgGQgLgGAAgIIAAg8QAAgJALgFQAKgGAQAAIAAgUQgQAAgKgGQgLgGAAgIIAAg8QAAgJALgFQAKgGAQAAIAAgUQgQAAgKgGQgLgGAAgIIAAg8QAAgJALgFQAKgGAQAAIAAgUQgQAAgKgGQgLgGAAgIIAAg8QAAgJALgFQAKgGAQAAIAAgUQgQAAgKgGQgLgGAAgIIAAg8QAAgJALgFQAKgGAQAAIAAgUQgQAAgKgGQgLgGAAgIIAAg8QAAgJALgFQAKgGAQAAIAAgUQgQAAgKgGQgLgGAAgIIAAg8QAAgJALgFQAKgGAQAAIAAgUQgQAAgKgGQgLgGAAgIIAAg8QAAgJALgFQAKgGAQAAIAAgUQgQAAgKgGQgLgGAAgIIAAg8QAAgJALgFQAKgGAQAAIAAgUQgQAAgKgGQgLgGAAgIIAAg8QAAgJALgFQAKgGAQAAIAAgUQgQAAgKgGQgLgGAAgIIAAg8QAAgJALgFQAKgGAQAAIAAjyMBVVAAAIAADRQAQAAALAGQAKAFAAAJIAAA8QAAAIgKAGQgLAGgQAAIAAAUQAQAAALAGQAKAFAAAJIAAA8QAAAIgKAGQgLAGgQAAIAAAUQAQAAALAGQAKAFAAAJIAAA8QAAAIgKAGQgLAGgQAAIAAAUQAQAAALAGQAKAFAAAJIAAA8QAAAIgKAGQgLAGgQAAIAAAUQAQAAALAGQAKAFAAAJIAAA8QAAAIgKAGQgLAGgQAAIAAAUQAQAAALAGQAKAFAAAJIAAA8QAAAIgKAGQgLAGgQAAIAAAUQAQAAALAGQAKAFAAAJIAAA8QAAAIgKAGQgLAGgQAAIAAAUQAQAAALAGQAKAFAAAJIAAA8QAAAIgKAGQgLAGgQAAIAAAUQAQAAALAGQAKAFAAAJIAAA8QAAAIgKAGQgLAGgQAAIAAAUQAQAAALAGQAKAFAAAJIAAA8QAAAIgKAGQgLAGgQAAIAAAUQAQAAALAGQAKAFAAAJIAAA8QAAAIgKAGQgLAGgQAAIAAAUQAQAAALAGQAKAFAAAJIAAA8QAAAIgKAGQgLAGgQAAIAADxg");
	var mask_graphics_107 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_108 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_109 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_110 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_111 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_112 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_113 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_114 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_115 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_116 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_117 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_118 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_119 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_120 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_121 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_122 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_123 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_124 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_125 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_126 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_127 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_128 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");
	var mask_graphics_129 = new cjs.Graphics().p("EgteAijIAAjQQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAgUQgRAAgMgGQgMgGAAgIIAAg8QAAgJAMgFQAMgGARAAIAAjyMBdyAAAIAADRQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAAAUQASAAAMAGQALAFAAAJIAAA8QAAAIgLAGQgMAGgSAAIAADxg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(96).to({graphics:mask_graphics_96,x:15.3687,y:221.125}).wait(1).to({graphics:mask_graphics_97,x:42.7234,y:221.125}).wait(1).to({graphics:mask_graphics_98,x:70.1042,y:221.125}).wait(1).to({graphics:mask_graphics_99,x:97.4839,y:221.125}).wait(1).to({graphics:mask_graphics_100,x:124.8648,y:221.125}).wait(1).to({graphics:mask_graphics_101,x:152.2457,y:221.125}).wait(1).to({graphics:mask_graphics_102,x:179.6265,y:221.125}).wait(1).to({graphics:mask_graphics_103,x:207.0074,y:221.125}).wait(1).to({graphics:mask_graphics_104,x:234.3882,y:221.125}).wait(1).to({graphics:mask_graphics_105,x:261.7679,y:221.125}).wait(1).to({graphics:mask_graphics_106,x:289.1488,y:221.125}).wait(1).to({graphics:mask_graphics_107,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_108,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_109,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_110,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_111,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_112,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_113,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_114,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_115,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_116,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_117,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_118,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_119,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_120,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_121,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_122,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_123,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_124,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_125,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_126,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_127,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_128,x:313.3308,y:221.125}).wait(1).to({graphics:mask_graphics_129,x:313.3308,y:221.125}).wait(159));

	// calmCurve
	this.instance_9 = new lib.Tween109("synched",0);
	this.instance_9.setTransform(327.3,334.4);
	this.instance_9._off = true;

	var maskedShapeInstanceList = [this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(96).to({_off:false},0).wait(23).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(158));

	// line50
	this.instance_10 = new lib.lineGreen("synched",0);
	this.instance_10.setTransform(324.4,465.55);
	this.instance_10.alpha = 0.1797;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(120).to({_off:false},0).to({y:247.95,alpha:1},23).wait(24).to({startPosition:0},0).wait(24).to({startPosition:0},0).wait(24).to({startPosition:0},0).to({_off:true},1).wait(72));

	// shade50
	this.instance_11 = new lib.GreenShade("synched",0);
	this.instance_11.setTransform(324.4,471.35,1,0.0286,0,0,0,5.7,111.9);
	this.instance_11.alpha = 0.0586;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(120).to({_off:false},0).to({scaleY:1},23).wait(24).to({startPosition:0},0).wait(24).to({startPosition:0},0).wait(24).to({startPosition:0},0).to({_off:true},1).wait(72));

	// largeScale
	this.instance_12 = new lib.largeScale("synched",0);
	this.instance_12.setTransform(388.8,85.55);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(120).to({_off:false},0).to({alpha:1},23).to({y:-92.25},10).to({_off:true},1).wait(134));

	// circles
	this.instance_13 = new lib.circles("synched",0);
	this.instance_13.setTransform(178.65,210.1);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(120).to({_off:false},0).to({_off:true},96).wait(72));

	// only1
	this.instance_14 = new lib.Tween108("synched",0);
	this.instance_14.setTransform(482.1,200.35);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.instance_15 = new lib.Tween110("synched",0);
	this.instance_15.setTransform(482.1,200.35);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(120).to({_off:false},0).to({_off:true,alpha:1},23).wait(145));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(120).to({_off:false},23).to({alpha:0},10).to({_off:true},1).wait(134));

	// HigherConcentrated_in_the_Past
	this.instance_16 = new lib.Tween67("synched",0);
	this.instance_16.setTransform(201.6,-92.7);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(167).to({_off:false},0).to({y:49},11,cjs.Ease.quartOut).wait(13).to({startPosition:0},0).to({y:-52.95},10).to({_off:true},1).wait(86));

	// wwi
	this.instance_17 = new lib.Tween57("synched",0);
	this.instance_17.setTransform(370.8,190.65);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.instance_18 = new lib.Tween58("synched",0);
	this.instance_18.setTransform(370.8,190.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_17}]},167).to({state:[{t:this.instance_18}]},24).to({state:[]},1).wait(96));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(167).to({_off:false},0).to({_off:true,alpha:1},24).wait(97));

	// GreatDep
	this.instance_19 = new lib.Tween59("synched",0);
	this.instance_19.setTransform(471.35,77.65);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.instance_20 = new lib.Tween60("synched",0);
	this.instance_20.setTransform(471.35,77.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_19}]},167).to({state:[{t:this.instance_20}]},24).to({state:[]},1).wait(96));
	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(167).to({_off:false},0).to({_off:true,alpha:1},24).wait(97));

	// early90
	this.instance_21 = new lib.Tween61("synched",0);
	this.instance_21.setTransform(179.2,194.55);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	this.instance_22 = new lib.Tween62("synched",0);
	this.instance_22.setTransform(179.2,194.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_21}]},167).to({state:[{t:this.instance_22}]},24).to({state:[]},1).wait(96));
	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(167).to({_off:false},0).to({_off:true,alpha:1},24).wait(97));

	// longDep
	this.instance_23 = new lib.Tween63("synched",0);
	this.instance_23.setTransform(128.5,171.85);
	this.instance_23.alpha = 0;
	this.instance_23._off = true;

	this.instance_24 = new lib.Tween64("synched",0);
	this.instance_24.setTransform(128.5,171.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_23}]},167).to({state:[{t:this.instance_24}]},24).to({state:[]},1).wait(96));
	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(167).to({_off:false},0).to({_off:true,alpha:1},24).wait(97));

	// wwii
	this.instance_25 = new lib.Tween65("synched",0);
	this.instance_25.setTransform(568.75,190.7);
	this.instance_25.alpha = 0;
	this.instance_25._off = true;

	this.instance_26 = new lib.Tween66("synched",0);
	this.instance_26.setTransform(568.75,190.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_25}]},167).to({state:[{t:this.instance_26}]},24).to({state:[]},1).wait(96));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(167).to({_off:false},0).to({_off:true,alpha:1},24).wait(97));

	// exception
	this.instance_27 = new lib.Tween111("synched",0);
	this.instance_27.setTransform(449.85,-44.6);
	this.instance_27.alpha = 0;
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(192).to({_off:false},0).to({x:445.3,y:47.35,alpha:1},8).wait(16).to({startPosition:0},0).to({alpha:0},8).wait(64));

	// Global
	this.instance_28 = new lib.Tween68("synched",0);
	this.instance_28.setTransform(413.3,224.4);
	this.instance_28.alpha = 0;
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(192).to({_off:false},0).to({x:425.15,y:145.8,alpha:1},8).wait(16).to({startPosition:0},0).to({x:475.65,y:153.7,alpha:0},8).to({_off:true},1).wait(63));

	// circlePandemic
	this.instance_29 = new lib.redRadar("synched",0);
	this.instance_29.setTransform(574.25,394.05,1,1,0,0,0,16.7,16.7);
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(216).to({_off:false},0).wait(1).to({scaleX:1.0364,scaleY:1.0364,x:577.4,y:381.4,startPosition:1},0).wait(1).to({scaleX:1.0579,scaleY:1.0579,x:579.25,y:374,startPosition:2},0).wait(1).to({scaleX:1.0721,scaleY:1.0721,x:580.9,y:374.15,startPosition:3},0).wait(1).to({scaleX:1.086,scaleY:1.086,x:582.85,y:378.7,startPosition:4},0).wait(1).to({scaleX:1.1064,scaleY:1.1064,x:585.75,y:385.35,startPosition:5},0).wait(1).to({scaleX:1.1408,scaleY:1.1408,x:590.35,y:392.65,startPosition:6},0).wait(1).to({scaleX:1.1916,scaleY:1.1916,x:594.8,y:375.15,startPosition:7},0).wait(1).to({scaleX:1.2524,scaleY:1.2524,x:594.95,y:353.45,startPosition:8},0).wait(1).to({scaleX:1.3226,scaleY:1.3226,x:595.15,y:328.4,startPosition:9},0).wait(1).to({scaleX:1.4003,scaleY:1.4003,x:595.35,y:300.7,startPosition:10},0).wait(1).to({scaleX:1.4819,scaleY:1.4819,x:595.6,y:271.6,startPosition:11},0).wait(1).to({scaleX:1.5631,scaleY:1.5631,x:595.8,y:242.65,startPosition:12},0).wait(1).to({scaleX:1.64,scaleY:1.64,x:596.05,y:215.25,startPosition:13},0).wait(1).to({scaleX:1.7098,scaleY:1.7098,x:596.2,y:190.3,startPosition:14},0).wait(1).to({scaleX:1.771,scaleY:1.771,x:596.4,y:168.5,startPosition:15},0).wait(1).to({scaleX:1.8206,scaleY:1.8206,x:596.5,y:150.8,startPosition:16},0).wait(1).to({scaleX:1.8622,scaleY:1.8622,x:596.65,y:135.95,startPosition:17},0).wait(1).to({scaleX:1.8992,scaleY:1.8992,x:596.7,y:122.75,startPosition:18},0).wait(1).to({scaleX:1.9337,scaleY:1.9337,x:596.85,y:110.5,startPosition:19},0).wait(1).to({scaleX:1.9673,scaleY:1.9673,x:596.9,y:98.45,startPosition:20},0).wait(1).to({scaleX:2.0017,scaleY:2.0017,x:597.05,y:86.2,startPosition:21},0).wait(1).to({scaleX:2.0387,scaleY:2.0387,x:597.1,y:73,startPosition:22},0).wait(1).to({scaleX:2.0814,scaleY:2.0814,x:597.5,y:57.8,startPosition:0},0).wait(48).to({startPosition:0},0).wait(1));

	// covidnumber
	this.instance_30 = new lib.Tween84("synched",0);
	this.instance_30.setTransform(487.75,93.65);
	this.instance_30.alpha = 0;
	this.instance_30._off = true;

	this.instance_31 = new lib.Tween85("synched",0);
	this.instance_31.setTransform(487.75,86.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_30}]},216).to({state:[{t:this.instance_31}]},23).to({state:[{t:this.instance_31}]},48).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(216).to({_off:false},0).to({_off:true,y:86.15,alpha:1},23).wait(49));

	// Pandemic
	this.instance_32 = new lib.Tween72("synched",0);
	this.instance_32.setTransform(473.5,-41.8);
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(216).to({_off:false},0).to({x:472.95,y:71.25},23,cjs.Ease.quartOut).wait(48).to({startPosition:0},0).wait(1));

	// willenter
	this.instance_33 = new lib.Tween86("synched",0);
	this.instance_33.setTransform(213,145.2);
	this.instance_33.alpha = 0;
	this.instance_33._off = true;

	this.instance_34 = new lib.Tween87("synched",0);
	this.instance_34.setTransform(478.7,145.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_33}]},216).to({state:[{t:this.instance_34}]},23).to({state:[{t:this.instance_34}]},48).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(216).to({_off:false},0).to({_off:true,x:478.7,alpha:1},23).wait(49));

	// line
	this.instance_35 = new lib.Tween83("synched",0);
	this.instance_35.setTransform(586.55,70.65,0.0186,1,0,0,0,134.5,0);
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(216).to({_off:false},0).to({scaleX:1,x:586.5},23).wait(48).to({startPosition:0},0).wait(1));

	// GreatDep
	this.instance_36 = new lib.Tween78("synched",0);
	this.instance_36.setTransform(216.9,74.3);
	this.instance_36.alpha = 0;
	this.instance_36._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(263).to({_off:false},0).to({alpha:1},11).wait(13).to({startPosition:0},0).wait(1));

	// WWi
	this.instance_37 = new lib.Tween79("synched",0);
	this.instance_37.setTransform(229.95,190.7);
	this.instance_37.alpha = 0;
	this.instance_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(251).to({_off:false},0).to({alpha:1},12).wait(24).to({startPosition:0},0).wait(1));

	// WWii
	this.instance_38 = new lib.Tween80("synched",0);
	this.instance_38.setTransform(320.15,214.3);
	this.instance_38.alpha = 0;
	this.instance_38._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(251).to({_off:false},0).to({alpha:1},12).wait(24).to({startPosition:0},0).wait(1));

	// Gfc
	this.instance_39 = new lib.Tween81("synched",0);
	this.instance_39.setTransform(369.9,261.85);
	this.instance_39.alpha = 0;
	this.instance_39._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(240).to({_off:false},0).to({alpha:1},11).wait(36).to({startPosition:0},0).wait(1));

	// readmore
	this.instance_40 = new lib.Tween104("synched",0);
	this.instance_40.setTransform(283.25,214.6);
	this.instance_40.alpha = 0;
	this.instance_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(287).to({_off:false},0).wait(1));

	// Layer_34 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_0 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_1 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_2 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_3 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_4 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_5 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_6 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_7 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_8 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_9 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_10 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_11 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_12 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_13 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_14 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_15 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_16 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_17 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_18 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_19 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_20 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_21 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_22 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_23 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_24 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_25 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_26 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_27 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_28 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_29 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_30 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_31 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_32 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_33 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_34 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_35 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_36 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_37 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_38 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_39 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_40 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_41 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_42 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_43 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_44 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_45 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_46 = new cjs.Graphics().p("EgurAdiMAAAg7EMBdXAAAMAAAA7Eg");
	var mask_1_graphics_47 = new cjs.Graphics().p("AgwdiMAAAg7DIBhAAMAAAA7Dg");
	var mask_1_graphics_48 = new cjs.Graphics().p("AipdiMAAAg7DIFTAAMAAAA7Dg");
	var mask_1_graphics_49 = new cjs.Graphics().p("AkidiMAAAg7DIJFAAMAAAA7Dg");
	var mask_1_graphics_50 = new cjs.Graphics().p("AmcdiMAAAg7DIM5AAMAAAA7Dg");
	var mask_1_graphics_51 = new cjs.Graphics().p("AoVdiMAAAg7DIQrAAMAAAA7Dg");
	var mask_1_graphics_52 = new cjs.Graphics().p("AqOdiMAAAg7DIUdAAMAAAA7Dg");
	var mask_1_graphics_53 = new cjs.Graphics().p("AsHdiMAAAg7DIYPAAMAAAA7Dg");
	var mask_1_graphics_54 = new cjs.Graphics().p("AuBdiMAAAg7DIcDAAMAAAA7Dg");
	var mask_1_graphics_55 = new cjs.Graphics().p("Av6diMAAAg7DIf1AAMAAAA7Dg");
	var mask_1_graphics_56 = new cjs.Graphics().p("AxzdiMAAAg7DMAjnAAAMAAAA7Dg");
	var mask_1_graphics_57 = new cjs.Graphics().p("AzsdiMAAAg7DMAnZAAAMAAAA7Dg");
	var mask_1_graphics_58 = new cjs.Graphics().p("A1mdiMAAAg7DMArNAAAMAAAA7Dg");
	var mask_1_graphics_59 = new cjs.Graphics().p("A3fdiMAAAg7DMAu/AAAMAAAA7Dg");
	var mask_1_graphics_60 = new cjs.Graphics().p("A5YdiMAAAg7DMAyxAAAMAAAA7Dg");
	var mask_1_graphics_61 = new cjs.Graphics().p("A7RdiMAAAg7DMA2jAAAMAAAA7Dg");
	var mask_1_graphics_62 = new cjs.Graphics().p("A9LdiMAAAg7DMA6XAAAMAAAA7Dg");
	var mask_1_graphics_63 = new cjs.Graphics().p("A/EdiMAAAg7DMA+JAAAMAAAA7Dg");
	var mask_1_graphics_64 = new cjs.Graphics().p("Egg9AdiMAAAg7DMBB7AAAMAAAA7Dg");
	var mask_1_graphics_65 = new cjs.Graphics().p("Egi2AdiMAAAg7DMBFtAAAMAAAA7Dg");
	var mask_1_graphics_66 = new cjs.Graphics().p("EgkwAdiMAAAg7DMBJhAAAMAAAA7Dg");
	var mask_1_graphics_67 = new cjs.Graphics().p("EgmpAdiMAAAg7DMBNTAAAMAAAA7Dg");
	var mask_1_graphics_68 = new cjs.Graphics().p("EgoiAdiMAAAg7DMBRFAAAMAAAA7Dg");
	var mask_1_graphics_69 = new cjs.Graphics().p("EgqbAdiMAAAg7DMBU3AAAMAAAA7Dg");
	var mask_1_graphics_70 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_71 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_72 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_73 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_74 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_75 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_76 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_77 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_78 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_79 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_80 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_81 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_82 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_83 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_84 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_85 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_86 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_87 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_88 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_89 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_90 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_91 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_92 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_93 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_94 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_95 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_96 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_97 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_98 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_99 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_100 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_101 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_102 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_103 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_104 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_105 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_106 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_107 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_108 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_109 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_110 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_111 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_112 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_113 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_114 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_115 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_116 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_117 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_118 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_119 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_120 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_121 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_122 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_123 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_124 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_125 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_126 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_127 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_128 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_129 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_130 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_131 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_132 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_133 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_134 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_135 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_136 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_137 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_138 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_139 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_140 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_141 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_142 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_143 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_144 = new cjs.Graphics().p("EgsVAdiMAAAg7DMBYrAAAMAAAA7Dg");
	var mask_1_graphics_145 = new cjs.Graphics().p("EgsaAdiMAAAg7DMBY1AAAMAAAA7Dg");
	var mask_1_graphics_146 = new cjs.Graphics().p("EgsfAdiMAAAg7DMBY/AAAMAAAA7Dg");
	var mask_1_graphics_147 = new cjs.Graphics().p("EgskAdiMAAAg7DMBZJAAAMAAAA7Dg");
	var mask_1_graphics_148 = new cjs.Graphics().p("EgspAdiMAAAg7DMBZTAAAMAAAA7Dg");
	var mask_1_graphics_149 = new cjs.Graphics().p("EgsuAdiMAAAg7DMBZdAAAMAAAA7Dg");
	var mask_1_graphics_150 = new cjs.Graphics().p("Egs0AdiMAAAg7DMBZpAAAMAAAA7Dg");
	var mask_1_graphics_151 = new cjs.Graphics().p("Egs5AdiMAAAg7DMBZzAAAMAAAA7Dg");
	var mask_1_graphics_152 = new cjs.Graphics().p("Egs+AdiMAAAg7DMBZ9AAAMAAAA7Dg");
	var mask_1_graphics_153 = new cjs.Graphics().p("EgtDAdiMAAAg7DMBaHAAAMAAAA7Dg");
	var mask_1_graphics_154 = new cjs.Graphics().p("EgtIAdiMAAAg7DMBaRAAAMAAAA7Dg");
	var mask_1_graphics_155 = new cjs.Graphics().p("EgtNAdiMAAAg7DMBabAAAMAAAA7Dg");
	var mask_1_graphics_156 = new cjs.Graphics().p("EgtTAdiMAAAg7DMBanAAAMAAAA7Dg");
	var mask_1_graphics_157 = new cjs.Graphics().p("EgtYAdiMAAAg7DMBaxAAAMAAAA7Dg");
	var mask_1_graphics_158 = new cjs.Graphics().p("EgtdAdiMAAAg7DMBa7AAAMAAAA7Dg");
	var mask_1_graphics_159 = new cjs.Graphics().p("EgtiAdiMAAAg7DMBbFAAAMAAAA7Dg");
	var mask_1_graphics_160 = new cjs.Graphics().p("EgtnAdiMAAAg7DMBbPAAAMAAAA7Dg");
	var mask_1_graphics_161 = new cjs.Graphics().p("EgtsAdiMAAAg7DMBbZAAAMAAAA7Dg");
	var mask_1_graphics_162 = new cjs.Graphics().p("EgtxAdiMAAAg7DMBbjAAAMAAAA7Dg");
	var mask_1_graphics_163 = new cjs.Graphics().p("Egt3AdiMAAAg7DMBbvAAAMAAAA7Dg");
	var mask_1_graphics_164 = new cjs.Graphics().p("Egt8AdiMAAAg7DMBb5AAAMAAAA7Dg");
	var mask_1_graphics_165 = new cjs.Graphics().p("EguBAdiMAAAg7DMBcDAAAMAAAA7Dg");
	var mask_1_graphics_166 = new cjs.Graphics().p("EguGAdiMAAAg7DMBcNAAAMAAAA7Dg");
	var mask_1_graphics_167 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_168 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_169 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_170 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_171 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_172 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_173 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_174 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_175 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_176 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_177 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_178 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_179 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_180 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_181 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_182 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_183 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_184 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_185 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_186 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_187 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_188 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_189 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_190 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_191 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_192 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_193 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_194 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_195 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_196 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_197 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_198 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_199 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_200 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_201 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_202 = new cjs.Graphics().p("EguLAdiMAAAg7DMBcXAAAMAAAA7Dg");
	var mask_1_graphics_203 = new cjs.Graphics().p("EgsYAdiMAAAg7DMBYxAAAMAAAA7Dg");
	var mask_1_graphics_204 = new cjs.Graphics().p("EgsYAdiMAAAg7DMBYxAAAMAAAA7Dg");
	var mask_1_graphics_205 = new cjs.Graphics().p("EgsYAdiMAAAg7DMBYxAAAMAAAA7Dg");
	var mask_1_graphics_206 = new cjs.Graphics().p("EgsYAdiMAAAg7DMBYxAAAMAAAA7Dg");
	var mask_1_graphics_207 = new cjs.Graphics().p("EgsYAdiMAAAg7DMBYxAAAMAAAA7Dg");
	var mask_1_graphics_208 = new cjs.Graphics().p("EgsYAdiMAAAg7DMBYxAAAMAAAA7Dg");
	var mask_1_graphics_209 = new cjs.Graphics().p("EgsYAdiMAAAg7DMBYxAAAMAAAA7Dg");
	var mask_1_graphics_210 = new cjs.Graphics().p("EgsYAdiMAAAg7DMBYxAAAMAAAA7Dg");
	var mask_1_graphics_211 = new cjs.Graphics().p("EgsYAdiMAAAg7DMBYxAAAMAAAA7Dg");
	var mask_1_graphics_212 = new cjs.Graphics().p("EgsYAdiMAAAg7DMBYxAAAMAAAA7Dg");
	var mask_1_graphics_213 = new cjs.Graphics().p("EgsYAdiMAAAg7DMBYxAAAMAAAA7Dg");
	var mask_1_graphics_214 = new cjs.Graphics().p("EgsYAdiMAAAg7DMBYxAAAMAAAA7Dg");
	var mask_1_graphics_215 = new cjs.Graphics().p("EgsYAdiMAAAg7DMBYxAAAMAAAA7Dg");
	var mask_1_graphics_216 = new cjs.Graphics().p("EgscAdwMAAAg7fMBY5AAAMAAAA7fg");
	var mask_1_graphics_217 = new cjs.Graphics().p("EgsgAd9MAAAg75MBZBAAAMAAAA75g");
	var mask_1_graphics_218 = new cjs.Graphics().p("EgskAeKMAAAg8TMBZJAAAMAAAA8Tg");
	var mask_1_graphics_219 = new cjs.Graphics().p("EgspAeYMAAAg8vMBZTAAAMAAAA8vg");
	var mask_1_graphics_220 = new cjs.Graphics().p("EgstAelMAAAg9JMBZbAAAMAAAA9Jg");
	var mask_1_graphics_221 = new cjs.Graphics().p("EgsxAeyMAAAg9jMBZjAAAMAAAA9jg");
	var mask_1_graphics_222 = new cjs.Graphics().p("Egs1AfAMAAAg9/MBZrAAAMAAAA9/g");
	var mask_1_graphics_223 = new cjs.Graphics().p("Egs5AfNMAAAg+ZMBZzAAAMAAAA+Zg");
	var mask_1_graphics_224 = new cjs.Graphics().p("Egs9AfaMAAAg+zMBZ7AAAMAAAA+zg");
	var mask_1_graphics_225 = new cjs.Graphics().p("EgtBAfnMAAAg/NMBaDAAAMAAAA/Ng");
	var mask_1_graphics_226 = new cjs.Graphics().p("EgtGAf1MAAAg/pMBaNAAAMAAAA/pg");
	var mask_1_graphics_227 = new cjs.Graphics().p("EgtKAgCMAAAhADMBaVAAAMAAABADg");
	var mask_1_graphics_228 = new cjs.Graphics().p("EgtOAgPMAAAhAdMBadAAAMAAABAdg");
	var mask_1_graphics_229 = new cjs.Graphics().p("EgtSAgdMAAAhA5MBalAAAMAAABA5g");
	var mask_1_graphics_230 = new cjs.Graphics().p("EgtWAgqMAAAhBTMBatAAAMAAABBTg");
	var mask_1_graphics_231 = new cjs.Graphics().p("EgtaAg3MAAAhBtMBa1AAAMAAABBtg");
	var mask_1_graphics_232 = new cjs.Graphics().p("EgtfAhEMAAAhCHMBa/AAAMAAABCHg");
	var mask_1_graphics_233 = new cjs.Graphics().p("EgtjAhSMAAAhCjMBbHAAAMAAABCjg");
	var mask_1_graphics_234 = new cjs.Graphics().p("EgtnAhfMAAAhC9MBbPAAAMAAABC9g");
	var mask_1_graphics_235 = new cjs.Graphics().p("EgtrAhsMAAAhDXMBbXAAAMAAABDXg");
	var mask_1_graphics_236 = new cjs.Graphics().p("EgtvAh6MAAAhDzMBbfAAAMAAABDzg");
	var mask_1_graphics_237 = new cjs.Graphics().p("EgtzAiHMAAAhENMBbnAAAMAAABENg");
	var mask_1_graphics_238 = new cjs.Graphics().p("Egt3AiUMAAAhEnMBbvAAAMAAABEng");
	var mask_1_graphics_239 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_240 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_241 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_242 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_243 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_244 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_245 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_246 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_247 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_248 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_249 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_250 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_251 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_252 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_253 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_254 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_255 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_256 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_257 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_258 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_259 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_260 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_261 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_262 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_263 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_264 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_265 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_266 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_267 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_268 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_269 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_270 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_271 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_272 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_273 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_274 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_275 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_276 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_277 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_278 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_279 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_280 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_281 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_282 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_283 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_284 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_285 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_286 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");
	var mask_1_graphics_287 = new cjs.Graphics().p("Egt8AihMAAAhFBMBb5AAAMAAABFBg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:mask_1_graphics_0,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_1,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_2,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_3,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_4,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_5,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_6,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_7,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_8,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_9,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_10,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_11,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_12,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_13,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_14,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_15,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_16,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_17,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_18,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_19,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_20,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_21,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_22,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_23,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_24,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_25,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_26,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_27,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_28,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_29,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_30,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_31,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_32,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_33,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_34,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_35,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_36,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_37,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_38,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_39,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_40,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_41,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_42,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_43,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_44,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_45,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_46,x:328.025,y:271.5}).wait(1).to({graphics:mask_1_graphics_47,x:17.2003,y:271.4999}).wait(1).to({graphics:mask_1_graphics_48,x:29.8516,y:271.4999}).wait(1).to({graphics:mask_1_graphics_49,x:42.6024,y:271.4999}).wait(1).to({graphics:mask_1_graphics_50,x:55.3032,y:271.4999}).wait(1).to({graphics:mask_1_graphics_51,x:68.0544,y:271.4999}).wait(1).to({graphics:mask_1_graphics_52,x:80.7552,y:271.4999}).wait(1).to({graphics:mask_1_graphics_53,x:93.4564,y:271.4999}).wait(1).to({graphics:mask_1_graphics_54,x:106.1077,y:271.4999}).wait(1).to({graphics:mask_1_graphics_55,x:118.8585,y:271.4999}).wait(1).to({graphics:mask_1_graphics_56,x:131.5593,y:271.4999}).wait(1).to({graphics:mask_1_graphics_57,x:144.3105,y:271.4999}).wait(1).to({graphics:mask_1_graphics_58,x:156.9618,y:271.4999}).wait(1).to({graphics:mask_1_graphics_59,x:169.7125,y:271.4999}).wait(1).to({graphics:mask_1_graphics_60,x:182.4133,y:271.4999}).wait(1).to({graphics:mask_1_graphics_61,x:195.1646,y:271.4999}).wait(1).to({graphics:mask_1_graphics_62,x:207.8154,y:271.4999}).wait(1).to({graphics:mask_1_graphics_63,x:220.5166,y:271.4999}).wait(1).to({graphics:mask_1_graphics_64,x:233.2174,y:271.4999}).wait(1).to({graphics:mask_1_graphics_65,x:245.9686,y:271.4999}).wait(1).to({graphics:mask_1_graphics_66,x:258.6694,y:271.4999}).wait(1).to({graphics:mask_1_graphics_67,x:271.3707,y:271.4999}).wait(1).to({graphics:mask_1_graphics_68,x:284.0715,y:271.4999}).wait(1).to({graphics:mask_1_graphics_69,x:296.8227,y:271.4999}).wait(1).to({graphics:mask_1_graphics_70,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_71,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_72,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_73,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_74,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_75,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_76,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_77,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_78,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_79,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_80,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_81,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_82,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_83,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_84,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_85,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_86,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_87,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_88,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_89,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_90,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_91,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_92,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_93,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_94,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_95,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_96,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_97,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_98,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_99,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_100,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_101,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_102,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_103,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_104,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_105,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_106,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_107,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_108,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_109,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_110,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_111,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_112,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_113,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_114,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_115,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_116,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_117,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_118,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_119,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_120,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_121,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_122,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_123,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_124,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_125,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_126,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_127,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_128,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_129,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_130,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_131,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_132,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_133,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_134,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_135,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_136,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_137,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_138,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_139,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_140,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_141,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_142,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_143,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_144,x:308.7733,y:271.4999}).wait(1).to({graphics:mask_1_graphics_145,x:309.3237,y:271.4999}).wait(1).to({graphics:mask_1_graphics_146,x:309.8236,y:271.4999}).wait(1).to({graphics:mask_1_graphics_147,x:310.324,y:271.4999}).wait(1).to({graphics:mask_1_graphics_148,x:310.824,y:271.4999}).wait(1).to({graphics:mask_1_graphics_149,x:311.3743,y:271.4999}).wait(1).to({graphics:mask_1_graphics_150,x:311.8743,y:271.4999}).wait(1).to({graphics:mask_1_graphics_151,x:312.3742,y:271.4999}).wait(1).to({graphics:mask_1_graphics_152,x:312.8742,y:271.4999}).wait(1).to({graphics:mask_1_graphics_153,x:313.4241,y:271.4999}).wait(1).to({graphics:mask_1_graphics_154,x:313.924,y:271.4999}).wait(1).to({graphics:mask_1_graphics_155,x:314.424,y:271.4999}).wait(1).to({graphics:mask_1_graphics_156,x:314.8744,y:271.4999}).wait(1).to({graphics:mask_1_graphics_157,x:315.4243,y:271.4999}).wait(1).to({graphics:mask_1_graphics_158,x:315.9243,y:271.4999}).wait(1).to({graphics:mask_1_graphics_159,x:316.4742,y:271.4999}).wait(1).to({graphics:mask_1_graphics_160,x:316.9746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_161,x:317.4746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_162,x:318.0249,y:271.4999}).wait(1).to({graphics:mask_1_graphics_163,x:318.5248,y:271.4999}).wait(1).to({graphics:mask_1_graphics_164,x:319.0248,y:271.4999}).wait(1).to({graphics:mask_1_graphics_165,x:319.5247,y:271.4999}).wait(1).to({graphics:mask_1_graphics_166,x:320.0746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_167,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_168,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_169,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_170,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_171,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_172,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_173,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_174,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_175,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_176,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_177,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_178,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_179,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_180,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_181,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_182,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_183,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_184,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_185,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_186,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_187,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_188,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_189,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_190,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_191,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_192,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_193,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_194,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_195,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_196,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_197,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_198,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_199,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_200,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_201,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_202,x:320.5746,y:271.4999}).wait(1).to({graphics:mask_1_graphics_203,x:308.9741,y:271.4999}).wait(1).to({graphics:mask_1_graphics_204,x:308.9741,y:271.4999}).wait(1).to({graphics:mask_1_graphics_205,x:308.9741,y:271.4999}).wait(1).to({graphics:mask_1_graphics_206,x:308.9741,y:271.4999}).wait(1).to({graphics:mask_1_graphics_207,x:308.9741,y:271.4999}).wait(1).to({graphics:mask_1_graphics_208,x:308.9741,y:271.4999}).wait(1).to({graphics:mask_1_graphics_209,x:308.9741,y:271.4999}).wait(1).to({graphics:mask_1_graphics_210,x:308.9741,y:271.4999}).wait(1).to({graphics:mask_1_graphics_211,x:308.9741,y:271.4999}).wait(1).to({graphics:mask_1_graphics_212,x:308.9741,y:271.4999}).wait(1).to({graphics:mask_1_graphics_213,x:308.9741,y:271.4999}).wait(1).to({graphics:mask_1_graphics_214,x:308.9741,y:271.4999}).wait(1).to({graphics:mask_1_graphics_215,x:308.9741,y:271.4999}).wait(1).to({graphics:mask_1_graphics_216,x:309.3237,y:271.1997}).wait(1).to({graphics:mask_1_graphics_217,x:309.7237,y:270.9}).wait(1).to({graphics:mask_1_graphics_218,x:310.1238,y:270.5499}).wait(1).to({graphics:mask_1_graphics_219,x:310.5238,y:270.2497}).wait(1).to({graphics:mask_1_graphics_220,x:310.8739,y:269.95}).wait(1).to({graphics:mask_1_graphics_221,x:311.274,y:269.6499}).wait(1).to({graphics:mask_1_graphics_222,x:311.674,y:269.3498}).wait(1).to({graphics:mask_1_graphics_223,x:312.0237,y:269.0001}).wait(1).to({graphics:mask_1_graphics_224,x:312.4242,y:268.6999}).wait(1).to({graphics:mask_1_graphics_225,x:312.7743,y:268.3998}).wait(1).to({graphics:mask_1_graphics_226,x:313.2243,y:268.1001}).wait(1).to({graphics:mask_1_graphics_227,x:313.6239,y:267.7999}).wait(1).to({graphics:mask_1_graphics_228,x:313.974,y:267.4498}).wait(1).to({graphics:mask_1_graphics_229,x:314.3745,y:267.1497}).wait(1).to({graphics:mask_1_graphics_230,x:314.7741,y:266.85}).wait(1).to({graphics:mask_1_graphics_231,x:315.1741,y:266.5503}).wait(1).to({graphics:mask_1_graphics_232,x:315.5243,y:266.1997}).wait(1).to({graphics:mask_1_graphics_233,x:315.8743,y:265.8996}).wait(1).to({graphics:mask_1_graphics_234,x:316.3243,y:265.5999}).wait(1).to({graphics:mask_1_graphics_235,x:316.6744,y:265.3002}).wait(1).to({graphics:mask_1_graphics_236,x:317.0745,y:265}).wait(1).to({graphics:mask_1_graphics_237,x:317.4241,y:264.65}).wait(1).to({graphics:mask_1_graphics_238,x:317.8746,y:264.2999}).wait(1).to({graphics:mask_1_graphics_239,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_240,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_241,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_242,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_243,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_244,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_245,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_246,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_247,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_248,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_249,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_250,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_251,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_252,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_253,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_254,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_255,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_256,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_257,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_258,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_259,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_260,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_261,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_262,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_263,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_264,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_265,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_266,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_267,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_268,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_269,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_270,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_271,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_272,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_273,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_274,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_275,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_276,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_277,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_278,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_279,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_280,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_281,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_282,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_283,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_284,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_285,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_286,x:318.8245,y:264.0002}).wait(1).to({graphics:mask_1_graphics_287,x:318.8245,y:264.0002}).wait(1));

	// Data_idn
	this.instance_41 = new lib.ClipGroup_23();
	this.instance_41.setTransform(315,442.25,1,1.0333,0,0,0,288.7,402.7);
	this.instance_41._off = true;

	var maskedShapeInstanceList = [this.instance_41];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(47).to({_off:false},0).wait(23).to({regX:288.8,scaleY:1.0335,x:315.1,y:442.3},0).wait(74).to({regX:3.1,regY:216.8,x:29.4,y:250.15},0).to({regX:2.6,regY:217.1,scaleX:1.9485,scaleY:1.03,x:29.15,y:251.1},23).wait(24).to({scaleY:1.0301,y:251.05},0).to({regY:216.8,scaleX:0.9995,scaleY:1.0335,x:29.35,y:250.15},12).wait(85));

	// HorAxes
	this.instance_42 = new lib.Tween41("synched",0);
	this.instance_42.setTransform(312.2,292.3,1,1,0,0,0,2.3,-220.8);
	this.instance_42._off = true;

	this.instance_43 = new lib.Tween36("synched",0);
	this.instance_43.setTransform(312.2,260.95,1,1,0,0,0,2.3,-220.8);
	this.instance_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(24).to({_off:false},0).to({y:260.95},23).to({_off:true},97).wait(144));
	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(144).to({_off:false},0).wait(47).to({startPosition:47},0).wait(12).to({startPosition:71},0).wait(84).to({startPosition:155},0).wait(1));

	// DataAverage
	this.instance_44 = new lib.ClipGroup_11();
	this.instance_44.setTransform(28.4,330.85,0.0299,1,0,0,0,3.4,312);
	this.instance_44.alpha = 0;
	this.instance_44._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(72).to({_off:false},0).to({regX:3.6,scaleX:0.9753,x:28.45,alpha:1},23).wait(25).to({alpha:0},9).to({_off:true},1).wait(158));

	// VerticalAxes
	this.instance_45 = new lib.Tween26("synched",0);
	this.instance_45.setTransform(-13.35,233.2);
	this.instance_45._off = true;

	this.instance_46 = new lib.Tween27("synched",0);
	this.instance_46.setTransform(13.8,247.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_45}]},24).to({state:[{t:this.instance_46}]},23).to({state:[{t:this.instance_46}]},240).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(24).to({_off:false},0).to({_off:true,x:13.8,y:247.6},23).wait(241));

	// Background
	this.instance_47 = new lib.Tween21("synched",0);
	this.instance_47.setTransform(324.4,457,1,0.0652,0,0,0,0,223.8);
	this.instance_47._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(24).to({_off:false},0).to({regY:223.4,scaleY:1,y:471.35},23).wait(240).to({startPosition:0},0).wait(1));

	// like_no_other
	this.instance_48 = new lib.Tween4("synched",0);
	this.instance_48.setTransform(938.2,218.2);
	this.instance_48.alpha = 0.0391;

	this.instance_49 = new lib.Tween5("synched",0);
	this.instance_49.setTransform(331.25,217.6);
	this.instance_49._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_48).to({_off:true,x:331.25,y:217.6,alpha:1},23,cjs.Ease.quartOut).to({_off:false,x:938.2,y:186.2,alpha:0.0391},10).to({_off:true},1).wait(254));
	this.timeline.addTween(cjs.Tween.get(this.instance_49).to({_off:false},23,cjs.Ease.quartOut).to({_off:true,x:938.2,y:186.2,alpha:0.0391},10).wait(255));

	// line
	this.instance_50 = new lib.Tween3("synched",0);
	this.instance_50.setTransform(24.7,101.15,0.0361,1,0,0,0,-292.6,0);

	this.instance_51 = new lib.Tween2("synched",0);
	this.instance_51.setTransform(24.65,77.15,0.042,1,0,0,0,-292.8,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_50}]}).to({state:[{t:this.instance_50}]},23).to({state:[{t:this.instance_51}]},10).to({state:[]},1).wait(254));
	this.timeline.addTween(cjs.Tween.get(this.instance_50).to({regX:-293.2,scaleX:1,x:24.75},23).to({_off:true,regX:-292.8,scaleX:0.042,x:24.65,y:77.15},10).wait(255));

	// covid
	this.instance_52 = new lib.Tween6("synched",0);
	this.instance_52.setTransform(226.35,-40.6);
	this.instance_52.alpha = 0.2188;

	this.instance_53 = new lib.Tween7("synched",0);
	this.instance_53.setTransform(225.15,73);
	this.instance_53._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_52).to({_off:true,x:225.15,y:73,alpha:1},23,cjs.Ease.quartOut).to({_off:false,x:226.35,y:-40.6,alpha:0.2188},10).to({_off:true},1).wait(254));
	this.timeline.addTween(cjs.Tween.get(this.instance_53).to({_off:false},23,cjs.Ease.quartOut).to({_off:true,x:226.35,y:-40.6,alpha:0.2188},10).wait(255));

	// para
	this.instance_54 = new lib.Tween9("synched",0);
	this.instance_54.setTransform(52.9,363.85);
	this.instance_54.alpha = 0;

	this.instance_55 = new lib.Tween8("synched",0);
	this.instance_55.setTransform(409.35,489.1);
	this.instance_55.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_54}]}).to({state:[{t:this.instance_54}]},23).to({state:[{t:this.instance_55}]},10).to({state:[]},1).wait(254));
	this.timeline.addTween(cjs.Tween.get(this.instance_54).to({x:409.35,y:363.2,alpha:1},23,cjs.Ease.quartOut).to({_off:true,y:489.1,alpha:0},10).wait(255));

	// world
	this.instance_56 = new lib.world("synched",0);
	this.instance_56.setTransform(322.8,257.5,1,1,0,0,0,299.8,151.5);
	this.instance_56.alpha = -0.8984;
	this.instance_56.filters = [new cjs.ColorFilter(0.5, 0.5, 0.5, 1, 102, 0, 0, 0)];
	this.instance_56.cache(-2,-2,604,307);

	this.timeline.addTween(cjs.Tween.get(this.instance_56).to({y:273.5,alpha:0.2695},23,cjs.Ease.quartOut).to({y:257.5,alpha:-1},10).to({startPosition:0},254).wait(1));

	// ringkasan_net
	this.instance_57 = new lib.Tween97("synched",0);
	this.instance_57.setTransform(428.8,441.05);
	this.instance_57.alpha = 0;

	this.instance_58 = new lib.Tween98("synched",0);
	this.instance_58.setTransform(428.8,441.05);
	this.instance_58._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_57).to({_off:true,alpha:1},23).wait(265));
	this.timeline.addTween(cjs.Tween.get(this.instance_58).to({_off:false},23).to({alpha:0},10).wait(254).to({startPosition:0},0).wait(1));

	// mask_idn (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	var mask_2_graphics_0 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_1 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_2 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_3 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_4 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_5 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_6 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_7 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_8 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_9 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_10 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_11 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_12 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_13 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_14 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_15 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_16 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_17 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_18 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_19 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_20 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_21 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_22 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_23 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_24 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_25 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_26 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_27 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_28 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_29 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_30 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_31 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_32 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_33 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_34 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_35 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_36 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_37 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_38 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_39 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_40 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_41 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_42 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_43 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_44 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_45 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_46 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_47 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_48 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_49 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_50 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_51 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_52 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_53 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_54 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_55 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_56 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_57 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_58 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_59 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_60 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_61 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_62 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_63 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_64 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_65 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_66 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_67 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_68 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_69 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_70 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_71 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_72 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_73 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_74 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_75 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_76 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_77 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_78 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_79 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_80 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_81 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_82 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_83 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_84 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_85 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_86 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_87 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_88 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_89 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_90 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_91 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_92 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_93 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_94 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_95 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_96 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_97 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_98 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_99 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_100 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_101 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_102 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_103 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_104 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_105 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_106 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_107 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_108 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_109 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_110 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_111 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_112 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_113 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_114 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_115 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_116 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_117 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_118 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_119 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_120 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_121 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_122 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_123 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_124 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_125 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_126 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_127 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_128 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_129 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_130 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_131 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_132 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_133 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_134 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_135 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_136 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_137 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_138 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_139 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_140 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_141 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_142 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_143 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_144 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_145 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_146 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_147 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_148 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_149 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_150 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_151 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_152 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_153 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_154 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_155 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_156 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_157 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_158 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_159 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_160 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_161 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_162 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_163 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_164 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_165 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_166 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_167 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_168 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_169 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_170 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_171 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_172 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_173 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_174 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_175 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_176 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_177 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_178 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_179 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_180 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_181 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_182 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_183 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_184 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_185 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_186 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_187 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_188 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_189 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_190 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_191 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_192 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_193 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_194 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_195 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_196 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_197 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_198 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_199 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_200 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_201 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_202 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_203 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_204 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_205 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_206 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_207 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_208 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_209 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_210 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_211 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_212 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_213 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_214 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_215 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_216 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_217 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_218 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_219 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_220 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_221 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_222 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_223 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_224 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_225 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_226 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_227 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_228 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_229 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_230 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_231 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_232 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_233 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_234 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_235 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_236 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_237 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_238 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_239 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_240 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_241 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_242 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_243 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_244 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_245 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_246 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_247 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_248 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_249 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_250 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_251 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_252 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_253 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_254 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_255 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_256 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_257 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_258 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_259 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_260 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_261 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_262 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_263 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_264 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_265 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_266 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_267 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_268 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_269 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_270 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_271 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_272 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_273 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_274 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_275 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_276 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_277 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_278 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_279 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_280 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_281 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_282 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_283 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_284 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_285 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_286 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");
	var mask_2_graphics_287 = new cjs.Graphics().p("AjmCvQhfhIAAhnQAAhmBfhIQBghJCGAAQCHAABfBJQBgBIAABmQAABnhgBIQhfBJiHAAQiGAAhghJg");

	this.timeline.addTween(cjs.Tween.get(mask_2).to({graphics:mask_2_graphics_0,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_1,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_2,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_3,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_4,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_5,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_6,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_7,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_8,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_9,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_10,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_11,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_12,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_13,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_14,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_15,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_16,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_17,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_18,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_19,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_20,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_21,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_22,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_23,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_24,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_25,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_26,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_27,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_28,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_29,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_30,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_31,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_32,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_33,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_34,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_35,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_36,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_37,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_38,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_39,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_40,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_41,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_42,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_43,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_44,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_45,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_46,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_47,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_48,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_49,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_50,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_51,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_52,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_53,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_54,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_55,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_56,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_57,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_58,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_59,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_60,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_61,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_62,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_63,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_64,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_65,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_66,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_67,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_68,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_69,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_70,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_71,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_72,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_73,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_74,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_75,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_76,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_77,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_78,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_79,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_80,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_81,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_82,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_83,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_84,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_85,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_86,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_87,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_88,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_89,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_90,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_91,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_92,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_93,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_94,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_95,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_96,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_97,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_98,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_99,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_100,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_101,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_102,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_103,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_104,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_105,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_106,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_107,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_108,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_109,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_110,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_111,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_112,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_113,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_114,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_115,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_116,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_117,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_118,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_119,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_120,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_121,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_122,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_123,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_124,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_125,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_126,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_127,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_128,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_129,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_130,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_131,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_132,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_133,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_134,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_135,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_136,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_137,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_138,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_139,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_140,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_141,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_142,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_143,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_144,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_145,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_146,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_147,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_148,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_149,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_150,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_151,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_152,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_153,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_154,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_155,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_156,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_157,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_158,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_159,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_160,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_161,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_162,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_163,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_164,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_165,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_166,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_167,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_168,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_169,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_170,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_171,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_172,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_173,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_174,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_175,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_176,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_177,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_178,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_179,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_180,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_181,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_182,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_183,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_184,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_185,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_186,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_187,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_188,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_189,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_190,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_191,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_192,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_193,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_194,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_195,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_196,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_197,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_198,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_199,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_200,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_201,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_202,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_203,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_204,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_205,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_206,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_207,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_208,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_209,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_210,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_211,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_212,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_213,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_214,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_215,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_216,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_217,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_218,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_219,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_220,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_221,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_222,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_223,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_224,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_225,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_226,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_227,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_228,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_229,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_230,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_231,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_232,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_233,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_234,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_235,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_236,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_237,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_238,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_239,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_240,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_241,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_242,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_243,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_244,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_245,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_246,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_247,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_248,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_249,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_250,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_251,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_252,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_253,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_254,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_255,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_256,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_257,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_258,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_259,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_260,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_261,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_262,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_263,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_264,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_265,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_266,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_267,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_268,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_269,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_270,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_271,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_272,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_273,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_274,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_275,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_276,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_277,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_278,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_279,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_280,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_281,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_282,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_283,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_284,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_285,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_286,x:556.95,y:442.4}).wait(1).to({graphics:mask_2_graphics_287,x:556.95,y:442.4}).wait(1));

	// photo
	this.instance_59 = new lib.Tween99("synched",0);
	this.instance_59.setTransform(551.35,447.3);
	this.instance_59.alpha = 0;

	this.instance_60 = new lib.Tween100("synched",0);
	this.instance_60.setTransform(551.35,447.3);
	this.instance_60._off = true;

	var maskedShapeInstanceList = [this.instance_59,this.instance_60];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_59).to({_off:true,alpha:1},23).wait(265));
	this.timeline.addTween(cjs.Tween.get(this.instance_60).to({_off:false},23).to({alpha:0},10).wait(254).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(203.6,20.9,991.6999999999999,504.80000000000007);
// library properties:
lib.properties = {
	id: 'A00F79BC427346108FAD85073077EF0F',
	width: 640,
	height: 500,
	fps: 24,
	color: "#F7F7F7",
	opacity: 1.00,
	manifest: [
		{src:"images/FotoJas3.jpg", id:"FotoJas3"},
		{src:"images/_05aiAssets.png", id:"_05aiAssets"},
		{src:"images/Artwork2aiAssets.png", id:"Artwork2aiAssets"}
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
an.compositions['A00F79BC427346108FAD85073077EF0F'] = {
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