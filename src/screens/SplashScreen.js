import { View, Text, Image} from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export const SplashScreen = ({})=>{
    
    const navigation = useNavigation()

    useEffect(()=>{
        const timeout = setTimeout(navigateToLogin,2000);
        return() => clearTimeout(timeout);
    },[])

    const navigateToLogin = () => {
        navigation.navigate('Login');
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <TouchableOpacity
                style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}
                onPress={goToLoginScreen}
            > 
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
                <Image source={require('../assets/logo01.png')} style={{ width: 500, height: 500 }}/>
            </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}