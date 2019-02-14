describe('cipher.encode', () => {
  it('deberia cifrar correctamente', () => {
    let string = 'llamame. tengo una prengunta.';
    let offset = 3;
    expect(cipher.encode(offset, string).toBe('MMBNBNF. UFOHP VOB QSFOHVOUB.'))
  })
})

describe('cipher.decode', () => {
  it('deberia descifrar correctamente', () => {
    let string = 'MMBNBNF. UFOHP VOB QSFOHVOUB.';
    let offset = 3;
    expect(cipher.decode(offset, string).toBe('llamame. tengo una prengunta.'))
  })
})
