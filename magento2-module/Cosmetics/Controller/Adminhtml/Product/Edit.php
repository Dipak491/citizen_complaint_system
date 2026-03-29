<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Cosmetics\Products\Controller\Adminhtml\Product;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Framework\View\Result\PageFactory;
use Cosmetics\Products\Model\ProductFactory;

class Edit extends Action
{
    /**
     * @var PageFactory
     */
    protected $resultPageFactory;

    /**
     * @var ProductFactory
     */
    protected $productFactory;

    /**
     * @param Context $context
     * @param PageFactory $resultPageFactory
     * @param ProductFactory $productFactory
     */
    public function __construct(
        Context $context,
        PageFactory $resultPageFactory,
        ProductFactory $productFactory
    ) {
        parent::__construct($context);
        $this->resultPageFactory = $resultPageFactory;
        $this->productFactory = $productFactory;
    }

    /**
     * Authorization level
     *
     * @return bool
     */
    protected function _isAllowed()
    {
        return $this->_authorization->isAllowed('Cosmetics_Products::product');
    }

    /**
     * Edit action
     *
     * @return \Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        $id = $this->getRequest()->getParam('entity_id');
        $model = $this->productFactory->create();

        if ($id) {
            $model->load($id);
            if (!$model->getId()) {
                $this->messageManager->addErrorMessage(__('This product no longer exists.'));
                $resultRedirect = $this->resultRedirectFactory->create();
                return $resultRedirect->setPath('*/*/');
            }
        }

        $resultPage = $this->resultPageFactory->create();
        $resultPage->setActiveMenu('Cosmetics_Products::product');
        $resultPage->addBreadcrumb(__('Cosmetics'), __('Cosmetics'));
        $resultPage->addBreadcrumb(__('Products'), __('Products'));
        $resultPage->getConfig()->getTitle()->prepend($model->getId() ? $model->getName() : __('New Cosmetics Product'));

        return $resultPage;
    }
}