<?php


namespace internal\assetpreviews;

use craft\base\AssetPreviewHandler;
use craft\helpers\Html;
use yii\base\NotSupportedException;
use kennethormandy\s3securedownloads\S3SecureDownloads;

/**
 * Provides functionality to preview PDFs
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 3.4.0
 */
class SignedPdf extends AssetPreviewHandler
{
    /**
     * @inheritdoc
     */
    public function getPreviewHtml(array $variables = []): string
    {
        $asset = $this->asset;

        $options = [];

        $url = S3SecureDownloads::getInstance()->signUrl->getSignedUrl($asset->uid, $options);
        
        if ($url === null) {
            throw new NotSupportedException('Preview not supported.');
        }

        return Html::tag('iframe', '', [
            'width' => '100%',
            'height' => '100%',
            'src' => $url,
        ]);
    }
}