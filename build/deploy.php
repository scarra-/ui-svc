<?php

require_once __DIR__.'/../vendor/autoload.php';

use Aws\CodeDeploy\CodeDeployClient;

$client = CodeDeployClient::factory([
    'credentials' => [
        'key'    => getenv('AWS_ACCESS_KEY'),
        'secret' => getenv('AWS_SECRET_KEY'),
    ],
    'region'  => 'us-east-1',
    'version' => '2014-10-06',
]);

$repoName    = getenv('REPO_NAME');
$buildnumber = getenv('TRAVIS_BUILD_NUMBER');

$result = $client->registerApplicationRevision([
    'applicationName' => 'project-example',
    'revision' => [
        'revisionType' => 'S3',
        's3Location' => [
            'bucket' => 'acn-bootcamp-internal',
            'key'    => "builds/{$repoName}/{$repoName}-{$buildnumber}.tar.gz",
            'bundleType' => 'tgz',
        ],
    ],
]);
