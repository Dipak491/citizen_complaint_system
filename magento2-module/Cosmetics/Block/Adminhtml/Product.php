<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Cosmetics\Products\Block\Adminhtml;

use Magento\Backend\Block\Widget\Grid\Container;

class Product extends Container
{
    /**
     * Constructor
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_controller = 'adminhtml_product';
        $this->_blockGroup = 'Cosmetics_Products';
        $this->_headerText = __('Cosmetics Products');
        $this->_addButtonLabel = __('Add New Product');
        parent::_construct();
    }
}