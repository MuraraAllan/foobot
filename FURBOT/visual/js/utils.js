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
	return furbot.getXY();
}
function sleep(ms,caller)
{
	window.setTimeout(function(){ oie('testes') }, ms);
}
//
function run_bot()
{
    if ( blocked == true)
    {
       alert('execução rodando ainda.');
       return;
    }
    eval(texteditor.getValue());
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
function customloop(ms, conditional, execution)
{
   if( ms  > 0 )
   {
      setTimeout(function()
      { 
         if(eval(conditional) == true)
         {
            ms = 0;
         }
         eval(execution)
         if ( ms > 0 )
         {
            customloop(ms,conditional,execution);
         }
       }, ms);
   }
}
function walk_bot(caller)
{
  if((blocked == true) && (caller != "callback"))
  {
    return;
  }
  setTimeout(function()
  { 
     switch(moves_pool[0])
     {
        case 'acima': $("#foobot").attr('y',parseInt($("#foobot").attr('y')) -1); break;
        case 'abaixo': $("#foobot").attr('y',parseInt($("#foobot").attr('y')) +1); break;
        case 'direita': $("#foobot").attr('x',parseInt($("#foobot").attr('x')) +1); break;
        case 'esquerda':  $("#foobot").attr('x',parseInt($("#foobot").attr('x')) -1); break;
        case 'aquimesmo': break;
     }
     $("#foobot").appendTo("div[x="+$("#foobot").attr('x')+"][y="+$("#foobot").attr('y')+"]");  
     moves_pool.shift();
     if(moves_pool.length == 0)
     {
        blocked = false;
        return;
     }
     walk_bot('callback');
  }, 2000) ;
}