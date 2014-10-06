# [cine.io](https://www.cine.io) JS SDK

[![Build Status](https://travis-ci.org/cine-io/js-sdk.svg?branch=master)](https://travis-ci.org/cine-io/js-sdk)

The JavaScript SDK for [cine.io](https://www.cine.io).

## Installation

```html
<script src="//cdn.cine.io/cineio.js"></script>
```

## Usage
The `CineIO` object has three main methods. The first one is `init`. Initialize CineIO jssdk with your public key. The second method is `play`. This is used to play a live stream. This works on desktop, iOS, Android devices. Sending your stream to an Apple TV and Chromecast (although I don't have a Chromecast right now, but I don't see a reason why it wouldn't work; let me know if you run into issues) should work as well. The third main method is `publish`. This is used to publish a live stream using a webcam and input source. At this time, the publisher requries flash to be installed on the client machine.

#### Init

Start off by initializing CineIO with your public publicKey.

```javascript
CineIO.init(CINE_IO_PUBLIC_KEY, options);
```
**CINE_IO_PUBLIC_KEY**
This is your public key for a [cine.io](https://www.cine.io) project.

**options**

Options are an optional parameter. Currently the only supported option is `jwPlayerKey`. Pass this in to validate your jwPlayer version. Unlicensed versions will show the jwPlayer logo.

#### Play

```javascript
CineIO.play(streamId, domId);
CineIO.play(streamId, domId, playOptions);
CineIO.play(streamId, domId, callback);
CineIO.play(streamId, domId, playOptions, callback);
```

**streamId**

streamId is a [cine.io](https://www.cine.io) stream id. This is what is returned when accessing the create stream endpoint or available in your [cine.io](https://www.cine.io) dashboard.

**domId**

domId is the ID of the dom node you want the player to be injected into.

**available/default playOptions are:**

*  stretching: 'uniform'
*  width: '100%'
*  aspectratio: '16:9'
*  primary: 'flash'
*  autostart: true
*  metaData: true
*  mute: false
*  controls: true
*  rtmp:
   * subscribe: true

**callback**

You can optionally pass a callback to retrieve the player. This will return any errors and instance of jwplayer in desktop environments or a video element tag.

```javascript
function(error, player) {console.log("player ready", error, player)}
```

#### Publish

```javascript
publisher = CineIO.publish(streamId, streamPassword, domId, publishOptions);
publisher.start(); // starts the broadcast
publisher.preview() // show the video preview without broadcasting.
publisher.getMediaInfo() // returns info about the media on the computer. Ex: {cameras: ["A webcam", …], microphones: ["Built in mic", "line in", …]}
publisher.selectCamera() // shows a dialog to change the camera
publisher.selectMicrophone() // shows a dialog to change the microphone
publisher.sendData({some: "custom", data: true}) // send custom data over the data channel.
publisher.stop(); // stops the broadcast
```

**streamId**

streamId is a [cine.io](https://www.cine.io) stream id. This is what is returned when accessing the create stream endpoint or available in your [cine.io](https://www.cine.io) dashboard.

**streamPassword**

streamPassword is a [cine.io](https://www.cine.io) stream password. Only expose the streamPassword to your users who have permission to publish.

**domId**

domId is the ID of the dom node you want the publisher to be injected into.

**available/default publish options are:**

*  audioCodec: 'NellyMoser'
   * available options are 'NellyMoser' and 'Speex' (these are both automatically transcoded by [cine.io](https://www.cine.io) to AAC for playback on mobile devices.)
*  streamWidth: 720
*  streamHeight: 404
*  streamFPS: 15
*  intervalSecs: 10
*  bandwidth: 1500
    * Maximum bandwidth to be used. Default is 1500 kb/s. Adobe documentation [here](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/media/Camera.html#setQuality()).
*  videoQuality: 90
    * Level of picture quality. 100 indicates no compression. Adobe documentation [here](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/media/Camera.html#setQuality()).
*  embedTimecode: true
    * This sends the timecode (offset since start of recording) and timestamp (milliseconds since epoch) over the data channel.
*  timecodeFrequency: 100
    * How frequenently to send the timestamp. value of 100 means 10 every second.
*  eventHandler: function(event){}
    * The publisher will send events, such as `status`, `connect`, `disconnect`, and `error`.
    * events look like:

      ```json
        {"
        kind"
        : "the kind of event (status, connect,…)", "
        code"
        : 100, "
        message"
        : "message of event"}
      ```

    * the same kind of event can have different codes for different reasons. For example, a `disconnect` event might be fired at a closed connection (code 502), or a failed initial connection (code 501).

#### Play Recording

```javascript
CineIO.playRecording(streamId, recordingName, domId);
CineIO.playRecording(streamId, recordingName, domId, playOptions);
CineIO.playRecording(streamId, recordingName, domId, callback);
CineIO.playRecording(streamId, recordingName, domId, playOptions, callback);
```

**streamId**

streamId is a [cine.io](https://www.cine.io) stream id. This is what is returned when accessing the create stream endpoint or available in your [cine.io](https://www.cine.io) dashboard.

**recordingName**

recordingName is a [cine.io](https://www.cine.io) stream recording name. This is `name` field of one of the recordings when accessing the stream recordings.

**domId**

domId is the ID of the dom node you want the player to be injected into.

**available/default playOptions are:**

*  stretching: 'uniform'
*  width: '100%'
*  aspectratio: '16:9'
*  autostart: true
*  metaData: true
*  mute: false
*  controls: true
*  rtmp:
   * subscribe: true

> the primary option is inconsistent for video-on-demand in jwplayer, so it has been removed from the jssdk.

**callback**

You can optionally pass a callback to retrieve the player. This will return any errors and instance of jwplayer in desktop environments or a video element tag in the absence of flash.

```javascript
function(error, player) {console.log("player ready", error, player)}
```

#### getStreamDetails

This is used to get the play details of the stream. For example if you wanted to use your own player, you would use this to get the stream details.

```javascript
CineIO.getStreamDetails(streamId, callback);
```

**streamId**

streamId is a [cine.io](https://www.cine.io) stream id. This is what is returned when accessing the create stream endpoint or available in your [cine.io](https://www.cine.io) dashboard.

**callback**

callback is a function which returns the an error or the stream details. It follows the Node.js format of `(err, data)`. An example callback:
```javascript
function(err, stream){ console.log('recieved err/stream', err, stream); }
```

**stream response**

The stream follows the format of:
```json
{"id": "the streamId", "play": {"hls": "the hls url", "rtmp": "the rtmp url"}}
```

#### getStreamRecordings

This is used to get the details of the recording sessions of the stream.

```javascript
CineIO.getStreamRecordings(streamId, callback);
CineIO.getStreamRecordings(streamId, {readFromCache: false}, callback);
```

**streamId**

streamId is a [cine.io](https://www.cine.io) stream id. This is what is returned when accessing the create stream endpoint or available in your [cine.io](https://www.cine.io) dashboard.

**callback**

callback is a function which returns the an error or the stream recording results. It follows the Node.js format of `(err, data)`. An example callback:
```javascript
function(err, recordings){ console.log('recieved err/recordings', err, recordings); }
```

**recording response**

```json
[{"name": "the recording name", size: size in bytes, url: "the playable url", date: "the date of the recording"}, … ]
```
