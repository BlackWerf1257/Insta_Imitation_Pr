<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET");
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Headers: Content-Type");


$host = 'localhost'; // MySQL 호스트
$username = 'myreactstudy1'; // MySQL 사용자명
$password = 'w2939000!'; // MySQL 비밀번호
$database = 'myreactstudy1'; // 사용할 데이터베이스명

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'DB 연결 실패']);
    exit();
}

$sql = "SELECT id, title, content, image_path FROM post ORDER BY created_at DESC";
$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>
