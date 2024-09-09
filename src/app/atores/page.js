'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/services/apiMovie";
import { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import Link from 'next/link';

export default function AtoresPage() {
    const [atores, setAtores] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // Estado para total de páginas
    const [currentPage, setCurrentPage] = useState(1); // Estado para página atual

    useEffect(() => {
        const fetchAtores = async () => {
            try {
                const resultado = await apiMovie.get('person/popular', {
                    params: {
                        page: currentPage // Passa a página atual para a solicitação
                    }
                });
                setAtores(prevAtores => [...prevAtores, ...resultado.data.results]);
                setTotalPages(resultado.data.total_pages); // Atualiza o total de páginas
            } catch (error) {
                console.error('Erro ao buscar os atores populares:', error);
            }
        };

        fetchAtores();
    }, [currentPage]);

    const loadMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1); // Carrega a próxima página
        }
    };

    return (
        <Pagina titulo="Atores Populares">
            <Row md={3}>
                {atores.map(ator => (
                    <Col key={ator.id} className="my-2">
                        <Card>
                            <Card.Img height="400" width="400" variant="top" src={`https://image.tmdb.org/t/p/w500/${ator.profile_path}`} />
                            <Card.Body>
                                <Card.Title>{ator.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Popularidade: {ator.popularity}</Card.Subtitle>
                                <Card.Text>
                                    <p>{ator.known_for.map(item => item.title || item.name).join(', ')}</p>
                                </Card.Text>
                                <Link href={`/atores/${ator.id}`} passHref>
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