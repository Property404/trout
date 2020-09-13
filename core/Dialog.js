/**
 * Dialog class - used to create semi-interactive dialogues 
 */
class Dialog
{
	/**
	 * Constructor
	 * @param{array} - list of string phrases
	 */
	constructor(phrases)
	{
		this._phrases = phrases;
	}

	run(callback)
	{
		this._callback = callback;
		this._popNextPhrase();
		Dialog.element.removeAttribute("hidden");
		setTimeout(()=>{document.onkeypress = ()=>{
			if (event.which == 13 || event.keyCode == 13) {
				this._popNextPhrase();
			}
		};}, 100);
	}

	_popNextPhrase()
	{
		const next = this._phrases.shift();

		if(next)
		{
			Dialog.element.innerHTML = next;
		}
		else
			this._endRun();
	}

	_endRun()
	{
		this._phrases = null;
		document.onkeypress = null;
		Dialog.element.hidden = true;
		if(this._callback)
			this._callback();
	}
}
Dialog.element = document.getElementById("dialogbox");
