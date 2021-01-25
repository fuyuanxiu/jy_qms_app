function getStatList(bc){

	/* var url = API.webPath + '/ng/getStatList?company='+api_localStorageGet("company")+'&factory='+api_localStorageGet("factory")+
	'&lot_no='+bc; */
	aj.post("/ng/getStatList", {
				factory: api_localStorageGet("factory"),
				company: api_localStorageGet("company"),
				lot_no:bc
			}, function (data) {
		if (data.result) {
			document.getElementById('statDiv').innerHTML = template('stat-template', {
				"record": data.data
			});
		} else {
			plus.ui.toast(data.msg);
		}
		mui('#contentId').pullRefresh().refresh(true);
		mui('#contentId').pullRefresh().endPulldownToRefresh();
	});
/* 	mui.ajax(url, {
		data: {},
		dataType: 'json',
		type: 'POST',
		timeout: 20000,
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(data) {
			if (data.result) {
				document.getElementById('statDiv').innerHTML = template('stat-template', {
					"record": data.data
				});
			} else {
				plus.ui.toast(data.msg);
			}
			mui('#contentId').pullRefresh().refresh(true);
			mui('#contentId').pullRefresh().endPulldownToRefresh();
		},
		error: function(xhr, type, errorThrown) {
			plus.ui.toast('获取批次号失败!失败类型是:' + type);
		}
	}); */
}
function addModeTap(){
	mui("#modeDiv").on("tap", ".noodles", function(event) {
		//console.log(this.classList[1])
		var modeDiv=document.getElementById("modeDiv"); 
		var arr = modeDiv.getElementsByClassName("noodles");
		if(this.classList[1] != 'ncheck'){
			for(var i=0;i<arr.length;i++){
				if(arr[i] != this){
					arr[i].classList.remove('ncheck');
				}
			}
			this.classList.add('ncheck');
			mode = this.getAttribute('data-code');
		}else{
			for(var i=0;i<arr.length;i++){
				arr[i].classList.remove('ncheck');
			}
		}
	}) 
}
function addDealTap(){
	mui("#dealDiv").on("tap", ".noodles", function(event) {
		//console.log(this.classList[1] != 'ncheck')
		var dealDiv=document.getElementById("dealDiv"); 
		var arr = dealDiv.getElementsByClassName("noodles");
		if(this.classList[1] != 'ncheck'){
			for(var i=0;i<arr.length;i++){
				if(arr[i] != this){
					arr[i].classList.remove('ncheck');
				}
			}
			this.classList.add('ncheck');
			deal = this.getAttribute('data-code');
		}else{
			/* for(var i=0;i<arr.length;i++){
				arr[i].classList.remove('ncheck');
				console.log(arr[i].classList)
			} */
		}
	}) 
}
function addNgcodeTap(){
	mui("#ngcodeDiv").on("tap", ".noodles", function(event) {
		//console.log(this.classList[1] != 'ncheck')
		var ngcodeDiv=document.getElementById("ngcodeDiv"); 
		var arr = ngcodeDiv.getElementsByClassName("noodles");
		if(this.classList[1] != 'ncheck'){
			for(var i=0;i<arr.length;i++){
				if(arr[i] != this){
					arr[i].classList.remove('ncheck');
				}
			}
			this.classList.add('ncheck');
			ngcode = this.getAttribute('data-code');
			ngcodeName = this.getAttribute('data-name');
		}else{
			for(var i=0;i<arr.length;i++){
				arr[i].classList.remove('ncheck');
				console.log(arr[i].classList)
			}
		}
	}) 
}
function addStatTap(){
	//点击站别
	mui("#statDiv").on("tap", ".noodles", function(event) {
		//console.log(this.innerHTML);
		stat_name = this.innerHTML;
		var statDiv=document.getElementById("statDiv"); 
		var arr = statDiv.getElementsByClassName("noodles");
		if(this.classList[1] != 'ncheck'){
			for(var i=0;i<arr.length;i++){
				if(arr[i] != this){
					arr[i].classList.remove('ncheck');
				}
			}
			this.classList.add('ncheck');
			stat = this.getAttribute('data-code');
			getNgtype(stat);//获取不良分类
		}else{
			for(var i=0;i<arr.length;i++){
				arr[i].classList.remove('ncheck');
			}
			clear();
		}
	}) 
}
function addNgtypeTap(){
	//点击站别
	mui("#ngtypeDiv").on("tap", ".noodles", function(event) {
		//console.log(this.classList[1])
		var ngtypeDiv=document.getElementById("ngtypeDiv"); 
		var arr = ngtypeDiv.getElementsByClassName("noodles");
		if(this.classList[1] != 'ncheck'){
			for(var i=0;i<arr.length;i++){
				if(arr[i] != this){
					arr[i].classList.remove('ncheck');
				}
			}
			this.classList.add('ncheck');
			ngtype = this.getAttribute('data-code');
			getNgcode(ngtype);//获取不良项目
		}else{
			for(var i=0;i<arr.length;i++){
				arr[i].classList.remove('ncheck');
			}
			document.getElementById('ngcodeDiv').innerHTML = template('stat-template', {
				"record": []
			});
			ngtype = '';ngcode = '';
			
		}
	}) 
}
	function getNgtype(fcode){
		//根据站别获取线体
		aj.post("/ng/getNgtypeList", {
					fstate:fcode
				}, function (data) {
			if (data.result) {
				document.getElementById('ngtypeDiv').innerHTML = template('stat-template', {
					"record": data.data
				});
			} else {
				plus.ui.toast(data.msg);
			}
		});
		/* mui.ajax(API.webPath + '/ng/getNgtypeList?fstate='+fcode, {
			data: {},
			dataType: 'json',
			type: 'POST',
			timeout: 20000,
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(data) {
				if (data.result) {
					document.getElementById('ngtypeDiv').innerHTML = template('stat-template', {
						"record": data.data
					});
				} else {
					plus.ui.toast(data.msg);
				}
			},
			error: function(xhr, type, errorThrown) {
				plus.ui.toast('获取数据失败!失败类型是:' + type);
			}
		}); */
	}
	function getNgcode(fcode){
		//根据站别获取线体
		aj.post("/ng/getNgcodeList", {
					fstate: stat,
					ngtype: fcode
				}, function (data) {
			if (data.result) {
				document.getElementById('ngcodeDiv').innerHTML = template('stat-template', {
					"record": data.data
				});
			} else {
				plus.ui.toast(data.msg);
			}
		});
		/* mui.ajax(API.webPath + '/ng/getNgcodeList?fstate='+stat+'&ngtype='+fcode, {
			data: {},
			dataType: 'json',
			type: 'POST',
			timeout: 20000,
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(data) {
				if (data.result) {
					document.getElementById('ngcodeDiv').innerHTML = template('stat-template', {
						"record": data.data
					});
				} else {
					plus.ui.toast(data.msg);
				}
			},
			error: function(xhr, type, errorThrown) {
				plus.ui.toast('获取数据失败!失败类型是:' + type);
			}
		}); */
	}
	function clear(){
		document.getElementById('statDiv').innerHTML = template('stat-template', {
			"record": []
		});
		document.getElementById('ngtypeDiv').innerHTML = template('stat-template', {
			"record": []
		});
		document.getElementById('ngcodeDiv').innerHTML = template('stat-template', {
			"record": []
		});
		ngtype = '';ngcode = '';
		document.getElementById('des').value = ''
	}
	
	//提交前的校验
	function beforeSubmit(){
		if(stat==''){
			plus.ui.toast('请先选择站别');
			return false;
		}
		if(ngtype==''){
			plus.ui.toast('请先选择不良分类');
			return false;
		}
		if(ngcode==''){
			plus.ui.toast('请先选择不良项目');
			return false;
		}
		if(deal==''){
			plus.ui.toast('请先选择处理方式');
			return false;
		}
		var bc = document.getElementById("barcode");
		if (bc.value.length == 0) {
			plus.ui.toast("请先输入条码/批次号");
			return false;
		}
		return true;
	}
function doSubmit(){
	if(beforeSubmit()){
		var qty = mui('#qty').numbox().getValue();
		var note = document.getElementById('des').value;
		var bc = document.getElementById("barcode").value
		/* var url = API.webPath + '/ng/saveNg?ngid=&company='+api_localStorageGet("company")+'&factory='+api_localStorageGet("factory")+
		'&fstate='+stat+'&ngtype='+ngtype+'&usercode='+api_localStorageGet("code")+
		'&ngcode='+ngcode+'&deal='+deal+'&qty='+qty+'&note='+note+'&barcode='+bc; */
		aj.post("/ng/saveNg", {
					factory: api_localStorageGet("factory"),
					company: api_localStorageGet("company"),
					fstate:stat,
					ngtype:ngtype,
					usercode:api_localStorageGet("code"),
					ngcode:ngcode,
					deal:deal,
					qty:qty,
					note:note,
					barcode:bc
				}, function (data) {
			if (data.result) {
				var html = document.getElementById("ul").innerHTML;
				document.getElementById('ul').innerHTML = template('li-template', {
					"record": [{stat:stat_name,mode:'',ngtype:ngtype,ngcode:ngcodeName,deal:deal,qty:qty,barcode:bc}]
				})+html;
			} else {
				plus.ui.toast(data.msg);
			}
		});
		
/* 		mui.ajax(url, {
			data: {},
			dataType: 'json',
			type: 'POST',
			timeout: 20000,
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(data) {
				document.getElementById('barcode').focus()
				if (data.result) {
					//console.log(JSON.stringify(data))
					var html = document.getElementById("ul").innerHTML;
					document.getElementById('ul').innerHTML = template('li-template', {
						"record": [{stat:stat_name,mode:'',ngtype:ngtype,ngcode:ngcodeName,deal:deal,qty:qty,barcode:bc}]
					})+html;
					
				} else {
					plus.ui.toast(data.msg);
				}
				clear();
				document.getElementById("barcode").value='';
				document.getElementById("barcode").focus();获取焦点
				
			},
			error: function(xhr, type, errorThrown) {
				plus.ui.toast('获取数据失败!失败类型是:' + type);
			}
		}); */
	}
}	
	