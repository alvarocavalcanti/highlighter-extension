import React from "react";
import { Container } from "react-bootstrap";

const Help = () => {
  return (
    <>
      <Container className="p-3">
        <h4 className="mb-3">Usage</h4>
        <ol className="ps-3">
          <li>Select text on any webpage</li>
          <li>Right-click and choose "Highlight Selection"</li>
          <li>The text will be highlighted with your chosen color</li>
          <li>View and manage your highlights in the main tab</li>
          <li>Click URLs to revisit highlighted pages</li>
        </ol>
      </Container>
      <Container className="p-3">
        <h4 className="mb-3">Limitations</h4>
        <ul className="ps-3">
          <li>
            Selecting links works when you first highlight it, but not upon
            returning to the page
          </li>
          <li>
            Selecting single words or common passages causes all of their
            occurrences to be highlighted
          </li>
        </ul>
      </Container>
      <a href='https://ko-fi.com/O4O1WSP5B' target='_blank' rel="noreferrer"><img height='36' style={{border:0, height:'36px'}} src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' alt='Buy Me a Coffee at ko-fi.com' /></a>
    </>
  );
};

export default Help;
