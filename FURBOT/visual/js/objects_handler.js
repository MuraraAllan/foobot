//constants for direction handler, this should be instanced in a config file from server when we implement (soon enought to surprise :D) server-side language parameters (soon enought to surprise :D)
const direita = 'direita';
const esquerda = 'esquerda';
const acima = 'acima';
const abaixo = 'abaixo';
const aquimesmo = 'aquimesmo';
const alien = 'alien';
var num_threads = 5;

function Map(x,y)
{
   this.maxx = x;
   this.maxy = y;
   this.energy = 0;//boolean to set if robot gets energy or not.
}
Map.prototype.ehFim = function(x,y)
{
   var isEnd = (this.maxx - 1 < x) ? true : false;
   isEnd = (this.maxy - 1 < y || isEnd == true) ? true : false;
   isEnd = (x < 0 || isEnd == true) ? true : false;
   isEnd = (y<0 || isEnd == true) ? true : false;
   return isEnd;
}

//instance world object, the mandatory function for object chain. heritance will occur from this
function worldobject(x,y,identifier,htmlelement)
{
   this.x = x;
   this.y = y;
   this.steps = 0;
   this.class = identifier;
   this.dom = htmlelement;
   this.processing = 0;
   this.processingempty = 0;
   this.processingtype = 0;
};
worldobject.prototype.Diga = function(texto)
{
  $("#"+this.dom.id).popover("destroy");   
  moves_pool.push(["diga",texto, this]);
  setTimeout(function(){ action_handler(); } , 200 );
  return;
}
worldobject.prototype.andarDireita = function() 
{ 
   var isEnd = this.ehFim('direita');
   if(isEnd == true)
   {
      return "Ei amigo, você esta tentando me levar para o fim do mundo???"
   }
   this.x++;
   // 
   moves_pool.push("direita");
   action_handler();
   blocked=true;
   return;
};
worldobject.prototype.andarEsquerda = function() 
{
   var isEnd = this.ehFim('esquerda');
   if(isEnd == true)
   {
      return "Ei amigo, você esta tentando me levar para o fim do mundo???"
   }
   //$(this.dom).appendTo("div[x="+_this.x+"][y="+_this.y+"]");  
   moves_pool.push("esquerda");
   action_handler();
   blocked = true;
   this.x --;
   return;
};
worldobject.prototype.andarAbaixo = function() 
{
   var isEnd = this.ehFim(abaixo);
   if(isEnd == true)
   {
      return "Ei amigo, você esta tentando me levar para o fim do mundo???"
   }
   this.y++;
   moves_pool.push("abaixo");
   action_handler();
   blocked = true;
   return;
};
worldobject.prototype.andarAcima = function() 
{
   var isEnd = this.ehFim(acima);
   if(isEnd == true)
   {
      return "Ei amigo, você esta tentando me levar para o fim do mundo???"
   }
   this.y--;
   moves_pool.push("acima");
   action_handler();
   blocked = true;
   return;
   //$(this.dom).appendTo("div[x="+_this.x+"][y="+_this.y+"]"); 
};
worldobject.prototype.getObjeto = function(direction)
{
   var coords = tratadirecao(direction,this);
   if ( coords == "invalid")
   {
      return "Direção invalida, As direções possíveis são : acima, direita, esquerda, abaixo, aquimesmo!";
   } 
   for(var i = 0; i<objects.length; i++)
   {
      if ( (objects[i].x == coords.x) && (objects[i].y == coords.y))
      {
         return objects[i].class
      }
   }
   return undefined
};
worldobject.prototype.ehVazio = function(direction)
{
   var coords = tratadirecao(direction,this);
   if ( coords == "invalid")
   {
      return "Direção invalida, As direções possíveis são : acima, direita, esquerda, abaixo, aquimesmo!";
   } 
   for(var i = 0; i<objects.length; i++)
   {
      if ( (objects[i].x == coords.x) && (objects[i].y == coords.y))
      {
         return false
      }
   }
   return true
};
worldobject.prototype.ehObjetoDoMundoTipo = function(classe,direction)
{
   var coords = tratadirecao(direction,this);
   if ( coords == "invalid")
   {
      return "Direção invalida, As direções possíveis são : acima, direita, esquerda, abaixo, aquimesmo!";
   } 
   for(var i = 0; i<objects.length; i++)
   {
      if ( (objects[i].x == coords.x) && (objects[i].y == coords.y) && (objects[i].class == classe) )
      {
         return true;
      }
   }
   return false;
};
//get currently object XY
worldobject.prototype.getXY = function()
{
   var currentcoords = { x: this.x , y: this.y };
   return currentcoords
};
//check if direction is world end
worldobject.prototype.ehFim = function(direction)
{
   var coords = tratadirecao(direction,this);
   var isEnd = map.ehFim(coords.x, coords.y);
   return isEnd
};

function Furbot(x,y,identifier,htmlelement) {
  worldobject.call(this,x,y,identifier,htmlelement); // call constructor-father
}
function Alien(x,y,identifier,htmlelement) {
  worldobject.call(this,x,y,identifier,htmlelement); // call constructor-father
};
function Dino(x,y,identifier,htmlelement) {
  worldobject.call(this,x,y,identifier,htmlelement); // call constructor-father
};
function Wall(x,y,identifier,htmlelement) {
  worldobject.call(this,x,y,identifier,htmlelement); // call constructor-father
};

// Define prototype for objects, instance they in object chain. defining their constructor will set the attribs and defining their prototype will set the object chain functions
Furbot.prototype = Object.create(worldobject.prototype);
Furbot.prototype.constructor = Furbot;
Alien.prototype = Object.create(worldobject.prototype);
Alien.prototype.constructor = Alien;
Dino.prototype = Object.create(worldobject.prototype);
Dino.prototype.constructor = Dino;
Wall.prototype = Object.create(worldobject.prototype);
Wall.prototype.constructor = Wall;
Map.prototype = Object.create(Map.prototype);
//define map handler
var objects = [];
var aliens = [];
var dinos = [];
var walls =[];
var furbot;
var blocked = false;
var map;
var moves_pool = [];
//when document loaded, create the objects using the object chain
$( document ).ready(function() 
{
   map = new Map($(".Map").attr('maxx'), $(".Map").attr('maxy'));
   //declaring single object called Furbot 
   var domelement = document.getElementById('foobot'), context = domelement.getContext('2d');    
   furbot = new Furbot(domelement.getAttribute('x'),domelement.getAttribute('y'),domelement.className,domelement);
   base_image = new Image();
   base_image.src = 'imgs/foobot.jpg';
   base_image.onload = function()
   {
      context.drawImage(base_image, 0,0, 250, 250);
   }
   //iterate over all dom elements called .allien ( server heritance ) and create a array of objects called aliens 
   $('.alien').each( function(i,t)
   {  
      domelement = document.getElementById(t.id);
      aliens[i] = new Alien(domelement.getAttribute('x'),domelement.getAttribute('y'),domelement.className,domelement);
      var context = aliens[i].dom.getContext('2d');    
      objects.push(aliens[i])
      base_imagealien = new Image();
      base_imagealien.src = 'imgs/alien.jpg';
      base_imagealien.onload = function()
      {
        context.drawImage(base_imagealien, 0,0, 250, 250);
      }
   });
   $('.dino').each( function(i,t)
   {
      domelement = document.getElementById(t.id);
      dinos[i] = new Dino(domelement.getAttribute('x'),domelement.getAttribute('y'),domelement.className,domelement);
      var context = dinos[i].dom.getContext('2d');    
      objects.push(dinos[i]);
      base_imagedino = new Image();
      base_imagedino.src = 'imgs/dino.jpg';
      base_imagedino.onload = function()
      {
        context.drawImage(base_imagedino, 0,0, 250, 250);
      }
   });
   objects.push(dinos);
   $('.wall').each( function(i,t)
   {
      domelement = document.getElementById(t.id);
      walls[i] = new Dino(domelement.getAttribute('x'),domelement.getAttribute('y'),domelement.className,domelement);
      objects.push(walls[i]);
      var context = walls[i].dom.getContext('2d');    
      base_imagewall = new Image();
      base_imagewall.src = 'imgs/wall.jpg';
      base_imagewall.onload = function()
      {
        context.drawImage(base_imagewall, 0,0, 250, 250);
      }
   });
});