import { useNavigation } from "@react-navigation/native";
import { Alert, FlatList, Image, Modal, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import EditIcon from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import { Cup } from "../model/cup";
import { addItem } from "../storage/database";
import { auth } from "../../firebase";



export default function AddCup() {
    const navigation = useNavigation();
    const [selectedCupIcon, setSelectedCupIcon] = useState("https://firebasestorage.googleapis.com/v0/b/waterapp-cd21d.firebasestorage.app/o/waterCupImage%2F3.png?alt=media&token=3102e574-0235-44c4-8232-ed91354b21f4"); // Varsayılan bardak 200ml
    const [selectedCupml, setSelectedCupml] = useState(200); // Varsayılan bardak 200ml
    const [cupName, setCupName] = useState("");
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [changeMl, setChangeMl] = useState(selectedCupml);

    const cupIcon = [
        { id: 1, name: "Water", ml: 100, uri: 'https://firebasestorage.googleapis.com/v0/b/waterapp-cd21d.firebasestorage.app/o/waterCupImage%2F1.png?alt=media&token=12c38275-dc31-4640-a752-2cb157bc5d9c' },
        { id: 2, name: "Water", ml: 125, uri: 'https://firebasestorage.googleapis.com/v0/b/waterapp-cd21d.firebasestorage.app/o/waterCupImage%2F6.png?alt=media&token=03dbd746-864a-4f86-9624-342c56855a83' },
        { id: 3, name: "Water", ml: 150, uri: "https://firebasestorage.googleapis.com/v0/b/waterapp-cd21d.firebasestorage.app/o/waterCupImage%2F2.png?alt=media&token=d55dcb01-a6af-4473-b4bb-f98512236cfa" },
        { id: 4, name: "Water", ml: 200, uri: "https://firebasestorage.googleapis.com/v0/b/waterapp-cd21d.firebasestorage.app/o/waterCupImage%2F3.png?alt=media&token=3102e574-0235-44c4-8232-ed91354b21f4" },
        { id: 5, name: "Water", ml: 250, uri: "https://firebasestorage.googleapis.com/v0/b/waterapp-cd21d.firebasestorage.app/o/waterCupImage%2F8.png?alt=media&token=d419fd90-ff62-4ebb-a679-61791d370641" },
        { id: 6, name: "Water", ml: 300, uri: "https://firebasestorage.googleapis.com/v0/b/waterapp-cd21d.firebasestorage.app/o/waterCupImage%2F9.png?alt=media&token=939329a7-eaa8-4504-8b23-6fbdce4fd1eb" },
        { id: 7, name: "Water", ml: 400, uri: "https://firebasestorage.googleapis.com/v0/b/waterapp-cd21d.firebasestorage.app/o/waterCupImage%2F5.png?alt=media&token=e1013965-9d6b-4588-a99e-094bcfbc9ba0" },
        { id: 8, name: "Water", ml: 500, uri: "https://firebasestorage.googleapis.com/v0/b/waterapp-cd21d.firebasestorage.app/o/waterCupImage%2F10.png?alt=media&token=fb2f0d7c-be8a-4273-a52c-df172e933d2f" },
    ];

    const addCupFunction = async () => {
        if (!cupName || !selectedCupml) {
            Alert.alert("Tüm alanları doldurunuz !!!");
            return;
        }

        try {
            const userId = auth.currentUser.uid;
            if (!userId) {
                throw new Error("User is not logged in.");
            }

            // Assuming Cup is a function that returns an object.
            const cupObj = new Cup(userId, selectedCupIcon, selectedCupml, cupName);

            await addItem("cups", cupObj);

            Alert.alert("Başarılı");
            navigation.navigate("CupSelection");

        } catch (error) {
            console.error("Error in addCupFunction:", error); // More detailed error logging
            Alert.alert("Bir hata oluştu!", error.message || "Beklenmedik bir hata.");
        }
    };



    return (
        <SafeAreaView className="h-full flex-1">
            <View className={`w-full flex-row items-center justify-between  px-5 ${Platform.OS === 'android' ? 'mt-8 p-2' : ''}`}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back-circle-outline" size={45} />
                </TouchableOpacity>

            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View className="flex-row items-center justify-center">

                    <TextInput
                        className="text-lg  font-bold mb-5 border-b-2 rounded-xl h-[45] w-[260]"
                        placeholder="Bardak İsmi Giriniz🖋 "
                        onChangeText={setCupName}
                    />
                </View>
                <View style={styles.imageBorder}>
                    <Image
                        style={{ width: 80, height: 80, alignItems: "center", justifyContent: "center" }}
                        source={{
                            uri: selectedCupIcon
                        }}
                    />
                </View>
                <TouchableOpacity onPress={() => { setEditModalVisible(true); }}
                    className="flex-row p-5 w-[150] items-center justify-center border-2 border-blue-400 bg-blue-400 rounded-3xl mt-5">
                    <Text className="text-lg font-bold text-white">{selectedCupml} ml </Text>
                    <EditIcon name="edit" size={25} color={"white"} />
                </TouchableOpacity>

            </View>
            <View className="w-full flex-row items-center justify-center mt-4">
                <Text className="text-lg text-gray-400 mr-1 ml-1">Bardak İkonunu Seç</Text>
                <View className="border-b-2 border-gray-400 w-[55%]" />
            </View>
            <FlatList
                data={cupIcon}
                keyExtractor={(item) => item.id.toString()}
                numColumns={4}
                renderItem={({ item }) => (

                    <TouchableOpacity
                        onPress={() => { setSelectedCupIcon(item.uri); setSelectedCupml(item.ml); }}
                        className="w-[80] h-[80] p-3 border rounded-full m-2 bg-[#E5F3F0] items-center justify-center">
                        <Image
                            source={{ uri: item.uri }}
                            style={{ width: 30, height: 30, marginBottom: 5, color: "bg-[#E5F3F0]" }}
                            resizeMode="contain" />

                    </TouchableOpacity>

                )}>

            </FlatList>

            <View className="justify-end items-center mb-5">
                <TouchableOpacity
                    onPress={() => { addCupFunction() }}


                    className="justify-center items-center rounded-xl w-[85%] bg-blue-400 h-[50] ">
                    <Text className="text-white font-bold text-xl">Ekle</Text>
                </TouchableOpacity>
            </View>


            <Modal
                transparent={true}  // Arka planı saydam yapar
                animationType="slide"
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}
            >
                {/* Dışarı tıklanınca modalı kapat */}
                <TouchableWithoutFeedback onPress={() => setEditModalVisible(false)}>
                    <View className="flex-1 justify-center items-center bg-black/50">

                        {/* İçeriğe tıklanınca kapanmasını engellemek için */}
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View className="bg-white p-5 rounded-xl w-[85%] items-center">
                                <TextInput
                                    className="text-lg font-bold mb-5 border-b-2 rounded-xl h-[45] w-full p-2"
                                    placeholder="ml belirleyiniz🖋 "
                                    onChangeText={setChangeMl}
                                    keyboardType="number-pad"
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedCupml(parseInt(changeMl));
                                        setEditModalVisible(false);
                                    }}
                                    className="justify-center items-center rounded-xl w-full bg-blue-400 h-[50]"
                                >
                                    <Text className="text-white font-bold">Tamam</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </TouchableWithoutFeedback>

            </Modal>


        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    imageBorder: {
        width: 150,
        height: 150,
        borderRadius: 90,
        borderWidth: 2,
        borderColor: "gray",
        alignItems: "center",
        justifyContent: "center",
    },
});

