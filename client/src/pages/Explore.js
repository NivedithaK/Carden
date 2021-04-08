import React, { Component } from 'react';
import { Box, VStack, Heading, Flex } from '@chakra-ui/react';
import { SearchBar, SearchFilter } from '../components/SearchBar.js';
import { IndexedGallery } from '../components/ImageGallery.js';
import TwoGrid from '../components/TwoGrid.js';
import CardViewWrapper from '../components/CardViewWrapper';
import Sidebar from '../components/SideBar/SideBar.js';
import {
    getPopularTemplates,
    getNewTemplates,
    getOldTemplates,
    getAlphabeticalTemplates,
    getTemplateSearch,
} from '../actions/cardActions';
import { connect } from 'react-redux';
import { adjustLikeTemplate } from '../actions/likeActions';

import PropTypes from 'prop-types';

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popularTemplates: [],
            oldTemplates: [],
            newestTemplates: [],
            alphabeticalTemplates: [],
            templates: [],
            templateIndex: 0,
        };
    }

    async componentDidMount() {
        let popularTemplates = [];
        let oldTemplates = [];
        let newestTemplates = [];
        let alphabeticalTemplates = [];

        await getPopularTemplates('').then((templates) => {
            popularTemplates = templates;
        });

        await getOldTemplates('').then((templates) => {
            oldTemplates = templates;
        });

        await getNewTemplates('').then((templates) => {
            newestTemplates = templates;
        });

        await getAlphabeticalTemplates('').then((templates) => {
            alphabeticalTemplates = templates;
        });

        this.setState({
            popularTemplates,
            oldTemplates,
            newestTemplates,
            alphabeticalTemplates,
            templates: popularTemplates,
        });
    }
    changeFilter = (value) => {
        if (value === 'Alphabetical')
            this.setState({ templates: this.state.alphabeticalTemplates });
        else if (value === 'Popularity')
            this.setState({ templates: this.state.popularTemplates });
        else if (value === 'Newest')
            this.setState({ template: this.state.newestTemplates });
        else if (value === 'Oldest')
            this.setState({ template: this.state.oldTemplates });
    };

    searchTemplates = async (search) => {
        await getTemplateSearch(search).then((templates) => {
            this.setState({ templates });
        });
    };

    handleLike = async (i) => {
        const templateid = this.state.templates[i]._id;
        const inc = await this.props.adjustLikeTemplate(templateid);
        const templates = [...this.state.templates];
        templates[i].stars += inc;

        this.setState({
            templates,
        });
    };

    render() {
        let TwoGrids = [];
        // Make as many TwoGrids as possible with the templates
        const templates = this.state.templates;
        let i = 0;
        for (i = 0; i < templates.length - 1; i += 2) {
            TwoGrids.push(
                <TwoGrid key={i}>
                    <CardViewWrapper
                        username={templates[i].postUser}
                        numlikes={templates[i].stars}
                        title={templates[i].title}
                        handler={this.handleLike}
                        index={i}
                    />
                    <CardViewWrapper
                        username={templates[i + 1].postUser}
                        numlikes={templates[i + 1].stars}
                        title={templates[i + 1].title}
                        handler={this.handleLike}
                        index={i + 1}
                    />
                </TwoGrid>
            );
        }
        // Add the last template
        if (i === templates.length - 1) {
            TwoGrids.push(
                <TwoGrid key={i}>
                    <CardViewWrapper
                        username={templates[i].postUser}
                        numlikes={templates[i].stars}
                        title={templates[i].title}
                        handler={this.handleLike}
                        key={i}
                        index={i}
                    />
                </TwoGrid>
            );
        }
        return (
            <div>
                <Flex width='100%' height='100%' flex-direction='row'>
                    <Sidebar
                        isLoggedin={this.state.isLoggedin}
                        history={this.props.history}
                    />
                    <Box width='80%' height='100%' p={8}>
                        <VStack mb={5} h='100%' bg='palette.500'>
                            <Heading
                                color={('palette.200', 'palette.600')}
                                mr='auto'
                            >
                                Browse Templates
                            </Heading>
                            <VStack spacing='1em' w='100%'>
                                <SearchBar
                                    searchTemplates={this.searchTemplates}
                                />
                                <SearchFilter
                                    changeFilter={this.changeFilter}
                                />
                            </VStack>
                            <Box w='100%' h='70vh'>
                                <IndexedGallery>
                                    {TwoGrids ? TwoGrids : ''}
                                </IndexedGallery>
                            </Box>
                        </VStack>
                    </Box>
                </Flex>
            </div>
        );
    }
}
Explore.propTypes = {
    auth: PropTypes.object,
    adjustLikeTemplate: PropTypes.func.isRequired,
};
// This is the user state from the reducer.
const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error,
});

export default connect(mapStateToProps, { adjustLikeTemplate })(Explore);
