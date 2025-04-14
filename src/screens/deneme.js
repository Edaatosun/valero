import { View, Text, Image } from 'react-native';

export default function Deneme() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
  source={{ uri: 'https://placehold.co/600x400.png' }}
  style={{ width: 200, height: 200 }}
  onError={() => alert("Resim yüklenemedi")}
/>

<Image
  source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
  style={{ width: 100, height: 100 }}
/>
      <Text>bu text çalışıyor</Text>
    </View>
  );
}