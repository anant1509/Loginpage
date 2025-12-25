import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import Toast from 'react-native-toast-message';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Animated, { SlideInLeft, SlideInRight, } from 'react-native-reanimated';


const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [errormsg, seterrormsg] = useState(null)
    const router = useRouter();


    const handleverifyemail = (setverify) => (value) => {
        setverify(value)
        if (errormsg) {
            seterrormsg(null)
        }
    }

    const handlelogin = async () => {
        seterrormsg(null)
        if (!email || !password) {
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
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
                if (user.emailVerified) {
                    Alert.alert("Success!", "Login Successfully")
                    router.push('/')
                }
                else {
                    seterrormsg("Please verify your email")
                }
                setemail('')
                setpassword('')
            }).catch((err) => {
                const error = err.message;
                seterrormsg(error)
            })
    }

    return (
        <Animated.View
            entering={SlideInRight.duration(500)}
            style={styles.container}>
            <TouchableOpacity onPress={() => router.push('/Registartion')} style={styles.backbtn}>
                <Ionicons name="chevron-back" size={20} color="black" />
            </TouchableOpacity>
            <View style={styles.heading}>
                <Text style={styles.headtext}>Welcome Back! Glad to see you, Again </Text>
            </View>
            <View style={styles.inputcontainer}>
                <TextInput style={styles.inputtxt}
                    placeholder='Enter your email'
                    placeholderTextColor='#928e8ef7'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={handleverifyemail(setemail)}
                />
                <TextInput style={styles.inputtxt}
                    placeholder='Enter your password'
                    placeholderTextColor='#928e8ef7'
                    secureTextEntry
                    value={password}
                    onChangeText={handleverifyemail(setpassword)}
                />
                <Text style={{ marginTop: 20, marginLeft: 10, color: "#333", textAlign: 'right' }}>Forgot Password?</Text>
                {
                    errormsg && <Text style={{ color: 'red', textAlign: 'center', fontSize: 18, margin: 10 }}>{errormsg}</Text>
                }
                <View style={styles.btncontainer}>
                    <TouchableOpacity onPress={handlelogin} style={styles.loginbtn}>
                        <Text style={styles.loginbtntxt}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.secondcontainer}>
                    <Text style={styles.scontainertxt}>Don't have an account? <Text onPress={() => router.push('/Registartion')} style={{ color: "#009fd1", fontWeight: '600' }}>Register Now</Text></Text>
                </View>
            </View>
        </Animated.View>
    )
}

export default Login

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
        marginTop: 20,
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