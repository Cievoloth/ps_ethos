# Processmaker Ps_ethos
This package provides the necessary base code to start the developing a package in ProcessMaker 4.

## Development
If you need to create a new ProcessMaker package run the following commands:

```
git clone https://github.com/garymeyertrigo/ps_ethos.git
cd ps_ethos
php rename-project.php ps_ethos
composer install
npm install
npm run dev
```

## Installation
* Use `composer require processmaker/ps_ethos` to install the package.
* Use `php artisan ps_ethos:install` to install generate the dependencies.

## Navigation and testing
* Navigate to administration tab in your ProcessMaker 4
* Select `Skeleton Package` from the administrative sidebar

## Uninstall
* Use `php artisan ps_ethos:uninstall` to uninstall the package
* Use `composer remove processmaker/ps_ethos` to remove the package completely
