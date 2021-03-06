<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use Symfony\Component\HttpFoundation\Response;

date_default_timezone_set('UTC');

$dotenv = new Dotenv();
try {
    $dotenv->load(__DIR__.'/..');
} catch (InvalidArgumentException $e) {
    //
}

$app = new Silex\Application();

$app['environment'] = $_ENV;

if (isset($_ENV['UI_SVC_APP_DEBUG'])) {
    $app['debug'] = $_ENV['UI_SVC_APP_DEBUG'];
}

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__ . '/../resources/views',
));

if (true !== $app['debug']) {
    $app['twig']->setCache(__DIR__.'/../storage/cache/');
}

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

$app->run();
