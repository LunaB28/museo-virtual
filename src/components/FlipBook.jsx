import React, { useState, useEffect, useRef, forwardRef } from 'react';
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
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [state, setState] = useState('');
  const [orientation, setOrientation] = useState('');
  const flipBookRef = useRef(null);

  useEffect(() => {
    if (flipBookRef.current) {
      const pageFlip = flipBookRef.current.pageFlip();
      if (pageFlip) {
        setTotalPage(pageFlip.getPageCount());
      }
    }
  }, [pages]);

  const nextButtonClick = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevButtonClick = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const onPage = (e) => {
    setPage(e.data);
  };

  const onChangeOrientation = (e) => {
    setOrientation(e.data);
  };

  const onChangeState = (e) => {
    setState(e.data);
  };

  return (
    <div className="flipbook-container">
      <HTMLFlipBook
        width={550}
        height={733}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={onPage}
        onChangeOrientation={onChangeOrientation}
        onChangeState={onChangeState}
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

      <div className="flipbook-controls">
        <div className="controls-buttons">
          <button type="button" onClick={prevButtonClick} className="flip-btn">
            Previous page
          </button>

          <span className="page-info">
            [<span>{page}</span> of <span>{totalPage}</span>]
          </span>

          <button type="button" onClick={nextButtonClick} className="flip-btn">
            Next page
          </button>
        </div>
        
        <div className="controls-info">
          State: <i>{state}</i>, orientation: <i>{orientation}</i>
        </div>
      </div>
    </div>
  );
};

export default FlipBook;
