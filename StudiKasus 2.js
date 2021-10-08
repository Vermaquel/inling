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
var daftarTanggal = [['2020-01-01', '2020-12-31']]; // tahun 2020

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
Map.addLayer(data3(daftarTanggal[0]).clip(areaStudi), {bands:['B3','B2','B1'], min:-520, max:3200}, 'Citra bersih awan'); // menambahkan tampilan RGB True color pada layer peta

// -=-=-=-= Segmen baris kode ini adalah untuk nilai NDBI pada citra wilayah studi & perhitungan luas BuiltUp NonBuiltUp =-=-=-=-
var ndbi = function(_data) { // fungsi untuk menghitung NDBI
  return _data.normalizedDifference(['B5','B4']); // menghitung nilai NDBI
};
var intervals = // variabel ini digunakan untuk menyimpan style
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="1" label="1"/>' + // Non BuiltUp
      '<ColorMapEntry color="#ffa500" quantity="2" label="2" />' + // BuiltUp
    '</ColorMap>' +
  '</RasterSymbolizer>';
  
Map.addLayer(ndbi(data3(daftarTanggal[0])).clip(areaStudi), {bands:['nd'],min:-0.4,max:0.4,opacity:1,palette: ["white","orange"]}, 'Normalized Difference Built-Up Index'); // menambahkan tampilan NDBI pada layer peta
var reclass = ee.Image(1) // mereclass citra supaya bisa di kuantifikasi secara diskrit
    .where(ndbi(data3(daftarTanggal[0])).gt(-0.4).and(ndbi(data3(daftarTanggal[0])).lte(-0.25)), 1)
    .where(ndbi(data3(daftarTanggal[0])).gt(-0.25).and(ndbi(data3(daftarTanggal[0])).lte(0.4)), 2)
Map.addLayer(reclass.sldStyle(intervals).clip(areaStudi), {}, 'Reclass Normalized Difference Built-Up Index'); // menambahkan tampilan reclass NDBI pada layer peta

for (var i = 2; i < 3; i++) { // loop digunakan untuk menghitung area hasil Reclass Normalized Difference Built-Up Index
  var area = reclass.eq(i).multiply(ee.Image.pixelArea())
  var calculation = area.reduceRegion({ // penjumlahan pixel yang bernilai sama

    reducer: ee.Reducer.sum(),
    geometry: areaStudi, // batas wilayah perhitungan
    crs: "EPSG:4326", // penggunaan CRS WGS'84
    scale: 60, // scale 2 kali ukuran terkecil piksel karena menghindari memory limit
    maxPixels: 1e13, // pengesetan masksimal piksel

  })
  print(ee.Number(calculation.values().get(0)).divide(1e6))
}

// -=-=-=-= Segmen baris kode ini adalah untuk melakukan klasifikasi pada citra wilayah studi & perhitungan luas BuiltUp NonBuiltUp =-=-=-=-
var bands = ['B4','B5']; // band yang digunakan untuk klasifikasi
var training = data3(daftarTanggal[0]).select(bands).sampleRegions({
  tileScale: 1, // set 1 artinya sama dengan ukuran piksel terkecil citra
  collection: n0.merge(n2).merge(n1), // geometry yang digunakan untuk melakukan training data
  properties: ['LC'], // properti yang digunakan sebagai id
  scale: 60 // scale 2 kali ukuran terkecil piksel karena menghindari memory limit
});

var classifier = ee.Classifier.smileCart().train({
  features: training, // atribut training
  classProperty: 'LC', // properti yang digunakan sebagai id
  inputProperties: bands // band yang digunakan untuk klasifikasi
});

var classified = data3(daftarTanggal[0]).select(bands).classify(classifier); // pembuatan citra terklasifikasi
Map.addLayer(classified,{min: 0, max: 2, palette:['white','white','orange']},'Classification Built-Up & Non-Built-Up'); // menambahkan tampilan peta hasil klasifikasi

for (var i = 2; i < 3; i++) { // loop digunakan untuk menghitung area hasil 
  var area = classified.eq(i).multiply(ee.Image.pixelArea())
  var calculation = area.reduceRegion({ // penjumlahan pixel yang bernilai sama

    reducer: ee.Reducer.sum(),
    geometry: areaStudi, // batas wilayah perhitungan
    crs: "EPSG:4326", // penggunaan CRS WGS'84
    scale: 60, // scale 2 kali ukuran terkecil piksel karena menghindari memory limit
    maxPixels: 1e13, // pengesetan masksimal piksel

  })
  print(ee.Number(calculation.values().get(0)).divide(1e6))
}