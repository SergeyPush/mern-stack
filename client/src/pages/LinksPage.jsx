import React, { useState, useCallback, useContext, useEffect } from "react";
import { useHttp } from "../hooks/http.hooks";
import { AuthContext } from "../context/Auth.context";
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";

const LinksPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [links, setLinks] = useState();

  const fetchLinks = useCallback(async () => {
    try {
      const fetchedLinks = await request(`api/link`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLinks(fetchedLinks);
    } catch (error) {
      console.log(error);
    }
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }
  return <div>{!loading && <LinksList links={links} />}</div>;
};

export default LinksPage;
