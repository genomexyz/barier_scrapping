function extract_data_terbaru() {
	document.getElementById("a_link_extract_data_terbaru").href = "#"
	document.getElementById("link_extract_data_terbaru").innerHTML = "Loading..."
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var alldata = this.responseText
			var alldata_json = JSON.parse(alldata);
			
			var keterangan = alldata_json["keterangan"]
			var href = alldata_json["href"]
			
			document.getElementById("a_link_extract_data_terbaru").href = href
			document.getElementById("link_extract_data_terbaru").innerHTML = keterangan
		}
	};
	xhttp.open("GET", "get_data_terbaru", true);
	xhttp.send();
}