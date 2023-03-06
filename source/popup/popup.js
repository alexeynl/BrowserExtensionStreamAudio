
let form = document.forms.audioStreamSettings;
let inputAudioStreamURL = form.elements.audioStreamURL;
let btnStartStream = form.elements.startStream;
//let streamStatus = btnStartStream.value;
var otherWindows = chrome.extension.getBackgroundPage();
readDataToPopup()

function readDataToPopup(){
	let streamStatus = otherWindows.streamStatus;
	if (streamStatus == "off") {
		btnStartStream.innerText = "Start stream audio";
	} else {
		btnStartStream.innerText = "Stop stream audio";	
	}
	otherWindows.streamStatus = streamStatus
}

//Start to play audio when click to the button "Play audio stream:"
btnStartStream.addEventListener('click', () => {
	otherWindows.startStreamAudio(inputAudioStreamURL.value);
	changeStreamStatus();
	let audioStreamURL = inputAudioStreamURL.value;

})

function changeStreamStatus () {
	let streamStatus = otherWindows.streamStatus
	console.log("popup.js.changeStreamStatus.streamStatus=" + streamStatus);
	if (streamStatus == "off") {
		btnStartStream.value = "on";
		btnStartStream.innerText = "Stop stream audio";
	} else {
		btnStartStream.value = "off";
		btnStartStream.innerText = "Start stream audio";	
	}
	otherWindows.streamStatus = btnStartStream.value
}	