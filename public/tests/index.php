<?php
/**
 * Created by PhpStorm.
 * User: Karl
 * Date: 2/27/2015
 * Time: 3:58 PM
 */
require('lib/Pusher.php');

$app_id = '108815';
$app_key = '7b0cc00ab6716c7191b4';
$app_secret = 'e8171f83e6bcd7d88342';

$pusher = new Pusher($app_key, $app_secret, $app_id);

for ($i = 1; $i <= 30; $i++) {

    sleep(1);
    $data['name'] = 'Karlis';
    $data['message'] = 'hello waweqwerqworld'.$i;
    $data['time'] = date("l jS \of F Y h:i:s A");
    print_r($pusher->trigger('test_channel', 'my_event', $data));
}



?>