import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { Button, Card, Flex, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Back from "../assets/New Assets/Back.svg"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import search from "../assets/New Assets/Search.svg";

const { Meta } = Card;

const Books = () => {
    const { id } = useParams();
    console.log(id, "topic")
    const [items, setItems] = useState([]);
    const [books, setBooks] = useState([])
    const [page, setPage] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const lastItemRef = useRef(null);
    const [searchmode, setSearchmode] = useState(false)
    const Navigate = useNavigate();
    useEffect(() => {

        fetchData();
    }, []);
    useEffect(() => {
        // Add event listener for scrolling with debouncing
        const handleScrollDebounced = debounce(handleScroll, 200);
        window.addEventListener('scroll', handleScrollDebounced);
        setLoading(false)
        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScrollDebounced);
        };
    }, [items]);
    const fetchData = async (nextPage) => {
        try {
            if (loading) {
                return;
            }
            // setLoading();
            console.log(nextPage, "nextpage")
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

                // setBooks((prevBooks) => [...prevBooks, ...response.data.results]);
                // setSearchValue((prevBooks) => [...prevBooks, ...response.data.results]);
            } else {
                const data = response.data.results

                setLoading(false);
                setItems([...data]);
                const nextNumber = response.data.next ? new URL(response.data.next).searchParams.get('page') : null;
                setPage(nextNumber);

                // setBooks([...response.data.results]);
                // setSearchValue([...response.data.results]);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleScroll = () => {
        if (!searchmode && lastItemRef.current) {
            const lastItemRect = lastItemRef.current.getBoundingClientRect();

            if (lastItemRect.top <= window.innerHeight) {
                fetchData(page);
            }
        }
    };


    // const handleLoadMore = () => {
    //     if (nextPage) {
    //         fetchData(nextPage);
    //     }
    // };

    const handleSearch = async (value) => {
        try {
            console.log(value, "value>>>")

            const response = await axios.get(`http://skunkworks.ignitesol.com:8000/books/?topic=${id}&mime_type=image/jpeg&search=${value}`);
            console.log(response.data.results, "response>>+++")

            setItems(response.data.results);
            setSearchmode(true)

        } catch (err) {
            console.error('Error searching:', err);
        }
    };
    // console.log(searchValue, "searchValue")

    // };
    const handleClick = () => {
        Navigate("/")
    }

    // const filterSearch = books.filter((book) =>
    //     book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    //     (book.authors && book.authors.some(author => author.name.toLowerCase().includes(searchValue.toLowerCase())))
    // );

    const renderAuthors = (authors) => {

        return authors.map((author) => (
            <div key={author.name}>
                <div> {author.name}</div>
            </div>
        ));
    };
    const handleCard = (book) => {
        console.log(book, "id")
        if (book.formats["text/html"]) {
            window.location.href = `https://www.gutenberg.org/ebooks/${book.id}.html.images`;
        }

        else if (book.formats['text/plain; charset=us-ascii']) {
            // console.log("yesss")
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
        //         if (formats == "application/epub+zip") {
        //             alert("zip format is not valid")
        //         } else if (formats == text / plain
        // )

    }

    return (

        <div className='books-main-div' style={{ textAlign: "center" }}>

            {loading ? "Loding" : <>
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
                                type='search'
                                className='search-input'
                                placeholder='Search'
                                // value={searchValue}
                                onChange={(e) => handleSearch(e.target.value)}
                                prefix={<img src={search} className="text-primary" />}
                            />

                        </div>
                    </div>
                </div>
                <div className='card-container'>
                    {/* <div className='card-items'> */}
                    {items.length > 0 ? <>
                        {items.map((item, index) => (
                            <>
                                <div key={index} ref={index === items.length - 1 ? lastItemRef : null}>

                                    <Card
                                        onClick={() => handleCard(item)}
                                        key={index}
                                        className='cardbook '
                                        cover={<img alt={item.title} src={item.formats["image/jpeg"]} />}
                                    >
                                        {/* {book?.map((res) => {
                            console.log(res, "data")
                        })} */}
                                        {/* <Meta title={book.title} description={book.author} /> */}
                                        <Meta title={item.title} description={renderAuthors(item.authors)} />
                                    </Card>
                                </div>
                            </>
                        ))}

                    </> : ("No book found")}
                    {/* </div> */}

                </div>
            </>}
            {/* {nextPage && (
                <button onClick={handleLoadMore} style={{ marginTop: '10px' }}>
                    Load More
                </button>

            )} */}


        </div>
    );
};

export default Books;
