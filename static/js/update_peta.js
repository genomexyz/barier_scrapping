function update_peta() {
	var list_situs = []
	var list_lintang = []
	var list_bujur = []
	var list_alat = []
	var list_status_alat = []
	var list_keterangan_alat = []

	var situs_marker = []
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var alldata = this.responseText
			var alldata_json = JSON.parse(alldata);
			var keys = Object.keys(alldata_json);
			
			var d = new Date()
			waktu_utc_hari_ini = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
			for (var i=0; i<keys.length; i++) {
				list_situs.push(keys[i])
				list_lintang.push(alldata_json[keys[i]]["lintang"])
				list_bujur.push(alldata_json[keys[i]]["bujur"])
				list_alat.push([])
				list_status_alat.push([])
				list_keterangan_alat.push([])
				for (var j=0; j<alldata_json[keys[i]]["nama_alat_list"].length; j++) {
					list_alat[i].push(alldata_json[keys[i]]["nama_alat_list"][j])
					list_status_alat[i].push(alldata_json[keys[i]]["status_alat_list"][j])
					list_keterangan_alat[i].push(alldata_json[keys[i]]["keterangan_alat_list"][j])
				}
				
				
				var waktu_update_alat = new Date(alldata_json[keys[i]]['insert_time'].substring(0, 4), 
				alldata_json[keys[i]]['insert_time'].substring(5, 7)-1, alldata_json[keys[i]]['insert_time'].substring(8, 10),
				alldata_json[keys[i]]['insert_time'].substring(11, 13), alldata_json[keys[i]]['insert_time'].substring(14, 16))
				
				if (waktu_update_alat > waktu_utc_hari_ini) {
					situs_marker.push(L.marker([list_lintang[i], list_bujur[i]], {icon: icon_kantor_update, "kode_situs": keys[i]}).on('click', markerOnClick));
					situs_marker[(situs_marker.length)-1].addTo(info_kantor_update);
				} else {
					situs_marker.push(L.marker([list_lintang[i], list_bujur[i]], {icon: icon_kantor_tidak_update, "kode_situs": keys[i]}).on('click', markerOnClick));
					situs_marker[(situs_marker.length)-1].addTo(info_kantor_tidak_update);
				}
				
				
				/*var popup_teks = ""
				popup_teks += "<b>"+list_situs[i]+"</b>"+"<br>"
				popup_teks += "keterangan:<br>"
				popup_teks += "<div style='overflow:scroll;'><table>"
				for (var j=0; j<alldata_json[keys[i]]["nama_alat_list"].length; j++) {
					popup_teks += "<tr><td>Status <b>"+list_alat[i][j]+"</b></td><td>:</td> <td>"+list_status_alat[i][j]+"</td></tr>"
					popup_teks += "<tr><td>Keterangan <b>"+list_alat[i][j]+"</b></td><td>:</td> <td>"+list_keterangan_alat[i][j]+"</td></tr>"
					popup_teks += "<tr><td></td></tr>"
				}
				popup_teks += "<tr><td></td></tr>"
				popup_teks += "</table>"
				popup_teks += "diperbaharui terakhir pada <b>"+alldata_json[keys[i]]['insert_time']+"</b>"
				popup_teks += "</div>"
				situs_marker[i].bindPopup(popup_teks)*/
			}
			mymap.eachLayer(function (layer) {
				if (layer.options.status !== "BASE_LAYER") {
					mymap.removeLayer(layer);
				}
			});
			info_kantor_update.addTo(mymap)
			info_kantor_tidak_update.addTo(mymap)
		}
	};
	
	xhttp.open("GET", "get_data_peta", true);
	xhttp.send();
}

var info_kantor = L.layerGroup();
var icon_kantor = L.icon({
	iconUrl: 'static_peralatan/img/kantor.png',

	iconSize:	 [15, 15], // size of the icon
	iconAnchor:   [8, 8], // point of the icon which will correspond to marker's location
	popupAnchor:  [6, 0] // point from which the popup should open relative to the iconAnchor
});

var info_kantor_update = L.layerGroup();
var icon_kantor_update = L.icon({
	iconUrl: 'static_peralatan/img/kantor_update.png',

	iconSize:	 [15, 15], // size of the icon
	iconAnchor:   [8, 8], // point of the icon which will correspond to marker's location
	popupAnchor:  [6, 0] // point from which the popup should open relative to the iconAnchor
});

var info_kantor_tidak_update = L.layerGroup();
var icon_kantor_tidak_update = L.icon({
	iconUrl: 'static_peralatan/img/kantor_tidak_update.png',

	iconSize:	 [15, 15], // size of the icon
	iconAnchor:   [8, 8], // point of the icon which will correspond to marker's location
	popupAnchor:  [6, 0] // point from which the popup should open relative to the iconAnchor
});

var mymap = L.map('mapid').setView([0, 120], 5);

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; by Genomexyz',
	status: 'BASE_LAYER'
	});
	
	Stadia_AlidadeSmoothDark.addTo(mymap);

var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("Koordinat: " + e.latlng.toString())
			.openOn(mymap);
	}

// create the sidebar instance and add it to the map
		var sidebar = L.control.sidebar({ container: 'sidebar' })
			.addTo(mymap)
			.open('home');

		// be notified when a panel is opened
		sidebar.on('content', function (ev) {
			switch (ev.id) {
				case 'autopan':
				sidebar.options.autopan = true;
				break;
				default:
				sidebar.options.autopan = false;
			}
		});

		var userid = 0
		function addUser() {
			sidebar.addPanel({
				id:   'user' + userid++,
				tab:  '<i class="fa fa-user"></i>',
				title: 'User Profile ' + userid,
				pane: '<p>user ipsum dolor sit amet</p>',
			});
		}

	mymap.on('click', onMapClick);

//do update peta for the first time
update_peta();
