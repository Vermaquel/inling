// -=-=-=-= Segmen baris kode ini adalah untuk menunjukkan batas wilayah praktikum =-=-=-=-
var areaStudi = indonesia.filter(ee.Filter.inList('NAME_1', ['Aceh'])); // variabel untuk shp area studi dari asset yang telah di upload
Map.addLayer(areaStudi,{color:"Blue" },"Area Studi"); // Untuk menampilkan layer peta seluruh area studi
Map.centerObject(ee.FeatureCollection(areaStudi), 8); // Untuk mengarahkan fokus peta saat di Run, pada obyek layer studi

// -=-=-=-= Segmen baris kode ini adalah untuk menampilkan animasi perubahan suhu di Provinsi Aceh =-=-=-=-
/*
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var col = ee.ImageCollection("MODIS/006/MOD11A2").select('LST_Day_1km'); // memanggil koleksi data MODIS LST
var mask = ee.FeatureCollection(areaStudi); // Membuat mask area menggunakan boundary areaStudi

var region =     ee.Geometry.Polygon( // Membuat batas wilayah GIF
        [[[94.60340054913556, 6.396457568765217],
          [94.60340054913556, 1.7293475552679358],
          [98.38269742413556, 1.7293475552679358],
          [98.38269742413556, 6.396457568765217]]], null, false);
          
col = col.map(function(img) { // Fungsi ini digunakan untuk memberikan atribute tanggal pada setiap image yang di ambil
  var doy = ee.Date(img.get('system:time_start')).getRelative('day', 'year'); // variabel baru untuk mendefinisikan tanggal
  return img.set('doy', doy); // mengembalikan gambar dengan atribute tanggal
});

var distinctDOY = col.filterDate('2020-01-01', '2020-12-31'); // Variabel untuk mengambil gambar dengan waktu yang berbeda
var filter = ee.Filter.equals({leftField: 'doy', rightField: 'doy'}); // Membuat filter sesuai dengan waktu berbeda yang telah ditentukan
var join = ee.Join.saveAll('doy_matches'); // Variabel untuk menggabungkan gambar yang telah di filter
var joinCol = ee.ImageCollection(join.apply(distinctDOY, col, filter)); // Membuat list koleksi gabungan gambar yang telah digabung

var comp = joinCol.map(function(img) { // Fungsi untuk menghitung nilai median sekaligus mereduksi jumlah data
  var doyCol = ee.ImageCollection.fromImages( // mengambil gambar dari koleksi sesuai dengan filter waktunya
    img.get('doy_matches') // filter waktu untuk mengambil gambar
  );
  return doyCol.mean().multiply(0.02).subtract(273.15).reduce(ee.Reducer.median()); // mengembalikan gambar yang telah di hitung nilai mediannya
});

var visParams = { // Visual paramater untuk menampilkan nilai median yang telah di hitung
    min: 20, // nilai batas minimum suhu
    max: 40, // nilai batas maksimum suhu
    palette: [ // Palet warna
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
    ],
   };

var rgbVis = comp.map(function(img) { // fungsi untuk mengembalikan gambar dengan warna RGB dari palet 
  return img.visualize(visParams).clip(mask); // mengembalikan gambar yang telah di proses nilai RGBnya serta memotong gambar menggunakan batas wilayah studi
});

var gifParams = { // parameter untuk membuat gif
  'region': region, // batas wilayah perekaman animasi
  'dimensions': 600, // dimensi gambar animasi
  'crs': 'EPSG:3857', // Ellipsoid yang digunakan menampilkan gambar animasi
  'framesPerSecond': 10, // jumlah frame yang ditampilkan dalam satu detik
  'format': 'gif' // format gambar animasi
};

print(rgbVis.getVideoThumbURL(gifParams)); // Menampilkan link animasi grafik di console
print(ui.Thumbnail(rgbVis, gifParams)); // Menampilkan animasi GIF di console

// -=-=-=-= Segmen baris kode ini adalah untuk menampilkan grafik 10 kota perubahan suhu di Provinsi Aceh =-=-=-=-
var dataset = ee.ImageCollection("MODIS/006/MOD11A2") // memanggil koleksi data MODIS LST
                .filterDate('2020-01-01', '2020-12-31') // Memberikan rentang waktu 
                .map(function(image){return image}) // mengaplikasikan fungsi pnegolahan gambar
  
var LST = dataset.map(function(image) { // fungsi untuk menghitung nilai LST dari kelvin menuju Celcius
 var LST2 = image.expression( // membuat fungsi untuk mengubah kelvin menjadi celcius
 '(band*0.02)-(273.15)', { // operator matematika
 'band': image.select('LST_Day_1km') // mendefinisikan band yaitu LST
})
var LST3 = LST2.focal_median(1000, 'circle', 'meters') // membuat gambar dengan piksel yang lebih halus
               .rename('LST1'); // memberikan nama band baru
return image.addBands(LST3); // menambahkan image dengan band baru yang telah dihitung
});

var titik = ee.FeatureCollection([ // membuat koleksi data titik 10 kota di Provinsi Aceh
    ee.Feature(ee.Geometry.Point( 95.68944806152209,5.17999646574383), {label: 'Kota Jantho'}), // data kota Jantho
    ee.Feature(ee.Geometry.Point( 97.17958518061866,3.2643321349465264), {label: 'Tapak Tuan'}), // data kota Tapak Tuan
    ee.Feature(ee.Geometry.Point( 98.07316456256501,4.346569456132385), {label: 'Karang Baru'}), // data kota Karang Baru
    ee.Feature(ee.Geometry.Point( 96.8432201650965,4.637034491883347), {label: 'Takengon'}), // data kota Takengon
    ee.Feature(ee.Geometry.Point( 97.81219032292643,3.481603101177416), {label: 'Kutacane'}), // data kota Kutacane
    ee.Feature(ee.Geometry.Point( 97.75265381954384,4.967044423936693), {label: 'Idi Rayeuk'}), // data kota Idi Rayeuk
    ee.Feature(ee.Geometry.Point( 97.37442177555107,5.047888085309728), {label: 'Lhoksukon'}), // data kota Lhkosukon
    ee.Feature(ee.Geometry.Point( 96.71825362642252,5.227108956831501), {label: 'Bireuen'}), // data kota Bireuen
    ee.Feature(ee.Geometry.Point( 95.95979475053672,5.38678662059017), {label: 'Sigli'}), // data Kota Sigli
    ee.Feature(ee.Geometry.Point( 95.32423550168136,5.557338962912287), {label: 'Kota Banda Aceh'}) // data Kota Banda Aceh
    ]);
    
var LSTimeSeries = ui.Chart.image.seriesByRegion(LST, titik, ee.Reducer.mean(),'LST1',  50, 'system:time_start', 'label') // Variabel untuk menyimpan data grafik hasil time series
    .setOptions({ // Memberikan pengaturan
    title: 'Nilai LST terhadap waktu 10 Kota Provinsi Aceh Tahun 2020', // Judul grafik
    vAxis: {title: 'LST (derajat Celcius)'}, // Sumbu vertikal grafik
    hAxis: {title: 'Waktu'}, // Sumbu horizontal grafik
    pointSize: 3}); // Memberikan ukuran titik
print(LSTimeSeries); // Menampilkan grafik di console