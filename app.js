const fileInput = document.getElementById('image-btn');
const textBtn = document.getElementById('text-btn');
const saveBtn = document.getElementById('save-btn');
const eraserBtn = document.getElementById('eraser-btn');
const resetBtn = document.getElementById('reset-btn');
const modeBtn = document.getElementById('mode-btn');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const color = document.getElementById('color');
const lineWidth = document.getElementById('line-width');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';
let isPainting = false;
let isFilling = false;
let currColor = 'black';
let isStamping = false;
let inputText = 'Hello world'

function init() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = currColor;
}

init();

function onMove(event) {
    if (isStamping) {
        return;
    }
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
}
function startPainting() {
    isPainting = true;
}

function cancelPainting() {
    ctx.beginPath();
    isPainting = false;
}

function onCanvasClick(event) {
    if (isStamping) {
        ctx.fillText(inputText, event.offsetX, event.offsetY);
        return;
    }
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasClick);

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
    ctx.font = (event.target.value * 2).toString() + 'px serif';
}

lineWidth.addEventListener('change', onLineWidthChange);

function changeAllColor(color) {
    currColor = color;
    ctx.strokeStyle = currColor;
    ctx.fillStyle = currColor;
}

function onColorChange(event) {
    changeAllColor(event.target.value);
}

color.addEventListener('change', onColorChange);

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    color.value = colorValue;
    changeAllColor(colorValue);
}

colorOptions.forEach(color => color.addEventListener('click', onColorClick));

function onModeClick() {
    if(isFilling) {
        isFilling = false;
        modeBtn.innerText = 'Draw';

    } else {
        isFilling = true;
        modeBtn.innerText = 'Fill';
    }
    isStamping = false;
}

modeBtn.addEventListener('click', onModeClick);

function onResetClick() {
    var result = confirm('Do you really want to reset it?')
    if(result) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        isFilling = false;
        modeBtn.innerText = 'Draw';
        changeAllColor(currColor);
    }
}

resetBtn.addEventListener('click', onResetClick);

function onEraserClick() {
    ctx.strokeStyle = 'white';
    isFilling = false;
    isStamping = false;
    modeBtn.innerText = 'Draw';
}

eraserBtn.addEventListener('click', onEraserClick);

function onSaveClick() {
    const url = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my_drawing.png'
    link.click();
}

saveBtn.addEventListener('click', onSaveClick);

function onTextClick() {
    if (isStamping) {
        isStamping = false;
        textBtn.style.color = '#666666';
    } else {
        isStamping = true;
        textBtn.style.color = 'tomato';
        inputText = prompt("Make your Stamp");
    }
}

textBtn.addEventListener('click', onTextClick);

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

fileInput.addEventListener('change', onFileChange);