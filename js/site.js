

function submit(){
	 var radios = document.getElementsByName('group1'), 
        value  = '';

    for (var i = radios.length; i--;) {
        if (radios[i].checked) {
            value = radios[i].value;
            break;
        }
    }

	window.location = "welcome.html?Name=" +
	document.getElementById('txtName').value + "&Email=" + 
	document.getElementById('txtEmail').value +
	"&Method=" + value;
}

function GetUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	sURLVariables = sPageURL.split('&'),
	sParameterName,
	i;
	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

document.getElementById('welcomeHeader').innerHTML = "Thank You, " +
GetUrlParameter('Name') + '!';
document.getElementById('welcomeSubHeader').innerHTML = "July Talk will be reaching out to " +
GetUrlParameter('Email') + " via " + GetUrlParameter('Method') + " shortly."