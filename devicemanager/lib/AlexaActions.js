class AlexaActions {
    constructor(){
        this.actionMap = {
            "DecrementColorTemperatureRequest": "decrementColorTemperature",
            "DecrementPercentageRequest": "decrementPercentage",
            "IncrementColorTemperatureRequest": "incrementColorTemperature",
            "IncrementPercentageRequest": "incrementPercentage",
            "IncrementTargetTemperatureRequest": "incrementTargetTemperature",
            "SetColorRequest": "setColor",
            "SetColorTemperatureRequest": "setColorTemperature",
            "SetLockStateRequest": "setLockState",
            "SetPercentageRequest": "setPercentage",
            "SetTargetTemperatureRequest": "setTargetTemperature",
            "TurnOnRequest" : "turnOn",
            "TurnOffRequest": "turnOff",
        }
    }
    getActionMethod(action) {
        return this.actionMap[action];
    }
}
module.exports = AlexaActions;