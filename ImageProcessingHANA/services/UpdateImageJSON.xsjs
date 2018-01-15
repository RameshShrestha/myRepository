/*var imageCounter = $.request.parameters.get('COUNTER');
var nameValue = $.request.parameters.get('NAME');
var imageName = $.request.parameters.get('IMAGE_NAME');
var imageContent = $.request.parameters.get('IMAGE_CONTENT');*/
var sJSONBody = $.request.body.asString();
var jsonObj = JSON.parse(sJSONBody);

var imageCounter = jsonObj[0].COUNTER;
var nameValue = jsonObj[0].NAME;
var imageName = jsonObj[0].IMAGE_NAME;
var imageContent = $.util.codec.decodeBase64(jsonObj[0].IMAGE_CONTENT);
try {
var conn = $.db.getConnection();
//
var pstmt = conn.prepareStatement("update SYSTEM.IMAGE_STORE set IMAGE_NAME=? , IMAGE_CONTENT=? ,NAME=? where COUNTER=?");
//pstmt.setString(1,email);  
pstmt.setString(1, imageName);
pstmt.setBlob(2, imageContent);
pstmt.setString(3, nameValue);
pstmt.setInt(4, imageCounter);
    if(imageCounter){
	pstmt.execute();
	conn.commit();
	$.response.contentType = 'application/json';
	$.response.setBody('{"msg" : "Data Updated"}');
	$.response.status = 201;
    }else{
        
        	$.response.contentType = 'application/json';
        	sJSONBody = '{"msg" : "Not updated"}';
	$.response.setBody(sJSONBody);
	$.response.status = 201;
    }
} catch (ex) {
	$.response.contentType = 'application/json';
	$.response.setBody('{"msg" : Error"+ex}');
	$.response.status = 500;
}