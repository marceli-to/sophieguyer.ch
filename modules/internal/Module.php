<?php
namespace internal;

use Craft;
use craft\events\AssetPreviewEvent;
use craft\services\Assets;
use yii\base\Event;
use internal\assetpreviews\SignedPdf;

class Module extends \yii\base\Module
{
    public function init()
    {
        // Define a custom alias named after the namespace
        Craft::setAlias('@internal', __DIR__);

        // Set the controllerNamespace based on whether this is a console or web request
        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'internal\\console\\controllers';
        } else {
            $this->controllerNamespace = 'internal\\controllers';
        }

        parent::init();

        Event::on(
            Assets::class,
            Assets::EVENT_REGISTER_PREVIEW_HANDLER,
            function (AssetPreviewEvent $event) {
                $asset = $event->asset;

                if ($asset->kind === 'pdf' && $asset->volumeId == '2') {
                    $event->previewHandler = new SignedPdf($asset);
                }
            }
        );
    }
}
