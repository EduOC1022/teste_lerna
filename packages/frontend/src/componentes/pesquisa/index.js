import React from "react";
import { Form, Formik, Field } from "formik";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const hoje = new Date();
hoje.setHours(23, 59, 0, 0);

const initialValues = {
  cpf: "",
};

const CPF = "cpf";

function Pesquisar() {
  // const schema = validationSchema()
  const estruturarFiltros = (dados) => {
    const filtrosPesquisa = {};

    if (dados.cpf) {
      filtrosPesquisa.cpf = dados.cpf;
    }
    if (dados.nome) {
      filtrosPesquisa.nome = dados.nome;
    }
    if (dados.data_nascimento) {
      filtrosPesquisa.data_nascimento = dados.data_nascimento;
    }
    if (dados.email) {
      filtrosPesquisa.email = dados.email;
    }
    return filtrosPesquisa;
  };

  return (
    <>
      {
        <Formik
          // validationSchema={schema}
          initialValues={initialValues}
          onSubmit={(data, { setSubmitting }) => {
            // Local para formatar os dados de entrada
            console.log('data: ', data)
            let params = estruturarFiltros(data);
            console.log('params: ', params)
            axios
              .get("http://localhost:3001/read", params, {
                headers: { "Content-Type": "application/json" },
              })
              .then((response) => {
                const data = response.data;
                console.log('response: ', data);
              })
              .catch((error) => {
                console.error("Erro ao enviar dados para o servidor:", error);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ handleSubmit }) => {
            return (
              <>
                <Form onSubmit={handleSubmit}>
                  <Grid
                    style={{
                      display: "flex",
                      width: "100%",
                      minHeight: "100vh",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1vh",
                    }}
                  >
                    {/* Campo CPF */}
                    <Field name={CPF}>
                      {({ field }) => {
                        return (
                          <TextField
                            {...field}
                            label="CPF"
                            variant="outlined"
                            value={field.value ? field.value : ""}
                          />
                        );
                      }}
                    </Field>

                    {/* Botão de Pesquisa */}
                    <Button
                      style={{
                        margin: "2vh",
                        border: "solid 1px",
                        borderColor: "lightblue",
                      }}
                      type="submit"
                    >
                      Buscar
                    </Button>
                  </Grid>
                </Form>
              </>
            );
          }}
        </Formik>
      }
    </>
  );
}

export default Pesquisar;
