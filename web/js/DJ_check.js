function getStatList(){
	aj.post('/pc/getStatList', {
				factory: api_localStorageGet("factory"),
				company: api_localStorageGet("company")
			}, function (data) {
		if (data.result) {
			document.getElementById('statDiv').innerHTML = template('stat-template', {
				"record": data.data
			});
			 mui('#picture').popover('show');
		} else {
			plus.ui.toast(data.msg);
		}
	});
	/* mui.ajax(API.webPath + '/pc/getStatList?company='+api_localStorageGet("company")+'&factory='+api_localStorageGet("factory"), {
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
				 mui('#picture').popover('show');
				 //addStatTap();
			} else {
				plus.ui.toast(data.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.ui.toast('获取批次号失败!失败类型是:' + type);
		}
	}); */
	}
function getLine(fcode){
	//根据站别获取线体
	aj.post("/pc/getLineList", {
				factory: api_localStorageGet("factory"),
				company: api_localStorageGet("company"),
				fstate:fcode
			}, function (data) {
		if (data.result) {
			document.getElementById('lineDiv').innerHTML = template('stat-template', {
				"record": data.data
			});
		} else {
			plus.ui.toast(data.msg);
		}
	});
	/* mui.ajax(API.webPath + '/pc/getLineList?company='+api_localStorageGet("company")+'&factory='+api_localStorageGet("factory")+
	'&fstate='+fcode, {
		data: {},
		dataType: 'json',
		type: 'POST',
		timeout: 20000,
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(data) {
			if (data.result) {
				console.log(JSON.stringify(data.result) )
				document.getElementById('lineDiv').innerHTML = template('stat-template', {
					"record": data.data
				});
				//addLineTap();
			} else {
				plus.ui.toast(data.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.ui.toast('获取批次号失败!失败类型是:' + type);
		}
	}); */
	}

function getProject(fcode){
	//根据线体获取方案
	aj.post("/pc/getProjectList", {
				factory: api_localStorageGet("factory"),
				company: api_localStorageGet("company"),
				fstate:code,
				fline:fcode
			}, function (data) {
		if (data.result) {
			document.getElementById('projectDiv').innerHTML = template('stat-template', {
				"record": data.data
			});
		} else {
			plus.ui.toast(data.msg);
		}
	});
	/* mui.ajax(API.webPath + '/pc/getProjectList?company='+api_localStorageGet("company")+'&factory='+api_localStorageGet("factory")+
	'&fstate='+code+'&fline='+fcode, {
		data: {},
		dataType: 'json',
		type: 'POST',
		timeout: 20000,
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(data) {
			if (data.result) {
				document.getElementById('projectDiv').innerHTML = template('stat-template', {
					"record": data.data
				});
				//addProjecTap();
			} else {
				plus.ui.toast(data.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.ui.toast('获取批次号失败!失败类型是:' + type);
		}
	}); */
}
function getBill(){
	//根据方案获取检验编号
	aj.post("/pc/getBillNoList", {
				fpro: fpro,
				fstate: code,
				fline:fline
			}, function (data) {
		if (data.result) {
			document.getElementById('billDiv').innerHTML = template('stat-template', {
				"record": data.data
			});
		} else {
			plus.ui.toast(data.msg);
		}
	});
	/* mui.ajax(API.webPath + '/pc/getBillNoList?fpro='+fpro+
	'&fstate='+code+'&fline='+fline, {
		data: {},
		dataType: 'json',
		type: 'POST',
		timeout: 20000,
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(data) {
			if (data.result) {
				document.getElementById('billDiv').innerHTML = template('stat-template', {
					"record": data.data
				});
			} else {
				plus.ui.toast(data.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.ui.toast('获取批次号失败!失败类型是:' + type);
		}
	}); */
}
function addStatTap(){
	//点击站别
	mui("#statDiv").on("tap", ".noodles", function(event) {
		//console.log(this.classList[1])
		var statDiv=document.getElementById("statDiv"); 
		var arr = statDiv.getElementsByClassName("noodles");
		if(this.classList[1] != 'ncheck'){
			for(var i=0;i<arr.length;i++){
				if(arr[i] != this){
					arr[i].classList.remove('ncheck');
					arr[i].classList.add('ndis');
				}
			}
			this.classList.add('ncheck');
			code = this.getAttribute('data-code');
			getLine(code);//获取线体数据
		}else{
			for(var i=0;i<arr.length;i++){
				arr[i].classList.remove('ncheck');
				arr[i].classList.remove('ndis');
			}
			clear();
		}
	}) 
	}
function addLineTap(){//点击线体
	mui("#lineDiv").on("tap", ".noodles", function(event) {
		//console.log(this.classList[1])
		var lineDiv=document.getElementById("lineDiv"); 
		var arr = lineDiv.getElementsByClassName("noodles");
		if(this.classList[1] != 'ncheck'){
			for(var i=0;i<arr.length;i++){
				if(arr[i] != this){
					arr[i].classList.remove('ncheck');
					arr[i].classList.add('ndis');
				}
			}
			this.classList.add('ncheck');
			fline = this.getAttribute('data-code');
			getProject(fline);
		}else{
			for(var i=0;i<arr.length;i++){
				arr[i].classList.remove('ncheck');
				arr[i].classList.remove('ndis');
			}
			fpro = '';
			document.getElementById('projectDiv').innerHTML = template('stat-template', {
				"record": []
			});
			document.getElementById('billDiv').innerHTML = template('stat-template', {
				"record": []
			});
		}
	}) 
}
function addProjecTap(){//点击方案
	/* mui("#projectDiv").on("tap", ".noodles", function(event) {
		fpro = this.getAttribute('data-code');
		this.classList.toggle('ncheck');
	}) */ 
	mui("#projectDiv").on("tap", ".noodles", function(event) {
		var projectDiv=document.getElementById("projectDiv"); 
		var arr = projectDiv.getElementsByClassName("noodles");
		if(this.classList[1] != 'ncheck'){
			for(var i=0;i<arr.length;i++){
				if(arr[i] != this){
					arr[i].classList.remove('ncheck');
					arr[i].classList.add('ndis');
				}
			}
			this.classList.add('ncheck');
			fpro = this.getAttribute('data-code');
			getBill();
		}else{
			for(var i=0;i<arr.length;i++){
				arr[i].classList.remove('ncheck');
				arr[i].classList.remove('ndis');
			}
			fpro = '';
			document.getElementById('billDiv').innerHTML = template('stat-template', {
				"record": []
			});
		}
	})	
	
}
function addBillTap(){//点击编号
	mui("#billDiv").on("tap", ".noodles", function(event) {
		// bill = this.getAttribute('data-code');
		// this.classList.toggle('ncheck');
		var billDiv=document.getElementById("billDiv"); 
		var arr = billDiv.getElementsByClassName("noodles");
		if(this.classList[1] != 'ncheck'){
			for(var i=0;i<arr.length;i++){
				if(arr[i] != this){
					arr[i].classList.remove('ncheck');
					arr[i].classList.add('ndis');
				}
			}
			this.classList.add('ncheck');
			bill = this.getAttribute('data-code');
		}else{
			for(var i=0;i<arr.length;i++){
				arr[i].classList.remove('ncheck');
				arr[i].classList.remove('ndis');
			}
			bill = '';
		}
	}) 
}
function clear(){
	document.getElementById('lineDiv').innerHTML = template('stat-template', {
		"record": []
	});
	document.getElementById('projectDiv').innerHTML = template('stat-template', {
		"record": []
	});
	document.getElementById('billDiv').innerHTML = template('stat-template', {
		"record": []
	});
	fpro = '';
}