

// Variables for referencing the canvas and 2dcanvas context
var canvas,ctx;



async function getvalvedata() {
    await fetch('/system1valves').then(response => response.json()).then(data => valvedata = data);
    checkstoragedifference(valvedata);
}

function checkstoragedifference(valvedata) {
console.log(valvedata)
    const valvenames = ["abc1","abc2","abc3","abc4","abc5","abc6","abc7","abc8","abc9","abc10","abc11","abc12","abc13","abc14","abc15","abc16","abc17","abc18","abc19","abc20"];
    for(i=0;i<valvedata.length;i++) {
        if (valvedata[i].status === localStorage.getItem(valvedata[i].valve+"status")) {
            console.log("no change");
        } else { 
            localStorage.setItem(valvedata[i].valve+"status", valvedata[i].status);
            console.log("set " + valvedata[i].valve); }
    }   
     for(i=0; i<valvedata.length; i++) {
        if (valvedata[i].status === "Danger_Tag_Open") {
            document.getElementById(valvedata[i].valve+"statusresult").style.color = "green";
          } else if (valvedata[i].status === "Untagged") {
            document.getElementById(valvedata[i].valve+"statusresult").style.color = "black";
        } else if (valvedata[i].status === "Danger_Tag_Shut") {
            document.getElementById(valvedata[i].valve+"statusresult").style.color = "red";
        } else if (valvedata[i].status === "Caution_Tag") {
            document.getElementById(valvedata[i].valve+"statusresult").style.color = 'yellow';
        } else if (valvedata[i].status === "Valve_Working") {
            document.getElementById(valvedata[i].valve+"statusresult").style.color = 'blue';
        } else {
            return
        }
        }
};


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

async function getabc1() {
    const data = fetch('./getabc1').then(response => response.json()).then(data => valvewindow(data));
}

async function getabc2() {
    const data = fetch('./getabc2').then(response => response.json()).then(data => valvewindow(data));
}

async function getabc3() {
    const data = fetch('./getabc3').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc4() {
    const data = fetch('./getabc4').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc5() {
    const data = fetch('./getabc5').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc6() {
    const data = fetch('./getabc6').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc7() {
    const data = fetch('./getabc7').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc8() {
    const data = fetch('./getabc8').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc9() {
    const data = fetch('./getabc9').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc10() {
    const data = fetch('./getabc10').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc11() {
    const data = fetch('./getabc11').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc12() {
    const data = fetch('./getabc12').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc13() {
    const data = fetch('./getabc13').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc14() {
    const data = fetch('./getabc14').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc15() {
    const data = fetch('./getabc15').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc16() {
    const data = fetch('./getabc16').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc17() {
    const data = fetch('./getabc17').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc18() {
    const data = fetch('./getabc18').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc19() {
    const data = fetch('./getabc19').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}

async function getabc20() {
    const data = fetch('./getabc20').then(response => response.json()).then(data => valvewindow(data)).catch(error => console.log(error));
}


async function valvewindow(data) {
    var clickcount = 0;
    const valve = data[0].valve;
    //console.log(JSON.parse(vdata));
const app = document.getElementById("valvedata");
if(app.style.display === "block") {
        const valvewafs = document.getElementById("valvewafs");
        let wafdata = { "valve": valve }
        const wafresponse = await fetch("./system1wafs", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(wafdata)
          })
        const wafsdata = await wafresponse.json();
    const statusform = document.getElementById("statusform");
    const status = document.getElementById("status");
    const inputvalve = document.getElementById("inputvalve");
    const formbutton = document.getElementById("formbutton");
    if(inputvalve == valve) { 
        console.log("clicked same valve")
    } else {
        
    const statusform = document.getElementById("statusform");
    newvalvewafs = document.createElement("div");
    newvalvewafs.id = "valvewafs";
    inputvalve.value = valve;
    inputvalve.innerHTML = "valve: " + valve;
    let inputstuff = document.getElementById("valvewafs");
    if(wafsdata.length !== 0) {
    for(i=0;i<await wafsdata.length;i++) {
        console.log(wafsdata);
        const inputstuffs = document.createElement("p");
        inputstuffs.id = "inputstuff" + i;
        inputstuffs.innerHTML = await wafsdata[i].waf + " " + await wafsdata[i].status; 
        newvalvewafs.appendChild(inputstuffs);
        
    statusform.replaceChild(newvalvewafs, valvewafs);

    };
        } else { 
            inputstuff.innerHTML = "";
        }
    return
    }
} else {
        let wafdata = { "valve": valve }
        const wafresponse = await fetch("/system1wafs", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(wafdata)
          })
        const wafsdata = await wafresponse.json();
        console.log(JSON.stringify(wafsdata));

app.style.display = "block";
console.log("valve window valve: " + valve);
const statusform = document.getElementById("statusform");
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
for(i=0;i<await wafsdata.length;i++) {
    const inputstuffs = document.createElement("p");
    inputstuffs.id = "inputstuff" + i;
    inputstuffs.innerHTML = await wafsdata[i].waf + " " + await wafsdata[i].status; 
    valvewafs.appendChild(inputstuffs);
};
let statuslabel = document.createElement("label");
statuslabel.innerHTML = "CHANGE STATUS";
statusform.appendChild(statuslabel);
let select = document.createElement("select");
select.id = "status";
select.name = "status";
statusform.appendChild(select);
let empty = document.createElement("option");
select.appendChild(empty);
let tagless = document.createElement("option");
tagless.innerHTML = "Untagged";
tagless.value = "Untagged";
select.appendChild(tagless);
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
let newline = document.createElement("P")
statusform.appendChild(newline);
let btn = document.createElement("button");
btn.name = "submit";
btn.id = "formbutton";
btn.innerHTML = "submit";
let waflabel = document.createElement("label");
waflabel.innerHTML = "ADD WAF/PERMIT";
statusform.appendChild(waflabel);
let waf = document.createElement("input");
waf.name = "WAF";
waf.type = "text";
waf.id = "inputwaf";
statusform.appendChild(waf);
btn.onsubmit = savevalve();
statusform.appendChild(btn);
let newline2 = document.createElement("P");
statusform.appendChild(newline2);
let removeform = document.createElement("form");
statusform.appendChild(removeform)
let removeselect = document.createElement("select");
removeselect.id = "removeselect";
removeform.appendChild(removeselect);
let empty2 = document.createElement("option");
removeselect.appendChild(empty2);
for(i=0; i < await wafsdata.length; i++) {
    let removeoption = document.createElement("option");
    removeoption.value = wafsdata[i].waf;
    removeoption.innerHTML = wafsdata[i].waf;
    removeselect.appendChild(removeoption)
};
let removewafbutton = document.createElement("button");
removewafbutton.innerHTML = "remove waf/permit";
removewafbutton.onclick = removewaf();
removeform.appendChild(removewafbutton); 
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

async function removewaf() {
    let valve = document.getElementById("inputvalve").innerHTML;
    let waf = document.getElementById("removeselect");
    if(waf.value !== "") {
        let data = { "valve": valve.value, "waf": waf.value}
        await fetch("/removewaf", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => {
        console.log("deleted waf ", res);
    });
} else { return }
};

async function savevalve() {
    let status = document.getElementById("status");
    let valve = document.getElementById("inputvalve");
    let waf = document.getElementById("inputwaf");
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