//let img = document.getElementById("tmuny");
let img = new Image(100,100);
img.src = "tmuny.png";
let img2 = new Image(100,100);
img2.src = "invTmuny.png";
let audio = new Audio("Gosha.mp3");

window.onload = function () {

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
    let context = canvas.getContext('2d');

    //let audio = this.document.createElement("AUDIO");
    //audio.src = "Gosha.mp3";

    
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
    let max = 31500;
    let time;
    let invertColors = false;
    let color = initColor;
    let borderColor = initBorderColor;
    let offset;
    

    context.drawImage(img,-25,-25,50,50);
    
    



    



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

        
        
            
        time = (performance.now() - offset) % max;
        
        
        
        
        context.fillStyle = bgColor;
        context.fillRect(-250,-250, 500, 500);
        let i;
        if(maxed){
            
            context.rotate(Math.PI/360);
            for(i = 0; i < max / 242; i++){
                drawOne(i);
            }
            context.save();
            for(let j = 0; j < 4; j++){
                context.drawImage(img2, -100, -300, 200, 200);
                context.rotate(Math.PI/2);
            }
            context.restore();
            
        }
        else{
            for(i = 0; i < time / 242; i++){
                drawOne(i);
            }
            context.save();
            if(time > 15850){
                
                context.drawImage(img, -100,-300,200,200);
            }
            if(time > 19800){
                context.rotate(Math.PI/2);
                context.drawImage(img, -100,-300,200,200);
            }
            if(time > 23600){
                context.rotate(Math.PI/2);
                context.drawImage(img, -100,-300,200,200);
            }
            if(time > 27550){
                context.rotate(Math.PI/2);
                context.drawImage(img, -100,-300,200,200);
            }
            context.restore();
        }
        
        if(i >= max/ 242){
            maxed = true;
            invertColors = true;
        }
        window.requestAnimationFrame(draw);
    }

    canvas.onclick = function(event){
        
        if(!started){
            //time = performance.now() % max;
            //while(time != 0){
             //   time = performance.now() % max;
            //}
            offset = performance.now() % max;

            draw();
            audio.play();
            started = true;
        }
        
        
            
            
            

        
    }

}