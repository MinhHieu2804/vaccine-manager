<?php
class District{
  
    // database connection and table name
    private $conn;
    private $table_name = "district";
  
    // object properties
    public $id;
    public $name;
    public $district_id;
    public $province_id;
  
    public function __construct($db){
        $this->conn = $db;
    }
  
    
    // used by select drop-down list
    public function read(){
    
        //select all data
        $query = "SELECT
                    id, _name, _province_id
                FROM
                    " . $this->table_name . "
                ORDER BY
                    _name
                LIMIT 10    
                    ";
    
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
    
        return $stmt;
    }

    function readOne(){
        
        // query to read single record
        $query = "SELECT
                    _name, _province_id
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
        $this->name = $row['_name'];
        $this->province_id = $row['_province_id'];
    }

    function read_with_province_id($province_id){
        
        // query to read single record
        $query = "SELECT
                    id, _name, _province_id
                FROM
                    " . $this->table_name . " 
                WHERE
                    _province_id = ?
                ";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // bind id of product to be updated
        $stmt->bindParam(1, $province_id);

        // execute query
        $stmt->execute();
    
        return $stmt;
    }
}
?>