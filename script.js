const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sNome = document.querySelector("#m-nome");
const sEmail = document.querySelector("#m-email");
const sSalario = document.querySelector("#m-salario");
const sAdmissao = document.querySelector("#m-admissao");
const btnSalvar = document.querySelector("#btnSalvar");

let itens;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {
    sNome.value = itens[index].nome;
    sEmail.value = itens[index].email;
    sSalario.value = itens[index].salario;
    sAdmissao.value = itens[index].admissao;
    id = index;
  } else {
    sNome.value = "";
    sEmail.value = "";
    sSalario.value = "";
    sAdmissao.value = "";
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");
  console.log(item);
  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.email}</td>
    <td>R$ ${item.salario}</td>
    <td>${isoToLocalDate(item.admissao)}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

btnSalvar.onclick = (e) => {
  if (
    sNome.value == "" ||
    sEmail.value == "" ||
    sSalario.value == "" ||
    sAdmissao.value == ""
  ) {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value;
    itens[id].email = sEmail.value;
    itens[id].salario = sSalario.value;
    itens[id].admissao = sAdmissao.value;
  } else {
    itens.push({
      nome: sNome.value,
      email: sEmail.value,
      salario: sSalario.value,
      admissao: sAdmissao.value,
    });
  }

  setItensBD();

  modal.classList.remove("active");
  loadItens();
  id = undefined;
};

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = "";
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

function isoToLocalDate(stringDate) {
  let dateFields = stringDate.split("-");
  return `${dateFields[2]}/${dateFields[1]}/${dateFields[0]}`;
}

const getItensBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];
const setItensBD = () => localStorage.setItem("dbfunc", JSON.stringify(itens));

loadItens();

var admissao = new Date();
console.log(admissao.toLocaleDateString());
