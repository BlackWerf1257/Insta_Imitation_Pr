<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Methods: GET");
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost'; // MySQL 호스트
$username = 'myreactstudy1'; // MySQL 사용자명
$password = 'w2939000!'; // MySQL 비밀번호
$database = 'myreactstudy1'; // 사용할 데이터베이스명


$conn = mysqli_connect($host, $username, $password, $database);

//JSON형으로 반환 설정
header('Content-Type: application/json');
if (!$conn)
    {
        echo json_encode([
            'status' => 'error',
            'message' => 'Database connection failed: ' . mysqli_connect_error()
    ]);
        exit();
    }

    //최종 반환 데이터
    $response_data = array();

    //echo "DB 연결 성공";

    //값이 없을 경우 공백으로 설정
    $id = isset($_GET['id']) ? $_GET['id'] : '';
    $pwd = isset($_GET['pwd']) ? $_GET['pwd'] : '';

    $sql = "Select userName, profile_img FROM userInfo Where  user_id='$id' AND user_pw='$pwd'";
    $result = mysqli_query($conn, $sql);
    
    if ($result) {
    //응답 처리용 빈 배열 생성
    $fetched_data = array();

    //행별로 연관 데이터 가져와서 배열에 추가
    while ($row = mysqli_fetch_assoc($result)) {
        $fetched_data[] = $row;
    }

    //메모리 해제
    mysqli_free_result($result);


    if (count($fetched_data) > 0) {
        // 로그인 성공: 'status'와 사용자 데이터를 함께 응답
        $response_data['status'] = 'succeed';
        $response_data['user'] = $fetched_data[0]; // 첫 번째 사용자 정보만 전송
    } else {
        // 로그인 실패: 'status'만 응답
        $response_data['status'] = 'failed';
        $response_data['message'] = 'ID나 비밀번호가 일치하지 않습니다';
        }

        echo json_encode($response_data);
        mysqli_close($conn); // 데이터베이스 연결 닫기
        exit(); // 스크립트 종료
    }
    else  echo json_encode(['error' => 'Query 수행 실패: ' . mysqli_error($conn)]);

    mysqli_close($conn);
    exit();
?>

