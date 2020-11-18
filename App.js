
import React, { Component } from 'react'
import { SafeAreaView, StatusBar, ScrollView, FlatList, ActivityIndicator, Text, TextInput, View, StyleSheet, Button, TouchableHighlight, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      showTextInput: true,
      text: '',
      block: "",
      error: false,
    }
  }


  getPostOffices = async () => {
    this.setState({ isLoading: true })
    try {
      let response = await fetch(
        'https://api.postalpincode.in/pincode/' + this.state.text
      );
      let responseData = await response.json();
      //console.log(responseData)

      this.setState({ data: responseData[0].PostOffice, error: false, isLoading: false, text: "", showTextInput: false, block: responseData[0].PostOffice[0].Block })
    } catch (error) {
      console.error(error);
      this.setState({ data: [], isLoading: false, showTextInput: true, error: true, text: "" })

    }
  };
  render() {

    const { showTextInput, text, isLoading, data, block, error } = this.state;
    console.log('showTextInput', showTextInput, data)
    if (showTextInput) {
      return (<View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ justifyContent: "space-evenly" }}>
          <Text style={{ textAlign: "center", fontSize: 30, }}>PostOffice</Text>

          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '80%', }}>
              <TextInput
                keyboardType="number-pad"
                style={styles.input}
                onChangeText={(text) => this.setState({ text })}
                value={text}
              />
            </View>
          </View>

          {
            (error) ? <Text style={{ fontWeight: 'bold', color: 'red', textAlign: 'center' }}>Invalid PinCode</Text> : <></>
          }



          <View style={styles.center} >
            <View style={{ width: '50%' }}>
              {
                (!isLoading) ?
                  <Button title='Search' color='#4444ff' onPress={() => this.getPostOffices()}></Button>
                  :
                  <ActivityIndicator size="large" color="#4444ff" />
              }
            </View></View>
        </View></View>
      )
    }
    else {
      return (


        <SafeAreaView style={{ backgroundColor: '#ffffff' }} >
          <View style={{ justifyContent: "center", alignItems: 'flex-end', backgroundColor: '#ffffff', marginRight: '5%', height: 40 }}>

            <View style={{}}>
              <TouchableOpacity onPress={() => this.setState({ showTextInput: true, text: '' })}>
                <Icon name='close' size={20} color='black'></Icon>
                {/* <FontAwesome  icon={SolidIcons.windowClose} style={{fontSize:40,color:'white'}}/> */}

              </TouchableOpacity>

            </View>
          </View>
          <FlatList
            data={data}
            keyExtractor={(index) => { index.toString() }}
            renderItem={({ item }) => {

              return (

                <View style={{ width: '90%', margin: 20, marginLeft: '5%', marginRight: '5%', elevation: 10, backgroundColor: '#ffffff' }}>
                  <View >
                    <View style={{ flex: 1 }}>

                      <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: 15, padding: 5, paddingBottom: 0 }}>{item.Name}</Text>

                    </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <View style={{ flex: 0.6 }}>
                        <Text style={{ padding: 5, paddingBottom: 0 }}>Dilevery Status: {(item.DeliveryStatus == 'Delivery') ? "Delivering" : "Not-Delivering"} </Text>
                      </View>

                      <View style={{ flex: 0.4 }}>
                        <View style={{}}>
                          <Text style={{ padding: 5, paddingBottom: 0 }}>District: {item.District} </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", }}>
                      <View style={{ flex: 0.6 }}>
                        <View>
                          <Text style={{ padding: 5, paddingBottom: 10 }}>Circle: {item.Region}  </Text>
                        </View>
                      </View>
                      <View style={{ flex: 0.4 }}>
                        <Text style={{ padding: 5, paddingBottom: 10 }}>Block: {item.Block}  </Text>
                      </View>
                    </View>
                  </View>
                </View>

              )
            }}
          />





        </SafeAreaView>
      );
    }
  }
}
const styles = StyleSheet.create(
  {

    input: {
      backgroundColor: '#eeeeff', borderColor: 'black', borderWidth: 1, borderRadius: 20, height: 40, margin: 10
    },

    center: { alignItems: 'center', margin: 10 }


  }
);
export default App;