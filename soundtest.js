//const AUTOPLAY_ERROR = "DOMException: The play method is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.";
//const AUTOPLAY_ERRORS = [
//	"NotAllowedError: The play method is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.", // Firefox
//	"NotAllowedError: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD" // Chrome
//];
const NOT_ALLOWED = "NotAllowedError";

addEventListener("load", () => {
	const sound = document.getElementById("test-sound");
	const result = document.getElementById("result");
	const manual = document.getElementById("manual");
	const retry = document.getElementById("retry");
	
	async function testSound(success, action) {
		try {
			await sound.play();
		} catch (e) {
			const msg = e.toString();
			
			if (msg.includes(NOT_ALLOWED))
				result.innerText = "Unable to " + action + " sound because that action is prohibited";
			else {
				result.innerText = "An error occurred while attempting to play the sound";
				console.log(msg);
			}
			
			result.classList.remove("success");
			result.classList.add("fail");
			
			return;
		}
		
		result.innerText = success;
		result.classList.remove("fail");
		result.classList.add("success");
	}
	
	testSound("Successfully autoplayed sound on page load!", "autoplay");
	
	manual.addEventListener("click", e => testSound("Successfully manually played sound!", "play"));
	retry.addEventListener("click", location.reload.bind(location));
});
