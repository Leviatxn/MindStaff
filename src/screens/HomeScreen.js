import { View, Text, Image} from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native"

export const HomeScreen = ({ navigation })=>{
    
    const goToLoginScreen = () => {
        navigation.navigate('Login');
    };

    return(
        <SafeAreaView style={{flex:1}}>
            <TouchableOpacity
                style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}
                onPress={goToLoginScreen}
            > 
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
                <Text style={{flex:1, justifyContent:'center', alignItems:'cente',fontfamily:'Quicksand-VariableFont_wght'}}> Hello </Text>
            </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}