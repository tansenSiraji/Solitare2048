import React, { Component } from 'react';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';
//import all the components we will need

var RandomNumber, power
export default class GridTable extends Component {
  constructor() {
    super();
    
  // this.randCard = this.randCard.bind(this);
  // this.randCard2 = this.randCard2.bind(this);
    this.state = {
      dataSource: {},
      randSource: {}, updateCount: [], topSection: [], sumValue: 0 
    };
  }
  componentDidMount() {
    var that = this;
    updateCount = {value: ''}
    topSection = {value: ''}
    // RandomNumber = Math.floor(Math.random() * 16) + 1 ;

    let items = Array.apply(null, Array(16)).map((v, i) => {
      let topSection = this.state.topSection
        // if((i + 1) % 2 == 0){
            // if((RandomNumber % 2) == 0){
                // console.log(RandomNumber)
                var a = Math.floor(Math.random() * 8) + 1 ;
                // while(a < 8){
                power = Math.pow(2, a)
                // }
                topSection.push({value: power})
                return { id: i, src: 'http://placehold.it/200x200?text=' + power };

            // }
        // }
        // else{
        //     return { id: i, src: 'http://placehold.it/200x200?text=' + '' };
        // }
      
    });
    that.setState({
      dataSource: items,
    });

    let randItem = Array.apply(null, Array(4)).map((v, i) => {  
        var a = Math.floor(Math.random() * 8) + 1 ;
        let updateCount = this.state.updateCount

                // while(a < 8){
                power = Math.pow(2, a)
                // }
                if((i == 2) || (i == 3)){
                    console.log(i, 'Discard')
                    return { id: i, src: 'http://placehold.it/200x200?text=' + "Discard" };

                }
                else{
                  console.log(i, 'Power')
                  // updateCount = {value:}
                  updateCount.push({value: power})
                  console.log(updateCount)
                  return { id: i, src: 'http://placehold.it/200x200?text=' + power };

                }
      });
    that.setState({
      randSource: randItem,
    });
  }
  randCard(index){
   
    let updateCount = this.state.updateCount
    console.log(updateCount[index].value, "FROM CONSOLE")
  
    Alert.alert("HELLO ", updateCount[index].value.toString())
    
    var val1 = updateCount[index].value.toString()
    return val1
    // this.sum(0, val1)
    

  }
  sum(){
    // var sum = JSON.stringify(this.randCard) + JSON.stringify(this.randCard2)
    console.log(this.randCard)
    // console.log(sum, "SUM")
  }
  randCard2(index1){
    
    let topSection = this.state.topSection
    console.log(topSection[index1].value, "FROM CONSOLE")
    Alert.alert("HELLO ", topSection[index1].value.toString())
    
    var val2 = topSection[index1].value
    console.log(val2, "VAL2")
    return val2
    // this.sum(val2, 0)

  }
  render() {
    let topSection = this.state.topSection
    let updateCount = this.state.updateCount
    var sumValue = this.state.sumValue
    return (
      <View style={styles.MainContainer}>
        
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                <TouchableOpacity onPress = {() => {
                  var index1 = item.id
                  var val2 = topSection[index1].value
                  var sum2 = this.state.sumValue + parseInt(val2)
                  this.setState({sumValue: sum2}, () => {
                    console.log(sum2, ',,,,,')
                    Alert.alert("SUM OF NUMBER ", sum2.toString())
                    item.src = 'http://placehold.it/200x200?text=' + sum2
                    this.setState({uri: item.src})
                  })
                  

                  // Alert.alert(val2 + val1, "SUM")
                  // this.sum
                }}>
                <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                </TouchableOpacity>
              
            </View>
          )}
          //Setting the number of column
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
        />
       <Button 
      title = "ADD"
      onPress={this.sum}></Button>
      <View>
     
      
      <FlatList
          data={this.state.randSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                <TouchableOpacity onPress={() => {
                  var index = item.id
                  // let val1 = this.randCard(index)
                  // let sumValue = this.state.sumValue
                  var val1 = updateCount[index].value
                  var sum = this.state.sumValue + parseInt(val1)
                  this.setState({sumValue: this.state.sumValue + sum})
                    console.log(sum, ',,,,,')

                  // })
                  
                }}>
                <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                </TouchableOpacity>
              
            </View>
          )}
          //Setting the number of column
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 0,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});