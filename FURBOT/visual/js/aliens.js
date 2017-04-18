var alien = [];
$( document ).ready(function() 
{
  	$('.alien').each( function(i,t){
  	 	alien.push(document.getElementById(t.id));
		var context = alien[i].getContext('2d');	  
		base_imagealien = new Image();
		base_imagealien.src = 'imgs/alien.jpg';
	    base_imagealien.onload = function(){
	    context.drawImage(base_imagealien, 0,0, 250, 250);
	    }

    });
 });