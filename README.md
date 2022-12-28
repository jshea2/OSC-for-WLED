<img width="221" alt="osc for wled" src="https://user-images.githubusercontent.com/70780576/209650812-d1d315dc-fc59-43d2-9ff8-b61f519fdd6e.png">

# OSC for WLED
Convert OSC Commands to the WLED JSON API

### [Download Here](https://github.com/jshea2/OSC-for-WLED/releases)

![Screenshot 2022-12-27 at 2 16 52 AM](https://user-images.githubusercontent.com/70780576/209651737-8d60f707-355d-4de1-8ffd-c61f069ed7d3.png)

## Features:
- Single OSC message supports muliple arguments `(v1.0.0)`
- Bundle OSC messages are NOT supported `(v1.0.0)`
- You can send OSC to different wled devices concurrently
      - However, sending multiple OSC commands simultaneously to the same device is NOT recommended.
                 - Try delaying OSC messages apart by 200ms



# OSC Commands:

OSC Message Syntax:

`/wled/[device-ip]/[state]` `[value]`

Nested Segments Syntax:

`/wled/[device-ip]/seg/[seg-state]` `[value]`



Reference [JSON Key and Value Range API](https://github.com/Aircoookie/WLED-Docs/blob/main/docs/interfaces/json-api.md#state-object) for `state` and `value`

### Examples:

**/on**

`/wled/192.168.99.64/on` `true`

- Toggles wled device on/off

**/bri**

`/wled/192.168.99.64/bri` `255`

- Turn wled device brightness to full

**/ps**

`/wled/192.168.99.64/ps` `4`

- Trigger preset 4 on wled device



Reference [JSON Segment Key and Value Range API](https://github.com/Aircoookie/WLED-Docs/blob/main/docs/interfaces/json-api.md#contents-of-the-segment-object) for `seg-state` and `value`

### Examples:

**/seg/sx**

`/wled/192.168.99.64/seg/sx` `255`

- Change relative effect speed slider to full on wled device

**/seg/ix**

`/wled/192.168.99.64/seg/ix` `128`

- Change effect intensity slider to half on wled device

**/seg/fx**

`/wled/192.168.99.64/seg/fx` `7`

- Trigger effect 7 on wled device



## Custom OSC Commands:


**/rgb**

`/wled/[device-ip]/rgb` `[red 0-255]` `[green 0-255]` `[blue 0-255]`

- Set Color by RGB Values
- example: `/wled/192.168.99.64/rgb` `255` `0` `128`
    - This changes the wled device to purple

**/info**
`/wled/[device-ip]/info`
- Logs the wled devices info, effects, palettes, and presets to the dev console
- example: `/wled/192.168.99.64/info`




## OSC to JSON Example:

OSC Message:
`/wled/192.168.99.64/seg/fx` `1`

JSON Message to `192.168.99.64`:
```
{
  seg: {
    fx: 1
  }
}
```


# Credits:
Powered by npm [wled-client](https://github.com/ShiftLimits/wled-client) & [node-osc](https://github.com/MylesBorins/node-osc#readme)

## Support The Project ❤️
### If OSC for WLED helped you, consider helping the project by making a one time donation via **[PayPal](http://paypal.me/joeshea2)**

#
## Join the Discord Community

<a href="https://discord.gg/FJ79AKPgSk">
        <img src="https://img.shields.io/discord/308323056592486420?logo=discord"
            alt="chat on Discord"></a>
