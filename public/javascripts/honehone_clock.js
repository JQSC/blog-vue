/******************************************************************************
	�����ݒ�
******************************************************************************/
	window.onload=function(){
		var swfUrl = "http://ohsmsw5ly.bkt.clouddn.com/js/honehone_clock_wh.swf";

		var swfTitle = "honehoneclock";

// ���s
		LoadBlogParts();

		/******************************************************************************
		 ����		�Ȃ�
		 �o��		document.write�ɂ��HTML�o��
		 ******************************************************************************/
		function LoadBlogParts(){
			var sUrl = swfUrl;

			var sHtml = "";
			sHtml += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="160" height="70" id="' + swfTitle + '" align="middle">';
			sHtml += '<param name="allowScriptAccess" value="always" />';
			sHtml += '<param name="movie" value="' + sUrl + '" />';
			sHtml += '<param name="quality" value="high" />';
			sHtml += '<param name="bgcolor" value="" />';
			sHtml += '<param name="wmode" value="transparent" />';
			sHtml += '<embed wmode="transparent" src="' + sUrl + '" quality="high" bgcolor="" width="160" height="70" name="' + swfTitle + '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
			sHtml += '</object>';
			var time=document.getElementById('time')

			if(time){
				time.innerHTML=sHtml;
			}

		}
	}
