const colors = document.getElementsByClassName("jsColor");
const canvas = document.getElementById("jsCanvas");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const clearBtn = document.getElementById("jsClear");
const saveBtn = document.getElementById("jsSave");
const saveNameContainer = document.getElementById("saveNameContainer");
const backArea = document.getElementById("backArea");
const saveName = document.getElementById("saveName");
const cancelSave = document.getElementById("cancelSave");
const jsSaveToDesktop = document.getElementById("jsSaveToDesktop");
const ctx = canvas.getContext("2d");

const CANVAS_SIZE_X = canvas.offsetWidth;
const CANVAS_SIZE_Y = canvas.offsetHeight; 

canvas.width = CANVAS_SIZE_X;
canvas.height = CANVAS_SIZE_Y;

let painting = false;
let filling = false;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
ctx.fillStyle = "2c2c2c";

function onMouseMove(event) {
    const X = event.offsetX;
    const Y = event.offsetY;

    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(X, Y);
    } else {
        ctx.lineTo(X, Y);
        ctx.stroke();
    }
}

function startPainting(event) {
    painting = true
}

function stopPainting() {
    painting = false;
}

function handleClickColor(event) {
    Array.from(colors).forEach(
        color => color.classList.remove("active")
    );
    
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    event.target.classList.add("active");
}

function handleRangeChange(event) {
    const rangeSize = event.target.value;
    ctx.lineWidth = rangeSize;
}

function handleModeChange() {
    if(filling === false) {
        filling = true;
        mode.innerText = "PAINT";
    } else {
        filling = false;
        mode.innerText = "FILL";
    }
}

function handleClickCanvas() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE_X,  CANVAS_SIZE_Y);
    }
}

function handleCT(event) {
    event.preventDefault();
}

function handleClickSave() {
    const url = canvas.toDataURL();
    const image = document.createElement("a");
    const title = saveName.value;
    image.href = url;
    if(title.length > 0) {
        image.download = title;
    } else {
        image.download = "paintJS[🎨]";
    }
    image.click();
    handleClickCancel();
}

function handleOpenSaveContainer() {
    saveNameContainer.style.display = "block";
    saveName.focus();
}
function handleClickClear() {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function handleClickCancel() {
    saveName.value = "";
    saveNameContainer.style.display = "none";
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleClickCanvas);
    canvas.addEventListener("contextmenu", handleCT);
}

Array.from(colors).forEach(
    color => color.addEventListener("click", handleClickColor)
);

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeChange);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleOpenSaveContainer);
}

if(clearBtn) {
    clearBtn.addEventListener("click", handleClickClear);
}

if(saveNameContainer) {
    backArea.addEventListener("click", handleClickCancel);
    cancelSave.addEventListener("click", handleClickCancel);
    jsSaveToDesktop.addEventListener("click", handleClickSave);
}