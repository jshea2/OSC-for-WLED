![128x128](https://user-images.githubusercontent.com/70780576/198192975-0566f616-64e9-49d2-ae14-74e4e7bb0574.png)

# OSC for WLED
Send and Recieve OSC via Websockets

### [Download Here](https://github.com/jshea2/WebsocketOSC/releases)

<img width="421" alt="Screen Shot 2022-10-26 at 8 46 42 PM" src="https://user-images.githubusercontent.com/70780576/198193033-a9c5f42b-6dba-4a1d-b6f7-7d033230121e.png">


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
