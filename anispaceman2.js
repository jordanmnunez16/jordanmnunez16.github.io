
window.onload = function () {

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
    let context = canvas.getContext('2d');

    /** @type{HTMLInputElement} */ let slider1 = (/** @type{HTMLInputElement} */ document.getElementById("slider1"));
    /** @type{HTMLInputElement} */ let slider2 = (/** @type{HTMLInputElement} */ document.getElementById("slider2"));
    /** @type{HTMLInputElement} */ let slider3 = (/** @type{HTMLInputElement} */ document.getElementById("slider3"));
    /** @type{HTMLInputElement} */ let slider4 = (/** @type{HTMLInputElement} */ document.getElementById("slider4"));
    /** @type{HTMLInputElement} */ let slider5 = (/** @type{HTMLInputElement} */ document.getElementById("slider5"));
    /** @type{HTMLInputElement} */ let slider6 = (/** @type{HTMLInputElement} */ document.getElementById("slider6"));
    /** @type{HTMLInputElement} */ let slider7 = (/** @type{HTMLInputElement} */ document.getElementById("slider7"));
    /** @type{HTMLInputElement} */ let slider8 = (/** @type{HTMLInputElement} */ document.getElementById("slider8"));
    /** @type{HTMLInputElement} */ let slider9 = (/** @type{HTMLInputElement} */ document.getElementById("slider9"));
    /** @type{HTMLInputElement} */ let slider10 = (/** @type{HTMLInputElement} */ document.getElementById("slider10"));
    /** @type{HTMLInputElement} */ let slider11 = (/** @type{HTMLInputElement} */ document.getElementById("slider11"));
    /** @type{HTMLInputElement} */ let slider12 = (/** @type{HTMLInputElement} */ document.getElementById("slider12"));
    /** @type{HTMLInputElement} */ let slider13 = (/** @type{HTMLInputElement} */ document.getElementById("slider13"));
    /** @type{HTMLInputElement} */ let slider14 = (/** @type{HTMLInputElement} */ document.getElementById("slider14"));
    /** @type{HTMLInputElement} */ let slider15 = (/** @type{HTMLInputElement} */ document.getElementById("slider15"));

    /** @type{HTMLInputElement} */ let checkbox1 = (/** @type{HTMLInputElement} */ document.getElementById("checkbox1"));

    context.translate(250,250);
    //context.lineWidth = 2;
    context.fillStyle = "rgb(255,0,0)";
    //context.strokeStyle = "rgb(0,255,0)";

    let done = true;
    let i = 0;
    let variableFill1 = "rgb(0,0,0)";
    let variableFill2 = "rgb(0,0,0)";
    let variableFill3 = "rgb(0,0,0)";
    let variableFill4 = "rgb(0,0,0)";
    let borderColor = "rgb(0,0,0)";
    let borderOn = false;

    //setInterval(FUCK, 10);

    /*
    function FUCK(){
        borderOn = !borderOn;

    }
    */


    slider1.oninput = function() {
        variableFill1 = "rgb(" + slider1.value + "," + slider2.value + "," + slider3.value + ")";
    };

    slider2.oninput = function() {
        variableFill1 = "rgb(" + slider1.value + "," + slider2.value + "," + slider3.value + ")";
    };

    slider3.oninput = function() {
        variableFill1 = "rgb(" + slider1.value + "," + slider2.value + "," + slider3.value + ")";
    };

    slider4.oninput = function() {
        variableFill2 = "rgb(" + slider4.value + "," + slider5.value + "," + slider6.value + ")";
    };

    slider5.oninput = function() {
        variableFill2 = "rgb(" + slider4.value + "," + slider5.value + "," + slider6.value + ")";
    };

    slider6.oninput = function() {
        variableFill2 = "rgb(" + slider4.value + "," + slider5.value + "," + slider6.value + ")";
    };
    
    slider7.oninput = function() {
        variableFill3 = "rgb(" + slider7.value + "," + slider8.value + "," + slider9.value + ")";
    };

    slider8.oninput = function() {
        variableFill3 = "rgb(" + slider7.value + "," + slider8.value + "," + slider9.value + ")";
    };

    slider9.oninput = function() {
        variableFill3 = "rgb(" + slider7.value + "," + slider8.value + "," + slider9.value + ")";
    };

    slider10.oninput = function() {
        variableFill4 = "rgb(" + slider10.value + "," + slider11.value + "," + slider12.value + ")";
    };

    slider11.oninput = function() {
        variableFill4 = "rgb(" + slider10.value + "," + slider11.value + "," + slider12.value + ")";
    };

    slider12.oninput = function() {
        variableFill4 = "rgb(" + slider10.value + "," + slider11.value + "," + slider12.value + ")";
    };

    slider13.oninput = function() {
        borderColor = "rgb(" + slider13.value + "," + slider14.value + "," + slider15.value + ")";
    };

    slider14.oninput = function() {
        borderColor = "rgb(" + slider13.value + "," + slider14.value + "," + slider15.value + ")";
    };

    slider15.oninput = function() {
        borderColor = "rgb(" + slider13.value + "," + slider14.value + "," + slider15.value + ")";
    };

    function drawOne(){
        borderOn = checkbox1.checked;
        context.save();
            context.scale(i/100, i/100);
            context.rotate(0.122173*i);

            if(borderOn){
                context.fillStyle = borderColor;
                context.fillRect(-250, -250, 500, 20);
            }
            context.fillStyle = variableFill1;
            context.fillRect(-249.9, -249.9, 499.9, 19.9);
            
            if(borderOn){
                context.fillStyle = borderColor;
                context.fillRect(230, -250, 20, 500);
            }
            context.fillStyle = variableFill2;
            context.fillRect(230.1, -249.9, 19.9, 499.9);

            if(borderOn){
                context.fillStyle = borderColor;
                context.fillRect(-250, 230, 500, 20);
            }
            context.fillStyle = variableFill3;
            context.fillRect(-249.9, 230.1, 499.9, 19.9);

            if(borderOn){
                context.fillStyle = borderColor;
                context.fillRect(-250, -250, 20, 500);
            }
            context.fillStyle = variableFill4;
            context.fillRect(-249.9, -249.9, 19.9, 499.9);
            
            context.restore();
            done = true;
            i++;
            if(i >= 100){
                i = 0;
            }
    }
    canvas.onclick = function(event){
        
        setInterval(drawOne, .01);
        
            
            
            

        
    }

}