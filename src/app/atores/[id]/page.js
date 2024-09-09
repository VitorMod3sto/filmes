'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/services/apiMovie";
import { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Link from 'next/link'; // Importar Link do Next.js
import { useRouter } from 'next/navigation'; // Importar useRouter

export default function ActorPage({ params }) {
    const [ator, setAtor] = useState(null);
    const [filmes, setFilmes] = useState([]);
    const router = useRouter(); // Inicializar useRouter

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Obtém detalhes do ator
                const resultado = await apiMovie.get(`person/${params.id}`);
                setAtor(resultado.data);

                // Obtém filmes em que o ator participou
                const filmesResultado = await apiMovie.get(`person/${params.id}/movie_credits`);
                setFilmes(filmesResultado.data.cast);
            } catch (error) {
                console.error('Erro ao buscar os detalhes do ator:', error);
            }
        };

        fetchDetails();
    }, [params.id]);

    if (!ator) {
        return <div>Carregando...</div>;
    }

    return (
        <Pagina titulo="Detalhes do Ator">
            <Row className="mt-4">
                <Col md={4}>
                    <img src={`https://image.tmdb.org/t/p/w500/${ator.profile_path}`} alt={ator.name} className="img-fluid" />
                </Col>
                <Col>
                    <p><b>Nome: </b>{ator.name}</p>
                    <p><b>Data de Nascimento: </b>{ator.birthday}</p>
                    <p><b>Local de Nascimento: </b>{ator.place_of_birth}</p>
                    <p><b>Popularidade: </b>{ator.popularity}</p>
                    <p><b>Biografia: </b>{ator.biography}</p>

                    <Button variant="primary" onClick={() => router.back()}>Voltar</Button>
                </Col>
            </Row>

            <h2>Filmes</h2>
            <Row>
                {filmes.map(filme => (
                    <Col md={2} key={filme.id} className="my-2">
                        <Link href={`/filmes/${filme.id}`} passHref>
                            <img
                                src={filme.poster_path ? `https://image.tmdb.org/t/p/w200/${filme.poster_path}` : '/placeholder.png'}
                                alt={filme.title}
                                className="img-fluid"
                            />
                        </Link>
                        <p>{filme.title}</p>
                    </Col>
                ))}
            </Row>
        </Pagina>
    );
}
