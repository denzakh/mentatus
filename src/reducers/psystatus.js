const initialState = {
  psystatus: [
    { name: "wellcome",
      label: "Приветствие",
      isChecked: true,
      phrase: "Добро пожаловать на сайт!"
    },
    { name: "option1",
      label: "Свойство 1",
      isChecked: true,
      phrase: "Описание свойства 1"
    },
    { name: "option2",
      label: "Свойство 2",
      isChecked: true,
      phrase: "Описание свойства 2"
    }        
  ]
}

export default function psystatus(state = initialState) {
  return state
}
