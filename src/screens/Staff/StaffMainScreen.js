import { View, Text,TextInput, Image} from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native";
import { useDispatch,useSelector } from 'react-redux';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import { LinearGradient } from 'react-native-linear-gradient';
import { retrieveAllUserData } from "../../firebase/UserModel";
import { retrieveAllEventKeySelectData } from "../../firebase/UserModel";
import { retrieveAllEventData } from "../../firebase/UserModel";
import { retrieveboothSelectData } from "../../firebase/UserModel";
import { SelectList } from 'react-native-dropdown-select-list';
import { addStaffEvent } from "../../firebase/UserModel";


export const StaffMainScreen =  ({ navigation })=>{
    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    const user = useSelector((state)=>state.auths);
    const [selectedEvent, setEventSelected] = useState("");/// For Select list
    const [selectedBooth, setBoothSelected] = useState("");/// For Select list
    const userUID = user[0].uid;
    const [nameData, setNameData] = useState("")
    const [mailData, setMailData] = useState("")
    const [phoneData, setPhoneData] = useState("")
    const [staffNumData, setStaffNumData] = useState("")

    const [eventIDData, setEventIDData] = useState("")
    const [eventData,setEventData] = useState([]); /// For Select list
    const [showInnerComponent, setShowInnerComponent] = useState(false);/// For Select list
    const [boothData,setBoothData] = useState([]);/// For Select list
    const [FirstSelected, setFirstSelected] = useState(false)/// For Select list

    const data = {eventData,boothData};
     useEffect(() => {  
        getProfileData(),getEventDataArray()
    }, [isUpdate]);  

    const getProfileData = async()=>{
        try{
            const itemAllUserData = await retrieveAllUserData(userUID)
            setNameData(itemAllUserData.name +" "+itemAllUserData.surName)
            setMailData(itemAllUserData.email)
            setPhoneData(itemAllUserData.phoneNumber)
            setStaffNumData(itemAllUserData.staffnumber)

            console.log(selectedEvent); 
            
        }catch (error) {
            console.error('Error getNameData:', error);
        }  
    }


    const getEventDataArray = async()=>{
        try{
            const itemAllEventDataArray = await retrieveAllEventKeySelectData()
            setEventData(itemAllEventDataArray)


        }catch (error) {
            console.error('Error getNameData:', error);
        }  
    } 
    const getBoothDataArray = async()=>{
        try{
            const itemBoothDataArray = await retrieveboothSelectData(selectedEvent,false)
            setBoothData(itemBoothDataArray)

        }catch (error) {
            console.error('Error getNameData:', error);
        }  
    }

    const InnerComponent  = ({}) => {
        let oldselectedBooth = "";
        let count = 0;
        if(selectedBooth != ""){
            oldselectedBooth = selectedBooth;
            console.log('Old : '+oldselectedBooth)
            if(oldselectedBooth = selectedBooth && count != 0){
                console.log('Equal')
            }
        }
        
            return(
                <View>
                    <Text style={{fontSize:17, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular',paddingTop:'8%'}}>   บูธ</Text>
                    <SelectList 
                        style={{color: 'black'}}
                        onSelect={() => alert(selectedBooth)}
                        setSelected={setBoothSelected}
                        fontFamily = 'Prompt-Regular'

                        data={data.boothData}  
                        search={false} 
                        boxStyles={{height:50,width:320, borderRadius:25, backgroundColor:'#F5F5F5', borderWidth:1,borderColor:'#0D433D',fontFamily: 'Prompt-Regular',color: 'black'}} //override default styles
                     />  
    
                </View>
            ) 
    }

    const handleSelectData = () => {
        getBoothDataArray();
        console.log(selectedEvent)
        if(FirstSelected === false) {
            setShowInnerComponent(true);
            setFirstSelected(true);
        }
    }
    const success = async(user) => {
        console.log("Successfully")
            navigation.navigate('StaffHome');
      }
    
      const unsuccess = (msg) => {
        console.log(msg)
        Alert.alert(msg)
      }

    const handleAddEvent = ()=>{
        let isEventValid = true;
        let isBoothValid = true;
        while(true){
            if(!eventData){
                isEventValid = false;
                Alert.alert('Please Select your event');
                break;
            }
            if(!boothData){
                isBoothValid = false;
                Alert.alert('Please Select your booth');
                break;
            }        
          break;
        }
  
        if(isEventValid && isBoothValid ){
            addStaffEvent(user,userUID,selectedEvent,selectedBooth,success,unsuccess )
            
        }
        else{
          console.log("Error Please Complete your Ans")
        }
    }  

      

    return(
        <SafeAreaView style={{flex:1}}>
        <LinearGradient start={{x: 1, y: 0.5}} end={{x: 0, y: 0.5}} colors={['#E1FAF7','#BAE9E3', '#74D4C9']} style={{flex:1}}>
             <View style={{flex:1,flexDirection : 'row',justifyContent:'flex-start',alignItems:'flex-start',marginHorizontal:'5%',marginTop:'7%'}}>
                <View style={styles.circle}>
                    <View style={{ width: 80,height: 80, borderRadius: 50,backgroundColor: '#FFFFFF',justifyContent:'center',alignItems:'center'}}>
                         <Image source={require('../../assets/images/user.png')} style={{ width: 90, height: 90 }}/>
                    </View>
                </View>
                <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start',marginHorizontal:'7%',marginTop:'7%'}}>
                    <Text style={{color:"rgb(13,67,61)",justifyContent: 'flex-end', alignItems: 'center',fontFamily: 'Prompt-SemiBold',fontSize : 16}}> ยินดีต้อนรับสู่ทีมของเรา </Text>
                    <Text style={{color:"rgb(13,67,61)",justifyContent: 'flex-end', alignItems: 'center',fontFamily: 'Prompt-Regular',fontSize : 16}}> คุณ {nameData}</Text>
                </View>
            </View>
            <View style={{flex:5,justifyContent:'flex-start', alignItems:'center', backgroundColor:'white'}}>
                <View style={{height:'30%',width:'95%', backgroundColor:'white',borderWidth:1, borderRadius:25,borderColor:'#0D433D',flexDirection:'row',justifyContent: 'space-evenly',alignItems: 'center'}}> 
                    <View style={{flex:13,width:'60%',paddingTop:'1%'}}>
                        <Text style={{fontSize:12, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular',paddingLeft:'12%'}}>Name : {nameData}</Text>
                        <Text style={{fontSize:12, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular',paddingLeft:'12%'}}>Email : {mailData}</Text>
                        <Text style={{fontSize:12, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular',paddingLeft:'12%'}}>Phone : {phoneData}</Text>
                    </View> 
                    <View style={{flex:1,width:'10%',alignItems:'flex-end',justifyContent:'center'}}>
                        <View style={{height:'90%',width: 1,backgroundColor: '#909090'}}/>
                    </View>
                    <View style={{flex:9,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:15, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}>Staff</Text>
                        <Text style={{fontSize:32, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}>N0.{staffNumData}</Text>
                    </View>                  
                </View>
                
                <View style={{flex:2, paddingVertical:'4%', paddingHorizontal:'10%'}}>
                <Text style={{fontSize:17, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}>   กิจกรรม</Text>
                  <SelectList 
                    style={{color: 'black'}}
                    onSelect={handleSelectData}
                    setSelected={setEventSelected}
                    fontFamily = 'Prompt-Regular'
                    data={data.eventData}  
                    boxStyles={{height:50,width:320, borderRadius:25, backgroundColor:'#F5F5F5', borderWidth:1,borderColor:'#0D433D',fontFamily: 'Prompt-Regular'}} //override default styles
                    />
                
                {showInnerComponent && <InnerComponent />}

                            
                </View>
                <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                    <TouchableOpacity style={{height:50,width:200, borderRadius:26, backgroundColor:'#B7221E', justifyContent:'center', alignItems:'center', marginHorizontal:'18%', marginVertical:'2%', borderWidth:1,borderColor:'#0D433D' }}
                             onPress={() => {
                                handleAddEvent();
                                alert("Add Event Succeed");
                    }}                 
                     >
                        <Text style={{fontFamily: 'Prompt-Regular', color:'#fffffa', fontSize:20}}>ยืนยัน</Text>
                    </TouchableOpacity>           
                  </View>
            </View>
        </LinearGradient>
        </SafeAreaView>
    );




}

const styles = StyleSheet.create({
    container: {
      flex: 1,

      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    circle: {
        width: 100, // Diameter of the circle
        height: 100, // Diameter of the circle
        borderRadius: 100, // Half of the width/height
        backgroundColor: '#E32A25'
        ,justifyContent:'center',
        alignItems:'center'
      },
    line: {

        height: 1,  // You can adjust the thickness of the line by changing the height
        backgroundColor: '#199486',  // Change the color to suit your design
        width: '80%' , // This will make sure the line stretches across the width
        alignSelf : 'center'
      },
    header: {
        color:"rgb(13,67,61)",
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontFamily: 'Prompt-Regular',
        fontSize : 24,

    }
  });