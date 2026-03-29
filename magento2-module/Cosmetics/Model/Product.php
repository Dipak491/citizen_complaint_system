<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Cosmetics\Products\Model;

use Magento\Framework\Model\AbstractModel;
use Cosmetics\Products\Model\ResourceModel\Product as ProductResource;

class Product extends AbstractModel
{
    /**
     * Initialize resource model
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init(ProductResource::class);
    }
}