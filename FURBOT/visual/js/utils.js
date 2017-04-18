function tratadirecao(direcao)
{
	if ( direcao == 'acima' || direcao == 'esquerda' || direcao == 'direita' || direcao == 'abaixo' || direcao == 'aquimesmo')
    {
	   var coords = getXY(foobot);
	   switch(direcao)
	   {
	      case 'acima': coords.y --; break;
	      case 'abaixo': coords.y ++; break;
	      case 'direita': coords.x ++; break;
	      case 'esquerda': coords.x --; break;
	      case 'aquimesmo': break;
	   }
<<<<<<< HEAD
       return coords;
    }
    return "invalid";
=======
	   if(ehFim(coords))
	   {
 	      return "ehfim"
	   }
       return coords;
    }

    return "direcaoinvalida";
>>>>>>> parent of 9e06299... 09/04/2017
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
<<<<<<< HEAD
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
=======

function threadexterna(executa)
{
	
>>>>>>> parent of 9e06299... 09/04/2017
}