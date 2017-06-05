const convict = require('convict');

let conf = convict({
    aws_credentials: {
        region: 'us-west-2',
        bucketName: 'testpilot-p2p'
    }
})

// var env = conf.get('env');
// conf.loadFile('./config/' + env + '.json');
 
// Perform validation 
conf.validate({allowed: 'strict'});
 
module.exports = conf;