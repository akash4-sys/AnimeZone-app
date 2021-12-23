module.exports = {

    LoggedIn: function(req, res, next) {

        if(req.isAuthenticated()) {
            return next();
        }
        else{
            res.redirect('/login');
        }
    },

    Guest: function(req, res, next) {

        if(req.isAuthenticated()) {
            res.redirect('/');
        }
        else{
            return next();
        }
    }
}