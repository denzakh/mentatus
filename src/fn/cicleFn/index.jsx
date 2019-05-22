let cicleFn = (dataBase, name) => {
  return Object.keys(dataBase).filter(item => dataBase[item].cicle === name);
};

export default cicleFn;
