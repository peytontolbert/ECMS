async function systemload() {
    await fetch('./systemlistsearch').then(response => response.json()).then(data => systemdata = data).catch(error => console.log(error));
    systemoptions(systemdata);
}


async function systemoptions(systemdata) {
    for(i=0;i<systemdata.length;i++) {
        let systemoption = systemdata[i].system;
        let newsystem = document.createElement('option');
        newsystem.name = systemoption;
        newsystem.innerHTML = systemoption;
        systemselect.appendChild(newsystem);

    }
    
}

async function systemsearch() {
    const systemvalue = system.value;
    console.log("searching " + systemvalue)
    if(systemvalue !== "" ) {
    const data2 = await fetch('./systemlookup', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify({"system": systemvalue})    

    }).then(response => (response.json())).then(data => displayvalveData(data));
} else { return }
};

async function displayvalveData(data) {
    let deletebtn = document.createElement('button');
    deletebtn.innerHTML = "delete system";
    deletebtn.addEventListener("click", deletesystem) 
    valvedata.appendChild(deletebtn);
    systemsearched.innerHTML = system.value;
    for(i=0;i<data.length;i++) {
    let newvalve = document.createElement('p');
    newvalve.innerHTML = await JSON.stringify(data[i])
    valvedata.appendChild(newvalve)
    }
}

function deletesystem() { 
    let system = systemsearched.innerHTML;
console.log(system)
};
var systemselect = document.getElementById('system');
var systemdata = document.getElementById('systemdata');
var systemsearched = document.getElementById('systemsearched');
var valvedata = document.getElementById('valvedata');


function init() {
    systemload();
};

init();
