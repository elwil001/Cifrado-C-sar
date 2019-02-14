export let cipher = {
    encode: function(offset, string){
      if(string.length === 0){
        document.getElementById("error-nocifrado").innerHTML = 'Por favor, ingrese su mensaje'
        } else{
        const stringArray = string.split('')
        const descNum = stringArray.map((char) => {
          return char.charCodeAt(0)
        })
        const descNumOffset = descNum.map((code) => {
          if(code === 32){
            return code
          } else if(code === 46){
            return code
            } else{
            return (code - 65 + offset) % 26 + 65
          }
        })
        const cifradoArray = String.fromCharCode.apply(null, descNumOffset)
        document.getElementById('boton-cifrar').setAttribute('disabled', '')
        document.getElementById('borrar-nocifrado').setAttribute('disabled', '')
        document.getElementById('resulto-cif').style.display = 'block'
        document.getElementById("mensaje-cifrado").innerHTML = cifradoArray
      }
    },
    decode: function(offset, string){
      if(string.length === 0){
        document.getElementById("error-cifrado").innerHTML = 'Por favor, ingrese su mensaje cifrado'
        } else {
          const stringArray = string.split('')
          const cifNum = stringArray.map((char) => {
            return char.charCodeAt(0)
          })
          const cifNumOffset = cifNum.map((code) => {
            if(code === 32){
              return code
            } else if(code === 46){
              return code
            } else{
                return (((code - 65 - offset) % 26) + 26) % 26 + 65;
            }
          })
          const descifradoArray = String.fromCharCode.apply(null, cifNumOffset)
          document.getElementById('boton-descifrar').setAttribute('disabled', '')
          document.getElementById('borrar-cifrado').setAttribute('disabled', '')
          document.getElementById('resulto-descif').style.display = 'block'
          document.getElementById("mensaje-descifrado").innerHTML = descifradoArray
        }
      }
    }
