import React from "react";
import { Form, Formik, Field } from "formik";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { format } from 'date-fns';
import axios from 'axios';
import { 
  InitialValues, 
  FieldNames 
} from "@stt/utilitarios";

const initialValues = InitialValues.cadastroPessoas;
const fieldNames = FieldNames.cadastroPessoas;

function Cadastrar() {

  return (
    <>
      {
        <Formik
          initialValues={initialValues}
          onSubmit={(data, {setSubmitting})=> {
            axios
              .post('http://150.162.202.43:3001/create', data, {headers: {'Content-Type': 'application/json'}})
              .then((response) => {
                const {data} = response;
                console.log(data.message)
              })
              .catch((error) => {
                console.error("Erro ao enviar dados para o servidor:", error);
              })
              .finally(() => {
                setSubmitting(false);
              })
          }}
        >
          {({ handleSubmit }) => {
            return (
              <>
                <Form onSubmit={handleSubmit}>
                  <Grid
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      minHeight: "100vh",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1vh"
                    }}
                  >

                    {/* Campo Nome */}
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
                        form: { setFieldValue }
                      }) => {

                        const dataFormatada = value ? format(new Date(value), 'yyyy-MM-dd') : '';

                        return (
                          <TextField
                            label="Data de Nascimento"
                            type="date"
                            variant="outlined"
                            inputprops={{
                              name: name
                            }}
                            value={dataFormatada}
                            onChange={data => setFieldValue(fieldNames.DATA_NASCIMENTO, data.target.value)}
                          />
                        );
                      }}
                    </Field>

                    {/* Botão de Cadastro */}
                    <Button
                      style={{
                        margin: "2vh",
                        border: "solid 1px",
                        borderColor: "lightblue",
                      }}
                      type="submit"
                    >
                      Cadastrar
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

export default Cadastrar;
