var express = require('express');
var path = require('path');
var app = express();
var handlebars = require('handlebars');
var exphbs = require('express-handlebars');
var hbs = exphbs.create(
   {
    layoutsDir:'visual/layouts/',
    defaultLayout: false,
    helpers: 
    {
       generateworld: function(obj, opc) 
       {
          var botx = (typeof opc.fn(obj.robot[0].x) == "string")  ? Math.round(Math.random()*(opc.fn(obj.world[1].x)-1)) : opc.fn(obj.robot[1].x);
          var boty = (typeof opc.fn(obj.robot[1].y) == "string")  ? Math.round(Math.random()*(opc.fn(obj.world[0].y)-1)) : opc.fn(obj.robot[0].y);
          var ret =  "";
          for(var y=0; y < opc.fn(obj.world[0].y); y++) 
     	    {
            for(var x=0; x < opc.fn(obj.world[1].x); x++) 
            {
        	      ret += "<div style='height :" + (100/obj.world[0].y) + "%; width:" + (100/obj.world[1].x) + "%;' class='tile'" + " x=" +x+" y= "+y+">";
               if ((boty == y) && (botx == x))
               {
                  ret+= "<canvas id='foobot' class='foobot' style='width:90%; height:90%';>" + boty + "a" +botx+" </canvas>";
               }
               ret+= "</div>";
            }
            //ret+= "</div>"
          }
          return ret;
       }
    }
  });
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
//app.set('title',"FOOBOT - BETA 0.1 - O BOT VAZIO ")
app.set('views',  path.join(__dirname, '/visual'))
var options = { dotfiles: 'ignore', etag: false,extensions: ['htm', 'html'],index: false};
var author = { author : [ {"nome" : "testando"}, {"nome" : "testando2"} ] };

app.use(express.static(path.join(__dirname, 'visual') , options  ));




app.get('/', function(req, res)
{
//, world: [{ qtd_linhasx : "5" , qtd_linhasy: "5" }]
   //res.render('tabuleiro', {[ birth: [{x: "0", y: "0"}] , world:{qtd_linhasx: "5",qtd_linhasy: "4"}, title:"FOOBOT 0.1 - O ROBO VAZIO :))", author ]});
   res.render('tabuleiro', 
   {
      title:"FOOBOT MONSTRO",
      world: [ {y: "5"}  , { x: "5"} ],
      robot: 
      [
        { y: "random"} , { x: "random" }
      ]

   })
});

app.listen(app.get('port'),  function () {
console.log('Hello express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});