const _ALPHANUMERICBET =
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* Max and min are inclusive */
function randomInteger(min, max)
{
	return Math.floor(Math.random()*(1+max-min))+min;
}

/* Gives about 192 bit ids */
function randomId()
{
	let id = "uniqueid_";
	for(let i=0;i<32;i++)
	{
		const c = ALPHANUMERICBET[
			randomInteger(0, ALPHANUMERICBET.length-1)];
		id+=c;
	}
	return id;
}
