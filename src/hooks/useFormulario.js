import { useState } from 'react';

function useFormulario(valoresIniciais) {
  const [valoresFormulario, setFormulario] = useState(valoresIniciais);

  function setValorFormulario(chave, valor) {
    setFormulario({
      ...valoresFormulario,
      [chave]: valor,
    });
  }

  function handleAlteracaoFormulario(event) {
    setValorFormulario(
      event.target.getAttribute('name'),
      event.target.value,
    );
  }

  function limparFormulario() {
    setValorFormulario(valoresIniciais);
  }

  return {
    valoresFormulario,
    handleAlteracaoFormulario,
    limparFormulario,
  };
}

export default useFormulario;
