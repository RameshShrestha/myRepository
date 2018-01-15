/*var imageCounter = $.request.parameters.get('COUNTER');
var nameValue = $.request.parameters.get('NAME');
var imageName = $.request.parameters.get('IMAGE_NAME');
var imageContent = $.request.parameters.get('IMAGE_CONTENT');*/
var sJSONBody = $.request.body.asString();
var jsonObj = JSON.parse(sJSONBody);

var imageCounter = jsonObj.COUNTER;
var nameValue = jsonObj.NAME;
var imageName = jsonObj.IMAGE_NAME;

try {
var conn = $.db.getConnection();
//;
var pstmt = conn.prepareStatement('DELETE FROM "SYSTEM"."IMAGE_STORE" where COUNTER=? and IMAGE_NAME=? and NAME=?');
//pstmt.setString(1,email);  
pstmt.setString(2, imageName);
pstmt.setString(3, nameValue);
pstmt.setInt(1, imageCounter);
    if(imageCounter){
	pstmt.execute();
	conn.commit();
	$.response.contentType = 'application/json';
	$.response.setBody('{"msg" : "Data Deleted"}');
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