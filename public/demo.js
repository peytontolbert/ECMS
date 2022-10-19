async function systemsearch() {
    const data = await fetch('./systemlistsearch').then(response => (response.json())).then(data => displaySystems(data));
    }


    
async function displaySystems(data) {
    var systemlist = document.getElementById("systemlist");
    var systemselect = document.getElementById("systemselect");
    console.log(data)
    for(i=0;i<data.length;i++) {
        var system = data[i].system
        var newoption = document.createElement('option');
        systemselect.appendChild(newoption);
        newoption.value= system;
        newoption.innerHTML = system;
        newoption.id = system;
    }
}

async function systemLookup() {
    let systemselect = document.getElementById("systemselect");
    let system = systemselect.value;
    console.log("looking up " + system );
    if(system1.value !== "" ) {
        let data = { "system": system };
        console.log("loading system: " + system);
        await fetch("/systemload", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => loadsystem(data))
    }
}

function loadsystem(data) {
    console.log(data);
    let systemdata = data;
    const newvalves = systemdata.valves;
    const newpipes = systemdata.pipes;
    const system = systemdata.valves[0].system;
    const systemmap = document.getElementById("systemmap");
    const valveselected = document.getElementById("valveselected");
    
    while(systemmap.firstChild) {
        systemmap.removeChild(systemmap.firstChild);
    }
    while(valveselected.firstChild) {
        valveselected.removeChild(valveselected.firstChild);
    }
    let loadCanvas = document.getElementById("canvas");
    loadCanvas.onload = function() { 
    let energyCanvas = document.createElement("canvas");
    energyCanvas.id = "energy";
    energyCanvas.height = loadCanvas.height;
    energyCanvas.width = loadCanvas.clientWidth;
    loadCanvas.appendChild(energyCanvas);
    }
    loadCanvas.src = "/images/"+system+".png";
    newCanvasimg = document.getElementById("canvas");
    console.log(newCanvasimg.height)
    const newcomponents = systemdata.components;
    for(i=0;i<newvalves.length;i++) {
        const valvedata = document.getElementById('systemloaded');
        const valveselected = document.getElementById('valveselected');
        const systemmap = document.getElementById('systemmap');
        const valve = newvalves[i].valve;
        const coords = newvalves[i].coords;
        const energy = new Boolean(false);
        
        const newvalve = document.createElement('p');
        newvalve.innerHTML = valve;
        newvalve.id = valve;
        const newvalveoption = document.createElement('option')
        newvalveoption.value = valve;
        newvalveoption.innerHTML = valve;
        valveselected.appendChild(newvalveoption);
        const textcoords = coords.split(',');
        newvalve.style.left = textcoords[0]+'px';
        newvalve.style.top = textcoords[1]-30 +'px';
        newvalve.style.position = 'absolute';
        newvalve.style.zIndex = '3'
        systemmap.appendChild(newvalve);
        const newarea = document.createElement('area');
        newarea.coords = coords;
        newarea.id = valve+"area";
        systemmap.appendChild(newarea);
        if (newvalves[i].status === "Danger_Tag_Open") {
            newvalve.style.color = "green";
          } else if (newvalves[i].status === "Danger_Tag_Shut") {
            newvalve.style.color = "red";
        } else if (newvalves[i].status === "Caution_Tag") {
            newvalve.style.color = 'yellow';
        } else if (newvalves[i].status === "Working") {
            newvalve.style.color = 'blue';
        } else {
            return
        }
        
    }
    for(i=0;i<newpipes.length;i++) {
        const pipe = newpipes[i].name;
        const coords = newpipes[i].coords;
        const edges = newpipes[i].edges;
        const shape = newpipes[i].shape;
        const status = newpipes[i].status;
        const newpipe = document.createElement('p');
        newpipe.innerHTML = pipe;
        newpipe.id = pipe;
        const textcoords = coords.split(',')
        console.log(textcoords)
        newpipe.style.left = textcoords[0]+'px';
        newpipe.style.top = textcoords[1]-45+'px';
        newpipe.style.position = 'absolute';
        newpipe.style.zIndex = '3';
        systemmap.appendChild(newpipe);
        const lines = shape.split(',');
        const canvas = document.getElementById('energy');
        if (!canvas.getContext) {
            console.log("no context");
            return;
        } else {
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(textcoords[0], textcoords[1]);
        ctx.lineTo(textcoords[3],textcoords[4]);
        ctx.stroke();
        }
    }
    var map = document.getElementById('systemmap');
    //map.addEventListener("click", loadvalve());
}


async function addwaf() {
    console.log("add waf");
    let waf = document.getElementById("addWAF");
    let inputvalve = document.getElementById("valveselectedp");
    let valve = inputvalve.innerHTML;
    if(waf.value !== "" ) {
        let data = { "waf": waf.value, "valve": valve };
        console.log("add waf: " + JSON.stringify(data));
        await fetch("/addwaf", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            console.log("Request complete! response:", res);
        })
    }
}


async function addwork() {
    console.log("add work");
    let work = document.getElementById("addWork");
    let inputvalve = document.getElementById("valveselectedp");
    let valve = inputvalve.innerHTML;
    if(work.value !== "" ) {
        let data = { "valve": valve, "permit": work.value };
        console.log("add work: " + data);
        await fetch("/addwork", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            console.log("Request complete! response:", res);
        })
    }
}

async function loadvalve() {
    console.log("valve")
    const valve = document.getElementById("valveselected").value;
    const valveselected = document.getElementById("valveselectedp");
    valveselected.innerHTML = valve;
    if (valve !== "") {
    let data = { "valve": valve };
    console.log(data);
    await fetch("/valvelookup", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => displayWaf(data))
}
}

async function changeStatus() {
    const valve = document.getElementById("valveselected").value;
    const status = document.getElementById("changestatus").value;
    console.log("change status");
    if (valve !== "") {
    let data = { "valve": valve, "status": status };
    console.log(data);
    await fetch("/savevalve", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => console.log(data))
}
}

async function displayWaf(data) {
console.log(data);
waf = data.wafs
permits = data.permits;
let wafinfo = document.getElementById('wafinfo');
while(wafinfo.firstChild) {
    wafinfo.removeChild(wafinfo.firstChild);
}
let removewaf = document.getElementById('removeWAF');
while(removewaf.firstChild) {
    removewaf.removeChild(removewaf.firstChild);
}
for(i=0;i<await waf.length;i++) {
    const wafs = document.getElementById('wafinfo');
    const wafform = document.getElementById('removeWAF');
    const newwafoption = document.createElement('option');
    newwafoption.innerHTML = waf[i].waf;
    newwafoption.value = waf[i].waf
    const newwaf = document.createElement('p');
    newwaf.innerHTML = waf[i].waf;
    wafform.appendChild(newwafoption);
    wafs.appendChild(newwaf);
}
displayPermits(permits)
}

const displayPermits = (permits) => {
    let removePermit = document.getElementById('removePermit');
    while(removePermit.firstChild) {
        removePermit.removeChild(removePermit.firstChild);
    }
    for(i=0;i<permits.length;i++) {
        const wafs = document.getElementById('wafinfo');
        const permitform = document.getElementById('removePermit');
        const newoption = document.createElement('option');
        newoption.innerHTML = permits[i].permit;
        newoption.value = permits[i].permit
        const newwaf = document.createElement('p');
        newwaf.innerHTML = permits[i].permit;
        permitform.appendChild(newoption);
        wafs.appendChild(newwaf);
    }
}



async function removewaf() {
    console.log("remove waf");
    let waf = document.getElementById("removeWAF").value;
    console.log(waf);
    let valve = document.getElementById("valveselectedp").innerHTML;
    if(waf.value !== "" ) {
        let data = { "valve": valve, "waf": waf };
        console.log(data);
        await fetch("/removewaf", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            console.log("Request complete! response:", res);
        })
    }
}



async function removepermit() {
    console.log("remove permit");
    let permit = document.getElementById("removePermit").value;
    console.log(waf);
    let valve = document.getElementById("valveselectedp").innerHTML;
    if(waf.value !== "" ) {
        let data = { "valve": valve, "permit": permit };
        console.log(data);
        await fetch("/removepermit", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            console.log("Request complete! response:", res);
        })
    }
}


function init() {
    systemsearch();
}

init();