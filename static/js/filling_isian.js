var alldata_json = {}
var list_sensor = ['sensor_angin', 'sensor_tekanan', 'sensor_presipitasi', 
'sensor_radiasi_matahari', 'sensor_cuaca', 'sensor_visibility', 'sensor_perawanan',
'sensor_suhu_rh']      //SOLUSI SEMENTARA, NANTI HARUS DIPERBAIKI


function auto_fill() {
    //document.getElementById("select").selectedIndex = 0;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var list_situs_str = document.getElementById("daftar_situs").innerHTML
            list_situs_str = list_situs_str.split(",")
            
            var list_situs_terkini = []
            for (var i = 0; i < list_situs_str.length; i++) {
                if (list_situs_str[i] == "") {
                    continue
                }
                list_situs_terkini.push(list_situs_str[i]);
            }
            
            var list_alat_str = document.getElementById("daftar_alat").innerHTML
            list_alat_str = list_alat_str.split(",")

            var list_nama_alat_str = document.getElementById("nama_alat").innerHTML
            list_nama_alat_str = list_nama_alat_str.split(",")

            var list_alat_kompleks_str = document.getElementById("daftar_alat_kompleks").innerHTML
            list_alat_kompleks_str = list_alat_kompleks_str.split(",")

            var list_nama_alat_kompleks_str = document.getElementById("nama_alat_kompleks").innerHTML
            list_nama_alat_kompleks_str = list_nama_alat_kompleks_str.split(",")

            var list_alat = []
            for (var i = 0; i < list_alat_str.length; i++) {
                if (list_alat_str[i] == "") {
                    continue
                }
                list_alat.push(list_alat_str[i]);
            }

            var list_alat_kompleks = []
            for (var i = 0; i < list_alat_kompleks_str.length; i++) {
                if (list_alat_kompleks_str[i] == "") {
                    continue
                }
                list_alat_kompleks.push(list_alat_kompleks_str[i]);
            }

            var list_nama_alat = []
            for (var i = 0; i < list_nama_alat_str.length; i++) {
                if (list_nama_alat_str[i] == "") {
                    continue
                }
                list_nama_alat.push(list_nama_alat_str[i]);
            }

            var list_nama_alat_kompleks = []
            for (var i = 0; i < list_nama_alat_kompleks_str.length; i++) {
                if (list_nama_alat_kompleks_str[i] == "") {
                    continue
                }
                list_nama_alat_kompleks.push(list_nama_alat_kompleks_str[i]);
            }
            
            var alldata = this.responseText
            alldata_json = JSON.parse(alldata)

            try {
                list_alat_kompleks_having = alldata_json[list_situs_terkini[0]]['alat_kompleks']
            } catch (err) {
                list_alat_kompleks_having = []
            }

            if (typeof list_alat_kompleks_having == 'undefined') {
                list_alat_kompleks_having = []
            }

            var obj_data_sensor = list_alat_kompleks_having['kelompok_sensor_list']
            var data_sensor = JSON.stringify(obj_data_sensor)
            console.log('data sensor ->', data_sensor)
            document.getElementById("konfigurasi_sensor").innerHTML = data_sensor

            //console.log('cek', list_alat_kompleks_having)
            for (var i = 0; i < list_alat_kompleks_having.length; i++) {
                var jumlah_status = 0
                console.log('cek json alat', list_alat_kompleks_having[i])
                try {
                    if (list_alat_kompleks_having[i]['jumlah'] <= 5) {
                        jumlah_status = list_alat_kompleks_having[i]['jumlah']
                    } else {
                        jumlah_status = 5
                    }
                } catch (err) {
                    jumlah_status = 0
                }

                //console.log('jumlah awos', jumlah_status, list_alat_kompleks_having[i])
                
                document.getElementById(list_alat[i]+"_jumlah_kompleks").selectedIndex = jumlah_status
                document.getElementById(list_alat[i]+"_jumlah_kompleks").setAttribute('onChange', `set_jumlah_site_kompleks('${list_alat_kompleks_having[i]['kode_alat']}', '${list_situs_terkini[0]}', '${i}')`)

                //generate performa, status, keterangan
                var div_status = document.getElementById(list_alat_kompleks_having[i]['kode_alat']+"_list_keterangan_kompleks")
                div_status.innerHTML = ""

                for (var ii = 0; ii < jumlah_status; ii++) {

                    var div = document.createElement("h3")
                    div.innerHTML = "Kategori "+list_alat_kompleks_having[i]['kode_alat']+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var select = document.createElement("select")
                    select.name = 'kompleks_'+list_alat_kompleks_having[i]['kode_alat']+"_kategori_"+parseInt(ii+1)
                    select.id = 'kompleks_'+list_alat_kompleks_having[i]['kode_alat']+"_kategori_"+parseInt(ii+1)

                    var opsi = document.createElement("option")
                    opsi.value = "1"
                    opsi.innerHTML = "1"
                    select.appendChild(opsi)

                    var opsi = document.createElement("option")
                    opsi.value = "2"
                    opsi.innerHTML = "2"
                    select.appendChild(opsi)

                    var opsi = document.createElement("option")
                    opsi.value = "3"
                    opsi.innerHTML = "3"
                    select.appendChild(opsi)

                    var kategori_alat_single = 1
                    try {
                        if (list_alat_kompleks_having[i]['kategori_list'][ii] == '1') {
                            kategori_alat_single = 1
                        } else if (list_alat_kompleks_having[i]['kategori_list'][ii] == '2') {
                            kategori_alat_single = 2
                        } else if (list_alat_kompleks_having[i]['kategori_list'][ii] == '3') {
                            kategori_alat_single = 3
                        }
                    } catch (err) {
                        kategori_alat_single = 1
                    }

                    select.selectedIndex = status_alat_single
                    div_status.appendChild(select)

                    var div = document.createElement("h3")
                    div.innerHTML = "Status "+list_alat_kompleks_having[i]['kode_alat']+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var select = document.createElement("select")
                    select.name = 'kompleks_'+list_alat_kompleks_having[i]['kode_alat']+"_status_"+parseInt(ii+1)
                    select.id = 'kompleks_'+list_alat_kompleks_having[i]['kode_alat']+"_status_"+parseInt(ii+1)

                    var opsi = document.createElement("option")
                    opsi.value = "none"
                    opsi.innerHTML = "Tidak ada"
                    select.appendChild(opsi)

                    var opsi = document.createElement("option")
                    opsi.value = "on"
                    opsi.innerHTML = "Nyala (On)"
                    select.appendChild(opsi)

                    var opsi = document.createElement("option")
                    opsi.value = "off"
                    opsi.innerHTML = "Mati (Off)"
                    select.appendChild(opsi)

                    var status_alat_single = 0

                    try {
                        if (list_alat_kompleks_having[i]['status_list'][ii] == 'none') {
                            status_alat_single = 0
                        } else if (list_alat_kompleks_having[i]['status_list'][ii] == 'on') {
                            status_alat_single = 1
                        } else if (list_alat_kompleks_having[i]['status_list'][ii] == 'off') {
                            status_alat_single = 2
                        }
                    } catch (err) {
                        status_alat_single = 0
                    }

                    select.selectedIndex = status_alat_single
                    div_status.appendChild(select)

                    var div = document.createElement("h3")
                    div.innerHTML = "Merk "+list_alat_kompleks_having[i]['kode_alat']+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var input_merk = document.createElement("input")
                    input_merk.type = 'text'
                    input_merk.name = "kompleks_input_"+list_alat_kompleks_having[i]['kode_alat']+"_merk_"+parseInt(ii+1)
                    input_merk.id = "kompleks_input_"+list_alat_kompleks_having[i]['kode_alat']+"_merk_"+parseInt(ii+1)
                    var val_input_merk
                    try {
                        val_input_merk = list_alat_kompleks_having[i]['merk'][ii]
                    } catch(err) {
                        val_input_merk = ""
                    }
                    input_merk.value = val_input_merk
                    div_status.appendChild(input_merk)

                    var div = document.createElement("h3")
                    div.innerHTML = "Tahun Pengadaan "+list_alat_kompleks_having[i]['kode_alat']+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var input_tahunp = document.createElement("input")
                    input_tahunp.type = 'text'
                    input_tahunp.name = "kompleks_input_"+list_alat_kompleks_having[i]['kode_alat']+"_tahunpengadaan_"+parseInt(ii+1)
                    input_tahunp.id = "kompleks_input_"+list_alat_kompleks_having[i]['kode_alat']+"_tahunpengadaan_"+parseInt(ii+1)
                    input_tahunp.setAttribute('onInput', `koreksi_tahun('${"kompleks_input_"+list_alat_kompleks_having[i]['kode_alat']+"_tahunkalibrasi_"+parseInt(ii+1)}')`)
                    var val_input_tahunp
                    try {
                        val_input_tahunp = list_alat_kompleks_having[i]['tahun_pengadaan'][ii]
                    } catch(err) {
                        val_input_tahunp = ""
                    }
                    input_tahunp.value = val_input_tahunp
                    div_status.appendChild(input_tahunp)

                    var div = document.createElement("h3")
                    div.innerHTML = "Tahun Kalibrasi "+list_alat_kompleks_having[i]['kode_alat']+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var input_tahunk = document.createElement("input")
                    input_tahunk.type = 'text'
                    input_tahunk.name = "kompleks_input_"+list_alat_kompleks_having[i]['kode_alat']+"_tahunkalibrasi_"+parseInt(ii+1)
                    input_tahunk.id = "kompleks_input_"+list_alat_kompleks_having[i]['kode_alat']+"_tahunkalibrasi_"+parseInt(ii+1)
                    input_tahunk.setAttribute('onInput', `koreksi_tahun('${"kompleks_input_"+list_alat_kompleks_having[i]['kode_alat']+"_tahunkalibrasi_"+parseInt(ii+1)}')`)
                    var val_input_tahunk
                    try {
                        val_input_tahunk = list_alat_kompleks_having[i]['tahun_kalibrasi'][ii]
                    } catch(err) {
                        val_input_tahunk = ""
                    }
                    input_tahunk.value = val_input_tahunk
                    div_status.appendChild(input_tahunk)

                    var div = document.createElement("h3")
                    div.innerHTML = "Performa "+list_alat_kompleks_having[i]['kode_alat']+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var slider = document.createElement("input")
                    slider.name = 'kompleks_'+list_alat_kompleks_having[i]['kode_alat']+"_performa_"+parseInt(ii+1)
                    slider.id = 'kompleks_'+list_alat_kompleks_having[i]['kode_alat']+"_performa_"+parseInt(ii+1)
                    slider.type = "range"
                    slider.min = "0"
                    slider.max = "100"
                    try {
                        slider.value =  list_alat_kompleks_having[i]['performa_list'][ii]
                    } catch (err) {
                        slider.value =  100
                    }
                    //slider.onchange = `see_p_slider('${list_alat[i]+"_performa_"+parseInt(ii+1)}', '${"p_"+list_alat[i]+"_performa_"+parseInt(ii+1)}')`
                    slider.setAttribute('onInput', `set_input_slider('kompleks_${list_alat[i]+"_performa_"+parseInt(ii+1)}', 'kompleks_${"input_"+list_alat[i]+"_performa_"+parseInt(ii+1)}')`)
                    div_status.appendChild(slider)

                    var input_slider = document.createElement("input")
                    input_slider.type = 'text'
                    input_slider.setAttribute("maxlength", 3)
                    input_slider.setAttribute("size", 3)
                    input_slider.name = "kompleks_input_"+list_alat_kompleks_having[i]['kode_alat']+"_performa_"+parseInt(ii+1)
                    input_slider.id = "kompleks_input_"+list_alat_kompleks_having[i]['kode_alat']+"_performa_"+parseInt(ii+1)
                    try {
                        input_slider.value = list_alat_kompleks_having[i]['performa_list'][ii]
                    } catch(err) {
                        input_slider.value = "100"
                    }
                    input_slider.setAttribute('onInput', `set_slider('kompleks_${list_alat[i]+"_performa_"+parseInt(ii+1)}', 'kompleks_${"input_"+list_alat[i]+"_performa_"+parseInt(ii+1)}')`)
                    div_status.appendChild(input_slider)

                    var div = document.createElement("h3")
                    div.innerHTML = "Keterangan "+list_alat_kompleks_having[i]['kode_alat']+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var input_ket = document.createElement("input")
                    input_ket.type = 'text'
                    input_ket.name = "kompleks_input_"+list_alat[i]+"_keterangan_"+parseInt(ii+1)
                    input_ket.id = "kompleks_input_"+list_alat[i]+"_keterangan_"+parseInt(ii+1)
                    try {
                        input_ket.value = list_alat_kompleks_having[i]['ket_list'][ii]
                    } catch(err) {
                        input_ket.value = "-"
                    }
                    div_status.appendChild(input_ket)

                    //sensor list
                    var div_sensor = document.createElement("div")
                    div_sensor.style.border = "1px solid black";

                    //get sensor list
                    list_sensor = list_alat_kompleks_having[i]['kelompok_sensor_list'][i]['sensor_list']
                    string_list_sensor = JSON.stringify(list_sensor)
                    //document.getElementById("konfigurasi_sensor").innerHTML = string_list_sensor
                    console.log(string_list_sensor)
                    for (var iter_sensor = 0; iter_sensor < list_sensor.length; iter_sensor++) {
                        var div_single_sensor = document.createElement("div")
                        div_single_sensor.setAttribute("onclick", "setting_sensor('"+list_sensor[iter_sensor]['kode_alat']+
                        "', '"+list_alat_kompleks_having[i]['kode_alat']+"', "+parseInt(ii+1)+")")
                        var div_judul = document.createElement("h3")
                        div_judul.innerHTML = "Setting "+list_sensor[iter_sensor]['kode_alat']
                        div_single_sensor.appendChild(div_judul)
                        
                        div_sensor.append(div_single_sensor);
                    }

                    //var cek = document.createElement("H3")
                    //cek.innerHTML = 'HALO'
                    div_status.appendChild(div_sensor)
                    //end sensor list
                }

            }

/*
            FOR ALAT SEDERHANA
*/


            for (var i = 0; i < list_alat.length; i++) {
                /*document.getElementById(list_alat[i]+"_keterangan").value = alldata_json[list_situs_terkini[0]]['keterangan_alat_list'][i]
                if (alldata_json[list_situs_terkini[0]]['status_alat_list'][i] == 'none') {
                    document.getElementById(list_alat[i]+"_status").selectedIndex = 0
                } else if (alldata_json[list_situs_terkini[0]]['status_alat_list'][i] == 'on') {
                    document.getElementById(list_alat[i]+"_status").selectedIndex = 1
                } else if (alldata_json[list_situs_terkini[0]]['status_alat_list'][i] == 'off') {
                    document.getElementById(list_alat[i]+"_status").selectedIndex = 2
                }*/

                var jumlah_status = 0
                try {
                    if (alldata_json[list_situs_terkini[0]]['jumlah'][i] <= 5) {
                        jumlah_status = alldata_json[list_situs_terkini[0]]['jumlah'][i]
                    } else {
                        jumlah_status = 5
                    }
                } catch(err) {
                    jumlah_status = 0
                }
                
                document.getElementById(list_alat[i]+"_jumlah").selectedIndex = jumlah_status
                document.getElementById(list_alat[i]+"_jumlah").setAttribute('onChange', `set_jumlah_site('${list_alat[i]}', '${list_situs_terkini[0]}', '${i}')`)

                //generate performa, status, keterangan
                var div_status = document.getElementById(list_alat[i]+"_list_keterangan")
                div_status.innerHTML = ""
                for (var ii = 0; ii < jumlah_status; ii++) {
                    var div = document.createElement("h3")
                    div.innerHTML = "Status "+list_nama_alat[i]+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var select = document.createElement("select")
                    select.name = list_alat[i]+"_status_"+parseInt(ii+1)
                    select.id = list_alat[i]+"_status_"+parseInt(ii+1)


                    var opsi = document.createElement("option")
                    opsi.value = "none"
                    opsi.innerHTML = "Tidak ada"
                    select.appendChild(opsi)

                    var opsi = document.createElement("option")
                    opsi.value = "on"
                    opsi.innerHTML = "Nyala (On)"
                    select.appendChild(opsi)

                    var opsi = document.createElement("option")
                    opsi.value = "off"
                    opsi.innerHTML = "Mati (Off)"
                    select.appendChild(opsi)

                    var status_alat_single = 0

                    try {
                        if (alldata_json[list_situs_terkini[0]]['status_list'][i][ii] == 'none') {
                            status_alat_single = 0
                        } else if (alldata_json[list_situs_terkini[0]]['status_list'][i][ii] == 'on') {
                            status_alat_single = 1
                        } else if (alldata_json[list_situs_terkini[0]]['status_list'][i][ii] == 'off') {
                            status_alat_single = 2
                        }
                    } catch (err) {
                        status_alat_single = 0
                    }
                    

                    select.selectedIndex = status_alat_single
                    div_status.appendChild(select)

                    var div = document.createElement("h3")
                    div.innerHTML = "Merk "+list_nama_alat[i]+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var input_merk = document.createElement("input")
                    input_merk.type = 'text'
                    input_merk.name = "input_"+list_alat[i]+"_merk_"+parseInt(ii+1)
                    input_merk.id = "input_"+list_alat[i]+"_merk_"+parseInt(ii+1)
                    var val_input_merk
                    try {
                        val_input_merk = alldata_json[list_situs_terkini[0]]['merk'][i][ii]
                    } catch(err) {
                        val_input_merk = ""
                    }
                    input_merk.value = val_input_merk
                    div_status.appendChild(input_merk)

                    var div = document.createElement("h3")
                    div.innerHTML = "Tahun Pengadaan "+list_nama_alat[i]+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var input_tahunp = document.createElement("input")
                    input_tahunp.type = 'text'
                    input_tahunp.name = "input_"+list_alat[i]+"_tahunpengadaan_"+parseInt(ii+1)
                    input_tahunp.id = "input_"+list_alat[i]+"_tahunpengadaan_"+parseInt(ii+1)
                    input_tahunp.setAttribute('onInput', `koreksi_tahun('${"input_"+list_alat[i]+"_tahunpengadaan_"+parseInt(ii+1)}')`)
                    var val_input_tahunp
                    try {
                        val_input_tahunp = alldata_json[list_situs_terkini[0]]['tahun_pengadaan'][i][ii]
                    } catch(err) {
                        val_input_tahunp = ""
                    }
                    input_tahunp.value = val_input_tahunp
                    div_status.appendChild(input_tahunp)

                    var div = document.createElement("h3")
                    div.innerHTML = "Tahun Kalibrasi "+list_nama_alat[i]+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var input_tahunk = document.createElement("input")
                    input_tahunk.type = 'text'
                    input_tahunk.name = "input_"+list_alat[i]+"_tahunkalibrasi_"+parseInt(ii+1)
                    input_tahunk.id = "input_"+list_alat[i]+"_tahunkalibrasi_"+parseInt(ii+1)
                    input_tahunk.setAttribute('onInput', `koreksi_tahun('${"input_"+list_alat[i]+"_tahunkalibrasi_"+parseInt(ii+1)}')`)
                    var val_input_tahunk
                    try {
                        val_input_tahunk = alldata_json[list_situs_terkini[0]]['tahun_kalibrasi'][i][ii]
                    } catch(err) {
                        val_input_tahunk = ""
                    }
                    input_tahunk.value = val_input_tahunk
                    div_status.appendChild(input_tahunk)

                    var div = document.createElement("h3")
                    div.innerHTML = "Performa "+list_nama_alat[i]+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var slider = document.createElement("input")
                    slider.name = list_alat[i]+"_performa_"+parseInt(ii+1)
                    slider.id = list_alat[i]+"_performa_"+parseInt(ii+1)
                    slider.type = "range"
                    slider.min = "0"
                    slider.max = "100"
                    try {
                        slider.value =  alldata_json[list_situs_terkini[0]]['performa_list'][i][ii]
                    } catch (err) {
                        slider.value =  100
                    }
                    //slider.onchange = `see_p_slider('${list_alat[i]+"_performa_"+parseInt(ii+1)}', '${"p_"+list_alat[i]+"_performa_"+parseInt(ii+1)}')`
                    slider.setAttribute('onInput', `set_input_slider('${list_alat[i]+"_performa_"+parseInt(ii+1)}', '${"input_"+list_alat[i]+"_performa_"+parseInt(ii+1)}')`)
                    div_status.appendChild(slider)

                    var input_slider = document.createElement("input")
                    input_slider.type = 'text'
                    input_slider.setAttribute("maxlength", 3)
                    input_slider.setAttribute("size", 3)
                    input_slider.name = "input_"+list_alat[i]+"_performa_"+parseInt(ii+1)
                    input_slider.id = "input_"+list_alat[i]+"_performa_"+parseInt(ii+1)
                    try {
                        input_slider.value = alldata_json[list_situs_terkini[0]]['performa_list'][i][ii]
                    } catch(err) {
                        input_slider.value = "100"
                    }
                    input_slider.setAttribute('onInput', `set_slider('${list_alat[i]+"_performa_"+parseInt(ii+1)}', '${"input_"+list_alat[i]+"_performa_"+parseInt(ii+1)}')`)
                    div_status.appendChild(input_slider)

                    var div = document.createElement("h3")
                    div.innerHTML = "Keterangan "+list_nama_alat[i]+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var input_ket = document.createElement("input")
                    input_ket.type = 'text'
                    input_ket.name = "input_"+list_alat[i]+"_keterangan_"+parseInt(ii+1)
                    input_ket.id = "input_"+list_alat[i]+"_keterangan_"+parseInt(ii+1)
                    try {
                        input_ket.value = alldata_json[list_situs_terkini[0]]['ket_list'][i][ii]
                    } catch(err) {
                        input_ket.value = ""
                    }
                    div_status.appendChild(input_ket)
                }
            }
        }
    }
    xhttp.open("GET", "get_data_peta", true);
    xhttp.send();
}

function set_input_slider(id_slider, id_p_slider) {
    document.getElementById(id_p_slider).value = document.getElementById(id_slider).value
}

function set_jumlah_site_kompleks(jenis_alat, stasiun, idx_alat) {
    console.log('cek param kompleks', jenis_alat, stasiun, idx_alat)
    var jumlah_single_alat = document.getElementById(jenis_alat+"_jumlah_kompleks").value
    var div_status = document.getElementById(jenis_alat+"_list_keterangan_kompleks")
    div_status.innerHTML = ''
    console.log('cek jumlah alat kompleks', jumlah_single_alat)
    for (var iter_i = 0; iter_i < jumlah_single_alat; iter_i++) {
        var div = document.createElement("h3")
        div.innerHTML = "Status "+jenis_alat+" ("+parseInt(iter_i+1)+")"
        div_status.appendChild(div)

        var select = document.createElement("select")
        select.name = 'kompleks_'+jenis_alat+"_status_"+parseInt(iter_i+1)
        select.id = 'kompleks_'+jenis_alat+"_status_"+parseInt(iter_i+1)

        var opsi = document.createElement("option")
        opsi.value = "none"
        opsi.innerHTML = "Tidak ada"
        select.appendChild(opsi)

        var opsi = document.createElement("option")
        opsi.value = "on"
        opsi.innerHTML = "Nyala (On)"
        select.appendChild(opsi)

        var opsi = document.createElement("option")
        opsi.value = "off"
        opsi.innerHTML = "Mati (Off)"
        select.appendChild(opsi)

        var status_alat_single = 0

        try {
            if (alldata_json[stasiun]['alat_kompleks'][idx_alat]['status_list'][iter_i] == 'none') {
                status_alat_single = 0
            } else if (alldata_json[stasiun]['alat_kompleks'][idx_alat]['status_list'][iter_i] == 'on') {
                status_alat_single = 1
            } else if (alldata_json[stasiun]['alat_kompleks'][idx_alat]['status_list'][iter_i] == 'off') {
                status_alat_single = 2
            }
        } catch (err) {
            status_alat_single = 0
        }

        select.selectedIndex = status_alat_single
        div_status.appendChild(select)

        var div = document.createElement("h3")
        div.innerHTML = "Merk "+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+" ("+parseInt(iter_i+1)+")"
        div_status.appendChild(div)

        var input_merk = document.createElement("input")
        input_merk.type = 'text'
        input_merk.name = "kompleks_input_"+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+"_merk_"+parseInt(iter_i+1)
        input_merk.id = "kompleks_input_"+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+"_merk_"+parseInt(iter_i+1)
        var val_input_merk
        try {
            val_input_merk = alldata_json[stasiun]['alat_kompleks'][idx_alat]['merk'][iter_i] //edit ini nanti
        } catch(err) {
            val_input_merk = ""
        }
        input_merk.value = val_input_merk
        div_status.appendChild(input_merk)

        var div = document.createElement("h3")
        div.innerHTML = "Tahun Pengadaan "+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+" ("+parseInt(iter_i+1)+")"
        div_status.appendChild(div)

        var input_tahunp = document.createElement("input")
        input_tahunp.type = 'text'
        input_tahunp.name = "kompleks_input_"+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+"_tahunpengadaan_"+parseInt(iter_i+1)
        input_tahunp.id = "kompleks_input_"+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+"_tahunpengadaan_"+parseInt(iter_i+1)
        input_tahunp.setAttribute('onInput', `koreksi_tahun('${"kompleks_input_"+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+"_tahunkalibrasi_"+parseInt(iter_i+1)}')`)
        var val_input_tahunp
        try {
            val_input_tahunp = alldata_json[stasiun]['alat_kompleks'][idx_alat]['tahun_pengadaan'][iter_i]
        } catch(err) {
            val_input_tahunp = ""
        }
        input_tahunp.value = val_input_tahunp
        div_status.appendChild(input_tahunp)

        var div = document.createElement("h3")
        div.innerHTML = "Tahun Kalibrasi "+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+" ("+parseInt(iter_i+1)+")"
        div_status.appendChild(div)

        var input_tahunk = document.createElement("input")
        input_tahunk.type = 'text'
        input_tahunk.name = "kompleks_input_"+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+"_tahunkalibrasi_"+parseInt(iter_i+1)
        input_tahunk.id = "kompleks_input_"+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+"_tahunkalibrasi_"+parseInt(iter_i+1)
        input_tahunk.setAttribute('onInput', `koreksi_tahun('${"kompleks_input_"+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+"_tahunkalibrasi_"+parseInt(iter_i+1)}')`)
        var val_input_tahunk
        try {
            val_input_tahunk = alldata_json[stasiun]['alat_kompleks'][idx_alat]['tahun_kalibrasi'][iter_i]
        } catch(err) {
            val_input_tahunk = ""
        }
        input_tahunk.value = val_input_tahunk
        div_status.appendChild(input_tahunk)

        var div = document.createElement("h3")
        div.innerHTML = "Performa "+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+" ("+parseInt(iter_i+1)+")"
        div_status.appendChild(div)

        var slider = document.createElement("input")
        slider.name = 'kompleks_'+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+"_performa_"+parseInt(iter_i+1)
        slider.id = 'kompleks_'+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+"_performa_"+parseInt(iter_i+1)
        slider.type = "range"
        slider.min = "0"
        slider.max = "100"
        try {
            slider.value =  alldata_json[stasiun]['alat_kompleks'][idx_alat]['performa_list'][iter_i]
        } catch (err) {
            slider.value =  100
        }
        //slider.onchange = `see_p_slider('${list_alat[i]+"_performa_"+parseInt(ii+1)}', '${"p_"+list_alat[i]+"_performa_"+parseInt(ii+1)}')`
        slider.setAttribute('onInput', `set_input_slider('kompleks_${list_alat_kompleks_having[idx_alat]+"_performa_"+parseInt(iter_i+1)}', 'kompleks_${"input_"+list_alat_kompleks_having[idx_alat]+"_performa_"+parseInt(iter_i+1)}')`)
        div_status.appendChild(slider)

        var input_slider = document.createElement("input")
        input_slider.type = 'text'
        input_slider.setAttribute("maxlength", 3)
        input_slider.setAttribute("size", 3)
        input_slider.name = "kompleks_input_"+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+"_performa_"+parseInt(iter_i+1)
        input_slider.id = "kompleks_input_"+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+"_performa_"+parseInt(iter_i+1)
        try {
            input_slider.value = alldata_json[stasiun]['alat_kompleks'][idx_alat]['performa_list'][iter_i]
        } catch(err) {
            input_slider.value = "100"
        }
        input_slider.setAttribute('onInput', `set_slider('kompleks_${list_alat_kompleks_having[idx_alat]+"_performa_"+parseInt(iter_i+1)}', 'kompleks_${"input_"+list_alat_kompleks_having[idx_alat]+"_performa_"+parseInt(iter_i+1)}')`)
        div_status.appendChild(input_slider)

        var div = document.createElement("h3")
        div.innerHTML = "Keterangan "+alldata_json[stasiun]['alat_kompleks'][idx_alat]['kode_alat']+" ("+parseInt(iter_i+1)+")"
        div_status.appendChild(div)

        var input_ket = document.createElement("input")
        input_ket.type = 'text'
        input_ket.name = "kompleks_input_"+list_alat_kompleks_having[iter_i]+"_keterangan_"+parseInt(iter_i+1)
        input_ket.id = "kompleks_input_"+list_alat_kompleks_having[iter_i]+"_keterangan_"+parseInt(iter_i+1)
        try {
            input_ket.value = alldata_json[stasiun]['alat_kompleks'][idx_alat]['ket_list'][iter_i]
        } catch(err) {
            input_ket.value = "-"
        }
        div_status.appendChild(input_ket)

        //sensor list
        var div_sensor = document.createElement("div")
        div_sensor.style.border = "1px solid black";

        //get sensor list
        list_sensor = list_alat_kompleks_having[iter_i]['kelompok_sensor_list'][iter_i]['sensor_list']
        string_list_sensor = JSON.stringify(list_sensor)
        document.getElementById("konfigurasi_sensor").innerHTML = string_list_sensor
        console.log(string_list_sensor)
        for (var iter_sensor = 0; iter_sensor < list_sensor.length; iter_sensor++) {
            var div_single_sensor = document.createElement("div")
            div_single_sensor.setAttribute("onclick", "setting_sensor('"+list_sensor[iter_sensor]['kode_alat']+
            "', '"+list_alat_kompleks_having[iter_i]['kode_alat']+"', "+parseInt(iter_sensor+1)+")")
            var div_judul = document.createElement("h3")
            div_judul.innerHTML = "Setting "+list_sensor[iter_sensor]['kode_alat']
            div_single_sensor.appendChild(div_judul)
            
            div_sensor.append(div_single_sensor);
        }

        //var cek = document.createElement("H3")
        //cek.innerHTML = 'HALO'
        div_status.appendChild(div_sensor)
        //end sensor list

    }
}

function set_jumlah_site(jenis_alat, stasiun, idx_alat) {
    console.log('cek param', jenis_alat, stasiun, idx_alat)
    var jumlah_single_alat = document.getElementById(jenis_alat+"_jumlah").value
    var div_status = document.getElementById(jenis_alat+"_list_keterangan")
    div_status.innerHTML = ''
    for (var iter_i = 0; iter_i < jumlah_single_alat; iter_i++) {
        console.log('cek iter', iter_i, alldata_json[stasiun]['status_list'][idx_alat][iter_i])
        var div = document.createElement("h3")
        div.innerHTML = "Status "+jenis_alat+" ("+parseInt(iter_i+1)+")"
        div_status.appendChild(div)

        var select = document.createElement("select")
        select.name = jenis_alat+"_status_"+parseInt(iter_i+1)
        select.id = jenis_alat+"_status_"+parseInt(iter_i+1)

        var opsi = document.createElement("option")
        opsi.value = "none"
        opsi.innerHTML = "Tidak ada"
        select.appendChild(opsi)

        var opsi = document.createElement("option")
        opsi.value = "on"
        opsi.innerHTML = "Nyala (On)"
        select.appendChild(opsi)

        var opsi = document.createElement("option")
        opsi.value = "off"
        opsi.innerHTML = "Mati (Off)"
        select.appendChild(opsi)

        var status_alat_single = 0
        try {
            status_alat_single_str = alldata_json[stasiun]['status_list'][idx_alat][iter_i]
        } catch(err) {
            status_alat_single_str = 'none'
        }


        if (status_alat_single_str == 'none') {
            status_alat_single = 0
        } else if (status_alat_single_str == 'on') {
            status_alat_single = 1
        } else if (status_alat_single_str == 'off') {
            status_alat_single = 2
        }

        select.selectedIndex = status_alat_single
        div_status.appendChild(select)

        var div = document.createElement("h3")
        div.innerHTML = "Merk "+jenis_alat+" ("+parseInt(iter_i+1)+")"
        div_status.appendChild(div)

        var input_merk = document.createElement("input")
        input_merk.type = 'text'
        input_merk.name = "input_"+jenis_alat+"_merk_"+parseInt(iter_i+1)
        input_merk.id = "input_"+jenis_alat+"_merk_"+parseInt(iter_i+1)
        var val_input_merk
        try {
            val_input_merk = alldata_json[stasiun]['merk'][idx_alat][iter_i]
        } catch(err) {
            val_input_merk = ""
        }
        input_merk.value = val_input_merk
        div_status.appendChild(input_merk)

        var div = document.createElement("h3")
        div.innerHTML = "Tahun Pengadaan "+jenis_alat+" ("+parseInt(iter_i+1)+")"
        div_status.appendChild(div)

        var input_tahunp = document.createElement("input")
        input_tahunp.type = 'text'
        input_tahunp.name = "input_"+jenis_alat+"_tahunpengadaan_"+parseInt(iter_i+1)
        input_tahunp.id = "input_"+jenis_alat+"_tahunpengadaan_"+parseInt(iter_i+1)
        input_tahunp.setAttribute('onInput', `koreksi_tahun('${"input_"+jenis_alat+"_tahunpengadaan_"+parseInt(iter_i+1)}')`)
        var val_input_tahunp
        try {
            val_input_tahunp = alldata_json[stasiun]['tahun_pengadaan'][idx_alat][iter_i]
        } catch(err) {
            val_input_tahunp = ""
        }
        input_tahunp.value = val_input_tahunp
        div_status.appendChild(input_tahunp)

        var div = document.createElement("h3")
        div.innerHTML = "Tahun Kalibrasi "+jenis_alat+" ("+parseInt(iter_i+1)+")"
        div_status.appendChild(div)

        var input_tahunk = document.createElement("input")
        input_tahunk.type = 'text'
        input_tahunk.name = "input_"+jenis_alat+"_tahunkalibrasi_"+parseInt(iter_i+1)
        input_tahunk.id = "input_"+jenis_alat+"_tahunkalibrasi_"+parseInt(iter_i+1)
        input_tahunk.setAttribute('onInput', `koreksi_tahun('${"input_"+jenis_alat+"_tahunkalibrasi_"+parseInt(iter_i+1)}')`)
        var val_input_tahunk
        try {
            val_input_tahunk = alldata_json[stasiun]['tahun_kalibrasi'][idx_alat][iter_i]
        } catch(err) {
            val_input_tahunk = ""
        }
        input_tahunk.value = val_input_tahunk
        div_status.appendChild(input_tahunk)

        var div = document.createElement("h3")
        div.innerHTML = "Performa "+jenis_alat+" ("+parseInt(iter_i+1)+")"
        div_status.appendChild(div)

        var slider = document.createElement("input")
        slider.name = jenis_alat+"_performa_"+parseInt(iter_i+1)
        slider.id = jenis_alat+"_performa_"+parseInt(iter_i+1)
        slider.type = "range"
        slider.min = "0"
        slider.max = "100"
        try {
            slider.value = alldata_json[stasiun]['performa_list'][idx_alat][iter_i]
            if (typeof alldata_json[stasiun]['performa_list'][idx_alat][iter_i] == 'undefined') {
                slider.value = "100"
            }
        } catch(err) {
            slider.value = "100"
        }
        //slider.onchange = `see_p_slider('${jenis_alat+"_performa_"+parseInt(iter_i+1)}', '${"p_"+jenis_alat+"_performa_"+parseInt(iter_i+1)}')`
        slider.setAttribute('onInput', `set_input_slider('${jenis_alat+"_performa_"+parseInt(iter_i+1)}', '${"input_"+jenis_alat+"_performa_"+parseInt(iter_i+1)}')`)
        div_status.appendChild(slider)

        var input_slider = document.createElement("input")
        input_slider.type = 'text'
        input_slider.setAttribute("maxlength", 3)
        input_slider.setAttribute("size", 3)
        input_slider.name = "input_"+jenis_alat+"_performa_"+parseInt(iter_i+1)
        input_slider.id = "input_"+jenis_alat+"_performa_"+parseInt(iter_i+1)
        try {
            input_slider.value = alldata_json[stasiun]['performa_list'][idx_alat][iter_i]
            if (typeof alldata_json[stasiun]['performa_list'][idx_alat][iter_i] == 'undefined') {
                input_slider.value = "100"
            }
        } catch(err) {
            input_slider.value = "100"
        }
        input_slider.setAttribute('onInput', `set_slider('${jenis_alat+"_performa_"+parseInt(iter_i+1)}', '${"input_"+jenis_alat+"_performa_"+parseInt(iter_i+1)}')`)
        div_status.appendChild(input_slider)

        var div = document.createElement("h3")
        div.innerHTML = "Keterangan "+jenis_alat+" ("+parseInt(iter_i+1)+")"
        div_status.appendChild(div)

        var input_ket = document.createElement("input")
        input_ket.type = 'text'
        input_ket.name = "input_"+jenis_alat+"_keterangan_"+parseInt(iter_i+1)
        input_ket.id = "input_"+jenis_alat+"_keterangan_"+parseInt(iter_i+1)
        try {
            input_ket.value = alldata_json[stasiun]['ket_list'][idx_alat][ii]
        } catch(err) {
            input_ket.value = "-"
        }
        div_status.appendChild(input_ket)

    }

}

function set_slider(id_slider, id_p_slider) {
    var val_slider = parseInt(document.getElementById(id_p_slider).value)
    if (val_slider > 100) {
        val_slider = 100
    } else if (val_slider < 0) {
        val_slider = 0
    } else if (isNaN(val_slider)) {
        val_slider = 0
    }
    document.getElementById(id_slider).value = val_slider
    document.getElementById(id_p_slider).value = val_slider
}

function koreksi_tahun(id_tahun) {
    var val_tahun = parseInt(document.getElementById(id_tahun).value)
    if (isNaN(val_tahun)) {
        val_tahun = 2000
    }
    document.getElementById(id_tahun).value = val_tahun
}

auto_fill();

function auto_fill_onchange() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var selected_situs = document.getElementById("situs").value
            
            var list_alat_str = document.getElementById("daftar_alat").innerHTML
            list_alat_str = list_alat_str.split(",")

            var list_alat = []
            for (var i = 0; i < list_alat_str.length; i++) {
                if (list_alat_str[i] == "") {
                    continue
                }
                list_alat.push(list_alat_str[i]);
            }
            
            var alldata = this.responseText
            var alldata_json = JSON.parse(alldata);
            
            for (var i = 0; i < list_alat.length; i++) {
                /*document.getElementById(list_alat[i]+"_keterangan").value = alldata_json[selected_situs]['keterangan_alat_list'][i]
                if (alldata_json[selected_situs]['status_alat_list'][i] == 'none') {
                    document.getElementById(list_alat[i]+"_status").selectedIndex = 0
                } else if (alldata_json[selected_situs]['status_alat_list'][i] == 'on') {
                    document.getElementById(list_alat[i]+"_status").selectedIndex = 1
                } else if (alldata_json[selected_situs]['status_alat_list'][i] == 'off') {
                    document.getElementById(list_alat[i]+"_status").selectedIndex = 2
                }*/

                var jumlah_status = 0
                if (alldata_json[selected_situs]['jumlah'][i] <= 5) {
                    jumlah_status = alldata_json[selected_situs]['jumlah'][i]
                } else {
                    jumlah_status = 5
                }
                document.getElementById(list_alat[i]+"_jumlah").selectedIndex = jumlah_status
                document.getElementById(list_alat[i]+"_jumlah").setAttribute('onChange', `set_jumlah_site('${list_alat[i]}', '${selected_situs}', '${i}')`)
                //generate performa, status, keterangan
                var div_status = document.getElementById(list_alat[i]+"_list_keterangan")
                div_status.innerHTML = ""
                for (var ii = 0; ii < jumlah_status; ii++) {
                    var div = document.createElement("h3")
                    div.innerHTML = "Status "+list_alat[i]+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var select = document.createElement("select")
                    select.name = list_alat[i]+"_status_"+parseInt(ii+1)
                    select.id = list_alat[i]+"_status_"+parseInt(ii+1)


                    var opsi = document.createElement("option")
                    opsi.value = "none"
                    opsi.innerHTML = "Tidak ada"
                    select.appendChild(opsi)

                    var opsi = document.createElement("option")
                    opsi.value = "on"
                    opsi.innerHTML = "Nyala (On)"
                    select.appendChild(opsi)

                    var opsi = document.createElement("option")
                    opsi.value = "off"
                    opsi.innerHTML = "Mati (Off)"
                    select.appendChild(opsi)

                    var status_alat_single = 0

                    if (alldata_json[selected_situs]['status_list'][i][ii] == 'none') {
                        status_alat_single = 0
                    } else if (alldata_json[selected_situs]['status_list'][i][ii] == 'on') {
                        status_alat_single = 1
                    } else if (alldata_json[selected_situs]['status_list'][i][ii] == 'off') {
                        status_alat_single = 2
                    }

                    select.selectedIndex = status_alat_single
                    div_status.appendChild(select)

                    var div = document.createElement("h3")
                    div.innerHTML = "Merk "+list_alat[i]+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var input_merk = document.createElement("input")
                    input_merk.type = 'text'
                    input_merk.name = "input_"+list_alat[i]+"_merk_"+parseInt(ii+1)
                    input_merk.id = "input_"+list_alat[i]+"_merk_"+parseInt(ii+1)
                    var val_input_merk
                    try {
                        val_input_merk = alldata_json[selected_situs]['merk'][i][ii]
                    } catch(err) {
                        val_input_merk = ""
                    }
                    input_merk.value = val_input_merk
                    div_status.appendChild(input_merk)

                    var div = document.createElement("h3")
                    div.innerHTML = "Tahun Pengadaan "+list_alat[i]+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var input_tahunp = document.createElement("input")
                    input_tahunp.type = 'text'
                    input_tahunp.name = "input_"+list_alat[i]+"_tahunpengadaan_"+parseInt(ii+1)
                    input_tahunp.id = "input_"+list_alat[i]+"_tahunpengadaan_"+parseInt(ii+1)
                    input_tahunp.setAttribute('onInput', `koreksi_tahun('${"input_"+list_alat[i]+"_tahunpengadaan_"+parseInt(ii+1)}')`)
                    var val_input_tahunp
                    try {
                        val_input_tahunp = alldata_json[selected_situs]['tahun_pengadaan'][i][ii]
                    } catch(err) {
                        val_input_tahunp = ""
                    }
                    input_tahunp.value = val_input_tahunp
                    div_status.appendChild(input_tahunp)

                    var div = document.createElement("h3")
                    div.innerHTML = "Tahun Kalibrasi "+list_alat[i]+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var input_tahunk = document.createElement("input")
                    input_tahunk.type = 'text'
                    input_tahunk.name = "input_"+list_alat[i]+"_tahunkalibrasi_"+parseInt(ii+1)
                    input_tahunk.id = "input_"+list_alat[i]+"_tahunkalibrasi_"+parseInt(ii+1)
                    input_tahunk.setAttribute('onInput', `koreksi_tahun('${"input_"+list_alat[i]+"_tahunkalibrasi_"+parseInt(ii+1)}')`)
                    var val_input_tahunk
                    try {
                        val_input_tahunk = alldata_json[selected_situs]['tahun_kalibrasi'][i][ii]
                    } catch(err) {
                        val_input_tahunk = ""
                    }
                    input_tahunk.value = val_input_tahunk
                    div_status.appendChild(input_tahunk)

                    var div = document.createElement("h3")
                    div.innerHTML = "Performa "+list_alat[i]+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var slider = document.createElement("input")
                    slider.name = list_alat[i]+"_performa_"+parseInt(ii+1)
                    slider.id = list_alat[i]+"_performa_"+parseInt(ii+1)
                    slider.type = "range"
                    slider.min = "0"
                    slider.max = "100"
                    slider.value = "100"
                    //slider.onchange = `see_p_slider('${list_alat[i]+"_performa_"+parseInt(ii+1)}', '${"p_"+list_alat[i]+"_performa_"+parseInt(ii+1)}')`
                    slider.setAttribute('onInput', `set_input_slider('${list_alat[i]+"_performa_"+parseInt(ii+1)}', '${"input_"+list_alat[i]+"_performa_"+parseInt(ii+1)}')`)
                    div_status.appendChild(slider)

                    var input_slider = document.createElement("input")
                    input_slider.type = 'text'
                    input_slider.setAttribute("maxlength", 3)
                    input_slider.setAttribute("size", 3)
                    input_slider.name = "input_"+list_alat[i]+"_performa_"+parseInt(ii+1)
                    input_slider.id = "input_"+list_alat[i]+"_performa_"+parseInt(ii+1)
                    try {
                        input_slider.value = alldata_json[selected_situs]['performa'][i][ii]
                    } catch(err) {
                        input_slider.value = "100"
                    }
                    input_slider.setAttribute('onInput', `set_slider('${list_alat[i]+"_performa_"+parseInt(ii+1)}', '${"input_"+list_alat[i]+"_performa_"+parseInt(ii+1)}')`)
                    div_status.appendChild(input_slider)

                    var div = document.createElement("h3")
                    div.innerHTML = "Keterangan "+list_alat[i]+" ("+parseInt(ii+1)+")"
                    div_status.appendChild(div)

                    var input_ket = document.createElement("input")
                    input_ket.type = 'text'
                    input_ket.name = "input_"+list_alat[i]+"_keterangan_"+parseInt(ii+1)
                    input_ket.id = "input_"+list_alat[i]+"_keterangan_"+parseInt(ii+1)
                    try {
                        input_ket.value = alldata_json[selected_situs]['ket_list'][i][ii]
                    } catch(err) {
                        input_ket.value = "100"
                    }
                    div_status.appendChild(input_ket)
                }
            }
        }
    }
    xhttp.open("GET", "get_data_peta", true);
    xhttp.send();
}