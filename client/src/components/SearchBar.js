import React from 'react';
import { useState } from 'react';
import {
    Center,
    Box,
    HStack,
    Flex,
    Text,
    Button,
    Icon,
    Input,
    Radio,
    RadioGroup,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function SearchBar({ searchTemplates }) {
    const [search, setSearch] = useState('');
    const handleSearchChange = (event) => setSearch(event.target.value);

    return (
        <HStack w='100%' h='7vh'>
            <Box
                w='90%'
                h='100%'
                p={2}
                borderRadius='lg'
                borderWidth='2px'
                boxShadow='Base'
            >
                <Input
                    value={search}
                    h='100%'
                    w='100%'
                    variant='flushed'
                    placeholder='Search...'
                    onChange={handleSearchChange}
                ></Input>
            </Box>
            <Button
                w='10%'
                h='100%'
                minH='7vh'
                bg='palette.400'
                onClick={() => {
                    searchTemplates(search);
                    setSearch('');
                }}
            >
                <Center>
                    <Icon as={SearchIcon} color='palette.500' />
                </Center>
            </Button>
        </HStack>
    );
}

function SearchFilter(props) {
    return (
        <HStack {...props} w='100%'>
            <Text w='20%' mr='auto'>
                Sort By:
            </Text>
            <Box w='80%'>
                <SearchSortRadio changeFilter={props.changeFilter} />
            </Box>
        </HStack>
    );
}

function SearchSortRadio({ changeFilter }) {
    const [value, setValue] = useState('Popularity');
    function updateValue(val) {
        changeFilter(val);
        setValue(val);
    }

    return (
        <RadioGroup onChange={updateValue} value={value} w='100%'>
            <Flex flex-direction='row' w='100%'>
                <Radio colorScheme='gray' flex='1' value='Popularity'>
                    Popularity
                </Radio>
                <Radio colorScheme='gray' flex='1' value='Alphabetical'>
                    Alphabetical
                </Radio>
                <Radio colorScheme='gray' flex='1' value='Oldest'>
                    Oldest
                </Radio>
                <Radio colorScheme='gray' flex='1' value='Newest'>
                    Newest
                </Radio>
            </Flex>
        </RadioGroup>
    );
}

export { SearchBar, SearchFilter };
