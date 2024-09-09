'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/services/apiMovie";
import { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useRouter } from 'next/navigation'; // Importar useRouter
import Link from "next/link";

export default function Page({ params }) {
    const [filme, setFilme] = useState(null);
    const [atores, setAtores] = useState([]);
    const router = useRouter(); // Inicializar useRouter

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const resultado = await apiMovie.get(`movie/${params.id}`);
                setFilme(resultado.data);

                const atoresResultado = await apiMovie.get(`movie/${params.id}/credits`);
                setAtores(atoresResultado.data.cast);
            } catch (error) {
                console.error('Erro ao buscar os detalhes do filme:', error);
            }
        };

        fetchDetails();
    }, [params.id]);

    if (!filme) {
        return <div>Carregando...</div>;
    }

    return (
        <Pagina titulo="Detalhes do Filme">
            <Row className="mt-4">
                <Col md={4}>
                    <img src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} alt={filme.title} className="img-fluid" />
                </Col>
                <Col>
                    <p><b>Título: </b>{filme.title}</p>
                    <p><b>Título Original: </b>{filme.original_title}</p>
                    <p><b>Popularidade: </b>{filme.popularity}</p>
                    <p><b>Data de Lançamento: </b>{filme.release_date}</p>
                    <p><b>Orçamento: </b>{filme.budget ? `$${filme.budget.toLocaleString()}` : 'N/A'}</p>
                    <p><b>Gêneros: </b>{filme.genres.map(genero => genero.name).join(', ')}</p>
                    <p><b>Sinopse: </b>{filme.overview}</p>

                    <Button variant="primary" onClick={() => router.back()}>Voltar</Button>
                </Col>
            </Row>

            <h2>Atores</h2>
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
        </Pagina>
    );
}
