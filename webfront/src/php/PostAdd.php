<?php
header('Access-Control-Allow-Origin: http://127.0.0.1:3000');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$host = 'localhost'; // MySQL 호스트
$sqlUsername = 'myreactstudy1'; // MySQL 사용자명
$password = 'w2939000!'; // MySQL 비밀번호
$database = 'myreactstudy1'; // 사용할 데이터베이스명

$conn = mysqli_connect($host, $sqlUsername, $password, $database);
if (!$conn) {
    echo json_encode([
        'status' => 'error',
        'message' => 'DB 연결 실패: ' . mysqli_connect_error()
    ]);
    exit();
}

// POST 데이터 수신
$userId = isset($_POST['userId']) ? $_POST['userId'] : '';
$title = isset($_POST['title']) ? $_POST['title'] : '';
$text = isset($_POST['text']) ? $_POST['text'] : '';
$imagePath = null;

// 입력 확인
if (empty($title) || empty($text)) {
    echo json_encode([
        'status' => 'failed',
        'message' => '제목과 내용을 모두 입력해야 합니다.'
    ]);
    exit();
}
if (empty($userId)) {
    echo json_encode([
        'status' => 'failed',
        'message' => '유저 정보 가져오기 실패'
    ]);
    exit();
}

// 이미지 업로드 처리
if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
    $fileTypeExt = explode("/", $_FILES['img']['type']);
    $fileExt = $fileTypeExt[1];

    switch ($fileExt) {
        case 'jpeg':
        case 'jpg':
        case 'png':
            $root = __DIR__ . "/../Image/post/";
            if (!is_dir($root)) {
                if (!mkdir($root, 0755, true)) {
                    echo json_encode([
                        'status' => 'failed',
                        'message' => '디렉토리 생성 실패'
                    ]);
                    exit();
                }
            }

            $uploadImg = uniqid() . '_' . basename($_FILES['img']['name']);
            $uploadPath = $root . $uploadImg;
            if (move_uploaded_file($_FILES['img']['tmp_name'], $uploadPath)) {
                $imagePath = $uploadImg;
            } else {
                echo json_encode([
                    'status' => 'failed',
                    'message' => '이미지 업로드 실패'
                ]);
                exit();
            }
            break;
        default:
            echo json_encode([
                'status' => 'failed',
                'message' => 'jpeg, jpg, png 파일만 업로드 가능합니다.'
            ]);
            exit();
    }
}

// DB 삽입 (테이블명과 컬럼명은 실제 사용 중인 것에 맞게 수정하세요)
$sql = "INSERT INTO post (userId, title, content, image_path, created_at) VALUES (?, ?, ?, ?, NOW())";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ssss", $userId, $title, $text, $imagePath);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        'status' => 'succeed',
        'message' => '게시글이 성공적으로 추가되었습니다.'
    ]);
} else {
    echo json_encode([
        'status' => 'failed',
        'message' => '게시글 추가 실패: ' . mysqli_error($conn)
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
exit();
