<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$host = 'localhost'; // MySQL 호스트
$sqlUsername = 'myreactstudy1'; // MySQL 사용자명
$password = 'w2939000!'; // MySQL 비밀번호
$database = 'myreactstudy1'; // 사용할 데이터베이스명


$conn = mysqli_connect($host, $sqlUsername, $password, $database);

//JSON형으로 반환 설정
if (!$conn)
    {
        echo json_encode([
            'status' => 'error',
            'message' => 'DB 연결 실패: ' . mysqli_connect_error()
    ]);
        exit();
    }

    //최종 반환 데이터
    $response_data = array();

    //값이 없을 경우 공백으로 설정
    $id = isset($_POST['id']) ? $_POST['id'] : '';
    $pwd = isset($_POST['pwd']) ? $_POST['pwd'] : '';
    $userName = isset($_POST['userName']) ? $_POST['userName'] : '';


    //사진 관리용
    ////////////////////////////////////////////////////////////////////////////////////////////
    $imagePath = NULL;
    if(isset($_FILES['profileImg']) && $_FILES['profileImg']['error'] === UPLOAD_ERR_OK)
    {
        // 파일타입 및 확장자 체크
        $fileTypeExt = explode("/", $_FILES['profileImg']['type']);

        // 파일 타입 
        $fileType = $fileTypeExt[0];
        // 파일 확장자
        $fileExt = $fileTypeExt[1];
    }

    $root = __DIR__ . "/../Image/profile/";
    if(!is_dir($root))
    {
        if(!mkdir($root, 0755, true))
        {
            $response_data['status'] = 'failed';
            $response_data['message'] = '디렉토리 생성 실패';
            echo json_encode($response_data);
            mysqli_close($conn);
            exit();
        }
    }
    $uploadImg = uniqid() . '_' . basename($_FILES['profileImg']['name']);
    $uploadPath = $root . $uploadImg;
    if (move_uploaded_file($_FILES['profileImg']['tmp_name'], $uploadPath)) {
        //저장 성공
        $imagePath = $uploadPath;
    }
    else{
        $response_data['status'] = 'failed';
        $response_data['message'] = '파일 업로드 실패';
        echo json_encode($response_data);
        mysqli_close($conn);
        exit();
    }

    

    ////////////////////////////////////////////////////////////////////////////////////////////

    header('Content-Type: application/json');

    //ID, 유저명 중복 확인
    ////////////////////////////////////////////////////////////////////////////////////////////
    if(empty($id) || empty($pwd) || empty($userName))
    {
        $response_data['status'] = 'failed';
        $response_data['message'] = 'ID나 비밀번호, 유저명은 모두 입력해야합니다';
        echo json_encode($response_data);
        exit();
    }
    

    $idChecksql = "Select user_id  FROM userInfo Where  user_id='$id'";
    $idCheckResult = mysqli_query($conn, $idChecksql);
    $userNameChecksql = "Select userName  FROM userInfo Where  userName='$userName'";
    $userNameCheckResult = mysqli_query($conn, $userNameChecksql);
    

    //ID, 유저명 중복 확인
    if ($idCheckResult && mysqli_num_rows($idCheckResult) > 0) {
    $response_data['status'] = 'error';
    $response_data['message'] = '이미 존재하는 아이디입니다.';
    echo json_encode($response_data);
    mysqli_close($conn);
    exit();
    }
    if ($userNameCheckResult && mysqli_num_rows($userNameCheckResult) > 0) {
    $response_data['status'] = 'error';
    $response_data['message'] = '이미 존재하는 닉네임입니다.';
    echo json_encode($response_data);
    mysqli_close($conn);
    exit();
    }


    //DB에 데이터 추가
    ////////////////////////////////////////////////////////////////////////////////////////////
    $registerSql = "INSERT INTO userInfo (user_id, user_pw, userName, profile_img) VALUES ('" . $id . "', '" . $pwd . "', '" . $userName . "', '" . $imagePath . "')";
    if(mysqli_query($conn, $registerSql))
    {
        $response_data['status'] = 'succeed';
        $response_data['message'] = "회원가입 되었습니다";
    }
    else
    {
        $response_data['status'] = 'failed';
        $response_data['message'] = "회원가입이 실패했습니다";
    }

        echo json_encode($response_data);
        mysqli_close($conn); // 데이터베이스 연결 닫기
        exit(); // 스크립트 종료

    ////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////

    //유저 고유번호 확인 및 이미지 경로 DB에 업로드
    /*$getUserIdxSql = "Select id  FROM userInfo Where  user_id='$id'";
    if (mysqli_num_rows($idChecksql) > 0) {
    }*/

?>

