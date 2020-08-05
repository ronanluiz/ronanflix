import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../components/PageDefault';
import FormField from '../../components/FormField';
import Button from '../../components/Button';
import './CadastroCategoria.css';
import useFormulario from '../../hooks/useFormulario';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '',
  };
  const [categoriasCadastradas, setCategorias] = useState([]);
  const {
    valoresFormulario,
    handleAlteracaoFormulario,
    limparFormulario,
  } = useFormulario(valoresIniciais);

  useEffect(() => {
    const URL_HOST_API = window.location.hostname.includes('localhost')
      ? 'http://localhost:3002'
      : 'https://api-ronanflix.herokuapp.com';
    const URL_API_CATEGORIAS = `${URL_HOST_API}/categorias`;

    fetch(URL_API_CATEGORIAS)
      .then(async (respostaServidor) => {
        const resposta = await respostaServidor.json();
        setCategorias([
          ...resposta,
        ]);
      });
  },
  []);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria</h1>

      <form onSubmit={function handleSubmit(infoFormulario) {
        infoFormulario.preventDefault();

        setCategorias([
          ...categoriasCadastradas,
          valoresFormulario,
        ]);

        limparFormulario();
      }}
      >

        <FormField
          label="Nome da Categoria"
          type="text"
          name="titulo"
          value={valoresFormulario.titulo}
          onChange={handleAlteracaoFormulario}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={valoresFormulario.descricao}
          onChange={handleAlteracaoFormulario}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={valoresFormulario.cor}
          onChange={handleAlteracaoFormulario}
        />

        <Button type="submit" className="ButtonSubmit">
          Cadastrar
        </Button>

      </form>

      <ul>
        {categoriasCadastradas.map((categoria) => (
          <li key={`${categoria.id}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
