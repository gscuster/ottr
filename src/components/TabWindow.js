import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CharacterSheet } from './CharacterSheet.js';
import { GameInfo } from './GameInfo.js';
import './TabWindow.css';

export const TabWindow =  ({gameName, gameData, rollDice, users }) => (
  <Tabs className='tabs'>
    <TabList>
      <Tab>Map</Tab>
      <Tab>Characters</Tab>
      {gameData.characters != null && gameData.characters.map( (character, i) => (
        <Tab key={i}>{character.name}</Tab>
      ))}
      <Tab>Game Info</Tab>
    </TabList>

    <TabPanel>
      <h2>Unimplemented</h2>
    </TabPanel>

    <TabPanel>
      <h2>Unimplemented</h2>
    </TabPanel>

    {gameData.characters != null && gameData.characters.map( (character, i) => (
      <TabPanel key={i}>
        <CharacterSheet character={character} rollDice={rollDice}/>
      </TabPanel>
      ))}

    <TabPanel>
      <GameInfo gameName={gameName} gameData={gameData} users={users}/>
    </TabPanel>
  </Tabs>
);