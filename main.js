function test(debug) {
  if (window.location.hash && window.location.hash.indexOf('access_token') > 0) {
     var hash = window.location.hash;
     var token = hash.substring(hash.indexOf('access_token=') + 'access_token='.length, hash.indexOf('&'));
     console.log('Token:', token);
     callAPI(token, debug);
  }  
  else {
    document.getElementById("result").innerHTML = "No Access Token"; 
  }  
}

function callAPI(token, debug) {
  var t0 = performance.now();
  fetch('https://api4poc.azure-api.net/AuthAPI/api/Values', {
      mode: 'cors',
      headers: {
        "Ocp-Apim-Subscription-Key": "785ed7b1396a479d90500938e926eb88",
        "Ocp-Apim-Trace": debug ? "true": "false",
        "Authorization": "Bearer " + token }
  })
  .then(function(response) { 
      return (response, response.text());  
  })  
  .then(function(response, text) {
      var t1 = performance.now();
      text = response.text();
      text += "</br>"
      text += "Call took " + (t1 - t0) + " milliseconds.";

      if (response.headers.has("Ocp-Apim-Trace-Location")) {
        text += "</br>";
        text += response.headers.get('Ocp-Apim-Trace-Location');
      }

      document.getElementById("result").innerHTML = text;
  })
  .catch(function(error) {  
      console.log('Request failed', error);
      document.getElementById("result").innerHTML = error; 
  });
}

var ehelseLabAuthUri = 'http://access.ehelselab.com/authorize';

var ehelseLabParams = {
  client_id: 'avstand',
  redirect_uri: 'https://ehelse.github.io/apiauth/',
  response_type: 'token',
  scope: 'patient/*.*',
  nonce: '6130755535249629',
  state: '3(#0/!~',
};

function auth() {
  var authorization_uri = ehelseLabAuthUri + '?' + 
    'client_id=' + ehelseLabParams.client_id +
    '&redirect_uri=' + ehelseLabParams.redirect_uri +
    '&response_type=' + ehelseLabParams.response_type +
    '&scope=' + ehelseLabParams.scope +
    '&nonce=' + ehelseLabParams.nonce +
    '&state=' + ehelseLabParams.state;

  console.log('------Redirecting for authorization to---------');
  console.log(authorization_uri);
  window.location = authorization_uri;
}
