var api_conf = require('../config/api'),
	https = require('https'),
	auth = new Buffer(api_conf.config.id + ':' + api_conf.config.key).toString('base64');

/* getConsumption */
exports.getConsumption = function(req,res){
	var parameters = 'date_min=20130401&date_max=20130401&group_by=month&zipcode=28025';

	var options = {
		host: api_conf.config.url,
		path: '/apidatos/zones/consumption_pattern.'+api_conf.config.type+'?'+parameters,
		headers: {
			'Authorization': auth
		}
	};
	var request = https.get(options, function(response){
		var body = '';

		response.on("data", function(chunk){

			body += chunk.toString();
		});  // end of data

		response.on("end", function(){
			res.json(JSON.parse(body));

		}); // end of end

		response.on("error", function(error){
			console.log("error: " + error.message);
		}); // end of error
	}); // end of request

	request.end();
}


/* getCards */
exports.getCardsCubes = function(req,res){
	var parameters = 'date_min=201301&date_max=201302&group_by=week&latitude=40.420182&longitude=-3.70584&zoom=2';
	var options = {
		host: api_conf.config.url,
		path: '/apidatos/zones/cards_cube.'+api_conf.config.type+'?'+parameters,
		headers: {
			'Authorization': auth
		}
	};
	var request = https.get(options, function(response){
		var body = '';

		response.on("data", function(chunk){
			body += chunk.toString();
		});  // end of data

		response.on("end", function(){
			res.json(JSON.parse(body));

		}); // end of end

		response.on("error", function(error){
			console.log("error: " + error.message);
		}); // end of error
	}); // end of request

	request.end();
}


/* getCustomerZipcodes */
exports.getCustomerZipcodes = function(req,res){
	var parameters = 'date_min=201301&date_max=201301&group_by=month&time_window=1&latitude=40.420182&longitude=-3.70584&zoom=2&category=es_fashion&by=incomes';
	var options = {
		host: api_conf.config.url,
		path: '/apidatos/zones/customer_zipcodes.'+api_conf.config.type+'?'+parameters,
		headers: {
			'Authorization': auth
		}
	};
	var request = https.get(options, function(response){
		var body = '';

		response.on("data", function(chunk){
			body += chunk.toString();
		});  // end of data

		response.on("end", function(){
			res.json(JSON.parse(body));

		}); // end of end

		response.on("error", function(error){
			console.log("error: " + error.message);
		}); // end of error
	}); // end of request

	request.end();
}


/* getMerchantsCategories */
exports.getMerchantsCategories = function(req,res){

	var options = {
		host: api_conf.config.url,
		path: '/apidatos/info/merchants_categories.json',
		headers: {
			'Authorization': auth
		}
	};
	var request = https.get(options, function(response){
		var body = '';

		response.on("data", function(chunk){
			body += chunk.toString();
		});  // end of data

		response.on("end", function(){
			res.json(JSON.parse(body));

		}); // end of end

		response.on("error", function(error){
			console.log("error: " + error.message);
		}); // end of error
	}); // end of request

	request.end();
}

