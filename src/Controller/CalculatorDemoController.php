<?php

declare(strict_types=1);

namespace Drupal\sewlore_measurement\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Block\BlockManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a public demonstration of the installed local calculators.
 */
final class CalculatorDemoController extends ControllerBase {
  public function __construct(protected readonly BlockManagerInterface $blockManager) {}

  public static function create(ContainerInterface $container): static {
    return new static($container->get('plugin.manager.block'));
  }

  public function page(): array {
    $block = $this->blockManager->createInstance('sewlore_measurement_calculators', ['show_reference' => FALSE]);
    return $block->build();
  }
}
