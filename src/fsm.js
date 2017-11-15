class FSM {

    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (typeof config === 'undefined')
            throw new Error("no config");
        this.states = config.states;
        this.currentState = config.initial;
        this.history = [];
        this.index = 0;
    }

    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!(state in this.states))
            throw new Error('doesn exist this state');
        this.currentState = state;
        this.history.push(state);
        this.index++;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let transitions = this.states[this.currentState].transitions;
        if (event in transitions)
            this.changeState(transitions[event]);
        else
            throw Error("uncorrect event");
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.states[0]); /// 'normal'
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr = new Array();
        if (typeof event === 'undefined')
            arr = Object.keys(this.states);
        else
            for (let state in this.states)
                if (event in this.states[state].transitions)
                    arr.push(state);
        return arr;
    }

    undo() {
        if (this.history > 0) {
            this.history--;
            this.currentState = this.history[this.history];
            return true;
        } else
            return false;
    }

    redo() {
        if (this.history < this.history.length) {
            this.history++;
            this.currentState = this.history[this.history];
            return true;
        }
        else
            return false;
    }

    clearHistory() {
        this.history = [];
        this.history = 0;
    }
}
module.exports = FSM;