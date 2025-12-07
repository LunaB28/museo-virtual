import React, { useRef, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import '../FlipBook.css';

const PageCover = forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <h2 className="page-header">Page header - {props.number}</h2>
        <div className="page-image"></div>
        <div className="page-text">{props.children}</div>
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  );
});

const FlipBook = ({ pages = [] }) => {
  const flipBookRef = useRef(null);

  return (
    <div className="flipbook-container">
      <HTMLFlipBook
        width={380}
        height={550}
        size="fixed"
        minWidth={280}
        maxWidth={450}
        minHeight={400}
        maxHeight={650}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="demo-book"
        ref={flipBookRef}
      >
        <PageCover>BOOK TITLE</PageCover>
        
        {pages.map((pageContent, index) => (
          <Page key={index} number={index + 1}>
            {pageContent}
          </Page>
        ))}
        
        <PageCover>THE END</PageCover>
      </HTMLFlipBook>
    </div>
  );
};

export default FlipBook;
