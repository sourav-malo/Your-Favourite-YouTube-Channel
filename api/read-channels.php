<?php 
  // Headers
  header('Content-Type: application/json');

  include_once '../config/Database.php';
  include_once '../models/Channel.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate Channel object
  $channel = new Channel($db);

  // Read Channel
  $result = $channel->read();
  // Get row count
  $num = $result->rowCount();

  // Check if any channels
  if($num > 0) {
    // Channel array
    $channels_arr = array();
    $channels_arr['status'] = "$num Channels Found";
    $channels_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      if(!is_null($rating)) {
        $channel_item = array(
          'id' => $id,
          'title' => $title,
          'channel_url' => $channel_url,
          'logo_url' => $logo_url,
          'rating' => $rating
        );
      } else {
        $channel_item = array(
          'id' => $id,
          'title' => $title,
          'channel_url' => $channel_url,
          'logo_url' => $logo_url
        );
      }

      // Push to "data"
      array_push($channels_arr['data'], $channel_item);
    }

    // Turn to JSON & output
    echo json_encode($channels_arr);

  } else {
    // No Channels
    echo json_encode(
      array('status' => 'No Channels Found')
    );
  }
?>
