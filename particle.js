let system;
var c;
var select;
var area;
function setup() {
  c = createCanvas(196, 128);
  // c.position(0,0);
  // c.style('position','absolute');
  c.parent('#info');
  c.style('top','100%');
  c.style('left','0%');
  // c.style('height','100%');
  // c.style('width','100%');
  c.style('zIndex','30');
  // background(51);

  area = createDiv();
  area.parent('#info');
  area.style('position','absolute');
  area.style('top','100%');
  // area.style('width','196');


  area.style('background-color', color(255,255,255,127));
  c.parent(area);

  select = createSelect();
  // select.parent('#info');
  select.parent(area);
  select.option('data age');
  select.option('altitude');
  select.option('lat');
  select.option('speed');
  select.option('heading');

  system = new ParticleSystem(createVector(width-2, height/2));

  var count = 0;
  window.setInterval(function() {
                drawer();
        }, 100);
}
function drawer() {
  // background(51);
  // clear();
  // c.claer();
  system.addParticle();
  system.run();
  var c = document.getElementById("defaultCanvas0");
  var ctx = c.getContext("2d");
  ctx.globalCompositeOperation = "copy";
  ctx.drawImage(ctx.canvas,-1, 0);
// reset back to normal for subsequent operations.
  ctx.globalCompositeOperation = "source-over"
}

// A simple Particle class
let Particle = function(position) {
  // this.acceleration = createVector(0, random(-0.05, 0.05));
  // this.velocity = createVector(0, random(-0.1, 0.1));
  // this.position = position.copy();
  var y;
  // y = height/2;
  this.acceleration = createVector(0, random(-0.05, 0.05));
  // this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, random(-0.1, 0.1));
  this.position = position.copy();
  var p;
  // Selected = 'a1741a';
  	if (Planes[Selected]){
		p = Planes[Selected];
		item = select.value();
		console.log(item);
		// console.log("alt:" + p.altitude);
	  if(item == 'altitude'){
	    y = height*(1-(p.altitude/40000));
		console.log(":" + p.altitude);
	  }
	  if(item == 'lat'){
	    y = height*(40.02-p.lat)*10 + height/2;
	    console.log(":"+p.lat);
	  }
	  if(item == 'speed'){
	    y = height*(1-(p.speed/600));
	    console.log(":"+p.speed);
	  }
	  if(item == 'data age'){
	  	var age_sec = (Date.now()-p.seen*1000)*0.001;
	    y = height*(1-(age_sec)/15);
	    console.log(":"+age_sec);
	  }
	  if(item == 'heading'){
	    y = height*(1-(p.track/360));
	    console.log(":"+p.track);
	  }

	// this.position=y;
	}
  // else  
  this.position = createVector(width-2, y);
  this.lifespan = 2;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  // stroke(200, this.lifespan);
  // strokeWeight(2);
  strokeWeight(0);
  fill(255,0,0,255);
  ellipse(this.position.x, this.position.y, 2, 2);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

 