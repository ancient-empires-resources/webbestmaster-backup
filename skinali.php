<link rel="stylesheet" type="text/css" href="../themes/Arthata/css/image-upload.css">
<?php
function show_form()
{
?>
<p>
<form action="" method=post onsubmit="yaCounter22169560.reachGoal('skinali_confirm'); return true;" enctype="multipart/form-data">
              <div align="center">
              ���<br />
              <input type="text" value="�����" name="name" size="40">
              <br />����� ��������*<br />
              <input type="text"  value="+375" name="tel" size="40">
              <br /><br />������� ��� �����<br />
              <textarea rows="5" name="mess" cols="40"></textarea>
              <br /><br /><input class="button" type="submit" value="�������� �����" name="submit"><br />
              </div>
</form>
</p>
<?
}

function complete_mail() {
        // $_POST['title'] �������� ������ �� ���� "����", trim() - ������� ��� ������ ������� � �������� �����, htmlspecialchars() - ����������� ����������� ������� � HTML ��������, ����� ������� ��� ����, ����� ���������� ������� �������� ��� ���� ����������, �� �  substr($_POST['title'], 0, 1000) - ������� ����� �� 1000 ��������. ��� ���������� $_POST['mess'], $_POST['name'], $_POST['tel'], $_POST['email'] ��� ����������
        $_POST['title'] =  substr('����� �������', 0, 1000);
        $_POST['mess'] =  substr(htmlspecialchars(trim($_POST['mess'])), 0, 1000000);
        $_POST['name'] =  substr(htmlspecialchars(trim($_POST['name'])), 0, 30);
        $_POST['tel'] =  substr(htmlspecialchars(trim($_POST['tel'])), 0, 30);
        $_POST['menu'] =  substr(htmlspecialchars(trim($_POST['menu'])), 0, 50);
        // ���� �� ��������� ���� "�������" - ���������� ������ 0
        if (empty($_POST['tel']))
             output_err(0);
        // �������� ��������, ������ �� ����� ������ �������� ������, � ������� html ����� ;-)
        $mess = '
<b>��� �����������:</b>'.$_POST['name'].'<br />
<b>���������� �������:</b>'.$_POST['tel'].'<br />
'.$_POST['mess'];

        // ���������� ���� ������ ��� �������� �����
        require 'class.phpmailer.php';

        $mail = new PHPMailer();
        $mail->From = 'arthata.by';      // �� ����
        $mail->FromName = 'arthata.by';   // �� ����
        $mail->AddAddress('arthataby@gmail.com', 'arthata.by'); // ���� - �����, ���
        $mail->IsHTML(true);        // ���������� ������ ������ HTML
        $mail->Subject = $_POST['title'];  // ���� ������

        // ���� ���� �����������, �� ����������� ��� � ���� �������� � ���� ������.
        $mail->Body = $mess;

        // ���������� ���� ������
        if (!$mail->Send()) die ('Mailer Error: '.$mail->ErrorInfo);
        echo 'Spasibo! Vash zakaz prinyat.';
}

function output_err($num)
{
    $err[0] = '������! �� ������ �������.';
    echo '<p>'.$err[$num].'</p>';
    show_form();
    exit();
}

if (!empty($_POST['submit'])) complete_mail();
else show_form();










$roistatData = array(
    'roistat' => isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : null,
    'key'     => 'NjMzNDo3MDAwOjliZTZhYjdiMzgxMTM1NjE1NWJkMGQ3NTliYjkxMDU1', // �������� SECRET_KEY �� ��������� ���� �� ������ ���� ��������� -> ���������� �� �������� � ������ ����� ������ � ������� ���� ��� ����������
    'title'   => '����� �������',
    'comment' => 'I like to leave comments',
//    'name'    => substr(htmlspecialchars(trim($_POST['name'])), 0, 30),    'name'    => 'Iwanttobe',
    'email'   => 'web.best.master@gmail.com',
    'phone'   => substr(htmlspecialchars(trim('28071985280719852807198528071985')), 0, 30),//    'phone'   => '28071985',
    'fields'  => array()
);
echo "https://cloud.roistat.com/api/proxy/1.0/leads/add?".http_build_query($roistatData);
file_get_contents("https://cloud.roistat.com/api/proxy/1.0/leads/add?".http_build_query($roistatData));

?> 
