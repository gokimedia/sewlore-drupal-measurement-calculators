/**
 * @file
 * Drupal behaviors for local, accessible measurement forms.
 * GPL-2.0-or-later. Copyright (c) 2026 Sewlore.
 */
(function (Drupal, once, math) {
  'use strict';
  function fixed(value) { return Number(value.toFixed(8)).toString(); }
  function percentage(value) { return fixed(value) + '%'; }
  function translate(message, values) { return Drupal.t(message, values || {}); }
  function decimal(form, name) { return math.parseDecimal(form.elements.namedItem(name).value); }
  function result(form) {
    var kind = form.dataset.calculator;
    if (kind === 'stretch') {
      var reading = math.stretch(decimal(form, 'original'), decimal(form, 'stretched'), decimal(form, 'released'));
      var recovery = reading.recoveredExtensionPercent === null ? translate('undefined (no extension)') : percentage(reading.recoveredExtensionPercent);
      var text = translate('Stretch: @stretch. Residual change: @residual. Recovered extension: @recovery.', {'@stretch': percentage(reading.stretchPercent), '@residual': percentage(reading.residualChangePercent), '@recovery': recovery});
      if (reading.unusualReleasedLength) text += ' ' + translate('Released length is outside the original-to-stretched range; check your readings.');
      return text;
    }
    if (kind === 'buttons') {
      var layout = math.buttons(decimal(form, 'length'), decimal(form, 'top'), decimal(form, 'bottom'), decimal(form, 'count'));
      return translate('Spacing: @spacing. Centres from the start: @centres.', {'@spacing': fixed(layout.spacing), '@centres': layout.positions.map(fixed).join(', ')});
    }
    if (kind === 'convert') {
      var to = form.elements.namedItem('to').value;
      return fixed(math.convert(decimal(form, 'value'), form.elements.namedItem('from').value, to)) + ' ' + to;
    }
    throw new RangeError('unknown');
  }
  var messages = {
    required: 'Enter a decimal number. Use a dot or comma, without grouping separators.',
    positive: 'Lengths must be greater than zero.',
    nonnegative: 'Lengths and margins must be zero or greater.',
    stretched: 'Stretched length must be at least the original length.',
    count: 'Button count must be a whole number from 2 to 100.',
    span: 'Start and end margins must leave a positive button span.',
    range: 'This result is outside the supported number range.',
    unit: 'Choose cm, mm or in.'
  };
  Drupal.behaviors.sewloreMeasurement = {
    attach: function (context) {
      once('sewlore-measurement', '[data-sewlore-measurement] form', context).forEach(function (form) {
        form.addEventListener('submit', function (event) {
          event.preventDefault();
          var output = form.querySelector('output');
          try { output.textContent = result(form); output.removeAttribute('data-error'); }
          catch (error) { output.textContent = translate(messages[error.code] || 'Check the entered measurements.'); output.setAttribute('data-error', 'true'); }
        });
        // Enable submission only after its local cancellation handler exists.
        // Missing JavaScript therefore leaves the default submit button disabled.
        form.querySelectorAll('button[type="submit"]').forEach(function (button) {
          button.disabled = false;
        });
        var note = form.closest('[data-sewlore-measurement]').querySelector('[data-sewlore-ready-note]');
        if (note) note.remove();
      });
    }
  };
})(Drupal, once, sewloreSewingCalculatorMath);
