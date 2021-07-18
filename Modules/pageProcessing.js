const insertBoxContent = function(str, t) {

    //Set the regEx pattern to get the content between.
    var myReg = t=="q-stion" ? /(?<=>)(.*)(?=<\/q-stion>)/g : 
                            /(?<=>)(.*)(?=<\answer-box>)/g

    var contentStartIndex = str.search(/>/g);
    var content = myReg.exec(str)[0];

    return s.substring(0, contentStartIndex) +
        "content=\"" + HtmlToContent(content) + 
        "\"><" + t + ">";
}

const HtmlToContent = function(str) {

    str.replace("<", "&#60");
    str.replace(">", "&#62");
    str.replace('"', "&#34");

    return str; 
}

const processMath = function(str) {

    str=str.replace(/(?<=\_\()(.*)(?=\_\))/g, (s) => {return customMathJaxFilter(s)})

    str=str.replace(/\_\(\$/g, "<math-tex mode='display'>");
    str=str.replace(/\_\(/g, "<math-tex>");
    str=str.replace(/\_\)/g, "</math-tex>");

    return str;
}

const customMathJaxFilter = function(str) {

    //Multiplication:
    str=str.replace(/\*/g, " \\cdot ");

    //Lines and segments:
    str=str.replace(/\\Lin/g, "\\overleftrightarrow");
    str=str.replace(/\\Seg/g, "\\overline");
    str=str.replace(/\\Ray/g, "\\overrightarrow");

    //Vectors:
    str=str.replace(/\\Vec\[.*\]/i, (s) => {
        
        params = s.substring[5, s.length - 1].split(",");
        
        var insideContent = "";
        for(var i = 0; i < params.length; i++) {
            insideContent += params[0];
            if(i != params.length - 1){insideContent += "\\\\";}
        }
        
        var matrixType = s.charAt[2]=='C' ? "pmatrix" : "smallmatrix";

        return "\\begin{" + matrixType + "}" + insideContent + "\\end{" + matrixType + "\}";

    });
    
    //Derivatives:
    str=str.replace(/¤./g, (s) => {
        return "\\frac{d}{d" + s.charAt[1] + "}";
    });

    return str;
}

export {insertBoxContent, HtmlToContent, processMath, customMathJaxFilter};
