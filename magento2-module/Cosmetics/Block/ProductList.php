<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Cosmetics\Products\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;
use Cosmetics\Products\Model\ResourceModel\Product\CollectionFactory;

class ProductList extends Template
{
    /**
     * @var CollectionFactory
     */
    protected $collectionFactory;

    /**
     * Constructor
     *
     * @param Context $context
     * @param CollectionFactory $collectionFactory
     * @param array $data
     */
    public function __construct(
        Context $context,
        CollectionFactory $collectionFactory,
        array $data = []
    ) {
        $this->collectionFactory = $collectionFactory;
        parent::__construct($context, $data);
    }

    /**
     * Get product collection
     *
     * @return \Cosmetics\Products\Model\ResourceModel\Product\Collection
     */
    public function getProductCollection()
    {
        $collection = $this->collectionFactory->create();
        $collection->setPageSize(10);
        return $collection;
    }

    /**
     * Get categories
     *
     * @return array
     */
    public function getCategories()
    {
        $collection = $this->collectionFactory->create();
        $collection->addFieldToSelect('category');
        $collection->distinct(true);
        
        $categories = [];
        foreach ($collection as $product) {
            $categories[] = $product->getCategory();
        }
        
        return array_unique($categories);
    }
}