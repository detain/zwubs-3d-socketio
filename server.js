// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http); // Here's where we include socket.io as a node module 
 

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('root'));

var up = true;
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  if (up) { response.sendFile(__dirname + '/index.html');}
  else { response.sendFile(__dirname + '/error.html'); }
});

// Listen on port 3000
app.set('port', (process.env.PORT || 3000));
http.listen(app.get('port'), function(){
  console.log('Server up on port: ',app.get('port'));
});

var players = {}; //Keeps a table of all players, the key is the socket id
var bullets = {};
// Tell Socket.io to start accepting connections
io.on('connection', function(socket){
  io.emit('mapseed',seeed);
	// Listen for a new player trying to connect
	socket.on('new-player',function(data){
		console.log(data.name," has joined");
		players[socket.id] = data;
	})
  
  socket.on('new-bullet',function(A){
		if(!bullets[socket.id]) { bullets[socket.id] = new Bullet(A[0],A[1]);}
	})
  
  socket.on('ball-hit',function(A) {
    Ball.vel = A;
  })
  
  socket.on('getplayers',function(){
		if (io.sockets.connected[socket.id]) {
        io.sockets.connected[socket.id].emit('playerdata', players);
    }
	})
  
  // Listen for a disconnection and update our player table 
  socket.on('disconnect',function(data){
    if(socket.id in players) { 
      console.log(players[socket.id].name," has left");
      delete players[socket.id];
      io.emit('player-disconnect',socket.id);
    }
  }) 
  
  // Listen for move events and tell all other clients that something has moved 
  socket.on('move-player',function(A){
    if(players[socket.id] == undefined) return; // Happens if the server restarts and a client is still connected 
    players[socket.id] = A;
  })
  
  socket.on('latency', function (startTime, cb) {
      cb(startTime);
  }); 
})

setInterval(function(){ 
  io.emit('update-players',players);
  io.emit('update-ball',[Math.floor(Ball.pos[0]*64),Math.floor(Ball.pos[1]*64),Math.floor(Ball.pos[2]*64)]); 
  Ball.update();
  for(var i in bullets) { 
    if (i in bullets) {
      bullets[i].Update(); 
      if(bullets[i].time >= 100) { delete bullets[i]; }
    }
  }
  io.emit('update-bullets',bullets);
}, 16);

class Bullet {
  constructor(A,B) {

    this.pos = [A[0],A[1],A[2]];
    this.rot = [B[0],B[1],B[2]];

    this.time = 0;

  }

  Update() {

    this.pos[0] += .1875*Math.sin(this.rot[1])
    this.pos[2] += .1875*Math.cos(this.rot[1])

    this.time++;

    this.Collision();

  }

  Collision() {

    var x = Math.round(this.pos[0]-Map.origin[0]),
      y = Math.round(this.pos[1]-Map.origin[1]),
      z = Math.round(this.pos[2]-Map.origin[2]);

    if (y in Map.val && x in Map.val[y] && z in Map.val[y][x]) {

      if(Map.val[y][x][z] != 0) { this.time = 100; }

    }
  }

}
var now = new Date();
var seeed = 0;//Math.floor(now/8.64e7);
var seed = 0;//Math.floor(now/8.64e7);

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

// http://mrl.nyu.edu/~perlin/noise/

var ImprovedNoise = function () {

	var p = [ 151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,
		 23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,
		 174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,
		 133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,
		 89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,
		 202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,
		 248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
		 178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,
		 14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,
		 93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180 ];

	for (var i = 0; i < 256 ; i ++) {

		p[256 + i] = p[i];

	}

	function fade(t) {

		return t * t * t * (t * (t * 6 - 15) + 10);

	}

	function lerp(t, a, b) {

		return a + t * (b - a);

	}

	function grad(hash, x, y, z) {

		var h = hash & 15;
		var u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z;
		return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);

	}

	return {

		noise: function (x, y, z) {

			var floorX = Math.floor(x), floorY = Math.floor(y), floorZ = Math.floor(z);

			var X = floorX & 255, Y = floorY & 255, Z = floorZ & 255;

			x -= floorX;
			y -= floorY;
			z -= floorZ;

			var xMinus1 = x - 1, yMinus1 = y - 1, zMinus1 = z - 1;

			var u = fade(x), v = fade(y), w = fade(z);

			var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;

			return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z),
							grad(p[BA], xMinus1, y, z)),
						lerp(u, grad(p[AB], x, yMinus1, z),
							grad(p[BB], xMinus1, yMinus1, z))),
					lerp(v, lerp(u, grad(p[AA + 1], x, y, zMinus1),
							grad(p[BA + 1], xMinus1, y, z - 1)),
						lerp(u, grad(p[AB + 1], x, yMinus1, zMinus1),
							grad(p[BB + 1], xMinus1, yMinus1, zMinus1))));

		}
	}
};

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
		    		[0,6,6,6,0],
		    		[0,0,6,0,0],
		    		[0,0,0,0,0],
		    	]
		    ]
		],
	
	  place: function() {
	
	    var A = random(4,Map.dim[0]-4)
	    var B = random(4,Map.dim[2]-4)
	    
	    var C = random(0,Tree.val.length-1)
	    var dim = [Math.floor(this.val[C][0].length/2),Math.floor(this.val[C][0][0].length/2)]
	
	    for (var y = 0; y < this.val[C].length; y++) {
	      for (var z = 0; z < this.val[C][y].length; z++) {
	        for (var x = 0; x < this.val[C][y][z].length; x++) {
	
	          if(this.val[C][y][x][z] != 0) { Map.val[Map.getY(A+dim[0],B+dim[1])+y+1][A+x][B+z] = this.val[C][y][x][z] }
	
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

var Map = {

  dim: [96,64,96],
  pos: [0,0,0],
  origin: [0,0,0], //Relative Origin

  val: null,
  data: null,
  seed: rand(),

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

      this.val[y][x][z] = 1;

    }
  }
}

Map.init();


var Ball = {

    pos: [0,0,0], //Position
    vel: [0,0,0], //Velocity
    dim: [1,1,1],
    grd: false,

    init: function() {

      this.respawn();

    },

    respawn: function() {

      this.pos[0] = 1;
      this.pos[2] = 0;
      this.pos[1] = Map.getY(this.pos[0]-Map.origin[0],this.pos[2]-Map.origin[2])-25;

      this.vel = [0,0,0]

    },

    update: function() {

      this.pos[0] += Math.round(this.vel[0]*100)/100;
      this.pos[1] += Math.round(this.vel[1]*100)/100;
      this.pos[2] += Math.round(this.vel[2]*100)/100;

      this.collision();

    },

    collision: function() {

      var x = Math.round(this.pos[0]-Map.origin[0]),
        y = Math.round(this.pos[1]-Map.origin[1]),
        z = Math.round(this.pos[2]-Map.origin[2]);

      var px = Math.round(this.pos[0]-Map.origin[0]+(this.dim[0]/2+.001)),
        py = Math.round(this.pos[1]-Map.origin[1]+(this.dim[1]/2+.001)),
        pz = Math.round(this.pos[2]-Map.origin[2]+(this.dim[2]/2+.001)),
        nx = Math.round(this.pos[0]-Map.origin[0]-(this.dim[0]/2+.001)),
        ny = Math.round(this.pos[1]-Map.origin[1]-(this.dim[1]/2+.001)),
        nz = Math.round(this.pos[2]-Map.origin[2]-(this.dim[2]/2+.001));

      var A = [0,0,0,0,0,0,0] //[Down,Up,Front,Back,Left,Right,Inside]

      if (y in Map.val && x in Map.val[y] && z in Map.val[y][x]) {

        if(ny in Map.val) { A[0] =  Map.val[ny][x][z]}
        if(py in Map.val) { A[1] = Map.val[py][x][z]}

        if(nx in Map.val[y]) { A[3] =  Map.val[y][nx][z]}
        if(px in Map.val[y]) { A[2] = Map.val[y][px][z]}

        if(nz in Map.val[y][x]) { A[4] =  Map.val[y][x][nz]}
        if(pz in Map.val[y][x]) { A[5] = Map.val[y][x][pz]}

        A[6] = Map.val[y][x][z]

      }

      if (A[0] == 0 && this.vel[1] > -.5) { this.vel[1] -= 0.01; this.grd = false}
      else if (A[0] != 0 && !this.grd) {

        this.grd = true;
        this.pos[1] = Math.ceil(this.pos[1])
        this.vel[1] = Math.abs(this.vel[1]/2);

      }
      if (this.grd && A[0] != 6) {
        if(this.vel[0] > 0) { this.vel[0] -= .001; }
        else if(this.vel[0] < 0) { this.vel[0] += .001; }
        if(this.vel[2] > 0) { this.vel[2] -= .001; }
        else if(this.vel[2] < 0) { this.vel[2] += .001; }
      }

      if (A[6] != 0) {this.pos[1] = Math.round(this.pos[1])+this.dim[1]*1.5; this.vel[1] = 0} //Player Inside Block
        else {

          if (A[1] != 0) { this.vel[1] = -Math.abs(this.vel[1]/2)} //Block Above

          if (A[2] != 0) { this.vel[0] = -Math.abs(this.vel[0]/2); this.pos[0] = Math.round(this.pos[0])-.01; }
          else if (A[3] != 0) { this.vel[0] = Math.abs(this.vel[0]/2); this.pos[0] = Math.round(this.pos[0])+.01; }

          if (A[4] != 0) { this.vel[2] = Math.abs(this.vel[2]/2); this.pos[2] = Math.round(this.pos[2])+.01; }
          else if (A[5] != 0) { this.vel[2] = -Math.abs(this.vel[2]/2); this.pos[2] = Math.round(this.pos[2])-.01;}

        }

      if (this.pos[1] <= -50) { this.respawn(); }

    },
  }

  Ball.init();