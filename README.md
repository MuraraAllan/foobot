-----------------PORTUGUES--------------------
Baseado no Furbot - http://inf.furb.br/poo/ProjetoFurbot/ 

Apresentação :
" O FURBOT é um ambiente de apoio ao ensino de lógica de programação que foi concebido em 2008-1 por uma equipe de professores do Departamento de Sistemas e Computação da FURB pela equipe de professores: Adilson Vahldick, Mauro Marcelo Mattos e Carlos Henrique Correia com o propósito de disponibilizar a você um ambiente com forte apelo na área de jogos e que possibilitasse o desenvolvimento de algoritmos de controle de personagens de tal forma a criar uma atmosfera facilitadora ao aprendizado.
"
Seguindo a idéia do Furbot, aproveitando conhecimentos próprios e de maneira voluntária, foi dado início ao desenvolvimento do Foobot, um possível "Furbot" na versão Web.
Desenvolvido orientado a objeto utilizando Node.JS + Handlebars.js + Express.js + Socket.io .
Atualmente estamos migrando as funcionalidades locais de resolução de movimento para uma plataforma Socket based, possibilitando assim a interação multiplayer e resolvendo algumas limitações do processamento Single Thread Javascript.
Os trabalhos iniciaram por volta de 25/03/2017. Já o projeto esta por completar 10 anos.

Atualmente você pode verificar o projeto ( diariamente atualizado ) rodando em : http://54.186.0.107:3000/
Ao utilizar um comando como andarDireita() o robo (figura cinza) se deslocará para a direita, caso não seja o final do tabuleiro. Ao utilizar ehFim(direcao) o robo interpretará se é o final do tabuleira nesta direção e assim sucessivamente. O código deverá ser colocado no editor ao lado do tabuleiro e executado a partir do botão "Secondary". Esta é uma versão inicial, o projeto não tem aporte a socket, esta com problemas na execução de loops. Se voce desejar rodar um loop para entender a idéia lógica, aqui vai um exemplo de código : customloop(ms,conditional, execution)
customloop(1500, "ehFim('direita')", "if(!ehVazio(aquimesmo)){ console.log('found alien'); } else {console.log('no alien found at x' + getXY().x  + ' y: ' + getXY().y);  } andarDireita(); " )

O Código fara o robo andar para direita e caso encontre um alien vai dizer que encontrou, se não encontrar vai informar o x y do mundo. Favor desconsiderar estética, projeto protótipo.

-----------------ENGLISH--------------------
Based on Furbot - http://inf.furb.br/poo/ProjetoFurbot/ 


Presentation:

"Furbot is a Programing Logic teaching directed system created in 2008 - 1 by a team of professors of Computer Science and Systems Departament from FURB University. Including Adilson Vahldick, Mauro Marcelo Mattos and Carlos Henrique Correia. The idea follows the propous of a platform entended to allow a visual result from students algorithms directed to character control, turning easier to learn.

Following the idea of Furbot and using my own knowledge, volunteer, started to develop this project, called Foobot, a possible Web Furbot Version.
Tools : Node.js + Handlebars.js + Express.js + Socket.io.
Development : Object Oriented.

We are currently developing a socket backend intended to handle the multiplayer resource. 
Actually you can check the daily updated version in  : http://54.186.0.107:3000/
If you want to see it rolling, fill the command box located right side from "world", the commands are currently portuguese.
andarDireita() means walkRight()
and as a command example you can use : 
customloop(1500, "ehFim('direita')", "if(!ehVazio(aquimesmo)){ alert('found alien'); } else {alert('no alien found at x' + getXY().x  + ' y: ' + getXY().y);  } andarDireita(); " )
just fill right box as previous said with this command and until the bot finds the end of world he will show you, step by step if he found or not a alien in that tile.
the command is a custom loop to avoi while Javascript singlethread block. and check 

while(!isend(direction)) 
{ 
if(!isEmpty(here)) 
{ alert... }
else 
{ alert.. get current bot x y tile} 
WalkRight();
}

Cya 
