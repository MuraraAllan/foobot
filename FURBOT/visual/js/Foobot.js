//desenha foobot dentro do canvas que foi posicionado no x y correto. possbilidade de 3d dessa maneira..
var foobot;
$( document ).ready(function() 
  {
	  foobot = document.getElementById('foobot'), context = foobot.getContext('2d');	  
	  base_image = new Image();
	  base_image.src = 'imgs/foobot.jpg';
	  base_image.onload = function(){
	    context.drawImage(base_image, 0,0, 250, 250);
	  }

});
  

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