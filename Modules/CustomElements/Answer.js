var QuestionAnswerCSS = "th, td {border: 1px solid black;padding: 5px;}@font-face {font-family: myFirstFont;    src: url(Fonts/Serif/cmunrm.woff);}@font-face {    font-family: myFirstFont;    src: url(Fonts/Serif/cmunbx.woff);    font-weight: bold;}@font-face {    font-family: myFirstFont;    src: url(Fonts/Serif/cmunti.woff);    font-style:italic}@font-face {    font-family: myFirstFont;    src: url(Fonts/Serif/cmunbi.woff);    font-weight: bold;    font-style:italic} .t{line-height: 23px; font-family:'myFirstFont';word-wrap: break-word; margin-top:12px; margin-bottom:0px; padding: 0; text-align:justify;} .cent{margin-top:12px; margin-bottom:0px; padding: 0; text-align:center; margin-left:auto;} .unity{margin-top:15px; margin-bottom:20px; margin-left:8px; width:480px; height:300px; border:solid} .pic {width: 440px; margin-top:15px; margin-left:17px; margin-bottom:0px;} .picB {width: 440px; margin-top:15px; margin-left:17px; margin-bottom:0px; border:solid;} .Spic {margin-top:15px; display: block;margin-left: auto;margin-right: auto;} .SpicB{margin-top:15px; display: block;margin-left: auto;margin-right: auto;border:solid;} .Definition { background-color: rgb(231, 200, 200); padding:10px; margin-top: 15px; width:90%; margin-left:2.5%; border:solid;} .Theory { background-color: rgb(139,159,238); padding:10px; margin-top: 15px; width:90%; margin-left:2.5%; } .Lemma { background-color:rgb(118, 128, 168); padding:10px; margin-top: 15px; width:90%; margin-left:2.5%; } .Axiom { background-color:rgb(102, 173,142); padding:10px; margin-top: 15px; width:90%; margin-left:2.5%; } .Proof { margin-top: 15px; width:98%; border-left:solid; padding-top:0%; padding-bottom:0%; padding-left:2%; }"

class AnswerBox extends HTMLElement {

    constructor() {
        super();

        //Define attributes
        const content = this.getAttribute('content');
        
        const boxType = this.getAttribute("t");
        const hintNumber = this.getAttribute("n");
        const optionalQuestionNumber = this.getAttribute("questionNumber");
        
        const tabColour = this.getAttribute("tabColour");
        const bodyColour = this.getAttribute("bodyColour");
        const hasTopMargin = this.getAttribute("margin");
        
        var customWidth = this.getAttribute("customWidth");

        if(content != null) {

            //Set up shadow and style:
            var shadow = this.attachShadow({mode: 'open'});

            const style = document.createElement('style');
            style.textContent = QuestionAnswerCSS;

            var width = (customWidth == null) ? "500" : customWidth;


            //Create title
            var BoxTitle = document.createElement("p");
            var BoxTitleString = "";

            if(boxType == null){
                BoxTitleString = "Answer " 
            }
            else if(boxType == "h") {
                BoxTitleString = "Hint ";
                if(hintNumber != null){
                    BoxTitleString = BoxTitleString + "#" + hintNumber;
                }
            }
            else if (boxType == "t") {
                BoxTitleString = "Trin #" + hintNumber; 
            }
            else if(boxType == "q") {
                BoxTitleString = "Spørgsmål " + optionalQuestionNumber;
            } 
            else {
                BoxTitleString=boxType;
            }

            BoxTitle.innerHTML = "<b>" + BoxTitleString + "</b>";
            BoxTitle.style = "position: relative; top: -40px; left: 30px; font-family: 'myFirstFont' ; font-size: 20px; color:black"


            //Create tab:
            var tab = document.createElement("div");

                //Set the colour 
            var TabC; 
            var BodyC;

            if(boxType == "h") {
                TabC  = "rgb(192,209,132)"; 
                BodyC = "rgb(211, 219, 179)";
            }
            else if (boxType == "t") {
                TabC  = "rgb(129, 168, 70)"; 
                BodyC = "rgb(211, 219, 179)";
            }
            else if(boxType == "q") {
                TabC  = "rgb(78, 230, 222)"; 
                BodyC = "rgb(113, 187, 183)";
            } 
            else if(tabColour != null || bodyColour != null) {
                if(tabColour != null) {TabC = tabColour;}
                else {TabC="rgb(175,128,161)";}

                if(bodyColour != null) {BodyC = bodyColour;}
                else {BodyC = "rgb(211, 219, 179)"}
            }
            else{
                TabC = "rgb(175,128,161)"; BodyC="rgb(211, 219, 179)";
            } 
                //

                //Set the top margin: 
            var topMargin = (hasTopMargin != null) ? "16" : "0";
                //

                //Create the dropdown button:
            var DropdownButton = document.createElement("img");
            DropdownButton.setAttribute("id", "dropdownButton");
            DropdownButton.src = "Assets/GUI/DropDown.png";

            DropdownButton.style = "width: 20px; height:20px;" + 
                                    "position: relative;" + 
                                    "left: 5px; top: 5px;";
                //

            tab.style = "width: " + width + "px;" +
                        "margin-left: " + (0.5*(500 - width)).toString() + "px;" +
                        "margin-top: " + topMargin + "px;" +
                        "background-color:" + TabC;
            tab.style.height = "30px";  

            tab.appendChild(DropdownButton);
            tab.appendChild(BoxTitle);

            
            //Content:
            var contentBackground = document.createElement("div");    
            var contentHolder = document.createElement("div");
            contentHolder.setAttribute("id","holder");

            contentHolder.innerHTML = content; 
            
            contentHolder.style = "width: " + (parseInt(width) - 20).toString() + "px;" +
                                "position: relative;" + 
                                "top: 10px;" + 
                                "margin-left: 10px;";

            contentBackground.style = "width: " + width + "px;" +
                                    "margin-left: " + (0.5*(500 - width) ).toString() + "px;" +
                                    "background-color: " + BodyC;

            contentBackground.appendChild(contentHolder);
            

            //Add content to mask: 
            var Masker = document.createElement("div");
            Masker.setAttribute("id", "masker"); 

            Masker.appendChild(contentBackground);
            
            Masker.style = "width: " + width.toString() + "px; " +
                            "height: " + (0).toString() + "px; " +
                            "-webkit-clip-path: inset(0 0 " + (0).toString() + "% 0);";          

            //Add to shadow-dom:
            shadow.appendChild(style);
            shadow.appendChild(tab); 
            shadow.appendChild(Masker); 
        }
    }

    connectedCallback() { //Only runs after the element is initialized and loaded into a document

        //Handle masking/button-functionality: 
        var shadow = this.shadowRoot;
        
        var customWidth = this.getAttribute("customWidth");
        var width = (customWidth == null) ? "500" : customWidth;
        
        var isDisplayed = false;
        shadow.getElementById("dropdownButton").addEventListener("click", function() {

            if(isDisplayed) {
                shadow.getElementById("masker").style = "height: 0px; " +
                            "-webkit-clip-path: inset(0 0 100% 0);" + 
                            "width: " + width.toString() + "px; ";
                isDisplayed=false;
            }
            else {
                shadow.getElementById("masker").style = "height: " + (shadow.getElementById("holder").clientHeight).toString() + "px; " +
                            "-webkit-clip-path: inset(0, 0, 0, 0);" + 
                            "width: " + width.toString() + "px; ";
                isDisplayed=true;
            }

        })

    }
}
customElements.define('answer-box', AnswerBox);

export {AnswerBox};