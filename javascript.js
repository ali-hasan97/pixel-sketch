let sketch=document.querySelector('#sketch');

function createGrid() {
    for (let i = 0; i < (100*100); i++) {
        let cellName=document.createElement('div');
        cellName.classList.add('c16x16');
        sketch.appendChild(cellName);
    }
}
createGrid();

let mousedown = 0;
let body = document.querySelector('body');

body.addEventListener('mousedown', function(e) {
    mousedown = 1;
})

body.addEventListener('mouseup', function(e){
    mousedown = 0;
})


sketch.addEventListener('mouseover', function(e) {
    if (mousedown == 1) {
        let cell = event.target;
        cell.style.backgroundColor = 'black';
}})
