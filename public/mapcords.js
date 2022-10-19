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
    var img = document.getElementById('canvas');
    system = document.getElementById("systemselect");
    newsysvalve = document.getElementById('systemname');
    systemname.innerHTML = system.value;
    img.src = "/images/"+system.value+".png";
}

async function getCursorPosition(canvas, event) {
    const rect = await canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
    if(click===1) {
        firstbox.value = x + " " + y;
        click--;
        console.log(click)
        return
    } else {
        secondbox.value = x + " " + y;
        click++;
        console.log(click)
        return
    }
}

function doSomething() {
    if(newvalve.visibility==='hidden') {
    newvalve.visibility = 'visible';
    visible++;
    } else {
        newvalve.visibility = 'hidden';
        visible--;
    }
}

function doSomething2() {
    if(newcomponent.visibility==='hidden') {
    newcomponent.visibility = 'visible';
    visible++;
    } else {
        newcomponent.visibility = 'hidden';
        visible--;
    }
}


async function submitDiagram() {
    var img = document.getElementById('canvas');
    var diagramfile = document.getElementById('diagramfile');
    let data = { "file": img, "name": diagram.value, "image": diagramfile };
    console.log(data);
    await fetch("/submitnewdiagram", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
      }).then(res => {
        console.log("Request complete! response:", res);
      });
}

async function submitValve() {
    let x = firstbox.value;
    let x1 = x.split(" ");
    let y = secondbox.value;
    let y1 = y.split(" ");
    let coords = x1[0] + "," + x1[1] + "," + y1[0] + "," + y1[1]
    let data = { "system": system.value, "valve": valve.value, "coords": coords }
    console.log(data);
    await fetch("/submitnewvalve", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
    }).then(res => {
        console.log("Request complete! response:", res);
    });
}


function firstCord(){
    canvas.addEventListener('mousedown', function(e) {
        getCursorPosition(canvas, e);
        firstbox.value = x + "," + y;
    })
};

function secCord(){
    canvas.addEventListener('mousedown', function(e) {
        getCursorPosition(canvas, e);
        secondbox.value = x + "," + y;
    })
};

const firstbox = document.getElementById('x');
const secondbox = document.getElementById('y');
const canvas = document.getElementById('canvas');
const newvalve = document.getElementById('newvalve').style;
const newcomponent = document.getElementById('newcomponent').style;
var click = 1;
var visible = 0;
let diagram = document.getElementById('diagram');


canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})

window.addEventListener('load', function() {
    this.document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.getElementById('canvas');
            img.onload = () => {
                URL.revokeObjectURL(img.src); // no longer needed, free memory
            }
            img.src = URL.createObjectURL(this.files[0]);
        }
    });
});


systemsearch();