<?php

$url = "http://localhost:3000/sinh-ton";
$response = file_get_contents($url);

$data = json_decode($response, true);

foreach ($data as $row) {
    echo "Bệnh nhân: " . $row["mabenhnhan"] . "<br>";
    echo "Nhịp tim: " . $row["nhiptim"] . " bpm<br>";
    echo "SpO2: " . $row["nongdooxy"] . " %<br>";
    echo "Thời gian: " . $row["thoigiando"] . "<br><br>";
}

?>