let grid=document.querySelector('#grid');

const default_size = 30;
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
        cell.addEventListener('mouseover', setColor);
        cell.addEventListener('mouseover',)
        cell.addEventListener('mousedown', setColor);
        cell.addEventListener('click', setColorClick);
        grid.appendChild(cell);
    }
}
createGrid(size);

// eraser
eraser.onclick = () => (setNewColor('white'));

// draw mode
draw.onclick = () => (setNewColor(colorSelector.value));

// lighten mode
lighten.onclick = () => (lightMode());

function lightMode() {
    mode = 'light';
    colorValue = colorSelector.value;
}

function lightenColor() {

    var R = parseInt(colorValue.substring(1,3),16);
    var G = parseInt(colorValue.substring(3,5),16);
    var B = parseInt(colorValue.substring(5,7),16);

    /*
    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);
    */
    R = parseInt(R + 15);
    G = parseInt(G + 15);
    B = parseInt(B + 15);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    colorValue = "#"+RR+GG+BB;
    console.log(colorValue);
}


// set color of a cell
let mousedown = false;
document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false);
colorSelector.oninput = (e) => (setNewColor(e.target.value));

function setNewColor(newColor) {
    colorValue = newColor;
}

function setColor() {
    event.preventDefault();
    let cell = event.target;
    if (mousedown == true) {
        if (mode == 'light') {
            console.log(cell.style.backgroundColor, colorValue);
            if (cell.style.backgroundColor == colorValue) {
                console.log('reached');
                lightenColor();
                cell.style.backgroundColor = colorValue;
            }
        }
        if (mode == 'draw') {
            cell.style.backgroundColor = colorValue;
        }
}}

function setColorClick() {
    let cell = event.target;
    cell.style.backgroundColor = colorValue;
}


// grid resizing and clear
sizeSlider.onchange = (e) => resizeGrid(e.target.value);
clear.onclick = () => resizeGrid(size);

function resizeGrid(newSize) {
    size = newSize;
    sizeValueUpdate(newSize);
    eraseGrid();
    createGrid(newSize);
    setNewColor(colorSelector.value);
}

function eraseGrid() {
    grid.innerHTML = ''; // deletes the HTML content of grid
}

function sizeValueUpdate(size) {
    sizeValue.textContent = `${size} x ${size}`;
}