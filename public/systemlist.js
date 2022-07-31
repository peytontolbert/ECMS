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
    console.log(systemdata);
    for(i=0;i<systemdata.length;i++) {
        const valvedata = document.getElementById('systemloaded');
        const valveselected = document.getElementById('valveselected');
        const systemmap = document.getElementById('systemmap');
        const valve = systemdata[i].valve;
        const coords = systemdata[i].coords;
        const newvalve = document.createElement('p');
        newvalve.innerHTML = valve;
        const newvalveoption = document.createElement('option')
        newvalveoption.value = valve;
        newvalveoption.innerHTML = valve;
        valveselected.appendChild(newvalveoption);
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
    //map.addEventListener("click", loadvalve());
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
for(i=0;i<data.length;i++) {
    const wafs = document.getElementById('wafinfo');
    const wafform = document.getElementById('removeWAF');
    const newwafoption = document.createElement('option');
    newwafoption.innerHTML = data[i].waf;
    newwafoption.value = data[i].waf
    const newwaf = document.createElement('p');
    newwaf.innerHTML = data[i].waf;
    wafform.appendChild(newwafoption);
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


function init() {
    systemsearch();
}

init();