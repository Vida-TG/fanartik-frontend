import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ButtonGroup, Flex, Image } from '@chakra-ui/react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};
export default function CreatorListScreen() {
  const navigate = useNavigate();
  const [{ loading, error, users, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`https://fanartiks.onrender.com/api/users/creators`, {
          headers: { Authorization: userInfo ? `Bearer ${userInfo.token}` : null },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);


  const deleteHandler = async (user) => {
    if (window.confirm('Are you sure to remove creator?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.put(`https://fanartiks.onrender.com/api/users/creators/${user._id}`, {}, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        const retrievedUser = localStorage.getItem("userInfo");
        const parsedUser = JSON.parse(retrievedUser);
        parsedUser.isCreator = false;
        localStorage.setItem("userInfo", JSON.stringify(parsedUser));
        toast.success('Creator removed successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (error) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>Creators</title>
      </Helmet>
      <h1>Creators</h1>

      {loadingDelete && <Flex w="100%" align="center" justify="center"><LoadingBox></LoadingBox></Flex>}
      {loading ? (
        <Flex w="100%" align="center" justify="center"><LoadingBox></LoadingBox></Flex>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className='table-wrap'>
        <table className="table">
          
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <Image src='#' />
                </td>
                <td>{user.name}</td>
                <td>@{user.username}</td>
                <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/book-creator/${user._id}`)}
                    >
                      Book Artist
                    </Button>
                </td>
                { userInfo && userInfo.isAdmin &&
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/admin/user/${user._id}`)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => deleteHandler(user)}
                    >
                      Remove
                    </Button>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
