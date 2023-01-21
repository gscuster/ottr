import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CharacterManager } from './CharacterManager.js';
import { CharacterSheet } from './CharacterSheet.js';
import { GameInfo } from './GameInfo.js';
import { TabCloseButton } from './TabCloseButton.js';
import { debounce } from 'lodash/function';
import React, { useState, useCallback } from 'react';
import './TabWindow.css';

export const TabWindow =  ({gameName, gameData, rollDice, users, gm, 
  updateCharacter, userID}) => {
  const [openCharacters, setOpenCharacters] = useState([]);

  // Debounce used for all character updates
  const debouncedUpdateCharacter = useCallback(
    debounce(updateCharacter, 200)
  , []);

  const setCharacter = (characters, setCharacters, index) => {
    return (newCharacter) => {
      // Replace the matching character in characters
      const newCharacters = characters.map( (oldCharacter, i) => (
        (i === index) ? newCharacter : oldCharacter 
      ));
      setCharacters(newCharacters);

      // Update the character
      debouncedUpdateCharacter(newCharacter)
    }
  }

  const closeCharacter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenCharacters(openCharacters.filter((character) => (character._id !== e.target.id)));
  }

  return (
    <Tabs className='tabs'>
      <TabList>
        <Tab>Map</Tab>
        <Tab>Characters</Tab>
        {openCharacters.map( (character, i) => (
          <Tab key={i}>
            {character.name}
            <TabCloseButton onClick={closeCharacter} id={character._id}/>
          </Tab>
        ))}
        <Tab>Game Info</Tab>
      </TabList>
  
      <TabPanel>
        <h2>Unimplemented</h2>
      </TabPanel>
  
      <TabPanel>
        <CharacterManager gameData={gameData} gm={gm}
          openCharacters={openCharacters} setOpenCharacters={setOpenCharacters} userID={userID}
          updateCharacter={debouncedUpdateCharacter}/>
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