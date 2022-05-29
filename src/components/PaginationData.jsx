import React from 'react';
import { Pagination } from 'react-bootstrap';


function PaginationData({ currentPage, setCurrentPage, sizePage, totalPage }) {
    const handleFirst = () => {
        setCurrentPage(0);
    }
    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
    }
    const handleLast = () => {
        setCurrentPage(totalPage - 1);
    }
    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    }

    return (
        <Pagination>
            <Pagination.First disabled={currentPage === 0} onClick={handleFirst} />
            <Pagination.Prev disabled={currentPage === 0} onClick={handlePrev} />

            {totalPage > 1 ?
                <Pagination.Item active={currentPage === 0} onClick={() => {
                    setCurrentPage(0);
                }}>
                    {0}
                </Pagination.Item>
                : null
            }

            {currentPage > 1 ? (
                <>
                    <Pagination.Ellipsis />
                </>
            ) : null}

            {totalPage > 1 && currentPage < totalPage - 2 && currentPage > 2 ?
                <Pagination.Item onClick={() => {
                    setCurrentPage(currentPage - 1);
                }}>
                    {currentPage - 1}
                </Pagination.Item>
                : null
            }
            {currentPage < totalPage - 1 && currentPage > 0 ?
                <Pagination.Item active={currentPage} onClick={() => {
                    setCurrentPage(currentPage);
                }} >
                    {currentPage}
                </Pagination.Item>
                : null
            }
            {currentPage < totalPage - 2 && currentPage > 1 ?
                <Pagination.Item onClick={() => {
                    setCurrentPage(currentPage + 1);
                }} >
                    {currentPage + 1}
                </Pagination.Item>
                : null
            }

            {totalPage > 1 && totalPage - 2 > currentPage ? <Pagination.Ellipsis /> : null}

            {totalPage > 1 ?
                <Pagination.Item active={currentPage === totalPage - 1} onClick={() => {
                    setCurrentPage(totalPage - 1);
                }}>
                    {totalPage - 1}
                </Pagination.Item>
                : null
            }

            <Pagination.Next disabled={currentPage === totalPage - 1} onClick={handleNext} />
            <Pagination.Last disabled={currentPage === totalPage - 1} onClick={handleLast} />
        </Pagination>
    );
}

export default PaginationData;