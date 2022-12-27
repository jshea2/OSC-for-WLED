import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useState } from 'react'
import React from 'react'

const Hello = () => {

return (

<div>HI</div>

)




}


export default function Osc() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}




<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta
    http-equiv="Content-Security-Policy"
    content="script-src 'self' 'unsafe-inline'"
  />
    <title>OSC for WLED</title>
    <link rel="stylesheet" href="index.css">
  </head>
  <body>
   <div class="box">
    <div id="content" >
      <!-- <span class="label">OBSosc</span> -->
      <form action="#" id="ipcForm2">
        <br>
        <span class="label2">OSC Tester</span>
        <br>
        Address: <label for="oscaddress"></label>
              <input type="text" id="oscaddress" value="/wled/[ip]/seg/fx" size="18">
              </br>
        Argument: <label for="oscarg"></label>
            <input type="text" id="oscarg" value="7" size="18">
            </br>
</br>
        <input class="button" id="submit" type="submit" value="Send OSC">
      </form>
   </div>
    <script defer>
      const electron = require('electron')
      const ipcRenderer = electron.ipcRenderer
      // ipcRenderer.send('poop1', inputs)


      const submitFormButton = document.querySelector("#ipcForm2");

      submitFormButton.addEventListener("submit", function(event){
        event.preventDefault();   // stop the form from submitting
        ipcRenderer.send('submitted', "yes")
        let oscaddress
        let oscarg

        oscaddress = document.getElementById("oscaddress").value;
        document.getElementById("oscaddress").value = oscaddress
        //console.log(`This is input for ip ${obsip}`)

        oscarg = document.getElementById("oscarg").value
        document.getElementById("oscarg").value = oscarg

        let oscMessage = [oscaddress.split("_").join(" ").toString(), oscarg.split("_").join(" ").toString()]
        if (oscarg == ""){
          return
          // ipcRenderer.send('oscMessage', oscMessage[0])
        } else {
            // ipcRenderer.send('oscMessage', oscMessage)
            window.electron.ipcRenderer.send('oscMessage', oscMessage)
        }

        //console.log("This is the input for port" + obsport)
});
    </script>
  </body>
</html>
