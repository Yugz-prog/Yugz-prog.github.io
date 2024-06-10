let x = echo.offsetLeft;
y = echo.offsetTop;
const STEP = 32
let i = 0
let tabi = [0, 1, 0, 2]
const PATH = "img/walk/tile"
let direction;
let left = false
let right = false
let up = false
let down = false
const TIMEINTER = 200 
let interWalk= setInterval(walk, TIMEINTER);
let timeout = false;



document.onkeydown = function(event){
    if(!up && !down && !left && !right)
    {
        switch(event.key){
            case "w":
                up = true
                break;
            case "a":
                left = true
                break;
            case "d":
                right = true
                break;
            case "s":
                down = true
                break;
        }
    }

}

document.onkeyup = function(event){
    switch(event.key){
        case "w":
            up = false
            break;
        case "a":
            left = false
            break;
        case "d":
            right = false
            break;
        case "s":
            down = false
            break;
    }
}



function walk(direction = false)
{
    let InDirection = false;

    if(direction != false)
        InDirection = direction
    else{
        switch(true){
            case up:
                InDirection = "up"
                break;
            case left:
                InDirection = "left"
                break;
            case down:
                InDirection = "down"
                break;
            case right:
                InDirection = "right";
                break;
        }
    }
    if(InDirection == "up")
    {
        if(!direction)
            direction = "up"
        if(collision("up"))
            return;

        y -= STEP
        echo.style.top = y + "px"

        if(i >= 3)
            i = 0
        else
            i++

        echo.style.backgroundImage = `url('${PATH}${direction}_${tabi[i]}.png')`

        if(i == 0 || i == 2)
        {
            interWalk= setInterval(walk, TIMEINTER);
            clearTimeout(timeout);
        }
        else
        {
            timeout = setTimeout(walk, TIMEINTER, direction);
            clearInterval(interWalk);
        }
        
    }
    else if(InDirection == "left")
    {
        if(!direction)
            direction = "left"
        if(collision("left"))
            return;

        x -= STEP
        echo.style.left = x + "px"

        if(i >= 3)
            i = 0
        else
            i++

        echo.style.backgroundImage = `url('${PATH}${direction}_${tabi[i]}.png')`

        if(i == 0 || i == 2)
        {
            interWalk= setInterval(walk, TIMEINTER);
            clearTimeout(timeout);
        }
        else
        {
            timeout = setTimeout(walk, TIMEINTER, direction);
            clearInterval(interWalk);
        }
        
    }
    else if(InDirection == "down")
    {
        if(!direction)
            direction = "down"
        if(collision("down"))
            return;

        y += STEP
        echo.style.top = y + "px"

        if(i >= 3)
            i = 0
        else
            i++

        echo.style.backgroundImage = `url('${PATH}${direction}_${tabi[i]}.png')`

        if(i == 0 || i == 2)
        {
            interWalk= setInterval(walk, TIMEINTER);
            clearTimeout(timeout);
        }
        else
        {
            timeout = setTimeout(walk, TIMEINTER, direction);
            clearInterval(interWalk);
        }
    }
    else if(InDirection == "right")
    {
        if(!direction)
            direction = "right"
        if(collision("right"))
            return;

        x += STEP
        echo.style.left = x + "px"

        if(i >= 3)
            i = 0
        else
            i++

        echo.style.backgroundImage = `url('${PATH}${direction}_${tabi[i]}.png')`

        if(i == 0 || i == 2)
        {
            interWalk= setInterval(walk, TIMEINTER);
            clearTimeout(timeout);
        }
        else
        {
            timeout = setTimeout(walk, TIMEINTER, direction);
            clearInterval(interWalk);
        }
    }

    if(InDirection != false)
        highGrass()

}



function collision(direction)
{
    let trees = document.getElementsByClassName("tree")

    let collision = false
    Array.from(trees).forEach((tree) => {
        let echoRight = 0;
        let echoLeft = 0;
        let echoTop = 0;
        let echoBottom = 0;
        
        // switch(direction){
        //     case "right":
        //         echoRight += STEP    
        //         break;

        //     case "left":
        //         echoLeft -= STEP
        //         break;
            
        //     case "down":
        //         echoBottom += STEP
        //         break;

        //     case "up":
        //         echoTop -= STEP
        //         break;
        // }
        
        echoLeft += echo.offsetLeft;
        echoRight += echoLeft + echo.clientWidth;
        echoTop += echo.offsetTop;
        echoBottom += echoTop + echo.clientHeight;

        let treeLeft = tree.offsetLeft;
        let treeRight = treeLeft + tree.clientWidth;
        let treeTop = tree.offsetTop;
        let treeBottom = treeTop + tree.clientHeight;

        

        let collisionRight = treeRight <= echoLeft && echoRight <= treeRight + 64
        let collisionLeft = treeLeft <= echoRight && echoLeft <= treeLeft - 64
        let collisionTop = treeTop <= echoBottom && echoTop <= treeTop - 64
        let collisionBottom = treeBottom <= echoTop && echoBottom <= treeBottom + 64


        let alignX = treeTop >= echoTop && treeBottom <= echoBottom;
        let alignY = treeLeft >= echoLeft && treeRight <= echoRight;

        if(collisionRight && alignX && direction == "left"){
            collision = true;
        }
        if(collisionLeft && alignX && direction == "right"){
            collision = true;
        }
        if(collisionBottom && alignY && direction == "up"){
            collision = true;
        }
        if(collisionTop && alignY && direction == "down"){
            collision = true;
        }
    });
    return collision;
}


function highGrass(){
    let highgrass = document.getElementsByClassName("highGrass")
    let standingOn = false

    Array.from(highgrass).forEach((grassBlock) =>{
        if(echo.offsetLeft == grassBlock.offsetLeft && echo.offsetTop == grassBlock.offsetTop)
            standingOn = true
    })

    if(standingOn){
        let rand = Math.ceil(Math.random() * 5);

        if(rand < 5)
            return;

        console.log("combat")

        let wildPoke = document.createElement("img");
        wildPoke.className = "wildPokemon"
        wildPoke.src = "https://img.pokemondb.net/sprites/black-white/anim/shiny/rayquaza.gif"
        wildPoke.hp = 100
        wildPoke.pokeName = "Rayquaza"

        let myPoke = document.createElement("img")
        myPoke.className = "myPoke"
        myPoke.src = "https://img.pokemondb.net/sprites/black-white/anim/back-normal/infernape.gif"
        myPoke.hp = 100
        myPoke.pokeName = "Simiabraz"



        let interface = document.createElement("div")

        interface.className = "menuCombat"

        let buttons = document.createElement("div")
        buttons.className = "buttons"
        
        let attack = document.createElement("button")
        attack.className = "attack"
        attack.innerHTML = "attack"

        let attackMenu = document.createElement("div")
        attackMenu.className = "attackMenu"

        let buttonAttack1 = document.createElement("button");
        let buttonAttack2 = document.createElement("button");
        let buttonAttack3 = document.createElement("button");
        let buttonAttack4 = document.createElement("button");
        let backbutton = document.createElement("button")

        buttonAttack1.className = "attackButton"
        buttonAttack2.className = "attackButton"
        buttonAttack3.className = "attackButton"
        buttonAttack4.className = "attackButton"
        backbutton.className = "backButton"

        buttonAttack1.innerHTML = "lanceFlamme"
        buttonAttack2.innerHTML = "Match Punch"
        buttonAttack3.innerHTML = "roue de feu"
        buttonAttack4.innerHTML = "acrobatie"
        buttonAttack1.damage = 50;
        buttonAttack2.damage = 30;
        buttonAttack3.damage = 40;
        buttonAttack4.damage = 45;

        backbutton.innerHTML = "Go back"

        attackMenu.appendChild(buttonAttack1)
        attackMenu.appendChild(buttonAttack2)
        attackMenu.appendChild(buttonAttack3)
        attackMenu.appendChild(buttonAttack4)
        attackMenu.appendChild(backbutton)

        
        let quit = document.createElement("button")
        quit.className = "quit"
        quit.innerHTML = "quit"
        
        buttons.appendChild(attack)
        buttons.appendChild(quit)
        
        let pokemons = document.createElement("div")
        pokemons.className = "pokemons"

        pokemons.appendChild(wildPoke)
        pokemons.appendChild(myPoke)
        
        interface.appendChild(pokemons)
        interface.appendChild(buttons)
        interface.appendChild(attackMenu)
        
        body.appendChild(interface)
        
        
        attack.onclick = ()=>{
            buttons.style.display = "none"
            attackMenu.style.display = "flex"
        }

        backbutton.onclick = ()=>{
            buttons.style.display = "flex"
            attackMenu.style.display = "none"
        }

        quit.onclick = ()=>{
            console.log("Combat Terminé")
            interface.remove();
            interWalk= setInterval(walk, TIMEINTER);
        }

        let attacks = document.getElementsByClassName("attackButton")
        Array.from(attacks).forEach((attack) =>{
            attack.onclick = ()=>{
                wildPoke.hp -= attack.damage
                console.log(myPoke.pokeName + " utilise " + attack.innerHTML)
                if(wildPoke.hp <= 0){
                    let h1 = document.createElement("h1")
                    h1.innerHTML = "Vous avez battu " + wildPoke.pokeName
                    wildPoke.remove()
                    attackMenu.remove()
                    interface.appendChild(h1)
                    let victory =  setTimeout(quit.onclick, 3000)
                }
                else
                    console.log(wildPoke.hp)
            }
        })

        clearInterval(interWalk);
    }
}