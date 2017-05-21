let BaseAdapter = (superClass) => class extends superClass{

    // constructor(){
    //     super();
    // }

    switchOn(){
        console.log("Base adapter method turnon");
        super.turnOn();
    }

    switchOff(){
        console.log("Base adapter method tuenoff");
        super.turnOff();
    }

    setTemperature() {
        console.log("Method not implemented");
    }

    setColor() {
        console.log("method not implemented");
    }

    setBrightness(){
        console.log("Method not implemented");

    }
};
module.exports = BaseAdapter;