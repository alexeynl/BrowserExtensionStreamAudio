//import {decodeAdpcm} from "./adpcm.js"
const context = new (window.AudioContext || window.webkitAudioContext)();

var delayTime = 0;
var init = 0;
var audioStack = [];
var nextTime = 0;
var streamStatus = "off"
var audioStreamURL = "http://doorbell01.lan:81/audiostream.cgi?user=admin&pwd=loxloxlox&streamid=0&filename="

function startStreamAudio (audioStreamURL) {
	console.log("backgroud script streamAudio=>>");
	console.log("audioStreamURL=" + audioStreamURL);
	window.audioStreamURL = audioStreamURL;
	//console.log("streamStatus=" + streamStatus);
	(async () => {
		let response = await fetch(audioStreamURL);
		const reader = response.body.getReader();

		let receivedLength = 0; // received that many bytes at the moment
		
		let audioDataChunks = new Uint8Array(reader.result); // array of received binary chunks (comprises the body)
		//for (let step = 0; step < audioChunksLimit; step++) {
		while (streamStatus == "on") {
			const {done, value} = await reader.read();
			//if (done) {
			//break;
			//}
			let audioChunk = new Uint8Array(value);
			//console.log('Audio chunk:');
			//console.log(audioChunk);

			//Removing header from every piece of audio data
			adpcmRawChunk = audioChunk.slice(32,544);
			//console.log('Adpcm raw chunk:');
			//console.log(adpcmRawChunk);

			//Device streams ADPCM audio, convert every piece to PCM
			var pcmChunk = decodeAdpcm(adpcmRawChunk);

			
			audioStack.push(pcmChunk);
			//console.log("audioStack");
			//console.log(audioStack);
			if ((init!=0) || (audioStack.length > 15)) { // make sure we put at least 10 chunks in the buffer before starting
				init++;
				scheduleBuffers();
			}
			receivedLength += audioChunk.length;
			//console.log(`Received ${receivedLength}`);
		}
		

	})()
}

function scheduleBuffers() {
	
	while (audioStack.length) {
		var audioBuffer = audioStack.shift();
		
		var buffer = context.createBuffer(
				1,
				audioBuffer.length,
				8000
			);
		var bufferSource = context.createBufferSource();

			const nowBuffering = buffer.getChannelData(0);
			for (let i = 0; i < buffer.length; i++) {
				nowBuffering[i] = audioBuffer[i];
			}
			//console.log("nowBuffering");
			//console.log(nowBuffering);	
			// set the buffer in the AudioBufferSourceNode
			//console.log("bufferSource");
			//console.log(bufferSource);
			bufferSource.buffer = buffer;

		bufferSource.connect(context.destination);
		if (nextTime == 0)
			nextTime = context.currentTime + 0.10;  /// add 50ms latency to work well across systems - tune this if you like
		bufferSource.start(nextTime);
		nextTime+=bufferSource.buffer.duration; // Make the next buffer wait the length of the last buffer before being played
	};
}