export const navigation = [
  {
    name: 'Editor',
    url: '/editor',
    icon: 'icon-pencil'
  },
    {
    name: 'Scheduler',
    url: '/scheduler',
    icon: 'icon-calendar',
    children: [{
      name: 'Tasks',
      url: '/scheduler/tasks',
      icon: 'icon-note'
    }, {
    name: 'Logs',
    url: '/scheduler/logs',
    icon: 'icon-list'
  }]
  },
];
