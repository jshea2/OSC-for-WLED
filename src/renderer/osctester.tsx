import { render } from 'react-dom';
import Osc from './Osc';
import './index.css';

var windowTopBar = document.createElement('div')
windowTopBar.style.width = "100%"
windowTopBar.style.height = "60px"
windowTopBar.style.position = "absolute"
windowTopBar.style.top = windowTopBar.style.left = 0
windowTopBar.style.webkitAppRegion = "drag"
document.body.appendChild(windowTopBar)
document.body.style.borderRadius = "25px"
// document.body.style.backgroundColor = "grey"
document.body.style.color = "rgb(255,255,200)"

render(<Osc />, document.getElementById('root'));
