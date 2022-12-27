<img width="221" alt="osc for wled" src="https://user-images.githubusercontent.com/70780576/209650812-d1d315dc-fc59-43d2-9ff8-b61f519fdd6e.png">

# OSC for WLED
Convert OSC Messages to the WLED JSON API

### [Download Here](https://github.com/jshea2/OSC-for-WLED/releases)

<img width="621" alt="Screen Shot 2022-10-26 at 8 46 42 PM" src="https://user-images.githubusercontent.com/70780576/209651737-8d60f707-355d-4de1-8ffd-c61f069ed7d3.png">

![Screenshot 2022-12-27 at 2 16 52 AM](https://user-images.githubusercontent.com/70780576/209651737-8d60f707-355d-4de1-8ffd-c61f069ed7d3.png)


## cables.gl example projects:

### [Sending and Receiving OSC Messages (Single and Bundled)](https://cables.gl/p/2iVGMg)

<img width="516" alt="Screen Shot 2022-10-31 at 8 13 24 PM" src="https://user-images.githubusercontent.com/70780576/199154079-7d9894cc-c070-41e9-88c0-f03442c4f23e.png">

### [Mobile Sensors (Zig Sim Pro -> WebsocketOSC -> Cables.gl)](https://cables.gl/p/4ajLcg)




https://user-images.githubusercontent.com/70780576/199161876-2752225f-9c16-4796-b968-7ae3595831a5.mov




## Features:
- Single OSC message supports muliple arguments `(v1.3.0)`
- Bundle OSC messages are supported `(v1.3.0)`
- When websocket recieves data it is then broadcast to all connected clients `(v1.3.0)`


## OSC to Websocket syntax

OSC Message:

`/foo` `1234`


Websocket Message:

```
{[
  "/foo",
  1234
]}
```

## Getting data in cables.gl

Use operators `ReceiveOSC_WebsocketOSC`, `SendOSC_WebsocketOSC`, or `ReceiveOSCBundle_WebsocketOSC` to parse data from and/or to the `Websocket` operator.

[Simple example cables.gl project](https://cables.gl/p/2iVGMg)


# Credits:
Inspired by [osc2ws](https://github.com/pandrr/osc2ws).
