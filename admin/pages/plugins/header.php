<?php
session_set_cookie_params(0, "/fg_packaging_debug_vanilla");
session_name("fg-pkg-debug-vanilla");
session_start();

if (!isset($_SESSION['username'])) {
  header('location:../');
  exit;
} else {
  if(!isset($_COOKIE['name'])) {
    $name = $_SESSION['name'];
    setcookie('name', $name, 0, "/fg_packaging_debug_vanilla");
  }
  if(!isset($_COOKIE['role'])) {
    $role = $_SESSION['role'];
    setcookie('role', $role, 0, "/fg_packaging_debug_vanilla");
  }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">