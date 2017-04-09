function tratadirecao(direcao,obj)
{
	if ( direcao == 'acima' || direcao == 'esquerda' || direcao == 'direita' || direcao == 'abaixo' || direcao == 'aquimesmo')
    {
	   var coords = obj.getXY();
	   switch(direcao)
	   {
	      case 'acima': coords.y --; break;
	      case 'abaixo': coords.y ++; break;
	      case 'direita': coords.x ++; break;
	      case 'esquerda': coords.x --; break;
	      case 'aquimesmo': break;
	   }
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
//
function run_bot()
{
   eval(texteditor.getValue())

// Nothing has happened,
//funcInADifferentThread has not executed yet...

funcInADifferentThread(texteditor.getValue());
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
function getObjeto(direction)
{
   return furbot.getObjeto(direction);
}
function ehVazio(direction)
{
   return furbot.ehVazio(direction);
}
function ehObjetoDoMundoTipo(classe,direction)
{
   return furbot.ehObjetoDoMundoTipo(classe,direction);
}