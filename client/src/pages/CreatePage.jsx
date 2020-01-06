import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hooks";
import { AuthContext } from "../context/Auth.context";

const CreatePage = () => {
  const [link, setLink] = useState("");
  const { request } = useHttp();
  const history = useHistory();
  const auth = useContext(AuthContext);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async e => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        console.log(data);
        history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2 rem" }}>
        <div className="input-field">
          <input
            placeholder="Enter link"
            id="link"
            type="email"
            autoComplete="off"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Enter link</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
