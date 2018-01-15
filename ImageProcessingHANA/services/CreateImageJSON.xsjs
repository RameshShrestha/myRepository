var sJSONBody = $.request.body.asString();
var jsonObj = JSON.parse(sJSONBody);

//var imageCounter = jsonObj[0].COUNTER;
var nameValue = jsonObj[0].NAME;
var imageName = jsonObj[0].IMAGE_NAME;
var imageContent = $.util.codec.decodeBase64(jsonObj[0].IMAGE_CONTENT);
try {
var conn = $.db.getConnection();
//
var maxRecord = conn.prepareStatement('SELECT MAX("COUNTER") FROM "SYSTEM"."IMAGE_STORE"');
var rs = maxRecord.executeQuery();
var maxValue = 0;
 while (rs.next()) {
                maxValue = rs.getString(1);
        }
   	conn.commit(); 
   	var newCounter = parseInt(maxValue, 10) + 1;
var connTwo = $.db.getConnection();
var pstmt = connTwo.prepareStatement('INSERT INTO "SYSTEM"."IMAGE_STORE" VALUES(?,?,?,?)');
pstmt.setString(1, imageName);
pstmt.setBlob(2, imageContent);
pstmt.setString(3, nameValue);
pstmt.setString(4, newCounter + ""); 
//pstmt.setInt(4, imageCounter);

    if(imageName){
	pstmt.execute();
	connTwo.commit();
	$.response.contentType = 'application/json';
	$.response.setBody('{"msg" : "Data Updated", "maxValue" :' + maxValue + '}');
	$.response.status = 201;
    }else{
        
        	$.response.contentType = 'application/json';
        	sJSONBody = '{"msg" : "Not updated", "maxValue" :' + maxValue + '}';
	$.response.setBody(sJSONBody);
	$.response.status = 201;
    }
} catch (ex) {
	$.response.contentType = 'application/json';
	$.response.setBody('{"msg" : Error"' + ex + '}');
	$.response.status = 500;
}