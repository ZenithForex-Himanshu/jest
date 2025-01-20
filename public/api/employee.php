<?php
    $host= "localhost";
    $username= "zenithadii";
    $password= "zenithadii@4321";
    $db_name ="employeedb";

   $conn = mysqli_connect($host, $username, $password, $db_name);
    
   if($_POST["1"] == "list"){
      employees($conn);
   }elseif($_POST["1"] == "delete"){
    delete_employee($conn);
   }elseif($_POST["1"] == "add"){
    add_employee($conn);
   }
   
    mysqli_close($conn);
?> 

<?php

    function employees($conn){
      $query = "select * from employee_list";
      $result = mysqli_query($conn, $query);
    
      if($result){
        $employee_array = array();
        while($row = mysqli_fetch_assoc($result)){
            $employee_array[] = $row;
        }
         echo json_encode($employee_array);
        }else {
         echo "not able to execute query";
        }
        
    }



    function delete_employee($conn){
      $srno = $_POST["2"];
      $query = "delete from employee_list where Sr_No = " . $srno . ";";
      $deletedResult = mysqli_query($conn, $query);
      if($deletedResult){
          employees($conn);
      }

    }

    function add_employee($conn) {
      $fname = $_POST["2"];
      $lname = $_POST["3"];
      $email = $_POST["4"];
      $query = "insert INTO employee_list(Sr_No, First_Name, Last_name, Email, date_of_joining)
      SELECT (SELECT COALESCE( MAX(sr_no),0)+1 FROM employee_list) AS srno
      , '" . $fname . "' , '" . $lname . "' , '" . $email . "' , NOW() AS nasdfsa;";
      $addedResult = mysqli_query($conn, $query);
      if($addedResult){
        employees($conn);
      }

    }
?>
