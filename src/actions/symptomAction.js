export function setSymptom(symptomIndex, departmentArray) {

  return {
    type: 'SET_SYMPTOM',
    index: symptomIndex,
    department: departmentArray
  }

}