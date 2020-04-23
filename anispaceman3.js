
window.onload = function () {

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
    let context = canvas.getContext('2d');

    

    context.translate(250,250);
    //context.lineWidth = 2;
    context.fillStyle = "rgb(255,0,0)";
    //context.strokeStyle = "rgb(0,255,0)";

    let done = true;

    let r = 255;
    let g = 255;
    let b = 255;

    let br = 0;
    let bg = 0;
    let bb = 0;
    
    let initColor = "rgb(" + r + "," + g + "," + b + ")";
    let invertedColor = "rgb(" + (255 - r) + "," + (255-g) + "," + (255-b) + ")";
    let initBorderColor = "rgb(" + br + "," + bg + "," + bb + ")";
    let invertedBorderColor = "rgb(" + (255 - br) + "," + (255-bg) + "," + (255-bb) + ")";
    let borderOn = true;
    let bgColor = "rgb(255,255,255)";
    let started = false;
    let maxed = false;
    let max = 12500;
    let time;
    let invertColors = false;
    let color = initColor;
    let borderColor = initBorderColor;
    
    



    



    function drawOne(i){
        context.save();
            context.scale(i/100, i/100);
            context.rotate(-0.122173*i);
            if(invertColors){
                color = invertedColor;
                borderColor = invertedBorderColor;
            }

            if(borderOn){
                context.fillStyle = borderColor;
                context.fillRect(-250, -250, 500, 20);
            }
            context.fillStyle = color;
            context.fillRect(-249.99, -249.99, 499.98, 19.98);
            
            if(borderOn){
                context.fillStyle = borderColor;
                context.fillRect(230, -250, 20, 500);
            }
            context.fillStyle = color;
            context.fillRect(230.01, -249.99, 19.98, 499.98);

            if(borderOn){
                context.fillStyle = borderColor;
                context.fillRect(-250, 230, 500, 20);
            }
            context.fillStyle = color;
            context.fillRect(-249.99, 230.01, 499.98, 19.98);

            if(borderOn){
                context.fillStyle = borderColor;
                context.fillRect(-250, -250, 20, 500);
            }
            context.fillStyle = color;
            context.fillRect(-249.99, -249.99, 19.98, 499.98);
            
            context.restore();
            done = true;
    }

    function draw(){

        
        
            
        time = performance.now() % max;
        if(maxed){
            context.rotate(Math.PI/360);
        }
        
        
        
        context.fillStyle = bgColor;
        context.fillRect(-250,-250, 500, 500);
        let i;
        if(maxed){
            for(i = 0; i < max / 100; i++){
                drawOne(i);
            }
        }
        else{
            for(i = 0; i < time / 100; i++){
                drawOne(i);
            }
        }
        
        if(i == max/ 100){
            maxed = true;
            invertColors = true;
        }
        window.requestAnimationFrame(draw);
    }

    canvas.onclick = function(event){
        
        if(!started){
            draw();
            started = true;
        }
        
        
            
            
            

        
    }

}