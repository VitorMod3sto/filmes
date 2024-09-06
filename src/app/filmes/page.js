'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/services/apiMovie";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";


export default function Page(){
    const [filmes, setFilmes] = useState([])
    useEffect(()=>{
        apiMovie.get('movie/popular').then(resultado=>{
            setFilmes(resultado.data.results)
        })
    }, [])
    
    return (
        <Pagina titulo="Disney">
            <Row md={3}>
                {filmes.map(item => (
                    <Col key={item.id} className="my-2">
                        <Card>
                            <Card.Img height="265" variant="top" src={'https://image.tmdb.org/t/p/w500' + item.backdrop_path} />
                            <Card.Body>

                                <Card.Title>{item.title}</Card.Title>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {filmes.map(item => (
                <p>
                    {item.title }
                </p>
            ))}

        </Pagina>
    )
}
