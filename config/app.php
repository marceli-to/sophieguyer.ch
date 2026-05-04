<?php

return [
    // ...
    'modules' => [
        'internal' => internal\Module::class,
    ],
    'bootstrap' => [
        'internal',
    ],
    'components' => [
        'mailer' => function() {
            $config = craft\helpers\App::mailerConfig();

            // Use Mailpit in dev mode:
            if (Craft::$app->getConfig()->getGeneral()->devMode) {
                $adapter = craft\helpers\MailerHelper::createTransportAdapter(
                    craft\mail\transportadapters\Sendmail::class,
                    [
                        'command' => ini_get('sendmail_path'),
                    ]
                );

                // Override the transport:
                $config['transport'] = $adapter->defineTransport();
            }

            // Return the initialized component:
            return Craft::createObject($config);
        },
    ],

];
