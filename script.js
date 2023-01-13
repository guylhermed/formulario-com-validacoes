const refresh = document.querySelector('#refresh')
refresh.addEventListener('click', () => {
  location.reload()
})

const form = document.getElementById('form')
const username = document.getElementById('username')
const lastname = document.getElementById('lastname')
const email = document.getElementById('email')
const number = document.getElementById('number')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmpassword')

form.addEventListener('submit', e => {
  e.preventDefault()

  checkInputs()
})

function checkInputs() {
  const usernameValue = username.value
  const lastnameValue = lastname.value
  const emailValue = email.value
  const numberValue = number.value
  const passwordValue = password.value
  const confirmPasswordValue = confirmPassword.value

  if (usernameValue === '') {
    setErrorFor(username, 'Primeiro nome é obrigatório.')
  } else {
    setSeuccessFor(username)
  }

  if (lastnameValue === '') {
    setErrorFor(lastname, 'Sobrenome é obrigatório.')
  } else {
    setSeuccessFor(lastname)
  }

  if (emailValue === '') {
    setErrorFor(email, 'O email é obrigatório.')
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, 'Insira um email válido!')
  } else {
    setSeuccessFor(email)
  }

  if (numberValue === '') {
    setErrorFor(number, 'Celular é obrigatório.')
  } else if (!telefone_validation(numberValue)) {
    setErrorFor(number, 'Insira um celular válido!')
  } else {
    setSeuccessFor(number)
  }

  if (passwordValue === '') {
    setErrorFor(password, 'A senha é obrigatória.')
  } else if (passwordValue.length < 7) {
    setErrorFor(password, 'Precisa ter mais que 6 caracteres.')
  } else {
    setSeuccessFor(password)
  }

  if (confirmPasswordValue === '') {
    setErrorFor(confirmPassword, 'A confirmação é obrigatória.')
  } else if (confirmPasswordValue !== passwordValue) {
    setErrorFor(confirmPassword, 'As senhas são diferentes!')
  } else {
    setSeuccessFor(confirmPassword)
  }

  const inputsBox = form.querySelectorAll('.input-box')
  const divGroup = document.getElementById('input-group')
  const divGender = document.getElementById('gender-inputs')

  const formIsValid = [...inputsBox].every(inputBox => {
    return inputBox.className === 'input-box success'
  })

  if (formIsValid) {
    concluido.style.display = 'block'
    divGroup.style.display = 'none'
    divGender.style.display = 'none'
    console.log('O formulário está 100% válido!')
  }
}

function setErrorFor(input, message) {
  const inputBox = input.parentElement
  const small = inputBox.querySelector('small')

  // Adicionar a mensagem de erro
  small.innerText = message

  // Adicionar a classe de erro
  inputBox.className = 'input-box error'
}

function setSeuccessFor(input) {
  const inputBox = input.parentElement

  // Adicionar a classe de sucesso
  inputBox.className = 'input-box success'
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  )
}

function telefone_validation(telefone) {
  //retira todos os caracteres menos os numeros
  telefone = telefone.replace(/\D/g, '')

  //verifica se tem a qtde de numero correto
  if (!(telefone.length >= 10 && telefone.length <= 11)) return false

  //Se tiver 11 caracteres, verificar se começa com 9 o celular
  if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9)
    return false

  //verifica se não é nenhum numero digitado errado (propositalmente)
  for (var n = 0; n < 10; n++) {
    //um for de 0 a 9.
    //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
    //caractere a ser repetido
    if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n))
      return false
  }
  //DDDs validos
  var codigosDDD = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
    37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 64, 63,
    65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
    89, 91, 92, 93, 94, 95, 96, 97, 98, 99
  ]
  //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
  if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false

  //E por ultimo verificar se o numero é realmente válido. Até 2016 um celular pode
  //ter 8 caracteres, após isso somente numeros de telefone e radios (ex. Nextel)
  //vão poder ter numeros de 8 digitos (fora o DDD), então esta função ficará inativa
  //até o fim de 2016, e se a ANATEL realmente cumprir o combinado, os numeros serão
  //validados corretamente após esse período.
  //NÃO ADICIONEI A VALIDAÇÂO DE QUAIS ESTADOS TEM NONO DIGITO, PQ DEPOIS DE 2016 ISSO NÃO FARÁ DIFERENÇA
  //Não se preocupe, o código irá ativar e desativar esta opção automaticamente.
  //Caso queira, em 2017, é só tirar o if.
  if (new Date().getFullYear() < 2017) return true
  if (
    telefone.length == 10 &&
    [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1
  )
    return false

  //se passar por todas as validações acima, então está tudo certo
  return true
}

//chamada simples
//telefone_validation("(11)99000-3777"); // retorna true
//telefone_validation("11-99000-3777"); // retorna true
//telefone_validation("11990003777"); // retorna true
//telefone_validation("1111111111"); // retorna false
//telefone_validation("1111111111"); // retorna false
//telefone_validation("(01)3444-4444"); // retorna false
//telefone_validation("(01)43444-4444"); // retorna false
