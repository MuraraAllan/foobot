function tratadirecao(direcao)
{
	if ( direcao == 'acima' || direcao == 'esquerda' || direcao == 'direita' || direcao == 'abaixo' )
    {
	   var coords = getXY(foobot);
	   switch(direcao)
	   {
	      case 'acima': coords.y --; break;
	      case 'abaixo': coords.y ++; break;
	      case 'direita': coords.x ++; break;
	      case 'esquerda': coords.x --; break;
	   }
	   if(ehFim(coords))
	   {
 	      return "ehfim"
	   }
       return coords;
    }

    return "direcaoinvalida";
}

function getXY(obj)
{
	var currentcoords = {x: $(obj).parent().attr('x'), y : $(obj).parent().attr('y') };
	return currentcoords;
}