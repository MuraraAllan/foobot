var alien = [];
var aliens = [] ;
$( document ).ready(function() 
{
  	$('.alien').each( function(i,t){
  		var domelement = document.getElementById(t.id);
  	 	alien.push(domelement);
  	 	console.log(domelement.getAttribute('x'))
  	 	aliens[i] = new Alien(domelement.getAttribute('y'),domelement.getAttribute('x'),domelement.className,domelement);
		var context = alien[i].getContext('2d');	  
		base_imagealien = new Image();
		base_imagealien.src = 'imgs/alien.jpg';
	    base_imagealien.onload = function(){
	    context.drawImage(base_imagealien, 0,0, 250, 250);
	    }

    });
 });