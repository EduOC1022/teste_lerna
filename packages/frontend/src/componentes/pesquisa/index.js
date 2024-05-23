import React from "react";
import FormPesquisa from "./form";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSignals } from "@preact/signals-react/runtime";
import { pesquisa } from "../../signals/signals";
import axios from "axios";

const excluirPessoa = (cpf) => {
  axios
    .delete(`http://localhost:3001/delete/${cpf}`, {
      headers: { "Content-Type": "application/json" },
    })
    .catch((error) => {
      console.error(error);
    })
    .finally();
};

const Pesquisar = () => {
  useSignals();

  return (
    <>
      <FormPesquisa />
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>CPF</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Data Nascimento</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableHead>
          <TableBody>
            {pesquisa.value.length === 0 ? (
              <TableRow>
                <TableCell>Nenhum Dado Encontrado</TableCell>
              </TableRow>
            ) : (
              pesquisa.value.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.cpf}</TableCell>
                  <TableCell>{row.nome}</TableCell>
                  <TableCell>{row.data_nascimento}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>
                    <IconButton
                      disableRipple
                      size="small"
                      onClick={() => {
                        excluirPessoa(row.cpf)
                        
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Pesquisar;
