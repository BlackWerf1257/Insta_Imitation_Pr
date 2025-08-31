<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Methods: POST, DELETE");
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

    if (!isset($_POST['id']) || empty($_POST['id'])) {
        // 로그인 성공: 'status'와 사용자 데이터를 함께 응답
        $response_data['status'] = 'failed';
        $response_data['message'] = 'ID가 없습니다';

        echo json_encode($response_data);
        mysqli_close($conn); // 데이터베이스 연결 닫기
        exit();
    }

     $idx = $_POST['id'];

    $sql = "DELETE FROM post Where  id='$idx'";
    $result = mysqli_query($conn, $sql);
    
    if ($result) {
    //응답 처리용 빈 배열 생성
    $affected_rows = mysqli_affected_rows($conn);


    if ($affected_rows > 0) {
        // 로그인 성공: 'status'와 사용자 데이터를 함께 응답
        $response_data['status'] = 'succeed';
        $response_data['message'] = '글이 삭제되었습니다';
    }
    else
    {
        $response_data['status'] = 'failed';
        $response_data['message'] = '글 삭제에 실패했습니다';
    }

            echo json_encode($response_data);
        mysqli_close($conn); // 데이터베이스 연결 닫기
        exit(); // 스크립트 종료
}

