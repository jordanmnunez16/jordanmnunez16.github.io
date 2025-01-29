/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import * as T from "../libs/CS559-THREE/build/three.module.js";

import {main} from "../examples/main.js";
import { GrForkliftCrane, GrDirtPile, GrCementMixer } from "./construction.js";
import { GrPyramid, GrHouse } from "./buildings.js"
import { GrCar } from "./7-car.js";
import { GrRoad } from "./roads.js";
import { ObjectLoader } from "../libs/CS559-THREE/build/three.module.js";
import { OBJLoader } from "../libs/CS559-THREE/examples/jsm/loaders/OBJLoader.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";

/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */
function grtown() {

  let image = new T.TextureLoader().load("./looking.jpg");
  
  // make the world
  let world = new GrWorld({
    width: 800,
    height: 600,
    groundplanesize: 20 // make the ground plane big enough for a world of stuff
  });

  // put stuff into the world
  // this calls the example code (that puts a lot of objects into the world)
  // you can look at it for reference, but do not use it in your assignment
  //main(world);

  let treeObj = null;
  let treeObj2 = null;
  
  let loader = new OBJLoader();
  loader.load("/for_students/Palm_Tree.obj", function(tree) {
    tree.position.set(5, 0, 2);
    tree.scale.set(1, 1, 1);
    tree.name = "tree";
    world.scene.add(tree);


    treeObj = tree;
    
  });

  
  loader.load("/for_students/Palm_Tree.obj", function(tree) {
    tree.position.set(-5, 0, 2);
    tree.scale.set(1, 1, 1);
    tree.name = "tree";
    world.scene.add(tree);


    treeObj2 = tree;
    
  });
  
  


  
  //world.add(treeObj);


  let frCrane = new GrForkliftCrane({x:10, z:10});
  world.add(frCrane);
  let dirtPile = new GrDirtPile({x:12.5, z:10});
  world.add(dirtPile);
  let dirtPile2 = new GrDirtPile({x:3.5, z:10, inverted:true});
  world.add(dirtPile2);

  let pyramid1 = new GrPyramid({color:"pink", size:7, z: -4});
  world.add(pyramid1);

  // houses
  for(let i = 0; i < 8; i++){
    let color = "#66d19a";
    if(i%2 == 0)
      color = "#7e8dd9";
    world.add(new GrHouse({x: i*3.75 - 12.5, z: -17,size:2, color:color}));
  }

  for(let i = 0; i < 6; i++){
    let color = "#7e8dd9";
    if(i%2 == 0)
      color = "#66d19a";
      world.add(new GrHouse({x: -15, z: i*3.33 - 13 ,size:2, color:color, rotation:Math.PI/2}));
  }

  let car1 = new GrCar({color:"pink", offset: 200});
  world.add(car1);
  let car2 = new GrCar({color:"pink", offset: 400});
  world.add(car2);
  let car3 = new GrCar({color:"pink"});
  world.add(car3);
  
  // roads
  let road1 = new GrRoad({z:-14, rotation: Math.PI/2});
  let road2 = new GrRoad({z:6, rotation: Math.PI/2});
  let road3 = new GrRoad({x:-12.5, len:21.5, z:-4})
  let road4 = new GrRoad({x:12.5, len:21.5, z:-4})
  
  world.add(road1);
  world.add(road2);
  world.add(road3);
  world.add(road4);

  // cement mixer

  let cementMixer = new GrCementMixer({x:-14, z: 15});
  world.add(cementMixer);

  // roads for cement mixer
  let road5 = new GrRoad({x:-11, z:15, rotation:Math.PI/2, len:7, timing: 500});
  let road6 = new GrRoad({x:-7,z:12.5, len:6.5,timing:1000});
  let road7 = new GrRoad({x:-11, z:10, rotation:Math.PI/2, len:7, timing: 1500});
  let road8 = new GrRoad({x:-14,z:12.5, len:6.5,timing:2000});

  
  world.add(road5);
  world.add(road6);
  world.add(road7);
  world.add(road8);

  world.scene.background = new T.CubeTextureLoader().load(['Right.png', 'Left.png', 'Top.png', 'Front.png', 'Back.png', 'Bottom.png']);

  // peeking guy (shader)

  

  let shaderMat = shaderMaterial("./8-2.vs", "./8-2.fs", {
    side: T.DoubleSide,
    uniforms: {
      texture: { value: image },
    },
  });

  world.add(
    new SimpleObjects.GrSquareSign({ x: -15, y: 1.2,z:4.66, size: .5, material: shaderMat })
  );

  
  
  

  // build and run the UI

  // only after all the objects exist can we build the UI
  // @ts-ignore       // we're sticking a new thing into the world
  world.ui = new WorldUI(world);
  // now make it go!
  world.go();
}
Helpers.onWindowOnload(grtown);
