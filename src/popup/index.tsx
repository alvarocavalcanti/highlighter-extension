import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Container, Button, ListGroup, Form } from "react-bootstrap";
import { browserAPI } from "../utils/browser-api";
import Help from './Help';
import "./popup.css";

interface Highlight {
  url: string;
  text: string;
  color: string;
}

const HIGHLIGHT_COLORS = {
  green: "#90EE90",
  yellow: "#FFEB3B",
  salmon: "#FA8072",
  babyBlue: "#89CFF0",
};

const Popup = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [showCurrentUrlOnly, setShowCurrentUrlOnly] = useState(true);
  const [defaultColor, setDefaultColor] = useState<string>("#90EE90"); // green default
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentView, setCurrentView] = useState<'main' | 'help'>('main');

  useEffect(() => {
    // Get current settings
    browserAPI.storage.local
      .get(["highlights", "defaultColor", "pageSize"])
      .then((result) => {
        setHighlights(result.highlights || []);
        setDefaultColor(result.defaultColor || "#90EE90");
        setPageSize(result.pageSize || 5);
      });

    // Get current tab URL
    browserAPI.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => {
        if (tabs[0]?.url) {
          setCurrentUrl(tabs[0].url);
        }
      });
  }, []);

  const filteredHighlights = showCurrentUrlOnly
    ? highlights.filter((h) => h.url === currentUrl)
    : highlights;

  const pageCount = Math.ceil(filteredHighlights.length / pageSize);
  const paginatedHighlights = filteredHighlights.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleUrlClick = (url: string) => {
    browserAPI.tabs.create({ url, active: true });
  };

  const handleColorChange = (color: string) => {
    setDefaultColor(color);
    browserAPI.storage.local.set({ defaultColor: color });
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    browserAPI.storage.local.set({ pageSize: size });
  };

  return (
    <Container className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Highlighter</h4>
        <Button 
          variant="link" 
          className="p-0 text-decoration-none small"
          onClick={() => setCurrentView(currentView === 'main' ? 'help' : 'main')}
        >
          {currentView === 'main' ? 'Help' : 'Back'}
        </Button>
      </div>

      {currentView === 'main' ? (
        <>
          <Form className="mb-3">
            <Form.Group>
              <Form.Label>Highlight color</Form.Label>
              <div className="d-flex gap-2 mb-3">
                {Object.entries(HIGHLIGHT_COLORS).map(([name, color]) => (
                  <button
                    key={color}
                    className={`color-button ${
                      defaultColor === color ? "active" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                    title={name}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Check
              type="checkbox"
              id="url-filter"
              label="Show highlights for current page only"
              checked={showCurrentUrlOnly}
              onChange={(e) => setShowCurrentUrlOnly(e.target.checked)}
            />
          </Form>
          <ListGroup className="mb-3">
            {paginatedHighlights.length > 0 ? (
              paginatedHighlights.map((highlight, index) => (
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
                    <span style={{ backgroundColor: highlight.color }}>
                      {highlight.text}
                    </span>
                  </div>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      const newHighlights = highlights.filter((_, i) =>
                        showCurrentUrlOnly
                          ? highlights[i].url !== highlight.url ||
                            highlights[i].text !== highlight.text
                          : i !== index
                      );
                      browserAPI.storage.local
                        .set({ highlights: newHighlights })
                        .then(() => setHighlights(newHighlights));
                    }}
                  >
                    Remove
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="text-center text-muted">
                {showCurrentUrlOnly
                  ? "No highlights on this page"
                  : "No highlights yet"}
              </ListGroup.Item>
            )}
          </ListGroup>

          {(pageCount > 1 || paginatedHighlights.length > 0) && (
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2">
                {[5, 10].map(size => (
                  <Button
                    key={size}
                    variant={pageSize === size ? "primary" : "outline-primary"}
                    size="sm"
                    onClick={() => handlePageSizeChange(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              
              {pageCount > 1 && (
                <div className="d-flex gap-2">
                  {[...Array(pageCount)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "primary" : "outline-primary"}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <Help />
      )}
    </Container>
  );
};

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>
  );
}
