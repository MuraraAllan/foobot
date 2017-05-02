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
       debug: function(obj) 
       {
                 console.log("Current Context");
                 console.log("====================");
                 //var botx = (typeof opc.fn(this.worldobjects[0].x) == "string")  ? Math.round(Math.random()*(this.worldobjects[0].x)) : this.worldobjects[0].x);
                 console.log(this);
             
        },
        generateworld: function(obj) 
        {
           var ret =  "";
           var botx = (typeof this.robot[1].x == "string")  ? Math.round(Math.random()*(this.world[1].x-1)) : this.robot[1].x;
           var boty = (typeof this.robot[0].y == "string")  ? Math.round(Math.random()*(this.world[0].y-1)) : this.robot[0].y;
           var objects = [];
           //foreach object in object array declared on handlebars call,  run another forEach according to how many objects the function will create (this.worldobjects[x][0].qtd)
           var _this = this;
           this.worldobjects.forEach(function(t, i)
           { 
             // var qtd_type = t[0].qtd;
              var qtd_type = t[0].qtd;
              for(var z = 0; z<qtd_type; z++)
              { 
                 var objectx = (typeof t[2].x == "string")  ? Math.round(Math.random()*(_this.world[1].x-1)) : t[2].x;
                 var objecty = (typeof t[1].y == "string")  ? Math.round(Math.random()*(_this.world[0].y-1)) : t[1].y;
                 objects.push({type: t[3].type, x : objectx, y: objecty });
              }
           });
           //y > b -1 y> y 1
           objects.sort(function (a, b) 
           {
              if (a.y < b.y) return -1;
              if (a.y > b.y) return 1;
              if (a.x < b.x) return -1;
              if (a.x > b.x) return 1;
              return 0;
           });
           ret+= "<div class='Map' maxx='"+this.world[1].x+"' maxy='"+this.world[0].y+"'style='position:absolute; width:60%; height:80%; border:1px solid;'>";
           for(var y=0; y < this.world[0].y; y++) 
           {
              for(var x=0; x < this.world[1].x; x++) 
              {
                 //create main div - Corresponding Tile
                 ret += "<div style='height :" + (100/this.world[0].y) + "%; width:" + (100/this.world[1].x) + "%;' class='tile'" + " x=" +x+" y= "+y+">";
                 //create robot if in right x y
                 if ((boty == y) && (botx == x))
                 { 
                    ret+= "<canvas id='foobot' class='foobot'" + " x=" +x+" y= "+y+" style='width:100%; height:50%';>" + boty + "a" +botx+" </canvas>";
                 }
                 objects.forEach(function(t, i)
                 { 
                    if((t.y == y) && (t.x == x))
                    {
                       ret+= "<canvas id='" + t.type.toLowerCase()+ "" + i + "' class='" + t.type.toLowerCase() +"' " + " x=" +x+" y= "+y+" style='width:100%; height:50%';>" + t.y  + "a" + t.x +" </canvas>";
                    }
                 });
                 ret+= "</div>";
              }
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

app.use(express.static(path.join(__dirname, 'visual') , options  ));




app.get('/', function(req, res)
{
//, world: [{ qtd_linhasx : "5" , qtd_linhasy: "5" }]
   //res.render('tabuleiro', {[ birth: [{x: "0", y: "0"}] , world:{qtd_linhasx: "5",qtd_linhasy: "4"}, title:"FOOBOT 0.1 - O ROBO VAZIO :))", author ]});
   res.render('tabuleiro', 
   {
      title:"FOOBOT MONSTRO",
      world: [ {y: (Math.round(Math.random()*(5)) + 6).toString()}  , { x: (Math.round(Math.random()*(4)) + 5).toString()} ],
      robot: [ { y: "random"} , { x: "random" } ],
      worldobjects: [[{qtd:"2"}, { y:"random"} , {x: "random"},{type:'Dino'}],[{qtd:"4"}, { y:"random"} , {x: "random"},{type: 'Alien'}],[{qtd:"3"}, { y:"random"} , {x: "random"},{type: 'Wall'}]]
   })
});

app.listen(app.get('port'),  function () {
console.log('Hello express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});