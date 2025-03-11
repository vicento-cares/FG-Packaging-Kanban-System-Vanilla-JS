<?php
set_time_limit(0);
session_set_cookie_params(0, "/fg_packaging_debug_vanilla");
session_name("fg-pkg-debug-vanilla");
session_start();

if (!isset($_SESSION['username'])) {
    header('location:../../admin/');
    exit();
}

require('../db/conn.php');
require('../lib/main.php');

switch (true) {
    case !isset($_GET['store_out_date_from']):
    case !isset($_GET['store_out_date_to']):
    case !isset($_GET['line_no']):
    case !isset($_GET['item_no']):
    case !isset($_GET['item_name']):
    case !isset($_GET['section']):
    case !isset($_GET['c']):
        echo 'Query Parameters Not Set';
        exit();
        break;
}

$store_out_date_from = $_GET['store_out_date_from'];
$store_out_date_from = date_create($store_out_date_from);
$store_out_date_from = date_format($store_out_date_from, "Y-m-d H:i:s");
$store_out_date_to = $_GET['store_out_date_to'];
$store_out_date_to = date_create($store_out_date_to);
$store_out_date_to = date_format($store_out_date_to, "Y-m-d H:i:s");
$line_no = $_GET['line_no'];
$item_no = $_GET['item_no'];
$item_name = $_GET['item_name'];
$section = $_GET['section'];
$c = $_GET['c'];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="FG Packaging System" />
    <meta name="keywords" content="FG, Packaging, Kanban, Request" />
    <title>FG Packaging | Print Kanban Store Out</title>

    <!-- Bootstrap -->
    <link rel="preload" href="../../plugins/bootstrap/css/bootstrap.min.css" as="style" onload="this.rel='stylesheet'">
    <link rel="stylesheet" href="../../plugins/bootstrap/css/bootstrap.min.css">
    <style>
        @media print {
            @page {
                size: portrait;
            }
        }

        table,
        tr,
        td,
        th {
            color: black;
            border: 1px solid black;
            border-width: medium;
            border-collapse: collapse;
        }
    </style>

    <!-- jQuery -->
    <script src="../../plugins/jquery/jquery.min.js"></script>
    <script src="../../plugins/jqueryqrcode/jquery.qrcode.min.js"></script>
    <script src="../../plugins/jsbarcode/dist/barcodes/JsBarcode.code128.min.js"></script>

    <noscript>
        <link rel="stylesheet" href="../../plugins/bootstrap/css/bootstrap.min.css">
    </noscript>

    <link rel="icon" type="image/x-icon" href="../../dist/img/fg-pkg-logo.png">
</head>

<body>
    <noscript>
        <br>
        <span>We are facing <strong>Script</strong> issues. Kindly enable <strong>JavaScript</strong>!!!</span>
        <br>
        <span>Call IT Personnel Immediately!!! They will fix it right away.</span>
    </noscript>
    <?php
    $r = 0;
    $sql = "SELECT kanban, kanban_no, serial_no, item_no, item_name, line_no, quantity, storage_area, section, route_no, truck_no, scan_date_time, request_date_time, store_out_date_time FROM kanban_history";
    if ($section == 'All') {
        $sql = $sql . " WHERE line_no LIKE '$line_no%' AND item_no LIKE '$item_no%' AND item_name LIKE '$item_name%' AND (store_out_date_time >= '$store_out_date_from' AND store_out_date_time <= '$store_out_date_to') ORDER BY id ASC";
    } else {
        $sql = $sql . " WHERE section = '$section' AND line_no LIKE '$line_no%' AND item_no LIKE '$item_no%' AND item_name LIKE '$item_name%' AND (store_out_date_time >= '$store_out_date_from' AND store_out_date_time <= '$store_out_date_to') ORDER BY id ASC";
    }
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        foreach ($stmt->fetchAll() as $row) {
            $c++;
            $r++;
            $kanban_details = get_kanban_details($row['kanban'], $row['serial_no'], $conn);
            $order_date_time = $row['request_date_time'];
            $delivery_date_time = $row['store_out_date_time'];
            $route_no = $row['route_no'];
            $truck_no = $row['truck_no'];
            ?>
            <div class="row ml-1">
                <table class="mx-1 my-1" style="width:80%;">
                    <tbody>
                        <tr>
                            <td colspan="3" style="background-color: black; color: white;">
                                <center>
                                    <span class="font-weight-bold" style="font-size:20px;">FG PACKAGING</span>
                                </center>
                            </td>
                        </tr>
                        <tr>
                            <td class="w-75" colspan="2">
                                <span class="font-weight-bold" style="font-size:14px;">Item Name : </span>
                                <span class="font-weight-bold"
                                    style="font-size:24px;"><?= htmlspecialchars($row['item_name']); ?></span>
                            </td>
                            <td rowspan="5" class="pt-2 px-3">
                                <center><label id="kanban<?= htmlspecialchars($c); ?>"></label></center>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <span class="font-weight-bold" style="font-size:14px;">Item No : </span>
                                <span class="font-weight-bold"
                                    style="font-size:24px;"><?= htmlspecialchars($row['item_no']); ?></span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <span class="font-weight-bold" style="font-size:14px;">Dimension : </span>
                                <span class="font-weight-bold"
                                    style="font-size:20px;"><?= htmlspecialchars($kanban_details['dimension']); ?></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="font-weight-bold" style="font-size:14px;">Size : </span>
                                <span class="font-weight-bold"
                                    style="font-size:20px;"><?= htmlspecialchars($kanban_details['size']); ?></span>
                            </td>
                            <td>
                                <span class="font-weight-bold" style="font-size:14px;">Color : </span>
                                <span class="font-weight-bold"
                                    style="font-size:20px;"><?= htmlspecialchars($kanban_details['color']); ?></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="font-weight-bold" style="font-size:14px;">Quantity : </span>
                                <span class="font-weight-bold"
                                    style="font-size:24px;"><?= htmlspecialchars($row['quantity']); ?></span>
                            </td>
                            <td>
                                <span class="font-weight-bold" style="font-size:14px;">Storage Area : </span>
                                <span class="font-weight-bold"
                                    style="font-size:24px;"><?= htmlspecialchars($row['storage_area']); ?></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="font-weight-bold" style="font-size:14px;">Section : </span>
                                <span class="font-weight-bold"
                                    style="font-size:30px;"><?= htmlspecialchars($row['section']); ?></span>
                            </td>
                            <td>
                                <span class="font-weight-bold" style="font-size:14px;">Line : </span>
                                <span class="font-weight-bold"
                                    style="font-size:30px;"><?= htmlspecialchars($row['line_no']); ?></span>
                            </td>
                            <td>
                                <span class="font-weight-bold" style="font-size:14px;">Route No: </span>
                                <span class="font-weight-bold" style="font-size:24px;"><?= htmlspecialchars($route_no); ?></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="font-weight-bold" style="font-size:14px;">Order: </span>
                                <span class="font-weight-bold"
                                    style="font-size:18px;"><?= htmlspecialchars($order_date_time); ?></span>
                            </td>
                            <td>
                                <span class="font-weight-bold" style="font-size:14px;">Delivery: </span>
                                <span class="font-weight-bold"
                                    style="font-size:18px;"><?= htmlspecialchars($delivery_date_time); ?></span>
                            </td>
                            <td>
                                <span class="font-weight-bold" style="font-size:14px;">Truck No: </span>
                                <span class="font-weight-bold" style="font-size:18px;"><?= htmlspecialchars($truck_no); ?></span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="px-1 py-2">
                                <center>
                                    <img id="serial<?= htmlspecialchars($c); ?>" alt="serial" style="width:398px; height:50px;">
                                    <br>
                                    <span class="font-weight-bold" style="font-size:18px;"
                                        id="serial_no<?= htmlspecialchars($c); ?>"></span>
                                </center>
                            </td>
                            <td>
                                <span class="font-weight-bold" style="font-size:14px;">Kanban No: </span>
                                <span class="font-weight-bold"
                                    style="font-size:18px;"><?= htmlspecialchars($row['kanban_no']); ?></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <script>
                    $('#kanban<?= $c; ?>').qrcode({
                        text: "<?= addslashes($row['kanban']); ?>",
                        width: 125,
                        height: 125
                    });
                    JsBarcode("#serial<?= $c; ?>", "<?= $row['serial_no']; ?>", { format: "CODE128", displayValue: false });
                    document.querySelector("#serial_no<?= $c; ?>").innerHTML = "<?= $row['serial_no']; ?>";
                </script>
            </div>
            <!-- Adding Div For Ensuring One Kanban Per Page -->
            <?php
            if ($r == 3) {
                $r = 0;
                ?>
                <div class="row mb-5"></div>
                <div class="row mb-5"></div>
                <div class="row mb-5"></div>
                <div class="row mb-5"></div>
                <?php
            }
        }
    }
    $conn = null;
    ?>

    <script>
        setTimeout(print_data, 2000);
        function print_data() {
            window.print();
        }
    </script>
</body>

</html>