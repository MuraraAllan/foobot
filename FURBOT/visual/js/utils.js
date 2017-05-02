function tratadirecao(direcao,obj)
{

     var coords = obj.getXY();
     switch(direcao)
     {
        case 'acima': coords.y --; break;
        case 'abaixo': coords.y ++; break;
        case 'direita': coords.x ++; break;
        case 'esquerda': coords.x --; break;
        case 'aquimesmo': break;
        case "default" : return "invalid";
     }
     return coords;
  
 
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
    $(".popover").each(function() 
    {
       $(this).remove();
    })
    if ( blocked == true)
    {
       alert('execução rodando ainda.');
       return;
    }
    eval(texteditor.getValue());
}

function andar(direcao)
{
    switch(direcao)
    {
       case 'acima': andarAcima(); break;
       case 'abaixo': andarAbaixo(); break;
       case 'direita': andarDireita(); break;
       case 'esquerda': andarEsquerda(); break;
       case 'aquimesmo': break;
       case "default" : return "invalid";
    }
}
function Diga(texto)
{

   furbot.Diga(texto)
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
function action_handler(caller)
{
   if((blocked == true) && (caller != "callback"))
   {
      return;
   }
  //if acction == diga
   if(moves_pool[0][0] == 'diga')
   {
      var objeto = moves_pool[0][2];
      var texto  = moves_pool[0][1];
      console.log(objeto)
      $("#"+objeto.dom.id).popover({ title: 'Resultado', content: texto, html:true });  
      $("#"+objeto.dom.id).popover("show");
   }else
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
   }
   moves_pool.shift();
   setTimeout(function()
   { 
      if(moves_pool.length == 0)
      {
         blocked = false;
         return;
      }
      action_handler('callback');
   }, 1000) ;
}