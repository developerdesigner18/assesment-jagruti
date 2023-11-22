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
        console.log(topic, "topic")
        Navigate(`/book/${topic}`);
    };
    return (
        <div className='main-div' style={{ textAlign: "center" }}>
            <div className='Gutenberg-div'>
                <h1 className='title'>Gutenberg
                    Project</h1>
                <h6 className='para-title'>A social cataloging website that allows you to
                    freely search its database of books,
                    annotations, and reviews.</h6>
                <Form.Item className='formitem'>
                    <Flex vertical gap="small">
                        <Button className='button' onClick={() => handleClick("Fiction")}>
                            <Flex gap="small" align="center" justify='space-between'>
                                <Flex gap="small" align="center" justify='space-between'> <img className='image-button' src={fiction} alt="Left Image" />
                                    <span className='span-button' style={{ border: "none", cursor: "pointer" }}>
                                        FICTION
                                    </span></Flex>
                                <div >
                                    <img className='image-button' src={Next} />
                                    {/* <ArrowRightOutlined /> */}
                                </div>

                            </Flex>
                        </Button>
                        {/*  */}
                        <Button className='button' onClick={() => handleClick("Drama")}>
                            <Flex gap="small" align="center" justify='space-between'>
                                <Flex gap="small" align="center" justify='space-between' >
                                    <img className='image-button' src={drama} alt="Left Image" />
                                    <span className='span-button' style={{ border: "none", cursor: "pointer" }}>
                                        DRAMA
                                    </span>
                                </Flex>
                                <div>
                                    <img className='image-button' src={Next} />
                                </div>

                            </Flex>
                        </Button>
                        {/* // */}
                        <Button className='button' onClick={() => handleClick("Humour")}>
                            <Flex gap="small" align="center" justify='space-between'>
                                <Flex gap="small" align="center" justify='space-between'>
                                    <img className='image-button' src={Humour} alt="Left Image" />
                                    <span className='span-button' style={{ border: "none", cursor: "pointer" }}>
                                        HUMOUR
                                    </span>
                                </Flex>
                                <div>
                                    <img className='image-button' src={Next} />
                                </div>

                            </Flex>
                        </Button>
                        {/* // */}
                        <Button className='button' onClick={() => handleClick("Politics")}>
                            <Flex gap="small" align="center" justify='space-between'>
                                <Flex gap="small" align="center" justify='space-between'>
                                    <img className='image-button' src={Politics} alt="Left Image" />
                                    <span className='span-button' style={{ border: "none", cursor: "pointer" }}>
                                        POLITICS
                                    </span>
                                </Flex>
                                <div>  <img className='image-button' src={Next} /></div>

                            </Flex>
                        </Button>
                        {/*  */}
                        <Button className='button' onClick={() => handleClick("Philosophy")}>
                            <Flex gap="small" align="center" justify='space-between'>
                                <Flex gap="small" align="center" justify='space-between'>  <img className='image-button' src={Philosophy} alt="Left Image" />
                                    <span className='span-button' style={{ border: "none", cursor: "pointer" }}>
                                        PHILOSOPHY
                                    </span></Flex>
                                <div> <img className='image-button' src={Next} /></div>

                            </Flex>
                        </Button>
                        {/*  */}
                        <Button className='button' onClick={() => handleClick("History")}>
                            <Flex gap="small" align="center" justify='space-between'>
                                <Flex gap="small" align="center" justify='space-between'>
                                    <img className='image-button' src={History} alt="Left Image" />
                                    <span className='span-button' style={{ border: "none", cursor: "pointer" }}>
                                        HISTORY
                                    </span></Flex>
                                <div>
                                    <img className='image-button' src={Next} />
                                </div>

                            </Flex>
                        </Button>
                        {/*  */}
                        <Button className='button' onClick={() => handleClick("Adventure")}>

                            <Flex gap="small" align="center" justify='space-between'>
                                <Flex gap="small" align="center" justify='space-between'>
                                    <img className='image-button' src={Adventure} alt="Left Image" />
                                    <span className='span-button' style={{ border: "none", cursor: "pointer" }}>
                                        ADVENTURE
                                    </span>
                                </Flex>
                                <div>  <img className='image-button' src={Next} /></div>

                            </Flex>
                        </Button>
                    </Flex>
                </Form.Item>

            </div>

        </div >

    )
}

export default LandingPage
