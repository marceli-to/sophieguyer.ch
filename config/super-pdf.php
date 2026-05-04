<?php

return [
    'tempDir' => CRAFT_BASE_PATH . '/storage',
    'fontDir' => CRAFT_BASE_PATH . '/web/assets/fonts',
    // not really needed but added to be on the safe side
    'isHtml5ParserEnabled' => true,
    'pdfBackend' => 'auto',
    'streamContext' => [
        'ssl' => [
            'allow_self_signed'=> TRUE,
            'verify_peer' => FALSE,
            'verify_peer_name' => FALSE,
        ]
    ],
    'httpContext' => [
        'ssl' => [
            'allow_self_signed'=> TRUE,
            'verify_peer' => FALSE,
            'verify_peer_name' => FALSE,
        ]
    ]
];