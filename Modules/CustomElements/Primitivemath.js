class PrimitiveMath extends HTMLElement {
    constructor() { 
        super();
        
        //Define attributes
        const matStr = this.getAttribute('m');
        
        //Prepare variables
        var shadow = this.attachShadow({mode: 'open'});
      
        var mathStyle = 'margin-left:3px; margin-right:3px;'

        const generalString = "../Assets/Chapter1/Talsystemmer/TalBilleder/CustomElement/";
        var specificString = "";
        var indexer = 0;

        var spaceNode = document.createElement("img");
        spaceNode.setAttribute("src","../Assets/Chapter1/Talsystemmer/TalBilleder/CustomElement/space.png");
        spaceNode.style=mathStyle;
        spaceNode.setAttribute("height","20em")

        //Construct the math by substitution:
        var matLength = matStr.length;
        while(indexer < matLength) {

            var newNode = document.createElement("img");
            newNode.style=mathStyle;
            newNode.setAttribute("height","12em")

            var isNumber = false;
            var isPrefix = false; 

            switch(matStr.charAt(indexer)) {
               
                case '(': specificString="(.png"; break;
                case ')': specificString=").png"; break;
                case '+': specificString="plus.png"; break;
                case '-': specificString="minus.png"; break;
                case '*': specificString="gange.png"; break;
                case '/': specificString="divider.png"; break;
                case '=': specificString="ligmed.png"; break;
                case 'h': specificString="h.png"; break;
                case '.': specificString="punktum.png"; break;
                case 'q': specificString="10Symbol.png"; break;
               
                case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': 
                    isNumber=true; break;
                default: 
                    isPrefix=true; indexer++; break;
            }

            if(!isPrefix && !isNumber) {
                newNode.setAttribute("src",generalString+specificString);
                shadow.appendChild(newNode);
                indexer++;
            }
            else if(!isPrefix) {
                //Get final index of number
                var fI = indexer + 1; //fI = finalIndex
                var fIC = matStr.charAt(fI);
                while((fIC=='0'||fIC =='1'||fIC =='2'||fIC =='3'||fIC =='4'||fIC =='5'||fIC =='6'||fIC =='7'||fIC =='8'||fIC =='9') && fI < matLength) {
                    fI++; fIC = matStr.charAt(fI);
                    }          

                //Determine what symbol to draw (Names matching in directory):
                var chosenSymbol = matStr.charAt(indexer - 1);
                switch(chosenSymbol) {
                    case 'A': chosenSymbol="A";break;
                    case 'B': chosenSymbol="B";break;
                    case 'C': chosenSymbol="C";break;
                    case 'D': chosenSymbol="D";break;
                    case 'E': chosenSymbol="E";break;
                    case 'F': chosenSymbol="F";break;
                    case 'G': chosenSymbol="G";break;
                    case 'W': chosenSymbol="w";break;
                    case 'H': chosenSymbol="H"; break;
                    case 'I': chosenSymbol="I"; break;
                    case 'J': chosenSymbol="J"; break;
                    default:  chosenSymbol="bar"
                }

                if(chosenSymbol == null) {chosenSymbol = "bar";} 
                
                //Determine how many times to draw the symbol.:
                var strNum = matStr.substring(indexer,fI); 
                var symbolCount = parseInt(matStr.substring(indexer,fI));

                //Construct the number to shadow DOM
                var qoutient = Math.floor(symbolCount/4); 
                var remainder = symbolCount - qoutient*4; 

                if(remainder > 0) {
                    newNode.setAttribute("src",generalString + chosenSymbol + remainder.toString() + ".png");
                    shadow.appendChild(newNode);
                } else if (strNum == 0) {
                    newNode.setAttribute("src",generalString + chosenSymbol + "0.png");
                    shadow.appendChild(newNode);
                }

                for(let i = 0; i < qoutient; i++) {
                    var FourNode = document.createElement("img");
                    FourNode.setAttribute("src",generalString + chosenSymbol + "4.png");
                    FourNode.style=mathStyle;
                    FourNode.setAttribute("height","12em")

                    shadow.appendChild(FourNode);
                    //shadow.appendChild(spaceNode.cloneNode());

                    FourNode.style=mathStyle;               
                }       

                //Advance the indexer:
                indexer += strNum.length;

            }
            
        }

    }
}
customElements.define('p-m', PrimitiveMath);

export {PrimitiveMath}

