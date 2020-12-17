// Create authozization header
export const createAuthozization = (username, password) => {
    let data = username + ':' + password;
    let buff = new Buffer(data);
    let base64data = buff.toString('base64');
    localStorage.setItem('cdcu', username);
    localStorage.setItem('wauthtk', base64data);
}

// Check invalid header
export const authHeaders = {
    'Access-Control-Allow-Headers': '*',
    'Authorization': `Bearer ${localStorage.getItem("actk_w_s")}`,
}

// Check Login User
export const loginHeaders = {
    'client_id': process.env.REACT_APP_CLIENT_ID,
    'secret':   process.env.REACT_APP_CLIENT_SECRET,
    'Access-Control-Allow-Headers': '*',
    "Content-Type": "application/json",
}
// No info header
export const noInfoHeader = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    "Content-Type": "application/json",
}

// Delete state when logout
export const deleteLoginState = () => {
    localStorage.setItem('wauthtk', null);
}

// Set accesstoken and refreshtoken


export const sendStringHeader = {
    'Access-Control-Allow-Headers': '*',
    "Content-Type": "text/plain",
    'Authorization': `Bearer ${localStorage.getItem("actk_w_s")}`,
}

export const sendFileHeader = {
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${localStorage.getItem("actk_w_s")}`,
}

// Set State of authenticate
export const setAuthSate = async (response) => {
    if (response.code === 200) {
        localStorage.setItem('userID', response.data.userID);
        localStorage.setItem('actk_w_s', response.data.actk_w_s);
    }
}

//Set Authorization