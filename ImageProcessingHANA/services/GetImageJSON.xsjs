var schema_name = "SYSTEM";
var id = $.request.parameters.get('id');
var conn = $.db.getConnection();
var output = {
	results: []
};
try {
    var query = "Select * From " + schema_name + ".IMAGE_STORE";

    var pstmt = conn.prepareStatement(query);
    var rs = pstmt.executeQuery();
    
       /* $.response.headers.set("Content-Disposition", "Content-Disposition: attachment; filename=filename.jpg");
        $.response.contentType = 'application/json';
        $.response.setBody(rs.getBlob(1));
        $.response.status = $.net.http.OK;*/
        
        
        	while (rs.next()) {
		var record = {};
		record.COUNTER = rs.getString(4);
		record.NAME = rs.getString(3);
		record.IMAGE_NAME = rs.getString(1);
	//	record.IMAGE_CONTENT = rs.getBlob(2);
     //   record.IMAGE_CONTENT = ab2str(record.IMAGE_CONTENT);
        record.IMAGE_CONTENT =  $.util.codec.encodeBase64(rs.getBlob(2));
		output.results.push(record);
	}
	if(output.results.length > 0){
	    var body = JSON.stringify(output);
$.response.contentType = 'application/json';
$.response.setBody(body);
$.response.status = $.net.http.OK;
	}
	  
   
    else{
    	$.response.contentType = 'text/html';
        $.response.setBody("Image not found");
        $.response.status = 404;
    }

} catch (e) {
    $.response.setBody("Error while downloading : " + e);
    $.response.status = 500;
}
conn.close();