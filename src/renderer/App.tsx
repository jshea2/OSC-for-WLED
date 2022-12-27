import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useState } from 'react'
import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import RecipeReviewCard from './ConsoleCollapse';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
let packageJson = require("../../package.json");

let isRunOnce1 = true


let iposc
let portosc
let iposcout
let portoscout
let ipwatchout
let portwatchout
let osctest
let oscinenabled
let oscoutenabled
let buttonConnected
let textConnected = "Connect"

const Hello = () => {
 //console.log("New Render!")

let [oscIpIn, setOscIpIn] = useState("");
let [oscPortIn, setOscPortIn] = useState("");
let [osctest, setOscTest] = useState("/wled/[ip]/seg/fx,1");
let [oscIpOut, setOscIpOut] = useState("");
let [oscPortOut, setOscPortOut] = useState("");
let [watchoutIpOut, setWatchoutIpOut] = useState("");
let [watchoutPortOut, setWatchoutPortOut] = useState("");
let [connected, setConnected] = useState("")
let [_, setTextConnect] = useState("Connect")

const [checked, setChecked] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

const [checke, setChecke] = React.useState("");

  const handleChang = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecke(event.target.checked);
  };
  //osctest = "/wled/[ip]/seg/fx,4"

// const openDev = () => {
//   window.electron.console("Hi")
// }

//window.electron.console("hiiiii")

// iposc = oscIpIn
// portosc = oscPortIn
// ipwatchout = watchoutIpOut
// portwatchout = watchoutPortOut

window.electron.ipcRenderer.on('woconnected', (event, arg) => {
  //console.log("App on happend")
  //console.log(arg)
  if (arg == true){
    setConnected(buttonConnected = "success")
    setTextConnect(textConnected = "Connected")
} else {
  setConnected(buttonConnected = "error")
  setTextConnect(textConnected = "Disconnected")
  }
  console.log(`OSC (In)\nIP: ${iposc} \nPort: ${portosc}\n\n`)
})

const getConfigDefaults = async () => {
  const result = await electron.getConfig()
  iposc = result.iposc
  portosc = result.portosc
  // iposcout = result.iposcout
  // portoscout = result.portoscout
  // ipwatchout = result.ipwatchout
  // portwatchout = result.portwatchout
  // oscinenabled = result.oscinenabled
  // setChecked(oscinenabled)
  // oscoutenabled = result.oscoutenabled
  // setChecke(oscoutenabled)


  console.log(`[OSC for WLED Version: ${packageJson.version}]`)
  console.log(`[Last Used Config Settings]\n\nOSC (In)\nIP: ${iposc} \nPort: ${portosc}\n\n`)


  let input = document.getElementById("input1")
  input.value = iposc

  let input2 = document.getElementById("input2")
  input2.value = portosc

  // let input3 = document.getElementById("input3")
  // input3.value = osctest

  // let input5 = document.getElementById("input5")
  // input5.value = iposcout

  // let input6 = document.getElementById("input6")
  // input6.value = portoscout

  // let input3 = document.getElementById("input3")
  // input3.value = ipwatchout

  // let input4 = document.getElementById("input4")
  // input4.value = portwatchout

  // oscinenabled = checked

  // oscoutenabled = checke


}

const isRunOnce = async () => {
  //const result = await window.electron.getIsRunOnce()
  //console.log(isRunOnce1)
  if (isRunOnce1){
    isRunOnce1 = false
    getConfigDefaults()
  }
}
isRunOnce()


const handleSubmit = async (e) => {
  e.preventDefault()

  // window.electron.ipcRenderer.send('ping', 'ping')

  if(textConnected == "Connected"){
    return
  }

  // oscinenabled = checked
  // oscoutenabled = checke
  // setTextConnect(textConnected = "Connecting...")
  const configData = {iposc, portosc}
  console.log("[OSC CONNECTED]\n[OSC SERVER RUNNING...]")
  //console.log(configData)
  const result = await window.electron.sendConfig(configData)
  //console.log(result)

}

const handleSubmitTest = async (e) => {
  e.preventDefault()
  //const result = await window.electron.sendConfig(configData)
  // ipcRenderer.send('submitted', "yes")

  let oscMessage = osctest.split(",")
  console.log(`OSC TEST: ${oscMessage[0]}, ${oscMessage[1]}`)
  //console.log("Send Button Pressed")


  if (oscMessage == ""){
    return
    // ipcRenderer.send('oscMessage', oscMessage[0])
  } else {
      // ipcRenderer.send('oscMessage', oscMessage)
      const result = await window.electron.sendOscMessage(oscMessage)
  }
}


// const submitFormButton = document.querySelector("#ipcForm2");



  return(
    <div className='body1'>
      <form onSubmit={
        handleSubmit
        }>
        <Box
      //component="form"
      sx={{
        '& .MuiTextField-root': { m: 4, width: '21ch', },
        tabSize: 2
      }}
      noValidate
      autoComplete="off"
      />
      <div>
      <FormGroup>
      </FormGroup>
      <h2 className='App-header'>OSC (In)</h2>

      <TextField
      sx={{
        input: { color: 'white'},
        fieldSet: { borderColor: 'white'},
        label: { color: 'white'}
      }}
      size="small"
      margin="dense"
        id="input1"
        label="IP"w
        defaultValue={oscIpIn}
        onChange={(e) => setOscIpIn(
          e.target.value,
          iposc = e.target.value,
          //console.log(e)
        )}
        />
      <TextField
      sx={{
        input: { color: 'white'},
        fieldSet: { borderColor: 'white'},
        label: { color: 'white'}
      }}
        id="input2"
        size="small"
        margin='dense'
        label="Port"
        defaultValue={oscPortIn}
        onChange={(e) => setOscPortIn(
          portosc = e.target.value,
          e.target.value
          )}
        />




      <Button sx={{
        position:'absolute',
        bottom:"0",
        right:"0",
        height:60
        }} fullWidth variant='contained'color={buttonConnected} type='submit'>{textConnected}</Button>
      </div>
      </form>

      <form onSubmit={
        handleSubmitTest
        }>
          <h2 className='App-header'>OSC Tester</h2>

<TextField
sx={{
  input: { color: 'white'},
  fieldSet: { borderColor: 'white'},
  label: { color: 'white'}
}}
size="small"
margin="dense"
  id="input3"
  label="OSC Message"w
  defaultValue={osctest}
  onChange={(e) => setOscTest(
    e.target.value,
    osctest = e.target.value,
    //console.log(e)
  )}
  />

<Button sx={{

        height:60
        }}color={buttonConnected} type='submit'>Send</Button>

</form>
      {/* <form action="#" id="ipcForm2">
        <br>
        <span class="label2">OSC Tester</span>
        <br>
        <label for="oscaddress"></label>
              <input type="text" id="oscaddress" value="/wled/[ip]/seg/fx" size="18">
              </br>
        <label for="oscarg"></label>
            <input type="text" id="oscarg" value="7" size="18">
        <input class="button" id="submit" type="submit" value="Send OSC">
      </form> */}

    </div>
  )
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
