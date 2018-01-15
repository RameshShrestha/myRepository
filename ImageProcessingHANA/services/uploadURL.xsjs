/*function escape(v1)
{
          var v2 = v1.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
          return v2;
}*/

var output = {
	results: []
};

try
{
          var conn = $.db.getConnection();
          var filename = $.request.parameters.get("fileName");
          if($.request.entities.length > 0){
                var fileBody = $.request.entities[0].body.asString();
                var allTextLines = fileBody.split(/\r\n|\n/);
                	var record = {};
		record.fileName = filename;
		record.fileContent =  $.util.codec.encodeBase64(fileBody);
		output.results.push(record);
          }
          else
          {
                    $.response.setBody("No Entries");
          }
          $.response.setBody("[200]:Upload successful!");
          if(output.results.length > 0){
	    var body = JSON.stringify(output);
$.response.contentType = 'application/json';
$.response.setBody(body);
$.response.status = $.net.http.OK;
}
}
catch(err)
{
          $.response.setBody(err.message);
}