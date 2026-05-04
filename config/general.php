<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\helpers\App;

$isDev = App::env('ENVIRONMENT') === 'dev';
$isProd = App::env('ENVIRONMENT') === 'production';

return [
    // Global settings
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 1,
        'maxUploadFileSize' => 167772160,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // Control Panel trigger word
        'cpTrigger' => App::env('CP_TRIGGER') ?: 'admin',

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => App::env('SECURITY_KEY'),

        // Whether Dev Mode should be enabled (see https://craftcms.com/guides/what-dev-mode-does)
        'devMode' => $isDev,

        // Whether administrative changes should be allowed
        'allowAdminChanges' => $isDev,

        // Whether crawlers should be allowed to index pages and following links
        'disallowRobots' => !$isProd,

        // nexocom Defaults
        'timezone' => 'Europe/Zurich',
        'limitAutoSlugsToAscii' => true,
        'convertFilenamesToAscii' => true,
        'sendPoweredByHeader' => false,
        'testToEmailAddress' => $isDev ? 'info@nexocom.ch' : null,
        'defaultTemplateExtensions' => ['html', 'twig', 'njk'],
        'csrfTokenName' => 'CSRF_TOKEN',
        'phpSessionName' => 'SessionIdWeb',

        'aliases' => [
            '@webroot' => dirname(__DIR__) . '/web',
            '@web' => $isProd ? App::env('PRIMARY_SITE_URL') : null,
        ],
        
        // Customer specific settings
        'postLoginRedirect' => '/login-redirect',
    ],

    // Dev environment settings
    'dev' => [
        // Dev Mode (see https://craftcms.com/guides/what-dev-mode-does)
        'devMode' => true,
		'maxRevisions' => 2,
		'testToEmailAddress' => 'info@nexocom.ch',
    ],

    // Production environment settings
    'production' => [
        // Set this to `false` to prevent administrative changes from being made on production
        'allowAdminChanges' => false,
        'allowUpdates' => false,
        //'generateTransformsBeforePageLoad' => false,
    ],
];
