export const saveData = (key, data) => {
  try {
    var jsonOfItem = localStorage.setItem(key, data);
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
};

export const getData = (key, data) => {
  try {
    var jsonOfItem = localStorage.setItem(key, data);
    if (jsonOfItem) return jsonOfItem;
    return undefined;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteData = (key) => {
  try {
    var jsonOfItem = localStorage.removeItem(key);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAllData = async () => {
  try {
    await localStorage.clear();
  } catch (error) {
    console.log(error.message);
  }
};
