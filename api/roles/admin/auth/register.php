<?php
// required headers
header("Access-Control-Allow-Origin: http://localhost/rest-api-auth/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// files needed to connect to database
include_once '../../../config/database.php';
include_once '../../../objects/admin.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate product object
$admin = new Admin($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$admin->username = $data->username;
$admin->pwd = $data->pwd;
 
// create the admin
if(
    !empty($admin->username) &&
    !empty($admin->pwd) &&
    $admin->create()
){
 
    // set response code
    http_response_code(200);
 
    // display message: admin was created
    echo json_encode(array("message" => "Admin was created."));
}
 
// message if unable to create admin
else{
 
    // set response code
    http_response_code(400);
 
    // display message: unable to create admin
    echo json_encode(array("message" => "Unable to create admin."));
}
