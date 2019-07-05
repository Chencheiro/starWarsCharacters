import React from 'react'
import { View, Text } from 'react-native'
const CharacterCard = ({characters}) => {
  const allCharacters = characters.map((currentCharacter, index) => (
    <View key={index}>
      <Text>
        {currentCharacter.name}
      </Text>
    </View>
  ))
  return (
    {allCharacters}
  )
}

export default CharacterCard