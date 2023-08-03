import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Flex } from '@chakra-ui/react';
import LoadingBox from '../components/LoadingBox';
import { Store } from '../Store';
import { getError } from '../utils';


export default function RequestListScreen() {
  const [ loading, setLoading ] = useState(false)
  const [ bookings, setBookings ] = useState([])

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`https://fanartiks.onrender.com/api/bookings`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        if(!data.bookings) toast.error(getError("You have no booking yet"));
        else setBookings(data.bookings)
        setLoading(false)
      } catch (err) {
        toast.error(getError(err));
      }
    };
    
    fetchData();

  }, [userInfo]);

  
 

  

  return (
    <div>
      <Helmet>
        <title>Bookings</title>
      </Helmet>
      <h1>Bookings</h1>

      
      {loading ? (
        <Flex w="100%" align="center" justify="center"><LoadingBox></LoadingBox></Flex>
      ) : (
        <div className='table-wrap'>
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PRICE</th>
              <th>DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.user.name}</td>
                <td>{booking.user.email}</td>
                <td>{booking.price}</td>
                <td>{booking.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
