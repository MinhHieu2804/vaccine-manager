<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../../config/database.php';
include_once '../../../objects/vaccination.php';

// instantiate database and vaccination object
$database = new Database();
$db = $database->getConnection();

// initialize object
$vaccination = new Vaccination($db);

// query vaccinations
$stmt = $vaccination->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if ($num > 0) {

    // vaccinations array
    $vaccinations_arr = array();
    $vaccinations_arr["records"] = array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $vaccination_item = array(
            "id" => $id,
            "cccd" => $cccd,
            "ho_dem" => $ho_dem,
            "ten" => $ten,
            "vaccine_name" => $vaccine_name,
            "date" => $date,
            "note" => $note
        );

        array_push($vaccinations_arr["records"], $vaccination_item);
    }

    // set response code - 200 OK
    http_response_code(200);

    // show vaccinations data in json format
    echo json_encode($vaccinations_arr);
} else {

    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no vaccinations found
    echo json_encode(
        array("message" => "No vaccination found.")
    );
}
