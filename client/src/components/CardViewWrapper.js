import React from 'react';
import { Center, Box, VStack, HStack, Text, Icon } from '@chakra-ui/react';

import CardView from './CardView.js';

import { AiFillHeart } from 'react-icons/ai';

function CardViewWrapper(props) {
	const { title, username, numlikes, handler, index, templateId } = props;
	console.log("Hello", props);
	return (
		<VStack {...props}>
			<Center>
				<CardView handler={handler} index={index} templateId={templateId} />
			</Center>

            <HStack w='100%'>
                <VStack>
                    <Text fontSize='md' fontWeight='bold' mr='auto'>
                        {title}
                    </Text>
                    {/* <Text fontSize='md' mr='auto'>
                        {username}
                    </Text> */}
                </VStack>

                <Box ml='auto' mb='auto'>
                    <HStack>
                        <Icon as={AiFillHeart} color='red' />
                        <Text fontSize='sm' color='red'>
                            {numlikes}
                        </Text>
                    </HStack>
                </Box>
            </HStack>
        </VStack>
    );
}

export default CardViewWrapper;
