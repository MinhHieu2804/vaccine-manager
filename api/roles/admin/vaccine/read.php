<?php
// required header
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// include database and object files
include_once '../../../config/database.php';
include_once '../../../objects/vaccine.php';
  
// instantiate database and vaccine object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$vaccine = new Vaccine($db);
  
// query vaccines
$stmt = $vaccine->read();
$num = $stmt->rowCount();
  
// check if more than 0 record found
if($num>0){
  
    // products array
    $vaccines_arr=array();
    $vaccines_arr["records"]=array();
  
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
  
        $vaccine_item=array(
            "id" => $id,
            "name" => $name,
            "description" => html_entity_decode($description)
        );
  
        array_push($vaccines_arr["records"], $vaccine_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show vaccines data in json format
    echo json_encode($vaccines_arr);
}
  
else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no vaccines found
    echo json_encode(
        array("message" => "No vaccines found.")
    );
}
?>