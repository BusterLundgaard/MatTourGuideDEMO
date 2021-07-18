var QuestionAnswerCSS = "th, td {border: 1px solid black;padding: 5px;}@font-face {font-family: myFirstFont;    src: url(Fonts/Serif/cmunrm.woff);}@font-face {    font-family: myFirstFont;    src: url(Fonts/Serif/cmunbx.woff);    font-weight: bold;}@font-face {    font-family: myFirstFont;    src: url(Fonts/Serif/cmunti.woff);    font-style:italic}@font-face {    font-family: myFirstFont;    src: url(Fonts/Serif/cmunbi.woff);    font-weight: bold;    font-style:italic} .t{line-height: 23px; font-family:'myFirstFont';word-wrap: break-word; margin-top:12px; margin-bottom:0px; padding: 0; text-align:justify;} .cent{margin-top:12px; margin-bottom:0px; padding: 0; text-align:center; margin-left:auto;} .unity{margin-top:15px; margin-bottom:20px; margin-left:8px; width:480px; height:300px; border:solid} .pic {width: 440px; margin-top:15px; margin-left:17px; margin-bottom:0px;} .picB {width: 440px; margin-top:15px; margin-left:17px; margin-bottom:0px; border:solid;} .Spic {margin-top:15px; display: block;margin-left: auto;margin-right: auto;} .SpicB{margin-top:15px; display: block;margin-left: auto;margin-right: auto;border:solid;} .Definition { background-color: rgb(231, 200, 200); padding:10px; margin-top: 15px; width:90%; margin-left:2.5%; border:solid;} .Theory { background-color: rgb(139,159,238); padding:10px; margin-top: 15px; width:90%; margin-left:2.5%; } .Lemma { background-color:rgb(118, 128, 168); padding:10px; margin-top: 15px; width:90%; margin-left:2.5%; } .Axiom { background-color:rgb(102, 173,142); padding:10px; margin-top: 15px; width:90%; margin-left:2.5%; } .Proof { margin-top: 15px; width:98%; border-left:solid; padding-top:0%; padding-bottom:0%; padding-left:2%; }"

class QuestionStart extends HTMLElement {
    constructor() {
        super();

        //Get attributes
        const content = this.getAttribute('content');

        const group1 = this.getAttribute('1');
        const group2 = this.getAttribute('2');
        const group3 = this.getAttribute('3');
        
        const optionalTitle = this.getAttribute("title");
        
        const hasTopMargin = this.getAttribute("noTopMargin");
        const BigTopMargin = this.getAttribute('bigTop');

        var customWidth = this.getAttribute("customWidth");

        if(content != null) {

            //Create shadow and style:
            var shadow = this.attachShadow({mode: 'open'});

            const style = document.createElement('style');
            style.textContent = QuestionAnswerCSS;

            var width = (customWidth == null) ? "500" : customWidth;

            //Create the question title
            var BoxTitle = document.createElement("p");
            var BoxTitleString = "Spørgsmål";
    
            if(group1 != null) {BoxTitleString += (" " + group1);}  
            if(group2 != null) {BoxTitleString += ("." + group2);}  
            if(group3 != null) {BoxTitleString += ("." + group3);}  
            BoxTitleString += ": "
            if(optionalTitle != null) {BoxTitleString += (" " + optionalTitle);}

            BoxTitle.innerHTML = "<b>" + BoxTitleString + "</b>";
            BoxTitle.style = "position: relative;" + 
                             "top: 2px;" + 
                             "left: 8px;" + 
                             "margin-top: 0px;" +
                             "margin-bottom: 0px;" +
                             "font-family: 'myFirstFont';" + 
                             "font-size: 20px;" + 
                             "color:black"

            //Create the tab 
            var tab = document.createElement("div");

            var topMargin;
            if(BigTopMargin != null) {topMargin=25}
            else if(hasTopMargin!=null) {topMargin=0}
            else {topMargin=15}

            tab.style = "width: " + width + "px;" +
                        "background-color: rgb(78, 230, 222);" +
                        "margin-left: " + (0.5*(500 - width) ).toString() + "px;" + 
                        "px; margin-top: " + topMargin.toString() + "px;"; 
            tab.style.height = "30px";
            
            tab.appendChild(BoxTitle);

            //Handle the content and content background:
            var contentHolder = document.createElement("div");
            var contentBackground = document.createElement("div");    

            contentHolder.innerHTML = content;
            contentHolder.style = "width: " + (parseInt(width) - 20).toString() + "px;" + 
                                    "position: relative;" + 
                                    "top: 10px;" + 
                                    "margin-left: 10px;";
        
            contentBackground.appendChild(contentHolder);
            contentBackground.style = "width: " + width + "px;" +
                                        "position: relative;" +
                                        "top: 0px;" +
                                        "left: " + (0.5*(500 - width)).toString() + "px;" + 
                                        "background-color: rgb(113, 187, 183);";

            //contentHolder.style.height = ((NaN)*0.01).toString() + "px"; //No clue what happens here or why it works. 
            //contentBackground.style.height = ((NaN)*0.01).toString() + "px";                

            // Attach the created elements to the shadow dom
            shadow.appendChild(style);
            shadow.appendChild(tab);
            shadow.appendChild(contentBackground);  

        }
    }

}
customElements.define("q-stion",QuestionStart);

export {QuestionStart}