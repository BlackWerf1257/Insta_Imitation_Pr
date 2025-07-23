<?php
header('Access-Control-Allow-Origin: http://127.0.0.1:3000');
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
            'message' => 'DB 연결 실패: ' . mysqli_connect_error()
    ]);
        exit();
    }


    //사진 관리용
    ////////////////////////////////////////////////////////////////////////////////////////////
    //최종 반환 데이터
    $response_data = array();

    //값이 없을 경우 공백으로 설정
    $id = $_GET['id'];
    $pwd = $_GET['pwd'];
    $userName = $_GET['userName'];

    $tempImg = $_FILES['profileImg']['tempImg'];
    // 파일타입 및 확장자 체크
    $fileTypeExt = explode("/", $_FILES['imgFile']['type']);

    // 파일 타입 
    $fileType = $fileTypeExt[0];

    // 파일 확장자
    $fileExt = $fileTypeExt[1];
    // 확장자 검사
    $extStatus = false;

    switch($fileExt){
    	case 'jpeg':
    	case 'jpg':
    	//case 'gif':
    	case 'png':
		$extStatus = true;
		break;
	
	default:
		$response_data['status'] = 'failed';
        $response_data['message'] = 'jpeg, jpg, png타입의 사진만 업로드 가능합니다';
        echo json_encode($response_data);
        exit();
		break;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////


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
    $userNameChecksql = "Select userName  FROM userInfo Where  userName='$userName'";
    

    //ID, 유저명 중복 확인
    if (mysqli_num_rows($idChecksql) > 0) {
    $response_data['status'] = 'error';
    $response_data['message'] = '이미 존재하는 아이디입니다.';
    echo json_encode($response_data);
    mysqli_close($conn);
    exit();
    }
    if (mysqli_num_rows($userNameChecksql) > 0) {
    $response_data['status'] = 'error';
    $response_data['message'] = '이미 존재하는 닉네임입니다.';
    echo json_encode($response_data);
    mysqli_close($conn);
    exit();
    }
    ////////////////////////////////////////////////////////////////////////////////////////////

    //유저 고유번호 확인 및 이미지 경로 DB에 업로드
    $getUserIdxSql = "Select id  FROM userInfo Where  user_id='$id'";
    if (mysqli_num_rows($idChecksql) > 0) {
    }

?>

