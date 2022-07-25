

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

var valveclicked="";
var click1=1;
var click2=1;
var click3=1;
var click4=1;
var click5=1;
var click6=1;
var click7=1;
var click8=1;
var click9=1;
var click10=1;

async function getabc1() {
    console.log(valveclicked);
    if (valveclicked !== 1 ) { 
        const data = fetch('./getabc1').then(response => response.json()).then(data => valvewindow(data)) 
        valveclicked=1;
    } else {
    return
    }
}

async function getabc2() {
    console.log(valveclicked);
    if (valveclicked !== 2 ) { 
        const data = fetch('./getabc2').then(response => response.json()).then(data => valvewindow(data)) 
        valveclicked=2;
    } else {
    return
    }
}

async function getabc3() {
    console.log(valveclicked);
    if (valveclicked !== 3 ) { 
        const data = fetch('./getabc3').then(response => response.json()).then(data => valvewindow(data)) 
        valveclicked=3;
    } else {
    return
    }
}

async function getabc4() {
    console.log(valveclicked);
    if (valveclicked !== 4) { 
        const data = fetch('./getabc4').then(response => response.json()).then(data => valvewindow(data)) 
        valveclicked=4
    } else {
    return
    }
}

async function getabc5() {
    console.log(valveclicked);
    if (valveclicked !== 5 ) { 
        const data = fetch('./getabc5').then(response => response.json()).then(data => valvewindow(data)) 
        valveclicked=5;
    } else {
    return
    }
}

async function getabc6() {
    console.log(click6);
    if (click6 === 1 ) { 
        const data = fetch('./getabc6').then(response => response.json()).then(data => valvewindow(data)) 
        click6++;
    } else {
    return
    }
}

async function getabc7() {
    console.log(click7);
    if (click7 === 1 ) { 
        const data = fetch('./getabc7').then(response => response.json()).then(data => valvewindow(data)) 
        click7++;
    } else {
    return
    }
}

async function getabc8() {
    console.log(click8);
    if (click8 === 1 ) { 
        const data = fetch('./getabc8').then(response => response.json()).then(data => valvewindow(data)) 
        click8++;
    } else {
    return
    }
}

async function getabc9() {
    console.log(click9);
    if (click9 === 1 ) { 
        const data = fetch('./getabc9').then(response => response.json()).then(data => valvewindow(data)) 
        click9++;
    } else {
    return
    }
}

async function getabc10() {
    console.log(click10);
    if (click10 === 1 ) { 
        const data = fetch('./getabc10').then(response => response.json()).then(data => valvewindow(data)) 
        click10++;
    } else {
    return
    }
}


async function valvewindow(data) {
    var clickcount = 0;
    console.log(data)
    var wafdata = data;
    const valve = wafdata[0].id_valve;
    //console.log(JSON.parse(vdata));
const app = document.getElementById("valvedata");
if(app.style.display === "block") {
        const valvewafs = document.getElementById("valvewafs");
    const statusform = document.getElementById("statusform");
    const status = document.getElementById("status");
    const inputvalve = document.getElementById("inputvalve");
    const formbutton = document.getElementById("formbutton");
    if(inputvalve.innerHTML === "valve: " + valve) { 
        console.log("clicked same valve")
        return;
    } else {
        console.log("clicked different valve")
    const statusform = document.getElementById("statusform");
    newvalvewafs = document.createElement("div");
    newvalvewafs.id = "valvewafs";
    inputvalve.value = valve;
    inputvalve.innerHTML = "valve: " + valve;
    if(wafdata.length !== 0) {
        console.log(wafdata);
    for(i=0;i<await wafdata.length;i++) {
        const inputstuffs = document.createElement("p");
        inputstuffs.id = "inputstuff" + i;
        inputstuffs.innerHTML = await wafdata[i].waf; 
        await newvalvewafs.appendChild(inputstuffs);
    await statusform.replaceChild(newvalvewafs, valvewafs);

    };
        } else { 
            inputstuff.innerHTML = "";
        }
    return
    }
} else {
app.style.display = "block";
console.log("valve window valve: " + valve);
const statusform = document.getElementById("statusform");
const removewafform = document.getElementById("removewaf");
const removewafbutton = document.getElementById("rmvbutton");
let input = document.createElement("p");
input.id = "inputvalve";
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
    inputstuffs.id = "inputstuff" + i;
    inputstuffs.innerHTML = await wafdata[i].waf; 
    valvewafs.appendChild(inputstuffs);
}
} else { return };

let btn = document.createElement("button");
let rmvbtn = document.createElement("input");
rmvbtn.id = "rmvbutton";
rmvbtn.type = "submit";
rmvbtn.value = "Submit";
rmvbtn.innerHTML = "remove WAF";
rmvbtn.onclick = removewaf();
btn.name = "submit";
btn.id = "formbutton";
btn.innerHTML = "submit";
let waflabel = document.createElement("label");
waflabel.innerHTML = "ADD WAF";
statusform.appendChild(waflabel);
let waf = document.createElement("input");
waf.name = "WAF";
waf.type = "text";
waf.id = "inputwaf";
statusform.appendChild(waf);
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

let rmvlabel = document.createElement("label");
rmvlabel.innerHTML = "REMOVE WAF/WORK";
removewafform.appendChild(rmvlabel);
let removeselect = document.createElement("select");
removeselect.id = "removeselect";
removewafform.appendChild(removeselect);
let empty2 = document.createElement("option");
removeselect.appendChild(empty2);
for(i=0; i < await wafdata.length; i++) {
    let removeoption = document.createElement("option");
    removeoption.value = wafdata[i].waf;
    removeoption.innerHTML = wafdata[i].waf;
    removeselect.appendChild(removeoption)
};
rmvbtn.onsubmit = removewaf();
removewafform.appendChild(rmvbtn);
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

}

function removewaf() {
    console.log("removingwaf")
    return;
    let valve = document.getElementById("inputvalve").innerHTML;
    let waf = document.getElementById("removeselect");
    console.log(data)
    if(waf.value !== "") {
        let data = { "valve": valve.value, "waf": waf.value}
        fetch("/removewaf", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => {
        console.log("deleted waf ", res);
    });
} else { }
};

async function savevalve() {
    let status = document.getElementById("status");
    let valve = document.getElementById("inputvalve");
    var waf = document.getElementById("inputwaf");
    if(status.value !== "" ) {
    let data = { "valve": valve.value, "status": status.value, "waf": waf.value };
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

async function savevalves() {
    let status = "statusforms";
    let statusform = document.getElementById("proposalform");
    let valve = "inputvalve";
    console.log(statusform[1]) //status
    console.log(statusform[2]) //valve
    for(i=0;i<statusform.length;i++) {
        const valveinput = statusform[i];
    }
}

function newline() {
    var statusform = document.getElementById("proposalform");
    var div = document.createElement("div");
    div.id = "newlinediv"+clonecount;
    statusform.appendChild(div);
    var input = document.createElement("input");
    input.type = "text"
    input.id = "valveform"+clonecount;
    input.attributes["required"] = "";
    let select = document.createElement("select");
    select.id = "statusforms"+clonecount;
    div.appendChild(select);
    let option1 = document.createElement("option");
    option1.value = "Untagged";
    option1.innerHTML = "Untagged";
    select.appendChild(option1);
    let option2 = document.createElement("option");
    option2.value = "Caution_Tag";
    option2.innerHTML = "Caution Tag";
    select.appendChild(option2);
    let option3 = document.createElement("option");
    option3.value = "Danger_Tag_Shut";
    option3.innerHTML = "Danger Tag Shut";
    select.appendChild(option3);
    let option4 = document.createElement("option");
    option4.value = "Danger_Tag_Open";
    option4.innerHTML = "Danger Tag Open";
    select.appendChild(option4);
    div.appendChild(input);
    let removebutton = document.createElement("button");
    removebutton.id = "removerowbtn"+clonecount;
    removebutton.onclick = function deleterow() {
        const valveforms = document.getElementById("valveform"+clonecoune);
        if(valveforms.value == "") { console.log("input value"); } else {
        div.remove();
        }
    };
    removebutton.innerHTML = "Remove line";
    div.appendChild(removebutton);
    let breaks = document.createElement("br");
    div.appendChild(breaks);
    let breaks2 = document.createElement("br")
    div.appendChild(breaks2);
    clonecount++;
};



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
    getvalvedata();
    clonecount = 1;
    // Get the specific canvas element from the HTML document
    canvas = document.getElementById('sketchpad');
    var sketchpad = document.getElementById("sketchpad");
    sketchpad.style.display = "none";

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