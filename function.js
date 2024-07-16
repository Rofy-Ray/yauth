module.exports = function appFunction(app) {
    return (req, res) => {
      app(req, res);
    };
};