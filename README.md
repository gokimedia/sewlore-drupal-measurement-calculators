# Sewlore Measurement Calculators for Drupal

A Drupal 11 block with local fabric stretch/recovery, button-centre intervals and cm/mm/in conversion. No data storage, analytics, external API, or remote runtime code. Version 1.0.0.

## Install and use

Extract `sewlore_measurement` into `web/modules/custom/`, enable the module on Extend, then place **Sewlore Measurement Calculators** through Structure → Block layout. Each calculator has its own form and output. Multiple instances are supported. Enable JavaScript to calculate.

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
