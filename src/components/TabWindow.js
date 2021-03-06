import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CharacterManager } from './CharacterManager.js';
import { CharacterSheet } from './CharacterSheet.js';
import { GameInfo } from './GameInfo.js';
import React, { useState } from 'react';
import './TabWindow.css';

export const TabWindow =  ({gameName, gameData, rollDice, users, gm, 
  updateCharacter, userID}) => {
  const [openCharacters, setOpenCharacters] = useState([]);

  const setCharacter = (characters, setCharacters, index) => {
    return (newCharacter) => {
      // Replace the matching character in characters
      const newCharacters = characters.map( (oldCharacter, i) => (
        (i === index) ? newCharacter : oldCharacter 
      ));
      setCharacters(newCharacters);

      // Update the character
      updateCharacter(newCharacter)
    }
  }

  return (
    <Tabs className='tabs'>
      <TabList>
        <Tab>Map</Tab>
        <Tab>Characters</Tab>
        {openCharacters.map( (character, i) => (
          <Tab key={i}>{character.name}</Tab>
        ))}
        <Tab>Game Info</Tab>
      </TabList>
  
      <TabPanel>
        <h2>Unimplemented</h2>
      </TabPanel>
  
      <TabPanel>
        <CharacterManager gameData={gameData} gm={gm}
          openCharacters={openCharacters} setOpenCharacters={setOpenCharacters}/>
      </TabPanel>
  
      {openCharacters.map( (character, i) => (
        <TabPanel key={i}>
          <CharacterSheet character={character} rollDice={rollDice}
            updateCharacter={setCharacter(openCharacters, setOpenCharacters, i)} gm={gm} userID={userID} users={users}/>
        </TabPanel>
      ))}
  
      <TabPanel>
        <GameInfo gameName={gameName} gameData={gameData} users={users}/>
      </TabPanel>
    </Tabs>
  );
}