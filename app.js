const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");  //canvas context 픽셀들을 컨트롤
const colors =document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStlye = "white";
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle =INITIAL_COLOR;
ctx.fillStlye=INITIAL_COLOR;
ctx.lineWidth = 2.5; 

let painting = false;
let filling = false;


function stopPainting () {
      painting = false;
}
function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting) {
        ctx.beginPath();  //path = line 좌표임
        ctx.moveTo(x , y);
    } else {
        ctx.lineTo(x,y);  //지금위치까지 위치를 가져오는
        ctx.stroke();  //stroke는 보이는선
    }
}

 function handleRnageChange(event) {
    const size=event.target.value;
    ctx.lineWidth = size;
 }

function handleColorClick(event) { 
    const color = event.target.style.backgroundcolor;
    ctx.strokeStyle = color;
    ctx.fillStlye = color;
}

function handleModeClick()
{
    if(filling === true){
        filling = false;
        mode.innerText="Fill";
    }  else {
        filling = true;
        mode.innerText="Paint";
    }
}

function handleCanvasClick(){
    if(filling){
    ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
}
}

function handleCM(event){
console.log(event);

}

function handleClickSave(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[Export]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);

}
Array.from(colors).forEach(color=> color.addEventListener("click", handleColorClick));


if(range) {
    range.addEventListener("input", handleRnageChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleClickSave);
}