<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
  
// include database and object files
include_once '../../../../config/database.php';
include_once '../../../../objects/vaccination.php';

// get posted data
$data = json_decode(file_get_contents("php://input"));

// get jwt
$jwt = isset($data->jwt) ? $data->jwt : "";

// if jwt is not empty
if ($jwt) {
    // get database connection
    $database = new Database();
    $db = $database->getConnection();
    
    // prepare vaccination object
    $vaccination = new Vaccination($db);
    
    // set ID property of record to read
    $vaccination->id = isset($_GET['id']) ? $_GET['id'] : die();
    
    // read the details of vaccination to be edited
    $vaccination->readOne();
    
    if($vaccination->cccd!=null){
        // create array
        $vaccination_arr = array(
            "id" =>  $vaccination->id,
            "cccd" => $vaccination->cccd,
            "vaccine_id" => $vaccination->vaccine_id,
            "health_center_id" => $vaccination->health_center_id,
            "date" => $vaccination->date,
            "note" => $vaccination->note,
            "vaccinate_no" => $vaccination->vaccinate_no,
            "created" => $vaccination->created
    
        );
    
        // set response code - 200 OK
        http_response_code(200);
    
        // make it json format
        echo json_encode($vaccination_arr);
    }
    
    else{
        // set response code - 404 Not found
        http_response_code(404);
    
        // tell the user vaccination does not exist
        echo json_encode(array("message" => "Vaccination does not exist."));
    }

}

else{
 
    // set response code
    http_response_code(401);
 
    // tell the admin access denied
    echo json_encode(array("message" => "Access denied."));
}
?>