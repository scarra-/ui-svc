<?php
/**
 * Created by PhpStorm.
 * User: Karl
 * Date: 2/27/2015
 * Time: 3:58 PM
 */
error_reporting(0);
//die('kaka');
require('lib/Pusher.php');
Dotenv::load(__DIR__);
die('kaka');

$app_id = getenv(APP_ID);
$app_key = getenv(APP_KEY);
$app_secret = getenv(APP_SECRET);

$pusher = new Pusher($app_key, $app_secret, $app_id);

for ($i = 1; $i <= 30; $i++) {

    sleep(1);
    $data['name'] = 'Karlis';
    $data['message'] = 'hello waweqwerqworld'.$i;
    $data['time'] = date("l jS \of F Y h:i:s A");
    print_r($pusher->trigger('test_channel', 'my_event', $data));
}



?>