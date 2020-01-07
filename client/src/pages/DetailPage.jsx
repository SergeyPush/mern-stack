import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hooks";
import { AuthContext } from "../context/Auth.context";
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";

const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      console.log("Fetched link " + fetched);
      setLink(fetched);
    } catch (error) {
      console.log(error);
    }
  }, [request, linkId, token]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <div>{!loading && link && <LinkCard link={link} />}</div>;
};

export default DetailPage;
