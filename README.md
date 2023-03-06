# Browser extension to play IP cameras ADPCM audio stream
This is browser extension can play audio stream from chinese IP cameras. Such cameras stream audio as ADPCM chunks (544 bytes each). Furthermore each chunks has 32 bytes header and others 512 bytes contains audio (ADPCM) raw data. This is non standard audio format so it is not possible to play this audio stream using polular players like VLC.

I don't have the list of compatible IP cameras but if your camera audio URL contains audiostream.cgi like this

http://\<ip\>:81/audiostream.cgi?user=\<username\>&pwd=\<password\>&streamid=0&filename=

my extension may works in your case.

# Compatibility
Extension now only works with Mozilla Firefox (at least 110.0.1 version). I'm not able to make this work for Chromium based browsers: fetch API can't work with non-HTTP respose that camera send (details here https://stackoverflow.com/questions/75621371/processing-non-standard-http-response-in-chomium-based-browsers-using-javascript).

# Insallation

1. Download extenstion package - *.xpi file.
2. Open Mozilla Firefox.
3. In the address bar open the page:
about:addons
4. On the right from "Manage Your Extensions" click on gear button and chose "Install Add-on from file".
5. Choose downloaded *.xpi extension package.

# Based on

1. http://www.instructables.com/id/Hack-a-30-WiFi-Pan-Tilt-Camera-Video-Audio-and-Mot/
https://github.com/smartin015/KaicongWiFiCameraControl
https://github.com/alexeynl/DoorbellControlPython
2. https://stackoverflow.com/a/20478525/6612987 (https://gist.github.com/revolunet/e620e2c532b7144c62768a36b8b96da2)
3. https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
4. https://4pda.to/forum/index.php?showtopic=807259&view=findpost&p=87441480
5. https://gist.github.com/jaames/c837fb87a6a5585d47baa1b8e2408234
