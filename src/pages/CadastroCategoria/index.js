import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../components/PageDefault';
import FormField from '../../components/FormField';
import Button from '../../components/Button';
import './CadastroCategoria.css';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };
  const [categoriasCadastradas, setCategorias] = useState([]);
  const [cadastro, setCadastro] = useState(valoresIniciais);

  function setCampoCadastro(chave, valor) {
    setCadastro({
      ...cadastro,
      [chave]: valor,
    });
  }

  function handleChange(event) {
    setCampoCadastro(
      event.target.getAttribute('name'),
      event.target.value,
    );
  }

  useEffect(() => {
    const URL_HOST_API = window.location.pathname.includes('localhost')
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
          cadastro,
        ]);

        setCampoCadastro(valoresIniciais);
      }}
      >

        <FormField
          label="Nome da Categoria"
          type="text"
          name="nome"
          value={cadastro.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={cadastro.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={cadastro.cor}
          onChange={handleChange}
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
