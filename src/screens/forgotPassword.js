import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Hata", "Lütfen e-posta adresinizi girin.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Başarılı", "Şifre sıfırlama e-postası gönderildi.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Şifre sıfırlama hatası:", error);
      Alert.alert("Hata", error.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-4">Şifremi Unuttum</Text>

      <TextInput
        placeholder="E-posta adresinizi girin"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="border border-gray-400 w-full p-3 rounded-md mb-4"
      />

      <TouchableOpacity
        onPress={handlePasswordReset}
        className="bg-blue-500 w-full p-3 rounded-md"
      >
        <Text className="text-white text-center font-bold">Şifre Sıfırlama E-postası Gönder</Text>
      </TouchableOpacity>
    </View>
  );
}
