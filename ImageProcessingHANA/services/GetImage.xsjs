var schema_name = "RAMESH";
var id = $.request.parameters.get('id');
var conn = $.db.getConnection();

try {
    var query = "Select IMAGE_CONTENT From " + schema_name + ".IMAGE_STORE Where IMAGE_NAME = '" + id + "'";

    var pstmt = conn.prepareStatement(query);
    var rs = pstmt.executeQuery();
    if(rs.next()){
        $.response.headers.set("Content-Disposition", "Content-Disposition: attachment; filename=filename.jpg");
        $.response.contentType = 'image/jpg';
        $.response.setBody(rs.getBlob(1));
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