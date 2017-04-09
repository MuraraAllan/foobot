function tratadirecao(direcao,obj)
{
	if ( direcao == 'acima' || direcao == 'esquerda' || direcao == 'direita' || direcao == 'abaixo' )
    {
	   var coords = obj.getXY();
	   switch(direcao)
	   {
	      case 'acima': coords.y --; break;
	      case 'abaixo': coords.y ++; break;
	      case 'direita': coords.x ++; break;
	      case 'esquerda': coords.x --; break;
	   }
	//   if(ehFim(coords))
	  // {
 	    //  return "ehfim"
	   //}
       return coords;
    }

    return "invalid";
}

function getXY(obj)
{
	var currentcoords = {x: $(obj).parent().attr('x'), y : $(obj).parent().attr('y') };
	return currentcoords;
}
function sleep(ms,caller)
{
	window.setTimeout(function(){ oie('testes') }, ms);
}

function run_bot()
{
	try {
	console.log(eval(texteditor.getValue()))
} catch (e) {
 console.log(e)    
}

}

function ehFim(direcao)
{
   return furbot.ehFim(direcao);
}
function andarDireita()
{
   return furbot.andarDireita();
}
function andarEsquerda()
{
   return furbot.andarEsquerda();
}
function andarAbaixo()
{
   return furbot.andarAbaixo();
}
function andarAcima()
{
   return furbot.andarAcima();
}