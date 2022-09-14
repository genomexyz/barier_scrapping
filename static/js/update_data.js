function update() {
	var list_alat_str = document.getElementById("daftar_alat").innerHTML
	var situs_update = document.getElementById("situs").value
	list_alat_str = list_alat_str.split(",")

	var list_alat = []
	for (var i = 0; i < list_alat_str.length; i++) {
		if (list_alat_str[i] == "") {
			continue
		}
		list_alat.push(list_alat_str[i]);
	}

	var all_status = []
	var all_keterangan = []
	var all_status_value = []
	var all_keterangan_value = []
	for (var i = 0; i < list_alat.length; i++) {
		var alat_update_status = list_alat[i].replace(/ /g, "_")
		var alat_update_keterangan = list_alat[i].replace(/ /g, "_")
		all_status.push(alat_update_status)
		all_keterangan.push(alat_update_keterangan)
		
		all_status_value.push(document.getElementById(alat_update_status+"_status").value)
		all_keterangan_value.push(document.getElementById(alat_update_status+"_keterangan").value)
	}
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("status_update").innerHTML = "Data berhasil diupdate"
		}
		update_peta();
	};
	var query = "situs="+situs_update+"&"
	for (var i = 0; i < list_alat.length; i++) {
		query += all_status[i]+"_status="+all_status_value[i]+"&"+all_keterangan[i]+"_keterangan="+all_keterangan_value[i]
		if (i != list_alat.length-1) {
			query += "&"
		}
	}
	//console.log(query)
	xhttp.open("POST", "update", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(query);
	
}