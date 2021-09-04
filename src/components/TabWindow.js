import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CharacterSheet } from './CharacterSheet.js';
import './TabWindow.css';

export const TabWindow =  ({gameData: {characters=[] }, rollDice }) => (
  <Tabs className='tabs'>
    <TabList>
      <Tab>Map</Tab>
      <Tab>Characters</Tab>
      {characters.map( (character, i) => (
        <Tab key={i}>{character.name}</Tab>
      ))}
      <Tab>Settings</Tab>
    </TabList>

    <TabPanel>
      <h2>Unimplemented</h2>
    </TabPanel>

    <TabPanel>
      <h2>Unimplemented</h2>
    </TabPanel>

    {characters.map( (character, i) => (
      <TabPanel key={i}>
        <CharacterSheet character={character} rollDice={rollDice}/>
      </TabPanel>
      ))}

    <TabPanel>
      <h2>No settings yet</h2>
    </TabPanel>
  </Tabs>
);