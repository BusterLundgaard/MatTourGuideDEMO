(function (global) {
    'use strict';

    const document = global.document;
    let styleNode;

    const states = {start: 1, loading: 2, ready: 3, typesetting: 4, error: 5};
    let state = states.start;

    let src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js';
    let mathjaxHub;
    let typesets = [];
    

    function getStyleNode() { //Gets some important "style node" by filtering out *all* style nodes in the document. 
        
        const styleNodes = document.querySelectorAll('style');
        
        const sn = Array.prototype.filter.call(styleNodes, function(n) {
            return n.sheet && n.sheet.cssRules.length > 100
                && n.sheet.cssRules[0].selectorText === '.mjx-chtml';
        });
        
        styleNode = sn[0];
    }


    // precondition: state === states.ready
    function flush_typesets() {
        
        if (!typesets.length) return; //Stop calling the function if the typeset doesn't exist
        
        const jaxs = [];
        const items = [];

        typesets.forEach(function(item) {
            
            const div = document.createElement('div');

            div.style.position = 'fixed';
            div.style.top = 0;
            div.style.left = '99999px'; //Seems very hobo. 

            const script = document.createElement('script');
            script.type = item[1] ? 'math/tex; mode=display' : 'math/tex'; //Each "Item" most likely has it's data in [0] and it's optional "display" metadata in [1].
            script.text = item[0];
            div.appendChild(script);

            document.body.appendChild(div);
            jaxs.push(script);
            items.push([div, item[2]]); //No clue what's in the third element of the items. 
        });

        typesets = [];
        state = states.typesetting;

        mathjaxHub.Queue(['Typeset', mathjaxHub, jaxs]);
        mathjaxHub.Queue(function() {
            
            if (!styleNode){getStyleNode();} //Makes sure the style node does not already exist and gets it. 

            items.forEach(function(item) {

                const div = item[0];
                const result = div.firstElementChild.tagName === 'SPAN' ? div.firstElementChild : null;
                
                item[1](result, styleNode);
                document.body.removeChild(div);

            });

            state = states.ready;
            flush_typesets();
        });
    }


    function load_library() {

        state = states.loading;

        global.MathJax = { //Because this is Javascript, you can "add" a property to a class easily like this. He's probably "adding" this MathJax property, and MathJax will then read it upon loading. //Each "Item" most likely has it's data in [0] and it's optional "display" metadata in [1].
            skipStartupTypeset: true,
            showMathMenu: false,
            jax: ['input/TeX', 'output/CommonHTML'],
            TeX: {
                extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
            },
            AuthorInit: function () {
                mathjaxHub = global.MathJax.Hub;
                mathjaxHub.Register.StartupHook('End', function() { //His own function to activate when MathJax is done loading. 

                    state = states.ready; //Set the state to ready
                    flush_typesets(); //I think that "flush typesets" might be his way of saying "render the math". 
                });
            }
        };

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = true;
        
        script.onerror = function () { //Just an error message in case it fails. 
            console.warn('Error loading MathJax library ' + src);
            state = states.error;
            typesets = [];
        };

        document.head.appendChild(script); //He appends the script with a MathJax reference to the head, in turn "downloading it". 
    }


    class MathTexController extends HTMLElement {

        connectedCallback() {
            if (this.hasAttribute('src')) {src = this.getAttribute('src');}
            if (!this.hasAttribute('lazy')) {load_library();}
        }

        typeset(math, displayMode, cb) {
            if (state === states.error) {return;}

            typesets.push([math, displayMode, cb]);

            if (state === states.start) {load_library();}
            else if (state === states.ready) {flush_typesets();}
        }

    }


    global.customElements.define('math-tex-controller', MathTexController);
    
})(window);
