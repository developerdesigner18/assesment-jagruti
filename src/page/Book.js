import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { Button, Card, Col, Flex, Input, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Back from "../assets/New Assets/Back.svg"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import search from "../assets/New Assets/Search.svg";

const { Meta } = Card;

const Books = () => {
    const { id } = useParams();
    const [items, setItems] = useState([]);
    // const [books, setBooks] = useState([])
    const [page, setPage] = useState();
    const [loading, setLoading] = useState(false);
    const lastItemRef = useRef(null);
    const [searchmode, setSearchmode] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [searchPage, setSearchPage] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [loadingNextPage, setLoadingNextPage] = useState(false);
    const Navigate = useNavigate();
    useEffect(() => {

        fetchData();
    }, []);
    useEffect(() => {
        const handleScrollDebounced = debounce(handleScroll, 200);
        window.addEventListener('scroll', handleScrollDebounced);
        setLoading(false)

        return () => {
            window.removeEventListener('scroll', handleScrollDebounced);
        };
    }, [items]);
    const fetchData = async (nextPage) => {
        try {
            if (loading) {
                return;
            }
            const url = nextPage
                ? `http://skunkworks.ignitesol.com:8000/books/?page=${nextPage}&topic=${id}&mime_type=image/jpeg`
                : `http://skunkworks.ignitesol.com:8000/books/?topic=${id}&mime_type=image/jpeg`;

            const response = await axios.get(url);

            if (nextPage) {
                const data = response.data.results

                setLoading(false);
                setItems((prevItems) => [...prevItems, ...data]);
                const nextNumber = response.data.next ? new URL(response.data.next).searchParams.get('page') : null;

                setPage(nextNumber);
            } else {
                const data = response.data.results

                setLoading(false);
                setItems([...data]);
                const nextNumber = response.data.next ? new URL(response.data.next).searchParams.get('page') : null;
                setPage(nextNumber);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoadingNextPage(false)
            setLoadingMore(false);
        }
    };

    const handleScroll = () => {
        if (!loadingMore && lastItemRef.current) {
            const lastItemRect = lastItemRef.current.getBoundingClientRect();

            if (lastItemRect.top <= window.innerHeight) {
                setLoadingMore(true);
            }
            if (searchmode) {
                handleSearch(searchValue, searchPage);
            } else {
                fetchData(page);
            }
        }
    };
    const handleSearch = async (value, searchPage) => {
        try {
            const response = await axios.get(`http://skunkworks.ignitesol.com:8000/books/?topic=${id}&mime_type=image/jpeg&search=${value}&page=${searchPage}`);
            setItems(response.data.results)


            const nextPageResponse = response.data.next ? new URL(response.data.next).searchParams.get('page') : null;
            console.log(nextPageResponse, "nextpageresponse");
            if (nextPageResponse) {
                setItems((prevItems) => [...prevItems, ...response.data.results]);
            }
            setSearchPage(nextPageResponse);
            setSearchmode(true);
        } catch (err) {
            console.error('Error searching:', err);
        }
    };
    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        handleSearch(value, 1);
    };
    const handleClick = () => {
        Navigate("/")
    }
    const renderAuthors = (authors) => {

        return authors.map((author) => (
            <div key={author.name}>
                <div> {author.name}</div>
            </div>
        ));
    };
    const handleCard = (book) => {
        if (book.formats["text/html"]) {
            window.location.href = `https://www.gutenberg.org/ebooks/${book.id}.html.images`;
        }

        else if (book.formats['text/plain; charset=us-ascii']) {
            window.location.href = `https://www.gutenberg.org/files/${book.id}/${book.id}-0.txt`;
        } else if (book.formats["text/plain"]) {
            window.location.href = `https://www.gutenberg.org/ebooks/${book.id}.txt.utf-8`
        }
        else if (book.formats["image/jpeg"]) {
            window.location.href = `https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`;
        } else if (book.formats["application/epub+zip"]) {
            alert("No viewable version available")
        } else if (book.formats["application/octet-stream"]) {
            alert("No viewable version available")
        } else if (book.formats["application/rdf+xml"]) {
            alert("No viewable version available")
        } else if (book.formats["application/x-mobipocket-ebook"]) {
            alert("No viewable version available")
        }

    }

    return (

        <div className='books-main-div' style={{ textAlign: "center" }}>

            {loading || loadingNextPage ? (
                "Loading..."
            ) : <div>
                <div className='books-div'>
                    <div className='div-button-span'>
                        <button className='fiction-button' onClick={handleClick} style={{ border: "none", background: "none" }} >
                            <Flex align="center" gap={20}>
                                <img className='image-button' src={Back} alt="Left Image" />
                                <span className='span-button' style={{ border: "none", height: "20px", cursor: "pointer", color: "#5E56E7" }}>
                                    {id}
                                </span>
                            </Flex>
                        </button>
                        <div>

                            <Input
                                size="large"
                                type='search'
                                className='search-input'
                                placeholder='Search'
                                onChange={(e) => handleSearchInputChange(e)}
                                prefix={<img src={search} className="text-primary" />}
                            />

                        </div>
                    </div>
                </div>
                <div className='card-container-card'>
                    <div className='card-container'>
                        {
                            items.length > 0 ? (
                                <Row className='row-books'>
                                    {items.map((item, index) => (
                                        <Col key={index} lg={{
                                            span: 6,
                                            offset: 2,
                                        }} xs={{ span: 12 }} sm={{
                                            span: 6,
                                            offset: 2,
                                        }} md={{
                                            span: 6,
                                            offset: 2,
                                        }} xl={{
                                            span: 2,
                                            offset: 2,
                                        }}>
                                            <div className='cardbook'
                                                key={index} ref={index == items.length - 1 ? lastItemRef : null}>
                                                <img onClick={() => handleCard(item)} className='imagecover' alt={item.title} src={item.formats["image/jpeg"]} />
                                                <h5 className='para-title-heading'>{item.title.toUpperCase()} </h5>
                                                <p className='author '>{renderAuthors(item.authors)}</p>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                "No book found"
                            )
                        }
                    </div>
                </div>

            </div>}
        </div >
    );
};

export default Books;
