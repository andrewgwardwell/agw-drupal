<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Awardwell
 * Date: 4/14/13
 * Time: 8:25 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @file better_exposed_filters.views.inc
 *
 * Adds Views3 support
 *
 * Views3 adds the concept of exposed forms to the mix.  In addition, elements injected into a Views
 * dialog is no longer saved along with the Views form information (see the unpack_options() and
 * options_definition() methods of the views_object object).
 *
 */

/**
 * Implements hook_views_plugins().
 */
function views_row_control_views_plugins() {

  return array(
    'style' => array(
      'views_row_control' => array(
        'path' => drupal_get_path('module', 'views_row_control'),
        'title' => t('Row Control'),
        'help' => t('Gives you the ability to control class structure for distinct rows.'),
        'handler' => 'views_plugin_style_list_views_row_control',
        'uses row plugin' => TRUE,
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'type' => 'normal',
        'parent' => 'list',
      ),
    ),
  );
}



function views_row_control_views_data() {
  $data = array();

  $data['node']['views_row_control'] = array(
    'title' => t('Views Row Control Handler'),
    'help' => t('Allows you the ability to target specific patterns of rows.'),
    'field' => array(
      'handler' => 'views_handler_field_views_row_control',
    ),
  );

  return $data;
}