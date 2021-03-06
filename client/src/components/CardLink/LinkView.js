import React, { Component } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { ActualCanvasComponent } from '../EditorMenuItems.js';
import { loadTemplate } from '../../actions/cardActions';
import DragComp from '../../Canvas/dragComp';

class LinkView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasColor: { r: 220, g: 118, b: 118, a: 1 }, //Will have to have different background colors depending on the Canvas
            canvasHeight: 500,
            canvasWidth: 500,
            styles: {},
            comps: [{}],
            scene: 0,
            id: 0,
            content: {},
            sceneRef: {},
            classNames: {},
        };
    }
    componentDidMount() {
        if (this.props.templateId) {
            console.log(this.props.templateId);
            this.load(this.props.templateId);
        }
    }

    //update the position of a child component
    updatePos = (id, left, top) => {
        if (!id) return;
        //store the new position of the component
        let newStyles = this.state.styles;
        newStyles[id] = { ...this.state.styles[id], top: top, left: left };
        //change the component that needs to rerender
        let components = this.state.comps;
        //"reprop" the component because render cannot rerender an array
        components[this.state.scene][id] = React.cloneElement(
            components[this.state.scene][id],
            {
                top: top,
                left: left,
                id: id,
                style: { ...this.state.styles[id], top: top, left: left },
            }
        );
        //save the state
        this.setState({
            ...this.state,
            comps: components,
            styles: newStyles,
        });
    };

    styleGetter = (id) => {
        return this.state.styles[id];
    };

    styleSetter = (newStyle, id) => {
        let tmpStyle = this.state.styles;
        tmpStyle[id] = { ...newStyle };
        this.setState({ ...this.state, styles: tmpStyle });
    };

    contentSetter = (newContent, id, callback) => {
        let tmpContent = this.state.content;
        tmpContent[id] = { ...tmpContent[id], ...newContent };
        let components = this.state.comps;
        components[this.state.scene][id] = React.cloneElement(
            components[this.state.scene][id],
            {
                top: this.state.styles[id].top,
                left: this.state.styles[id].left,
                id: id,
                content: tmpContent[id],
            }
        );
        let sceneref = this.state.sceneRef;
        if (
            Object.keys(newContent).includes('src') &&
            Object.keys(newContent).includes(id)
        ) {
            delete sceneref[id];
        }
        this.setState(
            {
                ...this.state,
                content: tmpContent,
                comps: components,
                sceneRef: sceneref,
            },
            () => {
                callback();
            }
        );
    };

    propertySetter(setterFunction, properties) {
        this.setState({
            ...this.state,
            propertySetter: setterFunction,
            properties: properties,
        });
    }

    setScene = (i) => {
        this.state.propertySetter({
            property: this.state.properties.default,
            changeFunc: undefined,
            style: null,
            id: null,
            contentChanger: null,
        });
        this.setState({
            ...this.state,
            scene: i,
        });
    };

    addScene = () => {
        this.state.propertySetter({
            property: this.state.properties.default,
            changeFunc: undefined,
            style: null,
            id: null,
            contentChanger: null,
        });
        let components = this.state.comps;
        components.push({});
        this.setState({
            ...this.state,
            comps: components,
            scene: components.length - 1,
        });
    };

    createDragComp = (extendedStyles, extendedContent, type) => {
        let extendedClasses = this.state.classNames;
        extendedClasses[this.state.id] = 'comp';
        let addedcomp = this.state.comps;
        addedcomp[this.state.scene][this.state.id] = (
            <DragComp
                key={this.state.id}
                id={this.state.id}
                className='comp'
                draggable='false'
                style={this.state.styles[this.state.id]}
                changedDrop={this.drop}
                menuSetter={this.state.propertySetter}
                displayProperties={this.state.properties}
                type={type}
                content={this.state.content[this.state.id]}
                contentSetter={this.contentSetter}
                contentGetter={(id) => {
                    return this.state.content[id];
                }}
                styleSetter={this.styleSetter}
                styleGetter={this.styleGetter}
                scenes={
                    type === 'Button'
                        ? () => {
                              return this.state.comps.length;
                          }
                        : undefined
                }
                getSceneRef={
                    type === 'Button'
                        ? (id) => {
                              return this.state.sceneRef[id];
                          }
                        : undefined
                }
                setSceneRef={
                    type === 'Button'
                        ? (id, scene) => {
                              let newSceneref = this.state.sceneRef;
                              if (scene !== 'Select Page')
                                  newSceneref = {
                                      ...this.state.sceneRef,
                                      [id]: scene,
                                  };
                              this.setState({
                                  ...this.state,
                                  sceneRef: newSceneref,
                                  content: {
                                      ...this.state.content,
                                      [id]: {
                                          ...this.state.content[id],
                                          src: 'Input Source',
                                      },
                                  },
                              });
                          }
                        : undefined
                }
                sceneSetter={this.setScene}
                getclass={(id) => {
                    return this.state.classNames[id];
                }}
                setclass={(id, newclass) => {
                    this.setState({
                        ...this.state,
                        classNames: {
                            ...this.state.classNames,
                            [id]: newclass,
                        },
                    });
                }}
            ></DragComp>
        );

        //update all the things in the state
        let oldId = this.state.id;
        this.setState({
            ...this.state,
            comps: addedcomp,
            id: oldId + 1,
            styles: extendedStyles,
            content: extendedContent,
            classNames: extendedClasses,
        });
        return oldId;
    };
    drop = (e) => {
        e.preventDefault();
        let comp_id = e.dataTransfer.getData('compId');
        let canvasComp = document.getElementById('canvas');
        let rect = canvasComp.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top; //y position within the element.
        this.updatePos(comp_id, x, y);
    };

    handleBack = () => {
        this.props.history.push('/dashboard');
    };

    loadComp = (entity) => {
        console.log(this.state);
        let extendedStyles = this.state.styles;
        extendedStyles[this.state.id] = entity.style;
        let extendedContent = this.state.content;
        extendedContent[this.state.id] = {
            content: 'Input Content',
            src: 'Input Source',
        };
        if (entity.kind == 'Text') {
            extendedContent[this.state.id].content = entity.content;
        } else if (entity.kind == 'Image') {
            extendedContent[this.state.id].src = entity.src;
        } else if (entity.kind == 'Button') {
            extendedContent[this.state.id].content = entity.content;
            extendedContent[this.state.id].src = entity.src;
            let extendedSceneRef = this.state.sceneRef;
            extendedSceneRef[this.state.id] = entity.sceneRef;
            this.setState({
                ...this.state,
                sceneRef: extendedSceneRef,
            });
        }
        return this.createDragComp(
            extendedStyles,
            extendedContent,
            entity.kind
        );
    };

    redefineProps = (self) => {
        let components = self.state.comps;
        for (let sceneid = 0; sceneid < self.state.comps.length; sceneid++) {
            Object.keys(self.state.comps[sceneid]).forEach(function (id) {
                components[sceneid][id] = React.cloneElement(
                    components[sceneid][id],
                    {
                        menuSetter: self.state.propertySetter,
                        displayProperties: self.state.properties,
                    }
                );
            });
        }
        this.setState({
            ...this.state,
            comps: components,
        });
    };

    load = (templateId) => {
        // let templateId = window.prompt(
        //     'Enter template id (TODO hookup to template browser instead of prompt)',
        //     ''
        // );
        let template = loadTemplate(templateId);
        let self = this;
        Promise.resolve(template).then((newTemplate) => {
            if (newTemplate.numScenes == 0) {
                return;
            }
            Promise.all(newTemplate.scenes).then((newScenes) => {
                Promise.all(
                    newScenes.map(function (sceneElems) {
                        return Promise.all(sceneElems.entities);
                    })
                ).then((newScenes) => {
                    if (newScenes.length == 0) {
                        return;
                    }
                    self.state = {
                        canvasColor: newTemplate.canvasColor,
                        canvasHeight: newTemplate.canvasHeight,
                        canvasWidth: newTemplate.canvasWidth,
                        styles: {},
                        comps: [],
                        scene: 0,
                        id: 0,
                        content: {},
                        sceneRef: {},
                        classNames: {},
                    };

                    var sceneNum = 0;
                    newScenes.forEach(function (scene) {
                        self.state.comps.push({});
                        self.state.scene = sceneNum;
                        scene.forEach(function (entity) {
                            let compId = self.loadComp(entity);
                            self.updatePos(
                                compId,
                                parseFloat(entity.style.left),
                                parseFloat(entity.style.top)
                            );
                        });
                        sceneNum++;
                    });
                    this.setState({
                        ...this.state,
                        scene: 0,
                    });
                    this.redefineProps(self);
                });
            });
        });
    };

    render() {
        return (
            <Flex direction='column' h='100vh' width='100%' overflow='scroll'>
                <Box
                    flex={{ sm: '9', lg: '6', xl: '17' }}
                    zIndex={1}
                    bg={'#2b2b2b'}
                    overflow='hidden'
                >
                    <ActualCanvasComponent
                        comps={Object.values(
                            this.state.comps[this.state.scene]
                        )}
                        bg={`rgba(${this.state.canvasColor.r}, ${this.state.canvasColor.g}, ${this.state.canvasColor.b}, ${this.state.canvasColor.a})`}
                        h={`${this.state.canvasHeight}px`}
                        w={`${this.state.canvasWidth}px`}
                        changedDrop={this.drop}
                    />
                </Box>
            </Flex>
        );
    }
}

export default LinkView;
