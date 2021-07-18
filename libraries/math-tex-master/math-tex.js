/*
Typesets math written in (La)TeX, using [MathJax](http://mathjax.org).

##### Example

    <math-tex>c = \sqrt{a^2 + b^2}</math-tex>

##### Example

    <math-tex mode="display">\sum_{k=1}^n k = \frac{n (n + 1)}{2}</math-tex>

@element math-tex
@version 0.3.2
@homepage http://github.com/janmarthedal/math-tex/
*/
(function(global) {
    'use strict';

    const TAG_NAME = 'math-tex'; 
    const CONTROLLER_TAG_NAME = 'math-tex-controller';
    const mutation_config = {childList: true, characterData: true, attributes: true, subtree: true};
   
    let handler;


    function check_handler() {
        
        if (handler) return; //There's no problem or reason to continue if the handler already exists. 
        
        handler = document.querySelector(CONTROLLER_TAG_NAME) || document.createElement(CONTROLLER_TAG_NAME); //It's either set to be a selected element of the DOM or a newly created element (if one doesn't already exist)
        
        if (!handler || typeof handler.typeset !== 'function') { //Just handling a potential error case and warning the user. 
            console.warn('no %s element defined; %s element will not work', CONTROLLER_TAG_NAME, TAG_NAME);
            handler = undefined;
        } 
        else if (!document.contains(handler)) {
            document.head.appendChild(handler); //Handler has been checked, and is added to the head 
        }
    }


    function update(elem) {

        const sdom = elem.shadowRoot;
        const math = elem.textContent.trim();
        
        const isBlock = elem.getAttribute('mode') === 'display';
        
        const check = (isBlock ? 'D' : 'I') + math;

        if (check !== elem._private.check) { //Enters if it detects a difference to the element in the current DOM. 

            while (sdom.firstChild) {sdom.removeChild(sdom.firstChild);} //Removes the currently sitting element so that it can be replaced
            
            elem._private.check = check; //Sets it to the new content

            if (math.length) { //Makes sure to only typeset it if it exists to begin with. 
                handler.typeset(math, isBlock, function(melem, styleNode) { //Uses the "handler" to render the element, and adds it to the DOM upon completion.                  
                    sdom.appendChild(styleNode.cloneNode(true));
                    sdom.appendChild(melem);
                });
            }

        }
    }


    class MathTex extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            check_handler();
        }

        connectedCallback() {
            
            const elem = this;

            global.requestAnimationFrame(function() {
                elem._private = {
                    check: '', //Sets the elements content to nothing
                    observer: new MutationObserver(function () { //Adds an observer to the element. It will "react" by calling update() and passing itself. 
                        update(elem);
                    })
                };
                update(elem); //Immedeatedly sets the element to what it actually is since he made it empty to begin with. 
                elem._private.observer.observe(elem, mutation_config); //Also immedeatedly looks for any changes, just in case. 
            });

            /*
            //var mathStr = elem.textContent.trim();
            if(!isDuplicate && mathStr != "xXx") {
                global.requestAnimationFrame(function() {
                    elem._private = {
                        check: '',
                        observer: new MutationObserver(function () {
                            update(elem);
                        })
                    };
                    update(elem);
                    elem._private.observer.observe(elem, mutation_config);
                });
            }

            if(mathStr == "xXx") {isDuplicate = !isDuplicate;}
            */

        }

        disconnectedCallback() {
            if (this._private) {
                this._private.observer.disconnect();
                delete this._private;
            }
        }

    }

    global.customElements.define(TAG_NAME, MathTex);

})(window);
