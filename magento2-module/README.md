# Magento 2 Module Development

This directory contains Magento 2 modules that can be installed in a Magento 2 instance.

## Module: Cosmetics_Products

A comprehensive module for managing cosmetics products in Magento 2.

### Installation Instructions

1. Copy the `Cosmetics` directory to your Magento installation's `app/code` directory:
   ```
   cp -r Cosmetics /path/to/magento/app/code/
   ```

2. Enable the module:
   ```bash
   cd /path/to/magento
   bin/magento module:enable Cosmetics_Products
   bin/magento setup:upgrade
   bin/magento setup:di:compile
   bin/magento cache:clean
   ```

3. Access the module in your browser:
   ```
   Admin: https://your-magento-url/admin/cosmetics/product/
   Frontend: https://your-magento-url/cosmetics
   ```

### Module Features

- **Admin Management**: Complete CRUD operations for cosmetics products
- **Custom Database**: Dedicated table for cosmetics-specific attributes
- **Frontend Display**: Responsive product listing with filtering
- **Sample Data**: Pre-configured sample products

### Module Structure

- `etc/`: Configuration files
  - `module.xml`: Module definition
  - `db_schema.xml`: Database schema
  - `adminhtml/menu.xml`: Admin menu configuration
  - `acl.xml`: Access control lists
  
- `Model/`: Data models
  - `Product.php`: Main product model
  - `ResourceModel/`: Database interaction
  
- `Controller/`: Request handlers
  - `Adminhtml/Product/`: Admin controllers
  - `Index/`: Frontend controllers
  
- `Block/`: View logic
  - `Adminhtml/Product/`: Admin blocks
  - `ProductList.php`: Frontend product listing
  
- `view/`: Templates and layouts
  - `adminhtml/layout/`: Admin layouts
  - `frontend/templates/`: Frontend templates
  - `frontend/web/css/`: Frontend styles
  
- `Setup/Patch/Data/`: Data installation scripts

## Module: HelloWorld_HelloWorld

A simple "Hello World" module that demonstrates the basic structure of a Magento 2 module.

### Installation Instructions

1. Copy the `HelloWorld` directory to your Magento installation's `app/code` directory:
   ```
   cp -r HelloWorld /path/to/magento/app/code/
   ```

2. Enable the module:
   ```bash
   cd /path/to/magento
   bin/magento module:enable HelloWorld_HelloWorld
   bin/magento setup:upgrade
   bin/magento setup:di:compile
   bin/magento cache:clean
   ```

3. Access the module in your browser:
   ```
   https://your-magento-url/helloworld
   ```

Refer to the Magento 2 developer documentation for more advanced module development techniques.