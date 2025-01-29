/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program

let carCounter = 0;

/**
 * @typedef CarProperties
 * @type {object}
 * @property {number} [size=1]
 * @property {string} [color]
 * @property {number} [offset]
 */

export class GrCar extends GrObject{

    /**
    * @param {CarProperties} params
    */
    constructor(params = {}){
        let car = new T.Group();

        let baseGeom = new T.BoxGeometry(2,.25, 1);
        let base = new T.Mesh(baseGeom, new T.MeshStandardMaterial({color:params.color, metalness: 0.6, roughness: 0.3}));
        car.translateY(.5);
        car.add(base);

        let backRimGeom = new T.BoxGeometry(1.22, .17, .1);
        let backRim1 = new T.Mesh(backRimGeom, new T.MeshStandardMaterial({color:params.color, metalness: .6, roughness:.3}));
        car.add(backRim1);
        backRim1.translateY(.2);
        backRim1.translateX(-.38);
        backRim1.translateZ(.45);

        

        let backRim2 = new T.Mesh(backRimGeom, new T.MeshStandardMaterial({color:params.color, metalness: .6, roughness:.3}));
        car.add(backRim2);
        backRim2.translateY(.2);
        backRim2.translateX(-.38);
        backRim2.translateZ(-.45);

        let backRimGeom2 = new T.BoxGeometry(.1, .17, 1);
        let backRim3 = new T.Mesh(backRimGeom2, new T.MeshStandardMaterial({color:params.color, metalness: .6, roughness:.3}));
        car.add(backRim3);
        backRim3.translateY(.2);
        backRim3.translateX(-.95);


        let wheelGeom = new T.CylinderBufferGeometry(.25, .25, .2);
        let wheel1 = new T.Mesh(wheelGeom, new T.MeshStandardMaterial({color:"black"}));
        wheel1.translateX(.75);
        wheel1.translateY(-.2);
        wheel1.translateZ(.5);
        wheel1.rotateX(Math.PI/2);
        car.add(wheel1);

        let wheel2 = new T.Mesh(wheelGeom, new T.MeshStandardMaterial({color:"black"}));
        wheel2.translateX(.75);
        wheel2.translateY(-.2);
        wheel2.translateZ(-.5);
        wheel2.rotateX(Math.PI/2);
        car.add(wheel2);

        let wheel3 = new T.Mesh(wheelGeom, new T.MeshStandardMaterial({color:"black"}));
        wheel3.translateX(-.75);
        wheel3.translateY(-.2);
        wheel3.translateZ(-.5);
        wheel3.rotateX(Math.PI/2);
        car.add(wheel3);

        let wheel4 = new T.Mesh(wheelGeom, new T.MeshStandardMaterial({color:"black"}));
        wheel4.translateX(-.75);
        wheel4.translateY(-.2);
        wheel4.translateZ(.5);
        wheel4.rotateX(Math.PI/2);
        car.add(wheel4);

        let seatingAreaGeom = new T.BoxGeometry(1, .5, .25);
        let seatingArea = new T.Mesh(seatingAreaGeom, new T.MeshStandardMaterial({color:"pink", metalness: 0.6, roughness: 0.3}));
        seatingArea.translateY(.25);
        seatingArea.translateX(.35);
        seatingArea.rotateY(Math.PI/2);
        car.add(seatingArea);

        let win1Geom = new T.Geometry();
        win1Geom.vertices.push(new T.Vector3(.35, 0, -.5));
        win1Geom.vertices.push(new T.Vector3(0, 0, -.5));
        win1Geom.vertices.push(new T.Vector3(0, .375, -.5));

        win1Geom.vertices.push(new T.Vector3(0, 0, .5));
        win1Geom.vertices.push(new T.Vector3(.35, 0, .5));
        win1Geom.vertices.push(new T.Vector3(0, .375, .5));

        let win1f1 = new T.Face3(0, 1, 2);
        win1Geom.faces.push(win1f1);
        

        let win1f2 = new T.Face3(3,4,5);
        win1Geom.faces.push(win1f2);

        let win1f3 = new T.Face3(4,0,5);
        win1Geom.faces.push(win1f3);

        let win1f4 = new T.Face3(0,2,5);
        win1Geom.faces.push(win1f4);
       


        win1Geom.computeFaceNormals();

        
        let window1 = new T.Mesh(win1Geom, new T.MeshStandardMaterial({color:"#BABABA", metalness: 0.6, roughness: 0.3}));
        
        
        
        car.add(window1);
        window1.translateY(.125);
        window1.translateX(.47);

        




        super(`Car-${carCounter++}`, car);
        
        this.objects[0].translateZ(-14);
        this.objects[0].translateX(-12.5);
        this.rideable = seatingArea;
        this.u = 0;
        this.offset = params.offset || 0;



    }

    tick(delta, timeOfDay){
        this.u += delta / 10;

        let p = (this.u + this.offset) % 3200;
        if(p < 750){
            this.objects[0].position.x = -12.5 + p*25/750;
        }
        else if(p >= 750 && p < 800){
            this.objects[0].rotation.y = -(p-749)/50* Math.PI/2;
        }
        else if(p >= 800 && p < 1550){
            this.objects[0].position.z = -14 + (p-800)*20/750;
        }
        else if(p >= 1550 && p < 1600){
            this.objects[0].rotation.y = -Math.PI/2 - (p-1549)/50* Math.PI/2;
        }
        else if(p >= 1600 && p < 2350){
            this.objects[0].position.x = 12.5 - (p-1599)*25/750;
        }
        else if(p >= 2350 && p < 2400){
            this.objects[0].rotation.y = -Math.PI - (p-2349)/50* Math.PI/2;
        }
        else if(p >= 2400 && p < 3150){
            this.objects[0].position.z = 6  - (p-2399)*20/750;
        }
        else{
            this.objects[0].rotation.y = -3*Math.PI/2 - (p-3149)/50* Math.PI/2;
        }
    }


}