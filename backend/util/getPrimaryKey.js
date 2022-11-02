module.exports = (name) => name.toLowerCase().split(' ').join('-').replace(/[^\w^-\s]/gi, '');
