//Moving Enemies
var enemyMaker = function(){
  this.x = 1150;
  this.y = 750;
}

var data = [];

for(var i=0; i<13; i++){
  data.push(new enemyMaker())
}

//__________________________________________________________________________________________________________________
//Drag Function

var drag = d3.behavior.drag()
    .origin(function() { var t = d3.select(this);
            return {x: t.attr("x"), y: t.attr("y")};})  
    .on('drag', function() { lebron.attr('x', d3.event.x)
    .attr('y', d3.event.y); })

//__________________________________________________________________________________________________________________
//Define Player

var lebron = d3.select('svg').selectAll('.player')
    .data([{ 'x': 565, 'y': 365}])
    .enter()
    .append('image')
    .attr('class', 'player')
    .attr("xlink:href", "man.gif")
    .attr("height", "150px")
    .attr("width", "150px")
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; })
    .call(drag)

//__________________________________________________________________________________________________________________
//Define Enemies

var enemies = d3.select('svg').selectAll('.enemy')
    .data(data)
    .enter()
    .append('image')
    .attr('class', 'enemy')
    .attr("xlink:href", "basketball.gif")
    .attr("height", "50px")
    .attr("width", "50px")

//__________________________________________________________________________________________________________________
//Update  Enemies
var update = function(data){
  enemies.transition()
    .duration(2000)
    .attr("x", function(d){
      return d.x * Math.random()
    })
    .attr("y", function(d){
      return d.y * Math.random()
    })
}; 

update(data);

setInterval(function(){
  update(data)
}, 2000);


//__________________________________________________________________________________________________________________
//Collisions

var colCount = 0;

var coordinates = function(){

  var enemyPosX = [];
  var enemyPosY = [];
  var playerPosX = d3.select('body').selectAll('.player').attr('x'); 
  var playerPosY = d3.select('body').selectAll('.player').attr('y');

  var enemyPos = d3.selectAll('.enemy').each(function(d){
    enemyPosX.push(d3.select(this).attr('x'))});

  var enemyPos = d3.selectAll('.enemy').each(function(d){
    enemyPosY.push(d3.select(this).attr('y'))});

  
  var collisions = function(){
    
    for(var i = 0; i < enemyPosX.length; i++){
      if(enemyPosX[i] > playerPosX){
        var a = enemyPosX[i] - playerPosX;
      } else {
        var a = playerPosX - enemyPosX[i];
      }
      if(enemyPosY[i] > playerPosY){
        var b = enemyPosY[i] - playerPosY;
      } else {
        var b = playerPosY - enemyPosY[i];
      }
      var c = Math.sqrt((a*a)+(b*b));
      if(c < 75){
        colCount++;
        console.log(colCount)
        d3.select('.collisions').selectAll('span')
        .text(colCount)
        if(currentCount>highScore){
          highScore = currentCount;
          d3.select('.high').selectAll('span')
          .text(highScore)
        }
        currentCount=0; 
      }
    }
  }
  collisions();

}

setInterval(function(){
  coordinates()
}, 100)



//__________________________________________________________________________________________________________________
//High Score + Current Score
var highScore = 0;
var currentCount = 0;

var current = function(){
  d3.select('.current').selectAll('span')
    .text(currentCount++)
}

setInterval(function(){
  current()
}, 150)