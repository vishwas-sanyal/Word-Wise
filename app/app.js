import React, { useState, useRef, useEffect } from 'react';
import { Text, StyleSheet, Alert, View, TouchableOpacity, TextInput, Animated, Keyboard } from 'react-native';
// import { FileSystem } from "expo-file-system";
import dictionary from "./../assets/dictionary.json";

export default function App() {

    // useEffect(() => {
    //     const loadJSON = async () => {
    //         try {
    //             const fileUri = FileSystem.documentDirectory + "./../assets/dictionary.json";
    //             const content = await FileSystem.File.readAsString(fileUri, { encoding: "utf8" });
    //             const dictionary = JSON.parse(content);
    //             // console.log("Dictionary loaded:", dictionary);
    //             return dictionary;
    //         } catch (error) {
    //             console.error("Error loading dictionary:", error);
    //         }
    //     };
    //     loadJSON();
    // }, []);

    const [text, setText] = useState("");
    const [result, setResult] = useState("");

    const lookup = (word) => {
        const idx = word[0].toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
        if (idx < 0 || idx > 25) return "Not found";
        return dictionary[idx][word.toLowerCase()] || "Not found";
    };

    const speak = () => {
        Alert.alert("button",
            "Hitting reset will wipe all the app's data on your phone. This cannot be undone!",
            [
                { text: 'Reset' },
                { text: 'Cancel' },
            ],
            { cancelable: false }
        )
    }

    // Animated value for result card position
    const resultY = useRef(new Animated.Value(300)).current; // start hidden (off-screen)

    const showResult = () => {
        Keyboard.dismiss();
        Animated.timing(resultY, {
            toValue: 70,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const hideResult = () => {
        Animated.timing(resultY, {
            toValue: 500, // slide back down
            duration: 400,
            useNativeDriver: true,
        }).start(() => {
            setResult("");
            setText("");
        }); // clear after animation
    };

    const handleSend = () => {
        if (!text.trim()) return;
        const meaning = dictionary[text.toLowerCase()];
        setResult(meaning ? meaning : "Word not found.");
        showResult();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Word Wise</Text>
            {/* Animated Result Card */}
            {/* <Animated.View style={[styles.resultBox, { transform: [{ translateY: resultY }] }]}>
                <Text style={styles.resultText}>{result}</Text>
            </Animated.View> */}
            {result !== "" && (
                <Animated.View
                    style={[
                        styles.resultBox,
                        {
                            transform: [{ translateY: resultY }],
                        },
                    ]}
                >
                    {/* Flexbox layout: Text + Cancel button */}
                    <View style={styles.resultContent}>
                        <Text style={styles.resultText}>{result}</Text>
                        <TouchableOpacity onPress={hideResult} style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            <TouchableOpacity onPress={speak} style={styles.btn}>
                <Text>MIC </Text>
            </TouchableOpacity>
            <Text style={styles.inOut}>User: Computer </Text>
            {/* <Animated.View style={[styles.textAni, { transform: [{ translateY: inputY }] }]}> */}
            <View style={styles.textCont}>
                <TextInput style={styles.text} onChangeText={setText} value={text} placeholder='Search???' onSubmitEditing={handleSend} />
            </View>
            {/* </Animated.View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, paddingTop: 50, alignItems: 'center', backgroundColor: '#252525',
    },
    title: {
        fontSize: 48, color: '#E6EAFF', fontWeight: 'bold',
    },
    btn: {
        backgroundColor: '#E6EAFF', padding: 100, borderRadius: 200, marginTop: 250, borderWidth: 30, borderColor: '#7d7f8aff',
    },
    inOut: {
        color: 'rgba(230, 234, 255, 1)', marginTop: 100, fontSize: 25,
    },
    textCont: {
        backgroundColor: "#E6EAFF", width: "100%", height: 90, marginTop: 100, borderRadius: 30, alignItems: 'center', justifyContent: "center",
    },
    text: {
        width: "95%", backgroundColor: '#D9D9D9', height: 60, borderRadius: 15, padding: 10, fontSize: 20, borderWidth: 2, borderColor: '#252525',
    },
    resultBox: {
        position: "absolute", top: 50, alignSelf: "center", backgroundColor: "#333", borderRadius: 15, width: "90%", shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 5, elevation: 5, padding: 12,
    },
    resultContent: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    },
    resultText: {
        color: "#fff", fontSize: 16, flex: 1,
    },
    cancelBtn: {
        marginLeft: 10, paddingHorizontal: 8, paddingVertical: 4,
    },
    cancelText: {
        color: "#ff5555", fontSize: 20, fontWeight: "bold",
    },
});