import React, { Component } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ThickHDivider } from './EditorMenuItems.js';
import CanvasEditorHeader from "./CanvasEditorHeader.js";
import CanvasEditorBottom from "./CanvasEditorBottom.js";


class CanvasEditorView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            canvasColor: {r: 191, g:251, b:255, a: 1}, //Will have to have different background colors depending on the Canvas
        }
    }

    render(){
    return (
        <Flex direction="column" h="100vh" width="100%" overflow="scroll"> 
            <CanvasEditorHeader flex="6" w="100%" zIndex={5}/>
            <ThickHDivider flex="0.3" colorString={"palette.800"}/>
            <CanvasEditorBottom flex="93.7" w="100%"
                colorSettingFunction={(color) => this.setState({canvasColor: color})} 
                canvasColor = {`rgba(${this.state.canvasColor.r}, ${this.state.canvasColor.g}, ${this.state.canvasColor.b}, ${this.state.canvasColor.a})`}
                />
        </Flex>
    );
 }
}

export default CanvasEditorView;