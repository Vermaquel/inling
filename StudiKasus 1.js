/* 
Copyright 2021, Kelly Developer, All rights reserved.

this code is created to perform the analysis the impact of Pre proscessing satelite Landsat 7 Surface Reflectance image

allowed for personal and educational use
not allowed for commercial purposes

Credits:
- Google
- U.S. Geological Survey
*/

// -=-=-=-= Segmen baris kode ini adalah untuk menunjukkan batas wilayah praktikum =-=-=-=-
var areaStudi = indonesia.filter(ee.Filter.inList('NAME_1', ['Aceh'])); // variabel untuk shp area studi dari asset yang telah di upload
Map.addLayer(areaStudi,{color:"Blue" },"Area Studi"); // Untuk menampilkan layer peta seluruh area studi
Map.centerObject(ee.FeatureCollection(areaStudi), 8); // Untuk mengarahkan fokus peta saat di Run, pada obyek layer studi

// -=-=-=-= Segmen ini untuk menentukan waktu yang digunakan pada data =-=-=-
var daftarTanggal = [['2016-01-01', '2020-12-31'], // tahun 2019
  ['2018-01-01', '2020-12-31'], // tahun 2020
  ['2020-01-01', '2020-12-31']]; // tahun 2021
var start = ee.Date(daftarTanggal[0][0]); // List akan diganti setiap urutan 0, 1, 2
var end = ee.Date(daftarTanggal[0][1]); // List akan diganti setiap urutan 0, 1, 2

// -=-=-=-= Segmen baris kode ini adalah untuk mengimport data Landsat 7 SR Tidak Di-masking awan Namun dilakukan sorting tutupan awan =-=-=-=-
var data1 = function(_date) { // fungsi untuk menyediakan data berdasarkan waktu yang di inputkan
    return ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')  // memanggil koleksi data Landsat 7 surface reflektance
      .filterBounds(areaStudi) // melakukan filter data hanya pada area studi saja
      .filterDate(_date[0], _date[1]) // melakukan filter tanggal pada waktu yang ditentukan
      .mosaic(); // melukan penggabungan antar data untuk menutup celah pada daerah yang tidak terekam pada data sebelumnya;
  };

Map.addLayer(data1(daftarTanggal[0]).clip(areaStudi), {bands:['B3','B2','B1'], min:-520, max:3200}, 'Hasil Tujuan satu Landsat 7 SR Periode 1'); // menambahkan tampilan RGB True color pada layer peta
Map.addLayer(data1(daftarTanggal[1]).clip(areaStudi), {bands:['B3','B2','B1'], min:-520, max:3200}, 'Hasil Tujuan satu Landsat 7 SR Periode 2'); // menambahkan tampilan RGB True color pada layer peta
Map.addLayer(data1(daftarTanggal[2]).clip(areaStudi), {bands:['B3','B2','B1'], min:-520, max:3200}, 'Hasil Tujuan satu Landsat 7 SR Periode 3'); // menambahkan tampilan RGB True color pada layer peta

// -=-=-=-= Segmen baris kode ini adalah untuk mengimport data Landsat 7 SR Tidak Di-masking awan Namun dilakukan sorting tutupan awan =-=-=-=-
var data2 = function(_date) { // fungsi untuk menyediakan data berdasarkan waktu yang di inputkan
    return ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')  // memanggil koleksi data Landsat 7 surface reflektance
      .filterBounds(areaStudi) // melakukan filter data hanya pada area studi saja
      .filterDate(_date[0], _date[1]) // melakukan filter tanggal pada waktu yang ditentukan
      .sort('CLOUD_COVER',false) // melakukan pengurutan data yang memiliki nilai tutupan awan terendah
      .mosaic(); // melukan penggabungan antar data untuk menutup celah pada daerah yang tidak terekam pada data sebelumnya;
  };

Map.addLayer(data2(daftarTanggal[0]).clip(areaStudi), {bands:['B3','B2','B1'], min:-520, max:3200}, 'Hasil Tujuan dua Landsat 7 SR Periode 1'); // menambahkan tampilan RGB True color pada layer peta
Map.addLayer(data2(daftarTanggal[1]).clip(areaStudi), {bands:['B3','B2','B1'], min:-520, max:3200}, 'Hasil Tujuan dua Landsat 7 SR Periode 2'); // menambahkan tampilan RGB True color pada layer peta
Map.addLayer(data2(daftarTanggal[2]).clip(areaStudi), {bands:['B3','B2','B1'], min:-520, max:3200}, 'Hasil Tujuan dua Landsat 7 SR Periode 3'); // menambahkan tampilan RGB True color pada layer peta

// -=-=-=-= Segmen baris kode ini adalah untuk mengimport data Landsat 7 SR dengan masking awan =-=-=-=-
var data3 = function(_date) { // fungsi untuk menyediakan data berdasarkan waktu yang di inputkan
    return ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')  // memanggil koleksi data Landsat 7 surface reflektance
      .filterBounds(areaStudi) // melakukan filter data hanya pada area studi saja
      .filterDate(_date[0], _date[1]) // melakukan filter tanggal pada waktu yang ditentukan
      .map(cloudMaskL457) // melakukan masking dengan memanggil fungsi masking dan mengganti nilai citra dengan yang tidak tertutup awan
      .median();  // mengambil nilai median dari koleksi citra yang telah di masking
  };
var cloudMaskL457 = function(image) { // fungsi untuk melakukan masking pada citra yang berawan
    var qa = image.select('pixel_qa').clip(areaStudi);
    // If the cloud bit (5) is set and the cloud confidence (7) is high
    // or the cloud shadow bit is set (3), then it's a bad pixel.
    var cloud = qa.bitwiseAnd(1 << 5)
                    .and(qa.bitwiseAnd(1 << 7))
                    .or(qa.bitwiseAnd(1 << 3));
    // Remove edge pixels that don't occur in all bands
    var mask2 = image.mask().reduce(ee.Reducer.min());
    return image.updateMask(cloud.not()).updateMask(mask2);
  };
  
Map.addLayer(data3(daftarTanggal[0]).clip(areaStudi), {bands:['B3','B2','B1'], min:-520, max:3200}, 'Hasil Tujuan tiga Landsat 7 SR Periode 1'); // menambahkan tampilan RGB True color pada layer peta
Map.addLayer(data3(daftarTanggal[1]).clip(areaStudi), {bands:['B3','B2','B1'], min:-520, max:3200}, 'Hasil Tujuan tiga Landsat 7 SR Periode 2'); // menambahkan tampilan RGB True color pada layer peta
Map.addLayer(data3(daftarTanggal[2]).clip(areaStudi), {bands:['B3','B2','B1'], min:-520, max:3200}, 'Hasil Tujuan tiga Landsat 7 SR Periode 3'); // menambahkan tampilan RGB True color pada layer peta