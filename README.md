# Sewlore Measurement Calculators for Drupal

A Drupal 11 block with local fabric stretch/recovery, button-centre intervals and cm/mm/in conversion. No data storage, analytics, external API, or remote runtime code. Calculator implementation 1.0.0. Composer package versions are derived from Git tags.

## Install and use

Requires Drupal 11, PHP 8.3 or newer, and JavaScript for calculation. In a Composer-managed Drupal site, install the package from your project root:

```sh
composer require sewlore/measurement-calculators:^1.0
```

The module uses `composer/installers` and declares the machine directory name `sewlore_measurement`. Drupal's recommended project normally installs it at `web/modules/contrib/sewlore_measurement`; the legacy layout normally uses `modules/contrib/sewlore_measurement`. Keep your existing root project's `extra.installer-paths` setting. If your project has no Drupal installer path, set the appropriate one before installing; for a `web/` document root it is:

```json
{
  "config": {
    "allow-plugins": {
      "composer/installers": true
    }
  },
  "extra": {
    "installer-paths": {
      "web/modules/contrib/{$name}": ["type:drupal-module"]
    }
  }
}
```

Merge those entries with your project configuration; do not replace other installer paths or plugin permissions. Composer's installer plugin executes locally, so inspect its request before granting the normal Composer plugin permission. Installing the package does not enable it.

Enable **Sewlore Measurement Calculators** on Extend, then place the block through Structure → Block layout. If your site already has Drush, `drush en sewlore_measurement -y` enables it. The module does not require Drush. Each calculator has its own form and output, and multiple block instances are supported. A demonstration route is available at `/sewlore-measurement-calculators` to users with the normal `access content` permission.

For manual installation, use the existing `releases/sewlore-measurement-drupal-1.0.0.zip`: extract its `sewlore_measurement` directory into `web/modules/custom/` or `modules/custom/`, according to your document root. A GitHub source archive has a repository-named wrapper; rename that wrapper to `sewlore_measurement` before installing manually. Install one copy of the module at a time.

The ZIP retains the original manual distribution bytes. Composer installs the repository root, which contains the module's `.info.yml`, `src/`, templates and local assets. The archive in `releases/` is an alternative download, not a second enabled module. There are no installation scripts in this package.

Calculation buttons start disabled and become available only after the local submit handler is attached. If JavaScript is disabled or a script fails to load, the buttons stay disabled and the initial instructions remain visible. This prevents normal click or implicit Enter submissions from sending readings to the host as a fallback. No calculation readings are submitted, stored or sent by the module.

The optional public measurement-reference link is **off by default** in each block's configuration. It can be enabled and disabled by the site administrator. The complete calculator functionality works without it.

## Measurement reference

[Fabric measurement methods and worked examples — Sewlore](https://sewlore.com/pages/fabric-measurement-methods-guide).

Stretch = (stretched − original) / original × 100. Residual change = (released − original) / original × 100. Recovered extension = (stretched − released) / (stretched − original) × 100; it is undefined with zero extension. Signed unusual released readings are shown with a check-readings notice. These calculations describe the entered readings and do not predict fabric behavior, fit, shrinkage, or physical print performance.

Button spacing = (total length − start margin − end margin) / (count − 1). Count includes both endpoints and is an integer from 2 through 100. Lengths must leave a positive span. Use the same unit for all lengths. Unit conversion uses exactly 25.4 mm per inch.

## Synthetic tutorial examples

- Stretch readings 10, 14, 10.5 → 40% stretch, 5% residual change, 87.5% recovered extension.
- Button inputs 30, 2, 2, 5 → 6.5 spacing; centres 2, 8.5, 15, 21.5, 28.
- 25.4 mm → 1 inch.

## Licence and attribution

This Drupal distribution is GPL-2.0-or-later. The arithmetic library was adapted from Sewlore's MIT-licensed sewing-math/WordPress implementation; its MIT notice is retained in `NOTICE-MIT.txt` and `js/math.js`. See `LICENSE.txt`. No compulsory public-facing attribution or backlink is required.

## Limitations

No physical fabric experiment or printed-tool validation is claimed. Public directory acceptance and security-advisory coverage are independent of installing this module.
