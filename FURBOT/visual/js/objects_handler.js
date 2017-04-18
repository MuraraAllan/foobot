//constants for direction handler, this should be instanced in a config file from server when we implement (soon enought to surprise :D) server-side language parameters (soon enought to surprise :D)
const direita = 'direita';
const esquerda = 'esquerda';
const acima = 'acima';
const abaixo = 'abaixo';
const aquimesmo = 'aquimesmo';
const alien = 'alien';
var num_threads = 5;

//instance world object, the mandatory function for object chain. The heritance will occur from this
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
   return isEnd
}
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
   walk_bot();
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
   walk_bot();
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
   walk_bot();
   blocked = true;
   return;
   //$(this.dom).appendTo("div[x="+_this.x+"][y="+_this.y+"]");
};
worldobject.prototype.andarAcima = function() 
{
   var isEnd = this.ehFim(acima);
   if(isEnd == true)
   {
      return "Ei amigo, você esta tentando me levar para o fim do mundo???"
   }
   this.y--;
   walk_bot();
   blocked = true;
   moves_pool.push("acima");
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
   for(var i = 0; i<aliens.length; i++)
   {
      if ( (aliens[i].x == coords.x) && (aliens[i].y == coords.y))
      {
         return aliens[i].class
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
   for(var i = 0; i<aliens.length; i++)
   {
      if ( (aliens[i].x == coords.x) && (aliens[i].y == coords.y))
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
   for(var i = 0; i<aliens.length; i++)
   {
      if ( (aliens[i].x == coords.x) && (aliens[i].y == coords.y) && (aliens[i].class == classe) )
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
// Define prototype for objects, instance they in object chain. defining their constructor will set the attribs and defining their prototype will set the object chain functions
Furbot.prototype = Object.create(worldobject.prototype);
Furbot.prototype.constructor = Furbot;
Alien.prototype = Object.create(worldobject.prototype);
Alien.prototype.constructor = Alien;
Map.prototype = Object.create(Map.prototype);
//define map handler

var aliens = [];
var furbot;
var blocked = false;
var map;
var moves_pool = [];
//when document loaded, create the objects using the object chain
$( document ).ready(function() 
{
   console.log($(".Map").css('position'))
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
      base_imagealien = new Image();
      base_imagealien.src = 'imgs/alien.jpg';
      base_imagealien.onload = function()
      {
        context.drawImage(base_imagealien, 0,0, 250, 250);
      }
   });
});