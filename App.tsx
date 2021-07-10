import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {
    const [selectedImage, setSelectedImage] = React.useState(null);

    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });
    };

    let openShareDialogAsync = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            alert(`Uh oh, sharing isn't available on your platform`);
            return;
        }

        await Sharing.shareAsync(selectedImage.localUri);
    }; 

    if (selectedImage !== null) {
        return (
            <View style={styles.container}>
                <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
                />
                <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                <Text style={styles.buttonText}>Share this photo</Text>
                </TouchableOpacity>
                </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
        souce={{ uri: "https://i.imgur.com/TkIrScD.png" }}
        style={{width: 305, height:159}}
            />
            <Text style={{color: 'red', fontSize: 24}}>dev nowでぶなう</Text>
            <StatusBar />
            <TouchableOpacity
        onPress={openImagePickerAsync}
        style={{ backgroundColor: "blue" }}
            >
            <Text style={{ fontSize: 20, color: "#fff" }}>Pick a photo</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
    },
});
