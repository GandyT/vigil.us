var sess = {
    token: ""
}

var SessionManager = {
    SetToken: token => {
        sess.token = token;
    },
    GetToken: () => sess.token,
}

export default SessionManager;