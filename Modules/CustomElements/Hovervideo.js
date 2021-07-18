class HoverVideo extends HTMLElement {
    constructor() {
        super();

        //Get attributes
        var sauce = this.getAttribute('url');
        var theWidth = this.getAttribute('customWidth');
        var theMargin = this.getAttribute('marginTop');
        var hasBorder = this.getAttribute('videoBorder');

        //Create shadow
        var shadow = this.attachShadow({mode: 'open'});

        //Make element
        var theVideo = document.createElement('video');
        theVideo.src=sauce;

        var borderString = "";
        if(hasBorder != null) {
            borderString = "border: solid 2px;"
        }

        if(theWidth != null) {
            theVideo.style="width:"+theWidth+";" + " margin-top: " + theMargin + "px; padding-bottom:0px;" + borderString;
        }
        else{
            theVideo.style="width:100%;" + " margin-top: " + theMargin + "px; padding-bottom:0px;" + borderString;
        }
        
        // theVideo.setAttribute('controls', 'controls');
        theVideo.setAttribute('loop','loop');

        theVideo.addEventListener("mouseover",function(event) {
            this.play();
        })
        theVideo.addEventListener("mouseout",function(event) {
            this.pause();
        })

        shadow.appendChild(theVideo);

    }
}
customElements.define("hover-video",HoverVideo);

export {HoverVideo};