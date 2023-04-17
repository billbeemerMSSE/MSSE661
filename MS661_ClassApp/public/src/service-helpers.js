const storedToken = storageHasData() ? getStorage("token") : "";
const token = `Bearer ${storedToken}`;

console.log("service-helpers token : %s", token)
const DEFAULT_OPTIONS = {
    headers: {
        "Content-Type": "application/json",
    },
};

const DEFAULT_OPTIONS_WITH_AUTH = {
    headers: {
        Athorization: token,
        "Content-Type": "application/json",
    },
};

const OPTIONS_WITH_AUTH = {
    headers: {
        Athorization: token,
    },
};

const _get = async (url, options = DEFAULT_OPTIONS_WITH_AUTH) => {
    const response = await fetch(url, {
        method: "GET",
        ...options,
    });
    return response.json();
};

const _post = async (url, data, options = DEFAULT_OPTIONS) => {
    const response = await fetch(url, {
        method: "POST",
        ...options,
        body: JSON.stringify(data),
    });
    return response.json();
};

const _put = async (url, data, options = DEFAULT_OPTIONS_WITH_AUTH) => {
    const response = await fetch(url, {
        method: "PUT",
        ...options,
        body: JSON.stringify(data),
    });
    return response.json();
};

const _delete = async (url, options = DEFAULT_OPTIONS_WITH_AUTH) => {
    const response = await fetch(url, {
        method: "DELETE",
        ...options,
    });
    return response.json();
};


// function _get(url) {
//     return fetch(url, {
//         method: "GET"
//     });
// }

// function _post(url, data) {
//     return fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     });
// }

// function _put(url, data) {
//     return fetch(url, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     });
// }
