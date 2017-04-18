//desenha foobot dentro do canvas que foi posicionado no x y correto. possbilidade de 3d dessa maneira..
var foobot;
$( document ).ready(function() 
  {
<<<<<<< HEAD
	  foobot = document.getElementById('foobot'), context = foobot.getContext('2d');	  
	  base_image = new Image();
	  base_image.src = 'imgs/foobot.jpg';
	  base_image.onload = function(){
	    context.drawImage(base_image, 0,0, 250, 250);
	  }

});
  
=======
    foobot = document.getElementById('foobot'), context = foobot.getContext('2d');    
    base_image = new Image();
    base_image.src = 'imgs/foobot.jpg';
    base_image.onload = function(){
      context.drawImage(base_image, 0,0, 250, 250);
    }

});
var num_threads = 5;
var MT = new Multithread(num_threads);

var funcInADifferentThread = MT.process(
  function(comando) { return a + b; },
  function(r) { console.log(r) }
);


//instance world object
function worldobject(x,y,identifier,htmlelement)
{
   this.x = x;
   this.y = y;
   this.steps = 0;
   this.class = identifier;
   this.domid = htmlelement;
}

worldobject.prototype.andarDireita = function() {
  this.x ++;
  this.y ++;
  console.info('bot moved.');
};

function Foobot(x,y,identifier) {
  worldobject.call(this,x,y,identifier); // call constructor-father
}

function Alien(x,y,identifier,htmlelement) {
  worldobject.call(this,x,y,identifier,htmlelement); // call constructor-father
}
// subclasse extends superclass to children object (for a bot will be a prototype of foobot.)
Foobot.prototype = Object.create(worldobject.prototype);
Foobot.prototype.constructor = Foobot;
Alien.prototype = Object.create(worldobject.prototype);
Alien.prototype.constructor = Alien;

var Foobot = new Foobot(1,2,'furbot');
//Foobot.andarDireita(); 



>>>>>>> parent of 9e06299... 09/04/2017

function andar(direcao)
{ 
   if(typeof direcao != 'string')
   {
      return 'Oi, você deve informar um texto que seja do tipo "STRING" ou eu vou bugar e ficar vermelho. hehehe';
   }
   var coords = tratadirecao(direcao);
   if(coords == "direcaoinvalida")
   {
      return "As direções possíveis são : acima, direita, esquerda, abaixo!";
   }   
   if(coords == 'ehfim')
   {
      return "ei amigo, você quer me levar pro fim do mundo???";
   }
   $(foobot).appendTo("div[x="+coords.x+"][y="+coords.y+"]");

}