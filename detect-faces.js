module.exports = function(RED) {
    const faceapi = require('face-api.js')

    async function loadModels(){
        try {
            await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models')    
        } catch (error) {
            this.error(error);
        }
        
    }
    loadModels();

    function DetectFace(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg, send, done, err) {
            msg.payload = faceapi.nets.ssdMobilenetv1._paramMappings
            send(msg);

            if(err){
                if(done){
                    done(err);
                }
            }
        });
    }
    RED.nodes.registerType("detect-faces",DetectFace);
}