import { useState } from "react";
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export default function GoalInput({ tuşaBasım, modalAktif, hedefModalKapat }) {
  const [girilenHedef, girilenHedefAksiyonu] = useState("");

  // onun fonksiyon örneği (avantajı: "hedefGirişi" aşağıda sarı gözüküyor = fonk yapısı)
  function hedefGirişi(input) {
    girilenHedefAksiyonu(input);
  }

  // bu fonksiyonu bu komponenti oluşturduğumuz için yazdık
  // girilen hedefi fonks. içine ekleyip app.js'e gönderebiliyoruz (code: follow_01)
  function yeniHedefEkleyici() {
    tuşaBasım(girilenHedef);
    girilenHedefAksiyonu("");
  }

  return (
    // "modalAktif", app.js içerisinden true veya false olarak gelecek
    <Modal visible={modalAktif} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Bu kurs için amacınız..."
          // "hedefGirişi" gibi fonksiyonları "hedefGirişi()" şeklinde yazarsak hemen çalıştırmaya çalışır ve problem olur
          onChangeText={hedefGirişi}
          // two-way binding again
          value={girilenHedef}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Kapatabiliriz"
              onPress={hedefModalKapat}
              color="#f31282"
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Hedef Ekle"
              onPress={yeniHedefEkleyici}
              color="#b180f0"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    // %20 (flex)
    flex: 1,
    justifyContent: "center",
    // "center" diyerek android için button içerisindeki text'in hizasını ortaladık
    // button için bir style property söz konusu değil
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    borderRadius: 6,
    color: "#120438",
    width: "100%",
    padding: 10,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: "40%",
    marginHorizontal: 8,
  },
});
