import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import TopArtists from "../components/TopArtists";
import HighlightText from "../components/HighlightText";
import TopCarousel from "../components/TopCarousel";
import Featured from "../components/Featured";
import ItemTypes from "../components/ItemTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, arts: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, arts }, dispatch] = useReducer(reducer, {
    arts: [],
    loading: true,
    error: "",
  });
  // const [arts, setArts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("https://fanartiks.onrender.com/api/arts");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setArts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>FanArtiks</title>
      </Helmet>
      <HighlightText />
      <TopCarousel />
      <Featured />
      <ItemTypes />
      <TopArtists />
    </div>
  );
}
export default HomeScreen;
