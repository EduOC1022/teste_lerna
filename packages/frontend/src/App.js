import React from "react";
import { Form, Formik, Field } from "formik";
// import * as yup from 'yup';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { format } from 'date-fns';
import axios from 'axios';

const hoje = new Date();
hoje.setHours(23, 59, 0, 0);

const initialValues = {
  nome: "",
  cpf: "",
  data_nascimento: hoje,
  email: "",
};

const NOME = "nome";
const CPF = "cpf";
const DATA_NASCIMENTO = "data_nascimento";
const EMAIL = "email";

// const validationSchema = ()=> {
//   return yup.object().shape({
//     [fieldNames.NOME]: yup
//       .string()
//       .test('nome', 'O nome pode conter somente letras!!', val => {
//         if (val && !(/^[a-zA-Z ]+$/.test(val))) {
//           return false;
//         }
//         return true;
//       })
//       .nullable(),

//     [fieldNames.CPF]: yup
//       .number()
//       .required()
//       .test('cpf', 'CPF inválido!!', cpf => {
//         let cpfFormatado = cpf.replace('.', '').replace('-', '')
//         if (cpf && !(/^[/\D+/g]+$/.test(cpf)) || cpfFormatado.length > 12) {
//           return false;
//         } else {
//           return true
//         }
//       })
//       .nullable(),

//     [fieldNames.DATA_NASCIMENTO]: yup
//       .date()
//       .typeError('Data inválida!!')
//       .max(new Date(), 'Não pode ser uma data futura!!')
//       .nullable(),

//     [fieldNames.EMAIL]: yup
//       .string()
//       .nullable()
//       .test('email', 'E-mail inválido', email => {
//         if (email && !('@' in email) || !('.com' in email) ) {
//           return false
//         } else {
//           return true
//         }
//       })

//   })
// };

function App() {
  // const schema = validationSchema()

  return (
    <>
      {
        <Formik
          // validationSchema={schema}
          initialValues={initialValues}
          onSubmit={(data, {setSubmitting})=> {
            // Local para formatar os dados de entrada
            axios
              .post('http://localhost:3001/create', data, {headers: {'Content-Type': 'application/json'}})
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
                    <Field name={NOME}>
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

                    {/* Campo Email */}
                    <Field name={EMAIL}>
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
                    <Field name={DATA_NASCIMENTO}>
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
                            onChange={data => setFieldValue(DATA_NASCIMENTO, data.target.value)}
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

export default App;
