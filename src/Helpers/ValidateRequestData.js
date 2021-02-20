'use strict';

module.exports = {
    validateExistance: (req, requiredArray = []) => {
        const response = {};
        const total = requiredArray.length;
        let valid = 0;
        requiredArray.forEach(required => {
            if(req.body[required]){
                response[required] = req.body[required];
                valid++;
            }
        })
        return {valid: valid===total, response}
    }
}
