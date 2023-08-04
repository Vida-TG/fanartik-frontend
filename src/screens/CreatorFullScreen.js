import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessageBox';
import { Box, Flex, Avatar, Text, Skeleton, Heading, Button } from '@chakra-ui/react';
import { toast } from 'react-toastify';

function CreatorFullScreen() {
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creator, setCreator] = useState({});
  const [arts, setArts] = useState([]);
  const [totalArts, setTotalArts] = useState(0);

  useEffect(() => {
    const fetchCreatorDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/users/creator-profile/${id}`);
        setCreator(data.creator);
        setArts(data.arts);
        setTotalArts(data.totalArts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch creator details');
        toast.error(err)
        setLoading(false);
      }
    };
    fetchCreatorDetails();
  }, [id]);

  return (
    <Box p="20px">
      <Helmet>
        <title>Creator Profile</title>
      </Helmet>
      {loading ? (
        <Box pt="30px">
          <Skeleton h='400' w='100%'/>
        </Box>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Flex direction="column" alignItems="center">
          <Avatar size="2xl" name={creator.name} src={creator.image} />
          <Heading mt="2" size="lg">
            {creator.name}
          </Heading>
          <Text color="gray.600">@{creator.username}</Text>
          <Text mt="2" color="gray.600">
            Date Joined: {new Date(creator.createdAt).toLocaleDateString()}
          </Text>
          <Text mt="2" color="gray.600">
            Total Arts: {totalArts}
          </Text>
          <Box mt="4">
            <Heading size="md">Artworks by {creator.name}</Heading>
            <Flex mt="2" flexWrap="wrap" justifyContent="center">
              {arts.map((art) => (
                <Box key={art._id} m="10px" borderWidth="1px" borderRadius="lg" overflow="hidden" w="250px">
                  <Box h="150px" bg="gray.200" bgImage={`url(${art.image})`} bgSize="cover" />
                  <Box p="4">
                    <Heading fontSize="md" mb="2">
                      {art.name}
                    </Heading>
                    <Text fontSize="sm">Price: ${art.price}</Text>
                  </Box>
                </Box>
              ))}
            </Flex>
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default CreatorFullScreen;
