import React from "react";

const LinkCard = ({ link }) => {
  return (
    <div>
      <h2>Link</h2>
      <p>
        Your Link:{" "}
        <a href={link.to} rel="noopener noreferrer" target="_blank">
          {link.to}
        </a>
      </p>
      <p>
        From link:{" "}
        <a href={link.from} rel="noopener noreferrer" target="_blank">
          {link.from}
        </a>
      </p>
      <p>
        Numbr of clicks: <strong>{link.clicks}</strong>
      </p>
      <p>
        Date of creation <strong>{new Date(link.date).toLocaleString()}</strong>
      </p>
    </div>
  );
};

export default LinkCard;
