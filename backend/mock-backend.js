var ajax = $.ajax;
$.ajax = function(config) {
	var response = GetExpected(config);
	if(Math.round(Math.random()) === 1) {
		response = Math.ceil(Math.random() * 2000);
	}
	config.success(response);
	return {
		fail: function() {}
	};
}

function GetExpected(config){
	var data = JSON.parse(config.data);
	var response = null;
	switch (data.opn) {
		case 'ADD':
			response = data.opd1 + data.opd2;
			break;
		case 'SUB':
			response = data.opd1 - data.opd2;
			break;
		case 'MUL':
			response = data.opd1 * data.opd2;
			break;
		case 'DIV':
			response = data.opd1 / data.opd2;
			break;
	}
	return response;
}