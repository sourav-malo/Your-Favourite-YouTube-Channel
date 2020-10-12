<?php
  include '../config/Database.php';
  include 'Channel.php';
  include 'Rating.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate Rating object
  $rating = new Rating($db);

  // Set Properties
  $rating->channel_id = 2;
  $rating->rating = 4;

  // Create Rating
  if($rating->create()) {
    print_r("Successful Insertion");
  }

  // Read Single Rating
  print_r($rating->read_single()->fetchAll(PDO::FETCH_ASSOC));

  // Instantiate Channel object
  $channel = new Channel($db);

  // Read Channels
  print_r($channel->read()->fetchAll(PDO::FETCH_ASSOC));
?>