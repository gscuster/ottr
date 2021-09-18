export const FateCoreSheet = {
  _id: null,
  visibility: 'gm',
  owners: [],
  format: 'Fate Core',
  name: 'New Character',
  description: 'Insert character description here',
  fatePoints: 3,
  refresh: 3,
  physicalStress: [false, false],
  mentalStress: [false, false],
  consequences: [
    {type: 'Mild', description: ''},
    {type: 'Moderate', description: ''},
    {type: 'Severe', description: ''}
  ],
  extras: [
    {name: 'Example Extra', description: 'Example extra description'}
  ],
  aspects: [
    {name: 'High Concept',
      description: 'High concept description'},
    {name: 'Trouble',
      description: 'Trouble description'},
    {name: 'Aspect 1',
      description: 'Aspect 1 description'},
    {name: 'Aspect 2',
      description: 'Aspect 2 description'},
    {name: 'Aspect 3',
      description: 'Aspect 3 description'}
  ],
  skills: [
    {name: 'Example Skill', rating: '4'}
  ],
  stunts: [
    {name: 'Example Stunt',
      description: 'Example stunt description'}
  ]
}