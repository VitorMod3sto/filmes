
'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/services/apiMovie";
import { Button, Card, Col, NavLink, Row } from "react-bootstrap";
import Link from "next/link";


export default function Page() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        apiMovie.get('movie/now_playing').then(resultado => {
            setFilmes(resultado.data.results)
        })
    }, [])

    return (
        <Pagina titulo="Filmes em Cartaz">

            <Row md={3}>
                {filmes.map(item => (
                    <Col key={item.id} className="my-2">
                        <Card>
                            <Card.Img height="230" variant="top" src={ 'https://image.tmdb.org/t/p/w500/' + item.backdrop_path} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                           <p>{item.original_title}</p>
                                           <p> Popularidade: {item.popularity}</p>
                                        </Card.Text>
                                        <Link href={`/filmes/${item.id}`} passHref>
                                        <Button variant="danger"> Ver Detalhes</Button>
                                        </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}