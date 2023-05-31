export function Post(method, body) {
  return new Promise((resolve, reject) => {
    fetch(method, {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
        // console.log(`MethodSuccess[${method}]`, responseJson);
      })
      .catch((error) => {
        reject(error);
        // console.log(`MethodError[${method}]`, error);
      });
  });
}

export function Put(method, body) {
  return new Promise((resolve, reject) => {
    fetch(method, {
      method: "Put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
        // console.log(`MethodSuccess[${method}]`, responseJson);
      })
      .catch((error) => {
        reject(error);
        // console.log(`MethodError[${method}]`, error);
      });
  });
}

export function Delete(method, body) {
  return new Promise((resolve, reject) => {
    fetch(method, {
      method: "Delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
        //  console.log(`MethodSuccess[${method}]`, responseJson);
      })
      .catch((error) => {
        reject(error);
        //  console.log(`MethodError[${method}]`, error);
      });
  });
}

export function Get(Url, body) {
  return new Promise((resolve, reject) => {
    fetch(Url, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
        console.log(`MethodSuccess[${Url}]`, responseJson);
      })
      .catch((error) => {
        reject(error);
        console.log(`MethodError[${Url}]`, error);
      });
    return function cleanup() {
      abortController.abort();
    };
  });
}
