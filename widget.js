
let youTubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

function displayVideo() {
	
	let url = document.getElementById(BWProperties.namespace + '_youtube_url').value;

  	let valid =  isValidYoutubeVideo(url);
  
    	if(valid) {
      		let iframe= createEmbedElement(url);
      
      		let content = `
            	<div class="text-center">
                		${iframe}
                        <button class="btn btn-danger" onclick="{{namespace}}.closeLocalVideo('{{overlay_id}}')">Close</button>
                </div>
            `;
      
      		let params = {content : content, wrap_content : false, timeout: -1, execute_javascript : '_3rdVz.flushOverlayToTop("{{overlay_id}}")'};
    
     		BWAPI.post('/events/' + BWProperties['event_id'] + '/sendOnscreenContent', params);
      
    } else {
      	alert("Must be a valid Youtube Video Url");
    }
	
}

function isValidYoutubeVideo(url) {
  
	if(!url) {
 		return false; 
    	}
  	
    	let match = url.match(youTubeRegExp);
	
  	if (match && match[2].length == 11) {
          return true;
    	}
     
  	return false;
}

function createEmbedElement(url){
	
    	var match = url.match(youTubeRegExp);
  
  	let iframe = '<iframe src="https://www.youtube.com/embed/' + match[2] + '?autoplay=1" height="{{screen_height}}" width="{{screen_width}}"></iframe> ';
  
  	return iframe;
}

function closeLocalVideo(overlay_id){
  
  	let element = document.getElementById(overlay_id);
  
 	if(element){
  	 	element.parentNode.removeChild(element);
    	}
}

function flushOverlayToTop(overlay_id) {
  
	let element = document.getElementById(overlay_id);
  
 	if(element){
  	 	element.style="top: 0px;";
    	}
  
}

this.displayVideo = displayVideo;
this.closeLocalVideo = closeLocalVideo;
this.flushOverlayToTop = flushOverlayToTop;
