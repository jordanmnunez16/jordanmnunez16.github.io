import * as T from "./libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "./libs/CS559-Framework/GrWorld.js";
import { GrObject } from "./libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "./libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "./libs/CS559-Libs/helpers.js";


function test() {
    let parentOfCanvas = document.getElementById("div1");
    let world = new GrWorld({ where: parentOfCanvas, groundplane:false });
  
    

    let ctl = new T.CubeTextureLoader().load(['madjordan.png', 'madkayla.png', 'madjordan.png', 'madkayla.png', 'madjordan.png', 'madkayla.png']);
    world.scene.background = ctl;

    let sphereGeom = new T.SphereGeometry(5, 50, 50);
    let material = new T.MeshBasicMaterial({envMap:ctl});
        
    let mesh = new T.Mesh(sphereGeom, material);
    world.scene.add(mesh);
  
    world.go();
  }
  Helpers.onWindowOnload(test);