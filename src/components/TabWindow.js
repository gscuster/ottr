import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CharacterManager } from './CharacterManager.js';
import { CharacterSheet } from './CharacterSheet.js';
import { GameInfo } from './GameInfo.js';
import React, { useState } from 'react';
import './TabWindow.css';

export const TabWindow =  ({gameName, gameData, rollDice, users, gm }) => {
  const [openCharacters, setOpenCharacters] = useState([]);
  const characterTabs = openCharacters.map((name) => {
    let character;
    if (gameData.characters != null) {
      character = gameData.characters.find((character) => name === character.name);
    }
    if (character == null) {
      character = {};
    }
    return character;
  });
  return (
    <Tabs className='tabs'>
      <TabList>
        <Tab>Map</Tab>
        <Tab>Characters</Tab>
        {characterTabs.map( (character, i) => (
          <Tab key={i}>{character.name}</Tab>
        ))}
        <Tab>Game Info</Tab>
      </TabList>
  
      <TabPanel>
        <h2>Unimplemented</h2>
      </TabPanel>
  
      <TabPanel>
        <CharacterManager gameData={gameData} gm={gm}/>
      </TabPanel>
  
      {characterTabs.map( (character, i) => (
        <TabPanel key={i}>
          <CharacterSheet character={character} rollDice={rollDice}/>
        </TabPanel>
      ))}
  
      <TabPanel>
        <GameInfo gameName={gameName} gameData={gameData} users={users}/>
      </TabPanel>
    </Tabs>
  );
}