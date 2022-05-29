import React, { useRef, useState } from 'react';

function SearchEmployee({ onSubmit }) {
    const [searchTerm, setSerachTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    const handleChangeSearchTerm = (e) => {
        const value = e.target.value;
        setSerachTerm(value);

        if (!onSubmit) return;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValue = {
                searchTerm: value
            }
            onSubmit(formValue);
        }, 0);
    }
    return (
        <form className='search-product mb-20'>
            <input className='search__input'
                placeholder='Tìm kiếm sản phẩm'
                onChange={handleChangeSearchTerm}
                value={searchTerm}
            />
        </form>
    );
}

export default SearchEmployee;