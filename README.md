# ①課題番号-プロダクト名

課題番号4　kadai03-memo "応急危険度判定メモアプリ"

## ②課題内容（どんな作品か）
- 大地震発生後に行われる「応急危険度判定」の調査結果をLocalStorageに登録し、　  
  Google Map上に結果を登録するようにする
- 「判定結果を選んでください」というところから、「危険」「要注意」「調査済」の３つのいずれかを選ぶ
- 建物名称を記入
- 建物の、住所を記入
-　被害状況が変わる写真を1枚選択する
- 「セーブ」を押すと、Local Storageに、keyとして「建物名称」が、
　　valueとして、JASONを用いた配列で１つ目に、判定結果を、２つ目に住所が登録
　　３つ目に画像のURLが登録
- リロードすると、登録されているkey valueのセットを読み込み
　画面一番下に羅列される。
　また、valueの２つ目の要素である住所から、緯度と経度を読み込み、
   valueの1つ目の要素である判定結果に基づいた、アイコンを画面中央の
   Google Map上に表示させるようにする。
- Google Map上に表示されたアイコンをクリックすると、「建物名称」と登録された「写真」が表示される。

## ③DEMO

デプロイしている場合はURLを記入（任意）
https://0800891.github.io/kadai03_memo/

## ④作ったアプリケーション用のIDまたはPasswordがある場合
IDやPWはないです
- ID: 
- PW: 

## ⑤工夫した点・こだわった点
- Google Map APIを用いた
- 実際の調査では、「危険」「要注意」「調査済」の判定結果に応じて、赤、黄、緑の張紙を建物に貼り付けられる。このアナログの行為と同時に、携帯などで、登録することで、
調査員の間で、どの建物が調査済みで、その結果がどうであったのかが、簡単に共有できる。
　
## ⑥難しかった点・次回トライしたいこと(又は機能)
- クリックすると、建物の名称と写真しか記載されていないが、
　ここに調査結果の被害の詳細を登録できるようにしたい。
  
## ⑦質問・疑問・感想、シェアしたいこと等なんでも

- [質問]今回GithubにGoogle Map API Keyを載せて公開状態になってしまっているが、実際はセキュリティー上の課題があると思われるので、どのような対策をするべきか、
教えていただきたい。（例えば、デプロイしても、Google MAP API Keyは見れない状態になっている等）

- [感想]
- [参考記事]
  - 1. [URLをここに記入]
  - 2. [URLをここに記入]
