import React from 'react'
import { View, Text, Image } from 'react-native'
const CharacterCard = ({characters}, props) => {
  const allCharacters = characters.map((currentCharacter, index) => (
    <View key={index}>
      <Text>
        {currentCharacter.name}
      </Text>
      <Image source={props.searchImage(currentCharacter.name)}/>
    </View>
  ))
  return (
    {allCharacters}
  )
}

export default CharacterCard