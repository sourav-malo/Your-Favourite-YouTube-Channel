<?php 
  // Headers
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../config/Database.php';
  include_once '../models/Rating.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate Rating object
  $rating = new Rating($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));

  $rating->channel_id = $data->channel_id;
  $rating->rating = $data->rating;

  // Create rating
  if($rating->create()) {
    echo json_encode(
      array('status' => 'Rating Inserted')
    );
  } else {
    echo json_encode(
      array('status' => 'Rating Not Inserted')
    );
  }
?>