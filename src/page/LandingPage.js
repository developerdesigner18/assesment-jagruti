import React from 'react'
import { Button, Col, Flex, Form, Input, Row, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import fiction from "../assets/New Assets/Fiction.svg"
import drama from "../assets/New Assets/Drama.svg"
import Humour from "../assets/New Assets/Humour.svg"
import Politics from "../assets/New Assets/Politics.svg"
import Philosophy from "../assets/New Assets/Philosophy.svg"
import History from "../assets/New Assets/History.svg"
import Adventure from "../assets/New Assets/Adventure.svg"
import Next from "../assets/New Assets/Next.svg"
import { useNavigate } from 'react-router-dom';
import "../assets/css/index.css"

const { Title } = Typography;

const LandingPage = () => {
    const Navigate = useNavigate()

    const handleClick = (topic) => {
        Navigate(`/book/${topic}`);
    };
    const arr = [
        {
            title: "Fiction",
            img: fiction
        }, {
            title: "Drama",
            img: drama
        }, {
            title: "Humour",
            img: Politics
        }, {
            title: "Politics",
            img: Philosophy
        },
        {
            title: "History",
            img: History
        }, {
            title: "Adventure",
            img: Adventure
        }
    ]
    // const arr = ["Fiction", "Drama", "Humour", "Politics", "Philosophy", "History", "Adventure"]
    return (
        <div className='main-div' style={{ textAlign: "center" }}>
            <div className='Gutenberg-div'>
                <h1 className='title'>Gutenberg
                    Project</h1>
                <h6 className='para-title'>A social cataloging website that allows you to
                    freely search its database of books,
                    annotations, and reviews.</h6>
                <div>
                    <Row gutter={[16, 16]} justify="center">

                        {arr.map((data) => {
                            console.log(data, "data_mappp")
                            return <Col xs={24} lg={{ span: 12 }}> <Form.Item className='formitem' >
                                <Flex className='flex' vertical gap="small">
                                    <Button className='button' onClick={() => handleClick(data.title)}>
                                        <Flex gap="small" align="center" justify='space-between'>
                                            <Flex gap="small" align="center" justify='space-between'> <img className='image-button' src={data.img} alt="Left Image" />
                                                <span className='span-button' style={{ border: "none", cursor: "pointer" }}>
                                                    {data.title}
                                                </span></Flex>
                                            <div >
                                                <img className='image-button' src={Next} />
                                                {/* <ArrowRightOutlined /> */}
                                            </div>

                                        </Flex>
                                    </Button>
                                    {/*  */}

                                </Flex>
                            </Form.Item>
                            </Col>

                        })}

                    </Row>

                </div>

            </div>

        </div >

    )
}

export default LandingPage
