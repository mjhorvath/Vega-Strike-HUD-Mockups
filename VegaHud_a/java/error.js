// Credit goes to Angus Turnbull, with some modifications.
window.onerror = function (err, file, line)
{
	alert
	(
		'Error in File: ' + file + '\n' +
		'Error on Line: ' + line + '\n' +
		'Error: ' + err + '\n' +
		'Property name: ' + window.propName
	)
	return true
}
