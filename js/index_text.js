import { normalize } from 'https://cdn.skypack.dev/@geolonia/normalize-japanese-addresses'

const uploadPhotoButton = document.querySelector('#imgUpload');
  
uploadPhotoButton.addEventListener("change", function() {        
    let file = uploadPhotoButton.files[0]; //読み込んだファイルを格納
    const reader = new FileReader(); //ファイル読み込みのためのオブジェクトのインスタンス化
    reader.onload = () => { 
      // console.dir(file);        //onload 読み込みが終わったときに発火する
      // let photo = reader.result;  //読み込んだ画像ファイルを格納
      // localStorage.setItem('dataURLimg', photo); //localstorageに保存
    }
    reader.readAsDataURL(file);     //アップロードファイルのDataURL化
});

const imgButton = document.querySelector('#imgButton');
imgButton.addEventListener("click", function() { 
  const uploaded = document.querySelector('#uploaded');
  uploaded.src = localStorage.getItem('dataURLimg'); //localstorageから呼び出し
});

let selectedText=""
document.getElementById('judgement').addEventListener('change', function() {
  // 選択されたオプションのテキストを取得
  selectedText = this.options[this.selectedIndex].text;
  // 取得したテキストをHTMLに表示
  document.getElementById('selectedText').innerText = selectedText;
  this.value = "";
});

// IndexedDBの初期化
let db;
const request = indexedDB.open("myDatabase", 1);

request.onerror = (event) => {
    console.error("Database error:", event.target.errorCode);
};

request.onsuccess = (event) => {
    db = event.target.result;
    console.log("Database opened successfully");
};

request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore("myObjectStore", { keyPath: "key" });
    objectStore.createIndex("key", "key", { unique: true });
    console.log("Object store created successfully");
};

// 全データを表示する関数
function displayAllData() {
    const transaction = db.transaction(["myObjectStore"], "readonly");
    const objectStore = transaction.objectStore("myObjectStore");

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            addToList(cursor.value);
            cursor.continue();
        }
    };
}

    //1.Save クリックイベント
    $("#save").on("click", function() {
        const key = $("#title").val();
        const value_01 = selectedText;
        const value_02 = $("#Address").val();
        let value_03;
        let file = uploadPhotoButton.files[0]; // 読み込んだファイルを格納
        const reader = new FileReader(); // ファイル読み込みのためのオブジェクトのインスタンス化
    
        console.log('STEP 1')
        reader.onload = () => {
            console.dir(file); // onload 読み込みが終わったときに発火する
            let photo = reader.result;  //読み込んだ画像ファイルを格納
            value_03 = photo;
            const data = {
                key: key,
                value_01: value_01,
                value_02: value_02,
                value_03: value_03
            };
    
            // データを保存するためのトランザクションを作成
            const transaction = db.transaction(["myObjectStore"], "readwrite");
            const objectStore = transaction.objectStore("myObjectStore");
            console.log('STEP 2')
            const request = objectStore.add(data);
            request.onsuccess = () => {
                console.log("Data saved successfully");
            };
    
            request.onerror = (event) => {
                console.error("Error saving data:", event.target.errorCode);
            
        // reader.readAsDataURL(file); // アップロードファイルのDataURL化
    //   localStorage.setItem(key, value);
    // localStorage.setItem(key, JSON.stringify([value_01,value_02,value_03]));
  
      //テンプレートリテラル
      const html =`
      <li>
        <p> ${key}</p>
        <p>${JSON.stringify([value_01,value_02,value_03])}</p>
      `;
  
       $("#list").append(html);
       console.log(value_03,'value_03');
  
    //   // ボタンが押された後に中身を削除
      // $("#title").val() = "";
      // document.getElementById('judgement').value = "";
      // $("#judgement").val() = "";
      // $("#title").val() = "";
      // $("#Address").val() = "";
    };
};

      })
  
  
  
  
      //2.clear クリックイベント
      $("#clear").on("click", function(){
        // localStorage.clear();
        displayAllData();
        $("#list").empty();

      })
  
  
      //3.ページ読み込み：保存データ取得表示
      for (let i=0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        // const value = localStorage.getItem(key);
        const value = localStorage.getItem(key);
        const html =`
       <li>
        <p> ${key}</p>
        <p>${value}</p>
       `;
  
       $("#list").append(html);
      }

       //4.地図上にマークする
      //  let marker = [];
      //  let infoWindow = [];
      //  let markerData = []; // マーカーを立てる場所名・緯度・経度

       for(let i = 0; i < localStorage.length ;i++){
        const key = localStorage.key(i);
        // const value = localStorage.getItem(key);
        const value = JSON.parse(localStorage.getItem(key));
        console.log(value[1],"住所を表示");

        img_src[i] = value[2]; 
        console.log(img_src,"img_src")
        // let loc_map =LocationMap(value[1])
        // console.log([latitude, longitude] ,"緯度と経度を表示_02");
        // loc_map = { lat: latitude, lng: longitude};
        // initMap()
        // console.log(normalize(value[1]),"normalize");
      
        normalize(value[1]).then(result => {
          // map.flyTo([result.lat, result.lng]); // 住所の地点に移動
          // const marker = L.marker([result.lat, result.lng]); // ピンを作成
          // marker.bindPopup(address); // ピンをクリックすると住所が表示されるようにする
          // marker.addTo(map); // 地図にピンを立てる
          // console.log([result.lat, result.lng],"緯度と経度を表示_01")
          // console.log(typeof(result.lat),"latの型を確認");
          // console.log(typeof(result.lng),"lngの型を確認");
          // if (value[0] === "危険"){
          //   marker[i] = {name: key, lat: result.lat,lng:result.lng,icon:'img/red.png'}
          // }else if(value[0]=== "要注意"){
          //   marker[i] = {name: key, lat: result.lat,lng:result.lng,icon:'img/yellow.png'}
          // }else{
          //   marker[i] = {name: key, lat: result.lat,lng:result.lng,icon:'img/green.png'}
          // };
          // let loc_map = {lat: result.lat, lng: result.lng};
          // initMap(loc_map)
  
          // console.log(loc_map,"チェック 01")
          if (value[0] === "危険"){
          markerData[i] = {name: key, lat:result.lat, lng:result.lng,icon:'img/red.png'}
          }else if(value[0]=== "要注意"){
            markerData[i] = {name: key, lat:result.lat, lng:result.lng,icon:'img/yellow.png'}

          }else{
            markerData[i] = {name: key, lat:result.lat, lng:result.lng,icon:'img/green.png'}

          };
          


          if(i===localStorage.length-1){
          console.log(markerData,"markerData")
          initMap();
          }
  
          // return  {lat: latitude, lng: longitude}
  
      })


        // initMap(loc_map); 
        
       };
      
      // }