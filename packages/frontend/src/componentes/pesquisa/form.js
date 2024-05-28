import React from "react";
import { Form, Formik, Field } from "formik";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { format, parse } from "date-fns";
import { useSignals } from "@preact/signals-react/runtime";
import { pesquisa } from "../../signals/signals";
import { InitialValues, FieldNames } from "utilitarios";

const initialValues = InitialValues.pesquisaPessoas;
const fieldNames = FieldNames.pesquisaPessoas;

console.log("initialValues: ", InitialValues);
console.log("fieldNames: ", FieldNames);

const FormPesquisa = () => {
  useSignals();

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
            console.log("data: ", data);
            let params = estruturarFiltros(data);
            console.log("params: ", params);
                axios
                    .get("http://localhost:3001/read", {
                        params: params,
                        headers: { "Content-Type": "application/json" },
                    })
                    .then((response) => {
                        const data = response.data;
                        pesquisa.value = data;
                        console.log("busca: ", data);
                    })
                    .catch((error) => {
                        pesquisa.value = { data: [] };
                        console.error("Erro ao enviar dados para o servidor:", error);
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            
          }}
        >
          {({ handleSubmit, resetForm }) => {
            return (
              <>
                <Form onSubmit={handleSubmit}>
                  <Grid
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1vh",
                    }}
                  >
                    <Grid
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1vh",
                      }}
                    >
                      {/* Campo NOME */}
                      <Field name={fieldNames.NOME}>
                        {({ field }) => {
                          return (
                            <TextField
                              {...field}
                              label="Nome"
                              variant="outlined"
                              value={field.value ? field.value : ""}
                            />
                          );
                        }}
                      </Field>

                      {/* Campo CPF */}
                      <Field name={fieldNames.CPF}>
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

                      {/* Campo Email */}
                      <Field name={fieldNames.EMAIL}>
                        {({ field }) => {
                          return (
                            <TextField
                              {...field}
                              label="E-mail"
                              variant="outlined"
                              value={field.value ? field.value : ""}
                            />
                          );
                        }}
                      </Field>

                      {/* Campo Data de Nascimento */}
                      <Field name={fieldNames.DATA_NASCIMENTO}>
                        {({
                          field: { name, value },
                          form: { setFieldValue },
                        }) => {
                          const dataFormatada = value
                            ? format(
                                parse(value, "yyyy-MM-dd", new Date()),
                                "yyyy-MM-dd"
                              )
                            : "";

                          return (
                            <TextField
                              label="Data de Nascimento"
                              type="date"
                              variant="outlined"
                              inputprops={{
                                name: name,
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={dataFormatada}
                              onChange={(data) =>
                                setFieldValue(
                                  fieldNames.DATA_NASCIMENTO,
                                  data.target.value
                                )
                              }
                            />
                          );
                        }}
                      </Field>
                    </Grid>

                    <Grid>
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
                      <Button
                        style={{
                          margin: "2vh",
                          border: "solid 1px",
                          borderColor: "lightblue",
                        }}
                        
                        onClick={() => {
                            pesquisa.value = []
                          resetForm({
                            values: initialValues,
                          });
                        }}
                      >
                        Limpar
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </>
            );
          }}
        </Formik>
      }
    </>
  );
};

export default FormPesquisa;
