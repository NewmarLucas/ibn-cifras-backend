const {
  expect,
  it,
  describe
} = require('@jest/globals')
const mockingoose = require('mockingoose')
const MusicSchema = require('../../src/database/schema/music')

const {
  listMusics,
  musicDelete,
  musicEdit,
  musicRegister
} = require('../../src/models/musicModel')

const musicResponseExample = [
  {
    _id: "62766a71e2ff570f287992f1",
    name: "Teus Sonhos",
    singer: "Fernandinho",
    url: "https://www.cifraclub.com.br/fernandinho/teus-sonhos/imprimir.html"
  }
]

describe('musicModel functions', () => {
  // listMusics
  it('Should receive an array of songs', async () => {
    mockingoose(MusicSchema).toReturn(musicResponseExample, 'find')
    const response = await listMusics()
    expect(response[0]).toHaveProperty('_id')
    expect(response[0]).toHaveProperty('name')
    expect(response[0]).toHaveProperty('singer')
    expect(response[0]).toHaveProperty('url')
  })

  //musicDelete
  it('Should delete a song by id', async () => {
    mockingoose(MusicSchema).toReturn(musicResponseExample, 'findOne')
    mockingoose(MusicSchema).toReturn(musicResponseExample, 'deleteOne')
    const response = await musicDelete('62766a71e2ff570f287992f1')
    expect(response).toBe('Deleted')
  })

  it('Should get an error when trying delete a song with wrong id', async () => {
    mockingoose(MusicSchema).toReturn(null, 'findOne')
    const response = await musicDelete('iddas4d56as4')
    expect(response).toBe('Music does not exists')
  })

  //musicEdit
  it('Should update a song', async () => {
    mockingoose(MusicSchema).toReturn(musicResponseExample, 'findOne')
    mockingoose(MusicSchema).toReturn(musicResponseExample, 'updateOne')
    const data = {
      url: 'https://www.cifraclub.com.br/fernandinho/teus-sonhos/imprimir.html',
      singer: 'Fernandinho',
      name: 'Teus Sonhos'
    }
    const response = await musicEdit(data, '62766a71e2ff570f287992f1')
    expect(response).toBe('Updated')
  })

  it('Should get an error when trying update a song with a wrong id', async () => {
    mockingoose(MusicSchema).toReturn(null, 'findOne')
    const data = {
      url: 'https://www.cifraclub.com.br/fernandinho/teus-sonhos/imprimir.html',
      singer: 'Fernandinho',
      name: 'Teus Sonhos'
    }
    const response = await musicEdit(data, '62766a71')
    expect(response).toBe('Music does not exists')
  })

  it('Should get an error when trying update a song with a wrong data', async () => {
    mockingoose(MusicSchema).toReturn(musicResponseExample, 'findOne')
    const data = {
      url: 'https://www.cifraclub.com.br/fernandinho/',
      singer: 'Fernandinho',
      name: 'Teus Sonhos'
    }
    const response = await musicEdit(data, '62766a71e2ff570f287992f1')
    expect(response).toBe('Wrong link')
  })

  //musicRegister
  it('Should register a new song', async () => {
    const data = {
      url: 'https://www.cifraclub.com.br/pedro-paulo-alex/desbotequei-ai-bebe/imprimir.html',
      singer: 'PPA',
      name: 'Desbotequei'
    }
    mockingoose(MusicSchema).toReturn(null, 'findOne')
    const response = await musicRegister(data)
    expect(response).toBe('Created')
  })

  it('Should get an error when trying create a song with a wrong data', async () => {
    mockingoose(MusicSchema).toReturn(musicResponseExample, 'findOne')
    const data = {
      url: 'https://www.cifraclub.com.br/pedro-paulo-alex/',
      singer: 'PPA',
      name: 'Desbotequei'
    }
    const response = await musicRegister(data)
    expect(response).toBe('Wrong link')
  })

  it('Should get an error when trying create a song with already existing data', async () => {
    mockingoose(MusicSchema).toReturn(musicResponseExample, 'findOne')
    const data = {
      url: 'https://www.cifraclub.com.br/fernandinho/teus-sonhos/imprimir.html',
      singer: 'Fernandinho',
      name: 'Teus Sonhos'
    }
    const response = await musicRegister(data)
    expect(response).toBe('Music already exists')
  })
})
