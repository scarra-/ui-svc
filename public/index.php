<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Pusher;
use Dotenv\Dotenv;
use Symfony\Component\HttpFoundation\Response;

$dotenv = new Dotenv();
try {
    $dotenv->load(__DIR__.'/..');
} catch (InvalidArgumentException $e) {
    //
}

$app = new Silex\Application();

$app['environment'] = $_ENV;

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__ . '/../resources/views',
));

$app['twig']->setCache(__DIR__.'/../storage/cache/');

$app['twig']->addFunction(new Twig_SimpleFunction('elixir', function ($file){
    static $manifest = null;

    if (isset($_ENV['UI_SVC_APP_ENV']) && $_ENV['UI_SVC_APP_ENV'] == 'local') {
        return $file;
    }

    if (is_null($manifest)) {
        $manifest = json_decode(file_get_contents(__DIR__.'/build/rev-manifest.json'), true);
    }

    if (isset($manifest[$file])){
        return '/build/'.$manifest[$file];
    }

    return $file;
}));

$app->get('/', function () use ($app) {
    $response = new Response($app['twig']->render('index.html.twig'));
    $response->setTtl(5);

    return $response;
});

$app->post('/pusher/auth', function () use ($app) {
    $pusher = new Pusher(
        $_ENV['UI_SVC_PUSHER_APP_KEY'],
         $_ENV['UI_SVC_PUSHER_APP_SECRET'],
         $_ENV['UI_SVC_PUSHER_APP_ID']
    );

    return $pusher->socket_auth(
        $_REQUEST['channel_name'],
        $_REQUEST['socket_id']
    );
});

$app->run();
