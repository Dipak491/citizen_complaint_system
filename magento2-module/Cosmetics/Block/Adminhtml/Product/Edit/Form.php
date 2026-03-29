<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Cosmetics\Products\Block\Adminhtml\Product\Edit;

use Magento\Backend\Block\Widget\Form\Generic;
use Magento\Backend\Block\Template\Context;
use Magento\Framework\Registry;
use Magento\Framework\Data\FormFactory;
use Cosmetics\Products\Model\ProductFactory;

class Form extends Generic
{
    /**
     * @var ProductFactory
     */
    protected $productFactory;

    /**
     * @param Context $context
     * @param Registry $registry
     * @param FormFactory $formFactory
     * @param ProductFactory $productFactory
     * @param array $data
     */
    public function __construct(
        Context $context,
        Registry $registry,
        FormFactory $formFactory,
        ProductFactory $productFactory,
        array $data = []
    ) {
        $this->productFactory = $productFactory;
        parent::__construct($context, $registry, $formFactory, $data);
    }

    /**
     * Prepare form
     *
     * @return $this
     */
    protected function _prepareForm()
    {
        $model = $this->_coreRegistry->registry('cosmetics_product');

        $form = $this->_formFactory->create(
            ['data' => [
                'id' => 'edit_form',
                'action' => $this->getData('action'),
                'method' => 'post',
                'enctype' => 'multipart/form-data'
            ]]
        );

        $fieldset = $form->addFieldset(
            'base_fieldset',
            ['legend' => __('Product Information')]
        );

        if ($model->getId()) {
            $fieldset->addField(
                'entity_id',
                'hidden',
                ['name' => 'entity_id']
            );
        }

        $fieldset->addField(
            'sku',
            'text',
            [
                'name' => 'sku',
                'label' => __('SKU'),
                'title' => __('SKU'),
                'required' => true
            ]
        );

        $fieldset->addField(
            'name',
            'text',
            [
                'name' => 'name',
                'label' => __('Name'),
                'title' => __('Name'),
                'required' => true
            ]
        );

        $fieldset->addField(
            'category',
            'select',
            [
                'name' => 'category',
                'label' => __('Category'),
                'title' => __('Category'),
                'required' => true,
                'options' => [
                    'Skincare' => __('Skincare'),
                    'Makeup' => __('Makeup'),
                    'Hair Care' => __('Hair Care'),
                    'Fragrance' => __('Fragrance'),
                    'Nails' => __('Nails')
                ]
            ]
        );

        $fieldset->addField(
            'price',
            'text',
            [
                'name' => 'price',
                'label' => __('Price'),
                'title' => __('Price'),
                'required' => true,
                'class' => 'validate-number'
            ]
        );

        $fieldset->addField(
            'stock',
            'text',
            [
                'name' => 'stock',
                'label' => __('Stock'),
                'title' => __('Stock'),
                'required' => true,
                'class' => 'validate-number'
            ]
        );

        $fieldset->addField(
            'description',
            'textarea',
            [
                'name' => 'description',
                'label' => __('Description'),
                'title' => __('Description')
            ]
        );

        $fieldset->addField(
            'image',
            'text',
            [
                'name' => 'image',
                'label' => __('Image URL'),
                'title' => __('Image URL')
            ]
        );

        $fieldset->addField(
            'ingredients',
            'textarea',
            [
                'name' => 'ingredients',
                'label' => __('Ingredients'),
                'title' => __('Ingredients')
            ]
        );

        $fieldset->addField(
            'usage_instructions',
            'textarea',
            [
                'name' => 'usage_instructions',
                'label' => __('Usage Instructions'),
                'title' => __('Usage Instructions')
            ]
        );

        $form->setValues($model->getData());
        $form->setUseContainer(true);
        $this->setForm($form);

        return parent::_prepareForm();
    }
}