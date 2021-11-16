<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
  
// include database and object files
include_once '../../../config/database.php';
include_once '../../../objects/province.php';
  
// get database connection
$database = new Database();
$db = $database->getConnection();
  
// prepare province object
$province = new Province($db);
  
// set ID property of record to read
$province->id = isset($_GET['id']) ? $_GET['id'] : die();
  
// read the details of province to be edited
$province->readOne();
  
if($province->id!=null){
    // create array
    $province_arr = array(
        "id" => $province->id,
        "name" =>  $province->name,
  
    );
  
    // set response code - 200 OK
    http_response_code(200);
  
    // make it json format
    echo json_encode($province_arr);
}
  
else{
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user province does not exist
    echo json_encode(array("message" => "province does not exist."));
}
?>