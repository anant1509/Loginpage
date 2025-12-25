import { useState } from 'react';
import { Alert, StyleSheet, ToastAndroid, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, database } from '../firebaseConfig';
import { ref, set } from 'firebase/database';
import Animated, { SlideInRight } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

const Register = () => {
    const router = useRouter();
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [conformpassword, setconformpassword] = useState('')

    const handleRegister = async () => {
        if (!username || !email || !password || !conformpassword) {
            return Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please fill in all fields ✍️',
                position: 'top',
                text1Style: {
                    color: 'red',
                    fontSize: 14
                },
                text2Style: {
                    color: 'black',
                    fontSize: 12
                },
                visibilityTime: 2000,
                autoHide: true,
            });
        }
        try {
            const userdata = ref(database, 'Users' + Date.now())
            await set(userdata, {
                username,
                email,
                password,
                conformpassword
            })
        } catch (err) {
            Alert.alert("Error", "Something Went Wrong")
            return
        }
        await createUserWithEmailAndPassword(auth, email, password)
            .then((usercredintial) => {
                const user = usercredintial.user;
                sendEmailVerification(user)
                    .then(() => {
                        Alert.alert("User Register Successfully", "Email Verification Sent To your email")
                        router.push('/Login')
                    }).catch((err) => {
                        Alert.alert("Error", "Something Went Wrong")
                    })
                setusername("")
                setemail("")
                setpassword("")
                setconformpassword("")
            }).catch((err) => {
                Alert.alert("Enter Valid Credentials")
            })
    }
    
    return (
        <Animated.View
            entering={SlideInRight.duration(700)}
            style={styles.container}>
            <TouchableOpacity onPress={() => router.push('/')} style={styles.backbtn}>
                <Ionicons name="chevron-back" size={20} color="black" />
            </TouchableOpacity>
            <View style={styles.heading}>
                <Text style={styles.headtext}>Hello! Register to get started  </Text>
            </View>
            <View style={styles.inputcontainer}>
                <TextInput style={styles.inputtxt}
                    placeholder='Username'
                    placeholderTextColor='#928e8ef7'
                    value={username}
                    onChangeText={setusername}
                />
                <TextInput style={styles.inputtxt}
                    placeholder='Email'
                    placeholderTextColor='#928e8ef7'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setemail}
                />
                <TextInput style={styles.inputtxt}
                    placeholder='Password'
                    placeholderTextColor='#928e8ef7'
                    secureTextEntry
                    value={password}
                    onChangeText={setpassword}
                />
                <TextInput style={styles.inputtxt}
                    placeholder='Conform Password'
                    placeholderTextColor='#928e8ef7'
                    secureTextEntry
                    value={conformpassword}
                    onChangeText={setconformpassword}
                />
                <Text style={{ marginTop: 20, marginLeft: 10, color: "#333", textAlign: 'right' }}>Forgot Password?</Text>
                <View style={styles.btncontainer}>
                    <TouchableOpacity onPress={handleRegister} style={styles.loginbtn}>
                        <Text style={styles.loginbtntxt}>Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.secondcontainer}>
                    <Text style={styles.scontainertxt}>Already have an account? <Text onPress={() => router.push('/Login')} style={{ color: "#009fd1", fontWeight: '600' }}>Login Now</Text></Text>
                </View>
            </View>
        </Animated.View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 10
    },
    backbtn: {
        backgroundColor: "#fff",
        width: 39,
        height: 39,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        marginTop: 40,
        marginLeft: 10
    },
    heading: {
        marginTop: 20,
        marginLeft: 10
    },
    headtext: {
        fontSize: 30,
        fontWeight: "bold"
    },
    inputcontainer: {
        marginTop: 15,
        margin: 10
    },
    inputtxt: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 18,
        marginTop: 14,
        backgroundColor: "#f5f5f5",
        color: "#000"
    },
    btncontainer: {
        marginTop: 10,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    loginbtn: {
        backgroundColor: "#000",
        width: 310,
        height: 45,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },
    loginbtntxt: {
        color: "#fff",
        fontSize: 16,
    },
    secondcontainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    scontainertxt: {
        fontSize: 14,
        color: "#333"
    }
})