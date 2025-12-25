import { TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { Text, View, Image } from "react-native";
import { StyleSheet } from "react-native";
import Animated, { FadeIn, } from 'react-native-reanimated';


export default function Index() {
  const router = useRouter();
  return (
    <Animated.View
      entering={FadeIn.duration(1500)}
      style={styles.container}>
      <Image source={require('../assets/images/bgmain.jpg')} style={styles.img} />
      <View style={styles.heading}>
        <View style={styles.sloganContainer}>
          <Text style={styles.sloganTitle}>Welcome Back</Text>
          <Text style={styles.sloganSub}>Your journey continues here.</Text>
        </View>
        <Animated.View
          entering={FadeIn.duration(1500)}
          style={styles.btnscontainer}>
          <TouchableOpacity style={styles.btns1} onPress={() => router.push('/Registartion')}>
            <Text style={styles.btntxt}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btns2} onPress={() => router.push('/Login')}>
            <Text style={[styles.btntxt1]}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    // marginTop: 40
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  heading: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
    zIndex: 2,
  },
  sloganContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  sloganTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  sloganSub: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 8,
  },
  btnscontainer: {
    width: '100%',
    alignItems: 'center',
  },
  btns1: {
    backgroundColor: "#000",
    width: 310,
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "60%"
  },
  btns2: {
    backgroundColor: "#fff",
    width: 310,
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  btntxt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: '600'
  },
  btntxt1: {
    color: "#000",
    fontSize: 16,
    fontWeight: '600'
  },
  headtext: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff"
  }
})