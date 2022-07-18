
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
    let data = { "system": system.value, "valve": valve.value, "x": firstbox.value, "y": secondbox.value }
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