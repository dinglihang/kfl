<?php
header('Content-Type:application/json');

//�����û�������������
@$userName = $_REQUEST['userName'];
@$userSex = $_REQUEST['userSex'];
@$userAddr = $_REQUEST['userAddr'];
@$userPhone = $_REQUEST['userPhone'];
@$userDid = $_REQUEST['userDid'];
if(empty($userName)||empty($userSex)
|| empty($userAddr) || empty($userPhone)
|| empty($userDid))
{
  echo '[]';
  return;
}
//�õ���ǰ��ʱ���
$userTime = time()*1000;

//�������ݿ⣬�����ݿ��е�kf_dish����
//��$startλ�ö�5������

require('init.php');
$sql = "insert into kf_order values(null,$userPhone,'$userName',$userSex,$userTime,'$userAddr',$userDid)";
$result = mysqli_query($conn,$sql);

//���ظ��ͻ���
//��fetchAll ��fetch_assoc
$output=[];
if($result)//����ɹ�
{
  $myResult['msg']="success";
  $myResult['oid']=mysqli_insert_id($conn);
}
else
{
  $myResult['msg']='error';
}
$output[] = $myResult;
echo json_encode($output);

?>