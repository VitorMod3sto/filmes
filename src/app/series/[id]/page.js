'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/services/apiMovie";
import { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SeriesDetailPage({ params }) {
    const [serie, setSerie] = useState(null);
    const [atores, setAtores] = useState([]);
    const [temporadas, setTemporadas] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Obtém detalhes da série
                const resultado = await apiMovie.get(`tv/${params.id}`);
                setSerie(resultado.data);

                // Obtém atores
                const atoresResultado = await apiMovie.get(`tv/${params.id}/credits`);
                setAtores(atoresResultado.data.cast);

                // Obtém temporadas
                setTemporadas(resultado.data.seasons);
            } catch (error) {
                console.error('Erro ao buscar os detalhes da série:', error);
            }
        };

        fetchDetails();
    }, [params.id]);

    if (!serie) {
        return <div>Carregando...</div>;
    }

    return (
        <Pagina titulo="Detalhes da Série">
            <Row className="mt-4">
                <Col md={4}>
                    <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} className="img-fluid" />
                </Col>
                <Col md={8}>
                    <h2>{serie.name}</h2>
                    <p><b>Título Original: </b>{serie.original_name}</p>
                    <p><b>Popularidade: </b>{serie.popularity}</p>
                    <p><b>Data de Lançamento: </b>{serie.first_air_date}</p>
                    <p><b>Gênero: </b>{serie.genres.map(genero => genero.name).join(', ')}</p>
                    <p><b>Sinopse: </b>{serie.overview}</p>

                    <Button variant="primary" onClick={() => router.back()}>Voltar</Button>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <h3>Temporadas:</h3>
                    <Row>
                        {temporadas.map(temp => (
                            <Col md={3} key={temp.id} className="my-2">
                                <Card>
                                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${temp.poster_path}`} />
                                    <Card.Body>
                                        <Card.Title>Temporada {temp.season_number}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <h3>Atores:</h3>
                    <Row>
                        {atores.map(ator => (
                            <Col md={2} key={ator.id} className="my-2">
                                <Link href={`/atores/${ator.id}`} passHref>
                                    <img
                                        src={ator.profile_path ? `https://image.tmdb.org/t/p/w200/${ator.profile_path}` : '/placeholder.png'}
                                        alt={ator.name}
                                        className="img-fluid"
                                    />
                                </Link>
                                <p>{ator.name}</p>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Pagina>
    );
}
