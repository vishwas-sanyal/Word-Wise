import React, { useState } from 'react';
import { Text, StyleSheet, Alert, View, TouchableOpacity, TextInput, Animated } from 'react-native';


export default function App() {

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

    // Animations
    const inputY = useRef(new Animated.Value(0)).current;
    const resultOpacity = useRef(new Animated.Value(0)).current;

    const handleSend = () => {
        // Animate text box upwards
        Animated.timing(inputY, {
            toValue: -200, // adjust how far up you want it
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            // Show result after animation finishes
            setResult(`Result for: ${text}`);
            Animated.timing(resultOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });
    };

    const [text, setText] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Word Wise</Text>
            <TouchableOpacity onPress={speak} style={styles.btn}>
                <Text>MIC </Text>
            </TouchableOpacity>
            <Text style={styles.inOut}>User: Computer </Text>
            <Animated.View style={[styles.textAni, { transform: [{ translateY: inputY }] }]}>
                <View style={styles.textCont}>
                    <TextInput style={styles.text} onChangeText={setText} value={text} placeholder='Search???' onSubmitEditing={handleSend} />
                </View>
            </Animated.View>
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
        backgroundColor: "#E6EAFF", width: "100%", height: 90, marginTop: 120, borderRadius: 30, alignItems: 'center', justifyContent: "center",
    },
    text: {
        width: "95%", backgroundColor: '#D9D9D9', height: 60, borderRadius: 15, padding: 10, fontSize: 20, borderWidth: 2, borderColor: '#252525',
    },
});