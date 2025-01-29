/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Mesh } from "../libs/CS559-THREE/build/three.module.js";

function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}

let forkliftCraneCtr = 0;


/**
 * @typedef ForkliftCraneProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrForkliftCrane extends GrObject{
  /**
   * @param {ForkliftCraneProperties} params
   */
  constructor(params = {}){

    let fCrane = new T.Group();

    let baseGeom = new T.BoxGeometry(2,.25, 1);
    let base = new T.Mesh(baseGeom, new T.MeshStandardMaterial({color:"#888888", metalness: 0.6, roughness: 0.3}));
    fCrane.translateY(.5);
    fCrane.add(base);

    let base2 = new T.Mesh(baseGeom, new T.MeshStandardMaterial({color:"orange"}));
    fCrane.add(base2);
    base2.translateY(.25);

    let backGeom = new T.BoxGeometry(.9, 1.25, .5);
    let back = new T.Mesh(backGeom, new T.MeshStandardMaterial({color:"#888888", metalness: 0.6,
    roughness: 0.3}));
    back.translateX(-.74);
    back.translateY(.5);
    back.rotateY(degreesToRadians(90));
    base2.add(back);

    let wheelGeom = new T.CylinderBufferGeometry(.25, .25, .2);
    let wheel1 = new T.Mesh(wheelGeom, new T.MeshStandardMaterial({color:"black"}));
    wheel1.translateX(.75);
    wheel1.translateY(-.2);
    wheel1.translateZ(.5);
    wheel1.rotateX(Math.PI/2);
    fCrane.add(wheel1);

    let wheel2 = new T.Mesh(wheelGeom, new T.MeshStandardMaterial({color:"black"}));
    wheel2.translateX(.75);
    wheel2.translateY(-.2);
    wheel2.translateZ(-.5);
    wheel2.rotateX(Math.PI/2);
    fCrane.add(wheel2);

    let wheel3 = new T.Mesh(wheelGeom, new T.MeshStandardMaterial({color:"black"}));
    wheel3.translateX(-.75);
    wheel3.translateY(-.2);
    wheel3.translateZ(-.5);
    wheel3.rotateX(Math.PI/2);
    fCrane.add(wheel3);

    let wheel4 = new T.Mesh(wheelGeom, new T.MeshStandardMaterial({color:"black"}));
    wheel4.translateX(-.75);
    wheel4.translateY(-.2);
    wheel4.translateZ(.5);
    wheel4.rotateX(Math.PI/2);
    fCrane.add(wheel4);

    let hingeGeom = new T.BoxGeometry(.2, .4,.2);
    let hinge = new T.Mesh(hingeGeom, new T.MeshStandardMaterial({color:"black"}));
    hinge.translateY(.2);

    base2.add(hinge);

    //let craneGroup = new T.Group();

    let lowArmGeom = new T.BoxGeometry(.3, 1, .3);
    let lowArm = new T.Mesh(lowArmGeom, new T.MeshStandardMaterial({color:"orange"}));
    hinge.add(lowArm);
    lowArm.translateY(.5);

    let highArmGeom = new T.BoxGeometry(.25, 1, .25);
    let highArm = new T.Mesh(highArmGeom, new T.MeshStandardMaterial({color:"#888888", metalness:.6, roughness:.3}));
    lowArm.add(highArm);
    highArm.translateY(.2);

    let forkGroup = new T.Group();
    let forkBackGeom = new T.BoxGeometry(.1, .5, .5);
    let forkBack = new T.Mesh(forkBackGeom, new T.MeshStandardMaterial({color:"orange"}));
    highArm.add(forkGroup);
    forkGroup.add(forkBack);
    
    forkGroup.translateY(.6);

    let forkGeom = new T.CylinderBufferGeometry(.05, .025, .5);
    let fork1 = new T.Mesh(forkGeom, new T.MeshStandardMaterial({color:"orange"}));

    forkGroup.add(fork1);
    fork1.rotateZ(Math.PI/2);
    fork1.translateY(-.25);
    fork1.translateX(-.2);
    fork1.translateZ(.2);

    let fork2 = new T.Mesh(forkGeom, new T.MeshStandardMaterial({color:"orange"}));

    forkGroup.add(fork2);
    fork2.rotateZ(Math.PI/2);
    fork2.translateY(-.25);
    fork2.translateX(-.2);
    fork2.translateZ(-.2);

    let dirtBlockGeom = new T.BoxGeometry(.45, .45, .45);
    let dirtBlock = new T.Mesh(dirtBlockGeom, new T.MeshStandardMaterial({color:"#5c4e27"}));
    dirtBlock.translateY(-50);
    dirtBlock.translateX(.3);
    forkGroup.add(dirtBlock);



    super(`ForkliftCrane-${forkliftCraneCtr++}`, fCrane);

    this.whole_ob = fCrane;
    this.hinge = hinge;
    this.arm = highArm;
    this.forkGroup = forkGroup;
    this.base = base2;
    this.dirt = dirtBlock;

    // Start values
    this.x = params.x || 0;
    this.y = params.y || 0;
    this.z = params.z || 0;

    this.objects[0].translateX(this.x);
    this.objects[0].translateY(this.y);
    this.objects[0].translateZ(this.z);
    //this.objects[0].rotation.y = degreesToRadians(90);
    this.u = 0;
    this.rideable = back;
    this.inverted = false;
    this.counter = 0;
    this.counted = false;

  }
  tick(delta,timeOfDay){
      this.u += delta / 10;
      //let p = this.u * 2 * Math.PI;
      //this.objects[0].position.x = this.x +Math.cos(p);
      
      let p = this.u % 1300;
      if(p < 200){
        this.hinge.rotation.z = degreesToRadians(0 - p*90/200);
        
      }
      else if(p > 200 && p < 250){
          this.arm.position.y = .2 + (p-200)*.8/50;
      }
      else if(p > 250 && p < 300){
        if(this.inverted){
          this.dirt.position.y = -50;
        }
        else{
          this.dirt.position.y = .05;
        }
        
        this.arm.position.y = 1 - (p-250)*.8/50;
      }
      else if ( p > 300 && p < 500){
        this.hinge.rotation.z = degreesToRadians((p-300)*90/200 - 90);
      }
      else if(p >= 500 && p < 550){
        this.base.rotation.y = degreesToRadians((p-499)*180/50);
      }
      else if(p > 550 && p < 650){
        this.whole_ob.position.x = this.x - (p-550)*4/100;
      }

      else if(p > 650 && p < 850){
        this.hinge.rotation.z = degreesToRadians(0 - (p-650)*90/200);
        
      }

      else if(p > 850 && p < 900){
        this.arm.position.y = .2 + (p-850)*.8/50;
      }
      else if(p > 900 && p < 950){
        if(this.inverted){
          this.dirt.position.y = .05;
        }
        else{
          this.dirt.position.y = -50;
        }
        this.arm.position.y = 1 - (p-900)*.8/50;
      }

      else if ( p > 950 && p < 1150){
        this.hinge.rotation.z = degreesToRadians((p-950)*90/200 - 90);
      }
      else if(p >= 1150 && p < 1200){
        this.base.rotation.y = degreesToRadians(180 - (p-1149)*180/50);
      }
      else if(p > 1200 && p < 1300){
        this.whole_ob.position.x = this.x - 4 + (p-1200)*4/100;
      }


      this.forkGroup.rotation.z = -this.hinge.rotation.z;

      if(this.counter == 49){
        this.inverted = !this.inverted;
        this.counter = 0;
      }
      
      if(p > 1250 && !this.counted){
        this.counted = true;
        this.counter++;
      }
  
      if(p < 100){
        this.counted = false;
      }

  }

  /*
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.hinge.rotation.z = degreesToRadians(paramValues[3]);
    this.arm.position.y = paramValues[4];
    this.forkGroup.rotation.z = degreesToRadians(paramValues[5] - paramValues[3]);
    this.base.rotation.y = degreesToRadians(paramValues[6]);
    
  }
  */
}

let dirtPileCounter = 0;

/**
 * @typedef DirtPileProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 * @property {boolean} [inverted=false]
 */
export class GrDirtPile extends GrObject{
  /**
   * @param {DirtPileProperties} params
   */
  constructor(params = {}){

    let pileGeom = new T.ConeGeometry(2.5, 1.5);
    let pile = new T.Mesh(pileGeom, new T.MeshStandardMaterial({color:"#5c4e27"}));

    super(`DirtPile-${dirtPileCounter++}`, pile);

    this.x = params.x || 0;
    this.y = params.y || 0;
    this.z = params.z || 0;

    this.objects[0].translateX(this.x);
    this.objects[0].translateY(this.y + .5);
    this.objects[0].translateZ(this.z);

    if(params.inverted){
      this.objects[0].position.y = -.75;
    }

    this.u = 0;
    this.moved = false;
    this.inverted = params.inverted;
    this.counter = 0;
    this.counted = false;

    this.timeA = 250;
    this.timeB = 900;


  }
  tick(delta, timeOfDay){
    this.u += delta / 10;

    let change= -.025;


    let p = this.u % 1300;

    if(!this.inverted){
      if(p > this.timeA && !this.moved  && p < this.timeA + 25){
        this.objects[0].translateY(change);
        this.moved = true;
      }
      if( p > this.timeA + 25){
        this.moved = false;
      }
    }
    else{
      if(p > this.timeB && !this.moved  && p < this.timeB + 25){
        this.objects[0].translateY(-change);
        this.moved = true;
      }
      if( p > this.timeB + 25){
        this.moved = false;
      }

    }

    if(this.counter == 49){
      this.inverted = !this.inverted;
      this.counter = 0;
      let temp = this.timeA;
      this.timeA = this.timeB;
      this.timeB = temp;
    }
    
    if(p > 1250 && !this.counted){
      this.counted = true;
      this.counter++;
    }

    if(p < 100){
      this.counted = false;
    }

  }
}


let cementMixerCtr = 0;

/**
 * @typedef CementMixerProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCementMixer extends GrObject{
  /**
   * @param {CementMixerProperties} params
   */
  constructor(params = {}){
    let cm = new T.Group();
    let baseGeom = new T.BoxGeometry(2,.5, 1);
    let base = new T.Mesh(baseGeom, new T.MeshStandardMaterial({color:"gray"}));
    cm.translateY(.5);
    cm.add(base);

    let wheelGeom = new T.CylinderBufferGeometry(.25, .25, .2);
    let wheel1 = new T.Mesh(wheelGeom, new T.MeshStandardMaterial({color:"black"}));
    wheel1.translateX(.75);
    wheel1.translateY(-.2);
    wheel1.translateZ(.5);
    wheel1.rotateX(Math.PI/2);
    cm.add(wheel1);

    let wheel2 = new T.Mesh(wheelGeom, new T.MeshStandardMaterial({color:"black"}));
    wheel2.translateX(.75);
    wheel2.translateY(-.2);
    wheel2.translateZ(-.5);
    wheel2.rotateX(Math.PI/2);
    cm.add(wheel2);

    let wheel3 = new T.Mesh(wheelGeom, new T.MeshStandardMaterial({color:"black"}));
    wheel3.translateX(-.75);
    wheel3.translateY(-.2);
    wheel3.translateZ(-.5);
    wheel3.rotateX(Math.PI/2);
    cm.add(wheel3);

    let wheel4 = new T.Mesh(wheelGeom, new T.MeshStandardMaterial({color:"black"}));
    wheel4.translateX(-.75);
    wheel4.translateY(-.2);
    wheel4.translateZ(.5);
    wheel4.rotateX(Math.PI/2);
    cm.add(wheel4);

    let hingeGeom = new T.BoxGeometry(.2, .4,.2);
    let hinge = new T.Mesh(hingeGeom, new T.MeshStandardMaterial({color:"black"}));
    hinge.translateY(.2);
    let mixerGroup = new T.Group();

    
    cm.add(hinge);

    let mixerGeom = new T.SphereBufferGeometry(.5, 20, 20);
    let mixer = new T.Mesh(mixerGeom, new T.MeshStandardMaterial({color: "#888888", metalness: 0.6,
    roughness: 0.3}));
    mixerGroup.translateX(-.2);
    mixerGroup.translateY(.5);
    mixer.scale.set(1.5,1,1);
    mixerGroup.add(mixer);
    hinge.add(mixerGroup);

    let frontGeom = new T.BoxGeometry(1, 1.25, .5);
    let front = new T.Mesh(frontGeom, new T.MeshStandardMaterial({color:"gray"}));
    front.translateX(.75);
    front.translateY(.5);
    front.rotateY(Math.PI/2);
    cm.add(front);

    let poleGeom = new T.BoxGeometry(1, .1, .1);
    let pole = new T.Mesh(poleGeom, new T.MeshStandardMaterial({color:"gray"}));
    pole.translateX(-.5);
    pole.translateY(.2);
    mixerGroup.add(pole);





    super(`CementMixer-${cementMixerCtr++}`, cm);

    this.whole_ob = cm;
    this.hinge = hinge;
    this.mixerGroup = mixerGroup;
    this.x = params.x || 0;
    this.y = params.y || 0;
    this.z = params.z || 0;

    this.rideable = front;
    this.u = 0;
    this.done = false;

    this.hinge.rotation.z = degreesToRadians(45);

    this.objects[0].translateX(this.x);
    this.objects[0].translateY(this.y);
    this.objects[0].translateZ(this.z);

    this.check1 = false;
    
    

  }
  tick(delta, timeOfDay){
    this.u += delta / 10;

    let p = this.u % 2000;

    if(!this.done){
      this.mixerGroup.rotation.x = degreesToRadians(2*Math.PI*p/5);
    }
    
    if(!this.check1 && p > 100){
      this.check1 = true;
    }

    if(!this.done && this.check1 && p < 100){
      this.done = true;
      this.hinge.rotation.z = 0;
    }

    if(p < 450){
      this.objects[0].position.x = this.x + p*7/450;
    }
    else if(p >= 450 && p < 500){
      this.objects[0].rotation.y = Math.PI/2 * (p-449)/50;
    }
    else if(p >= 500 && p < 950){
      this.objects[0].position.z = this.z - (p-499)*5/450;
    }
    else if(p >= 950 && p < 1000){
      this.objects[0].rotation.y = Math.PI/2 + Math.PI/2 * (p-949)/50;
    }
    else if(p >= 1000 && p < 1450){
      this.objects[0].position.x = this.x + 7  -  (p-999)*7/450;
    }

    else if(p >= 1450 && p < 1500){
      this.objects[0].rotation.y = Math.PI + Math.PI/2 * (p-1449)/50;
    }

    else if(p >= 1500 && p < 1950){
      this.objects[0].position.z = this.z - 5  +  (p-1499)*5/450;
    }

    else{
      this.objects[0].rotation.y = 3*Math.PI/2 + Math.PI/2 * (p-1949)/50;
    }


  }
  /*
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.hinge.rotation.z = degreesToRadians(paramValues[3]);
    this.mixerGroup.rotation.x = degreesToRadians(paramValues[4]);
  }
  */
}