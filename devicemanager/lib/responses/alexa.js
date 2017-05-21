class Alexa{

    constructor(params){
        this.header = params.header;
        this.params = params;
        this.actionMap = {
            'TurnOnRequest':'TurnOnConfirmation',
            'TurnOffRequest': 'TurnOffConfirmation',
            'setColorRequest': 'SetColorConfirmation'
        }
    }

    getResponse() {
        this.makeResponse();
        return {
            header : this.header,
            payload : this.payload
        }
    }

    generateControlError(name, code, description) {
        var headers = {
            namespace: 'Alexa.ConnectedHome.Control',
            name: name,
            payloadVersion: '2'
        };

        var payload = {
            exception: {
                code: code,
                description: description
            }
        };

        var result = {
            header: headers,
            payload: payload
        };

        return result;
}


    makeResponse() {
        this.header.name = this.actionMap[this.params.header.name];
        this.payload = {};
    }
}

module.exports = Alexa;