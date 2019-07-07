import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
  StatusBar
} from 'react-native';

import CharacterCard from "./compoents/characterCard";


//APP
type Props = {};
export default class App extends Component<Props> {
  state = {
    characters: [],
    loading: false,
    currentImg: null,
    images: [],
  }

 /* getImage = async (searchTerm) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=jNrv3kupwbQ5YQ48kcrqFDU37RppJe3C&q=${searchTerm}&limit=5&offset=0&rating=G&lang=en`

    let characterData = await fetch(url)
    let characterImageUrl = await characterData.json()
    //console.log(characterImageUrl)
    return characterImageUrl.data[0].images.downsized.url
  }

  imageUrls = async () => {
    let i=0;
    let urllist=[]
    for(i;i< this.state.characters.length;i++){
      const url = `https://api.giphy.com/v1/gifs/search?api_key=jNrv3kupwbQ5YQ48kcrqFDU37RppJe3C&q=${this.state.characters[i].name}&limit=5&offset=0&rating=G&lang=en`
      const response = await fetch(url)
      const json = await response.json()
      urllist.push(json.items[0])
      console.log({urllist})
    }
    return 0
  }*/


  storeInState = (data) => {
    let tempList = this.state.characters
    tempList = tempList.concat(data.results)
    this.setState({
      ...this.state,
      characters: tempList
    })
  }

  fetchCharacters = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.next == null){
            this.storeInState(data)
            this.setState({
                ...this.state,
                loading: false
            })
          }
          else{
            this.storeInState(data)
            this.fetchCharacters(data.next)
          }
        })
        .catch(err => console.log(err))
  }

  /*onError = (character, e) =>{
    console.log(character, e)
  }*/

  componentWillMount() {
    this.setState({
      ...this.state,
      loading: true
    })
    const url = 'https://swapi.co/api/people'
    this.fetchCharacters(url)

    //this.imageUrls()
  }

  render() {
    const characters = this.state.characters.map((character, index) => {
      return(
        <View key={index} style={styles.card}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#333'}}>{character.name}</Text>
          <Image style={{width: 150, height: 150, marginTop: 10}} source={require('./img/20.jpg')}/>
        </View>
        )
      })

    const { loading } = this.state
    if (loading){
      return(
        <View style={styles.container}>
          <Text style={{color: '#FFD700', fontSize: 25}}>Loading...</Text>
        </View>
      )
    }
    else {
      return (
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle='light-content'/>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/*<CharacterCard img={this.state.img}/>*/}
            {characters}
          </ScrollView>
        </SafeAreaView>
      )
    }
  }
}

const styles = StyleSheet.create({
  safeArea:{
    flex: 0,
    backgroundColor: '#000'
  },
  scrollContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#000'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  card: {
    margin: 5,
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Dimensions.get('window').width / 2 -15,
    height: 200,
    backgroundColor: '#FFD700',
    justifyContent: 'center'
  }
});