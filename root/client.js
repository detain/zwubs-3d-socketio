/*https://javascriptobfuscator.com/Javascript-Obfuscator.aspx*/
socket = io(); // This triggers the 'connection' event on the server
//One Instance Handler
window.onload = function(){
    if (document.cookie.indexOf("gameinstance=true") === -1) {
      
        document.getElementById("content").style.display = "initial";
      
        var date = new Date();
        date.setTime(date.getTime()+600000);
      
        document.cookie = "gameinstance=true" + ";expires="+date.toGMTString();
        // Set the onunload function
        window.onunload = function(){
            document.cookie ="gameinstance=true;expires=Thu, 01-Jan-1970 00:00:01 GMT";
        };
        GameLoop();
      
    }
    else {
        alert("Only one instance of the game up at a time");
    }
};

function createCookie(name, value) {
   var date = new Date();
   date.setTime(date.getTime()+(30*1000));
   var expires = "; expires="+date.toGMTString();

   document.cookie = name+"="+value+expires+"; path=/";
}

var names = ["Chek","Rubik","Box","Zombie","Spoopy","Murica","Grass","Dirt","Wood","Slime","Cutie","CompanionCube","Kirby","PewDiePie","LoveMuffin","Looooooooolz","Wingdings","ComicSans","BlingBlang","MomIsBestGirl","MachoMario","HotDang","AyeIGotDaLoops","SwiggitySwooty","Yeet","DankMaster5000","DirtyDan","PinheadLarry","LeeroyJenkins"]; //RickAstley

function Check() {

  var A = document.getElementById("input").value

  if (A != "" && (A.split(" ").length - 1) == 0) {Start(A);}
  else {Start(names[Math.floor(Math.random()*names.length)]);}
  
}

function Start(A) {
  var B = A.toUpperCase();
  controls.enabled = true;
  
  if(B == "BOX") { Player.skin = "Box" }
  else if(B == "ZOMBIE") { Player.skin = "Zombie" }
  else if(B == "SPOOPY") { Player.skin = "Ghost" }
  else if(B == "MURICA") { Player.skin = "Flag" }
  else if(B == "GRASS") { Player.skin = "Grass" }
  else if(B == "SPIDERMAN") { Player.skin = "Spider" }
  else if(B == "DIRT") { Player.skin = "Dirt" }
  else if(B == "WOOD") { Player.skin = "Wood" }
  else if(B == "SLIME") { Player.skin = "Slime" }
  else if(B == "CUTIE") { Player.skin = "Cute" }
  else if(B == "COMPANIONCUBE") { Player.skin = "Companion" }
  else if(B == "KIRBY") { Player.skin = "Kirby" }
  else if(B == "ICE") { Player.skin = "Ice" }
  else if(B == "HARDMODE") { Player.skin = "Invisible", A = "" }
  else if(B == "PINK") { Player.skin = "Pink" }
  else if(B == "SKY") { Player.skin = "Sky" }
  else if(B == "CHEK") { Player.skin = "Check" }
  else if(B == "RUBIK") { Player.skin = "Rubik" }
  else if(B == "!TRUE") { A = "False" }
  else if(B == "!FALSE") { A = "True" }
  else if(B == "GABE") { A += " Bork" }
  else if(B == "SNOOP") { A += "420"; }

  Player.name = A;
  Player.init();

  document.getElementById("menu").style.display = "none";
  
  Ball.init();

}
var connect = true;
var ismobile = false;

var mobile = {
		
  init: function() {

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {

      ismobile = true;

      document.getElementById("left").addEventListener('touchstart', function(event) { Input.state[65] = true; });
      document.getElementById("left").addEventListener('touchend', function(event) { Input.state[65] = false; });

      document.getElementById("right").addEventListener('touchstart', function(event) { Input.state[68] = true; });
      document.getElementById("right").addEventListener('touchend', function(event) { Input.state[68] = false; });

      document.getElementById("forward").addEventListener('touchstart', function(event) { Input.state[87] = true; });
      document.getElementById("forward").addEventListener('touchend', function(event) { Input.state[87] = false; });

      document.getElementById("backward").addEventListener('touchstart', function(event) { Input.state[83] = true; });
      document.getElementById("backward").addEventListener('touchend', function(event) { Input.state[83] = false; });

      document.getElementById("space").addEventListener('touchstart', function(event) { Input.state[32] = true; });
      document.getElementById("space").addEventListener('touchend', function(event) { Input.state[32] = false; });

      document.getElementById("mobilecontrols").style.display = "initial";
      document.getElementById("persp").style.display = "none";
      document.getElementById("version").style.display = "none";

    }
  }
}

mobile.init();

//window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x9fcbed );
scene.fog = new THREE.Fog( 0x9fcbed, 32, 48 );

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5,5,0);
camera.rotation.set(0,0,0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.getElementById("content").appendChild(renderer.domElement);

//Window Resize Handler
window.addEventListener('resize', function() {

  var width =  window.innerWidth;
  var height =  window.innerHeight;

  renderer.setSize(width,height);

  camera.aspect = width/height;
  camera.updateProjectionMatrix();
  
});

//Initialize Orbit Controls
var controls = new THREE.OrbitControls(camera,renderer.domElement);


//Perspective Controls
perspective = 3; // 0 - Orbit, 1 - First Person, 2 - Third Person
function Perspec(A) {

    perspective = A;
    if(A == 0) {
      controls.enabled = true;
      controls.maxDistance = 4;
      controls.minDistance = 4;
      controls.enableDamping = true;
      controls.dampingFactor = 1;
      controls.enableKeys = false;
      controls.enableZoom = false;
      controls.maxPolarAngle = 1;
      controls.minPolarAngle = 1;
      controls.autoRotate = false;
    }
    else if(A == 3) {

      controls.enabled = true;
      controls.maxDistance = 32;
      controls.minDistance = 32;
      controls.enableDamping = false;
      controls.enableKeys = false;
      controls.enableZoom = false;
      controls.maxPolarAngle = 1;
      controls.minPolarAngle = 1;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1;

    }
    else { controls.enabled = false; }

  }

Perspec(perspective);


var seed = null;

const a = 1103515245;
const c = 12345;
const m = Math.pow(2,32);

function rand() {
  seed = ((a*seed+c)%m)/1000000;
  seed = seed-Math.floor(seed);
  return seed;
}

function random(A,B) {
  seed = ((a*seed+c)%m)/1000000;
  seed = seed-Math.floor(seed);
  return Math.floor(seed*(B-A+1))+A;
}


var light = new THREE.Color( 0xffffff );
var shadow = new THREE.Color( 0x999999 );

//Create The Geometry
var Geo = {

  Player: new THREE.BoxGeometry(.5, .5, .5),
  Bullet: new THREE.BoxGeometry(.1875,.375,.1875),

}

Geo.Bullet.applyMatrix(new THREE.Matrix4().makeTranslation(0,-.1875,0));
Geo.Bullet.rotateX(Math.PI/2);


//Create The Textures
var Tex = {
  
  Player: new THREE.TextureLoader().load("https://raw.githubusercontent.com/ZWubs/Dump/master/Players.png"),

  PSide: new THREE.TextureLoader().load("https://cdn.glitch.com/36eb297f-63f5-48da-9b63-9c73fa4c5ac7%2FPSide.png?1516648436969"),
  PFace: new THREE.TextureLoader().load("https://cdn.glitch.com/36eb297f-63f5-48da-9b63-9c73fa4c5ac7%2FPFace.png?1516648436949"),
  
  BSide: new THREE.TextureLoader().load("https://raw.githubusercontent.com/ZWubs/Dump/master/BSide.png"),
	BFront: new THREE.TextureLoader().load("https://raw.githubusercontent.com/ZWubs/Dump/master/BFront.png"),

}

//Pixelate Textures
for (var i in Tex) { Tex[i].magFilter = THREE.NearestFilter; Tex[i].minFilter = THREE.LinearFilter; }


//Create The Materials (Color/Texture)
var Mat = {
  
  Player: new THREE.MeshStandardMaterial({map: Tex.Player,transparent: true}),
  
  Bullet: [
			new THREE.MeshStandardMaterial({map: Tex.BFront}),
			new THREE.MeshStandardMaterial({map: Tex.BFront}),
			new THREE.MeshStandardMaterial({map: Tex.BSide}),
			new THREE.MeshStandardMaterial({map: Tex.BSide}),
			new THREE.MeshStandardMaterial({map: Tex.BSide}),
			new THREE.MeshStandardMaterial({map: Tex.BSide}),
	],
}

//Remove Material Shine
for(var i in Mat) {

  if(Array.isArray(Mat[i])) { for (var j in Mat[i]) {Mat[i][j].roughness = 1;} }
  else { Mat[i].roughness = 1; }

}

var Map = {

  dim: [96,64,96],
  pos: [0,0,0],
  origin: [0,0,0], //Relative Origin

  val: null,
  data: null,
  seed: null,

  array: function(l) { return Array.apply(null, Array(l)).map(Number.prototype.valueOf,0) },

  getY: function( x, z ) { return ( this.data[ x + z * this.dim[0] ] * 0.2 + 32) | 0; },
  
  gen: function( width, height ) {

    var data = [], perlin = new ImprovedNoise(),
    size = width * height, quality = 2, z = this.seed * 100;

    for ( var j = 0; j < 4; j ++ ) {

      if ( j === 0 ) for ( var i = 0; i < size; i ++ ) data[ i ] = 0;

      for ( var i = 0; i < size; i ++ ) {

        var x = i % width, y = ( i / width ) | 0;
        data[ i ] += Math.round(perlin.noise( x / quality, y / quality, z ) * quality);

      }
      quality *= 4;
    }
    return data;
  },

  init: function() {
    
    this.seed = rand();

    this.pos = [0,0,0];
    this.origin = [(this.dim[0]-1)/-2.0+.5,-this.dim[1]/2.0,(this.dim[2]-1)/-2.0+.5];

    this.data = this.gen(this.dim[0],this.dim[2]);
    this.val = this.array(this.dim[1]);
    
    for(var y = 0; y < this.val.length; y++) {

      this.val[y] = this.array(this.dim[0]);

      for(var x = 0; x < this.val[y].length; x++) { this.val[y][x] = this.array(this.dim[2]); }

    }
    
    for(var i = 0; i < random(4,12); i++ ) { Tree.place(); }
    Island.place();
    
    for(var i in this.data) {

      var x = i%this.dim[0];
      var z = Math.floor(i/this.dim[0]);
      var y = this.getY(x,z);
      
      var A = random(0,15)
      if(A == 0) { this.val[y][x][z] = 3; }
      else if( A == 1 )  { this.val[y][x][z] = 2; }
      else { this.val[y][x][z] = 1; }
      
      for (var i = y-1; i >= 0; i--) { this.val[i][x][z] = 2; }

    }
  }
}

var Tree = {
	
		val: [
	  		[
				  [
			    	[0,0,0],
			    	[0,5,0],
			    	[0,0,0],
		    	],[
					  [0,0,0],
					  [0,5,0],
					  [0,0,0],
		    	],[
		    		[6,6,6],
		    		[6,5,6],
		    		[6,6,6],
		    	],[
		    		[6,6,6],
		    		[6,5,6],
		    		[6,6,6],
		    	],[
		    		[0,6,0],
		    		[6,6,6],
		    		[0,6,0],
		    	]
		    ],[
		    	[
		    		[0,0,0,0,0],
		    		[0,0,0,0,0],
		    		[0,0,5,0,0],
		    		[0,0,0,0,0],
		    		[0,0,0,0,0],
		    	],[
		    		[0,0,0,0,0],
		    		[0,0,0,0,0],
		    		[0,0,5,0,0],
		    		[0,0,0,0,0],
		    		[0,0,0,0,0],
		    	],[
		    		[0,0,0,0,0],
		    		[0,0,6,0,0],
		    		[0,6,5,6,0],
		    		[0,0,6,0,0],
		    		[0,0,0,0,0],
		    	],[
		    		[0,6,6,6,0],
		    		[6,6,6,6,6],
		    		[6,6,5,6,6],
		    		[6,6,6,6,6],
		    		[0,6,6,6,0],
		    	],[
		    		[0,6,6,6,0],
		    		[6,6,6,6,6],
		    		[6,6,5,6,6],
		    		[6,6,6,6,6],
		    		[0,6,6,6,0],
		    	],[
		    		[0,6,6,6,0],
		    		[6,6,6,6,6],
		    		[6,6,6,6,6],
		    		[6,6,6,6,6],
		    		[0,6,6,6,0],
		    	],[
		    		[0,0,0,0,0],
		    		[0,0,6,0,0],
		    		[0,6,8,6,0],
		    		[0,0,6,0,0],
		    		[0,0,0,0,0],
		    	]
		    ]
		],
	
	  place: function() {
	
	    var A = random(4,Map.dim[0]-4)
	    var B = random(4,Map.dim[2]-4)
	    
	    var C = random(0,Tree.val.length-1)
	
	    for (var y = 0; y < this.val[C].length; y++) {
	      for (var z = 0; z < this.val[C][y].length; z++) {
	        for (var x = 0; x < this.val[C][y][z].length; x++) {
	
	          if(this.val[C][y][x][z] != 0) { Map.val[Map.getY(A+1,B+1)+y+1][A+x][B+z] = this.val[C][y][x][z] }
	
	        }
	      }
	    }
	  },
  
    A: function(X,Z,C) {
      
      for (var y = 0; y < this.val[C].length; y++) {
	      for (var z = 0; z < this.val[C][y].length; z++) {
	        for (var x = 0; x < this.val[C][y][z].length; x++) {
	
	          if(this.val[C][y][x][z] != 0) { Map.val[Map.getY(X+2,Z+2)+y+1][X+x][Z+z] = this.val[C][y][x][z] }
	
	        }
	      }
	    }
    
    }
	}
var Island = {
		
  val: [
			[
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,3,0,0,0],
				[0,0,3,3,3,0,0],
				[0,0,0,3,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
			],[
				[0,0,0,0,0,0,0],
				[0,0,0,2,0,0,0],
				[0,3,3,3,2,0,0],
				[0,2,3,3,3,3,0],
				[0,0,3,3,3,0,0],
				[0,0,0,2,0,0,0],
				[0,0,0,0,0,0,0],
			],[
				[0,0,3,2,0,0,0],
				[0,2,2,2,2,2,0],
				[0,2,2,2,2,2,2],
				[3,2,2,2,2,2,3],
				[2,2,2,2,2,2,0],
				[0,2,2,2,2,2,0],
				[0,0,2,3,3,0,0],
			],[
				[0,1,1,1,1,1,0],
				[1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1],
				[0,1,1,1,1,1,0],
			],[
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,5,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
			],[
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,5,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
			],[
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,6,6,6,0,0],
				[0,0,6,5,6,0,0],
				[0,0,6,6,6,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
			],[
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,6,6,6,0,0],
				[0,0,6,5,6,0,0],
				[0,0,6,6,6,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
			],[
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,6,0,0,0],
				[0,0,6,6,6,0,0],
				[0,0,0,6,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
			]
		],

  place: function() {

    var X = random(8,Map.dim[0]-8)
      var Z = random(8,Map.dim[2]-8)
      var Y = Map.getY(X+3,Z+3)+6;
    
      Tree.A(X+5,Z+5,1)

      for (var y = 0; y < this.val.length; y++) {
        for (var z = 0; z < this.val[y].length; z++) {
          for (var x = 0; x < this.val[y][z].length; x++) {

            if(this.val[y][x][z] != 0) { Map.val[Y+y+3][X+x][Z+z] = this.val[y][x][z] }

          }
        }
      }

  }

}

function JumpPad() {

  var pz = random(1,Map.dim[2]-1);
  var px = random(1,Map.dim[0]-1);
  var py = Map.getY(px,pz);

  Map.val[py][px][pz] = 8;

}

function DeathCube() {

  var pz = random(1,Map.dim[2]-1);
  var px = random(1,Map.dim[0]-1);
  var py = Map.getY(px,pz);
  
  console.log(px,pz)

  Map.val[py][px][pz] = 9;

}

var Faces = {
  // FullImage: [0,1,0,0,1,1,0,0,1,0,1,1]
  GrassTop: [0,1,0,3/4,1/4,1,0,3/4,1/4,3/4,1/4,1],
  GrassSide: [1/4,1,1/4,3/4,1/2,1,1/4,3/4,1/2,3/4,1/2,1],
  Dirt: [1/2,1,1/2,3/4,3/4,1,1/2,3/4,3/4,3/4,3/4,1],
  Stone: [0,1/2,0,1/4,1/4,1/2,0,1/4,1/4,1/4,1/4,1/2],
  Water: [1/4,1/2,1/4,1/4,1/2,1/2,1/4,1/4,1/2,1/4,1/2,1/2],
  WoodTop: [1/4,3/4,1/4,1/2,1/2,3/4,1/4,1/2,1/2,1/2,1/2,3/4],
  WoodSide: [1/2,3/4,1/2,1/2,3/4,3/4,1/2,1/2,3/4,1/2,3/4,3/4],
  Leaves: [0,3/4,0,1/2,1/4,3/4,0,1/2,1/4,1/2,1/4,3/4],
  Planks: [1/2,1/2,1/2,1/4,3/4,1/2,1/2,1/4,3/4,1/4,3/4,1/2],
  JumpPad: [0,1/4,0,0,1/4,1/4,0,0,1/4,0,1/4,1/4],

}

var Blocks = {
  //[px,nx,pz,nz,py,ny]
  Grass: [Faces.GrassSide,Faces.GrassSide,Faces.GrassSide,Faces.GrassSide,Faces.GrassTop,Faces.Dirt],
  Dirt: Faces.Dirt,
  Stone: Faces.Stone,
  Water: Faces.Water,
  Wood: [Faces.WoodSide,Faces.WoodSide,Faces.WoodSide,Faces.WoodSide,Faces.WoodTop,Faces.WoodTop],
  Leaves: Faces.Leaves,
  Planks: Faces.Planks,
  JumpPad: Faces.JumpPad,
  DeathCube: Faces.Dirt,

}

var BlockIndex = [null,Blocks.Grass,Blocks.Dirt,Blocks.Stone,Blocks.Water,Blocks.Wood,Blocks.Leaves,Blocks.Planks,Blocks.JumpPad,Blocks.DeathCube];

var World = {

  tex: new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/ZWubs/Dump/master/UV3.png' ),
  mat: null,
  geo: new THREE.Geometry(),
  mesh: null,
  matrix: new THREE.Matrix4(),

  side: {
    px: [0,Math.PI/2,0],
    nx: [0,-Math.PI/2,0],
    py: [-Math.PI/2,-Math.PI/2,0],
    ny: [Math.PI/2,Math.PI/2,0],
    pz: [0,0,0],
    nz: [Math.PI,0,Math.PI],
  },

  init: function() {

    for (var i in this.side) {

      var r = this.side[i];
      this.side[i] = new THREE.PlaneGeometry(1,1);
      this.side[i].applyMatrix(new THREE.Matrix4().makeTranslation(0,0,.5));

      this.side[i].rotateX(r[0])
      this.side[i].rotateY(r[1])
      this.side[i].rotateZ(r[2])

    }

    this.tex.magFilter = THREE.NearestFilter;
    this.tex.minFilter = THREE.LinearMipMapLinearFilter;

    this.gen();

    this.mat = new THREE.MeshStandardMaterial( { map: this.tex, transparent: true, roughness: 1, vertexColors: THREE.VertexColors } );

    this.mesh = new THREE.Mesh( this.geo, this.mat );

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    
    this.mesh.position.x = Map.origin[0];
    this.mesh.position.y = Map.origin[1];
    this.mesh.position.z = Map.origin[2];

    scene.add( this.mesh );

  },

  
  gen: function() {

    for(var y = 0; y < Map.val.length; y++) {

      for(var z = 0; z < Map.val[y].length; z++) {

        for(var x = 0; x < Map.val[y][z].length; x++) {
          
          if(Map.val[y][x][z] != 0) {

            var A = BlockIndex[Map.val[y][x][z]]
            if(!Array.isArray(A[0])) { A = [A,A,A,A,A,A] }

            this.matrix.makeTranslation(x,y,z);

            if((x+1 in Map.val[y] && Map.val[y][x+1][z] == 0)) {

              this.side.px.faceVertexUvs[0][0][0].set(A[0][0],A[0][1]);
              this.side.px.faceVertexUvs[0][0][1].set(A[0][2],A[0][3]);
              this.side.px.faceVertexUvs[0][0][2].set(A[0][4],A[0][5]);

              this.side.px.faceVertexUvs[0][1][0].set(A[0][6],A[0][7]);
              this.side.px.faceVertexUvs[0][1][1].set(A[0][8],A[0][9]);
              this.side.px.faceVertexUvs[0][1][2].set(A[0][10],A[0][11]);

              this.side.px.faces[0].vertexColors = [light,shadow,light];
              this.side.px.faces[1].vertexColors = [shadow,shadow,light];

              this.geo.merge( this.side.px, this.matrix );

            }

            if((x-1 in Map.val[y] && Map.val[y][x-1][z] == 0)) {

              this.side.nx.faceVertexUvs[0][0][0].set(A[1][0],A[1][1]);
              this.side.nx.faceVertexUvs[0][0][1].set(A[1][2],A[1][3]);
              this.side.nx.faceVertexUvs[0][0][2].set(A[1][4],A[1][5]);

              this.side.nx.faceVertexUvs[0][1][0].set(A[1][6],A[1][7]);
              this.side.nx.faceVertexUvs[0][1][1].set(A[1][8],A[1][9]);
              this.side.nx.faceVertexUvs[0][1][2].set(A[1][10],A[1][11]);

              this.side.nx.faces[0].vertexColors = [light,shadow,light];
              this.side.nx.faces[1].vertexColors = [shadow,shadow,light];

              this.geo.merge( this.side.nx, this.matrix );

            }

            if(!(y+1 in Map.val) || (y+1 in Map.val && Map.val[y+1][x][z] == 0)) {

              this.side.py.faceVertexUvs[0][0][0].set(A[4][0],A[4][1]);
              this.side.py.faceVertexUvs[0][0][1].set(A[4][2],A[4][3]);
              this.side.py.faceVertexUvs[0][0][2].set(A[4][4],A[4][5]);

              this.side.py.faceVertexUvs[0][1][0].set(A[4][6],A[4][7]);
              this.side.py.faceVertexUvs[0][1][1].set(A[4][8],A[4][9]);
              this.side.py.faceVertexUvs[0][1][2].set(A[4][10],A[4][11]);

              this.side.py.faces[0].vertexColors = [light,light,light];
              this.side.py.faces[1].vertexColors = [light,light,light];

              if (y+1 in Map.val && x+1 in Map.val[y]) {
                if(Map.val[y+1][x+1][z] != 0) {
                  this.side.py.faces[0].vertexColors[0] = shadow;
                  this.side.py.faces[0].vertexColors[2] = shadow;
                  this.side.py.faces[1].vertexColors[2] = shadow;
                }
              }
              if (y+1 in Map.val && x-1 in Map.val[y]) {
                if(Map.val[y+1][x-1][z] != 0) {
                  this.side.py.faces[0].vertexColors[1] = shadow;
                  this.side.py.faces[1].vertexColors[0] = shadow;
                  this.side.py.faces[1].vertexColors[1] = shadow;
                }
              }
              if (y+1 in Map.val && z+1 in Map.val[y][x]) {
                if(Map.val[y+1][x][z+1] != 0) {
                  this.side.py.faces[0].vertexColors[2] = shadow;
                  this.side.py.faces[1].vertexColors[1] = shadow;
                  this.side.py.faces[1].vertexColors[2] = shadow;
                }
              }
              if (y+1 in Map.val && z-1 in Map.val[y][x]) {
                if(Map.val[y+1][x][z-1] != 0) {
                  this.side.py.faces[0].vertexColors[0] = shadow;
                  this.side.py.faces[0].vertexColors[1] = shadow;
                  this.side.py.faces[1].vertexColors[0] = shadow;
                }
              }
              if (y+1 in Map.val && x+1 in Map.val[y] && z+1 in Map.val[y][x]) {
                if(Map.val[y+1][x+1][z+1] != 0 && Map.val[y+1][x+1][z] == 0 && Map.val[y+1][x][z+1] == 0) {
                  this.side.py.faces[0].vertexColors[2] = shadow;
                  this.side.py.faces[1].vertexColors[2] = shadow;
                }
              }
              if (y+1 in Map.val && x+1 in Map.val[y] && z-1 in Map.val[y][x]) {
                if(Map.val[y+1][x+1][z-1] != 0 && Map.val[y+1][x+1][z] == 0 && Map.val[y+1][x][z-1] == 0) {
                  this.side.py.faces[0].vertexColors[0] = shadow;
                }
              }
              if (y+1 in Map.val && x-1 in Map.val[y] && z+1 in Map.val[y][x]) {
                if(Map.val[y+1][x-1][z+1] != 0 && Map.val[y+1][x-1][z] == 0 && Map.val[y+1][x][z+1] == 0) {
                  this.side.py.faces[1].vertexColors[1] = shadow;
                }
              }
              if (y+1 in Map.val && x-1 in Map.val[y] && z-1 in Map.val[y][x]) {
                if(Map.val[y+1][x-1][z-1] != 0 && Map.val[y+1][x-1][z] == 0 && Map.val[y+1][x][z-1] == 0) {
                  this.side.py.faces[0].vertexColors[1] = shadow;
                  this.side.py.faces[1].vertexColors[0] = shadow;
                }
              }


              this.geo.merge( this.side.py, this.matrix );

            }

            if((y-1 in Map.val && Map.val[y-1][x][z] == 0)) {

              this.side.ny.faceVertexUvs[0][0][0].set(A[5][0],A[5][1]);
              this.side.ny.faceVertexUvs[0][0][1].set(A[5][2],A[5][3]);
              this.side.ny.faceVertexUvs[0][0][2].set(A[5][4],A[5][5]);

              this.side.ny.faceVertexUvs[0][1][0].set(A[5][6],A[5][7]);
              this.side.ny.faceVertexUvs[0][1][1].set(A[5][8],A[5][9]);
              this.side.ny.faceVertexUvs[0][1][2].set(A[5][10],A[5][11]);

              this.side.pz.faces[0].vertexColors = [shadow,shadow,shadow];
              this.side.pz.faces[1].vertexColors = [shadow,shadow,shadow];

              this.geo.merge( this.side.ny, this.matrix );

            }

            if((z+1 in Map.val[y][x] && Map.val[y][x][z+1] == 0)) {

              this.side.pz.faceVertexUvs[0][0][0].set(A[2][0],A[2][1]);
              this.side.pz.faceVertexUvs[0][0][1].set(A[2][2],A[2][3]);
              this.side.pz.faceVertexUvs[0][0][2].set(A[2][4],A[2][5]);

              this.side.pz.faceVertexUvs[0][1][0].set(A[2][6],A[2][7]);
              this.side.pz.faceVertexUvs[0][1][1].set(A[2][8],A[2][9]);
              this.side.pz.faceVertexUvs[0][1][2].set(A[2][10],A[2][11]);

              this.side.pz.faces[0].vertexColors = [light,shadow,light];
              this.side.pz.faces[1].vertexColors = [shadow,shadow,light];

              this.geo.merge( this.side.pz, this.matrix );

            }

            if((z-1 in Map.val[y][x] && Map.val[y][x][z-1] == 0)) {

              this.side.nz.faceVertexUvs[0][0][0].set(A[3][0],A[3][1]);
              this.side.nz.faceVertexUvs[0][0][1].set(A[3][2],A[3][3]);
              this.side.nz.faceVertexUvs[0][0][2].set(A[3][4],A[3][5]);

              this.side.nz.faceVertexUvs[0][1][0].set(A[3][6],A[3][7]);
              this.side.nz.faceVertexUvs[0][1][1].set(A[3][8],A[3][9]);
              this.side.nz.faceVertexUvs[0][1][2].set(A[3][10],A[3][11]);

              this.side.nz.faces[0].vertexColors = [light,shadow,light];
              this.side.nz.faces[1].vertexColors = [shadow,shadow,light];

              this.geo.merge( this.side.nz, this.matrix );

            }
          }
        }
      }
    }
  }
}


function UVCalc(X,Y) { return [X/16,(16-Y)/16,X/16,(15-Y)/16,(X+1)/16,(16-Y)/16,X/16,(15-Y)/16,(X+1)/16,(15-Y)/16,(X+1)/16,(16-Y)/16]; }

var Side = {

  RedBack: UVCalc(0,0),
  RedFront: UVCalc(0,1),

  BlueBack: UVCalc(1,0),
  BlueFront: UVCalc(1,1),

  YellowBack: UVCalc(2,0),
  YellowFront: UVCalc(2,1),

  GreenBack: UVCalc(3,0),
  GreenFront: UVCalc(3,1),

  OrangeBack: UVCalc(5,0),
  OrangeFront: UVCalc(5,1),

  PurpleBack: UVCalc(4,0),
  PurpleFront: UVCalc(4,1),

  PinkBack: UVCalc(6,0),
  PinkFront: UVCalc(6,1),

  SkyBack: UVCalc(7,0),
  SkyFront: UVCalc(7,1),

  WhiteBack: UVCalc(8,0),
  WhiteFront: UVCalc(8,1),

  BlackBack: UVCalc(9,0),
  BlackFront: UVCalc(9,1),

  BoxTop: UVCalc(13,3),
  BoxFront: UVCalc(13,4),
  BoxBack: UVCalc(13,5),

  ZombieFront: UVCalc(13,14),
  ZombieBack: UVCalc(15,14),
  ZombieRight: UVCalc(12,14),
  ZombieLeft: UVCalc(14,14),
  ZombieTop: UVCalc(13,13),
  ZombieBottom: UVCalc(13,15),

  SpiderBack: UVCalc(14,10),
  SpiderFront: UVCalc(14,11),
  SpiderRight: UVCalc(13,11),
  SpiderLeft: UVCalc(15,11),
  
  RubikFront: UVCalc(4,10),
  RubikBack: UVCalc(6,10),
  RubikRight: UVCalc(3,10),
  RubikLeft: UVCalc(5,10),
  RubikTop: UVCalc(4,9),
  RubikBottom: UVCalc(4,11),

  GhostBack: UVCalc(15,3),
  GhostFront: UVCalc(15,4),

  FlagBack: UVCalc(11,0),
  FlagFront: UVCalc(11,1),

  SlimeBack: UVCalc(12,0),
  SlimeFront: UVCalc(12,1),

  CuteBack: UVCalc(13,0),
  CuteFront: UVCalc(13,1),

  CheckBack: UVCalc(14,0),
  CheckFront: UVCalc(14,1),

  CompanionBack: UVCalc(11,3),
  CompanionFront: UVCalc(11,4),

  KirbyBack: UVCalc(12,3),
  KirbyFront: UVCalc(12,4),
  
  IceBack: UVCalc(14,3),
	IceFront: UVCalc(14,4),

  Grass: UVCalc(7,3),
  GrassFront: UVCalc(7,4),
  GrassBack: UVCalc(8,4),
  Dirt: UVCalc(7,5),
  DirtFront: UVCalc(8,5),

  WoodTop: UVCalc(9,3),
  WoodFront: UVCalc(9,4),
  WoodSide: UVCalc(10,4),

}

var Skins = {

  //Red,Blue,Yellow,Green,Orange,Purple,Pink,Sky,White,Black

  //Testing [Left,Right,Top,Bottom,Front,Back]
  Red: [Side.RedBack,Side.RedBack,Side.RedBack,Side.RedBack,Side.RedFront,Side.RedBack],
  Blue: [Side.BlueBack,Side.BlueBack,Side.BlueBack,Side.BlueBack,Side.BlueFront,Side.BlueBack],
  Yellow: [Side.YellowBack,Side.YellowBack,Side.YellowBack,Side.YellowBack,Side.YellowFront,Side.YellowBack],
  Green: [Side.GreenBack,Side.GreenBack,Side.GreenBack,Side.GreenBack,Side.GreenFront,Side.GreenBack],
  Purple: [Side.PurpleBack,Side.PurpleBack,Side.PurpleBack,Side.PurpleBack,Side.PurpleFront,Side.PurpleBack],
  Orange: [Side.OrangeBack,Side.OrangeBack,Side.OrangeBack,Side.OrangeBack,Side.OrangeFront,Side.OrangeBack],
  Pink: [Side.PinkBack,Side.PinkBack,Side.PinkBack,Side.PinkBack,Side.PinkFront,Side.PinkBack],
  Sky: [Side.SkyBack,Side.SkyBack,Side.SkyBack,Side.SkyBack,Side.SkyFront,Side.SkyBack],
  White: [Side.WhiteBack,Side.WhiteBack,Side.WhiteBack,Side.WhiteBack,Side.WhiteFront,Side.WhiteBack],
  Black: [Side.BlackBack,Side.BlackBack,Side.BlackBack,Side.BlackBack,Side.BlackFront,Side.BlackBack],

  Box: [Side.BoxBack,Side.BoxBack,Side.BoxTop,Side.BoxBack,Side.BoxFront,Side.BoxBack],
  Flag: [Side.FlagBack,Side.FlagBack,Side.FlagBack,Side.FlagBack,Side.FlagFront,Side.FlagBack],
  Slime: [Side.SlimeBack,Side.SlimeBack,Side.SlimeBack,Side.SlimeBack,Side.SlimeFront,Side.SlimeBack],
  Cute: [Side.CuteBack,Side.CuteBack,Side.CuteBack,Side.CuteBack,Side.CuteFront,Side.CuteBack],
  Companion: [Side.CompanionBack,Side.CompanionBack,Side.CompanionBack,Side.CompanionBack,Side.CompanionFront,Side.CompanionBack],
  Kirby: [Side.KirbyBack,Side.KirbyBack,Side.KirbyBack,Side.KirbyBack,Side.KirbyFront,Side.KirbyBack],

  Zombie: [Side.ZombieLeft,Side.ZombieRight,Side.ZombieTop,Side.ZombieBottom,Side.ZombieFront,Side.ZombieBack],
  Spider: [Side.SpiderLeft,Side.SpiderRight,Side.SpiderBack,Side.SpiderBack,Side.SpiderFront,Side.SpiderBack],
  Ghost: [Side.GhostBack,Side.GhostBack,Side.GhostBack,Side.GhostBack,Side.GhostFront,Side.GhostBack],
  Ice: [Side.IceBack,Side.IceBack,Side.IceBack,Side.IceBack,Side.IceFront,Side.IceBack],
  
  Rubik: [Side.RubikLeft,Side.RubikRight,Side.RubikTop,Side.RubikBottom,Side.RubikFront,Side.RubikBack],
  Check: [Side.CheckBack,Side.CheckBack,Side.CheckBack,Side.CheckBack,Side.CheckFront,Side.CheckBack],

  Grass: [Side.GrassBack,Side.GrassBack,Side.Grass,Side.Dirt,Side.GrassFront,Side.GrassBack],
  Dirt: [Side.Dirt,Side.Dirt,Side.Dirt,Side.Dirt,Side.DirtFront,Side.Dirt],
  Wood: [Side.WoodSide,Side.WoodSide,Side.WoodTop,Side.WoodTop,Side.WoodFront,Side.WoodSide],

}

//Create Local Player Variable
var Player = {

  pos: [0,0,0],
  rot: [0,0,0],
  vel: [0,0,0],
  rev: [0,0,0],
  dim: [0,0,0],

  geo: null,
  mat: Mat.Player,
  mesh: null,

  name: "Player",
  skin: "Red",

  tag: null,
  grd: false, //Grounded
  spd: 1.5,
  col: true, //Collision
  liv: true,
  
  bulletcollision: true,

  init: function() {
    
    Perspec(0);
    
    this.pos[1] = Map.getY(this.pos[0]-Map.origin[0],this.pos[2]-Map.origin[2])-21;
    
    this.geo = new THREE.BoxGeometry(.5, .5, .5);
    this.dim = [this.geo.parameters.width,this.geo.parameters.height,this.geo.parameters.depth];
    for(var i = 0; i < this.geo.faceVertexUvs[0].length/2; i++) {
			
			var A = Skins[this.skin][i];
			
			this.geo.faceVertexUvs[0][i*2][0].set(A[0],A[1]);
			this.geo.faceVertexUvs[0][i*2][1].set(A[2],A[3]);
			this.geo.faceVertexUvs[0][i*2][2].set(A[4],A[5]);
			
			this.geo.faceVertexUvs[0][i*2+1][0].set(A[6],A[7]);
			this.geo.faceVertexUvs[0][i*2+1][1].set(A[8],A[9]);
			this.geo.faceVertexUvs[0][i*2+1][2].set(A[10],A[11]);
			
		}
    
    this.mesh = new THREE.Mesh( this.geo, this.mat  )

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    scene.add(this.mesh);
    
    this.tag = NameTag(this.name)
    scene.add( this.tag );
    
    socket.emit('new-player',{name:this.name,skin:this.skin,pos:[0,0,0],rot:[0,0,0]});

    this.update();

  },

  update: function() {
    
    this.pos[0] += this.vel[0]*delta;
    this.pos[1] += this.vel[1]*delta;
    this.pos[2] += this.vel[2]*delta;
    
    this.collision();
    
    this.rot[0] += this.rev[0];
    this.rot[1] += this.rev[1];
    this.rot[2] += this.rev[2];

    this.mesh.position.x = this.pos[0];
    this.mesh.position.y = this.pos[1];
    this.mesh.position.z = this.pos[2];

    this.mesh.rotation.x = this.rot[0];
    this.mesh.rotation.y = this.rot[1];
    this.mesh.rotation.z = this.rot[2];

    this.tag.position.x = this.pos[0];
    this.tag.position.y = this.pos[1]+.5;
    this.tag.position.z = this.pos[2];
    
    if(connect) {
      socket.emit('move-player',{name:this.name,skin:this.skin,pos:[Math.round(this.pos[0]*100)/100,Math.round(this.pos[1]*100)/100,Math.round(this.pos[2]*100)/100],rot:[Math.round(this.rot[0]*100)/100,Math.round(this.rot[1]*100)/100,Math.round(this.rot[2]*100)/100]});
    }
    
    if(perspective == 0) { //Obrit Player
      controls.target = Player.mesh.position;
      controls.update();
      camera.position.y = this.pos[1]+2;
    }
    else if(perspective == 1) { //First Person
      camera.position.set( this.pos[0], this.pos[1]+.25, this.pos[2])
      camera.rotation.set( this.rot[0], this.rot[1]-Math.PI, this.rot[2] )
    }
    else if(perspective == 2) { //Third Person
      camera.position.set( this.pos[0]-3*Math.sin(this.rot[1]), this.pos[1]+1, this.pos[2]-3*Math.cos(this.rot[1]) )
      camera.lookAt( this.mesh.position );
    }

  },

  move: function() {

    if(Input.state[87]) { // W
      this.pos[0] += .0625*Math.sin(this.rot[1])*delta*this.spd
      this.pos[2] += .0625*Math.cos(this.rot[1])*delta*this.spd
    }
    else if(Input.state[83]) { // S
      this.pos[0] -= .0625*Math.sin(this.rot[1])*delta*this.spd
      this.pos[2] -= .0625*Math.cos(this.rot[1])*delta*this.spd
    }

    if(Input.state[65]) {this.rot[1] += .05*delta} // A
    else if(Input.state[68]) {this.rot[1] -= .05*delta} // D
    
    if(Input.state[32] && this.grd) {this.vel[1] = .15; this.grd = false} // Space
    if(Input.state[75] && connect) { socket.emit("new-bullet",[this.pos,this.rot]) }

    this.update();

  },
  
  collision: function() {

    var x = Math.round(this.pos[0]-Map.origin[0]),
      y = Math.round(this.pos[1]-Map.origin[1]),
      z = Math.round(this.pos[2]-Map.origin[2]);

    var px = Math.round(this.pos[0]-Map.origin[0]+.251),
      py = Math.round(this.pos[1]-Map.origin[1]+.251),
      pz = Math.round(this.pos[2]-Map.origin[2]+.251),
      nx = Math.round(this.pos[0]-Map.origin[0]-.251),
      ny = Math.round(this.pos[1]-Map.origin[1]-.251),
      nz = Math.round(this.pos[2]-Map.origin[2]-.251);

    var A = [0,0,0,0,0,0,0] //[Down,Up,Front,Back,Left,Right,Inside]
    
    if (this.col && y in Map.val && x in Map.val[y] && z in Map.val[y][x]) {

      if(ny in Map.val) { A[0] =  Map.val[ny][x][z]}
      if(py in Map.val) { A[1] = Map.val[py][x][z]}

      if(nx in Map.val[y]) { A[3] =  Map.val[y][nx][z]}
      if(px in Map.val[y]) { A[2] = Map.val[y][px][z]}

      if(nz in Map.val[y][x]) { A[4] =  Map.val[y][x][nz]}
      if(pz in Map.val[y][x]) { A[5] = Map.val[y][x][pz]}

      A[6] = Map.val[y][x][z]

    }
    
    
    if (px == 0 && x == -1) { A[2] = 1 }
    else if (nx == Map.dim[0]-1 && x == Map.dim[0]) { A[3] = 1 }

    if (pz == 0 && z == -1) { A[5] = 1 }
    else if (nz == Map.dim[2]-1 && z == Map.dim[0]) { A[4] = 1 }
    
    if (A[0] == 0 && this.vel[1] > -.5) { this.vel[1] -= 0.01*delta; this.grd = false}
    else if (A[0] != 0 && !this.grd && A[0] != 9) {

      this.grd = true;
      this.bulletcollision = true;
      this.pos[1] = Math.round(this.pos[1]) - .25;
      this.vel[0] = this.vel[1] = this.vel[2] = 0;

    }
    
    if (A[1] != 0) { this.pos[1] = Math.round(this.pos[1])+this.dim[1]/2-.01; this.vel[1] = 0} //Block Above

    if (A[2] != 0) { this.pos[0] = Math.round(this.pos[0])+this.dim[0]/2-.01; }
    else if (A[3] != 0) { this.pos[0] = Math.round(this.pos[0])-this.dim[0]/2+.01;}

    if (A[4] != 0) { this.pos[2] = Math.round(this.pos[2])-this.dim[2]/2+.01;}
    else if (A[5] != 0) { this.pos[2] = Math.round(this.pos[2])+this.dim[2]/2-.01;}
    
    if (A[6] != 0) {this.pos[1] = Math.round(this.pos[1])+this.dim[1]*1.5; this.vel[1] = 0} //Player Inside Block
    
    if (A[0] == 8) {
	      
      this.vel[1] = .35;

      this.vel[0] = .0625*Math.sin(this.rot[1])*this.spd
      this.vel[2] = .0625*Math.cos(this.rot[1])*this.spd

      var S = document.createElement("AUDIO");
      S.src = "https://cdn.glitch.com/36eb297f-63f5-48da-9b63-9c73fa4c5ac7%2FJumpPad.wav?1519272019907";
      S.volume = 1;
      S.play();
	    
	  }
    
    else if (A[0] == 9) {
      
      document.getElementById("gameover").innerHTML = "GET DUNKED ON!!!";
      
      this.vel[1] = 1;
      this.vel[0] = .0625*Math.cos(this.rot[1])*this.spd*10;
      this.vel[2] = -.0625*Math.sin(this.rot[1])*this.spd*10;
      
      this.rev = [Math.PI/10,0,.226];
      
      this.col = false;
      
      var S = document.createElement("AUDIO");
      S.src = "https://cdn.glitch.com/36eb297f-63f5-48da-9b63-9c73fa4c5ac7%2FHEYEAYEA.mp3?1518714047613";
      S.volume = 1;
      S.play();
    
    }

    if (this.pos[1] <= -50) { this.kill(); } //Death Plane

  },

  kill: function() {
    
    controls.enabled = false;
    document.getElementById("kill").style.visibility = "visible";
    document.getElementById("kill").style.opacity = "1";
    
    this.liv = false;

    //Stop Animation
    cancelAnimationFrame(AnimFrm);
    
  },
  
  respawn: function() {
    
    if(!Player.liv) {
      controls.enabled = true;
      document.getElementById("kill").style.visibility = "hidden";
      document.getElementById("kill").style.opacity = "0";

      AnimFrm = requestAnimationFrame(GameLoop);

      Player.pos = [0,0,0]
      this.pos[1] = Map.getY(this.pos[0]-Map.origin[0],this.pos[2]-Map.origin[2])-21;
      this.vel = [0,0,0];
      this.rot = [0,0,0];
      this.rev = [0,0,0];
      this.col = true;
      this.spd = 1.5;
      this.liv = true;
    }
  },
  
  changecolor: function(A,B) {

    this.skin = A;

    document.getElementById("colorbar").style.backgroundColor = B;

  }
}

var Ball = {

  src: "https://raw.githubusercontent.com/ZWubs/Dump/master/Ball.png",
  tex: null,
  mat: null,
  geo: new THREE.SphereGeometry( .5, 8, 8 ),
  mesh: null,

  pos: [0,0,0], //Position
  dim: [0,0,0],
  grd: false,

  init: function() {

    this.tex = new THREE.TextureLoader().load(this.src);
    this.tex.magFilter = THREE.NearestFilter;
    this.tex.minFilter = THREE.LinearFilter;

    this.mat = new THREE.MeshStandardMaterial({map: this.tex, roughness: 1});

    this.dim = [this.geo.parameters.radius*2,this.geo.parameters.radius*2,this.geo.parameters.radius*2];

    this.mesh = new THREE.Mesh( this.geo, this.mat  )

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    scene.add(this.mesh);

    this.update();

  },

  update: function() {
    
    this.mesh.position.x = this.pos[0];
    this.mesh.position.y = this.pos[1];
    this.mesh.position.z = this.pos[2];

    this.mesh.rotation.x = this.pos[2]/(this.dim[2]/2)
    this.mesh.rotation.z = -this.pos[0]/(this.dim[0]/2)

  },
}

socket.on('update-ball',function(A){
  
  Ball.pos = [A[0]/64,A[1]/64,A[2]/64];
  
  if(Ball.mesh) { Ball.update(); intersect(Player,Ball) }

});

function intersect(a, b) {
    if((a.pos[0]-a.dim[0]/2 <= b.pos[0]+b.dim[0]/2 && a.pos[0]+a.dim[0]/2 >= b.pos[0]-b.dim[0]/2) && (a.pos[1]-a.dim[1]/2 <= b.pos[1]+b.dim[1]/2 && a.pos[1]+a.dim[1]/2 >= b.pos[1]-b.dim[1]/2) && (a.pos[2]-a.dim[2]/2 <= b.pos[2]+b.dim[2]/2 && a.pos[2]+a.dim[2]/2 >= b.pos[2]-b.dim[2]/2)) {
      
      socket.emit('ball-hit',[(b.pos[0]-a.pos[0])/8,(b.pos[1]-a.pos[1])/2,(b.pos[2]-a.pos[2])/8]);

    }
}

var Sound = {

  src: "https://cdn.glitch.com/36eb297f-63f5-48da-9b63-9c73fa4c5ac7%2FNeverGonnaGiveYouUp.wav?1518713397299",
  //https://cdn.glitch.com/36eb297f-63f5-48da-9b63-9c73fa4c5ac7%2FMii%20Channel%20Remix.mp3?1519434209595
  //https://cdn.glitch.com/36eb297f-63f5-48da-9b63-9c73fa4c5ac7%2FHEYEAYEA.mp3?1518714047613
  //https://cdn.glitch.com/36eb297f-63f5-48da-9b63-9c73fa4c5ac7%2FNeverGonnaGiveYouUp.wav?1518713397299
  //http://66.90.93.122/ost/mii-channel/vtttzfpf/002%20-%20Kazumi%20Totaka%20-%20Mii%20Plaza.mp3
  obj: null,

  pos: [0,0,0],
  rad: 16, //Sound Radius
  loop: true,

  init: function() {

    this.obj = document.createElement("AUDIO");
    this.obj.src = this.src
    this.obj.volume = 0;
    this.obj.loop = this.loop;

  },

  dist: function(A,B) {

    var dx = B.pos[0]-A.pos[0];
    var dy = B.pos[1]-A.pos[1];
    var dz = B.pos[2]-A.pos[2];
    var dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
    //this.obj.volume = Math.exp((-(dist*dist))/10);
    if (dist < this.rad) { this.obj.volume = Math.floor(100*(-Math.abs(dist/this.rad)+1))/100; this.play(); }
    else { this.pause(); }
  },

  play: function() { if(this.obj.paused) { this.obj.play(); }},
  pause: function() { if(!this.obj.paused) { this.obj.pause(); }},

}

Sound.init();

scene.add(new THREE.AmbientLight(0xffffff,1.75));
var directionalLight = new THREE.DirectionalLight( 0xffffff, .75 );
directionalLight.castShadow = true;
directionalLight.shadow.camera = new THREE.OrthographicCamera( -16, 16, 16, -16, 0.5, 64 );
directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
directionalLight.position.set(64,64,32);
scene.add( directionalLight );

//Name Tag Creation Function
function NameTag(msg) {
				
  var ctx = document.createElement('canvas').getContext('2d');
  
  if (msg.toUpperCase() == "COMICSANS") { ctx.font = "64px Comic Sans MS"}
  else if (msg.toUpperCase() == "WINGDINGS") {ctx.font = "64px Wingdings";}
  else {ctx.font = "64px Arial";}

  ctx.canvas.width = ctx.measureText(msg).width+50;
  ctx.canvas.height = 64;

  if (msg.toUpperCase() == "COMICSANS") { ctx.font = "Bold 64px Comic Sans MS"}
  else if (msg.toUpperCase() == "WINGDINGS") {ctx.font = "Bold 64px Wingdings";}
  else { ctx.font = "Bold 64px Arial"; }

  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)

  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(msg, ctx.canvas.width/2, ctx.canvas.height/2);

  // canvas contents will be used for a texture
  var texture = new THREE.Texture(ctx.canvas)
  texture.needsUpdate = true;
  var spriteMaterial = new THREE.SpriteMaterial({ map: texture, useScreenCoordinates: false });
  var sprite = new THREE.Sprite( spriteMaterial );
  sprite.scale.set(ctx.canvas.width/400,.15,0);

  return sprite;
  
}

socket.on('playerdata',function(A){
   console.log(A);
});


//Mulitplayer Logic
var Players = {}
socket.on('update-players',function(data){
  
  for (var i in data) {
    if(i != socket.id) {
      
      if(!Players[i]) {
        
        Players[i] = data[i]
  
        Players[i].tag = NameTag(Players[i].name);
        
        Players[i].mat = Mat.Player;
        Players[i].geo = new THREE.BoxGeometry(.5, .5, .5);
        
        for(var j = 0; j < Players[i].geo.faceVertexUvs[0].length/2; j++) {

          var A = Skins[Players[i].skin][j];

          Players[i].geo.faceVertexUvs[0][j*2][0].set(A[0],A[1]);
          Players[i].geo.faceVertexUvs[0][j*2][1].set(A[2],A[3]);
          Players[i].geo.faceVertexUvs[0][j*2][2].set(A[4],A[5]);

          Players[i].geo.faceVertexUvs[0][j*2+1][0].set(A[6],A[7]);
          Players[i].geo.faceVertexUvs[0][j*2+1][1].set(A[8],A[9]);
          Players[i].geo.faceVertexUvs[0][j*2+1][2].set(A[10],A[11]);

        }
        
        Players[i].mesh = new THREE.Mesh( Players[i].geo, Players[i].mat)
        Players[i].mesh.name = i;
        Players[i].mesh.castShadow = true;
        Players[i].mesh.receiveShadow = true;
        

        Players[i].tag.name = i+"A";

        scene.add(Players[i].mesh);
        scene.add(Players[i].tag);

      }
      


      Players[i].mesh.position.x = data[i].pos[0];
      Players[i].mesh.position.y = data[i].pos[1];
      Players[i].mesh.position.z = data[i].pos[2];

      Players[i].mesh.rotation.x = data[i].rot[0];
      Players[i].mesh.rotation.y = data[i].rot[1];
      Players[i].mesh.rotation.z = data[i].rot[2];

      Players[i].tag.position.x = data[i].pos[0];
      Players[i].tag.position.y = data[i].pos[1]+.5;
      Players[i].tag.position.z = data[i].pos[2];

    }
  }
});

/*
	*	The Tileset class
	*/
	class Tileset {
		constructor(A) {
			
			if(A) { this.setValues(A); }
			
			if(!this.src) { this.src = "https://raw.githubusercontent.com/ZWubs/Dump/master/Unknown.png";}
			this.tex = new THREE.TextureLoader().load(this.src);
			this.tex.magFilter = THREE.NearestFilter; this.tex.minFilter = THREE.LinearFilter;
			
			this.mat = new THREE.MeshStandardMaterial({map: this.tex,roughness: 1,transparent: true});
			
			this.dim = [this.tex.image.width,this.tex.image.height];
			
		}
		
		UVCalc(X,Y,W,H) {
			
			return [X/this.dim[0],(this.dim[1]-Y)/this.dim[1],X/this.dim[0],(this.dim[1]-H-Y)/this.dim[1],(X+W)/this.dim[0],(this.dim[1]-Y)/this.dim[1],X/this.dim[0],(this.dim[1]-H-Y)/this.dim[1],(X+W)/this.dim[0],(this.dim[1]-H-Y)/this.dim[1],(X+W)/this.dim[0],(this.dim[1]-Y)/this.dim[1]];
			
		}
		
		setValues(A) { for(var i in A) { this[i] = A[i]; } }
		
	}

	var BTS = new Tileset({src:"https://raw.githubusercontent.com/ZWubs/Dump/master/Bullets.png"})

	var BTex = {

		RedEnd: BTS.UVCalc(0,0,3,3),
		RedSide: BTS.UVCalc(0,2,3,6),
    
	}

	var BulletSkins = {

		//Testing [Left,Right,Front,Back,Bottom,Top]
		Red: [BTex.RedSide,BTex.RedSide,BTex.RedEnd,BTex.RedEnd,BTex.RedSide,BTex.RedSide],

	}

class Bullet {
  constructor(A,B,C) {

    this.pos = [A[0],A[1],A[2]];
    this.rot = [B[0],B[1],B[2]];

    this.mat = BTS.mat;
    this.skin = BulletSkins.Red;
    this.geo = Geo.Bullet;
    
    for(var i = 0; i < this.geo.faceVertexUvs[0].length/2; i++) {
			
				var A = this.skin[i];
				
				this.geo.faceVertexUvs[0][i*2][0].set(A[0],A[1]);
				this.geo.faceVertexUvs[0][i*2][1].set(A[2],A[3]);
				this.geo.faceVertexUvs[0][i*2][2].set(A[4],A[5]);
				
				this.geo.faceVertexUvs[0][i*2+1][0].set(A[6],A[7]);
				this.geo.faceVertexUvs[0][i*2+1][1].set(A[8],A[9]);
				this.geo.faceVertexUvs[0][i*2+1][2].set(A[10],A[11]);
				
			}
    
    this.mesh = new THREE.Mesh(this.geo,this.mat);

    this.mesh.rotation.y = this.rot[1];

  }

  Update() {
    
    this.mesh.position.x = this.pos[0];
    this.mesh.position.y = this.pos[1];
    this.mesh.position.z = this.pos[2];

  }

  Add() { scene.add(this.mesh) }
  Remove() { scene.remove(this.mesh) }

}

var Bullets = [];
socket.on('update-bullets',function(data){

  for (var i in data) {
    if (i in data) {
      if(!(i in Bullets)) {
        Bullets[i] = new Bullet(data[i].pos,data[i].rot);
        Bullets[i].Add();
      }
      else {
        if(i != socket.id && Player.bulletcollision) {
          var A = Player
          var B = Bullets[i]
          var dx = B.pos[0]-A.pos[0];
          var dy = B.pos[1]-A.pos[1];
          var dz = B.pos[2]-A.pos[2];
          var dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
          if(dist <= .35) {
            Player.vel[0] = -(dx)/2
			      Player.vel[2] = -(dz)/2
            Player.vel[1] = .25;
            Player.bulletcollision = false;
          }
        }
        Bullets[i].pos = data[i].pos;
        Bullets[i].Update();
      }
    }
  }
  for (var i in Bullets) {
    if(!data[i]) {
      Bullets[i].Remove();
      delete Bullets[i];
    }
  }
});

//Server Disconnect Handler
socket.on('disconnect',function() {
  console.log("Disconnected");
  socket.off('update-bullets');
  socket.off('update-players');
  socket.off('update-ball');
  connect = false;
  document.getElementById("info").innerHTML = "<div style='color:#e33'>Disconnected From Server<br>Try Refreshing To Reconnect</div>";
})

//Other Players Disconnect Handler
socket.on('player-disconnect',function(state){
  scene.remove(scene.getObjectByName(state));
  scene.remove(scene.getObjectByName(state+"A"));
});

socket.on('mapseed',function(A){
    if(seed == null) {
      
      seed = A;
      
      Map.init();
      
      DeathCube();
      for(var i = 0; i < random(4,8); i++ ) { JumpPad(); }
      World.init();
      
    }
});

socket.on('reload',function(A) {
  
  window.location.reload(false);

});


//Control Inputs
var Input = {

  state: {},
  keydown: window.addEventListener('keydown',function(i){Input.state[i.keyCode || i.which] = true; },true),
  keyup: window.addEventListener('keyup',function(i){Input.state[i.keyCode || i.which] = false;},true),

}

//Game Logic
var update = function() {

  if(Player.mesh) {
    
    Player.move();
    
    directionalLight.position.set( Player.pos[0]+16,Player.pos[1]+16,Player.pos[2]+8 );
	  directionalLight.target = Player.mesh;
    
    if(connect) { Sound.dist(Ball,Player); }
  
  }

};

//Render Scene
var render = function() {

  renderer.render(scene, camera);

};

// Three.js Clock
var clock = new THREE.Clock();

var AnimFrm; //Track Request Animation Frame
var delta;

//Run Game Loop (update, render, repeat)
var GameLoop = function() {

  AnimFrm = requestAnimationFrame(GameLoop);
  delta = clock.getDelta()*60;

  update();
  render();
  
  controls.update(); 

  

};