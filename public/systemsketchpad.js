

// Variables for referencing the canvas and 2dcanvas context
var canvas,ctx;


async function getvalvedata() {
    await fetch('./system1valves').then(response => response.json()).then(data => valvedata = data).catch(error => console.log(error));
    populatevalves(valvedata);
}

async function populatevalves(valvedata) {
    //console.log(valvedata);
    for(i=0; i<await valvedata.length; i++) {
        var cords = document.getElementById(valvedata[i].valve+"area");
        cords.coords = valvedata[i].coords;
        var status = document.getElementById(valvedata[i].valve+"statusresult")
        if (valvedata[i].status === "Danger_Tag_Open") {
            status.style.color = "green";
          } else if (valvedata[i].status === "Danger_Tag_Shut") {
            status.style.color = "red";
        } else if (valvedata[i].status === "Caution_Tag") {
            status.style.color = 'yellow';
        } else if (valvedata[i].status === "Valve_Working") {
            status.style.color = 'blue';
        } else {
            return
        }
    }
}

// Variables to keep track of the mouse position and left-button status 
var mouseX,mouseY,mouseDown=0;

// Draws a dot at a specific position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position, the size of the dot
function drawDot(ctx,x,y,size) {
    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    r=255; g=0; b=0; a=255;

    // Select a fill style
    ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";

    // Draw a filled circle
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
} 

function tagoutproposal() {
    var proposal = document.getElementById("proposal");
    if(proposal.style.display === "none") {
        proposal.style.display = "block";
        proposal.style.top = 300+'px';
    } else {
        proposal.style.display = "none";
    }
}


async function valvewindow(data) {
    console.log(data)
    var wafdata = data;
    const valve = wafdata[0].id_valve;
    //console.log(JSON.parse(vdata));
console.log("valve window valve: " + valve);
const statusform = document.getElementById("statusform");
let input = document.createElement("p");
let removeform = document.getElementById("removewaf0")
input.id = "inputvalve";
input.name = valve;
statusform.appendChild(input);
inputvalve.innerHTML = "valve: " + valve;
input.value = valve;
let wafslabel = document.createElement("label");
wafslabel.innerHTML = "WAFs attached: ";
statusform.appendChild(wafslabel);
let valvewafs = document.createElement("div");
valvewafs.id = "valvewafs";
statusform.appendChild(valvewafs);    
if(wafdata.length !== 0) { 
for(i=0;i<await wafdata.length;i++) {
    const inputstuffs = document.createElement("p");
    const removestuffs = document.createElement("option")
    inputstuffs.id = "inputstuff" + i;
    removestuffs.id = "removestuff" + i;
    removestuffs.innerHTML = await wafdata[i].waf;
    inputstuffs.innerHTML = await wafdata[i].waf;
    removestuffs.value = removestuffs.innerHTML; 
    valvewafs.appendChild(inputstuffs);
    removeform.appendChild(removestuffs);
    
}
} else { return };

let btn = document.createElement("button");
btn.name = "submit";
btn.id = "formbutton";
btn.innerHTML = "save status";
let newline2 = document.createElement("P");
statusform.appendChild(newline2);
let statuslabel = document.createElement("label");
statuslabel.innerHTML = "STATUS";
statusform.appendChild(statuslabel);
let select = document.createElement("select");
select.id = "status";
select.name = "status";
statusform.appendChild(select);
let empty = document.createElement("option");
select.appendChild(empty);
let caution = document.createElement("option");
caution.innerHTML = "Caution Tag";
caution.value = "Caution_Tag";
select.appendChild(caution);
let dangeropen = document.createElement("option");
dangeropen.innerHTML = "Danger Tag Open";
dangeropen.value = "Danger_Tag_Open";
select.appendChild(dangeropen);
let dangershut = document.createElement("option");
dangershut.innerHTML = "Danger Tag Shut";
dangershut.value = "Danger_Tag_Shut";
select.appendChild(dangershut);
let working = document.createElement("option");
working.innerHTML = "Valve Working";
working.value = "Valve_Working";
select.appendChild(working);
btn.onsubmit = savevalve();
statusform.appendChild(btn);
let newline = document.createElement("P")
statusform.appendChild(newline);
}
/*const para = document.createElement("p");
const node = document.createTextNode("This is new.");
node.className = "system1";
para.appendChild(node);

const element = document.getElementById("div1");
const child = document.getElementById("p1");
element.insertBefore(para, child);
element.className = 'abc1';
*/


async function addwaf() {
    console.log("add waf");
    let waf = document.getElementById("addwafinput");
    let inputvalve = document.getElementById("inputvalve");
    let valve = inputvalve.name;
    if(waf.value !== "" ) {
        let data = { "valve": valve, "waf": waf.value };
        console.log("add waf: " + data);
        await fetch("/addwaf", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            console.log("Request complete! response:", res);
        })
    }
}

async function removewaf() {
    console.log("remove waf");
    let waf = document.getElementById("removewaf0");
    let inputvalve = document.getElementById("inputvalve");
    let valve = inputvalve.name;
    if(waf.value !== "" ) {
        let data = { "valve": valve, "waf": waf.value };
        console.log("remove waf: " + data);
        await fetch("/removewaf", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            console.log("Request complete! response:", res);
        })
    }
}

async function savevalve() {
    console.log("savevalve");
    let status = document.getElementById("status");
    let valve = document.getElementById("inputvalve");
    var waf = document.getElementById("inputwaf");
    if(status.value !== "" ) {
    let data = { "valve": valve.value, "status": status.value };
    console.log(data);
    await fetch("/savevalve", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
      }).then(res => {
        console.log("Request complete! response:", res);
      });
    }
}


// Clear the canvas context using the canvas width and height
function clearCanvas(canvas,ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function togglesketchpad() {
    var sketchpad = document.getElementById("sketchpad");
    if(sketchpad.style.display === "none") {
        sketchpad.style.display = "block";
    } else {
        sketchpad.style.display = "none";
    }
}


// Keep track of the mouse button being pressed and draw a dot at current location
function sketchpad_mouseDown() {
    mouseDown=1;
    drawDot(ctx,mouseX,mouseY,12);
}

// Keep track of the mouse button being released
function sketchpad_mouseUp() {
    mouseDown=0;
}

// Keep track of the mouse position and draw a dot if mouse button is currently pressed
function sketchpad_mouseMove(e) { 
    // Update the mouse co-ordinates when moved
    getMousePos(e);

    // Draw a dot if the mouse button is currently being pressed
    if (mouseDown==1) {
        drawDot(ctx,mouseX,mouseY,12);
    }
}

// Get the current mouse position relative to the top-left of the canvas
function getMousePos(e) {
    if (!e)
        var e = event;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
 }


// Set-up the canvas and add our event handlers after the page has loaded
function init() {
    // Get the specific canvas element from the HTML document
    canvas = document.getElementById('sketchpad');
    var sketchpad = document.getElementById("sketchpad");
    //sketchpad.style.display = "none";

    // If the browser supports the canvas tag, get the 2d drawing context for this canvas
    if (canvas.getContext)
        ctx = canvas.getContext('2d');

    // Check that we have a valid context to draw on/with before adding event handlers
    if (ctx) {
        canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
        canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
        window.addEventListener('mouseup', sketchpad_mouseUp, false);
    }
}

init();