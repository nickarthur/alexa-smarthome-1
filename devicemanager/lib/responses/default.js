class Default{

    constructor(params){
        this.header = params.header;
        this.payload = params.payload;
        this.params = params;

    }

    getResponse() {
        return this.makeResponse()
    }

    makeResponse() {
        return {
            header: this.params.header,
            payload : this.params.payload
        }
    }
}