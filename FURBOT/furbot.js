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
          var ret =  "";
          var botx = (typeof opc.fn(obj.robot[1].x) == "string")  ? Math.round(Math.random()*(opc.fn(obj.world[1].x)-1)) : opc.fn(obj.robot[1].x);
          var boty = (typeof opc.fn(obj.robot[0].y) == "string")  ? Math.round(Math.random()*(opc.fn(obj.world[0].y)-1)) : opc.fn(obj.robot[0].y);
          var qtd_aliens = opc.fn(obj.alien[0].qtd);
          var aliens_pos = [];
          for(var i = 0; i< qtd_aliens; i++)
          {
            var alienx = (typeof opc.fn(obj.alien[2].x) == "string")  ? Math.round(Math.random()*(opc.fn(obj.world[1].x)-1)) : opc.fn(obj.alien[2].x);
            var alieny = (typeof opc.fn(obj.alien[1].y) == "string")  ? Math.round(Math.random()*(opc.fn(obj.world[0].y)-1)) : opc.fn(obj.alien[1].y);
            aliens_pos[i] = { x : alienx, y: alieny };
          }
          aliens_pos.sort(function (a, b) 
          {
            var o1 = a.y;
            var o2 = b.y;
            var p1 = a.x;
            var p2 = b.x;

            if (o1 < o2) return -1;
            if (o1 > o2) return 1;
            if (p1 < p2) return -1;
            if (p1 > p2) return 1;
            return 0;
          })
          ret+= "<div class='Map' maxx='"+obj.world[1].x+"' maxy='"+obj.world[0].y+"'style='position:absolute; width:60%; height:50%; border:1px solid;'>";
          for(var y=0; y < opc.fn(obj.world[0].y); y++) 
          {
            for(var x=0; x < opc.fn(obj.world[1].x); x++) 
            {
               ret += "<div style='height :" + (100/obj.world[0].y) + "%; width:" + (100/obj.world[1].x) + "%;' class='tile'" + " x=" +x+" y= "+y+">";
               if ((boty == y) && (botx == x))
               {
                  ret+= "<canvas id='foobot' class='foobot'" + " x=" +x+" y= "+y+" style='width:90%; height:90%';>" + boty + "a" +botx+" </canvas>";
               }
               if ( aliens_pos.length > 0 )
               {
                 if((aliens_pos[0].y == y) && (aliens_pos[0].x == x))
                 {
                     ret+= "<canvas id='alien" + aliens_pos[0].y + "" + aliens_pos[0].x +"' class='alien' " + " x=" +x+" y= "+y+" style='width:90%; height:90%';>" + aliens_pos[0].y  + "a" + aliens_pos[0].x +" </canvas>";
                     aliens_pos.shift();
                 }
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
      [ { y: "random"} , { x: "random" } ],
      alien: [{qtd:"5"}, { y:"random"} , {x: "random"}]

   })
});

app.listen(app.get('port'),  function () {
console.log('Hello express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});