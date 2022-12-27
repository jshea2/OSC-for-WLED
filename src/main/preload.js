const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electron', {
  sendConfig: (message) => ipcRenderer.invoke('config', message),
  sendOscMessage: (message) => ipcRenderer.invoke('oscmessage', message),
  getConfig: () => ipcRenderer.invoke('configDefaults'),
  getIsRunOnce: () => ipcRenderer.invoke('isRunOnce'),
  console: (message) => ipcRenderer.invoke('consoleWindow', message),
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      //console.log(`on renderer was triggered`)
      ipcRenderer.on(channel, (event, func));
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`

      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
    send(channel, func) {
      console.log("this is the send preload")
      ipcRenderer.send(channel, func);
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.send(channel, func);
      }
    },
  },
});
