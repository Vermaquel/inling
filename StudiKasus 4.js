/*  
 *Copyright 2021, Kelly Developer, All rights reserved.
 *this code is created to perform the analysis the impact of Pre proscessing satelite Landsat 7 Surface Reflectance image
 *and to perfom monitoring surface temperature using satelite MODIS image
 *allowed for personal and educational use
 *not allowed for commercial purposes
 *Credits:
 *- Google LLC
 *- U.S. Geological Survey
 */

// -=-=-=-= Segmen baris kode ini adalah variabel-variabel import (di buat agar tidak terhapus dari import bagian atas) =-=-=-=- 
var indonesia = ee.FeatureCollection("users/amanahakhyar/IDN_adm1"),
    n1 = 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[97.02682130944663, 5.242304328803128],
                  [97.02381723534995, 5.24350093112914],
                  [97.02313058984214, 5.242133385426502],
                  [97.02347391259605, 5.240338477147137],
                  [97.02373140466148, 5.238885452381741],
                  [97.0247613729232, 5.238543563710578],
                  [97.02570551049644, 5.239056396647165],
                  [97.02682130944663, 5.238714508069536],
                  [97.02776544701987, 5.240423949086917]]]),
            {
              "LC": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.03926675927573, 5.237261479527969],
                  [97.03557603967124, 5.238885452381741],
                  [97.034631902098, 5.238629035895897],
                  [97.03325861108237, 5.238714508069536],
                  [97.03197115075523, 5.233928048347819],
                  [97.03291528832847, 5.232987846597295],
                  [97.03385942590171, 5.233928048347819],
                  [97.03703516137534, 5.232304062618448]]]),
            {
              "LC": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.01570623528892, 5.228842394759729],
                  [97.01716535699302, 5.231021965644006],
                  [97.01626413476401, 5.232304062618448],
                  [97.0150195897811, 5.234355412312681],
                  [97.01334589135581, 5.232004906892716],
                  [97.01347463738853, 5.229739866042945],
                  [97.01463335168296, 5.229355235650541]]]),
            {
              "LC": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.42512645938412, 5.195267727052289],
                  [97.42272320010677, 5.191164765580776],
                  [97.42624225833431, 5.18928423265068],
                  [97.42950382449642, 5.188942316970184],
                  [97.431048776889, 5.193985554461175],
                  [97.43336620547787, 5.19381459791862],
                  [97.43628444888607, 5.192532422371601],
                  [97.43868770816341, 5.196464419116901],
                  [97.4361986181976, 5.197404675573067],
                  [97.4321645758392, 5.198430408288105],
                  [97.42976131656185, 5.197490153363109],
                  [97.42778721072689, 5.1961225073303705]]]),
            {
              "LC": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.40581455447689, 5.19381459791862],
                  [97.4021238348724, 5.194071032715069],
                  [97.39791813113705, 5.194583901994977],
                  [97.39362659671322, 5.195524161257461],
                  [97.39027919986263, 5.195011292742745],
                  [97.39019336917416, 5.1934726846944015],
                  [97.39877643802181, 5.191763115791751],
                  [97.39851894595638, 5.1893697115418425],
                  [97.40203800418392, 5.188600401104376],
                  [97.40220966556087, 5.190224499816538],
                  [97.4079603216888, 5.190139021041186],
                  [97.41843166568295, 5.1893697115418425],
                  [97.41791668155209, 5.192959814510351]]]),
            {
              "LC": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.98231176430558, 4.458889142756359],
                  [97.97905019814347, 4.464536801167945],
                  [97.97184042031144, 4.466077064102526],
                  [97.96703390175675, 4.465734783729847],
                  [97.9613690763173, 4.467103904262265],
                  [97.96325735146378, 4.463509957415389],
                  [97.9668622403798, 4.461113983073437],
                  [97.97115377480362, 4.459744851368061],
                  [97.97355703408097, 4.456150868502829],
                  [97.97681860024308, 4.455808583503904],
                  [97.97630361611222, 4.458033433148074]]]),
            {
              "LC": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.98694662148331, 4.464365660642297],
                  [97.98728994423722, 4.471211250521014],
                  [97.98523000771378, 4.477201089204409],
                  [97.9804234891591, 4.480966105570655],
                  [97.9752736478505, 4.485073374038928],
                  [97.96875051552628, 4.488838349847121],
                  [97.96497396523331, 4.494999177449656],
                  [97.96033910805558, 4.500304292824057],
                  [97.95484594399308, 4.502015612119138],
                  [97.9533009916005, 4.491063099150973],
                  [97.95450262123917, 4.482164061258331],
                  [97.95673421913956, 4.476687676380415],
                  [97.97046712929581, 4.468815301333471],
                  [97.980766811913, 4.465563643483629]]]),
            {
              "LC": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.34374515578594, 3.997250737953274],
                  [97.34511844680156, 4.00016187726252],
                  [97.34340183303203, 4.002559278339243],
                  [97.34177104995098, 4.00315862751186],
                  [97.34048358962383, 4.000247498850361],
                  [97.33928195998516, 3.9981925782729633],
                  [97.33705036208477, 3.997165116052376],
                  [97.33859531447735, 3.995110187749055],
                  [97.3358487324461, 3.994853321349159],
                  [97.33413211867656, 3.993654610419728],
                  [97.33936779067363, 3.9930552542983864],
                  [97.33722202346172, 3.991342805826079],
                  [97.33996860549297, 3.9892878629454738],
                  [97.3442601399168, 3.989373485668138],
                  [97.34417430922832, 3.9915140508340428],
                  [97.34477512404766, 3.9931408766282397],
                  [97.34486095473613, 3.9943395883081156],
                  [97.345375938867, 3.9966513844592617]]]),
            {
              "LC": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.3246488684523, 3.057785927257329],
                  [97.32267476261734, 3.056071756158809],
                  [97.32177354038834, 3.057014550601927],
                  [97.32048608006119, 3.056543153483908],
                  [97.32379056156753, 3.052343424567643],
                  [97.32469178379654, 3.053029095716624],
                  [97.32379056156753, 3.0539718928318407],
                  [97.32482052982925, 3.0553432326127377],
                  [97.32627965153335, 3.053371931126998],
                  [97.3252067679274, 3.0562860276958856]]]),
            {
              "LC": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.34694697629922, 3.072535195916747],
                  [97.34480120908731, 3.068806921640626],
                  [97.34690406095498, 3.067478452950237],
                  [97.34771945249551, 3.0690211906296074],
                  [97.3475907064628, 3.070392511141572],
                  [97.3481486059379, 3.0713352929723534]]]),
            {
              "LC": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.0231032979611, 5.243319655607035],
                  [96.99580913902555, 5.251439398854605],
                  [96.9927192342404, 5.25075563507807],
                  [96.99057346702848, 5.246738507749494],
                  [96.99555164696012, 5.244345313216061],
                  [97.00130230308805, 5.242892297772627],
                  [97.00739628196989, 5.240670032319189],
                  [97.01735264183317, 5.237849453243582],
                  [97.02353245140348, 5.236652840092768]]]),
            {
              "LC": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.05885749113737, 5.2187086043629565],
                  [97.05284934294401, 5.2209309477985455],
                  [97.05465178740202, 5.224349922318342],
                  [97.04212050688444, 5.229991189486998],
                  [97.03945975554167, 5.2297347693545975],
                  [97.03920226347624, 5.227512457141127],
                  [97.04220633757292, 5.22640129807685],
                  [97.04529624235808, 5.223580654677387],
                  [97.04752784025847, 5.223580654677387],
                  [97.04933028471648, 5.2210164223887965],
                  [97.05207686674773, 5.218537654541764],
                  [97.05696921599089, 5.215631500455262]]]),
            {
              "LC": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.08085407483459, 5.208619401518189],
                  [97.08205570447326, 5.210286186618734],
                  [97.08093990552307, 5.21126916037466],
                  [97.07870830762268, 5.210713566701592],
                  [97.07742084729553, 5.209559639810742],
                  [97.07566131818176, 5.209474163660468],
                  [97.07330097424865, 5.210756304693888],
                  [97.06759323346496, 5.212337608364844],
                  [97.06343044507385, 5.215329253066619],
                  [97.06132759320617, 5.216696857324883],
                  [97.06111301648498, 5.218363620984914],
                  [97.05892433392883, 5.218534570853547],
                  [97.05729355084777, 5.21567115441055],
                  [97.06004013287902, 5.216354956539687],
                  [97.06162800061584, 5.215030089237915],
                  [97.06330169904113, 5.213577005756349],
                  [97.06480373608947, 5.212038443110782],
                  [97.0659624503839, 5.210157972537191],
                  [97.06604828107238, 5.2076791618190805],
                  [97.06883777844787, 5.207636423617542],
                  [97.0705543922174, 5.207636423617542],
                  [97.07360138165832, 5.20571320154062],
                  [97.07729210126281, 5.2048584342850654],
                  [97.07905163037658, 5.205328556419385]]]),
            {
              "LC": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.14775909650207, 5.166478190378246],
                  [97.15170730817199, 5.170410349264637],
                  [97.15342392194152, 5.176564983710243],
                  [97.15170730817199, 5.185283946631869],
                  [97.14741577374816, 5.193318962720339],
                  [97.14089264142395, 5.200157193620952],
                  [97.13763107526184, 5.194344702086731],
                  [97.13127960431457, 5.194344702086731],
                  [97.1271597312677, 5.1926351355488105],
                  [97.12921966779113, 5.188361198926498],
                  [97.13316787946106, 5.182206679338889],
                  [97.1326528953302, 5.179642278477351],
                  [97.13127960431457, 5.178274593763329],
                  [97.14003433453918, 5.170581312140683],
                  [97.14209427106262, 5.174171521872296],
                  [97.14535583722473, 5.174855369035748],
                  [97.14793075787902, 5.173145749741344],
                  [97.1465574668634, 5.170068423374052]]]),
            {
              "LC": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.12001618669854, 5.191445902300371],
                  [97.11778458879814, 5.18999276435804],
                  [97.11787041948662, 5.18306894349861],
                  [97.12104615496025, 5.179649744703235],
                  [97.12241944597588, 5.1733241781792],
                  [97.12671098039971, 5.174777354464161],
                  [97.12688264177666, 5.1664001747744805],
                  [97.13254746721611, 5.162040578255104],
                  [97.13246163652764, 5.166998548427073],
                  [97.13383492754326, 5.171187148169126],
                  [97.13366326616631, 5.1741789881627716],
                  [97.12962922380791, 5.1770853334676685],
                  [97.12516602800713, 5.177940138368586],
                  [97.12688264177666, 5.180846466386216],
                  [97.12302026079522, 5.1857188098351585]]]),
            {
              "LC": 2,
              "system:index": "14"
            })]),
    n2 = 
    /* color: #98ff00 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[96.8685504373385, 4.640615939644062],
                  [96.85859407747522, 4.618714975449121],
                  [96.8908664163424, 4.608790878194026],
                  [96.91970552767053, 4.5978399893870385],
                  [96.93858827913537, 4.5981822072122025],
                  [96.95300783479944, 4.599551076868841],
                  [96.95850099886194, 4.589626712297019],
                  [96.96845735872522, 4.586888932255428],
                  [96.97772707308069, 4.591680040436843],
                  [96.98356355989709, 4.586204485604872],
                  [96.99145998323694, 4.599208859701301],
                  [96.97498049104944, 4.608106452582497],
                  [96.96605409944787, 4.617003934097155],
                  [96.93755831087365, 4.630007744771248],
                  [96.90219606722131, 4.635825161679486],
                  [96.88914980257287, 4.632403157530039]]]),
            {
              "LC": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.15018215896035, 4.580184703675597],
                  [97.17696133376504, 4.660261165474086],
                  [97.14331570388222, 4.686266950278005],
                  [97.07465115310097, 4.696532125597969],
                  [97.03070584060097, 4.693794760272275],
                  [96.98676052810097, 4.689004345117975],
                  [96.97577419997597, 4.637676413622715],
                  [97.01285305739785, 4.618513027388866],
                  [97.0375722956791, 4.593873627406411],
                  [97.09387722731972, 4.58771364420042]]]),
            {
              "LC": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.72477105919637, 4.1050800221732855],
                  [96.75841668907918, 4.209860320188677],
                  [96.69936517540731, 4.263957066685214],
                  [96.55860284630575, 4.27559764248386],
                  [96.50504449669637, 4.246838252677443],
                  [96.54555658165731, 4.245468731128604],
                  [96.58126214806356, 4.2345124713216356],
                  [96.605294740837, 4.203012361671338],
                  [96.605294740837, 4.172880630946437],
                  [96.61559442345418, 4.094121804992624],
                  [96.67807916466512, 4.09823115403695],
                  [96.70485833946981, 4.123571672378251]]]),
            {
              "LC": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[97.72311322791323, 4.0606079161495625],
                  [97.6448356400226, 4.031840688098186],
                  [97.64071576697573, 3.9249821275760963],
                  [97.5507652054523, 3.9153915825500185],
                  [97.5569450150226, 3.8304419893851867],
                  [97.73409955603823, 3.8030370867920236]]]),
            {
              "LC": 1,
              "system:index": "3"
            })]),
    n0 = 
    /* color: #0b4a8b */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[95.9982220938912, 5.107326747943564],
                  [95.5422894767037, 5.265976191086002],
                  [95.47362492592245, 4.986945736144561],
                  [95.8993451407662, 4.647573116157965]]]),
            {
              "LC": 0,
              "system:index": "0"
            })]),
    imageVisParam = {"opacity":1,"bands":["classification"],"min":0,"max":2,"palette":["ffffff","ffffff","ffa500"]};

// -=-=-=-= Segmen baris kode ini adalah untuk menunjukkan batas wilayah praktikum =-=-=-=-
var areaStudi = indonesia.filter(ee.Filter.inList('NAME_1', ['Aceh'])); // variabel untuk shp area studi dari asset yang telah di upload
Map.addLayer(areaStudi,{color:"Blue" },"Area Studi", false); // Untuk menampilkan layer peta seluruh area studi
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
Map.addLayer(data3(daftarTanggal[0]).clip(areaStudi), {bands:['B3','B2','B1'], min:-520, max:3200}, 'Citra bersih awan', false); // menambahkan tampilan RGB True color pada layer peta

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
// print(ui.Thumbnail(rgbVis, gifParams)); // Menampilkan animasi GIF di console

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
  hAxis: {title: 'Tanggal'}, // Sumbu horizontal grafik
  pointSize: 3}); // Memberikan ukuran titik
print(LSTimeSeries); // Menampilkan grafik di console

// -=-=-=-= Segmen baris kode ini adalah untuk menampilkan UI GIf =-=-=-=-
var legend2 = ui.Panel({ // Membuat variabel yang memuat gif aplikasi
  style: { 
    position: 'bottom-left', // mengeset letak gif panel di kanan bawah
    padding: '8px 8px' // mengeset ukuran padding gif panel
  }});
  legend2.add(ui.Thumbnail(rgbVis, gifParams)); // menambahkan gif pada panel gif
Map.add(legend2); // menambahkan gif pada di peta

// -=-=-=-= Segmen baris kode ini adalah untuk menampilkan UI/UX Input titik dari user =-=-=-=-
var drawingTools = Map.drawingTools(); // membuat variabel untuk menggambar di tampilan peta
drawingTools.setShown(false); // menambahkan variabel gambar ke dalam peta namun belum ditampilkan
while (drawingTools.layers().length() > 0) { // membuat loop proses bila layer yang ada lebih dari satu
  var layer = drawingTools.layers().get(0); // membuat variabel untuk menyimpan alat gambar
  drawingTools.layers().remove(layer); // menambahkan alat gambar ke semua layer yang ada
}

var dummyGeometry = ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'}); // membuat geometry dummy untuk lokasi awal
drawingTools.layers().add(dummyGeometry); // memasukkan dummy geometri ke dalam alat gambar
function clearGeometry() { // membuat fungsi untuk menghapus geometry lama
  var layers = drawingTools.layers(); // membuat variabel untuk menyimpan alat gambar layer
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0)); // mengambil geometry lama dari layer lalu menghapusnya
}
function drawPoint() { // membuat fungsi untuk menggambar (meletakkan) point
  clearGeometry(); // mengahpus geometry lama
  drawingTools.setShape('point'); // mengeset bentuk pin point
  drawingTools.draw(); // menggambar pin point di tampilan peta
}
var symbol = {point: '!',}; // membuat simbol untuk point
var controlPanel = ui.Panel({ // membuat panel kontrol panel
  widgets: [ // membuat widget kontrol panel
    ui.Label('Pilih Titik.'), // menuliskan judul pada panel kontrol panel
    ui.Button({ // menambahkan tombol
    label: symbol.point + ' Point', // menambahkan label pada tombol
    onClick: drawPoint, // menambahkan callback fungsi untuk menggambar
    style: {stretch: 'horizontal'} // menambahkan arah pelebaran ui tombol
    }),
  ],
  style: {position: 'bottom-left'}, // menambahkan letak posisi kontrol panel pada layar peta di sebelah bawah kiri
  layout: null, // mengeset layer dengan nilai null
});
Map.add(controlPanel); // menambahkan panel kontrol panel di tampilan peta

// -=-=-=-= Segmen baris kode ini adalah untuk menampilkan Grafik Time Series UI titik dari user =-=-=-=-
var chartPanel = ui.Panel({  // membuat panel grafik dalam variabel
  style: {height: '250px', width: '450px', position: 'bottom-right', shown: false} // memberikan style untuk panel grafik dan meletakkannya di sebelah kanan bawah
});
Map.add(chartPanel); // menambakan panel grafik di tampilan peta 

function chartLSTTimeSeries() { // membuat fungsi untuk menampilkan grafik nilai LST terhadap tanggal di wilayah provinsi Aceh
  if (!chartPanel.style().get('shown')) { // fungsi untuk mengecek keterseiaan panel grafik di tampilan peta
    chartPanel.style().set('shown', true); // bila belum ada panel grafik di tampilan peta maka panel grafik akan di tampilkan terlebih dahulu
  }
  var aoi = drawingTools.layers().get(0).getEeObject();  // Get the drawn geometry; it will define the reduction region.
  drawingTools.setShape(null); // Set the drawing mode back to null; turns drawing off.
  var mapScale = Map.getScale(); // Reduction scale is based on map scale to avoid memory/timeout errors.
  var scale = mapScale > 5000 ? mapScale * 2 : 5000; // fungsi untuk mengecek skala map dan mengeset pada skala yang di inginkan
  var chart = ui.Chart.image  // Chart NDVI time series for the selected area of interest.
    .seriesByRegion({ // membuat series dari batasan yang telah ditetapkan
    imageCollection: LST, // memasukkan data koleksi LST ke dalam series
    regions: aoi, // memasukkan batas wilayah
    reducer: ee.Reducer.mean(), // mereduksi nilai LST yang diambil dengan mengambil nilai tengahnya
    band: 'LST1', // memilih band LST1 untuk ditampilkan
    scale: scale, // mengeset skala piksel
    xProperty: 'system:time_start' // mengeset waktu awal untuk label sumbu x
    }).setOptions({
      titlePostion: 'none', // tidak menentukan letak judul grafik
      legend: {position: 'none'}, // tidak menentukan letak legenda
      title: 'Nilai LST Kota Pilihan di Provinsi Aceh Tahun 2020', // Judul grafik
      vAxis: {title: 'LST (derajat Celcius)'}, // Sumbu vertikal grafik
      hAxis: {title: 'Tanggal'}, // Sumbu horizontal grafik
      series: {0: {color: '23cba7'}} // menentukan warna dari grafik
    });
  chartPanel.widgets().reset([chart]);  // Replace the existing chart in the chart panel with the new chart.
}

drawingTools.onDraw(ui.util.debounce(chartLSTTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartLSTTimeSeries, 500));

// -=-=-=-= Segmen baris kode ini adalah untuk menampilkan UI Judul Aplikasi =-=-=-=-
var legendTitle1 = ui.Label({ // Membuat variabel yang memuat judul aplikasi
  value: 'MONITORING SUHU LAYAK HUNI di PROVINSI ACEH ', // memberikan judul pada legenda
  style: {fontWeight: 'bold', // memberikan style font bold
  fontSize: '30px', // mengeset ukuran text 30 piksel
  margin: '0 0 4px 0', // mengeset lebar margin
  padding: '0' // mengeset ukuran padding
}});
Map.add(legendTitle1); // menambahkan Judul aplikasi

// -=-=-=-= Segmen baris kode ini adalah untuk menampilkan UI Legenda Aplikasi =-=-=-=-
var palette =['ffffff', 'ffa500']; // variabel untuk menyimpan pallet warna legenda
var names = ['Wilayah Tidak Terbangun','Wilayah Terbangun']; // variabel untuk menyimpan keterangan legenda

var legend = ui.Panel({ // Membuat variabel yang memuat legenda aplikasi
style: { 
  position: 'bottom-right', // mengeset letak legenda di kanan bawah
  padding: '8px 15px' // mengeset ukuran padding legenda
}});
var legendTitle = ui.Label({ // Membuat variabel yang membuat judul untuk legenda
  value: 'Keterangan', // menuliskan judul legenda
  style: {fontWeight: 'bold', // memberikan style font bold
    fontSize: '15px', // mengeset ukuran text 15 piksel
    margin: '0 0 4px 0', // mengeset lebar margin
    padding: '0' // mengeset ukuran padding
  }
});
legend.add(legendTitle); // menambahkan judul pada legenda
Map.add(legend); // menambahkan legenda pada di peta

var makeRow = function(color, name) { // membuat fungsi untuk menampilkan isi legenda
  var colorBox = ui.Label({ // membuat box yang mampu menyimpan warna
  style: {
    backgroundColor: '#' + color, // mengeset warna background
    padding: '8px', // mengeset ukuran padding
    margin: '0 0 4px 0' // mengeset ukuran margin
  }});
  var description = ui.Label({ // mengeset ui untuk deskripsi label legenda
    value: name, // menambahkan nama keterangan
    style: {margin: '0 0 4px 6px'} // menambahkan ukuran margin pada panel deskripsi
  });
  return ui.Panel({ // mengembalikan panel
    widgets: [colorBox, description], // widget setiap baris berisikan warna dan deskripsi
    layout: ui.Panel.Layout.Flow('horizontal') // mengeset arah tulisan
  })
};

for (var i = 0; i < 2; i++) { // fungsi loop untuk membuat baris box warna dan keterangan pada isi legenda
  legend.add(makeRow(palette[i], names[i])); // menambahkan baris box warna dan keterangan pada isi legenda
}
