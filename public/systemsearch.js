async function valvesearch() {
    var truevalve = document.getElementById("valvename");
    if(truevalve === null) {
        console.log("first search")
    const data = await fetch('./get'+valve.value).then(response => (response.json())).then(data => displayData(data));
        
    } else { if (valve.value === truevalve.innerHTML) {
        console.log("same valve");
} else {
    while (htmlwafdata.firstChild) {
        htmlwafdata.removeChild(htmlwafdata.firstChild);
    }
    while (valvedata.firstChild) {
        valvedata.removeChild(valvedata.firstChild);
    }
    htmlwafdata.innerHTML = "waf information";
    valvedata.innerHTML = "valve information";
    const data = await fetch('./get'+valve.value).then(response => (response.json())).then(data => displayData(data));
}

}
};

async function systemsearch() {
    const systemvalue = system.value;
    console.log(systemvalue)
    const data2 = await fetch('./systemlookup', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify({"system": systemvalue})    

    }).then(response => (response.json())).then(data => displaysystemData(data));
};


async function displayData(data) {
    for(i=0;i<data.length;i++) {
        let newinfo = document.createElement('p');
        htmlwafdata.appendChild(newinfo);
        newinfo.innerHTML = data[i].waf;
    }
}


async function displaysystemData(data) {
    console.log(data)
    let system = document.createElement('p');
    systemdata.appendChild(system)
    system.innerHTML = data[0].system;
    
    for(i=0;i<data.length;i++) {
        let newvalve = document.createElement('p');
        valvedata.appendChild(newvalve);
        newvalve.innerHTML = data[i].valve + " " + data[i].status;
    }
}

var valve = document.getElementById("valve");
var valvedata = document.getElementById('valvedata');
var systemdata = document.getElementById('systemdata');
var htmlwafdata = document.getElementById('htmlwafdata');
var system = document.getElementById('system');

