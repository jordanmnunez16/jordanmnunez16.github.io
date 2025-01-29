/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your buildings here - remember, they need to be imported
// into the "main" program


let pyramidCounter = 0;

/**
 * @typedef PyramidProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 * @property {string} [color]
 */

export class GrPyramid extends GrObject{
    /**
    * @param {PyramidProperties} params
    */
    constructor(params = {}){
        let geometry = new T.Geometry;

        geometry.vertices.push(new T.Vector3(-.5, 0, .5));
        geometry.vertices.push(new T.Vector3(.5, 0, .5));
        geometry.vertices.push(new T.Vector3(0, 1, 0));

        geometry.vertices.push(new T.Vector3(.5, 0, -.5));
        geometry.vertices.push(new T.Vector3(-.5, 0, -.5));

        let f1 = new T.Face3(0, 1, 2);
        geometry.faceVertexUvs = [[]];
        geometry.faces.push(f1);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0, 0),
            new T.Vector2(1, 0),
            new T.Vector2(.5, 1)
        ]);

        let f2 = new T.Face3(3, 4, 2);
        geometry.faces.push(f2);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0, 0),
            new T.Vector2(1, 0),
            new T.Vector2(.5, 1)
        ]);

        let f3 = new T.Face3(1, 3, 2);
        geometry.faces.push(f3);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0, 0),
            new T.Vector2(1, 0),
            new T.Vector2(.5, 1)
        ]);

        let f4 = new T.Face3(4, 0, 2);
        geometry.faces.push(f4);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0, 0),
            new T.Vector2(1, 0),
            new T.Vector2(.5, 1)
        ]);

        geometry.scale(params.size || 1,params.size || 1,params.size || 1)
        geometry.computeFaceNormals();
        geometry.uvsNeedUpdate = true;
        let tl = new T.TextureLoader().load("../images/brick_texture.png");
        let material = new T.MeshStandardMaterial({ map: tl, roughness: 0.75, color:params.color});
        let mesh = new T.Mesh(geometry, material);
        super(`Pyramid-${pyramidCounter++}`, mesh);

        this.objects[0].translateX(params.x || 0);
        this.objects[0].translateY(params.y || 0);
        this.objects[0].translateZ(params.z || 0);
    }
}

let houseCounter = 0;

/**
 * @typedef HouseProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 * @property {string} [color]
 * @property {number} [rotation]
 */

export class GrHouse extends GrObject{
    /**
    * @param {HouseProperties} params
    */
    constructor(params = {}){
        let geometry = new T.Geometry;

        geometry.vertices.push(new T.Vector3(-.5, 0, .5));
        geometry.vertices.push(new T.Vector3(.5, 0, .5));
        geometry.vertices.push(new T.Vector3(-.5, 1, .5));
        geometry.vertices.push(new T.Vector3(.5, 1, .5));

        geometry.vertices.push(new T.Vector3(.5, 0, -.5));
        geometry.vertices.push(new T.Vector3(-.5, 0, -.5));
        geometry.vertices.push(new T.Vector3(.5, 1, -.5));
        geometry.vertices.push(new T.Vector3(-.5, 1, -.5));

        geometry.vertices.push(new T.Vector3(0, 1.35, 0));

        // facing front (3)

        let f1 = new T.Face3(0, 1, 2);
        geometry.faceVertexUvs = [[]];
        geometry.faces.push(f1);
        geometry.faceVertexUvs[0].push([
        new T.Vector2(.25, 0),
        new T.Vector2(.75, 0),
        new T.Vector2(.25, 1)
        ]);
        let f2 = new T.Face3(1, 3, 2);
        geometry.faces.push(f2);
        geometry.faceVertexUvs[0].push([
        new T.Vector2(.75, 0),
        new T.Vector2(.75, 1),
        new T.Vector2(.25, 1)
        ]);


        // back

        let f3 = new T.Face3(4, 5, 6);
        geometry.faces.push(f3);
        
        let f4 = new T.Face3(5, 7, 6);
        geometry.faces.push(f4);
       

        // left
        let f5 = new T.Face3(5, 0, 7);
        geometry.faces.push(f5);
        

        let f6 = new T.Face3(0, 2, 7);
        geometry.faces.push(f6);
    

        // right
        let f7 = new T.Face3(1, 4, 3);
        geometry.faces.push(f7);
        

        let f8 = new T.Face3(4, 6, 3);
        geometry.faces.push(f8);
       

        // roof
        let f9 = new T.Face3(2, 3, 8);
        geometry.faces.push(f9);
        
        let f10 = new T.Face3(6, 7, 8);
        geometry.faces.push(f10);

        let f11 = new T.Face3(3,6,8);
        geometry.faces.push(f11);
        
        let f12 = new T.Face3(7, 2, 8);
        geometry.faces.push(f12);

        

        // bottom
        let f13 = new T.Face3(5, 4, 0);
        geometry.faces.push(f13);
        

        let f14 = new T.Face3(4,1,0);
        geometry.faces.push(f14);
        

        

        geometry.scale(params.size || 1,params.size || 1,params.size || 1);
        geometry.computeFaceNormals();
        geometry.uvsNeedUpdate = true;
        let tl = new T.TextureLoader().load("../images/house.png");
        let material = new T.MeshStandardMaterial({ map: tl, roughness: 0.75, color:params.color});
        let mesh = new T.Mesh(geometry, material);
        super(`House-${houseCounter++}`, mesh);

        this.objects[0].translateX(params.x || 0);
        this.objects[0].translateY(params.y || 0);
        this.objects[0].translateZ(params.z || 0);
        this.objects[0].rotateY(params.rotation || 0);
    }
}