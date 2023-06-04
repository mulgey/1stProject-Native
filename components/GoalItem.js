import { Pressable, StyleSheet, Text, View } from "react-native";

export default function GoalItem({ veri, hedefÖğesiSilme, id }) {
  return (
    // bind fonksiyonunda ilk argüman "this" keyword ü belirler (bizim durumumuzda önemsiz)
    // ikinci parametre fonksiyonda kabul edilecek ilk parametredir. app.js'ten aldığımız öğe ID'sini buraya taşıdık
    <View style={styles.hedefÖğesi}>
      <Pressable
        // ripple'ın ideal gözükmesi için view'ı dışarı çektik, pressable içeride kaldı
        android_ripple={{ color: "#dddddd" }}
        onPress={hedefÖğesiSilme.bind(this, id)}
        // iOS için ripple effect. pressable içerisindeki pressed property'i kullandık. dokundukça belirttiğimiz style uygulanır
        style={({ pressed }) => pressed && styles.iOSPressed}
      >
        <Text style={styles.hedefMetni}>{veri}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  hedefÖğesi: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#c840e3",
  },
  iOSPressed: {
    opacity: 0.5,
  },
  hedefMetni: {
    // ripple effect'in iyi çalışması için padding'i hedefÖğesi'nden hedefMetni'ne taşıdık
    padding: 8,
    color: "white",
  },
});
