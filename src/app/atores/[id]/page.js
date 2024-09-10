'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/services/apiMovie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";


export default function Page({ params }) {
    const [ator, setAtor] = useState({})
    const [filmes, setFilmes] = useState([])
    const [series, setSeries] = useState([])

    useEffect(() => {
        apiMovie.get(`person/${params.id}`).then(resultado => {
            setAtor(resultado.data)
        })
        apiMovie.get(`person/${params.id}/movie_credits`).then(resultado => {
            setFilmes(resultado.data.cast);
        })
        apiMovie.get(`person/${params.id}/tv_credits`).then(resultado => {
            setSeries(resultado.data.cast);
        })


    }, [])

    return (
        <Pagina titulo={ator.name}>
            {
                ator.id &&
                <Row className="mt-4">
                    <Col sm={4}>
                        <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500/' + ator.profile_path} />
                    </Col>

                    <Col sm={8}>

                        <p><b>Título Original: </b>{ator.birthday}</p>
                        <p><b>Popularidade: </b>{ator.popularity}</p>
                        <p><b>Data de Nascimento: </b>{ator.birthday}</p>
                        <p><b>Local de Nascimento: </b>{ator.place_of_birth}</p>
                        <p><b>Biografia: </b>{ator.biography}</p>
                    </Col>
                    <Col sm={12}>
                        <h1>Filmes: </h1>
                        <Row>
                            {filmes.map(filme => (
                                <Col key={filme.id} title={filme.title} className="mb-3" sm={2}>
                                    <Link href={`/filmes/${filme.id}`}>
                                        <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500/' + filme.poster_path} />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    <Col sm={12}>
                        <h1>Series: </h1>
                        <Row>
                            {filmes.map(serie => (
                                <Col key={serie.id} title={serie.title} className="mb-3" sm={2}>
                                    <Link href={`/series/${serie.id}`}>
                                        <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500/' + serie.poster_path} />
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
