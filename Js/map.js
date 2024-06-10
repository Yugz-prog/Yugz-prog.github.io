const TILE = [
    "t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t",
    "t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t",
    "t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t",
    "t","t","t","g","g","g","g","g","g","g","g","g","g","g","g","t","t","t",
    "t","t","t","g","g","g","g","g","g","g","g","g","g","g","g","t","t","t",
    "t","t","t","g","g","g","g","g","g","g","g","g","g","g","g","t","t","t",
    "t","t","t","g","g","g","h","h","h","t","t","t","g","g","g","t","t","t",
    "t","t","t","g","g","g","h","h","h","t","t","t","g","g","g","t","t","t",
    "t","t","t","g","g","g","h","h","h","t","t","t","g","g","g","t","t","t",
    "t","t","t","g","g","g","g","g","g","g","g","g","g","g","g","t","t","t",
    "t","t","t","g","g","g","g","g","g","g","p","g","g","g","g","t","t","t",
    "t","t","t","g","g","g","g","g","g","g","g","g","g","g","g","t","t","t",
    "t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t",
    "t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t",
    "t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t"
]
const ROW = 18
const COLUMN = 18
let l = 0
let y = 0
const TILE_SIZE = 64
let treeNumber = null;
let count = null;
let treeRow = false;
let treesRow = false;
let treesMap = new Map();

for(let j= 1; j<=ROW;j++){

    let x = 0

    for(let i = 0; i<COLUMN;i++){

        let div = document.createElement("div")

        if(TILE[l + i] == "g")
            div.className = "grass"


        else if(TILE[l + i] == "t")
        {
            if(!treesMap.has(l+i)){
                treesMap.set((l+i), 0)
                treesMap.set((l+i+1), 1)
                treesMap.set((l+i+2), 2)
                treesMap.set((l+ROW+i), 3)
                treesMap.set((l+ROW+i+1), 4)
                treesMap.set((l+ROW+i+2), 5)
                treesMap.set((l+(ROW * 2)+i), 6)
                treesMap.set((l+(ROW * 2)+i+1), 7)
                treesMap.set((l+(ROW * 2)+i+2), 8)
                treeNumber = 0
            }
            else
                treeNumber = treesMap.get(l+i)

            
            div.className = "tree"
            div.style.backgroundImage = "url(img/tree/tile00"+ treeNumber + ".png)";


            let divG = document.createElement("div")
            divG.className = "grass"

            divG.style.left = `${x}px`
            divG.style.top = `${y}px`
    
            body.appendChild(divG)
        }

        else if(TILE[l + i] == "h"){
            let OnLeft = false;
            let OnRight = false;
            let OnTop = false;
            let OnBottom = false;
            div.className = "highGrass"

            if(TILE[l + i - 1] == "h")
                OnLeft = true
            if(TILE[l + i - ROW] == "h")
                OnTop = true;
            if(TILE[l + i + 1] == "h")
                OnRight = true
            if(TILE[l + i + ROW] == "h")
                OnBottom = true;

            if(!OnLeft && OnRight && !OnTop && OnBottom)
                div.style.backgroundImage = "url(img/HighGrass/TL.png)";

            else if(OnLeft && OnRight && !OnTop && OnBottom)
                div.style.backgroundImage = "url(img/HighGrass/TM.png)";

            else if(OnLeft && !OnRight && !OnTop && OnBottom)
                div.style.backgroundImage = "url(img/HighGrass/TR.png)";

            else if(!OnLeft && OnRight && OnTop && OnBottom)
                div.style.backgroundImage = "url(img/HighGrass/ML.png)";

            else if(OnLeft && OnRight && OnTop && OnBottom)
                div.style.backgroundImage = "url(img/HighGrass/M.png)";

            else if(OnLeft && !OnRight && OnTop && OnBottom)
                div.style.backgroundImage = "url(img/HighGrass/MR.png)";

            else if(!OnLeft && OnRight && OnTop && !OnBottom)
                div.style.backgroundImage = "url(img/HighGrass/BL.png)";

            else if(OnLeft && OnRight && OnTop && !OnBottom)
                div.style.backgroundImage = "url(img/HighGrass/BM.png)";

            else if(OnLeft && !OnRight && OnTop && !OnBottom)
                div.style.backgroundImage = "url(img/HighGrass/BR.png)";

            let divG = document.createElement("div")
            divG.className = "grass"

            divG.style.left = `${x}px`
            divG.style.top = `${y}px`
    
            body.appendChild(divG)

        }


        else if(TILE[l + i] == "p")
        {
            div.id = "echo"

            let divG = document.createElement("div")
            
            divG.className = "grass"

            divG.style.left = `${x}px`
            divG.style.top = `${y}px`
    
            body.appendChild(divG)    
        }

        div.style.left = `${x}px`
        div.style.top = `${y}px`

        body.appendChild(div)

        x += TILE_SIZE
    }

    y += TILE_SIZE

    l += ROW
}