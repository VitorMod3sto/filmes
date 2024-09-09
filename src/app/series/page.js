'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/services/apiMovie";
import { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import Link from 'next/link';

export default function SeriesPage() {
    const [series, setSeries] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // Estado para total de páginas
    const [currentPage, setCurrentPage] = useState(1); // Estado para página atual

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const resultado = await apiMovie.get('tv/popular', {
                    params: {
                        page: currentPage // Passa a página atual para a solicitação
                    }
                });
                setSeries(prevSeries => [...prevSeries, ...resultado.data.results]);
                setTotalPages(resultado.data.total_pages); // Atualiza o total de páginas
            } catch (error) {
                console.error('Erro ao buscar as séries populares:', error);
            }
        };

        fetchSeries();
    }, [currentPage]);

    const loadMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1); // Carrega a próxima página
        }
    };

    return (
        <Pagina titulo="Séries Populares">
            <Row md={3}>
                {series.map(serie => (
                    <Col key={serie.id} className="my-2">
                        <Card>
                            <Card.Img height="230" variant="top" src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} />
                            <Card.Body>
                                <Card.Title>{serie.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{serie.original_name}</Card.Subtitle>
                                <Card.Text>
                                    <p>Popularidade: {serie.popularity}</p>
                                   
                                </Card.Text>
                                <Link href={`/series/${serie.id}`} passHref>
                                    <Button variant="primary">Ver Detalhes</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {currentPage < totalPages && (
                <Button className="mt-3" variant="primary" onClick={loadMore}>
                    Carregar Mais
                </Button>
            )}
        </Pagina>
    );
}