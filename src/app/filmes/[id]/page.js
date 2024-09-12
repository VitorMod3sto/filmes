'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/services/apiMovie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";


export default function Page({ params }) {
    const [filme, setFilme] = useState({})
    const [atores, setAtores] = useState([]);

    useEffect(() => {
        apiMovie.get(`movie/${params.id}`).then(resultado => {
            setFilme(resultado.data)
        })

        apiMovie.get(`movie/${params.id}/credits`).then(resultado => {
            setAtores(resultado.data.cast);
        })

    }, [])

    return (
        <Pagina titulo={filme.title}>
            {
                filme.id &&
                <Row className="mt-4">
                    <Col sm={4}>
                        <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500/' + filme.poster_path} />

                    </Col>

                    <Col sm={8}>

                        <p><b>Título Original: </b>{filme.original_title}</p>
                        <p><b>Popularidade: </b>{filme.popularity}</p>
                        <p><b>Data de Lançamento: </b>{filme.release_date}</p>
                        <p><b>Orçamento: </b>{`${filme.budget.toLocaleString()}`}</p>
                        <p><b>Gêneros: </b>{filme.genres.map(item => item.name).join(', ')}</p>
                        <p><b>Sinopse: </b>{filme.overview}</p>
                    </Col>

                    <Col sm={12}>
                    <h1>Atores: </h1>
                        <Row>
                        
                        {atores.map(ator => (
                            <Col key={ator.id} title={ator.name} className="mb-3" sm={2}>
                                <Link href={`/atores/${ator.id}`}>
                            <img  className="img-fluid" src={'https://image.tmdb.org/t/p/w500/' + ator.profile_path} />
                            </Link>
                        </Col>
                        ))}
                        </Row>
                    </Col>

                </Row>
            }
        </Pagina>
    )
}

