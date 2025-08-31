<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: *');

$imageName = $_GET['image'] ?? '';

if (empty($imageName)) {
    http_response_code(404);
    echo json_encode(["status" => "failed", "message" => "이미지 이름이 필요합니다."]);
    exit();
}

// 보안을 위해 파일명 검증
if (preg_match('/[^a-zA-Z0-9._-]/', $imageName)) {
    http_response_code(400);
    echo json_encode(["status" => "failed", "message" => "유효하지 않은 파일명입니다."]);
    exit();
}

$imagePath = __DIR__ . "/../Image/post/" . $imageName;

if (!file_exists($imagePath)) {
    http_response_code(404);
    echo json_encode(["status" => "failed", "message" => "이미지를 찾을 수 없습니다."]);
    exit();
}

// 이미지 파일의 MIME 타입 확인
$imageInfo = getimagesize($imagePath);
if ($imageInfo === false) {
    http_response_code(400);
    echo json_encode(["status" => "failed", "message" => "유효하지 않은 이미지입니다."]);
    exit();
}

// 적절한 Content-Type 헤더 설정
header('Content-Type: ' . $imageInfo['mime']);
header('Content-Length: ' . filesize($imagePath));

// 이미지 파일 출력
readfile($imagePath);
?>