const helpers = {};

helpers.ifgreaterthan = (a, b ,options) => {
    if(a > b) return options.fn(this);
    else return options.inverse(this);
};

module.exports = helpers;