export default function ({store, req}) {
    process.server ?
        store.commit("setUser", req.session && req.session.passport && req.session.passport.user) :
        store.dispatch("setCurrentUser");
}