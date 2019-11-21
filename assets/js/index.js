let finalPassword = ''
let length = 8
let oldPasswords = []
const optValues = {
  specials: ['@', '%', '+', '\\', '/', '\'', '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'],
  numeric: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  lowerCase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  upperCase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
}
const options = {
  specials: false,
  numeric: false,
  lowerCase: false,
  upperCase: false
}

function prepend (x, arr) {
  return [].concat(x, arr)
}

function take (i, arr) {
  return arr.slice(0, i)
}

function fetchRando (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function buildCharArr (opts) {
  return Object.keys(opts).reduce((acc, k) => {
    if (opts[k]) {
      return [...acc, ...optValues[k]]
    }

    return acc
  }, [])
}

function empty (el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild)
  }

  return el
}

function updateView (el, value) {
  document.querySelector
}

function renderOldPasswords (list) {
  const el = empty(document.querySelector('.old-gens'))

  for (let i = 0; i < list.length; i++) {
    const p = document.createElement('p')

    p.textContent = list[i]
    el.appendChild(p)
  }
}

function validateOptions (opts) {
  return Object.values(opts).some(x => x)
}

function generate (opts) {
  const choices = buildCharArr(opts)

  while (finalPassword.length < length) {
    finalPassword += fetchRando(choices)
  }

  document.querySelector('#pass').value = finalPassword
  oldPasswords = take(5, prepend(finalPassword, oldPasswords))
  finalPassword = ''

  renderOldPasswords(oldPasswords)
}

// Watch our options for user interaction
document.querySelectorAll('.opt').forEach(el => el.addEventListener('change', function (e) {
  if (e.target.id === 'length') {
    length = Number(e.target.value)
  } else {
    options[e.target.id] = e.target.checked
  }
}))

// Watch our copy to clipboard button
document.querySelector('#copy').addEventListener('click', function () {
  document.querySelector('#pass').select()
  document.execCommand('copy')
})

// Watch our generate button
document.querySelector('#generate').addEventListener('click', function () {
  if (validateOptions(options)) {
    generate(options)
    document.querySelector('.error').classList.add('hidden')
  } else {
    document.querySelector('.error').classList.remove('hidden')
  }

})
