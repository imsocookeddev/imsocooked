export default {
  name:"I'm So Cooked",
  admin:{
    tabs:[
      {name:'Overview',url:'/'},
      {name:'Users',url:'/users'},
      {name:'Cuisines',url:'/cuisines'},
      {name:'Regions',url:'/regions'},
      {name:'Lessons',url:'/lessons'},
      {name:'Problems',url:'/problems'},
    ]
  },
  roles:[
    "user",
    "admin"
  ],
  problem_types:[
    "mulitple_choice",
    "drag-n-drop",
    "matching",
    "single_word_response",
  ],
} as const;
