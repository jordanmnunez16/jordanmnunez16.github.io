import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let roadCtr = 0;


/**
 * @typedef RoadProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 * @property {number} [len=25]
 * @property {number} [rotation=0]
 * @property {number} [timing=0]
 */

export class GrRoad extends GrObject{
    /**
     * @param {RoadProperties} params
     */
    constructor(params = {}){
        let geom = new T.BoxGeometry(1.5, .1, params.len || 25);
        let mesh = new T.Mesh(geom, new T.MeshStandardMaterial({color:"gray"}));

        super(`Road-${roadCtr++}`, mesh);

        this.objects[0].translateX(params.x || 0);
        this.objects[0].translateY(params.y || 0);
        this.objects[0].translateZ(params.z || 0);
        this.objects[0].rotateY(params.rotation || 0);
        
        this.timing = params.timing || 0;
        this.u = 0;

        if(this.timing != 0){
            this.objects[0].translateY(-.2);
        }

    }
    tick(delta, timeOfDay){
        

        if(this.timing != 0){
            this.u += delta/10;
            if(this.u > this.timing){
                this.timing = 0;
                this.objects[0].position.y = 0;
            }
        }
    }
}
