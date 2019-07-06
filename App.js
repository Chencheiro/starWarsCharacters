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
} from 'react-native';

import CharacterCard from "./compoents/characterCard";


//APP
type Props = {};
export default class App extends Component<Props> {
  state = {
    characters: [],
    loading: false,
    currentImg: null
  }

  getImage = async (searchTerm) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=jNrv3kupwbQ5YQ48kcrqFDU37RppJe3C&q=${searchTerm}&limit=5&offset=0&rating=G&lang=en`

    let characterData = await fetch(url)
    let characterImageUrl = await characterData.json()

    return characterImageUrl.data[0].images.downsized.url
  }

  storeInState = (data) => {
    let tempList = this.state.characters
    tempList = tempList.concat(data.results)
    this.setState({
      ...this.state,
      characters: tempList
    })
  }

  fetchCarachters = (url) => {
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
            this.fetchCarachters(data.next)
          }
        })
        .catch(err => console.log(err))
  }


  componentWillMount() {
    this.setState({
      ...this.state,
      loading: true
    })
    const url = 'https://swapi.co/api/people'
    this.fetchCarachters(url)
  }



  render() {
    const characters = this.state.characters.map((character, index) => {
      return(
        <View key={index} style={styles.card}>
          <Text>{character.name}</Text>
          <Image style={{width: 50, height: 50}} source={{uri: this.getImage(character.name)}}/>
        </View>
        )
      })

    const { loading } = this.state
    if (loading){
      return(
        <View style={styles.container}>
          <Text>Lodin...</Text>
        </View>
      )
    }
    else {
      return (
        <ScrollView style={styles.scrollContainer}>
          <SafeAreaView>
            <View style={styles.container}>
              <Text>ola soi una aplikasion de ayoes</Text>
              {/*<CharacterCard characters={this.state.characters} />*/}
              {characters}
            </View>
          </SafeAreaView>
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center'

  },
  card: {
    margin: 2,
    width: Dimensions.get('window').width / 2 -6,
    height: 200,
    backgroundColor: '#f1c40f'
  }
});
