 
  document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modal').classList.remove('is-visible');
  });

  document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modal').classList.remove('is-visible');
  });

  document.getElementById('close-btn_sensor').addEventListener('click', function() {
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modal_sensor').classList.remove('is-visible');
  });


function markerOnClick() {
    var list_alat_str = document.getElementById("daftar_alat").innerHTML
    list_alat_str = list_alat_str.split(",")

    var list_alat = []
    for (var i = 0; i < list_alat_str.length; i++) {
        if (list_alat_str[i] == "") {
            continue
        }
        list_alat.push(list_alat_str[i]);
    }
    var kode = this.options.kode_situs
    console.log(alldata_json)
    document.getElementById('modal_kode_stasiun').innerHTML = kode

    var div_status = document.getElementById("modal_status_alat")
    div_status.innerHTML = ""

    var modal_table_utama = document.createElement("table")
    modal_table_utama.setAttribute("border", "1px solid black")
    for (var i = 0; i < list_alat.length; i++) {
        var tr = document.createElement("tr")
        var td = document.createElement("td")
        td.setAttribute("colspan", "2")
        td.innerHTML = "<b>"+ list_alat[i]+"</b>"
        tr.appendChild(td)
        modal_table_utama.appendChild(tr)
        var jumlah_status = 0
        if (alldata_json[kode]['jumlah'][i] <= 5) {
            jumlah_status = alldata_json[kode]['jumlah'][i]
        } else {
            jumlah_status = 5
        }

        for (var ii = 0; ii < jumlah_status; ii++) {
            var tr = document.createElement("tr")
            var td = document.createElement("td")
            td.innerHTML = "Merk "+list_alat[i]+" ("+parseInt(ii+1)+")"
            tr.appendChild(td)
            var td = document.createElement("td")
            try {
                td.innerHTML = alldata_json[kode]['merk'][i][ii]
            } catch (err) {
                td.innerHTML = "-"
            }
            tr.appendChild(td)
            modal_table_utama.appendChild(tr)

            var tr = document.createElement("tr")
            var td = document.createElement("td")
            td.innerHTML = "Tahun Pengadaan "+list_alat[i]+" ("+parseInt(ii+1)+")"
            tr.appendChild(td)
            var td = document.createElement("td")
            try {
                td.innerHTML =alldata_json[kode]['tahun_pengadaan'][i][ii]
            } catch (err) {
                td.innerHTML = "-"
            }
            tr.appendChild(td)
            modal_table_utama.appendChild(tr)

            var tr = document.createElement("tr")
            var td = document.createElement("td")
            td.innerHTML = "Tahun Kalibrasi "+list_alat[i]+" ("+parseInt(ii+1)+")"
            tr.appendChild(td)
            var td = document.createElement("td")
            try {
                td.innerHTML =alldata_json[kode]['tahun_kalibrasi'][i][ii]
            } catch (err) {
                td.innerHTML = "-"
            }
            tr.appendChild(td)
            modal_table_utama.appendChild(tr)

            var tr = document.createElement("tr")
            var td = document.createElement("td")
            td.innerHTML = "Status "+list_alat[i]+" ("+parseInt(ii+1)+")"
            tr.appendChild(td)
            var td = document.createElement("td")
            try {
                td.innerHTML = alldata_json[kode]['status_list'][i][ii]
            } catch (err) {
                td.innerHTML = "-"
            }
            tr.appendChild(td)
            modal_table_utama.appendChild(tr)

            var tr = document.createElement("tr")
            var td = document.createElement("td")
            td.innerHTML = "Performa "+list_alat[i]+" ("+parseInt(ii+1)+")"
            tr.appendChild(td)
            var td = document.createElement("td")
            try {
                td.innerHTML = alldata_json[kode]['performa'][i][ii]
            } catch (err) {
                td.innerHTML = "-"
            }
            tr.appendChild(td)
            modal_table_utama.appendChild(tr)

            var tr = document.createElement("tr")
            var td = document.createElement("td")
            td.innerHTML = "Keterangan "+list_alat[i]+" ("+parseInt(ii+1)+")"
            tr.appendChild(td)
            var td = document.createElement("td")
            try {
                td.innerHTML = alldata_json[kode]['ket_list'][i][ii]
            } catch (err) {
                td.innerHTML = "-"
            }
            tr.appendChild(td)
            modal_table_utama.appendChild(tr)

        }
    }
    div_status.appendChild(modal_table_utama)

    document.getElementById('overlay').classList.add('is-visible')
    document.getElementById('modal').classList.add('is-visible')
}

function setting_sensor(kode_sensor, alat_induk, number) {
    //baca data
    var raw_data_sensor = document.getElementById('konfigurasi_sensor').innerHTML
    var data_sensor = JSON.parse(raw_data_sensor)

    var single_sensor_data = ''
    for (var iter_data_sensor = 0; iter_data_sensor < data_sensor.length; iter_data_sensor++) {
        if (data_sensor[iter_data_sensor]['kode_alat'] == kode_sensor) {
            single_sensor_data = data_sensor[iter_data_sensor]
        }
    }
    if (single_sensor_data == '') {
        return
    }
    console.log(single_sensor_data, alat_induk, number)

    var induk = document.getElementById('kode_jenis_sensor')
    induk.innerHTML = ''

    var div = document.createElement("h3")
    div.innerHTML = "Jumlah "+kode_sensor
    induk.appendChild(div)

    var select = document.createElement("select")
    select.id = "setting_jumlah_sensor"
    for (var iter_sensor = 0; iter_sensor < 6; iter_sensor++) {
        var opsi = document.createElement("option")
        opsi.value = iter_sensor
        opsi.innerHTML = iter_sensor
        select.appendChild(opsi)
    }

    var jumlah_sensor = 0
    try {
        jumlah_sensor = parseInt(single_sensor_data['jumlah'])
    } catch (err) {
        var jumlah_sensor = 0
    }
    select.value = jumlah_sensor
    induk.appendChild(select)
    

    var div_status = document.createElement("div")
    div_status.id = kode_sensor+"_list_keterangan_sensor"
    div_status.innerHTML = ""
    
    select.setAttribute('onChange', `set_jumlah_sensor('${kode_sensor+"_list_keterangan_sensor"}', '${kode_sensor}', '${alat_induk}', '${number}')`)

    for (var iter_jumlah_sensor = 0; iter_jumlah_sensor < jumlah_sensor; iter_jumlah_sensor++) {
        var div = document.createElement("h3")
        div.innerHTML = "Status "+kode_sensor+" ("+parseInt(iter_jumlah_sensor+1)+")"
        div_status.appendChild(div)

        var select = document.createElement("select")
        //select.name = 'kompleks_'+alat_induk+"_"+number+"/status_"+kode_sensor+"_"+iter_jumlah_sensor
        //select.id = 'kompleks_'+alat_induk+"_"+number+"/status_"+kode_sensor+"_"+iter_jumlah_sensor
        select.name = 'status_sensor_'+iter_jumlah_sensor+1
        select.id = 'status_sensor_'+iter_jumlah_sensor+1

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

        var status_single_sensor = 'none'
        try {
            if (single_sensor_data['status_list'][iter_jumlah_sensor] == 'none' || 
            single_sensor_data['status_list'][iter_jumlah_sensor] == 'on' ||
            single_sensor_data['status_list'][iter_jumlah_sensor] == 'off') {
                status_single_sensor = single_sensor_data['status_list'][iter_jumlah_sensor]
            } else {
                status_single_sensor = 'none'
            }
        } catch (err) {
            status_single_sensor = 'none'
        }

        select.value = status_single_sensor

        div_status.appendChild(select)

        var div = document.createElement("h3")
        div.innerHTML = "Performa "+kode_sensor+" ("+parseInt(iter_jumlah_sensor+1)+")"
        div_status.appendChild(div)

        var slider = document.createElement("input")
        //slider.name = 'kompleks_'+alat_induk+"_"+number+"/performa_"+kode_sensor+"_"+iter_jumlah_sensor
        //slider.id = 'kompleks_'+alat_induk+"_"+number+"/performa_"+kode_sensor+"_"+iter_jumlah_sensor
        slider.name = 'performa_'+iter_jumlah_sensor+1
        slider.id = 'performa_'+iter_jumlah_sensor+1
        slider.type = "range"
        slider.min = "0"
        slider.max = "100"
        try {
            slider.value =  single_sensor_data['performa_list'][iter_jumlah_sensor]
        } catch (err) {
            slider.value =  100
        }
        //slider.onchange = `see_p_slider('${list_alat[i]+"_performa_"+parseInt(ii+1)}', '${"p_"+list_alat[i]+"_performa_"+parseInt(ii+1)}')`
        slider.setAttribute('onInput', `set_input_slider('${'performa_'+iter_jumlah_sensor+1}', '${'performaIS_'+iter_jumlah_sensor+1}')`)
        div_status.appendChild(slider)

        var input_slider = document.createElement("input")
        input_slider.type = 'text'
        input_slider.setAttribute("maxlength", 3)
        input_slider.setAttribute("size", 3)
        //input_slider.name = 'kompleks_input_'+alat_induk+"_"+number+"/performa_"+kode_sensor+"_"+iter_jumlah_sensor
        //input_slider.id = 'kompleks_input_'+alat_induk+"_"+number+"/performa_"+kode_sensor+"_"+iter_jumlah_sensor
        input_slider.name = 'performaIS_'+iter_jumlah_sensor+1
        input_slider.id = 'performaIS_'+iter_jumlah_sensor+1
        try {
            input_slider.value = single_sensor_data['performa_list'][iter_jumlah_sensor]
        } catch(err) {
            input_slider.value = "100"
        }
        input_slider.setAttribute('onInput', `set_slider('${'performa_'+iter_jumlah_sensor+1}', '${'performaIS_'+iter_jumlah_sensor+1}')`)
        div_status.appendChild(input_slider)

    }
    induk.appendChild(div_status)

    //<button id="update" onclick="update()" type="submit" class="btn btn-link text-primary">Update</button>
    var button = document.createElement("button")
    button.classList.add('btn')
    button.classList.add('btn-link')
    button.classList.add('text-primary')
    button.style.display = 'block'
    button.innerHTML = 'Ok'
    button.setAttribute('onClick', `update_data_sensor('${kode_sensor}')`)
    induk.appendChild(button)

    document.getElementById('overlay').classList.add('is-visible')
    document.getElementById('modal_sensor').classList.add('is-visible')
}

function set_jumlah_sensor(id_div, kode_sensor, alat_induk, number) {
    //get jumlah sensor
    var jumlah_sensor = document.getElementById('setting_jumlah_sensor').value;
    var div_status = document.getElementById(id_div)
    div_status.innerHTML = ""
    for (var iter_jumlah_sensor = 0; iter_jumlah_sensor < jumlah_sensor; iter_jumlah_sensor++) {
        console.log('cek function sensor', iter_jumlah_sensor, jumlah_sensor)
        var div = document.createElement("h3")
        div.innerHTML = "Status "+kode_sensor+" ("+parseInt(iter_jumlah_sensor+1)+")"
        div_status.appendChild(div)

        var select = document.createElement("select")
        select.name = 'status_sensor_'+iter_jumlah_sensor+1
        select.id = 'status_sensor_'+iter_jumlah_sensor+1

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

        var status_single_sensor = 'none'
        try {
            if (single_sensor_data['status_list'][iter_jumlah_sensor] == 'none' || 
            single_sensor_data['status_list'][iter_jumlah_sensor] == 'on' ||
            single_sensor_data['status_list'][iter_jumlah_sensor] == 'off') {
                status_single_sensor = single_sensor_data['status_list'][iter_jumlah_sensor]
            } else {
                status_single_sensor = 'none'
            }
        } catch (err) {
            status_single_sensor = 'none'
        }

        select.value = status_single_sensor

        div_status.appendChild(select)

        var div = document.createElement("h3")
        div.innerHTML = "Performa "+kode_sensor+" ("+parseInt(iter_jumlah_sensor+1)+")"
        div_status.appendChild(div)

        var slider = document.createElement("input")
        slider.name = 'performa_'+iter_jumlah_sensor+1
        slider.id = 'performa_'+iter_jumlah_sensor+1
        slider.type = "range"
        slider.min = "0"
        slider.max = "100"
        try {
            slider.value =  single_sensor_data['performa_list'][iter_jumlah_sensor]
        } catch (err) {
            slider.value =  100
        }
        //slider.onchange = `see_p_slider('${list_alat[i]+"_performa_"+parseInt(ii+1)}', '${"p_"+list_alat[i]+"_performa_"+parseInt(ii+1)}')`
        slider.setAttribute('onInput', `set_input_slider('${'performa_'+iter_jumlah_sensor+1}', '${'performaIS_'+iter_jumlah_sensor+1}')`)
        div_status.appendChild(slider)

        var input_slider = document.createElement("input")
        input_slider.type = 'text'
        input_slider.setAttribute("maxlength", 3)
        input_slider.setAttribute("size", 3)
        input_slider.name = 'performaIS_'+iter_jumlah_sensor+1
        input_slider.id = 'performaIS_'+iter_jumlah_sensor+1
        try {
            input_slider.value = single_sensor_data['performa_list'][iter_jumlah_sensor]
        } catch(err) {
            input_slider.value = "100"
        }
        input_slider.setAttribute('onInput', `set_slider('${'performa_'+iter_jumlah_sensor+1}', '${'performaIS_'+iter_jumlah_sensor+1}')`)
        div_status.appendChild(input_slider)

    }
}

function update_data_sensor(kode_alat) {
    //get all data in input
    var raw_data_sensor = document.getElementById('konfigurasi_sensor').innerHTML
    var data_sensor = JSON.parse(raw_data_sensor)

    var jumlah_sensor = document.getElementById('setting_jumlah_sensor').value;
    console.log('jumlah sensor', jumlah_sensor)
    var all_sensor_status = []
    var all_sensor_performa = []
    var all_sensor_ket = []
    for (var iter_jumlah_sensor = 0; iter_jumlah_sensor < jumlah_sensor; iter_jumlah_sensor++) {
        var single_status = document.getElementById('status_sensor_'+iter_jumlah_sensor+1).value
        var single_performa = document.getElementById('performa_'+iter_jumlah_sensor+1).value
        all_sensor_status.push(single_status)
        all_sensor_performa.push(single_performa)
        all_sensor_ket.push('')
        console.log(single_status, single_performa)
    }
    var data_dict = {}
    data_dict['jumlah'] = jumlah_sensor
    data_dict['ket_list'] = all_sensor_ket
    data_dict['kode_alat'] = kode_alat
    data_dict['performa_list'] = all_sensor_performa
    data_dict['status_list'] = all_sensor_status

    //update data
    for (var iter_data_sensor = 0; iter_data_sensor < data_sensor.length; iter_data_sensor++) {
        if (data_sensor[iter_data_sensor]['kode_alat'] == kode_alat) {
            data_sensor[iter_data_sensor] = data_dict
            break
        }
    }
    document.getElementById('konfigurasi_sensor').innerHTML = JSON.stringify(data_sensor)
}