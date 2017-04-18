//constants for direction handler, this should be instanced in a config file from server when we implement (soon enought to surprise :D) server-side language parameters (soon enought to surprise :D)
const direita = 'direita';
const esquerda = 'esquerda';
const acima = 'acima';
const abaixo = 'abaixo';
const aquimesmo = 'aquimesmo';
//instance world object, the mandatory function for object chain. The heritance will occur from this
function worldobject(x,y,identifier,htmlelement)
{
   this.x = x;
   this.y = y;
   this.steps = 0;
   this.class = identifier;
   this.dom = htmlelement;
   this.processing = 0;
}
worldobject.prototype.andarDireita = function() 
{ 
   var isEnd = this.ehFim('direita');
   if(isEnd == true)
   {
      return "Ei amigo, você esta tentando me levar para o fim do mundo???"
   }
   this.processing = 1;
   this.y ++;
   $(this.dom).appendTo("div[x="+_this.x+"][y="+_this.y+"]"); _this.processing = 0;
   return;
}
worldobject.prototype.andarEsquerda = function() 
{
   if(this.processing == 1)
   {
      return false;
   }
   var isEnd = this.ehFim('esquerda');
   if(isEnd == true)
   {
      return "Ei amigo, você esta tentando me levar para o fim do mundo???"
   }
   this.x --;
   $(this.dom).appendTo("div[x="+this.x+"][y="+this.y+"]");
};
worldobject.prototype.andarAbaixo = function() 
{

   var isEnd = this.ehFim(abaixo);
   if(isEnd == true)
   {
      return "Ei amigo, você esta tentando me levar para o fim do mundo???"
   }
   this.y ++;
   $(this.dom).appendTo("div[x="+this.x+"][y="+this.y+"]");
};
worldobject.prototype.andarAcima = function() 
{
   var isEnd = this.ehFim(acima);
   if(isEnd == true)
   {
      return "Ei amigo, você esta tentando me levar para o fim do mundo???"
   }
   this.y --;
   $(this.dom).appendTo("div[x="+this.x+"][y="+this.y+"]");
};

//get currently object XY
worldobject.prototype.getXY = function()
{
   var currentcoords = { x: this.x , y: this.y };
   return currentcoords
}

//check if direction is world end
worldobject.prototype.ehFim = function(direction,obj)
{
   var coords = tratadirecao(direction,this);
   if ( coords == "invalid")
   {
      return "Direção invalida, As direções possíveis são : acima, direita, esquerda, abaixo!";
   } 
   var isEnd = true;
   $("div[x="+coords.x+"][y="+coords.y+"]").each(function(i,t)
   {
      isEnd = false; 
   })
   return isEnd
}

function Furbot(x,y,identifier,htmlelement) {
  worldobject.call(this,x,y,identifier,htmlelement); // call constructor-father
}

function Alien(x,y,identifier,htmlelement) {
  worldobject.call(this,x,y,identifier,htmlelement); // call constructor-father
}
// Define prototype for objects, instance they in object chain. defining their constructor will set the attribs and defining their prototype will set the object chain functions
Furbot.prototype = Object.create(worldobject.prototype);
Furbot.prototype.constructor = Furbot;
Alien.prototype = Object.create(worldobject.prototype);
Alien.prototype.constructor = Alien;

var aliens = [];
var furbot;
//when document loaded, create the objects using the object chain
$( document ).ready(function() 
{
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
      aliens[i] = new Alien(domelement.getAttribute('y'),domelement.getAttribute('x'),domelement.className,domelement);
      var context = aliens[i].dom.getContext('2d');    
      base_imagealien = new Image();
      base_imagealien.src = 'imgs/alien.jpg';
      base_imagealien.onload = function()
      {
        context.drawImage(base_imagealien, 0,0, 250, 250);
      }
   });


});