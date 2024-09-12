'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/services/apiMovie";
import { Button, Card, Col, Row } from "react-bootstrap";
import Link from "next/link";

export default function Page() {

    const [atores, setAtores] = useState([])

    useEffect(() => {
        apiMovie.get('person/popular').then(resultado => {
            setAtores(resultado.data.results)
        })
    }, [])

    return (
        <Pagina titulo="Atores Populares">

            <Row md={3}>
                {atores.map(ator => (
                    <Col key={ator.id} className="my-2">
                        <Card>
                            <Card.Img height="400" width="400"  variant="top" src={ 'https://image.tmdb.org/t/p/w500/' + ator.profile_path} />
                            <Card.Body>
                                <Card.Title>{ator.name}</Card.Title>
                                <Card.Text>
                                    <p>Conhecido por: {ator.known_for.map(item => item.title || item.name).join(', ')}</p>
                                    <p>Popularidade: {ator.popularity}</p>
                                </Card.Text>
                                
                                <Link className="btn btn-danger" href={`/atores/${ator.id}`} passHref>
                                    Detalhes
                                </Link>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}
