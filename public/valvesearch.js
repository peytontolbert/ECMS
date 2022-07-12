async function search() {
    const data = await fetch('./get'+valve.value).then(response => (response.json())).then(data => displayData(data));
};
async function displayData(data) {
    valvedata.innerHTML = await data;
    let wafdata = { "valve": valve.value }
    const wafresponse = await fetch("/system1wafs", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(wafdata)
      })
    const wafsdata = await wafresponse.json();
    htmlwafdata.innerHTML = JSON.stringify(wafsdata);
}

var valve = document.getElementById("valve");
var valvedata = document.getElementById('valvedata');
var valvedata = document.getElementById('htmlwafdata');