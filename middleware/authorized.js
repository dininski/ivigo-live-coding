module.exports = function (request, response, next) {
    const session = request.session;
    const passport = session.passport;
    const user = passport.user;
    if (!user) {
        response.writeHead(401);
        return response.end('Not authenticated');
    }

    return next();
}