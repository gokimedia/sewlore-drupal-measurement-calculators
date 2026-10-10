<?php

declare(strict_types=1);

namespace Drupal\sewlore_measurement\Plugin\Block;

use Drupal\Component\Utility\Html;
use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Provides three local calculators without external services or tracking.
 */
#[Block(
  id: 'sewlore_measurement_calculators',
  admin_label: new TranslatableMarkup('Sewlore Measurement Calculators'),
  category: new TranslatableMarkup('Tools'),
)]
final class MeasurementCalculatorsBlock extends BlockBase {

  public function defaultConfiguration(): array {
    return ['show_reference' => FALSE] + parent::defaultConfiguration();
  }

  public function blockForm($form, FormStateInterface $form_state): array {
    $form['show_reference'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Show an optional link to the Sewlore measurement methods reference'),
      '#default_value' => (bool) $this->configuration['show_reference'],
      '#description' => $this->t('Off by default. The calculators work fully without this link.'),
    ];
    return $form;
  }

  public function blockSubmit($form, FormStateInterface $form_state): void {
    $this->configuration['show_reference'] = (bool) $form_state->getValue('show_reference');
  }

  public function build(): array {
    return [
      '#theme' => 'sewlore_measurement_calculators',
      '#instance_id' => Html::getUniqueId('sewlore-measurement'),
      '#show_reference' => (bool) $this->configuration['show_reference'],
      '#attached' => ['library' => ['sewlore_measurement/calculators']],
    ];
  }

}
