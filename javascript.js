let grid=document.querySelector('#grid');
const default_size = 16;

let size = default_size;
const sizeSlider = document.querySelector('#sizeSlider');
const sizeValue = document.querySelector('#sizeValue');

const colorSelector = document.querySelector('#colorSelector');
let colorValue = '#000000';

const eraser = document.querySelector('#eraser');
const draw = document.querySelector('#draw');

// grid initial setup
function createGrid(size) {

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < (size*size); i++) {
        let cell=document.createElement('div');
        cell.classList.add('c16x16');
        cell.addEventListener('mouseover', setColor);
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
    if (mousedown == true) {
        let cell = event.target;
        cell.style.backgroundColor = colorValue;
}}

function setColorClick() {
    let cell = event.target;
    cell.style.backgroundColor = colorValue;
}


// grid resizing
sizeSlider.onchange = (e) => resizeGrid(e.target.value);

function resizeGrid(size) {
    sizeValueUpdate(size);
    eraseGrid();
    createGrid(size);
    setNewColor(colorSelector.value);
}

function eraseGrid() {
    grid.innerHTML = ''; // deletes the HTML content of grid
}

function sizeValueUpdate(size) {
    sizeValue.textContent = `${size} x ${size}`;
}