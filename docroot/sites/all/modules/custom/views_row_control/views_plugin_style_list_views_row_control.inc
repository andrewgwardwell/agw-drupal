<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Awardwell
 * Date: 4/22/13
 * Time: 7:16 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Style plugin to render each item in an ordered or unordered list.
 *
 * @ingroup views_style_plugins
 */

class views_plugin_style_list_views_row_control extends views_plugin_style_list {
  /**
   * Set default options
   */
  function option_definition() {
    $options = parent::option_definition();

    $options['type'] = array('default' => 'ul');
    $options['class'] = array('default' => '');
    $options['wrapper_class'] = array('default' => 'item-list');
    $options['distinct_control'] = array('default' => 'enter_values for distinct control');

    return $options;
  }

  /**
   * Render the given style.
   */
  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    $form['views_row_control'] = array(
      '#title' => t('Enable Row Control'),
      '#description' => t('Enable functionality to allow targeting of specific rows would like to target.'),
      '#type' => 'checkbox',
      '#default_value' => $this->options['views_row_control'],
    );
    $field_options = $this->display->handler->get_field_labels(TRUE);
    $form['fields'] = array(
      '#title' => 'Fields',
      '#type' => 'select',
      '#options' => $field_options,
      '#default_values' => array('Nothing Selected'),
    );
  }
}


function views_row_control_form_ajax(){
  $form = array();
  $form['test_options'] = array(
    '#type' => 'markup',
    '#markup' => '<div><span> HEY THERE BOYO</span></div>',
  );
  return render($form);
}