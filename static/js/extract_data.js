function extract_data() {
	var waktu_awal = document.getElementById("datepicker_awal_waktu").value
	var waktu_akhir = document.getElementById("datepicker_akhir_waktu").value

	document.getElementById("a_link_extract_data").href = "#"
	document.getElementById("link_extract_data").innerHTML = "Loading..."

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var alldata = this.responseText
			var alldata_json = JSON.parse(alldata);
			
			var keterangan = alldata_json["keterangan"]
			var href = alldata_json["href"]
			
			document.getElementById("a_link_extract_data").href = href
			document.getElementById("link_extract_data").innerHTML = keterangan
		}
	};
	xhttp.open("GET", "extract_data/"+waktu_awal+"/"+waktu_akhir, true);
	xhttp.send();
}