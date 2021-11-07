<?php
class HealthCenter{
  
    // database connection and table name
    private $conn;
    private $table_name = "health_center";
  
    // object properties
    public $id;
    public $name;
    public $ward_id;
    public $created;
  
    public function __construct($db){
        $this->conn = $db;
    }
  
    // used by select drop-down list
    public function readAll(){
        //select all data
        $query = "SELECT
                    id, name
                FROM
                    " . $this->table_name . "
                ORDER BY
                    name";
  
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
  
        return $stmt;
    }

    // used by select drop-down list
public function read(){
  
    //select all data
    $query = "SELECT
                id, name
            FROM
                " . $this->table_name . "
            ORDER BY
                name";
  
    $stmt = $this->conn->prepare( $query );
    $stmt->execute();
  
    return $stmt;
}

function readOne(){
        
    // query to read single record
    $query = "SELECT
                name, created
            FROM
                " . $this->table_name . " 
            WHERE
                id = ?
            LIMIT
                0,1";

    // prepare query statement
    $stmt = $this->conn->prepare( $query );

    // bind id of product to be updated
    $stmt->bindParam(1, $this->id);

    // execute query
    $stmt->execute();

    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // set values to object properties
    $this->name = $row['name'];
    $this->created = $row['created'];
}
}
?>