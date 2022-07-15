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

function DoSomething(){
    if(newvalve.visibility==='hidden') {
    newvalve.visibility = 'visible';
    visible++;
    } else {
        newvalve.visibility = 'hidden';
        visible--;
    }
}



function FirstCord(){
    canvas.addEventListener('mousedown', function(e) {
        getCursorPosition(canvas, e);
        firstbox.value = x + "," + y;
    })
};

function SecCord(){
    canvas.addEventListener('mousedown', function(e) {
        getCursorPosition(canvas, e);
        secondbox.value = x + "," + y;
    })
};

const firstbox = document.getElementById('1xy');
const secondbox = document.getElementById('2xy');
const canvas = document.getElementById('canvas');
const newvalve = document.getElementById('newvalve').style;
var click = 1;
var visible = 0;


canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})

window.addEventListener('load', function() {
    this.document.querySelector('input[type="file"]').addEventListender('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');
            img.onload = () => {
                URL.revokeObjectURL(img.src); // no longer needed, free memory
            }
            img.src = URL.createObjectURL(this.files[0]);
        }
    });
});