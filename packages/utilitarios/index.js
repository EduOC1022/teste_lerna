// FieldNames
import FieldsCadastroPessoas from "./fieldNames/cadastroPessoas";
import FieldsPesquisaPessoas from "./fieldNames/pesquisaPessoas";
// InitialValues
import ValuesCadastroPessoas from "./initialValues/cadastroPessoas";
import ValuesPesquisaPessoas from "./initialValues/pesquisaPessoas";
// Paths
import rotas from "./paths/paths";

const FieldNames = {
    cadastroPessoas: FieldsCadastroPessoas,
    pesquisaPessoas: FieldsPesquisaPessoas,
};

const InitialValues = {
    cadastroPessoas: ValuesCadastroPessoas,
    pesquisaPessoas: ValuesPesquisaPessoas,
};

const Paths = rotas

export  {
    Paths,
    FieldNames,
    InitialValues
}