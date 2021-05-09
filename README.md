# Sonsuzluk ve Ötesine
Sonsuzluk ve Ötesine sonsuz uzayda size doğru gelen meteorlardan kaçarak olabildiğince yükselmeye çalıştığınız bir retro temalı 2D oyundur. Meteorlar size karşı tehlikeli olmakla kalmayıp kendilerine karşı da tehlike arz ederler. Belki meteorları birbirine çarptırarak yok etmek iyi bir taktik olabilir :). Proje HTML, JavaScript ve CSS yazılım teknolojilerini kullanarak yazılmıştır.

## Sonsuzluk ve Ötesine Oyununu Nasıl Çalıştırırım?
Sonsuzluk ve Ötesini çalıştırabilmek için iki yol var :
* Bu linke girerek oynamaya başlayabilirsiniz: [Sonsuza ve Ötesine](http://sonsuzaveotesine.eu5.org/)
* Sağ yukarıda bulunan Code kısmına tıklayarak projeyi ZIP dosyası olarak indirebilir ve index.html dosyasını tarayıcınızda açabilirsiniz.

## Sonsuzluk ve Ötesine Nasıl Oynanır?

* Oyun linkini ya da indirdiğiniz projedeki index.html dosyasını tarayıcınızda açtığınızda karışınıza başlangıç ekranı gelir. Oyuna başla tuşuna tıklayarak başlayabilirsiniz.
![baslangicekranı](https://user-images.githubusercontent.com/54938929/117588971-9bc6ac00-b12f-11eb-89d7-17db903582f7.png)
* Oyun ekranına geçtiğimizde mouseumuzun yerini roketimiz alıyor. Mouse'unuzun hareketleriyle roketi yönlendirebilirsiniz.
![oyunekranı](https://user-images.githubusercontent.com/54938929/117589199-dc72f500-b130-11eb-8963-16f4c013a100.png)
* Meteorlara çarpmadığınız sürece hayatta kalacaksınız ve yüksekliğiniz artacak. Eğer olur da bir meteor size çarparsa oyun biter ve oyun sonu ekranında son ulaştığınız yükseklik görüntülenir.
![endgame](https://user-images.githubusercontent.com/54938929/117589314-6622c280-b131-11eb-8371-ede71a1df81a.png)



## Sonsuzluk ve Ötesine Nasıl Çalışıyor
Sonsuzluk ve Ötesine oyunu çalışırken arka yüzünde oyun mantığını belirleyecek fonksiyonlar ve detaylı matematik işlemleri bulunduruyor.

* Aşağıdaki kod parçasında roketimizin hareket kodunu görebilirsiniz
```javascript

document.addEventListener("mousemove", (e) => {

    if (rocketX >= 0) {
        rocketX = e.x;
    }

    if (rocketX + rocketWidth > innerWidth) {
        rocketX = innerWidth - rocketWidth;
    }


    if (rocketY >= 0) {
        rocketY = e.y;
    }
    if (rocketY + rocketHeight > innerHeight) {
        rocketY = innerHeight - rocketHeight;
    }


})
```
* Oyunda her bir meteor oluşturulacağı zaman meteors dizisine yeni bir meteor objesi eklenir ve oyunun ana fonksiyonu olan "draw" fonksiyonunda her meteors arrayinin her elemanı taranarak ekrana çizilir.
  * Meteor sınıfı ve meteors dizisi:
```javascript
class MeteorW {
    constructor(x, y, velocity) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
    }

    draw() {

        ctx.drawImage(meteor2, this.x, this.y);
    }
    update() {
        this.draw()
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}
let meteors = [];
```
* Meteor oluşturmak için kullanacağımız ana fonksiyon spawnMeteor fonksiyonudur. Bu fonksiyon kendi içinde meteorların rastgele konumlarda oluşması, meteorların oluştukları anda mouse'unuzun konumu ve meteorun konumu arasındaki açıyı JavaScriptin kendi Math kütüphanesindeki "atan2" fonksiyonunu kullanarak hesaplaması ve bu açıya sinüs ve cosinüs işlemleri uygulayarak meteorun rokete doğru akıcı bir şekilde ivmelenmesini sağlaması gibi matematik işlemlerinin yanı sıra gizli bir seviye işlemi bulunması gibi özellikler bulunmaktadır.
  * Aşağıda meteorların rastgele oluşmasını sağlayan kod parçasını görebilirsiniz
    ```javascript
    if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? -50 : cvs.width + 50;
                y = Math.random() * cvs.height;
            } else {
                x = Math.random() * cvs.width;
                y = Math.random() < .5 ? -50 : cvs.height + 50
            }
    ```
   * Aşağıda ivme hesaplayan kod parçasını görebilirsiniz
     ```javascript
      const angle = Math.atan2(rocketY - y, rocketX - x);
            let velocity;
            if (score > 50000) {
                velocity = {
                    x: (Math.cos(angle)) * 2,
                    y: (Math.sin(angle)) * 2
                }
            }
            else {
                velocity = {
                    x: Math.cos(angle),
                    y: Math.sin(angle)

                }
            }
     ```
     
* Meteorlar ve Roket ya da Meteorlar kendi aralarında her an farklı konumlardan yaklaşarak çarpışabilecekleri için sadece bir eksenden çarpışma kontrol etmek anlamsız olurdu. Bu yüzden Separating Axis Theorem (bkz: [Collision Detection Using the Separating Axis Theorem](https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169)) kullanılmıştır. Bu teoremin uygulanmasında MDN Web Docs'un şu makalesinden faydalanılmıştır:[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
   * Aşağıda Meteor ve Roket'in çarpışmasında kullanılan kod parçasını görebilirsiniz
      ```javascript
      if (meteor.x < rocketX + rocketWidth + 5 &&
            meteor.x + 50 > rocketX + 15 &&
            meteor.y < rocketY + rocketHeight &&
            meteor.y + 50 > rocketY
        ) {
            meteors.splice(meteorIndex, 1);



            localStorage.setItem("score", score.toString());


            score = 0;
            bgMusic.src = "";
            gameover.play();
            cancelAnimationFrame(animationID);
            setTimeout(() => {
                location.reload();
            }, 1800)


        } // Seperating Axis Teorem
      ```
    * Aşağıda Meteorların kendi aralarında çarpışma hesaplamasında kullanılan fonks,yonu görebilirsiniz
       ```javascript
            const meteorCollision = (a, aIndex,) => {
        meteors.forEach((b, bIndex) => {
              if (a !== undefined && b !== undefined && a !== b) {
                  if (a.x < b.x + 50 &&
                      a.x + 50 > b.x &&
                      a.y < b.y + 50 &&
                      a.y + 50 > b.y) {
                      meteors.splice(aIndex, 1);
                      meteors.splice(bIndex, 1);
                      meteorexp.play();
                  }
                }
          })


        }
       ```
## Projeyi Geliştirenler
 * Hakan AKDOĞAN
   * [LinkedIn](https://www.linkedin.com/in/hakan-akdogan/)

## Lisans
    MIT License
    Copyright (c) 2021 Hakan Akdoğan
 
