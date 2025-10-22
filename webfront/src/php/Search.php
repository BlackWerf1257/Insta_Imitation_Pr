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
    echo json_encode(["status" => "failed", "message" => "DB 연결 실패"]);
    exit();
}

$input = isset($_GET['input']) ? $_GET['input'] : '';
$searchTerm = '%' . $input . '%';


$stmt = $conn->prepare("SELECT id, title, userId, content, image_path, created_at FROM post WHERE title LIKE '$searchTerm'");
$stmt->execute();
$result = $stmt->get_result();
$post = [];
while ($row = $result->fetch_assoc()) {
    $post[] = $row;
}

if ($post) {
    echo json_encode($post);
} else {
    echo json_encode(["status" => "failed", "message" => "게시글을 찾을 수 없습니다."]);
}
$conn->close();