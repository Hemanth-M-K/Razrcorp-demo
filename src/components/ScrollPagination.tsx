import axios from "axios";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import styles from '../styles/ScrollPagination.module.css';

interface CommentModal {
    postId: number,
    name: string,
    id: number,
    email: string,
    body: string
}


const ScrollPagination: React.FunctionComponent = (): JSX.Element => {
    const [commentsData, setCommentsData] = useState<CommentModal[]>([]);
    const [isLoading, setLoadingState] = useState<boolean>(true);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [isError, setErrorState] = useState<boolean>(false);
    const lastElementRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);

    useEffect(() => {
        axios.request({
            url: 'https://jsonplaceholder.typicode.com/comments',
            method: 'get',
            params: { _page: pageNumber, _limit: 20 }
        }).then(res => {
            setCommentsData([...commentsData, ...res.data])
            setLoadingState(false)
            if(res.data.length === 0) setHasMoreData(false);
        }).catch(() => {
            setLoadingState(false)
            setErrorState(true)
        })
    },[pageNumber])

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        }
        const observer = new IntersectionObserver( (entries) => {
            if(entries[0].isIntersecting && hasMoreData) {
                setLoadingState(true);
                setPageNumber(pageNumber+1);
            }
        },options)

        if(lastElementRef.current) observer.observe(lastElementRef.current)

        return () => {
            observer.disconnect()
        }
    },[commentsData])

    return (
        <div className='px-3'>
            <h1 className='text-center'>Comments</h1>
            <p className='text-center'>Demonstration of Infinte scroll Pagination</p>
            <Row xs={1} md={2} className="g-4">
                {
                    commentsData && commentsData.map((comment,index) => (
                        <Col key={index} ref={index + 1 === commentsData.length ? lastElementRef: null} data-id={index}>
                            <PassangerCard {...comment}/>
                        </Col>
                    ))
                }
            </Row>
            {isLoading && <div className="text-center py-4">
                    <Spinner animation="grow"/>
                    <Spinner animation="grow" className='mx-1'/>
                    <Spinner animation="grow"/>
                </div>}
            {isError && <h3 className="text-center py-4 text-danger" >We are out of Service Please try later</h3>}
            {!hasMoreData && <h3 className="text-center py-4 text-success" >No More data to load</h3>}
        </div>
    )
}

export default ScrollPagination;

const PassangerCard: React.FunctionComponent<CommentModal> = (props: CommentModal): JSX.Element => {
    return (
        <Card className={styles.card}>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text className='text-danger'>User Id : {props.email}</Card.Text>
                <Card.Text>Comment : {props.body}</Card.Text>
            </Card.Body>
        </Card>
    )
}
