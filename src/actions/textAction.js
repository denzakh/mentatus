export function setText(fieldName, text) {

  return {
    type: 'SET_TEXT',
    name: fieldName,
    text: text
  }

}