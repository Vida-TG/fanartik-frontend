import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Flex } from '@chakra-ui/react';
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
        requests: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'APPROVE_REQUEST':
        return { ...state, loadingApprove: true, successDelete: false };
    case 'APPROVE_SUCCESS':
      return {
        ...state,
        loadingApprove: false,
        successApprove: true,
      };
    case 'APPROVE_FAIL':
      return { ...state, loadingApprove: false };
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
    case 'APPROVE_RESET':
        return { ...state, loadingApprove: false, successApprove: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};
export default function RequestListScreen() {
  const navigate = useNavigate();
  const [{ loading, error, requests, loadingApprove, successApprove, loadingDelete, successDelete }, dispatch] =
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
        const { data } = await axios.get(`https://fanartiks.onrender.com/api/requests`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        console.log(data)
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
    } else if (successApprove) {
        dispatch({ type: 'APPROVE_RESET' });
    } else {
      fetchData();
    }
  }, [userInfo, successApprove, successDelete]);

  
  const approveHandler = async (request) => {
    if (window.confirm('Are you sure to approve?')) {
      try {
        dispatch({ type: 'APPROVE_REQUEST' });
        await axios.post(`https://fanartiks.onrender.com/api/requests/approve/${request._id}`, {}, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Creator request approved');
        dispatch({ type: 'APPROVE_SUCCESS' });
      } catch (error) {
        toast.error(getError(error));
        dispatch({
          type: 'APPROVE_FAIL',
        });
      }
    }
  };


  
  const deleteHandler = async (request) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`https://fanartiks.onrender.com/api/requests/${request._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('request deleted successfully');
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
        <title>Creator Requests</title>
      </Helmet>
      <h1>Creator Requests</h1>

      {loadingDelete && <Flex w="100%" align="center" justify="center"><LoadingBox></LoadingBox></Flex>}
      {loadingApprove && <Flex w="100%" align="center" justify="center"><LoadingBox></LoadingBox></Flex>}
      {loading ? (
        <Flex w="100%" align="center" justify="center"><LoadingBox></LoadingBox></Flex>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className='table-wrap'>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.user._id}</td>
                <td>{request.user.name}</td>
                <td>{request.user.email}</td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => approveHandler(request)}
                  >
                    Approve
                  </Button>
                  &nbsp;
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => deleteHandler(request)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
