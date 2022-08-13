let grid=document.querySelector('#grid');

const default_size = 33;
let size = default_size;
const sizeSlider = document.querySelector('#sizeSlider');
const sizeValue = document.querySelector('#sizeValue');

const colorSelector = document.querySelector('#colorSelector');
let colorValue = '#000000';

const draw = document.querySelector('#draw');
const eraser = document.querySelector('#eraser');
const lighten = document.querySelector('#lighten');
const darken = document.querySelector('#darken');
const rainbow = document.querySelector('#rainbow');
const clear = document.querySelector('#clear');

let mode = 'draw';


// grid initial setup
function createGrid(size) {

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < (size*size); i++) {
        let cell=document.createElement('div');
        cell.classList.add('cell');
        cell.style.backgroundColor = 'rgb(255, 255, 255)';
        cell.addEventListener('mouseover', setColor);
        cell.addEventListener('mousedown', setColor);
        cell.addEventListener('click', setColorClick);
        cell.addEventListener('mouseout', allowReshading);
        grid.appendChild(cell);
    }
}
createGrid(size);

// eraser mode
eraser.onclick = () => eraserMode();
function eraserMode() {
    mode = 'erase';
    setMode();
    setNewColor('rgb(255, 255, 255');
}

// draw mode
draw.onclick = () => drawMode();
function drawMode() {
    mode = 'draw';
    setMode();
    setNewColor(colorSelector.value);
}

// color selection
colorSelector.oninput = (e) => colorSelection((e.target.value));

function colorSelection(newColor) {
    setNewColor(newColor);
    mode = 'draw';
    setMode();
}

// allow re-shading
function allowReshading() {
    let cell = event.target;
    cell.classList.remove('shaded');
}

// RGB to Hex
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// darken mode
darken.onclick = () => (darkMode());

function darkMode() {
    mode = 'dark';
    setMode();
}

function darkenColor() {

    var R = parseInt(colorValue.substring(1,3),16);
    var G = parseInt(colorValue.substring(3,5),16);
    var B = parseInt(colorValue.substring(5,7),16);

    R = parseInt(R - 20);
    G = parseInt(G - 20);
    B = parseInt(B - 20);

    R = (R>0)?R:0;  
    G = (G>0)?G:0;  
    B = (B>0)?B:0;

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    colorValue = "#"+RR+GG+BB;
}


// lighten mode
lighten.onclick = () => (lightMode());

function lightMode() {
    mode = 'light';
    setMode();
}

function lightenColor() {

    var R = parseInt(colorValue.substring(1,3),16);
    var G = parseInt(colorValue.substring(3,5),16);
    var B = parseInt(colorValue.substring(5,7),16);

    R = parseInt(R + 20);
    G = parseInt(G + 20);
    B = parseInt(B + 20);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    colorValue = "#"+RR+GG+BB;
}


// rainbow mode
rainbow.onclick = () => (rainbowMode())
function rainbowMode() {
    mode = 'rainbow';
    setMode();
}

function rainbowColor() {
    colorValue = `hsl(${Math.random() * 360}, 100%, 50%)`;
}


// set color of a cell
let mousedown = false;
document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false);

function setNewColor(newColor) {
    colorValue = newColor;
}

function setColor() {
    event.preventDefault();
    let cell = event.target;
    if (mousedown == true) {
        if (mode == 'light') {
            if (!cell.classList.contains('shaded')) {
                let arrayString = cell.style.backgroundColor.slice(4,-1);
                let arrayNum = arrayString.split(', ').map(Number);
                colorValue = rgbToHex(arrayNum[0], arrayNum[1], arrayNum[2]);
                lightenColor();
                cell.style.backgroundColor = colorValue;
                cell.classList.add('shaded');
            }
        }
        if (mode == 'dark') {
            if (!cell.classList.contains('shaded')) {
                let arrayString = cell.style.backgroundColor.slice(4,-1);
                let arrayNum = arrayString.split(', ').map(Number);
                colorValue = rgbToHex(arrayNum[0], arrayNum[1], arrayNum[2]);
                darkenColor();
                cell.style.backgroundColor = colorValue;
                cell.classList.add('shaded');
            }
        }
        if (mode == 'draw' || mode == 'erase') {
            cell.style.backgroundColor = colorValue;
        }
        if (mode == 'rainbow') {
            rainbowColor();
            cell.style.backgroundColor = colorValue;
        }
}}

function setColorClick() {
    let cell = event.target;
    cell.classList.remove('shaded');
    if (mode == 'light') {
        if (!cell.classList.contains('shaded')) {
            let arrayString = cell.style.backgroundColor.slice(4,-1);
            let arrayNum = arrayString.split(', ').map(Number);
            colorValue = rgbToHex(arrayNum[0], arrayNum[1], arrayNum[2]);
            lightenColor();
            cell.style.backgroundColor = colorValue;
            cell.classList.add('shaded');
        }   
    }
    if (mode == 'dark') {
        if (!cell.classList.contains('shaded')) {
            let arrayString = cell.style.backgroundColor.slice(4,-1);
            let arrayNum = arrayString.split(', ').map(Number);
            colorValue = rgbToHex(arrayNum[0], arrayNum[1], arrayNum[2]);
            darkenColor();
            cell.style.backgroundColor = colorValue;
            cell.classList.add('shaded');
        }
    }
    if (mode == 'draw' || mode == 'erase') {
        cell.style.backgroundColor = colorValue;
    }
    if (mode == 'rainbow') {
        rainbowColor();
        cell.style.backgroundColor = colorValue;
    }
}


// grid resizing and clear
sizeSlider.onchange = (e) => resizeGrid(e.target.value);
clear.onclick = () => resizeGrid(size);

function resizeGrid(newSize) {
    size = newSize;
    sizeValueUpdate(newSize);
    grid.innerHTML = '';
    createGrid(newSize);
    drawMode();
}

function sizeValueUpdate(size) {
    sizeValue.textContent = `${size} x ${size}`;
}


// special class to show which mode is selected
function setMode() {
    removeModeClass();
    if (mode == 'draw') {
        draw.classList.add('currentMode');
    }
    else if (mode == 'erase') {
        eraser.classList.add('currentMode');
    }
    else if (mode == 'light') {
        lighten.classList.add('currentMode');
    }
    else if (mode == 'dark') {
        darken.classList.add('currentMode');
    }
    else if (mode == 'rainbow') {
        rainbow.classList.add('currentMode');
    }
}

function removeModeClass() {
    if (draw.classList.contains('currentMode')) {
        draw.classList.remove('currentMode');
    }
    else if (eraser.classList.contains('currentMode')) {
        eraser.classList.remove('currentMode');
    }
    else if (lighten.classList.contains('currentMode')) {
        lighten.classList.remove('currentMode');
    }
    else if (darken.classList.contains('currentMode')) {
        darken.classList.remove('currentMode');
    }
    else if (rainbow.classList.contains('currentMode')) {
        rainbow.classList.remove('currentMode');
    }
}