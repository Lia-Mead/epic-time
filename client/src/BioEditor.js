import React from "react";
// import axios from "./Axios";

export default class BioEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            editingMode: false,
        };
    }

    textHandleChange() {
        this.setState({
            editingMode: !this.state.editingMode,
            // editingMode: true,
        });
    }

    render() {
        console.log("this props in bio editor: ", this.props); // undefined
        if (this.state.editingMode) {
            return (
                <div>
                    <h1>EDIT MODE!!!</h1>
                    <textarea defaultValue="This is the bio from this.props" />
                    <button>Save bio</button>
                </div>
            );
        }
        return (
            <div className="border-acqua">
                <h1>I am the bio editor</h1>
                <p>this will be the users bio that we get from props</p>
                <button onClick={() => this.textHandleChange()}>
                    Click me! Edit bio
                </button>
            </div>
        );
    }
}

// <button onClick={() => this.props.sayHello()}>Click me! Edit bio</button>;
