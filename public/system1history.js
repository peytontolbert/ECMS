
function getData() {
const data = fetch('./system1historydata').then(response => (response.json())).then(data => displayData(data)).catch(error => console.log(error));
};


function displayData(data) {
    const body = document.getElementById('system1');
    const array1 = data;
    for(i=0;i<array1.length;i++) {
        const pl = document.createElement('P');
        const htmldata = "Valve: " + array1[i].valve + "    status: " + array1[i].status + "    username: " + array1[i].username + "    date modified: " + array1[i].date;
        pl.innerHTML = htmldata;
        body.appendChild(pl);
    }
}


getData();