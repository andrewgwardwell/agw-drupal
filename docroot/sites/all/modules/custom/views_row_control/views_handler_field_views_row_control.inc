<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Awardwell
 * Date: 5/10/13
 * Time: 4:38 PM
 * To change this template use File | Settings | File Templates.
 */

class views_handler_field_views_row_control extends views_handler_field {


  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    $form['blah_blah'] = array(
      '#title' => t('Blan Blan'),
      '#type' => 'markup',
      '#markup' => '<div><span>HEY HEY</span></div>'
    );
  }
}