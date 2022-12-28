/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
const fs = require('fs')
const { WLEDClient } = require('wled-client')
const { Server } = require('node-osc');





// export default class AppUpdater {
//   constructor() {
//     log.transports.file.level = 'info';
//     autoUpdater.logger = log;
//     autoUpdater.checkForUpdatesAndNotify();
//   }
// }

let mainWindow: BrowserWindow | null = null;

// ipcMain.on('ipc-example', async (event, arg) => {
//   const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
//   console.log(msgTemplate(arg));
//   event.reply('ipc-example', msgTemplate('pong'));
// });

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

// const isDevelopment =
//   process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

// if (isDevelopment) {
//   require('electron-debug')();
// }

// const installExtensions = async () => {
//   const installer = require('electron-devtools-installer');
//   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//   const extensions = ['REACT_DEVELOPER_TOOLS'];

//   return installer
//     .default(
//       extensions.map((name) => installer[name]),
//       forceDownload
//     )
//     .catch(console.log);
// };

const windowWidth = 260;
const windowHeight = 350;

const createWindow = async () => {
  // if (isDevelopment) {
  //   await installExtensions();
  // }

  // ipcMain.on('ping', (event, arg) => {
  //   console.log(arg)
  //   mainWindow.webContents.send('test', "HIIIIIII")
  // })

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: windowWidth,
    height: windowHeight,
    autoHideMenuBar: true,
    backgroundColor: '#081421', // background color
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });


  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
 // new AppUpdater();

  let oscIpIn
  let oscPortIn
  // let oscIpOut
  // let oscPortOut
  // let watchoutIpOut
  // let watchoutPortOut
  // let oscInEnabled
  // let oscOutEnabled


  // Log to Browser Console
  function logEverywhere(message) {
    if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.executeJavaScript(`console.log(\`${message}\`)`);
    }
    }

// Path To Data
  const dataPath =
  process.env.NODE_ENV === 'development'
    ? path.join(__dirname, '../../data')
    : path.join(process.resourcesPath, 'data');

  //Read data from config.JSON file and handle data to renderer
  const getConfig = () => {
    const path1 = path.join(dataPath, 'config.json')
    fs.readFile(path1, null, (_, data) => {
      const jsonData = JSON.parse(data)
      oscIpIn = jsonData.iposc
      oscPortIn = jsonData.portosc
      // oscIpOut = jsonData.iposcout
      // oscPortOut = jsonData.portoscout
      // watchoutIpOut = jsonData.ipwatchout
      // watchoutPortOut = jsonData.portwatchout
      // oscInEnabled = jsonData.oscinenabled
      // oscOutEnabled = jsonData.oscoutenabled
      console.log(`i got the config file:`)
      console.log(jsonData)
      ipcMain.handle('configDefaults', async (_,message) => {
        return jsonData
      })
    })
  }
  getConfig()

// Write data to config.JSON file
  const saveData = (config) => {
    const finished = (error) => {
      if(error){
        console.log(error);
        return;
      }
    }
    const jsonData = JSON.stringify(config, null, 2)
    fs.writeFile(path.join(dataPath, 'config.json'), jsonData, finished);
    console.log("saved file")
  }


  //Test OSC Message
  ipcMain.handle('oscmessage', async (_, msg) => {
    console.log(msg)
    mainWindow.setSize((windowWidth*2+100),windowHeight)
    mainWindow.webContents.openDevTools();
    let oscArray = msg[0].split('/');


    if (msg[0].includes("/wled") && msg[0].includes("/info")){
      async function init() {
          const wled = new WLEDClient(`${oscArray[2]}`)
          await wled.init()
          //console.log(wled.info)

          await logEverywhere(`WLED DEVICE INFO:\n\n${JSON.stringify(wled.info)}`)
          await logEverywhere(`WLED DEVICE EFFECTS:\n\n${wled.effects}`)
          await logEverywhere(`WLED DEVICE PALETTES:\n\n${wled.palettes}`)
          await logEverywhere(`WLED DEVICE PRESETS:\n\n${JSON.stringify(wled.presets)}`)

          wled.disconnect()
      }
      init().catch(console.error)
      console.log(`True`);
  }

    if (msg[0].includes("/wled") && msg[0].includes("/rgb")){
      async function init() {
          const wled = new WLEDClient(`${oscArray[2]}`)
          await wled.init()
          //console.log(wled.info)
          console.log(wled.effects)

          //console.log(wled.state.brightness) // 255
          await wled.setColor([msg[1], msg[2], msg[3]])
          await console.log(wled.state) // 128
          await console.log(wled.state.segments[0].colors)

          wled.disconnect()
      }
      init().catch(console.error)
      console.log(`True`);
  }



  if (oscArray.length === 4){
      if (msg[0].includes("/wled")){
          async function init() {
              const wled = new WLEDClient(`${oscArray[2]}`)
              await wled.init()

              //console.log(wled.state.brightness) // 255
              wled.updateState({
                  [oscArray[3]]: msg[1]
              })
              await console.log(wled.state) // 128
              wled.disconnect()
          }
          init().catch(console.error)
          console.log(`True`);
      }
  }

  if (oscArray.length === 5){

      if (msg[0].includes("/wled")){
          async function init() {
              const wled = new WLEDClient(`${oscArray[2]}`)
              await wled.init()

              //console.log(wled.state.brightness) // 255
              wled.updateState({
                  [oscArray[3]]: {
                      [oscArray[4]]: msg[1]
                  }
              })
              await console.log(wled.state) // 128
              await console.log(wled.state.segments[0].colors)

              wled.disconnect()
          }
          init().catch(console.error)
          console.log(`True`);
      }
  }
  })

  //Submit and Config Handle
  ipcMain.handle('config', async (_, message) => {
    mainWindow.webContents.send("woconnected", true)
    console.log(message)
    saveData(message)
    oscIpIn = message.iposc
    oscPortIn = message.portosc
    mainWindow.setSize((windowWidth*2+100),windowHeight)
    mainWindow.webContents.openDevTools();
    //logEverywhere("")


    var oscServer = new Server(oscPortIn, oscIpIn, () => {
      console.log('OSC Server is listening');
    });

    oscServer.on('message', function (msg) {
      logEverywhere(`OSC IN: ${msg}`)
        let oscArray = msg[0].split('/');
        console.log(oscArray)

        if (msg[0].includes("/wled") && msg[0].includes("/info")){
          console.log("/info triggered")
          async function init() {
              const wled = new WLEDClient(`${oscArray[2]}`)
              await wled.init()
              //console.log(wled.info)

              await logEverywhere(`WLED DEVICE INFO:\n\n${JSON.stringify(wled.info)}`)
              await logEverywhere(`WLED DEVICE EFFECTS:\n\n${wled.effects}`)
              await logEverywhere(`WLED DEVICE PALETTES:\n\n${wled.palettes}`)
              await logEverywhere(`WLED DEVICE PRESETS:\n\n${JSON.stringify(wled.presets)}`)

              wled.disconnect()
          }
          init().catch(console.error)
          console.log(`True`);
          return
      }


        if (msg[0].includes("/wled") && msg[0].includes("/rgb")){
          console.log("rgb triggered")
            async function init() {
                const wled = new WLEDClient(`${oscArray[2]}`)
                await wled.init()
                //console.log(wled.info)

                await wled.setColor([msg[1], msg[2], msg[3]])

                wled.disconnect()
            }
            init().catch(console.error)
            console.log(`True`);
            return
        }


        if (oscArray.length === 4){
            if (msg[0].includes("/wled")){
              console.log("4 length triggered")
                async function init() {
                    const wled = new WLEDClient(`${oscArray[2]}`)
                    await wled.init()

                    //console.log(wled.state.brightness) // 255
                    await wled.updateState({
                        [oscArray[3]]: msg[1]
                    })
                    await console.log(wled.state) // 128
                    wled.disconnect()
                }
                init().catch(console.error)
                console.log(`True`);
                return
            }
        }

        if (oscArray.length === 5){

            if (msg[0].includes("/wled")){
              console.log("5 length triggered")
                async function init() {
                    const wled = new WLEDClient(`${oscArray[2]}`)
                    await wled.init()

                    //console.log(wled.state.brightness) // 255
                    await wled.updateState({
                        [oscArray[3]]: {
                            [oscArray[4]]: msg[1]
                        }
                    })
                    await console.log(wled.state) // 128
                    await console.log(wled.state.segments[0].colors)

                    wled.disconnect()
                }
                init().catch(console.error)
                console.log(`True`);
                return
            }
        }


    });








    })

  ipcMain.handle('consoleWindow', async (_, message) => {
    console.log("I GOT THE ARROW THING")
    console.log(message)
    if (message == false){
      mainWindow.webContents.openDevTools()
      mainWindow.setSize(windowWidth*2+100,windowHeight)
    } else if (message == true){
      mainWindow.webContents.closeDevTools()
      mainWindow.setSize(windowWidth,windowHeight)
    }
    return "Hi there"
  })

};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
