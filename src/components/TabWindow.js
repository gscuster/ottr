import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './TabWindow.css';

export const TabWindow =  () => (
  <Tabs className='tabs'>
    <TabList>
      <Tab>Map</Tab>
      <Tab>Characters</Tab>
      <Tab>Settings</Tab>
    </TabList>

    <TabPanel>
      <h2>Unimplemented</h2>
    </TabPanel>

    <TabPanel>
      <h2>Unimplemented</h2>
    </TabPanel>

    <TabPanel>
      <h2>No settings yet</h2>
    </TabPanel>
  </Tabs>
);