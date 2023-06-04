import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";

// components
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [modalAktif, modalAktifAksiyonu] = useState(false);
  const [kursHedefleri, kursHedefleriAksiyonu] = useState([]);

  function hedefİçinModalAç() {
    modalAktifAksiyonu(true);
  }

  function hedefModalKapat() {
    modalAktifAksiyonu(false);
  }

  // benim önceki kurstan kullandığım yapı (fonks ismi aşağıda sarı çıkmadı)
  // GoalInput.js içerisindeki yeni fonksiyonudaki state'i (girilenHedef) burada kullandık (follow_01)
  tuşaBasım = (girilenHedef) => {
    // aşağıdaki de olur fakat daha iyisini kullandık
    // kursHedefleriAksiyonu([...kursHedefleri, girilenHedef]);
    kursHedefleriAksiyonu((mevcutHedeflerBütünü) => [
      ...mevcutHedeflerBütünü,
      // FlatList buradaki key prop'u otomatik olarak alacağı için object'e çevirerek ekledik
      { içerikYazısı: girilenHedef, id: Math.random().toString() },
    ]);
    // iş bittikten sonra modalı kapat
    hedefModalKapat();
  };

  // buradaki ID prop olarak GoalItem.js e gitti ve oradan bind fonk. içerisinde parametre olarak geri döndü
  function hedefÖğesiSilme(id) {
    kursHedefleriAksiyonu((mevcutHedeflerBütünü) => {
      // eğer eşleşme yoksa "true" dönecek ve içeride kalacak
      // false geldiğinde eşleşmişi bulmuş olacak ve onu dışarı çıkaracak
      return mevcutHedeflerBütünü.filter((tekilHedef) => tekilHedef.id !== id);
    });
  }

  return (
    <>
      {/* saat, batarya vs açık renk gözüksün dedik */}
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Yeni Hedef Ekle"
          color="#a065ec"
          onPress={hedefİçinModalAç}
        />
        <GoalInput
          modalAktif={modalAktif}
          tuşaBasım={tuşaBasım}
          hedefModalKapat={hedefModalKapat}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            // veriyi bu şekilde aldık
            data={kursHedefleri}
            // map fonk. yerine buradan nasıl render leyeceğini anlattık
            // key verisi sağlamadık, FlatList key prop'u object içerisinden otomatik olarak çekti
            renderItem={(herBirÖğe) => {
              // "item" komutu burada öğenin içindekilerin hepsini getirir, basic komut
              return (
                <GoalItem
                  veri={herBirÖğe.item.içerikYazısı}
                  // o öğenin ID'sini aldık ve GoalItem.js'e gönderdik
                  id={herBirÖğe.item.id}
                  // fonksiyon içerisine mevcut öğenin ID'sini yerleştiriyoruz ekstradan
                  hedefÖğesiSilme={hedefÖğesiSilme}
                  // üstteki fonksiyonun alternatifi ise aşağıda. bind() ve id prop kullanmadan tek satırda hallediyoruz
                  // hedefÖğesiSilme={() => hedefÖğesiSilme(herBirÖğe.item.id)}
                />
              );
            }}
            // yukarıda "id" yerine "key" kullansaydık keyExtractor kullanıp object içerisindeki "id" değerini convert lemeye gerek kalmazdı
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
          {/* ScrollView kullanacak isek en ideal yer. Herşeyi wrap'larsak veya sadece üstteki View'ı, flex ayarlarını bozuyor */}
          {/* Bu kısmı FlatList ile güncelledik. 10.000 item olursa performans kaybı olur. Aşağı çektikçe yüklesin, başta yüklemesin. Article'lar için ScrollView daha uygun, uzun li'ler için FlatList
        <ScrollView>
          {kursHedefleri.map((herBirHedef) => (
            // borderRadius iOS'te text'lere uygulanamadığı için her bir Text'i View içine wrap layıp style'ı oraya ekledik
            // text için "color" property'si, view üzerinde çalışmayacağı için Text öğesine özel style prop (hedefMetni) oluşturduk
            <View key={herBirHedef} style={styles.hedefÖğesi}>
              <Text style={styles.hedefMetni}>{herBirHedef}</Text>
            </View>
          ))}
        </ScrollView>
        */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    // flex: 1 ekleyerek main container'ın bütün ekranı doldurması gerektiğini söylemiş olduk
    // aksi taktirde aşağıdaki container'lar için verdiğimiz %20 / %80 oranı çalışmayacaktı
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    // aşağıdaki kodu kesip app.json içerisine yerleştirdik, default olması için
    // backgroundColor: "#1e085a",
  },
  // inputContainer (%20 flex), textInput, hedefÖğesi, hedefMetni (taşındı)
  goalsContainer: {
    // (%80 flex)
    flex: 4,
  },
});
