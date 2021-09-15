export const FateAcceleratedSheet = {
  _id: null,
  format: 'Fate Accelerated',
  name: 'New Character',
  description: 'Insert character description here',
  fatePoints: 3,
  refresh: 3,
  stress: [false, false, false],
  consequences: [
    {type: '2', description: ''},
    {type: '4', description: ''},
    {type: '6', description: ''}
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
  approaches: [
    {name: 'Careful', rating: '0'},
    {name: 'Clever', rating: '0'},
    {name: 'Flashy', rating: '0'},
    {name: 'Forceful', rating: '0'},
    {name: 'Quick', rating: '0'},
    {name: 'Sneaky', rating: '0'},

  ],
  stunts: [
    {name: 'Example Stunt',
      description: 'Example stunt description'}
  ]
}