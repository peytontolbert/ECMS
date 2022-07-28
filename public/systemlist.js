async function systemsearch() {
    const data = await fetch('./systemlistsearch').then(response => (response.json())).then(data => displayData(data));
    }


    
async function displayData(data) {
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
    let loadCanvas = document.getElementById("canvas");
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
    loadCanvas.src = "/images/"+system+".png";
}

async function loadsystem(data) {
    let systemdata = data;
    for(i=0;i<systemdata.length;i++) {
        const valvedata = document.getElementById('systemloaded');
        const systemmap = document.getElementById('systemmap');
        const valve = systemdata[i].valve;
        const coords = systemdata[i].coords;
        const newvalve = document.createElement('p');
        newvalve.innerHTML = valve;
        const textcoords = coords.split(',')
        newvalve.style.left = textcoords[0]+'px';
        newvalve.style.top = textcoords[1]-30 +'px';
        newvalve.style.position = 'absolute';
        newvalve.style.zIndex = '3'
        systemmap.appendChild(newvalve);
        const newarea = document.createElement('area');
        newarea.coords = coords;
        newarea.id = valve+"area";
        systemmap.appendChild(newarea);
        if (systemdata[i].status === "Danger_Tag_Open") {
            newvalve.style.color = "green";
          } else if (systemdata[i].status === "Danger_Tag_Shut") {
            newvalve.style.color = "red";
        } else if (systemdata[i].status === "Caution_Tag") {
            newvalve.style.color = 'yellow';
        } else if (systemdata[i].status === "Valve_Working") {
            newvalve.style.color = 'blue';
        } else {
            return
        }

    }
    var map = document.getElementById('systemmap');
    map.addEventListener("click", loadvalve());
}

async function loadvalve() {
    console.log("valve")
}

function init() {
    systemsearch();
}

init();