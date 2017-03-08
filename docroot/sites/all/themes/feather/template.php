<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Awardwell
 * Date: 3/16/13
 * Time: 5:17 PM
 * To change this template use File | Settings | File Templates.
 */


/**
 *theming function may not have to use
 *
 */

function feather_checkboxes_as_fieldset($vars){
//    $form = array_pop($vars);
//    $options = $form['#options'];
//    $keys = array();
//    foreach($options as $key => $option){
//      $keys[$key] = $key;
//    }
//    foreach($keys as $key){
//      $form[$key]['#prefix'] = '<a class="nav-link-items" href="javascript:void();">';
//      $form[$key]['#suffix'] = '</a>';
//    }
}

/**
 * @return array
 * theme registration function
 */
function feather_theme(){
  return array(
    'checkboxes_as_fieldset' => array(
      'form' => NULL,
    ),
    'stat_node' => array(
      'node' => NULL
    ),
  );
}

function feather_stat_node(&$vars){
  $node = $vars['node'];
  $wrapper = entity_metadata_wrapper('node', $node);
  $percentatge = $wrapper->field_percentage->raw();
  $title = '<div class="skill__title">'.$node->title.'</div>';
  $skill_div = '<div class = "skill__perc" data-perc = "'.$percentatge.'"></div>';
  $node_row = '<div class = "skill__row">'.$title.$skill_div.'</div>';
  return $node_row;

}



//function feather_preprocess_page($vars){
//  if (drupal_is_front_page()){
//    // we don't want to see any nodes
//    unset($vars['page']['content']['system_main']);
//  }
//
//}

/**
 * @param $vars
 * implementation of hook preprocess node
 */

function feather_preprocess_page(&$vars){
  feather_js_feeds();
  drupal_add_js(drupal_get_path('theme', 'feather').'/backbone/lib/require.js');
  $base_path = base_path().drupal_get_path('theme', 'feather').'/';
  drupal_add_js("var base_path = '$base_path';", 'inline');
  drupal_add_js(
    "require([base_path + 'backbone/common.js'], function() {
    require(['app/global']);
    });", 'inline'
  );
  $currentPath = current_path();
  if($currentPath === 'user/register'){
    drupal_goto('');
  }
}


function feather_js_feeds(){
 $feed['projects'] = feather_get_projects();
 foreach($feed as $key => $f){
   drupal_add_js(array($key => array_values($f)), 'setting');
 }
}

function feather_get_projects(){
  $query = new EntityFieldQuery();
  $query->entityCondition('entity_type', 'node')
    ->entityCondition('bundle', 'ent_project');
//    ->fieldCondition('field_ent_project_type_vocref', 'tid', 5);
  $results = $query->execute();
  $nodes = node_load_multiple(array_keys($results['node']));
  $pro_list = array();
  foreach($nodes as $n){
    $uri = $n->field_image[LANGUAGE_NONE][0]['uri'];
    $image = image_style_url('home_page_work_480w_270h', $uri);
    $type = taxonomy_term_load($n->field_ent_project_type_vocref[LANGUAGE_NONE][0]['tid']);
    $skills = array();
    $raw_images = field_get_items('node', $n, 'field_gallery_image');
    $images = array();
    foreach($raw_images as $r){
      $images[] = file_create_url($r['uri']);
    }
    foreach($n->field_skill_category[LANGUAGE_NONE] as $t){
      $term = taxonomy_term_load($t['tid']);
      $skills[] = $term->name;
    }
    $pro_list[] = array(
      'title' => $n->title,
      'nid' => $n->nid,
      'description' => $n->body[LANGUAGE_NONE][0]['value'],
      'image' => $image,
      'images' => $images,
      'skills' => $skills,
      'link' => $n->field_external_link['und'][0]['value'],
      'project_type' => $type->name
    );
  }
  return $pro_list;
}


/**
 * @param $vars
 * implementation of hook preprocess node
 */

function feather_preprocess_node(&$vars){
//  $view_mode = $vars['view_mode'];
//  if($view_mode == 'front_work_view'){
//    $vars['theme_hook_suggestions'][] = 'node__ent_project__listing';
//  }
 if (arg(0) == 'node' && $vars['type'] == 'ent_project'){
   // processing for the flexslider
   // $hero_image = $vars['field_image'];

    $n_n = entity_metadata_wrapper('node', $vars['node']);
    $sm_img = image_style_url('w375max', $n_n->field_image->value()['uri']);
    $md_img = image_style_url('w768max', $n_n->field_image->value()['uri']);
    $lg_img = image_style_url('w992max', $n_n->field_image->value()['uri']);
    $xl_img = image_style_url('w1280max', $n_n->field_image->value()['uri']);

    $vars['node']->res_images = array(
      'sm_img' => $sm_img,
      'md_img' => $md_img,
      'lg_img' => $lg_img,
      'xl_img' => $xl_img
    );
   $gallery_images = $n_n->field_gallery_image->value();
   foreach ($gallery_images as $g_image){
     $uri = $g_image['uri'];
     $image_url = image_style_url('front_page_image', $uri);
     $thumb_crop = image_style_url('slide_thumbcrop_image', $uri);
     $slide_description = $g_image['alt'];
     $slides [] = '<li data-thumb="'.$thumb_crop.'"><img class="slide__image" src="'.$image_url.'" /><div class = "slide__description">'.
     $slide_description.'</div></li>';
   }

   // $vars['slides'] = '<ul class="slides">'.implode('', $slides).'</ul>';
 }
}

function ent_image_sizing($dimensions, $uri){
// function for generating numerous images with different dimensions for quick switching on mobile
}

function _theme(){
  return array(
    'anchor_tag' => array(
      'items' => array(),
    ),
  );
}