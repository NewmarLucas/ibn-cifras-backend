const mockingoose = require('mockingoose')
const MusicListSchema = require('../../src/database/schema/musicList')

const {
  listMusics,
  createList,
  deleteList,
  updateMusicList,
  findMusicsFromList,
  removeMusicFromList
} = require('../../src/models/listModel')

const listResponse = [{
  _id: '62d8927dd7f036d2a45c3566',
  musicIdList: ['62766a71e2ff570f287992f1'],
  title: 'Sabado',
  subtitle: 'saturday',
  __v: 0
}]

describe('musicListModel functions', () => {
  //Get list of musics
  it('Should receive an array of musicList', async () => {
    mockingoose(MusicListSchema).toReturn(listResponse, 'find')
    const response = await listMusics()
    expect(response[0]).toHaveProperty('_id')
    expect(response[0]).toHaveProperty('musicIdList')
    expect(response[0]).toHaveProperty('title')
    expect(response[0]).toHaveProperty('subtitle')
  })

  //Create a new list of musics
  it('Should create a new list of musics', async () => {
    mockingoose(MusicListSchema).toReturn(null, 'findOne')
    const data = {
      title: 'New List',
      subtitle: 'A new list',
    }
    const response = await createList(data)
    expect(response).toBe('Added')
  })

  it('Should occur an error when create a new list of musics with an already existing title', async () => {
    mockingoose(MusicListSchema).toReturn(listResponse[0], 'findOne')
    const data = {
      title: 'Sabado',
      subtitle: 'saturday',
    }
    const response = await createList(data)
    expect(response).toBe('List already exists')
  })

  it('Should occur an error when create a new list of musics with wrong data', async () => {
    mockingoose(MusicListSchema).toReturn(null, 'findOne')
    const data = {
      someRandomKey: 'randomValue'
    }
    const response = await createList(data)
    expect(response).toBe('Wrong data')
  })

  // Delete a list of musics
  it('Should delete a list of musics by name', async () => {
    mockingoose(MusicListSchema).toReturn(listResponse[0], 'findOne')
    const response = await deleteList('Sabado')
    expect(response).toBe('Removed')
  })

  it('Should occur an error when delete a list of musics by non existing list name', async () => {
    mockingoose(MusicListSchema).toReturn(null, 'findOne')
    const response = await deleteList('random')
    expect(response).toBe('List not found')
  })

  // update MusicList
  it('Should update the array of musics into the list of musics', async () => {
    mockingoose(MusicListSchema).toReturn(listResponse[0], 'findOne')
    const data = {
      title: 'Sabado',
      musicIdList: ['someMusicId', 'anotherMusicId']
    }
    const response = await updateMusicList(data)
    expect(response).toBe('Added')
  })

  it('Should occur an error when update the array of musics into a non existing list', async () => {
    mockingoose(MusicListSchema).toReturn(null, 'findOne')
    const data = {
      title: 'randomList',
      musicIdList: ['someMusicId', 'anotherMusicId']
    }
    const response = await updateMusicList(data)
    expect(response).toBe('List not found')
  })

  // get musics from a list
  it('Should occur an error when trying get a array of musics of a non existing list', async () => {
    mockingoose(MusicListSchema).toReturn(null, 'findOne')
    const response = await findMusicsFromList('random')
    expect(response).toBe('List not found')
  })

  // delete a music from a list
  it('Should delete a song from a musicList', async () => {
    mockingoose(MusicListSchema).toReturn(listResponse[0], 'findOne')
    const response = await removeMusicFromList('Sabado', '62766a71e2ff570f287992f1')
    expect(response).toBe('Removed')
  })

  it('Should occur an error when trying delete a song from a non existing musicList', async () => {
    mockingoose(MusicListSchema).toReturn(null, 'findOne')
    const response = await removeMusicFromList('random', '62766a71e2ff570f287992f1')
    expect(response).toBe('List not found')
  })

  it('Should occur an error when trying delete a non existing song from a musicList', async () => {
    mockingoose(MusicListSchema).toReturn(listResponse[0], 'findOne')
    const response = await removeMusicFromList('Sabado', 'random')
    expect(response).toBe('Music in not in the list')
  })
})