import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Container, Button, ListGroup, Form } from "react-bootstrap";
import { browserAPI } from "../utils/browser-api";
import "./popup.css";

interface Highlight {
  url: string;
  text: string;
}

const Popup = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [showCurrentUrlOnly, setShowCurrentUrlOnly] = useState(true);

  useEffect(() => {
    // Get current tab URL
    browserAPI.tabs.query({ active: true, currentWindow: true })
      .then(tabs => {
        if (tabs[0]?.url) {
          setCurrentUrl(tabs[0].url);
        }
      });

    // Load highlights when popup opens
    browserAPI.storage.local.get({ highlights: [] })
      .then((result) => {
        setHighlights(result.highlights || []);
      });
  }, []);

  const filteredHighlights = showCurrentUrlOnly 
    ? highlights.filter(h => h.url === currentUrl)
    : highlights;

  const handleUrlClick = (url: string) => {
    browserAPI.tabs.create({ url, active: true });
  };

  return (
    <Container className="p-3">
      <h4 className="mb-3">Highlighter Extension</h4>
      <Form className="mb-3">
        <Form.Check 
          type="checkbox"
          id="url-filter"
          label="Show highlights for current page only"
          checked={showCurrentUrlOnly}
          onChange={(e) => setShowCurrentUrlOnly(e.target.checked)}
        />
      </Form>
      <ListGroup className="mb-3">
        {filteredHighlights.length > 0 ? (
          filteredHighlights.map((highlight, index) => (
            <ListGroup.Item 
              key={`${highlight.url}-${highlight.text}`} 
              className="d-flex justify-content-between align-items-center"
            >
              <div className="text-truncate me-2">
                {!showCurrentUrlOnly && (
                  <button 
                    className="text-muted d-block url-link border-0 bg-transparent p-0"
                    onClick={() => handleUrlClick(highlight.url)}
                    title={highlight.url}
                  >
                    {highlight.url}
                  </button>
                )}
                {highlight.text}
              </div>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={() => {
                  const newHighlights = highlights.filter((_, i) => 
                    showCurrentUrlOnly 
                      ? highlights[i].url !== highlight.url || highlights[i].text !== highlight.text
                      : i !== index
                  );
                  browserAPI.storage.local.set({ highlights: newHighlights })
                    .then(() => setHighlights(newHighlights));
                }}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="text-center text-muted">
            {showCurrentUrlOnly ? "No highlights on this page" : "No highlights yet"}
          </ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
};

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>
  );
}
