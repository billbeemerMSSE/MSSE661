// const setStorage = (key, data) => {
//     const dataAsString = JSON.stringify(data);
//     const encodedData = btoa(dataAsString);
//     localStorage.setItem(key, encodedData);
// };

const setStorage = (key, data) => {
    // const dataAsString = JSON.stringify(data);
    // const encodedData64 = (dataAsString) => {
    //     return Buffer.from(dataAsString, "base64");
    // };
    // localStorage.setItem(key, encodedData64);
    localStorage.setItem(key, data);
};


// const getStorage = (key) => {
//     const encodedData = localStorage.getItem(key);
//     if (!encodedData) {
//         return null;
//     }
//     const decodedData = atob(encodedData);
//     return JSON.parse(decodedData);
// };


const getStorage = (key) => {
    // const encodedData64 = localStorage.getItem(key);
    // if (!encodedData64) {
    //     return null;
    // }
    // const decodedData64 = (encodedData64) => {
    //     return Buffer.from(encodedData64, "base64").toString("ascii");
    // };
    // return decodedData64;
    return localStorage.getItem(key);
};

const clearStorage = (key) => {
    localStorage.removeItem(key);
};

const storageHasData = () => localStorage.length > 0;