<?php 
  // Headers
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../models/ManageChannelCookie.php';

  // Instantiate ManageChannelCookie object
  $manageChannelCookie = new ManageChannelCookie();

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));

  $manageChannelCookie->channelId = $data->channel_id;

  // save Cookie
  $manageChannelCookie->saveCookie();

  // check Cookie
  echo json_encode(array('status' => $manageChannelCookie->checkCookie()));
?>