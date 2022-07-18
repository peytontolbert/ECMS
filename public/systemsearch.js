async function search() {
    const data = await fetch('./get'+valve.value).then(response => (response.json())).then(data => displayData(data));
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
    valvedata.innerHTML = await data;
    let wafdata = { "valve": valve.value }
    const wafresponse = await fetch("/system1wafs", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(wafdata)
      }).then(response => (response.json().then(data => htmlwafdata.innerHTML = JSON.stringify(data))))
}

async function displaysystemData(data) {
    var systemresponse = await fetch("/system1valvedata", {
        method: "GET"
      }).then(response => (response.json().then(data => systemdata.innerHTML = JSON.stringify(data))))
}

var valve = document.getElementById("valve");
var valvedata = document.getElementById('valvedata');
var systemdata = document.getElementById('systemdata');
var htmlwafdata = document.getElementById('htmlwafdata');
var system = document.getElementById('system');