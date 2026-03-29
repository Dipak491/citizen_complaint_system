',
                'ingredients' => 'Water, Glycerin, Cetearyl Alcohol, Caprylic/Capric Triglyceride, Cetyl Alcohol',
                'usage_instructions' => 'Apply to clean skin morning and night.'
            ],
            [
                'sku' => 'CLEAN-001',
                'name' => 'Facial Cleanser',
                'category' => 'Skincare',
                'price' => 18.50,
                'stock' => 45,
                'description' => 'Gentle foaming cleanser that removes impurities without stripping skin.',
                'image' => 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'ingredients' => 'Water, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin',
                'usage_instructions' => 'Massage onto damp skin, rinse thoroughly with warm water.'
            ],
            [
                'sku' => 'LIPS-001',
                'name' => 'Lipstick - Ruby Red',
                'category' => 'Makeup',
                'price' => 15.99,
                'stock' => 30,
                'description' => 'Vibrant red lipstick with a creamy, long-lasting formula.',
                'image' => 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'ingredients' => 'Ricinus Communis (Castor) Seed Oil, Diisostearyl Malate, Trioctyldodecyl Citrate',
                'usage_instructions' => 'Apply directly to lips or use a lip brush for precision.'
            ],
            [
                'sku' => 'MASC-001',
                'name' => 'Mascara',
                'category' => 'Makeup',
                'price' => 12.99,
                'stock' => 40,
                'description' => 'Volumizing mascara for dramatic lashes.',
                'image' => 'https://images.unsplash.com/photo-1631214524020-3c8b8899a857?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'ingredients' => 'Water, Beeswax, Paraffin, Glyceryl Stearate, Acacia Senegal Gum',
                'usage_instructions' => 'Apply from root to tip with a zigzag motion.'
            ],
            [
                'sku' => 'SHAM-001',
                'name' => 'Shampoo',
                'category' => 'Hair Care',
                'price' => 9.99,
                'stock' => 60,
                'description' => 'Nourishing shampoo for all hair types.',
                'image' => 'https://images.unsplash.com/photo-1626766632648-f5e0c1554816?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'ingredients' => 'Water, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Sodium Chloride',
                'usage_instructions' => 'Apply to wet hair, massage into scalp, and rinse thoroughly.'
            ],
            [
                'sku' => 'COND-001',
                'name' => 'Conditioner',
                'category' => 'Hair Care',
                'price' => 9.99,
                'stock' => 55,
                'description' => 'Hydrating conditioner that detangles and smooths hair.',
                'image' => 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'ingredients' => 'Water, Cetearyl Alcohol, Behentrimonium Chloride, Dimethicone',
                'usage_instructions' => 'Apply to wet hair after shampooing, leave for 2-3 minutes, then rinse.'
            ],
            [
                'sku' => 'PERF-001',
                'name' => 'Perfume - Floral',
                'category' => 'Fragrance',
                'price' => 49.99,
                'stock' => 20,
                'description' => 'Elegant floral fragrance with notes of jasmine and rose.',
                'image' => 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'ingredients' => 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Benzyl Salicylate',
                'usage_instructions' => 'Spray onto pulse points such as wrists, neck, and behind ears.'
            ],
            [
                'sku' => 'NAIL-001',
                'name' => 'Nail Polish - Pink',
                'category' => 'Nails',
                'price' => 7.99,
                'stock' => 35,
                'description' => 'Long-lasting, chip-resistant nail polish in a vibrant pink shade.',
                'image' => 'https://images.unsplash.com/photo-1506668635606-caa32e3f6541?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'ingredients' => 'Butyl Acetate, Ethyl Acetate, Nitrocellulose, Adipic Acid/Neopentyl Glycol/Trimellitic Anhydride Copolymer',
                'usage_instructions' => 'Apply two coats for full coverage. Allow to dry between coats.'
            ]
        ];

        foreach ($sampleProducts as $productData) {
            $product = $this->productFactory->create();
            $product->setData($productData);
            $product->save();
        }

        $this->moduleDataSetup->endSetup();
    }

    /**
     * {@inheritdoc}
     */
    public static function getDependencies()
    {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function getAliases()
    {
        return [];
    }
}