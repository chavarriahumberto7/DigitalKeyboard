
const keys=[
[
["1","!"],
["2",'"'],
["3","#"],
["4","$"],
["5","%"],
["6","&"],
["7","/"],
["8","("],
["9",")"],
["0","="],
["'","?"],
["¡","¿"],
],
[
["q","Q"],
["w","W"],
["e","E"],
["r","R"],
["t","T"],
["y","Y"],
["u","U"],
["i","I"],
["o","O"],
["p","P"],
["`","^"],
["+","*"]

],
[
    ["MAYUS","MAYUS"],
    ["a","A"],
    ["s","S"],
    ["d","D"],
    ["f","F"],
    ["g","G"],
    ["h","H"],
    ["j","J"],
    ["k","K"],
    ["l","L"],
    ["ñ","Ñ"],
    ["´","{"]
    
],
[
    ["SHIFT","SHIFT"],
    ["<",">"],
    ["z","Z"],
    ["x","X"],
    ["c","C"],
    ["v","V"],
    ["b","B"],
    ["n","N"],
    ["m","M"],
    [",",";"],
    [".",":"],
    ["-","_"]
    
],
[
    ["WIN","WIN"],
    ["CTRL","CTRL"],
    ["ALT","ALT"],
    ["SPACE","SPACE"],
    ["ALT","ALT"],
    ["CTRL","CTRL"]
]
];

let mayusStatus=false;
let shiftStatus=false;
let current=null;

renderKeyboard();
function renderKeyboard(){
    const keyboardContainer=document.querySelector("#keyboard-container");
    let empty=`<div class="key-empty"></div>`;

    let layers=keys.map((row)=>{
        return row.map((key)=>{
            switch (key[0]) {
                case "SHIFT":
                    return `<button class="key key-shift ${shiftStatus? 'activated':''}">${key[0]}</button>`;                 
                    break;
                    case "MAYUS":
                        return `<button class="key key-mayus ${mayusStatus? 'activated':''}">${key[0]}</button>`;                 
                        
                        break;
                        case "SPACE":
                            return `<button class="key key-space"></button>`;                 
                        
                        default:
                            test=`<button class="key key-normal">${shiftStatus? key[1]
                                :mayusStatus && 
                                key[0].toLowerCase().charCodeAt(0)>=97 &&
                                key[0].toLowerCase().charCodeAt(0)<=122 
                                ? key[1]
                                :key[0]
                                }</button>`; 
                            return test;              
                    break;
            }

        });
    });
    layers[0].push(empty);
    layers[1].unshift(empty);
    const htmlLayers=layers.map((r)=>{
        return r.join("");
    });
    

    keyboardContainer.innerHTML="";
    htmlLayers.forEach((layer)=>{
        return keyboardContainer.innerHTML+=`
        <div class="layer">${layer}</div>`;
    });

    document.querySelectorAll(".key").forEach((key)=>{
        key.addEventListener("click",(e)=>{
            if(current)
            {
                if(key.textContent=="SHIFT")
                {
                    console.log(key.textContent);
                    shiftStatus=!shiftStatus;

                    
                }
                else if(key.textContent=="MAYUS")
                {
                    mayusStatus=!mayusStatus
                    
                    

                }
                else if(key.textContent==""){
                    current.value+=" "
                }
                else{
                    
                    if  (shiftStatus){
                        shiftStatus=!shiftStatus;
                        
                    }
                    current.value+=key.textContent;
                    
                }
                renderKeyboard();
                current.focus();
            }
            
            
        });
    });

}

document.querySelectorAll("input").forEach((input)=>{
    input.addEventListener("focusin",(e)=>{
    current= e.target;
    })
    
});