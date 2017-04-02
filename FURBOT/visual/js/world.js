function ehFim(coords,callback)
{
   var ehfim = true;
   if(typeof coords == 'object')
   {
      $("div[x="+coords.x+"][y="+coords.y+"]").each(function(i,t){
         ehfim = false; 
      })
      return ehfim;
   }
   else
   {
      var retorno = (tratadirecao(coords) == 'ehfim') ? true : false;
      return retorno;
   }
    



}