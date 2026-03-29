# HelloWorld Magento 2 Module

This is a simple "Hello World" module for Magento 2.

## Installation

1. Create a directory structure in your Magento installation:
   ```
   app/code/HelloWorld/HelloWorld/
   ```

2. Copy all the files from this module into that directory.

3. Enable the module:
   ```bash
   bin/magento module:enable HelloWorld_HelloWorld
   bin/magento setup:upgrade
   bin/magento setup:di:compile
   bin/magento cache:clean
   ```

## Features

- Creates a simple frontend route at `/helloworld`
- Displays a "Hello World" message

## Structure

- `registration.php`: Registers the module with Magento
- `etc/module.xml`: Defines module version and dependencies
- `etc/frontend/routes.xml`: Configures frontend routes
- `Controller/Index/Index.php`: Controller for the frontend route
- `view/frontend/layout/helloworld_index_index.xml`: Layout for the frontend page
- `view/frontend/templates/helloworld.phtml`: Template for the frontend page
- `Block/HelloWorld.php`: Block class for the frontend page

## Customization

You can modify the template file `view/frontend/templates/helloworld.phtml` to change the displayed content.